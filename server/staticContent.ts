/**
 * Route-specific above-the-fold content rendered into the initial HTML response.
 *
 * WHY: the app is a client-rendered SPA. Before this module existed, every route
 * shipped an empty <div id="root"></div> with ~127 characters of body text, so no
 * H1, price, phone number, or booking CTA existed in the raw HTTP response. That
 * is the root cause of the fragmented search snippets — not animated headings.
 * There are no animation or split-text components in this codebase.
 *
 * HOW: this block is injected INSIDE <div id="root">. React's
 * createRoot(...).render() clears the container on first render, so the content
 * is replaced — never duplicated — once the bundle executes.
 *
 * ── HARD RULE: NOT HIDDEN, NOT CLOAKED ─────────────────────────────────────
 * This is real, visible, useful visitor content that renders while JS loads.
 * Never apply display:none, visibility:hidden, aria-hidden, zero opacity, or
 * off-screen positioning to it. The wording MUST stay a faithful subset of what
 * the React page actually renders for that route. If you change a page's H1 or
 * hero copy, change it here too — tests/integration-tests.sh asserts they match.
 */

import {
  BASE_URL,
  BUSINESS_NAME,
  PHONE_DISPLAY,
  PHONE_SMS_HREF,
  PHONE_TEL_HREF,
  PRICE_QUALIFIER,
  PRICING,
} from "../shared/business";

interface StaticContent {
  /** Plain-text H1. Must equal the text the React page renders. */
  h1: string;
  /** Lead paragraph(s). Must be a faithful subset of the rendered hero copy. */
  intro: string[];
  /** Optional pricing line. Only where the visible page also shows a price. */
  price?: string;
}

const RESIDENTIAL_PRICE = `Residential home inspections start at $${PRICING.residentialFrom}. Manufactured home and 11-month warranty inspections start at $${PRICING.manufacturedFrom}. ${PRICE_QUALIFIER}`;

const MANUFACTURED_PRICE = `Manufactured home inspections start at $${PRICING.manufacturedFrom}. ${PRICE_QUALIFIER}`;

const WARRANTY_PRICE = `11-month warranty inspections start at $${PRICING.warrantyFrom}. ${PRICE_QUALIFIER}`;

