import Image from "next/image";
import { soilReasons } from "@/lib/data";
import Reveal from "@/components/Reveal";
import RouteLink from "@/components/RouteLink";
import { IconArrow, IconCheck } from "@/components/icons";

export default function WhySoilTesting() {
  return (
    <section id="about" className="section relative bg-cream">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* ---------- Poster artwork ---------- */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-forest/8" />
              <div className="overflow-hidden rounded-[1.75rem] border border-ink/10 shadow-[0_40px_80px_-45px_rgba(8,50,4,0.7)]">
                <Image
                  src="/why-soil-testing.jpg"
                  alt="Why soil testing is important — know nutrient status, apply the right fertilizers, prevent deficiencies, get better yield and save cost"
                  width={836}
                  height={1254}
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="h-auto w-full"
                />
              </div>

              {/* The poster already carries the tagline, so this strip adds
                  the supporting facts instead of repeating it. */}
              <div className="mt-5 grid grid-cols-3 gap-2.5 text-center">
                {[
                  { n: "1000+", l: "tests done" },
                  { n: "10", l: "day reports" },
                  { n: "50+", l: "partners" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-2xl border border-forest/12 bg-paper px-2 py-3.5"
                  >
                    <div className="font-display text-[19px] font-bold leading-none text-forest">
                      {s.n}
                    </div>
                    <div className="mt-1.5 text-[11.5px] font-medium text-ink/55">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ---------- Copy + reasons ---------- */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="eyebrow text-lime-deep">Why soil testing</span>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-forest">
                Healthy soil is the cheapest
                <span className="block text-lime-deep">input you will ever buy.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-ink/65">
                Guessing at fertilizer costs growers money every single season. A
                soil test tells you exactly what your orchard is missing — and,
                more importantly, what it already has too much of.
              </p>
            </Reveal>

            <ol className="mt-9 grid gap-3.5">
              {soilReasons.map((reason, i) => (
                <Reveal key={reason.title} delay={i * 70}>
                  <li className="card card-hover flex items-start gap-4 p-4 sm:p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest font-display text-[17px] font-bold text-lime">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-[17.5px] font-semibold leading-snug text-forest">
                        {reason.title}
                      </h3>
                      <p className="mt-1 text-[14.5px] leading-relaxed text-ink/60">
                        {reason.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={140}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <RouteLink href="/testsoilregistration#soil-test" className="btn btn-forest">
                  Test my soil
                  <IconArrow className="h-4 w-4" />
                </RouteLink>
                <p className="flex items-center gap-2 text-[14px] font-medium text-ink/60">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime text-forest">
                    <IconCheck className="h-3 w-3" />
                  </span>
                  Report delivered in about 10 days
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
