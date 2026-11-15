"use client";

import { useRef, useState, type FormEvent } from "react";
import { business } from "@/lib/data";
import {
  mailUrl,
  partnerLines,
  partnerSubject,
  validatePartner,
  type PartnerFields,
} from "@/lib/submission";
import RouteLink from "@/components/RouteLink";
import Reveal from "@/components/Reveal";
import {
  IconArrow,
  IconCheck,
  IconHandshake,
  IconPhone,
  IconTelegram,
} from "@/components/icons";

const businessTypes = [
  "Retail agri shop",
  "Distributor / Wholesaler",
  "Grower / Orchard owner",
  "Field agent / SAM",
  "Co-operative society",
  "Other",
];

const partnerPerks = [
  "Extra income for your business",
  "Your farmers stay loyal to you",
  "Priority supply in peak season",
  "Training & marketing support",
];

export default function Partners() {
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "sent">("idle");
  const [message, setMessage] = useState("");
  // True when the API couldn't deliver and we opened a manual deep-link.
  const [usedFallback, setUsedFallback] = useState(false);
  const formElRef = useRef<HTMLFormElement | null>(null);

  // Shared by both channels: validates and returns the payload,
  // or null after surfacing the validation error.
  function buildSubmission(): { lines: string[]; fields: PartnerFields } | null {
    const form = formElRef.current;
    if (!form) return null;
    const data = new FormData(form);

    const fields: PartnerFields = {
      pName: String(data.get("pName") ?? ""),
      pFirm: String(data.get("pFirm") ?? ""),
      pType: String(data.get("pType") ?? ""),
      pVillage: String(data.get("pVillage") ?? ""),
      pDistrict: String(data.get("pDistrict") ?? ""),
      pPhone: String(data.get("pPhone") ?? ""),
      pNote: String(data.get("pNote") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    const error = validatePartner(fields);
    if (error) {
      setStatus("error");
      setMessage(error);
      return null;
    }

    return { lines: partnerLines(fields), fields };
  }

  // POSTs to the backend, which stores the submission in MongoDB and
  // delivers it to BOTH Telegram and email. If neither channel is
  // configured or fails, the API returns a mailto deep-link we open instead.
  async function sendToApi(payload: { lines: string[]; fields: PartnerFields }): Promise<void> {
    setStatus("sending");
    setMessage("Sending on Telegram and email…");

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "partner", fields: payload.fields }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        delivered?: boolean;
        fallbackUrl?: string;
      } | null;

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setMessage(data?.error || "Something went wrong. Please try again or call us.");
        return;
      }

      if (data.delivered) {
        setStatus("sent");
        setUsedFallback(false);
        setMessage("Application received on Telegram and email — our team will call you within 48 hours.");
        formElRef.current?.reset();
        return;
      }

      // Neither channel configured / both failed → open the mailto
      // deep-link so the user can still send manually.
      if (data.fallbackUrl) {
        setStatus("sent");
        setUsedFallback(true);
        setMessage(`Opening your email app — send the draft to ${business.email}.`);
        window.open(data.fallbackUrl, "_blank", "noopener,noreferrer");
        // Email may silently fail to open, so keep the values.
        return;
      }

      setStatus("error");
      setMessage("Could not deliver right now. Please call us or try again.");
    } catch {
      // Network failure → fall back to the deep-link.
      setUsedFallback(true);
      setStatus("sent");
      setMessage(`Opening your email app — send the draft to ${business.email}.`);
      window.open(
        mailUrl(partnerSubject(payload.fields), payload.lines),
        "_blank",
        "noopener,noreferrer",
      );
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = buildSubmission();
    if (!payload) return;
    void sendToApi(payload);
  }

  return (
    <section id="partners" className="relative overflow-hidden bg-forest-deep">
      <div className="pointer-events-none absolute inset-0">
        <div className="dot-grid absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_70%_60%_at_15%_40%,#000,transparent)]" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-lime/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/35 to-transparent" />
      </div>

      <div className="shell relative section">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* ---------- Pitch ---------- */}
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="eyebrow text-lime">Partner network</span>
                <RouteLink href="/partnerregistration#partner-form" className="btn btn-lime !px-5 !py-3 !text-[13.5px]">
                  Become our partner
                  <IconArrow className="h-4 w-4" />
                </RouteLink>
              </div>

              <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-cream">
                Our partners are the
                <span className="block text-lime">backbone of Kashmir&rsquo;s orchards.</span>
              </h2>
              <p className="mt-5 max-w-lg text-[16.5px] leading-relaxed text-cream/68">
                If you are a pesticide dealer or an agent, join hands with Shalimar
                Agro Mart and help advance Kashmir&rsquo;s agriculture and
                horticulture — starting with soil testing.
              </p>
            </Reveal>

            <Reveal delay={110}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {partnerPerks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-3 rounded-2xl border border-white/12 bg-white/4 px-4 py-3.5 text-[14px] text-cream/78"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime text-forest-deep">
                      <IconCheck className="h-3 w-3" />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-8 rounded-[1.5rem] border border-dashed border-lime/45 bg-white/4 p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lime/15 text-lime ring-1 ring-lime/35">
                    <IconHandshake className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-[18px] font-semibold text-cream">
                      50+ distributors &amp; agents
                    </h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-cream/62">
                      They work with us and send their soil samples to be tested in
                      J&amp;K&rsquo;s highest-standard lab. You can become part of it
                      too.
                    </p>
                  </div>
                </div>

                <a
                  href={business.phoneHref}
                  className="mt-5 inline-flex items-center gap-2 text-[14.5px] font-semibold text-lime transition-transform hover:translate-x-1"
                >
                  <IconPhone className="h-4 w-4" />
                  Talk to the partnership desk · {business.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>

          {/* ---------- Form ---------- */}
          <Reveal delay={140}>
            <div
              id="partner-form"
              className="relative scroll-mt-28 overflow-hidden rounded-[1.75rem] bg-paper p-6 shadow-[0_50px_100px_-55px_rgba(0,0,0,0.95)] sm:p-8"
            >
              <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-lime via-lime-deep to-forest" />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-[24px] font-semibold text-forest">
                    Partner registration
                  </h3>
                  <p className="mt-1.5 text-[14px] text-ink/60">
                    Takes under a minute — our team calls within 48 hours.
                  </p>
                </div>
                <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest text-lime sm:flex">
                  <IconTelegram className="h-6 w-6" />
                </span>
              </div>

              <form ref={formElRef} onSubmit={handleSubmit} noValidate className="mt-7 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="p-name">
                      Your name *
                    </label>
                    <input id="p-name" name="pName" className="field" placeholder="Full name" />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="p-phone">
                      Phone number *
                    </label>
                    <input
                      id="p-phone"
                      name="pPhone"
                      type="tel"
                      inputMode="numeric"
                      className="field"
                      placeholder="10-digit number"
                    />
                  </div>
                </div>

                <div>
                  <label className="field-label" htmlFor="p-firm">
                    Firm / Business name *
                  </label>
                  <input
                    id="p-firm"
                    name="pFirm"
                    className="field"
                    placeholder="e.g. Bhat Agri Stores"
                  />
                </div>

                <div>
                  <label className="field-label" htmlFor="p-type">
                    Business type *
                  </label>
                  <select id="p-type" name="pType" className="field" defaultValue="">
                    <option value="" disabled>
                      Select one
                    </option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="p-village">
                      Village / Town *
                    </label>
                    <input id="p-village" name="pVillage" className="field" placeholder="e.g. Sopore" />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="p-district">
                      District *
                    </label>
                    <input
                      id="p-district"
                      name="pDistrict"
                      className="field"
                      placeholder="e.g. Baramulla"
                    />
                  </div>
                </div>

                <div>
                  <label className="field-label" htmlFor="p-note">
                    Message
                  </label>
                  <textarea
                    id="p-note"
                    name="pNote"
                    rows={3}
                    className="field resize-none"
                    placeholder="Will you allow other agents in my village?"
                  />
                </div>

                {/* Honeypot — hidden from humans, bots fill it */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-px w-px opacity-0"
                />

                {status === "sending" && (
                  <p
                    role="status"
                    className="flex items-center gap-2.5 rounded-xl border border-forest/15 bg-cream px-4 py-3 text-[14px] font-medium text-forest"
                  >
                    <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-forest/25 border-t-lime-deep" />
                    {message}
                  </p>
                )}

                {status === "error" && (
                  <p
                    role="alert"
                    className="rounded-xl border border-apple/35 bg-apple/8 px-4 py-3 text-[14px] font-medium text-apple"
                  >
                    {message}
                  </p>
                )}

                {status === "sent" && (
                  <p
                    role="status"
                    className="flex items-start gap-2.5 rounded-xl border border-lime-deep/40 bg-lime/12 px-4 py-3 text-[14px] font-medium text-forest"
                  >
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-lime-deep" />
                    {message}
                    {usedFallback && (
                      <>
                        {" "}
                        If no email app opened, send it to{" "}
                        <a
                          href={business.emailHref}
                          className="font-bold underline"
                        >
                          {business.email}
                        </a>{" "}
                        or call{" "}
                        <a href={business.phoneHref} className="font-bold underline">
                          {business.phoneDisplay}
                        </a>
                        .
                      </>
                    )}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn btn-forest mt-1 w-full !py-4 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <IconTelegram className="h-4.5 w-4.5" />
                  {status === "sending" ? "Sending…" : "Submit application"}
                  <IconArrow className="h-4 w-4" />
                </button>

                <p className="text-center text-[12.5px] leading-relaxed text-ink/50">
                  Goes to our Telegram and email — our team calls within 48
                  hours. Your details stay private.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
