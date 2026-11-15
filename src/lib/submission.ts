/* ============================================================
   Shared submission logic — used by BOTH the client forms and
   the /api/registrations route handler so validation and the
   outbound message body can never drift apart.
   ============================================================ */

import { business, soilPlans, type SoilPlan } from "@/lib/data";

export type Channel = "whatsapp" | "email";
export type SubmissionType = "soil-test" | "partner";

/** Crops that aren't grown in orchards → orchard type not required. */
export const NO_ORCHARD_CROPS = ["Vegetables", "Field crops"] as const;

export type SoilFields = {
  name?: string;
  phone?: string;
  village?: string;
  district?: string;
  crop?: string;
  orchard?: string;
  irrigation?: string;
  treeAge?: string;
  production?: string;
  area?: string;
  notes?: string;
  /** Honeypot — must stay empty; bots fill it. */
  website?: string;
};

export type PartnerFields = {
  pName?: string;
  pPhone?: string;
  pFirm?: string;
  pType?: string;
  pVillage?: string;
  pDistrict?: string;
  pNote?: string;
  /** Honeypot — must stay empty; bots fill it. */
  website?: string;
};

const clean = (v: unknown) => String(v ?? "").trim();
const isTenDigit = (v: string) => /^[0-9]{10}$/.test(v.replace(/\s+/g, ""));

/* ---------- Validation (returns an error message, or null) ---------- */

export function validateSoil(f: SoilFields): string | null {
  const name = clean(f.name);
  const village = clean(f.village);
  const district = clean(f.district);
  const crop = clean(f.crop);
  const orchard = clean(f.orchard);
  const irrigation = clean(f.irrigation);
  const phone = clean(f.phone);

  const orchardNeeded = !NO_ORCHARD_CROPS.includes(crop as never);
  if (!name || !village || !district || !crop || !irrigation || (orchardNeeded && !orchard)) {
    return orchardNeeded
      ? "Please fill in your name, village, district, crop, orchard type and irrigation type."
      : "Please fill in your name, village, district, crop and irrigation type.";
  }
  if (!isTenDigit(phone)) return "Enter a valid 10-digit mobile number.";
  return null;
}

export function validatePartner(f: PartnerFields): string | null {
  if (!clean(f.pName) || !clean(f.pFirm) || !clean(f.pVillage) || !clean(f.pDistrict) || !clean(f.pType)) {
    return "Please fill in all required fields marked with *.";
  }
  if (!isTenDigit(clean(f.pPhone))) return "Enter a valid 10-digit mobile number.";
  return null;
}

/* ---------- Message bodies ---------- */

export function getPlan(id: unknown): SoilPlan | undefined {
  return soilPlans.find((p) => p.id === id);
}

export function soilLines(f: SoilFields, plan: SoilPlan): string[] {
  const orchard = clean(f.orchard);
  const crop = clean(f.crop);
  return [
    "soil test booking",
    `Plan: ${plan.name} — ₹${plan.price}`,
    `Parameters: ${plan.params.join(", ")}`,
    `Name: ${clean(f.name)}`,
    `Village/Town: ${clean(f.village)}`,
    `District: ${clean(f.district)}`,
    `Phone: ${clean(f.phone)}`,
    `Crop: ${crop}`,
    orchard ? `Orchard type: ${orchard}` : `Orchard type: N/A (${crop.toLowerCase()})`,
    `Irrigation: ${clean(f.irrigation)}`,
    clean(f.treeAge) ? `Tree age (years): ${clean(f.treeAge)}` : "",
    clean(f.production) ? `Last year production: ${clean(f.production)}` : "",
    clean(f.area) ? `Land area: ${clean(f.area)} kanal` : "",
    clean(f.notes) ? `Remarks: ${clean(f.notes)}` : "",
  ].filter(Boolean);
}

export function partnerLines(f: PartnerFields): string[] {
  return [
    "PARTNER REGISTRATION",
    `Name: ${clean(f.pName)}`,
    `Firm / Business: ${clean(f.pFirm)}`,
    `Type: ${clean(f.pType)}`,
    `Village/Town: ${clean(f.pVillage)}`,
    `District: ${clean(f.pDistrict)}`,
    `Phone: ${clean(f.pPhone)}`,
    clean(f.pNote) ? `Note: ${clean(f.pNote)}` : "",
  ].filter(Boolean);
}

/* ---------- Fallback deep-links (used when the API can't deliver) ---------- */

export function soilSubject(plan: SoilPlan): string {
  return `Soil test booking — ${plan.name} plan`;
}

export function partnerSubject(f: PartnerFields): string {
  const firm = clean(f.pFirm);
  return `Partner registration${firm ? ` — ${firm}` : ""}`;
}

export function waUrl(lines: string[]): string {
  return `${business.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function mailUrl(subject: string, lines: string[]): string {
  return `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
