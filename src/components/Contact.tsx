"use client";

import { useState, type FormEvent } from "react";
import { business } from "@/lib/data";
import Reveal from "@/components/Reveal";
import {
  IconArrow,
  IconCheck,
  IconClock,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsApp,
} from "@/components/icons";

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  business.mapQuery,
)}&output=embed`;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "error" | "sent">("idle");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("cName") ?? "").trim();
    const phone = String(data.get("cPhone") ?? "").trim();
    const topic = String(data.get("cTopic") ?? "").trim();
    const text = String(data.get("cText") ?? "").trim();

    if (!name || !topic || !text) {
      setStatus("error");
      setMessage("Please add your name, choose a topic and write your message.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone.replace(/\s+/g, ""))) {
      setStatus("error");
      setMessage("Enter a valid 10-digit mobile number so we can reply.");
      return;
    }

    const lines = [
      "NEW ENQUIRY",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Topic: ${topic}`,
      `Message: ${text}`,
    ];

    setStatus("sent");
    setMessage("Opening WhatsApp with your message…");

    window.open(
      `${business.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
    form.reset();
  }

  const details = [
    {
      icon: IconPhone,
      label: "Call us",
      value: business.phoneDisplay,
      href: business.phoneHref,
      sub: "Mon – Sat, 9 AM – 7 PM",
      valueClass: "",
    },
    {
      icon: IconWhatsApp,
      label: "WhatsApp",
      value: "Chat instantly",
      href: business.whatsapp,
      sub: "Samples, pricing, orders",
      valueClass: "",
    },
    {
      icon: IconMail,
      label: "Email",
      value: business.email,
      href: business.emailHref,
      sub: "Reports & invoices",
      // Long address: drop a size so it stays on one line in a 4-up grid.
      valueClass: "!text-[15px] break-all",
    },
    {
      icon: IconPin,
      label: "Visit the store",
      value: business.addressLine,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        business.mapQuery,
      )}`,
      sub: "Call for exact directions",
      valueClass: "",
    },
  ];

  return (
    <section id="contact" className="section bg-cream">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-5 border-b border-ink/10 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow text-lime-deep">Get in touch</span>
              <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-forest">
                We love to
                <span className="text-lime-deep"> hear from you.</span>
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-ink/60">
              Walk in with a soil sample, call before you buy, or send a message —
              whichever is easier for you.
            </p>
          </div>
        </Reveal>

        {/* ---------- Details ---------- */}
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.label} delay={i * 80}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="card card-hover flex h-full flex-col gap-3 p-5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest text-lime">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-ink/50">
                      {item.label}
                    </div>
                    <div
                      className={`mt-1.5 font-display text-[17px] font-semibold leading-snug text-forest ${item.valueClass}`}
                    >
                      {item.value}
                    </div>
                    <div className="mt-1 text-[13px] text-ink/55">{item.sub}</div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>

        {/* ---------- Map + form ---------- */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-paper">
              <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-6 py-4">
                <div className="min-w-0">
                  <div className="font-display text-[17px] font-semibold text-forest">
                    {business.addressLine}
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 text-[13.5px] text-ink/58">
                    <IconClock className="h-4 w-4 shrink-0 text-lime-deep" />
                    {business.hours}
                  </div>
                  <div className="mt-1 pl-6 text-[13px] text-ink/50">
                    {business.hoursNote}
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    business.mapQuery,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline !px-4 !py-2.5 !text-[13px]"
                >
                  Directions
                </a>
              </div>

              <div className="relative h-[300px] w-full bg-cream-dark sm:h-[380px]">
                <iframe
                  title={`Map showing ${business.name} — ${business.addressLine}`}
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0 grayscale-[0.35] transition-[filter] duration-500 hover:grayscale-0"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-forest p-6 sm:p-8">
              <span className="dot-grid absolute inset-0 opacity-30" />

              <div className="relative">
                <h3 className="font-display text-[24px] font-semibold text-cream">
                  Send us a message
                </h3>
                <p className="mt-1.5 text-[14px] text-cream/65">
                  We reply on WhatsApp, usually the same day.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-6 grid gap-4">
                  <div>
                    <label
                      className="field-label !text-cream/60"
                      htmlFor="c-name"
                    >
                      Your name *
                    </label>
                    <input id="c-name" name="cName" className="field" placeholder="Full name" />
                  </div>

                  <div>
                    <label className="field-label !text-cream/60" htmlFor="c-phone">
                      Mobile number *
                    </label>
                    <input
                      id="c-phone"
                      name="cPhone"
                      type="tel"
                      inputMode="numeric"
                      className="field"
                      placeholder="10-digit number"
                    />
                  </div>

                  <div>
                    <label className="field-label !text-cream/60" htmlFor="c-topic">
                      What is this about? *
                    </label>
                    <select
                      id="c-topic"
                      name="cTopic"
                      className="field"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Choose a topic
                      </option>
                      <option>Soil testing</option>
                      <option>Fertilizer &amp; crop inputs</option>
                      <option>Orchard advisory</option>
                      <option>Dealer / partnership</option>
                      <option>Something else</option>
                    </select>
                  </div>

                  <div>
                    <label className="field-label !text-cream/60" htmlFor="c-text">
                      Message *
                    </label>
                    <textarea
                      id="c-text"
                      name="cText"
                      rows={4}
                      className="field resize-none"
                      placeholder="Tell us about your orchard or your question…"
                    />
                  </div>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="rounded-xl border border-apple/45 bg-apple/15 px-4 py-3 text-[14px] font-medium text-apple"
                    >
                      {message}
                    </p>
                  )}

                  {status === "sent" && (
                    <p
                      role="status"
                      className="flex items-start gap-2.5 rounded-xl border border-lime/40 bg-lime/12 px-4 py-3 text-[14px] font-medium text-lime"
                    >
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0" />
                      {message} Or call{" "}
                      <a href={business.phoneHref} className="font-bold underline">
                        {business.phoneDisplay}
                      </a>
                      .
                    </p>
                  )}

                  <button type="submit" className="btn btn-lime mt-1 w-full !py-4">
                    Send message
                    <IconArrow className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
