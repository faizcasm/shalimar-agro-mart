import type { Metadata } from "next";
import BookSoilTest from "@/components/BookSoilTest";
import Contact from "@/components/Contact";
import { business } from "@/lib/data";
import { IconArrow, IconCheck, IconPhone } from "@/components/icons";

export const metadata: Metadata = {
  title: "Book a Soil Test — Online Registration in Jammu & Kashmir",
  description:
    "Register for a soil test in under a minute. Shalimar Agro Mart's soil testing lab collects your sample and returns a report with a fertilizer plan in 10 days. Nearby soil testing in Baramulla, South Kashmir and North Kashmir. Call 9070999299.",
  keywords: [
    "book soil test online",
    "soil test registration jammu kashmir",
    "soil testing lab kashmir",
    "nearby soil testing lab",
    "apple orchard soil testing lab",
    "soil sample pickup kashmir",
    "soil testing in baramulla",
    "soil testing in south kashmir",
    "soil testing in north kashmir",
    "high density apple orchard",
    "apple quality",
    "Kashmir soil testing lab",
  ],
  alternates: { canonical: "/testsoilregistration" },
};

const reassurance = [
  "Takes under a minute",
  "Report + fertilizer plan in 10 days",
  "Sample picked up from your field",
] as const;

export default function TestSoilRegistrationPage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative bg-forest pb-12 pt-28 sm:pb-14 sm:pt-32 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="glow-lime absolute inset-0" />
          <div className="dot-grid absolute inset-0 opacity-45 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_15%,#000,transparent)]" />
          <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-lime/10 blur-3xl" />
          <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-forest-mid/60 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/45 to-transparent" />
        </div>

        <div className="shell relative">
          <span className="eyebrow text-lime">Registration · Soil testing lab</span>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.15rem,5.4vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-cream">
            Register your <span className="text-lime">soil test</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-cream/70">
            Fill the form below — village, district, crop and your number. We
            schedule the sample pickup from your field and send back the lab
            report with a written fertilizer plan in about 10 days.
          </p>

          <a href="#soil-test" className="btn btn-lime mt-7">
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
            Prefer to call? {business.phoneDisplay}
          </a>
        </div>
      </section>

      {/* ---------- Registration form ---------- */}
      <BookSoilTest />

      {/* ---------- Contact ---------- */}
      <Contact />
    </>
  );
}
