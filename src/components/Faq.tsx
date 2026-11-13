"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section bg-cream-dark">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow text-lime-deep">Good to know</span>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,2.85rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-forest">
              Questions growers
              <span className="block text-lime-deep">ask us most.</span>
            </h2>
            <p className="mt-5 max-w-sm text-[15.5px] leading-relaxed text-ink/62">
              Still unsure about something? Call us — we would rather explain it
              once than have you skip the test.
            </p>
          </Reveal>

          <div className="grid gap-3">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={faq.q} delay={i * 70}>
                  <div
                    className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                      isOpen
                        ? "border-forest/30 bg-paper"
                        : "border-forest/12 bg-paper/70 hover:border-forest/25"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                    >
                      <span className="font-display text-[16.5px] font-semibold leading-snug text-forest sm:text-[17.5px]">
                        {faq.q}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-400 ${
                          isOpen
                            ? "rotate-45 bg-lime text-forest-deep"
                            : "bg-forest/8 text-forest"
                        }`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.4}
                          strokeLinecap="round"
                          aria-hidden
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-500 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-ink/65 sm:px-6">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
