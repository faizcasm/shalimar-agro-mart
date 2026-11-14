import Image from "next/image";
import Link from "next/link";
import { business, nav } from "@/lib/data";
import {
  IconClock,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsApp,
} from "@/components/icons";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-deep text-cream">
      <div className="pointer-events-none absolute inset-0">
        <div className="dot-grid absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000,transparent)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/45 to-transparent" />
      </div>

      <div className="shell relative pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* ---------- Brand ---------- */}
          <div>
            <div className="flex items-center gap-4">
              <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-lime/70">
                <Image
                  src="/logo.png"
                  alt={`${business.name} logo`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>
              <div className="leading-none">
                <div className="font-display text-[26px] font-bold tracking-tight">
                  Shalimar
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.34em] text-lime">
                  Agro Mart
                </div>
              </div>
            </div>

            <p className="mt-6 max-w-sm font-display text-[21px] font-semibold leading-snug text-cream/90">
              {business.tagline}
            </p>

            <p className="mt-4 max-w-sm text-[14.5px] leading-relaxed text-cream/60">
              Soil testing, orchard nutrition and genuine crop inputs for growers
              across every valley orchard in {business.region}.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a href={business.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-lime !px-5 !py-3 !text-[13.5px]">
                <IconWhatsApp className="h-4 w-4" />
                WhatsApp us
              </a>
              <a href={business.phoneHref} className="btn btn-ghost !px-5 !py-3 !text-[13.5px]">
                <IconPhone className="h-4 w-4" />
                Call now
              </a>
            </div>
          </div>

          {/* ---------- Links ---------- */}
          <div>
            <h3 className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-lime">
              Explore
            </h3>
            <ul className="mt-5 grid gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-[14.5px] text-cream/68 transition-colors hover:text-lime"
                  >
                    <span className="h-px w-4 bg-cream/30 transition-all duration-300 group-hover:w-6 group-hover:bg-lime" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Contact ---------- */}
          <div>
            <h3 className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-lime">
              Contact
            </h3>
            <ul className="mt-5 grid gap-4 text-[14.5px] text-cream/68">
              <li className="flex items-start gap-3">
                <IconPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-lime" />
                <span className="leading-relaxed">{business.addressLine}</span>
              </li>
              <li className="flex items-center gap-3">
                <IconPhone className="h-4.5 w-4.5 shrink-0 text-lime" />
                <a href={business.phoneHref} className="transition-colors hover:text-lime">
                  {business.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <IconMail className="mt-0.5 h-4.5 w-4.5 shrink-0 text-lime" />
                <a
                  href={business.emailHref}
                  className="break-all leading-relaxed transition-colors hover:text-lime"
                >
                  {business.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <IconClock className="mt-0.5 h-4.5 w-4.5 shrink-0 text-lime" />
                <span className="leading-relaxed">
                  {business.hours}
                  <span className="mt-1 block text-[13px] text-cream/50">
                    {business.hoursNote}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ---------- Bottom ---------- */}
        <div className="mt-14 border-t border-white/10 pt-7">
          <div className="flex flex-col gap-4 text-[13px] text-cream/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {business.name}. All rights reserved.
            </p>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>
                {business.region}, {business.country}
              </span>
              <span className="hidden text-lime/60 sm:inline">·</span>
              <span>1000+ tests · 50+ partners</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
