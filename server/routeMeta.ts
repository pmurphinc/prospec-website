/**
 * Route metadata for server-side SEO injection.
 * Provides title, description, and canonical URL for each known route
 * so that crawlers see proper meta tags in the initial HTML response.
 */

interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  robots?: "index, follow" | "noindex, follow";
}

const BASE_URL = "https://www.weareprospec.com";

const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    title: "ProSpec Home Inspections | Sacramento's Certified Master Inspector",
    description:
      "ProSpec provides residential and commercial property inspections across Sacramento, Folsom, and the greater Sacramento Valley. Led by Patrick Murphy, a Certified Master Inspector with approximately 20 years of experience. Same-day reports.",
    canonical: BASE_URL + "/",
  },
  "/services": {
    title: "Residential & Commercial Property Inspections | ProSpec Sacramento",
    description:
      "Explore ProSpec's inspection services: buyer's home inspections, pre-listing inspections, new construction, 11-month warranty, and commercial property condition assessments. Transparent pricing starting at $350.",
    canonical: BASE_URL + "/services",
  },
  "/reviews": {
    title: "ProSpec Home Inspection Reviews | Sacramento & El Dorado County",
    description:
      "Read reviews from ProSpec clients throughout Sacramento, Folsom, Placerville and El Dorado County. Inspections performed by Patrick Murphy, Certified Master Inspector.",
    canonical: BASE_URL + "/reviews",
  },
  "/inspector": {
    title: "Patrick Murphy, Certified Master Inspector | ProSpec Sacramento",
    description:
      "Meet Patrick Murphy, a second-generation property inspector with approximately 20 years of construction and inspection experience serving Sacramento and Folsom.",
    canonical: BASE_URL + "/inspector",
  },
  "/booknow": {
    title: "Schedule Your Inspection Online | ProSpec Sacramento",
    description:
      "Book your residential home inspection online with ProSpec. Review real-time availability, select service add-ons, and secure your inspection slot in minutes. Same-day reports.",
    canonical: BASE_URL + "/booknow",
    robots: "noindex, follow",
  },
  // ─── Local Residential Landing Pages ─────────────────────────────────────
  "/home-inspection-sacramento": {
    title: "Home Inspection Sacramento CA | ProSpec Home Inspections",
    description:
      "Schedule a Sacramento home inspection with ProSpec. Buyer, pre-listing, new construction, and 11-month warranty inspections by a Certified Master Inspector serving Midtown, Land Park, Pocket, and Natomas.",
    canonical: BASE_URL + "/home-inspection-sacramento",
  },
  "/home-inspection-folsom": {
    title: "Home Inspection Folsom CA | ProSpec Home Inspections",
    description:
      "Professional home inspections in Folsom, CA by a Certified Master Inspector. Buyer, pre-listing, new construction, and warranty inspections with same-day digital reports.",
    canonical: BASE_URL + "/home-inspection-folsom",
  },
  "/home-inspection-el-dorado-hills": {
    title: "Home Inspection El Dorado Hills CA | ProSpec Home Inspections",
    description:
      "Certified Master Inspector serving El Dorado Hills. Comprehensive buyer, pre-listing, and new construction inspections with same-day digital reports.",
    canonical: BASE_URL + "/home-inspection-el-dorado-hills",
  },
  "/home-inspection-placerville": {
    title: "Home Inspector Placerville, CA | ProSpec Home Inspections",
    description:
      "Schedule a thorough Placerville home inspection with Patrick Murphy, Certified Master Inspector. Local El Dorado County experience, clear reports and online scheduling.",
    canonical: BASE_URL + "/home-inspection-placerville",
  },
  "/home-inspection-shingle-springs": {
    title: "Home Inspection Shingle Springs CA | ProSpec Home Inspections",
    description:
      "Certified Master Inspector serving Shingle Springs. Thorough buyer, pre-listing, and new construction home inspections with same-day digital reports.",
    canonical: BASE_URL + "/home-inspection-shingle-springs",
  },
  // ─── Service-Specific Pages ──────────────────────────────────────────────
  "/new-construction-inspection": {
    title: "New Construction Home Inspections | ProSpec Sacramento",
    description:
      "Independent new construction home inspections in Sacramento, Folsom, and El Dorado Hills. Document observed concerns before your final builder walk-through.",
    canonical: BASE_URL + "/new-construction-inspection",
  },
  "/11-month-warranty-inspection": {
    title: "11-Month Warranty Home Inspections | ProSpec Sacramento",
    description:
      "11-month builder warranty inspections in Sacramento and Folsom. Document visible concerns and settlement observations for builder review under the applicable warranty.",
    canonical: BASE_URL + "/11-month-warranty-inspection",
  },
  "/manufactured-home-inspection": {
    title: "Manufactured & Mobile Home Inspections | ProSpec Sacramento",
    description:
      "Professional manufactured and mobile home inspections in Sacramento, Folsom, and El Dorado County. Clear, objective reporting by a Certified Master Inspector.",
    canonical: BASE_URL + "/manufactured-home-inspection",
  },
  // ─── Commercial Landing Pages ────────────────────────────────────────────
  "/commercial-property-condition-assessments-sacramento": {
    title: "Property Condition Assessments Sacramento | ProSpec",
    description:
      "Sacramento property condition assessments for commercial due diligence, with an agreed scope, major-system observations, deficiency reporting and capital-planning information.",
    canonical:
      BASE_URL + "/commercial-property-condition-assessments-sacramento",
  },
  "/commercial-building-inspections-sacramento": {
    title: "Commercial Building Inspection Sacramento | ProSpec",
    description:
      "Commercial building inspections in Sacramento for buyers, owners, tenants, investors and brokers. Review major systems and request a scope-based quote from ProSpec.",
    canonical: BASE_URL + "/commercial-building-inspections-sacramento",
  },
  "/apartment-building-inspections-sacramento": {
    title: "Apartment & Multifamily Inspections Sacramento | ProSpec",
    description:
      "Apartment and multifamily property inspections in Sacramento for buyers, owners and rental investors, with unit, common-area and major-system reporting options.",
    canonical: BASE_URL + "/apartment-building-inspections-sacramento",
  },
  // ─── 404 ─────────────────────────────────────────────────────────────────
  "/404": {
    title: "Page Not Found | ProSpec Home Inspections",
    description:
      "The page you are looking for does not exist. Visit our homepage to schedule a home inspection in Sacramento.",
    canonical: "", // No canonical for 404 pages
  },
};

/**
 * Returns the list of known application routes.
 * Used by the server to distinguish between valid SPA routes and true 404s.
 */
const KNOWN_ROUTES = new Set(Object.keys(ROUTE_META).filter(r => r !== "/404"));

export function isKnownRoute(path: string): boolean {
  // Normalize trailing slash
  const normalized = path === "/" ? "/" : path.replace(/\/$/, "");
  return KNOWN_ROUTES.has(normalized);
}

export function getRouteMeta(path: string): RouteMeta {
  const normalized = path === "/" ? "/" : path.replace(/\/$/, "");
  return ROUTE_META[normalized] || ROUTE_META["/404"];
}

/**
 * Normalizes a request path to its canonical form (strips trailing slash).
 */
export function getCanonicalPath(path: string): string {
  return path === "/" ? "/" : path.replace(/\/$/, "");
}
