"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  bookingSteps,
  business,
  irrigationTypes,
  orchardTypes,
  soilPlans,
  type SoilPlan,
} from "@/lib/data";
import {
  NO_ORCHARD_CROPS,
  mailUrl,
  soilLines,
  soilSubject,
  validateSoil,
  type SoilFields,
} from "@/lib/submission";
import Reveal from "@/components/Reveal";
import {
  IconArrow,
  IconCheck,
  IconClock,
  IconFlask,
  IconLeaf,
  IconPhone,
  IconStar,
  IconTelegram,
} from "@/components/icons";

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

type Status = "idle" | "sending" | "error" | "ready";

const tierIcon = {
  basic: IconLeaf,
  standard: IconFlask,
  premium: IconStar,
} as const;

const tierHeader = {
  basic: "bg-gradient-to-r from-forest to-forest-mid text-cream",
  standard: "bg-gradient-to-r from-lime to-lime-deep text-forest-deep",
  premium: "bg-gradient-to-r from-forest-deep via-forest to-forest-mid text-lime",
} as const;

export default function BookSoilTest() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  // True when the API couldn't deliver and we opened a manual deep-link.
  const [usedFallback, setUsedFallback] = useState(false);
  const [plan, setPlan] = useState<SoilPlan | null>(null);
  const [scrollTick, setScrollTick] = useState(0);
  // Crop drives the orchard-type field: vegetables and field crops aren't
  // grown in orchards, so that select gets disabled (and skipped in
  // validation) for them.
  const [crop, setCrop] = useState("");
  const [orchard, setOrchard] = useState("");

  const noOrchardCrops = NO_ORCHARD_CROPS as readonly string[];
  const orchardDisabled = noOrchardCrops.includes(crop);

  const plansRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const formElRef = useRef<HTMLFormElement | null>(null);
  // Guards against the effect re-firing when a cached route is re-shown —
  // only a *new* plan pick should scroll, never a return visit.
  const scrolledForTick = useRef(0);

  // Every plan pick (first or a change) brings the form into view.
  useEffect(() => {
    if (scrollTick === 0 || scrolledForTick.current === scrollTick) return;
    scrolledForTick.current = scrollTick;
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [scrollTick]);

  function choosePlan(next: SoilPlan) {
    setPlan(next);
    setScrollTick((t) => t + 1);
  }

  function scrollToPlans() {
    plansRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // Shared by both channels: validates and returns the payload,
  // or null after surfacing the validation error.
  function buildSubmission(): { lines: string[]; fields: SoilFields } | null {
    const form = formElRef.current;
    if (!form || !plan) return null;
    const data = new FormData(form);

    const fields: SoilFields = {
      name: String(data.get("name") ?? ""),
      village: String(data.get("village") ?? ""),
      district: String(data.get("district") ?? ""),
      phone: String(data.get("phone") ?? ""),
      crop: String(data.get("crop") ?? ""),
      orchard: String(data.get("orchard") ?? ""),
      irrigation: String(data.get("irrigation") ?? ""),
      treeAge: String(data.get("treeAge") ?? ""),
      production: String(data.get("production") ?? ""),
      area: String(data.get("area") ?? ""),
      notes: String(data.get("notes") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    const error = validateSoil(fields);
    if (error) {
      setStatus("error");
      setMessage(error);
      return null;
    }

    return { lines: soilLines(fields, plan), fields };
  }

  // POSTs to the backend, which stores the submission in MongoDB and
  // delivers it to BOTH Telegram and email. If neither channel is
  // configured or fails, the API returns a mailto deep-link we open instead.
  async function sendToApi(payload: { lines: string[]; fields: SoilFields }): Promise<void> {
    setStatus("sending");
    setMessage("Sending on Telegram and email…");

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "soil-test", planId: plan?.id, fields: payload.fields }),
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
        setStatus("ready");
        setSent(true);
        setUsedFallback(false);
        setMessage("Sent! Your booking is on Telegram and email — we'll reply shortly.");
        resetForm();
        return;
      }

      // Neither channel configured / both failed → open the mailto
      // deep-link so the user can still send manually.
      if (data.fallbackUrl) {
        setStatus("ready");
        setSent(true);
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
      setStatus("ready");
      setSent(true);
      setMessage(`Opening your email app — send the draft to ${business.email}.`);
      window.open(
        mailUrl(soilSubject(plan!), payload.lines),
        "_blank",
        "noopener,noreferrer",
      );
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = buildSubmission();
    if (!payload || !plan) return;
    void sendToApi(payload);
  }

  function resetForm() {
    formElRef.current?.reset();
    // crop/orchard are controlled, so form.reset() alone won't clear them.
    setCrop("");
    setOrchard("");
  }

  return (
    <section id="soil-test" className="section scroll-mt-28 bg-cream">
      <div className="shell">
        {/* ---------- Heading ---------- */}
        <Reveal>
          <span className="eyebrow text-lime-deep">Book your soil test</span>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-forest">
            Pick your plan,
            <span className="block text-lime-deep">we handle the rest.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-ink/65">
            Three lab-tested packages — choose the parameters your field needs,
            fill one short form, and we pick the sample up from your field.
            Report with a fertilizer plan in about 10 days.
          </p>
        </Reveal>

        {/* ---------- Plan picker ---------- */}
        <div className="mt-12 flex flex-wrap items-end justify-between gap-3">
          <h3 className="font-display text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold text-forest">
            Choose your plan
          </h3>
          <p className="text-[13.5px] font-medium text-ink/55">
            All plans include sample pickup and a report in ~10 days
          </p>
        </div>

        <div ref={plansRef} className="mt-5 grid gap-5 md:grid-cols-3">
          {soilPlans.map((p) => {
            const TierIcon = tierIcon[p.id];
            const isSelected = plan?.id === p.id;
            return (
              <Reveal key={p.id} delay={p.id === "basic" ? 0 : p.id === "standard" ? 90 : 180}>
                <button
                  type="button"
                  data-plan={p.id}
                  aria-pressed={isSelected}
                  onClick={() => choosePlan(p)}
                  className={`group flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border-2 bg-paper text-left transition-all duration-300 ${
                    isSelected
                      ? "-translate-y-1 border-forest shadow-[0_30px_60px_-45px_rgba(8,50,4,0.75)] ring-2 ring-forest/25"
                      : p.popular
                        ? "border-lime-deep/70 bg-gradient-to-b from-lime/12 to-paper shadow-[0_28px_55px_-40px_rgba(138,176,41,0.6)] hover:-translate-y-1 hover:border-lime-deep hover:shadow-[0_34px_60px_-40px_rgba(138,176,41,0.75)]"
                        : "border-forest/10 hover:-translate-y-1 hover:border-forest/35 hover:shadow-[0_24px_50px_-40px_rgba(8,50,4,0.6)]"
                  }`}
                >
                  <span
                    className={`flex items-center justify-between px-5 py-3.5 ${tierHeader[p.id]}`}
                  >
                    <span className="flex items-center gap-2 font-display text-[15px] font-bold uppercase tracking-wide">
                      <TierIcon className="h-5 w-5" />
                      {p.name}
                    </span>
                    {isSelected ? (
                      <span className="flex items-center gap-1 rounded-full bg-paper px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-forest">
                        <IconCheck className="h-3 w-3" />
                        Selected
                      </span>
                    ) : p.popular ? (
                      <span className="rounded-full bg-lime px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-forest-deep shadow-[0_2px_10px_-2px_rgba(186,242,0,0.7)]">
                        Most popular
                      </span>
                    ) : null}
                  </span>

                  <span className="flex flex-1 flex-col p-5 sm:p-6">
                    <span className="flex items-baseline gap-2">
                      <span className="rounded-xl bg-lime/25 px-2.5 py-1 font-display text-[2.35rem] font-bold leading-none text-forest">
                        ₹{p.price}
                      </span>
                      <span className="text-[13px] font-semibold text-ink/45">
                        / test
                      </span>
                    </span>
                    <span className="mt-2 block text-[13.5px] leading-snug text-ink/60">
                      {p.tagline}
                    </span>

                    <span className="mt-4 flex flex-wrap gap-1.5">
                      {p.params.map((param) => (
                        <span
                          key={param}
                          className="rounded-full border border-forest/12 bg-cream px-2.5 py-1 text-[11.5px] font-semibold text-forest/80"
                        >
                          {param}
                        </span>
                      ))}
                    </span>

                    <span className="mt-auto block pt-5">
                      <span
                        className={`inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[13.5px] font-semibold transition-colors ${
                          isSelected
                            ? "bg-forest text-lime"
                            : p.popular
                              ? "bg-lime text-forest-deep group-hover:bg-lime-soft"
                              : "bg-forest/8 text-forest group-hover:bg-forest group-hover:text-lime"
                        }`}
                      >
                        {isSelected ? (
                          <>
                            Selected — form below
                            <IconCheck className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            Choose {p.name}
                            <IconArrow className="h-4 w-4" />
                          </>
                        )}
                      </span>
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* ---------- Steps + form ---------- */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Steps */}
          <div>
            <Reveal>
              <h3 className="font-display text-[clamp(1.6rem,3vw,2.15rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-forest">
                Four steps from your field
                <span className="block text-lime-deep">to a full report.</span>
              </h3>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-ink/65">
                No paperwork, no lab queues. Tell us where you are and what you
                grow — we handle the rest.
              </p>
            </Reveal>

            <ol className="mt-8 space-y-4">
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
                      <h4 className="font-display text-[18px] font-semibold text-forest">
                        {step.title}
                      </h4>
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

          {/* Form / prompt */}
          <div ref={formRef} className="scroll-mt-32">
            <Reveal delay={120}>
              {!plan ? (
                <div className="relative overflow-hidden rounded-[1.75rem] border-2 border-dashed border-forest/25 bg-paper/70 p-8 text-center sm:p-10">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-lime">
                    <IconFlask className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-display text-[22px] font-semibold text-forest">
                    Choose a plan to open the form
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-[14.5px] leading-relaxed text-ink/60">
                    Tap Basic, Standard or Premium above — the booking form
                    appears right here.
                  </p>
                  <p className="mt-4 text-[13.5px] font-semibold text-lime-deep">
                    Plans from ₹800 · report in ~10 days
                  </p>
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-[1.75rem] border border-forest/12 bg-paper p-6 shadow-[0_40px_80px_-55px_rgba(8,50,4,0.8)] sm:p-8">
                  <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-lime via-lime-deep to-forest" />

                  {/* Selected plan summary */}
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-forest/15 bg-cream px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tierHeader[plan.id]}`}
                      >
                        {(() => {
                          const TierIcon = tierIcon[plan.id];
                          return <TierIcon className="h-4.5 w-4.5" />;
                        })()}
                      </span>
                      <div>
                        <p className="text-[13.5px] font-bold text-forest">
                          {plan.name} plan · ₹{plan.price}
                        </p>
                        <p className="text-[12px] text-ink/55">
                          {plan.params.length} parameters tested
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={scrollToPlans}
                      className="text-[12.5px] font-bold text-lime-deep underline-offset-2 hover:underline"
                    >
                      Change plan
                    </button>
                  </div>

                  <div className="mt-6 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-[24px] font-semibold text-forest">
                        Request a soil test
                      </h3>
                      <p className="mt-1.5 text-[14px] text-ink/60">
                        We reply on Telegram and email, usually the same day.
                      </p>
                    </div>
                    <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest text-lime sm:flex">
                      <IconTelegram className="h-6 w-6" />
                    </span>
                  </div>

                  <form ref={formElRef} onSubmit={handleSubmit} noValidate className="mt-7 grid gap-4">
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
                        <select
                          id="st-crop"
                          name="crop"
                          className="field"
                          value={crop}
                          onChange={(e) => {
                            const next = e.target.value;
                            setCrop(next);
                            if (noOrchardCrops.includes(next)) setOrchard("");
                          }}
                        >
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
                          Land area (kanal)
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

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="field-label" htmlFor="st-orchard">
                          Orchard type{orchardDisabled ? "" : " *"}
                        </label>
                        <select
                          id="st-orchard"
                          name="orchard"
                          className="field"
                          value={orchard}
                          disabled={orchardDisabled}
                          onChange={(e) => setOrchard(e.target.value)}
                        >
                          <option value="" disabled>
                            {orchardDisabled
                              ? "Not applicable for this crop"
                              : "Select orchard type"}
                          </option>
                          {orchardTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        {orchardDisabled && (
                          <p className="mt-1.5 text-[12.5px] text-ink/50">
                            Orchard type applies to fruit crops only.
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="field-label" htmlFor="st-irrigation">
                          Irrigation type *
                        </label>
                        <select
                          id="st-irrigation"
                          name="irrigation"
                          className="field"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select irrigation type
                          </option>
                          {irrigationTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="field-label" htmlFor="st-age">
                          Tree age (years)
                        </label>
                        <input
                          id="st-age"
                          name="treeAge"
                          className="field"
                          placeholder="e.g. 8"
                          inputMode="numeric"
                        />
                      </div>
                      <div>
                        <label className="field-label" htmlFor="st-production">
                          Last year&apos;s production
                        </label>
                        <input
                          id="st-production"
                          name="production"
                          className="field"
                          placeholder="e.g. 45 kgs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="field-label" htmlFor="st-notes">
                        Remarks
                      </label>
                      <textarea
                        id="st-notes"
                        name="notes"
                        rows={3}
                        className="field resize-none"
                        placeholder="Yellowing leaves, low yield, last season's fertilizer…"
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

                    {sent && status !== "error" && status !== "sending" && (
                      <p
                        role="status"
                        className="flex items-start gap-2.5 rounded-xl border border-lime-deep/40 bg-lime/12 px-4 py-3 text-[14px] font-medium text-forest"
                      >
                        <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-lime-deep" />
                        {message}
                        {usedFallback && (
                          <>
                            {" "}
                            If no email app opened, write to{" "}
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
                      className="btn btn-lime mt-1 w-full !py-4 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <IconTelegram className="h-4.5 w-4.5" />
                      {status === "sending" ? "Sending…" : "Send booking"}
                      <IconArrow className="h-4 w-4" />
                    </button>

                    <p className="text-center text-[12.5px] leading-relaxed text-ink/50">
                      Goes to our Telegram and email — usually a reply the same
                      day. We never share your number.
                    </p>
                  </form>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
