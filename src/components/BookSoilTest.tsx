"use client";

import { useState, type FormEvent } from "react";
import { bookingSteps, business } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { IconArrow, IconCheck, IconClock, IconPhone, IconWhatsApp } from "@/components/icons";

const crops = [
  "Apple",
  "Cherry",
  "Walnut",
  "Almond",
  "Pear & Peach",
  "Vegetables",
  "Field crops",
  "Other",
];

type Status = "idle" | "error" | "ready";

export default function BookSoilTest() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const village = String(data.get("village") ?? "").trim();
    const district = String(data.get("district") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const crop = String(data.get("crop") ?? "").trim();
    const area = String(data.get("area") ?? "").trim();
    const notes = String(data.get("notes") ?? "").trim();

    if (!name || !village || !district || !crop) {
      setStatus("error");
      setMessage("Please fill in your name, village, district and crop.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone.replace(/\s+/g, ""))) {
      setStatus("error");
      setMessage("Enter a valid 10-digit mobile number.");
      return;
    }

    const lines = [
      " soil test booking".trim(),
      `Name: ${name}`,
      `Village/Town: ${village}`,
      `District: ${district}`,
      `Phone: ${phone}`,
      `Crop: ${crop}`,
      area ? `Land area: ${area} acre` : "",
      notes ? `Notes: ${notes}` : "",
    ].filter(Boolean);

    setStatus("ready");
    setMessage("Opening WhatsApp with your booking details…");
    setSent(true);

    window.open(
      `${business.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
    form.reset();
  }

  return (
    <section id="soil-test" className="section scroll-mt-28 bg-cream">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* ---------- Steps ---------- */}
          <div>
            <Reveal>
              <span className="eyebrow text-lime-deep">Book your soil test</span>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-forest">
                Four steps from your field
                <span className="block text-lime-deep">to a full report.</span>
              </h2>
              <p className="mt-5 max-w-lg text-[16.5px] leading-relaxed text-ink/65">
                No paperwork, no lab queues. Tell us where you are and what you
                grow — we handle the rest.
              </p>
            </Reveal>

            <ol className="mt-9 space-y-4">
              {bookingSteps.map((step, i) => (
                <Reveal key={step.title} delay={i * 80}>
                  <li className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest font-display text-[15px] font-bold text-lime ring-4 ring-lime/25">
                        {i + 1}
                      </span>
                      {i < bookingSteps.length - 1 && (
                        <span className="mt-1 w-px flex-1 bg-gradient-to-b from-forest/30 to-transparent" />
                      )}
                    </div>
                    <div className="pb-5">
                      <h3 className="font-display text-[18px] font-semibold text-forest">
                        {step.title}
                      </h3>
                      <p className="mt-1 max-w-md text-[14.5px] leading-relaxed text-ink/60">
                        {step.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={200}>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={business.phoneHref}
                  className="flex items-center gap-2.5 rounded-2xl border border-forest/20 bg-paper px-5 py-4 text-[14px] font-semibold text-forest transition-colors hover:border-lime-deep"
                >
                  <IconPhone className="h-4.5 w-4.5 text-lime-deep" />
                  {business.phoneDisplay}
                </a>
                <div className="flex items-center gap-2.5 rounded-2xl border border-forest/20 bg-paper px-5 py-4 text-[14px] font-semibold text-forest">
                  <IconClock className="h-4.5 w-4.5 text-lime-deep" />
                  Reports in ~10 days
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---------- Form ---------- */}
          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-[1.75rem] border border-forest/12 bg-paper p-6 shadow-[0_40px_80px_-55px_rgba(8,50,4,0.8)] sm:p-8">
              <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-lime via-lime-deep to-forest" />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-[24px] font-semibold text-forest">
                    Request a soil test
                  </h3>
                  <p className="mt-1.5 text-[14px] text-ink/60">
                    We reply on WhatsApp, usually the same day.
                  </p>
                </div>
                <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest text-lime sm:flex">
                  <IconWhatsApp className="h-6 w-6" />
                </span>
              </div>

              <form onSubmit={handleSubmit} noValidate className="mt-7 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="st-name">
                      Your name *
                    </label>
                    <input
                      id="st-name"
                      name="name"
                      className="field"
                      placeholder="e.g. Ghulam Rasool Bhat"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="st-phone">
                      Mobile number *
                    </label>
                    <input
                      id="st-phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      className="field"
                      placeholder="10-digit number"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="st-village">
                      Village / Town *
                    </label>
                    <input
                      id="st-village"
                      name="village"
                      className="field"
                      placeholder="e.g. Sopore"
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="st-district">
                      District *
                    </label>
                    <input
                      id="st-district"
                      name="district"
                      className="field"
                      placeholder="e.g. Baramulla"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="st-crop">
                      Crop *
                    </label>
                    <select id="st-crop" name="crop" className="field" defaultValue="">
                      <option value="" disabled>
                        Select your crop
                      </option>
                      {crops.map((crop) => (
                        <option key={crop} value={crop}>
                          {crop}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="field-label" htmlFor="st-area">
                      Land area (acre)
                    </label>
                    <input
                      id="st-area"
                      name="area"
                      className="field"
                      placeholder="e.g. 2"
                      inputMode="decimal"
                    />
                  </div>
                </div>

                <div>
                  <label className="field-label" htmlFor="st-notes">
                    Anything we should know?
                  </label>
                  <textarea
                    id="st-notes"
                    name="notes"
                    rows={3}
                    className="field resize-none"
                    placeholder="Yellowing leaves, low yield, last season's fertilizer…"
                  />
                </div>

                {status === "error" && (
                  <p
                    role="alert"
                    className="rounded-xl border border-apple/35 bg-apple/8 px-4 py-3 text-[14px] font-medium text-apple"
                  >
                    {message}
                  </p>
                )}

                {sent && status !== "error" && (
                  <p
                    role="status"
                    className="flex items-start gap-2.5 rounded-xl border border-lime-deep/40 bg-lime/12 px-4 py-3 text-[14px] font-medium text-forest"
                  >
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-lime-deep" />
                    {message} If WhatsApp did not open, call us on{" "}
                    <a href={business.phoneHref} className="font-bold underline">
                      {business.phoneDisplay}
                    </a>
                    .
                  </p>
                )}

                <button type="submit" className="btn btn-lime mt-1 w-full !py-4">
                  Send booking on WhatsApp
                  <IconArrow className="h-4 w-4" />
                </button>

                <p className="text-center text-[12.5px] leading-relaxed text-ink/50">
                  By sending, you agree to be contacted about your soil test. We
                  never share your number.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
