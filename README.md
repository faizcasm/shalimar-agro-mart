# Shalimar Agro Mart — Website

Modern business website for **Shalimar Agro Mart**, an agriculture & horticulture
serving growers across Jammu & Kashmir from **Palhallan, Pattan**.

> Empowering Agriculture, Enriching Horticulture.

![Hero banner](public/hero-banner.jpg)

---

## Live sections

| Section | What it does |
| --- | --- |
| **Hero** | Full-width brand banner, primary CTAs, trust points |
| **Stats** | Animated counters — 1000+ tests, 50+ partners, 10-day reports, No. 1 in Pattan |
| **Why Soil Testing** | The five reasons from the brand poster, with the original artwork |
| **Services** | Six service cards + grower / dealer pathway cards |
| **Book a Soil Test** | 4-step process with a validating booking form |
| **Partners** | Partner network pitch + partner registration form |
| **Stories** | Named grower testimonials + the original testimonial artwork |
| **FAQ** | Accessible accordion |
| **Contact** | Clickable contact cards, Google Map, enquiry form |
| **Footer** | Full business details, nav, hours |

Sticky header with scroll-aware utility bar, mobile drawer nav, floating
call/WhatsApp buttons, scroll-reveal animations, and `LocalBusiness` JSON-LD.

---

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** — design tokens in [`src/app/globals.css`](src/app/globals.css)
- **next/font** — Fraunces (display) + Inter (body)
- **next/image** — optimised, responsive, lazy-loaded assets

No UI kit, no backend — the forms are client-validated and hand the composed
message to **WhatsApp**, which is how this business actually takes bookings.

---

## Brand tokens

Sampled directly from the supplied logo asset:

| Token | Hex | Use |
| --- | --- | --- |
| `forest` | `#083204` | Primary dark surfaces |
| `forest-deep` | `#021d04` | Header / footer |
| `lime` | `#baf200` | Primary accent & CTAs |
| `lime-deep` | `#8ab029` | Secondary accent, links |
| `apple` | `#fb3f33` | Validation errors |
| `cream` | `#f7f3e7` | Page background |
| `paper` | `#fffdf6` | Cards |

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

### Optional: set the site URL

Used to resolve social/OG image URLs:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example npm run build
```

---

## Project structure

```
src/
├── app/
│   ├── globals.css        # Design tokens, components, animations
│   ├── layout.tsx         # Fonts, metadata, JSON-LD, shell
│   ├── page.tsx           # Home — assembles all sections
│   └── icon.png           # Favicon (from the brand logo)
├── components/
│   ├── Header.tsx         # Sticky nav + mobile drawer
│   ├── Hero.tsx           # Hero + brand banner
│   ├── Stats.tsx          # Counters + capability marquee
│   ├── WhySoilTesting.tsx
│   ├── Services.tsx       # Service grid + pathway cards
│   ├── BookSoilTest.tsx   # Booking form (WhatsApp)
│   ├── Partners.tsx       # Partner registration form
│   ├── Testimonials.tsx   # Quote cards + artwork gallery
│   ├── Faq.tsx
│   ├── Contact.tsx        # Contact cards, map, enquiry form
│   ├── Footer.tsx
│   ├── FloatingContact.tsx
│   ├── Counter.tsx        # Scroll-triggered count-up
│   ├── Reveal.tsx         # Scroll-reveal wrapper
│   └── icons.tsx          # Inline SVG icon set
└── lib/
    └── data.ts            # ← All copy, services, testimonials, contact details
```

**Content lives in [`src/lib/data.ts`](src/lib/data.ts).**
Phone, email, address, opening hours, services, stats, FAQs and testimonials are
all edited from that one file — no component changes needed.

---

## Content notes

- **Contact details** — `9070999299` · `shalimaragromart@gmail.com` ·
  Jammu & Kashmir, India (shown as the address site-wide; the precise store
  location is used only by the map and by search metadata).
- **Testimonial quotes** are taken verbatim from the supplied testimonial
  artwork. Dr. Irfan Rashid's name appears on the original image; the other two
  artworks carried no printed name and were completed with the names supplied by
  the client.
- **Opening hours** (`Mon – Sat · 9:00 AM – 7:00 PM`) are a sensible default —
  update them in `src/lib/data.ts` to the real hours.
- **Map** is a keyless Google Maps embed. Search metadata and the embed keep the
  precise store locality so the business stays findable in local search.

---

## Deployment

Any Node host works out of the box:

```bash
npm run build
npm run start
```

Vercel: import the repo — no configuration required.

---

© Shalimar Agro Mart · Palhallan, Pattan, Jammu & Kashmir
