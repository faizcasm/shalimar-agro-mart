import Image from "next/image";
import { testimonials } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { IconQuote, IconStar } from "@/components/icons";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <IconStar
          key={i}
          filled={i <= rating}
          className={`h-4 w-4 ${i <= rating ? "text-lime-deep" : "text-ink/22"}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="stories" className="section bg-cream">
      <div className="shell">
        {/* ---------- Heading ---------- */}
        <Reveal>
          <div className="flex flex-col gap-5 border-b border-ink/10 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow text-lime-deep">Verified grower stories</span>
              <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-forest">
                What growers say
                <span className="block text-lime-deep">about working with us.</span>
              </h2>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-forest/15 bg-paper px-5 py-3.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-lime">
                <IconStar className="h-5 w-5" filled />
              </span>
              <div className="leading-tight">
                <div className="text-[14px] font-bold text-forest">
                  Verified farmer testimonials
                </div>
                <div className="text-[12.5px] text-ink/55">
                  Orchard owners across Kashmir
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ---------- Quote cards ---------- */}
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <Reveal key={item.name} delay={i * 100}>
              <figure className="card card-hover flex h-full flex-col p-6 sm:p-7">
                <IconQuote className="h-9 w-9 text-lime-deep/35" />

                <blockquote className="mt-4 flex-1 font-display text-[17.5px] leading-[1.55] text-forest">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-6 border-t border-ink/10 pt-5">
                  <Stars rating={item.rating} />
                  <div className="mt-3 font-display text-[17px] font-semibold text-forest">
                    {item.name}
                  </div>
                  <div className="mt-0.5 text-[13.5px] text-ink/58">
                    {item.role} · {item.place}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* ---------- Original artwork ---------- */}
        <Reveal>
          <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow text-lime-deep">Straight from the orchard</span>
              <h3 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight text-forest">
                Real growers. Real reports.
              </h3>
            </div>
            <p className="max-w-sm text-[14.5px] leading-relaxed text-ink/60">
              The original testimonial artwork published by our growers — soil
              reports in hand, orchards in the background.
            </p>
          </div>
        </Reveal>

        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <Reveal key={`art-${item.name}`} delay={i * 100}>
              <div className="group relative overflow-hidden rounded-[1.5rem] border border-ink/10 shadow-[0_30px_60px_-45px_rgba(8,50,4,0.85)]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={1200}
                  height={675}
                  sizes="(max-width: 768px) 92vw, 33vw"
                  className="h-auto w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="font-display text-[16px] font-semibold text-cream">
                    {item.name}
                  </div>
                  <div className="text-[13px] text-cream/75">{item.place}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
