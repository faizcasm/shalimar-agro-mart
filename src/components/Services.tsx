import { services } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { IconArrow, serviceIcons } from "@/components/icons";

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-forest">
      <div className="pointer-events-none absolute inset-0">
        <div className="dot-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000,transparent)]" />
        <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-lime/8 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/40 to-transparent" />
      </div>

      <div className="shell relative section">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <span className="eyebrow text-lime">What we do</span>
            <h2 className="mt-4 max-w-xl font-display text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-cream">
              Everything an orchard needs,
              <span className="block text-lime">under one roof.</span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="max-w-sm text-[15.5px] leading-relaxed text-cream/65">
              From the first soil sample to the last spray of the season — testing,
              nutrition, inputs and advice, delivered by people who work in these
              orchards.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.icon as keyof typeof serviceIcons];
            return (
              <Reveal key={service.title} delay={(i % 3) * 90}>
                <article className="group relative h-full overflow-hidden rounded-[1.5rem] border border-white/12 bg-forest-deep/70 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-lime/50 hover:bg-forest-deep sm:p-7">
                  <span className="absolute right-5 top-5 rounded-full border border-lime/35 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-lime/85">
                    {service.tag}
                  </span>

                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime/12 text-lime ring-1 ring-lime/30 transition-all duration-500 group-hover:bg-lime group-hover:text-forest-deep">
                    <Icon className="h-7 w-7" />
                  </span>

                  <h3 className="mt-6 font-display text-[20px] font-semibold leading-snug text-cream">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-cream/62">
                    {service.body}
                  </p>

                  <span className="mt-6 flex items-center gap-2 text-[13.5px] font-semibold text-lime opacity-0 transition-all duration-400 group-hover:translate-x-1 group-hover:opacity-100">
                    Learn more
                    <IconArrow className="h-4 w-4" />
                  </span>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Grower / dealer pathways */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-lime p-7 text-forest-deep sm:p-9">
              <span className="eyebrow opacity-70">For Growers</span>
              <h3 className="mt-4 font-display text-[clamp(1.4rem,2.6vw,2rem)] font-semibold leading-tight">
                Book a soil test for your orchard
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-forest-deep/78">
                Send us your village and crop. We schedule a sample pickup and
                return a full report with a fertilizer plan in about 10 days.
              </p>
              <a href="#soil-test" className="btn btn-forest mt-7">
                Book a soil test
                <IconArrow className="h-4 w-4" />
              </a>

              <span className="pointer-events-none absolute -bottom-10 -right-8 h-44 w-44 rounded-full border-[14px] border-forest-deep/10" />
            </div>
          </Reveal>

          <Reveal delay={110}>
            <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-white/15 bg-forest-deep p-7 sm:p-9">
              <span className="eyebrow text-lime">For Dealers &amp; Agents</span>
              <h3 className="mt-4 font-display text-[clamp(1.4rem,2.6vw,2rem)] font-semibold leading-tight text-cream">
                Become a Shalimar partner
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-cream/65">
                Stock a brand orchards already trust. Fill the partner form and our
                team will call you within 48 hours.
              </p>
              <a href="#partners" className="btn btn-lime mt-7">
                Apply as a partner
                <IconArrow className="h-4 w-4" />
              </a>

              <span className="dot-grid pointer-events-none absolute inset-0 opacity-40" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
