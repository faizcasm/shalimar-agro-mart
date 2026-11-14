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
            {stats.map((stat, i) => {
              // The "No. 1 in J&K" tile gets a featured treatment so it pops.
              const featured = !stat.count;

              return (
                <Reveal key={stat.label} delay={i * 90}>
                  <div
                    className={`relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] border p-5 transition-all duration-500 ease-out hover:-translate-y-1.5 sm:p-7 ${
                      featured
                        ? "border-lime/45 bg-[linear-gradient(150deg,#12501f_0%,#083204_48%,#021d04_100%)] shadow-[0_36px_70px_-34px_rgba(8,50,4,0.95)]"
                        : "border-ink/10 bg-[linear-gradient(180deg,#fffdf6_0%,#f3eeda_100%)] shadow-[0_20px_46px_-34px_rgba(8,50,4,0.65)] hover:border-lime-deep/50"
                    }`}
                  >
                    {/* premium surface texture */}
                    <span
                      className={`pointer-events-none absolute inset-0 ${
                        featured
                          ? "dot-grid opacity-45"
                          : "bg-[radial-gradient(120%_80%_at_50%_0%,rgba(186,242,0,0.16),transparent_62%)]"
                      }`}
                    />
                    {featured && (
                      <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-lime/25 blur-2xl" />
                    )}

                    <div
                      className={`relative font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-none tracking-[-0.04em] ${
                        featured ? "text-lime" : "text-forest"
                      }`}
                    >
                      {stat.count ? (
                        <Counter value={stat.value as number} suffix={stat.suffix} />
                      ) : (
                        <span>{stat.value}</span>
                      )}
                    </div>

                    <div className="relative mt-4">
                      <div
                        className={`text-[14.5px] font-semibold ${
                          featured ? "text-cream" : "text-ink"
                        }`}
                      >
                        {stat.label}
                      </div>
                      <div
                        className={`mt-1 text-[13px] ${
                          featured ? "text-cream/65" : "text-ink/55"
                        }`}
                      >
                        {stat.detail}
                      </div>
                    </div>

                    <div
                      className={`relative mt-5 h-1 w-10 rounded-full ${
                        featured ? "bg-lime" : "bg-lime-deep"
                      }`}
                    />
                  </div>
                </Reveal>
              );
            })}
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
