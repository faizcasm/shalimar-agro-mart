import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { business } from "@/lib/data";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteTitle = `${business.name} — Soil Testing & Orchard Solutions in Pattan, Kashmir`;
const siteDescription =
  "Shalimar Agro Mart provides soil testing, orchard nutrition advisory and genuine crop inputs to growers across Jammu & Kashmir. Based in Palhallan, Pattan. 1000+ tests, 50+ partners. Call 9070999299.";

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL when deploying so social cards resolve correctly.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: siteTitle,
    template: `%s | ${business.name}`,
  },
  description: siteDescription,
  keywords: [
    "Shalimar Agro Mart",
    "soil testing Kashmir",
    "soil test Pattan",
    "agriculture shop Pattan",
    "horticulture Jammu and Kashmir",
    "apple orchard soil test",
    "fertilizer dealer Kashmir",
    "Palhallan Pattan",
    "crop nutrition Kashmir",
    "agri inputs Baramulla",
  ],
  authors: [{ name: business.name }],
  creator: business.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: siteTitle,
    description: siteDescription,
    siteName: business.name,
    images: [
      {
        url: "/hero-banner.jpg",
        width: 1600,
        height: 659,
        alt: "Shalimar Agro Mart — Empowering Agriculture, Enriching Horticulture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/hero-banner.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/icon.png", type: "image/png" }] },
};

export const viewport: Viewport = {
  themeColor: "#021d04",
  width: "device-width",
  initialScale: 1,
};

const localBusinessJsonld = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Store"],
  name: business.name,
  description: siteDescription,
  slogan: business.tagline,
  telephone: `+91${business.phone}`,
  email: business.email,
  image: "/hero-banner.jpg",
  logo: "/logo.png",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Palhallan",
    addressLocality: "Pattan",
    addressRegion: "Jammu & Kashmir",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    // Approximate coordinates for Palhallan, Pattan (Baramulla, J&K)
    latitude: 34.1766,
    longitude: 74.3486,
  },
  areaServed: { "@type": "State", name: "Jammu & Kashmir" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    reviewCount: "3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonld) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
