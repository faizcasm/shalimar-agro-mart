"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { business, nav, navSectionId } from "@/lib/data";
import RouteLink from "@/components/RouteLink";
import { IconClose, IconMail, IconMenu, IconPhone, IconPin } from "@/components/icons";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Scroll-spy target on the home page (set from the IntersectionObserver).
  const [spyActive, setSpyActive] = useState<string>("/#home");

  // On dedicated pages the matching route item is highlighted; on the home
  // page the section currently in view decides. Route hrefs carry a hash
  // (`/soil-testing#soil-test`), so compare against the path only.
  const isActive = (href: string) =>
    pathname === "/"
      ? spyActive === href
      : href.split("#")[0] === pathname;

  // "Book a Soil Test" opens the registration page at the form; RouteLink
  // turns it into a plain in-page anchor when we are already on that page.
  const soilCtaHref = "/testsoilregistration#soil-test";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Highlight the nav item for the current destination.
  // On the home page, scroll-spy the sections each nav item maps to
  // (`/#…` items and the sections behind `/soil-testing` → `#soil-test`,
  // `/become-a-partner` → `#partners`). On dedicated pages, highlight the
  // route item that matches the pathname.
  useEffect(() => {
    if (pathname !== "/") return;

    const seen = new Set<string>();
    const targets: { el: HTMLElement; href: string }[] = [];

    nav.forEach((item) => {
      const id = navSectionId(item.href);
      if (!id || seen.has(id)) return;
      seen.add(id);
      // Cached routes (cacheComponents/Activity) keep hidden copies of other
      // pages in the DOM, so IDs can repeat — observe only the visible one.
      const el = [...document.querySelectorAll<HTMLElement>(`[id="${id}"]`)].find(
        (m) => m.getClientRects().length > 0,
      );
      if (el) targets.push({ el, href: item.href });
    });

    if (!targets.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const match = targets.find((t) => t.el === entry.target);
          if (match) setSpyActive(match.href);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    targets.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Utility strip */}
        <div
          className={`hidden lg:block overflow-hidden transition-all duration-500 ${
            scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <div className="border-b border-white/10 bg-forest-deep/95 text-cream/75">
            <div className="shell flex h-10 items-center justify-between text-[12.5px]">
              <div className="flex items-center gap-6">
                <a
                  href={business.phoneHref}
                  className="flex items-center gap-2 transition-colors hover:text-lime"
                >
                  <IconPhone className="h-3.5 w-3.5" />
                  {business.phoneDisplay}
                </a>
                <a
                  href={business.emailHref}
                  className="flex items-center gap-2 transition-colors hover:text-lime"
                >
                  <IconMail className="h-3.5 w-3.5" />
                  {business.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <IconPin className="h-3.5 w-3.5 text-lime" />
                <span>
                  {business.addressLine} · {business.hours}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "border-b border-white/10 bg-forest-deep/92 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <div
            className={`shell flex items-center justify-between transition-all duration-500 ${
              scrolled ? "h-16" : "h-20"
            }`}
          >
            <RouteLink
              href="/#home"
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3"
              aria-label={`${business.name} home`}
            >
              <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-lime/70 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt={`${business.name} logo`}
                  fill
                  sizes="44px"
                  className="object-cover"
                  priority
                />
              </span>
              <span className="hidden flex-col leading-none sm:flex">
                <span className="font-display text-[19px] font-bold tracking-tight text-cream">
                  Shalimar
                </span>
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-lime">
                  Agro Mart
                </span>
              </span>
            </RouteLink>

            <nav className="hidden items-center gap-1 xl:flex">
              {nav.map((item) => (
                <RouteLink
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors duration-300 ${
                    isActive(item.href)
                      ? "text-lime"
                      : "text-cream/78 hover:text-cream"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-px bg-lime transition-transform duration-300 ${
                      isActive(item.href) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </RouteLink>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <RouteLink href={soilCtaHref} className="hidden sm:block">
                <span className="btn btn-lime !px-5 !py-3 !text-[13.5px]">
                  Book a Soil Test
                </span>
              </RouteLink>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-cream transition-colors hover:border-lime hover:text-lime xl:hidden"
              >
                {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile / tablet drawer */}
      <div
        className={`fixed inset-0 z-40 xl:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/70 backdrop-blur-sm transition-opacity duration-400 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-x-0 top-0 pt-24 transition-transform duration-500 ease-out ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="mx-4 max-h-[78vh] overflow-y-auto rounded-3xl border border-white/12 bg-forest-deep p-5 shadow-2xl">
            <nav className="flex flex-col">
              {nav.map((item, i) => (
                <RouteLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${60 + i * 45}ms` : "0ms" }}
                  className={`flex items-center justify-between border-b border-white/8 py-3.5 font-display text-lg font-semibold text-cream transition-all duration-400 hover:text-lime ${
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  }`}
                >
                  {item.label}
                  <span className="text-xs text-lime/70">0{i + 1}</span>
                </RouteLink>
              ))}
            </nav>

            <div className="mt-5 grid gap-2.5">
              <a href={business.phoneHref} className="btn btn-lime w-full">
                <IconPhone className="h-4 w-4" />
                {business.phoneDisplay}
              </a>
              <a
                href={business.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost w-full"
              >
                Chat on WhatsApp
              </a>
            </div>

            <p className="mt-4 text-center text-xs leading-relaxed text-cream/55">
              {business.addressLine}
              <br />
              {business.email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
