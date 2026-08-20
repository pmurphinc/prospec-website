/**
 * Canonical ProSpec business constants — single source of truth.
 *
 * Imported by the client via the "@shared/*" alias (vite.config.ts) and by the
 * server via a relative path (esbuild bundles server/index.ts without the alias).
 *
 * ProSpec is a SERVICE-AREA business. No street address is published anywhere,
 * and none may be added here. Do not add hours, ratings, review counts, or
 * certifications that are not visibly supported on the site.
 */

export const BUSINESS_NAME = "ProSpec Home Inspections";
export const INSPECTOR_NAME = "Patrick Murphy";
export const INSPECTOR_TITLE = "Certified Master Inspector";
export const INTERNACHI_ID = "NACHI17030156";

export const BASE_URL = "https://www.weareprospec.com";

/** Display form used in visible copy. */
export const PHONE_DISPLAY = "(916) 432-0332";
/** E.164 form used in tel:/sms: hrefs and schema. */
export const PHONE_E164 = "+19164320332";
export const PHONE_TEL_HREF = `tel:${PHONE_E164}`;
export const PHONE_SMS_HREF = `sms:${PHONE_E164}`;
/** Hyphenated E.164 form required by schema.org telephone. */
export const PHONE_SCHEMA = "+1-916-432-0332";

export const EMAIL = "patrick@weareprospec.com";
export const EMAIL_HREF = `mailto:${EMAIL}`;

/**
 * Verified official profiles only.
 *
 * Every URL here is emitted publicly in JSON-LD `sameAs`, so it must resolve to
 * a real, currently-owned ProSpec profile. Never add a placeholder, an empty
 * string, or a guessed URL — an unverified entry is worse than an absent one.
 *
 * Deliberately absent, pending owner action:
 *   - Google Business Profile — exact profile/share URL not yet supplied.
 *   - InterNACHI — two duplicate profiles exist; add the surviving canonical
 *     profile only after they are consolidated.
 */
export const SAME_AS: readonly string[] = [
  "https://app.spectora.com/home-inspectors/my-inspection-company-14f9d0e41f",
  "https://www.linkedin.com/in/inspectormurph",
  "https://www.instagram.com/weareprospec/",
  "https://www.facebook.com/1097767973576245/",
];

/** Cities ProSpec serves. Used for schema areaServed — not physical locations. */
export const SERVICE_AREAS = [
  "Sacramento",
  "Folsom",
  "Roseville",
  "Rocklin",
  "El Dorado Hills",
  "Davis",
  "Elk Grove",
  "Placerville",
  "Shingle Springs",
] as const;

/** Subset used by commercial services. */
export const COMMERCIAL_SERVICE_AREAS = [
  "Sacramento",
  "Folsom",
  "Roseville",
  "Rocklin",
  "El Dorado Hills",
] as const;

/** Subset used by manufactured-home services. */
export const MANUFACTURED_SERVICE_AREAS = [
  "Sacramento",
  "Folsom",
  "Roseville",
  "Rocklin",
  "El Dorado Hills",
  "Placerville",
  "Shingle Springs",
] as const;

/** Builds a schema.org City[] array from a list of city names. */
export function toAreaServed(
  cities: readonly string[]
): Array<{ "@type": "City"; name: string; addressRegion: string }> {
  return cities.map(name => ({
    "@type": "City" as const,
    name,
    addressRegion: "CA",
  }));
}

/**
 * Real, bookable starting prices. These mirror Spectora's size-based pricing;
 * they are floors, not flat rates. Never publish one of these without the
 * qualifier below next to it.
 */
export const PRICING = {
  residentialFrom: 385,
  manufacturedFrom: 350,
  warrantyFrom: 350,
} as const;

export const PRICE_QUALIFIER =
  "Final pricing varies based on square footage, property age, foundation type, detached structures, and selected add-on services.";
