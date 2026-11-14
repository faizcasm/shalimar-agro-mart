import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/data";
import { IconArrow, IconCheck, IconHandshake, IconPhone, IconPin, IconSprout } from "@/components/icons";

const trustPoints = [
  "Lab report + fertilizer plan in 10 days",
  "50+ partner outlets across J&K",
  "1000+ orchards already tested",
];

export default function Hero() {
  return (
    <section id="home" className="relative bg-forest pt-28 sm:pt-32 lg:pt-40">
      {/* decorative layer (clipped) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="glow-lime absolute inset-0" />
        <div className="dot-grid absolute inset-0 opacity-45 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_15%,#000,transparent)]" />
        <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-lime/10 blur-3xl" />
        <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-forest-mid/60 blur-3xl" />
        {/* thin accent line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/45 to-transparent" />
      </div>

      <div className="shell relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* ---------- Copy ---------- */}
          <div className="animate-fade-up">
            <span className="eyebrow text-lime">
              {business.region} · {business.country}
            </span>

            <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-cream">
              Empowering Agriculture,
              <span className="mt-1 block text-lime">Enriching Horticulture.</span>
            </h1>

            <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-cream/72 sm:text-[17.5px]">
              Kashmir&rsquo;s agri partner for soil testing, orchard nutrition and
              genuine crop inputs. We turn what your land is missing into what your
              trees give back — bigger, brighter, better-graded fruit.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <Link href="/testsoilregistration#soil-test" className="btn btn-lime">
                Book a Soil Test
                <IconArrow className="h-4 w-4" />
              </Link>
              <Link href="/partnerregistration#partner-form" className="btn btn-ghost">
                <IconHandshake className="h-4 w-4" />
                Become a Partner
              </Link>
            </div>

            <ul className="mt-10 grid max-w-xl gap-3 border-t border-white/12 pt-7 sm:grid-cols-1">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-3 text-[14.5px] text-cream/75">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime ring-1 ring-lime/40">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Brand mark panel ---------- */}
          <div className="animate-fade-up relative hidden lg:block" style={{ animationDelay: "160ms" }}>
            <div className="relative rounded-[2rem] border border-lime/25 bg-forest-deep/60 p-8 backdrop-blur-sm">
              <div className="dot-grid absolute inset-0 rounded-[2rem] opacity-30" />

              <div className="relative flex flex-col items-center text-center">
                <div className="animate-float relative h-48 w-56">
                  <Image
                    src="/logo.png"
                    alt={`${business.name} emblem`}
                    fill
                    sizes="224px"
                    className="object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,0.5)]"
                  />
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {["Soil Testing", "Orchard Nutrition", "Crop Inputs"].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-lime/35 bg-lime/10 px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-lime"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-6 h-px w-24 bg-lime/50" />

                <div className="mt-5 flex items-center gap-2 text-[13.5px] text-cream/70">
                  <IconPin className="h-4 w-4 text-lime" />
                  {business.addressLine}
                </div>

                <a
                  href={business.phoneHref}
                  className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-lime px-6 py-3 text-sm font-bold text-forest-deep transition-transform duration-300 hover:scale-105"
                >
                  <IconPhone className="h-4 w-4" />
                  {business.phoneDisplay}
                </a>
              </div>
            </div>

            <span className="absolute -left-5 -top-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-lime text-forest-deep shadow-xl">
              <IconSprout className="h-7 w-7" />
            </span>
          </div>
        </div>

        {/* ---------- Main banner ---------- */}
        <div className="relative z-20 mt-14 -mb-16 sm:-mb-20 lg:-mb-28">
          <div className="group relative overflow-hidden rounded-[1.75rem] border border-lime/25 shadow-[0_50px_90px_-50px_rgba(0,0,0,0.95)] sm:rounded-[2rem]">
            <Image
              src="/hero-banner.jpg"
              alt="Shalimar Agro Mart — Empowering Agriculture, Enriching Horticulture. Jammu & Kashmir."
              width={1600}
              height={659}
              sizes="(max-width: 1024px) 92vw, 1200px"
              priority
              className="h-auto w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.02]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/45 via-transparent to-transparent" />

            <a
              href={business.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 hidden items-center gap-2 rounded-full bg-forest-deep/85 px-4 py-2.5 text-[13px] font-semibold text-cream backdrop-blur-md transition-colors hover:bg-lime hover:text-forest-deep sm:flex"
            >
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
