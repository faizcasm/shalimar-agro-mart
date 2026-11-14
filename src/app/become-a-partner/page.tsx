import type { Metadata } from "next";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import RouteLink from "@/components/RouteLink";
import { business } from "@/lib/data";
import { IconArrow, IconCheck, IconHandshake, IconPhone } from "@/components/icons";

export const metadata: Metadata = {
  title: "Become a Partner — Dealer & Distributor Program in J&K",
  description:
    "Become a Shalimar Agro Mart partner in Jammu & Kashmir. Join 50+ dealers and distributors stocking genuine agri inputs, orchard nutrition and soil testing services. Apply online or call 9070999299.",
  keywords: [
    "become a partner",
    "agri dealer jammu and kashmir",
    "agri products distributor kashmir",
    "soil testing dealer",
    "horticulture products dealer",
    "crop protection dealer baramulla",
    "agri input shop kashmir",
    "shalimar agro mart partner",
    "agri business opportunity jammu kashmir",
    "apple orchard inputs dealer",
  ],
  alternates: { canonical: "/become-a-partner" },
};

const steps = [
  {
    title: "Fill the form",
    body: "Name, firm, phone and district — it takes under a minute.",
  },
  {
    title: "We call you",
    body: "Our partnership desk calls within 48 hours to understand your market.",
  },
  {
    title: "Start stocking",
    body: "Genuine inputs, priority supply in peak season and marketing support.",
  },
] as const;

export default function BecomeAPartnerPage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative bg-forest-deep pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="glow-lime absolute inset-0" />
          <div className="dot-grid absolute inset-0 opacity-45 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_15%,#000,transparent)]" />
          <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-lime/10 blur-3xl" />
          <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-forest-mid/60 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/45 to-transparent" />
        </div>

        <div className="shell relative">
          <span className="eyebrow text-lime">
            Partnership program · 50+ partners across J&amp;K
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.15rem,5.4vw,4rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-cream">
            Become a <span className="text-lime">Shalimar partner</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-cream/70">
            Stock a brand Kashmir&rsquo;s orchards already trust. As a Shalimar
            Agro Mart dealer or distributor you get genuine agri inputs, soil
            testing services your farmers actually ask for, priority supply in
            peak season and training &amp; marketing support — across Baramulla,
            South Kashmir and North Kashmir.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <RouteLink href="/partnerregistration#partner-form" className="btn btn-lime">
              Apply as a partner
              <IconArrow className="h-4 w-4" />
            </RouteLink>
            <a href={business.phoneHref} className="btn btn-ghost">
              <IconPhone className="h-4 w-4" />
              Talk to the partnership desk
            </a>
          </div>

          <ul className="mt-9 grid max-w-3xl gap-3 sm:grid-cols-3">
            {steps.map((step) => (
              <li
                key={step.title}
                className="rounded-2xl border border-white/12 bg-white/5 p-4"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime text-forest-deep">
                  <IconCheck className="h-3.5 w-3.5" />
                </span>
                <h2 className="mt-3 font-display text-[16.5px] font-semibold text-cream">
                  {step.title}
                </h2>
                <p className="mt-1 text-[13.5px] leading-relaxed text-cream/62">
                  {step.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Proof numbers ---------- */}
      <Stats />

      {/* ---------- Why partner with us ---------- */}
      <section className="section bg-cream">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col gap-5 border-b border-ink/10 pb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="eyebrow text-lime-deep">Why partner with us</span>
                <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-forest">
                  A network built for{" "}
                  <span className="text-lime-deep">Kashmir&rsquo;s growers.</span>
                </h2>
              </div>
              <p className="max-w-sm text-[15px] leading-relaxed text-ink/60">
                Dealers, distributors, co-operatives and orchard owners —
                everyone in the supply chain eats when the grower wins. That is
                the whole idea behind the partner program.
              </p>
            </div>
          </Reveal>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {[
              {
                title: "Extra income for your business",
                body: "A product range your farmers already ask for by name — soil testing included.",
              },
              {
                title: "Priority supply in peak season",
                body: "Stock is kept for partners first, so you never miss a spraying or planting window.",
              },
              {
                title: "Training & marketing support",
                body: "Product training, field days and print material — we grow your shop, not just our brand.",
              },
            ].map((perk, i) => (
              <Reveal key={perk.title} delay={i * 80}>
                <div className="card card-hover flex h-full flex-col gap-3 p-5 sm:p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest text-lime">
                    <IconHandshake className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-[18.5px] font-semibold leading-snug text-forest">
                    {perk.title}
                  </h3>
                  <p className="text-[14.5px] leading-relaxed text-ink/62">
                    {perk.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <RouteLink href="/partnerregistration#partner-form" className="btn btn-forest">
                Fill the partner form
                <IconArrow className="h-4 w-4" />
              </RouteLink>
              <p className="text-[14.5px] text-ink/60">
                Prefer to talk first?{" "}
                <a
                  href={business.phoneHref}
                  className="font-semibold text-forest underline"
                >
                  {business.phoneDisplay}
                </a>{" "}
                — partnership desk, Mon–Sat.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Registration CTA ---------- */}
      <section className="section bg-forest-deep">
        <div className="shell relative">
          <div className="overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/5 p-7 sm:p-10">
            <span className="eyebrow text-lime">Ready to join?</span>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.8rem,3.8vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-cream">
              Fill the partner form — <span className="text-lime">we call within 48 hours.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-cream/68">
              Name, firm, phone and district — that is all it takes to start.
              Our partnership desk takes it from there.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <RouteLink href="/partnerregistration#partner-form" className="btn btn-lime">
                Fill the registration form
                <IconArrow className="h-4 w-4" />
              </RouteLink>
              <a href={business.phoneHref} className="btn btn-ghost">
                <IconPhone className="h-4 w-4" />
                {business.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <Contact />
    </>
  );
}
