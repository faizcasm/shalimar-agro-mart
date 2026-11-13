"use client";

import { useEffect, useState } from "react";
import { business } from "@/lib/data";
import { IconPhone, IconWhatsApp } from "@/components/icons";

/** Dual call / WhatsApp FAB that appears once the hero is scrolled past. */
export default function FloatingContact() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 transition-all duration-500 sm:bottom-7 sm:right-7 ${
        show
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <a
        href={business.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Shalimar Agro Mart on WhatsApp"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_34px_-14px_rgba(37,211,102,0.9)] transition-transform duration-300 hover:scale-110"
      >
        <IconWhatsApp className="h-7 w-7" />
      </a>

      <a
        href={business.phoneHref}
        aria-label={`Call ${business.phoneDisplay}`}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-lime text-forest-deep shadow-[0_16px_34px_-14px_rgba(186,242,0,0.95)] transition-transform duration-300 hover:scale-110"
      >
        <IconPhone className="h-6 w-6" />
      </a>
    </div>
  );
}
