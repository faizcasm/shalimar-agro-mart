/* ============================================================
   POST /api/registrations
   Stores a soil-test or partner submission in MongoDB and
   delivers it to BOTH channels in parallel — a Telegram bot
   message and an SMTP email. If neither channel is configured
   or fails, responds with a mailto: deep-link so the client
   can still deliver manually; the site never dead-ends.
   ============================================================ */

import { NextRequest, NextResponse } from "next/server";
import { isDbConfigured, getDb } from "@/lib/mongo";
import { sendEmail, sendTelegram } from "@/lib/notify";
import {
  getPlan,
  mailUrl,
  partnerLines,
  partnerSubject,
  soilLines,
  soilSubject,
  validatePartner,
  validateSoil,
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
  // Wall-clock start so we can report how long the whole
  // save + deliver round-trip took (diagnosing slow notifications).
  const startedAt = Date.now();
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 50_000) {
    return NextResponse.json({ ok: false, error: "Payload too large." }, { status: 413 });
  }

  let body: {
    type?: SubmissionType;
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

  const fields = sanitize((body.fields ?? {}) as Record<string, unknown>) as SoilFields & PartnerFields;

  // Honeypot: bots fill the hidden field — pretend success, store nothing.
  if (fields.website) {
    return NextResponse.json({ ok: true, saved: false, delivered: true });
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

  // 1) Persist FIRST (best-effort — a DB hiccup must not block delivery,
  //    and a record survives even if the function is cut off mid-send).
  let saved = false;
  let id: string | undefined;
  let insertedId: import("mongodb").ObjectId | undefined;
  let saveError: string | undefined;
  if (isDbConfigured()) {
    try {
      const db = await getDb();
      const result = await db!.collection("registrations").insertOne({
        type,
        planId: body.planId ?? null,
        fields,
        message: lines.join("\n"),
        status: "new",
        createdAt: new Date(),
      });
      saved = true;
      insertedId = result.insertedId;
      id = result.insertedId.toString();
    } catch (err) {
      saveError = err instanceof Error ? err.message : "Database save failed";
    }
  }

  // 2) Deliver to BOTH channels in parallel (each best-effort on its own).
  const message = lines.join("\n");
  const [telegram, email] = await Promise.all([
    sendTelegram(message),
    sendEmail(subject, message),
  ]);
  const delivered = telegram.status === "sent" || email.status === "sent";
  const deliveryMs = Date.now() - startedAt;

  // 3) Record which channels actually went out, and exactly when (best-effort).
  if (saved && insertedId) {
    try {
      const db = await getDb();
      await db!.collection("registrations").updateOne(
        { _id: insertedId },
        {
          $set: {
            notified: { telegram: telegram.status, email: email.status },
            notifiedAt: new Date(),
            deliveryMs,
          },
        },
      );
    } catch {
      // The record itself is already stored — notification status is a bonus.
    }
  }

  // 4) If neither channel went through, hand the client a mailto deep-link
  //    so the user can still send manually — the site never dead-ends.
  const fallbackUrl = delivered ? undefined : mailUrl(subject, lines);

  return NextResponse.json({
    ok: true,
    saved,
    id,
    saveError,
    delivered,
    delivery: {
      telegram: { status: telegram.status, detail: telegram.detail },
      email: { status: email.status, detail: email.detail },
    },
    deliveryMs,
    fallbackUrl,
  });
}
