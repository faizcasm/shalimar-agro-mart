/* ============================================================
   Shalimar Agro Mart — single source of truth for site content
   ============================================================ */

export const business = {
  name: "Shalimar Agro Mart",
  tagline: "Empowering Agriculture, Enriching Horticulture",
  shortTagline: "Empowering Agriculture · Enriching Horticulture",
  phone: "9070999299",
  phoneDisplay: "+91 9070999299",
  phoneHref: "tel:+919070999299",
  whatsapp: "https://wa.me/919070999299",
  email: "shalimaragromart@gmail.com",
  emailHref: "mailto:shalimaragromart@gmail.com",
  locality: "Palhallan, Pattan",
  district: "Baramulla",
  region: "Jammu & Kashmir",
  country: "India",
  // Shown as the address everywhere on the page.
  addressLine: "Jammu & Kashmir, India",
  hours: "Mon – Sat · 9:00 AM – 7:00 PM",
  hoursNote: "Sunday & harvest season: open on request",
  mapQuery: "Palhallan, Pattan, Jammu & Kashmir",
} as const;

export const stats = [
  {
    value: 1000,
    suffix: "+",
    label: "Soil tests completed",
    detail: "across Kashmir's orchards",
    count: true,
  },
  {
    value: 50,
    suffix: "+",
    label: "Trusted partners",
    detail: "dealers & growers in J&K",
    count: true,
  },
  {
    value: 10,
    suffix: " days",
    label: "Report turnaround",
    detail: "testing to delivery",
    count: true,
  },
  {
    value: "No. 1",
    suffix: "",
    label: "In J&K",
    detail: "for agri inputs & testing",
    count: false,
  },
] as const;

/* Hash items (`/#…`) scroll sections on the home page and navigate home from
   any other route; path items open their own dedicated page — and carry a
   hash so the visitor lands straight on that page's form. */
export const nav = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Soil Testing", href: "/soil-testing#soil-test" },
  { label: "Become a Partner", href: "/become-a-partner#partner-form" },
  { label: "Stories", href: "/#stories" },
  { label: "Contact", href: "/#contact" },
] as const;

/** Section on the home page that represents each nav destination. */
export function navSectionId(href: string): string | null {
  if (href.startsWith("/#")) return href.slice(2);
  const path = href.split("#")[0];
  if (path === "/soil-testing") return "soil-test";
  if (path === "/become-a-partner") return "partners";
  return null;
}

/* ---------- Why soil testing (from the "Why Soil Testing is Important" poster) ---------- */
export const soilReasons = [
  {
    title: "Know Your Soil Nutrient Status",
    body: "Nitrogen, phosphorus, potassium, pH and organic carbon — measured, not guessed.",
  },
  {
    title: "Apply the Right Fertilizers",
    body: "Only what your land actually needs, in the ratio your crop actually uses.",
  },
  {
    title: "Prevent Deficiencies & Toxicity",
    body: "Catch hidden hunger and salt damage long before the leaves show it.",
  },
  {
    title: "Get Better Yield & Quality Fruits",
    body: "Uniform sizing, deeper colour and higher grading in the apple mandi.",
  },
  {
    title: "Save Cost & Increase Profit",
    body: "Stop buying inputs your soil already has. Every rupee works harder.",
  },
] as const;

export const soilReasonTagline =
  "Healthy Soil… Healthy Trees… Bountiful Harvest…";

/* ---------- Services ---------- */
export const services = [
  {
    icon: "flask",
    title: "Soil Testing & Lab Reports",
    body: "Macro and micro nutrients, pH, electrical conductivity and organic carbon — reported in plain language with a written fertilizer plan.",
    tag: "10-day reports",
  },
  {
    icon: "leaf",
    title: "Crop Nutrition Planning",
    body: "Stage-wise nutrient schedules for apple, cherry, walnut and seasonal vegetables, matched to your orchard's own soil report.",
    tag: "Per-orchard plan",
  },
  {
    icon: "apple",
    title: "Orchard Management Advisory",
    body: "Pruning, thinning, spraying calendars and IPM guidance from agronomists who work Kashmiri orchards every season.",
    tag: "Field visits",
  },
  {
    icon: "sack",
    title: "Fertilizer & Crop Protection",
    body: "Genuine NPK, micronutrients, organic manure and registered crop protection products — stored properly, priced fairly.",
    tag: "Genuine stock",
  },
  {
    icon: "handshake",
    title: "Dealer & Distributor Network",
    body: "50+ distributors and agents stock and resupply our range, so inputs reach your village without delay.",
    tag: "50+ partners",
  },
  {
    icon: "chart",
    title: "Yield & Profit Advisory",
    body: "We translate your soil report into cost per acre, expected response and a season budget you can actually follow.",
    tag: "ROI focused",
  },
] as const;

