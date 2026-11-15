/* ============================================================
   Outbound notifications — WhatsApp Cloud API + SMTP email.
   Everything degrades gracefully: if a channel isn't configured
   yet, it reports "not_configured" instead of throwing, so the
   API route can fall back to a deep-link for the client.
   ============================================================ */

import nodemailer from "nodemailer";
import { business } from "@/lib/data";

export type DeliveryStatus = "sent" | "not_configured" | "failed";

export type DeliveryResult = {
  status: DeliveryStatus;
  detail?: string;
};

/* ---------- WhatsApp Business Cloud API ---------- */

/**
 * Sends a message to the business WhatsApp number.
 * Set WHATSAPP_TEMPLATE_NAME to use an approved template (required by
 * Meta for business-initiated messages); otherwise a plain text message
 * is attempted, which works when messaging your own number.
 */
export async function sendWhatsApp(message: string): Promise<DeliveryResult> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  const to = (process.env.WHATSAPP_TO || `91${business.phone}`).replace(/\D/g, "");

  if (!token || !phoneNumberId) {
    return { status: "not_configured", detail: "WhatsApp API credentials missing" };
  }

  // Meta caps text bodies at 4096 chars; template params at 1024.
  const bodyText = message.slice(0, 4000);

  const payload = templateName
    ? {
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: templateName,
          language: { code: process.env.WHATSAPP_TEMPLATE_LANG || "en" },
          components: [
            {
              type: "body",
              // Template placeholders {{1}}, {{2}}… get the message in chunks.
              parameters: chunkText(bodyText, 900).map((text) => ({
                type: "text",
                text,
              })),
            },
          ],
        },
      }
    : {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: bodyText },
      };

  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });

    const data = (await res.json().catch(() => ({}))) as {
      messages?: { id?: string }[];
      error?: { message?: string; code?: number };
    };

    if (!res.ok || data.error) {
      return {
        status: "failed",
        detail: data.error?.message || `WhatsApp API HTTP ${res.status}`,
      };
    }

    return { status: "sent", detail: data.messages?.[0]?.id };
  } catch (err) {
    return { status: "failed", detail: err instanceof Error ? err.message : "WhatsApp send failed" };
  }
}

/* ---------- Email (SMTP) ---------- */

export async function sendEmail(
  subject: string,
  text: string,
): Promise<DeliveryResult> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return { status: "not_configured", detail: "SMTP credentials missing" };
  }

  try {
    const transport = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465,
      auth: { user, pass },
      connectionTimeout: 15000,
    });

    const info = await transport.sendMail({
      from: process.env.SMTP_FROM || `Shalimar Agro Mart Website <${user}>`,
      to: business.email,
      subject,
      text,
    });

    return { status: "sent", detail: info.messageId };
  } catch (err) {
    return { status: "failed", detail: err instanceof Error ? err.message : "Email send failed" };
  }
}

/* ---------- helpers ---------- */

function chunkText(text: string, size: number): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += size) chunks.push(text.slice(i, i + size));
  return chunks.length ? chunks : [""];
}
