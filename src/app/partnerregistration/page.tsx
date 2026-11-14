import type { Metadata } from "next";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import { business } from "@/lib/data";
import { IconArrow, IconCheck, IconPhone } from "@/components/icons";

export const metadata: Metadata = {
  title: "Partner Registration — Become a Shalimar Dealer in J&K",
  description:
    "Register to become a Shalimar Agro Mart partner in Jammu & Kashmir. Dealer and distributor registration — genuine agri inputs, soil testing services, priority supply and marketing support. Our team calls within 48 hours. Call 9070999299.",
  keywords: [
    "partner registration",
    "become a dealer jammu and kashmir",
    "agri products distributor kashmir",
    "soil testing dealer program",
    "horticulture products dealer",
    "agri input shop kashmir",
    "crop protection dealer baramulla",
    "shalimar agro mart partner",
    "agri business opportunity jammu kashmir",
    "apple orchard inputs dealer",
  ],
  alternates: { canonical: "/partnerregistration" },
};

const reassurance = [
  "Takes under a minute",
  "We call within 48 hours",
  "50+ partners already with us",
] as const;

export default function PartnerRegistrationPage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative bg-forest-deep pb-12 pt-28 sm:pb-14 sm:pt-32 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="glow-lime absolute inset-0" />
          <div className="dot-grid absolute inset-0 opacity-45 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_15%,#000,transparent)]" />
          <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-lime/10 blur-3xl" />
          <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-forest-mid/60 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/45 to-transparent" />
        </div>

        <div className="shell relative">
          <span className="eyebrow text-lime">Registration · Partnership program</span>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.15rem,5.4vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-cream">
            Partner <span className="text-lime">registration</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-cream/70">
            Fill the form below to join 50+ Shalimar partners across Jammu &amp;
            Kashmir. Tell us your firm, business type and district — our
            partnership desk calls you within 48 hours.
          </p>

          <a href="#partner-form" className="btn btn-lime mt-7">
            Go to the form
            <IconArrow className="h-4 w-4" />
          </a>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {reassurance.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-medium text-cream/80"
              >
                <IconCheck className="h-3.5 w-3.5 text-lime" />
                {point}
              </li>
            ))}
          </ul>

          <a
            href={business.phoneHref}
            className="mt-7 inline-flex items-center gap-2 text-[14.5px] font-semibold text-lime transition-transform hover:translate-x-1"
          >
            <IconPhone className="h-4 w-4" />
            Talk to the partnership desk · {business.phoneDisplay}
          </a>
        </div>
      </section>

      {/* ---------- Registration form ---------- */}
      <Partners />

      {/* ---------- Contact ---------- */}
      <Contact />
    </>
  );
}