/* ---------- Booking steps ---------- */
export const bookingSteps = [
  {
    title: "Tell us your field",
    body: "Call or WhatsApp your village, district and the crop you grow.",
  },
  {
    title: "We collect the sample",
    body: "Our team visits, takes representative samples and logs them.",
  },
  {
    title: "Lab analysis",
    body: "Nutrients, pH, EC and organic carbon are tested and verified.",
  },
  {
    title: "Report + plan",
    body: "You get a readable report and a fertilizer plan within 10 days.",
  },
] as const;

/* ---------- Grower / dealer pathways ---------- */
export const audiences = [
  {
    kind: "grower",
    eyebrow: "For Growers",
    title: "Book a soil test for your orchard",
    body: "Send us your village and crop. We'll schedule a sample pickup and return a full report with a fertilizer plan.",
    cta: "Book a soil test",
    href: "/soil-testing#soil-test",
    tone: "lime" as const,
  },
  {
    kind: "dealer",
    eyebrow: "For Dealers & Agents",
    title: "Become a Shalimar partner",
    body: "Stock a brand orchards already trust. Fill the partner form and our team will call you within 48 hours.",
    cta: "Apply as a partner",
    href: "/become-a-partner#partner-form",
    tone: "forest" as const,
  },
];

/* ---------- Testimonials ----------
   Quotes and rating are taken verbatim from the supplied testimonial graphics.
   Names/villages were supplied by the client for the two graphics that carried
   no printed name (Dr. Irfan Rashid's name appears on the original artwork). */
export const testimonials = [
  {
    quote:
      "I am very satisfied with the soil testing report. My income has increased. Thank you Shalimar Agro Mart.",
    name: "Ghulam Rasool Bhat",
    role: "Apple grower",
    place: "Sopore, Baramulla",
    rating: 5,
    image: "/testimonial-soil-report.jpg",
    imageAlt:
      "Verified farmer testimonial: soil testing report increased grower income",
  },
  {
    quote:
      "Since I started using Shalimar Agro Mart's soil testing service, my orchard is healthier and more productive. Truly a blessing for farmers like us.",
    name: "Bashir Ahmad Wani",
    role: "Orchard owner",
    place: "Pattan, Baramulla",
    rating: 5,
    image: "/testimonial-orchard.jpg",
    imageAlt:
      "Verified farmer testimonial: healthier and more productive orchard",
  },
  {
    quote:
      "With the help of Shalimar Agro Mart's soil testing and expert advice, I am now growing healthier apples, earning better income and providing a brighter future for my family.",
    name: "Dr. Irfan Rashid",
    role: "Grower & professional",
    place: "Shopian, Kashmir",
    rating: 4,
    image: "/testimonial-irfan-rashid.jpg",
    imageAlt:
      "Dr. Irfan Rashid of Shopian on growing healthier apples with Shalimar Agro Mart",
  },
] as const;

/* ---------- Marquee strip ---------- */
export const marqueeItems = [
  "Soil Testing",
  "Apple Orchard Advisory",
  "Micronutrients",
  "Foliar Nutrition",
  "pH & EC Analysis",
  "Cherry & Walnut",
  "Organic Manure",
  "Dealer Network",
  "IPM Guidance",
  "Yield Planning",
] as const;

/* ---------- FAQ ---------- */
export const faqs = [
  {
    q: "How long does a soil test take?",
    a: "Sample collection is usually scheduled within a couple of days of your call, and the full report with a fertilizer plan is delivered in about 10 days.",
  },
  {
    q: "What do I need to book a test?",
    a: "Your name, village, district, contact number and the crop you grow. That is enough for us to schedule the sample collection.",
  },
  {
    q: "Which crops do you work with?",
    a: "Primarily apple, cherry and walnut orchards, plus seasonal vegetables and field crops across the Kashmir valley.",
  },
  {
    q: "Do you deliver inputs to my village?",
    a: "Yes — we deliver everything your orchard needs for treatment, including lime, gypsum and other recommended inputs, to maintain soil and apple tree health exactly as advised in your soil health report.",
  },
] as const;
