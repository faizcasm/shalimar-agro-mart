/* ============================================================
   POST /api/registrations
   Stores a soil-test or partner submission in MongoDB and
   delivers it via the chosen channel (WhatsApp Cloud API or
   SMTP email) to the business. Always responds with a fallback
   deep-link so the client can still deliver manually if a
   channel isn't configured or fails.
   ============================================================ */

import { NextRequest, NextResponse } from "next/server";
import { isDbConfigured, getDb } from "@/lib/mongo";
import { sendEmail, sendWhatsApp } from "@/lib/notify";
import {
  getPlan,
  mailUrl,
  partnerLines,
  partnerSubject,
  soilLines,
  soilSubject,
  validatePartner,
  validateSoil,
  waUrl,
  type Channel,
  type PartnerFields,
  type SoilFields,
  type SubmissionType,
} from "@/lib/submission";

// Best-effort per-IP rate limit (per serverless instance).
const hits = new Map<string, number[]>();
const RATE_LIMIT = 30;
const RATE_WINDOW = 60_000;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 10_000) hits.clear(); // memory guard
  return list.length > RATE_LIMIT;
}

/** Trim/clip every string so oversized payloads can't bloat the DB. */
function sanitize(fields: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(fields)) {
    const max = key === "notes" || key === "pNote" ? 2000 : 300;
    out[key] = String(value ?? "").trim().slice(0, max);
  }
  return out;
}

export async function POST(request: NextRequest) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 50_000) {
    return NextResponse.json({ ok: false, error: "Payload too large." }, { status: 413 });
  }

  let body: {
    type?: SubmissionType;
    channel?: Channel;
    planId?: string;
    fields?: SoilFields & PartnerFields;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const type = body.type;
  if (type !== "soil-test" && type !== "partner") {
    return NextResponse.json({ ok: false, error: "Unknown submission type." }, { status: 400 });
  }

  const channel: Channel = body.channel === "email" ? "email" : "whatsapp";
  const fields = sanitize((body.fields ?? {}) as Record<string, unknown>) as SoilFields & PartnerFields;

  // Honeypot: bots fill the hidden field — pretend success, store nothing.
  if (fields.website) {
    return NextResponse.json({
      ok: true,
      saved: false,
      delivery: { channel, status: "sent" },
    });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts — please wait a minute and try again." },
      { status: 429 },
    );
  }

  // Validate + build the outbound message with the same shared code
  // the client uses, so both sides can never disagree.
  let lines: string[];
  let subject: string;
  if (type === "soil-test") {
    const error = validateSoil(fields);
    if (error) return NextResponse.json({ ok: false, error }, { status: 400 });
    const plan = getPlan(body.planId);
    if (!plan) {
      return NextResponse.json({ ok: false, error: "Choose a plan first." }, { status: 400 });
    }
    lines = soilLines(fields, plan);
    subject = soilSubject(plan);
  } else {
    const error = validatePartner(fields);
    if (error) return NextResponse.json({ ok: false, error }, { status: 400 });
    lines = partnerLines(fields);
    subject = partnerSubject(fields);
  }

  // 1) Persist (best-effort — a DB hiccup must not block delivery).
  let saved = false;
  let id: string | undefined;
  let saveError: string | undefined;
  if (isDbConfigured()) {
    try {
      const db = await getDb();
      const result = await db!.collection("registrations").insertOne({
        type,
        channel,
        planId: body.planId ?? null,
        fields,
        message: lines.join("\n"),
        status: "new",
        createdAt: new Date(),
      });
      saved = true;
      id = result.insertedId.toString();
    } catch (err) {
      saveError = err instanceof Error ? err.message : "Database save failed";
    }
  }

  // 2) Deliver via the chosen channel (best-effort too).
  const message = lines.join("\n");
  const delivery =
    channel === "whatsapp" ? await sendWhatsApp(message) : await sendEmail(subject, message);

  // 3) If delivery didn't go through, hand the client a deep-link so the
  //    user can still send manually — the site never dead-ends.
  const fallbackUrl =
    delivery.status === "sent"
      ? undefined
      : channel === "whatsapp"
        ? waUrl(lines)
        : mailUrl(subject, lines);

  return NextResponse.json({
    ok: true,
    saved,
    id,
    saveError,
    delivery: { channel, status: delivery.status, detail: delivery.detail },
    fallbackUrl,
  });
}
