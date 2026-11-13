import { marqueeItems, stats } from "@/lib/data";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";

export default function Stats() {
  return (
    <>
      <section className="bg-cream pb-4 pt-28 sm:pt-32 lg:pt-40">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col gap-5 border-b border-ink/10 pb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="eyebrow text-lime-deep">
                  Market leader · Best technology in J&amp;K
                </span>
                <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-forest">
                  The numbers behind healthier orchards
                </h2>
              </div>
              <p className="max-w-sm text-[15px] leading-relaxed text-ink/60">
                Every figure below is a real season of sampling, testing and
                delivering inputs to growers across the Kashmir valley.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 90}>
                <div className="card card-hover flex h-full flex-col justify-between p-5 sm:p-7">
                  <div className="font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-none tracking-[-0.04em] text-forest">
                    {stat.count ? (
                      <Counter value={stat.value as number} suffix={stat.suffix} />
                    ) : (
                      <span>{stat.value}</span>
                    )}
                  </div>
                  <div className="mt-4">
                    <div className="text-[14.5px] font-semibold text-ink">{stat.label}</div>
                    <div className="mt-1 text-[13px] text-ink/55">{stat.detail}</div>
                  </div>
                  <div className="mt-5 h-1 w-10 rounded-full bg-lime" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Capability marquee ---------- */}
      <div className="overflow-hidden border-y border-ink/10 bg-cream-dark py-4 marquee-mask">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {marqueeItems.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center gap-6 px-6 font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-forest/75 sm:text-[17px]"
                >
                  {item}
                  <span className="h-1.5 w-1.5 rounded-full bg-lime-deep" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