const ROUTE_CONTENT: Record<string, StaticContent> = {
  "/": {
    h1: "Sacramento’s Certified Master Home Inspector",
    intro: [
      "Same-day reports. 20 years of construction & inspection experience. Providing uncompromising physical due diligence across Sacramento, Folsom, and the greater Sacramento Valley.",
    ],
    price: RESIDENTIAL_PRICE,
  },

  "/services": {
    h1: "Home & Commercial Inspection Services",
    intro: [
      "From residential home purchases to institutional commercial acquisitions, ProSpec provides highly detailed physical due diligence. Every inspection is led by Patrick Murphy, a Certified Master Inspector with approximately 20 years of construction and inspection experience.",
    ],
    price: RESIDENTIAL_PRICE,
  },

  "/reviews": {
    h1: "ProSpec Client Reviews",
    intro: [
      "Read feedback from ProSpec clients who worked with Patrick Murphy for home inspections throughout Sacramento, Folsom, Placerville, and El Dorado County.",
    ],
  },

  "/inspector": {
    h1: "Meet Patrick Murphy",
    intro: [
      "Patrick Murphy is a second-generation property inspector and a Certified Master Inspector with approximately 20 years of construction and inspection experience serving Sacramento, Folsom, and El Dorado County.",
    ],
  },

  "/booknow": {
    h1: "Schedule Your Inspection",
    intro: [
      "Book your residential inspection instantly online. Review real-time availability, select your service add-ons, get immediate pricing, and secure your inspection slot in minutes.",
    ],
    price: RESIDENTIAL_PRICE,
  },

  "/booking-confirmed": {
    h1: "Your Inspection Request Is Confirmed",
    intro: [
      "Thank you for scheduling with ProSpec. You will receive a confirmation email with your inspection details, followed by your digital inspection agreement and invoice before the inspection date.",
    ],
  },

  // ─── Local residential landing pages ──────────────────────────────────────
  "/home-inspection-sacramento": {
    h1: "Home Inspection in Sacramento, CA",
    intro: [
      "Sacramento is one of California's most layered housing markets, where Craftsman bungalows in Midtown and Land Park sit a few blocks from mid-century ranch homes, infill condos, and master-planned subdivisions in Natomas and the Pocket. ProSpec inspects across that full range, giving buyers, sellers, agents, and investors a clear read on a home before contingencies are removed.",
    ],
    price: RESIDENTIAL_PRICE,
  },

  "/home-inspection-folsom": {
    h1: "Home Inspection in Folsom, CA",
    intro: [
      "ProSpec provides buyer, pre-listing, new construction, and 11-month warranty inspections throughout Folsom and the Highway 50 corridor, with same-day digital reports written for buyers, sellers, and agents.",
    ],
    price: RESIDENTIAL_PRICE,
  },

  "/home-inspection-el-dorado-hills": {
    h1: "Home Inspection in El Dorado Hills, CA",
    intro: [
      "ProSpec inspects El Dorado Hills homes across the full range of hillside estates, custom builds, and master-planned neighborhoods, documenting the condition of accessible systems before contingencies are removed.",
    ],
    price: RESIDENTIAL_PRICE,
  },

  "/home-inspection-placerville": {
    h1: "Home Inspections in Placerville, CA",
    intro: [
      "ProSpec provides home inspections in Placerville and the surrounding El Dorado County foothills, including Diamond Springs, Camino, Pollock Pines, Shingle Springs, Cameron Park, and El Dorado. Whether the property sits a few blocks from Main Street or at the end of a long gravel driveway, the inspection is scoped to the home in front of it.",
    ],
    price: RESIDENTIAL_PRICE,
  },

  "/home-inspection-shingle-springs": {
    h1: "Home Inspection in Shingle Springs, CA",
    intro: [
      "ProSpec inspects Shingle Springs homes and rural foothill acreage, from tract neighborhoods to manufactured homes on large parcels, documenting visible and accessible components with same-day digital reports.",
    ],
    price: RESIDENTIAL_PRICE,
  },

  // ─── Service-specific pages ───────────────────────────────────────────────
  "/new-construction-inspection": {
    h1: "New Construction Home Inspections",
    intro: [
      "An independent visual inspection before closing can document observed installation, finish, and system concerns to discuss with the builder. ProSpec provides non-invasive inspections of newly built homes in Sacramento, Folsom, and El Dorado County.",
    ],
    price: RESIDENTIAL_PRICE,
  },

  "/11-month-warranty-inspection": {
    h1: "11-Month Warranty Inspections",
    intro: [
      "Schedule near the end of your builder warranty period, based on the builder's terms. ProSpec provides independent, visual assessments of homes in Sacramento, Folsom, and surrounding areas to document visible concerns before your coverage window closes.",
    ],
    price: WARRANTY_PRICE,
  },

  "/manufactured-home-inspection": {
    h1: "Manufactured Home Inspections",
    intro: [
      "Clear, objective assessments of manufactured and mobile homes. ProSpec provides independent, visual inspections in Sacramento, Folsom, and surrounding areas to help buyers and owners understand the condition of their property.",
    ],
    price: MANUFACTURED_PRICE,
  },

  // ─── Commercial landing pages ─────────────────────────────────────────────
  "/commercial-property-condition-assessments-sacramento": {
    h1: "Commercial Property Condition Assessments (PCA)",
    intro: [
      "Protect your capital and mitigate transaction risk. ProSpec provides commercial property condition assessments based on the agreed scope of work across Sacramento and Folsom.",
    ],
  },

  "/commercial-building-inspections-sacramento": {
    h1: "Commercial Building Inspections",
    intro: [
      "Practical, detailed physical evaluations of commercial assets. Designed for local business owners, commercial tenants, and private real estate investors across Sacramento and Folsom.",
    ],
  },

  "/apartment-building-inspections-sacramento": {
    h1: "Apartment & Multi-Family Inspections",
    intro: [
      "Specialized physical due diligence for multi-family residential assets. Designed for portfolio investors, syndicators, and property managers across Sacramento and Folsom.",
    ],
  },
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Minimal styling so the pre-hydration view is legible rather than a flash of
 * unstyled white text. Deliberately plain: this is a progressive-enhancement
 * fallback, not a second design system.
 */
const WRAPPER_STYLE = [
  "max-width:52rem",
  "margin:0 auto",
  "padding:6rem 1.5rem 4rem",
  "font-family:'Plus Jakarta Sans',system-ui,sans-serif",
  "color:#d4d4d8",
  "line-height:1.6",
].join(";");

const H1_STYLE = [
  "font-family:'Playfair Display',Georgia,serif",
  "font-size:clamp(1.9rem,5vw,3rem)",
  "text-transform:uppercase",
  "letter-spacing:0.05em",
  "color:#fff",
  "margin:0 0 1.25rem",
  "line-height:1.15",
].join(";");

const LINK_STYLE = "color:#fff;font-weight:600";

/**
 * Returns the static above-the-fold HTML for a route, or "" if the route has
 * no entry (404s and unknown paths render nothing).
 */
export function getStaticContent(routePath: string): string {
  const content = ROUTE_CONTENT[routePath];
  if (!content) return "";

  const paragraphs = content.intro
    .map(p => `<p>${escapeHtml(p)}</p>`)
    .join("\n        ");

  const price = content.price
    ? `\n        <p>${escapeHtml(content.price)}</p>`
    : "";

  // Booking CTA is a real anchor so it works, and is measurable, without JS.
  return `<div id="prospec-static-content" style="${WRAPPER_STYLE}">
        <h1 style="${H1_STYLE}">${escapeHtml(content.h1)}</h1>
        ${paragraphs}${price}
        <p>
          <a href="${PHONE_TEL_HREF}" style="${LINK_STYLE}" data-track-event="phone_click" data-track-location="static-fallback">Call ${escapeHtml(PHONE_DISPLAY)}</a>
          &nbsp;·&nbsp;
          <a href="${PHONE_SMS_HREF}" style="${LINK_STYLE}" data-track-event="text_click" data-track-location="static-fallback">Text ${escapeHtml(PHONE_DISPLAY)}</a>
          &nbsp;·&nbsp;
          <a href="${BASE_URL}/booknow" style="${LINK_STYLE}" data-track-event="booking_cta_click" data-track-location="static-fallback">Schedule Your Inspection</a>
        </p>
        <p>${escapeHtml(BUSINESS_NAME)} — Patrick Murphy, Certified Master Inspector. Serving Sacramento, Folsom, and El Dorado County.</p>
      </div>`;
}

/** Test/tooling accessor: the H1 a given route must render. */
export function getStaticH1(routePath: string): string | undefined {
  return ROUTE_CONTENT[routePath]?.h1;
}
