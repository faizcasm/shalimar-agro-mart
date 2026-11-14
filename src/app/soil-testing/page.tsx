import type { Metadata } from "next";
import Link from "next/link";
import WhySoilTesting from "@/components/WhySoilTesting";
import BookSoilTest from "@/components/BookSoilTest";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import { business } from "@/lib/data";
import {
  IconApple,
  IconArrow,
  IconFlask,
  IconPhone,
  IconPin,
  IconSprout,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Soil Testing in Jammu & Kashmir — No. 1 Soil Testing Lab",
  description:
    "No. 1 soil testing in Jammu & Kashmir. Nearby soil testing lab for apple orchards — high density apple orchard testing for better apple quality. Soil testing in Baramulla, South Kashmir and North Kashmir, around Sopore fruit mandi and Shopian apple belts. Call 9070999299.",
  keywords: [
    "No. 1 soil testing in jammu and kashmir",
    "Nearby soil testing lab",
    "Soil testing lab",
    "Kashmir soil testing lab",
    "Apple orchard soil testing lab",
    "High density apple orchard",
    "apple quality",
    "aple quality",
    "Sopore fruit Mandy",
    "Sopore fruit mandi",
    "Shopian apple",
    "Soil testing in baramulla",
    "Soil testing in south kashmir",
    "Soil testing in north kashmir",
    "soil testing near me",
    "orchard soil test kashmir",
    "soil health card jammu kashmir",
    "fertilizer recommendation report",
  ],
  alternates: { canonical: "/soil-testing" },
};

const areas = [
  {
    icon: IconFlask,
    title: "Nearby soil testing lab",
    body: "Call, schedule a sample pickup and get a lab report with a written fertilizer plan in 10 days — no standing in queues, no travelling to the lab yourself.",
  },
  {
    icon: IconPin,
    title: "Soil testing in Baramulla",
    body: "Sopore, Pattan, Sangrama and the wider Baramulla district — orchards and field crops sampled every season.",
  },
  {
    icon: IconPin,
    title: "Soil testing in South Kashmir",
    body: "Shopian, Pulwama, Anantnag and Kulgam — from old apple blocks to new plantations, sampled block by block.",
  },
  {
    icon: IconPin,
    title: "Soil testing in North Kashmir",
    body: "Kupwara, Bandipora and the northern belt — representative sampling with a plan matched to your own fields.",
  },
  {
    icon: IconApple,
    title: "Sopore fruit mandi",
    body: "Pre-mandi soil and leaf testing so your lots reach the Sopore fruit mandi with better size, colour and apple quality.",
  },
  {
    icon: IconSprout,
    title: "High density apple orchard",
    body: "Root-zone nutrition for high density apple orchard blocks — matched to spacing, rootstock and drip, so every tree gets its share.",
  },
] as const;

export default function SoilTestingPage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative bg-forest pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="glow-lime absolute inset-0" />
          <div className="dot-grid absolute inset-0 opacity-45 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_15%,#000,transparent)]" />
          <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-lime/10 blur-3xl" />
          <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-forest-mid/60 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/45 to-transparent" />
        </div>

        <div className="shell relative">
          <span className="eyebrow text-lime">
            Soil testing lab · Jammu &amp; Kashmir
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.15rem,5.4vw,4rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-cream">
            No. 1 soil testing in{" "}
            <span className="text-lime">Jammu &amp; Kashmir</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-cream/70">
            A nearby soil testing lab for Kashmir&rsquo;s growers. We test apple
            orchard soils — including high density apple orchard blocks — to lift
            apple quality before the fruit reaches Sopore fruit mandi and Shopian
            apple markets, with reports for Baramulla, South Kashmir and North
            Kashmir orchards in 10 days.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="#soil-test" className="btn btn-lime">
              Book a soil test
              <IconArrow className="h-4 w-4" />
            </Link>
            <a href={business.phoneHref} className="btn btn-ghost">
              <IconPhone className="h-4 w-4" />
              {business.phoneDisplay}
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap gap-2.5">
            {[
              "1000+ orchards tested",
              "Report + plan in 10 days",
              "50+ partner outlets",
              "Sample pickup at your field",
            ].map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-medium text-cream/80"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Why soil testing ---------- */}
      <WhySoilTesting />

      {/* ---------- Coverage areas ---------- */}
      <section id="areas" className="section bg-cream-dark">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col gap-5 border-b border-ink/10 pb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="eyebrow text-lime-deep">Where we work</span>
                <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-forest">
                  Soil testing across Baramulla, South Kashmir and North Kashmir
                </h2>
              </div>
              <p className="max-w-sm text-[15px] leading-relaxed text-ink/60">
                Wherever your orchard sits in the valley, the sample is collected
                from your field and the report comes back to you — with the
                fertilizer plan written in plain language.
              </p>
            </div>
          </Reveal>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {areas.map((area, i) => {
              const Icon = area.icon;
              return (
                <Reveal key={area.title} delay={i * 70}>
                  <div className="card card-hover flex h-full flex-col gap-3 p-5 sm:p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest text-lime">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-[18.5px] font-semibold leading-snug text-forest">
                      {area.title}
                    </h3>
                    <p className="text-[14.5px] leading-relaxed text-ink/62">
                      {area.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="#soil-test" className="btn btn-forest">
                Book a soil test for your field
                <IconArrow className="h-4 w-4" />
              </Link>
              <p className="text-[14.5px] text-ink/60">
                Not sure if your field needs a test?{" "}
                <a
                  href={business.phoneHref}
                  className="font-semibold text-forest underline"
                >
                  Call us
                </a>{" "}
                — we will tell you honestly.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Booking form ---------- */}
      <BookSoilTest />

      {/* ---------- FAQ ---------- */}
      <Faq />

      {/* ---------- Contact ---------- */}
      <Contact />
    </>
  );
}
