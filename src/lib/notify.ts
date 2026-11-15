/* ============================================================
   Outbound notifications — Telegram Bot API + SMTP email.
   Every submission is delivered to BOTH channels (best-effort,
   in parallel). Everything degrades gracefully: if a channel
   isn't configured yet, it reports "not_configured" instead of
   throwing, so the API route can fall back to a deep-link for
   the client.
   ============================================================ */

import nodemailer from "nodemailer";
import { business } from "@/lib/data";

export type DeliveryStatus = "sent" | "not_configured" | "failed";

export type DeliveryResult = {
  status: DeliveryStatus;
  detail?: string;
};

/* ---------- Telegram Bot API ---------- */

/**
 * Sends a message to the business Telegram chat.
 * Requires TELEGRAM_BOT_TOKEN (from @BotFather) and TELEGRAM_CHAT_ID
 * (the chat the bot should notify). Plain text — no template approval
 * needed, unlike WhatsApp.
 */
export async function sendTelegram(message: string): Promise<DeliveryResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { status: "not_configured", detail: "Telegram bot credentials missing" };
  }

  // Telegram caps message bodies at 4096 chars.
  const text = message.slice(0, 4000);

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(15000),
    });

    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      description?: string;
      result?: { message_id?: number };
    };

    if (!res.ok || data.ok === false) {
      return {
        status: "failed",
        detail: data.description || `Telegram HTTP ${res.status}`,
      };
    }

    return { status: "sent", detail: data.result?.message_id ? `msg ${data.result.message_id}` : undefined };
  } catch (err) {
    return { status: "failed", detail: err instanceof Error ? err.message : "Telegram send failed" };
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
