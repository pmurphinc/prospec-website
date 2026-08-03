/**
 * Server-rendered JSON-LD structured data for SEO.
 * Only includes verifiable information visible on the site.
 * Does NOT include: aggregate ratings, address, license, insurance, or unverified claims.
 */

const BASE_URL = "https://www.weareprospec.com";

// ─── LocalBusiness / HomeAndConstructionBusiness ─────────────────────────────
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "ProSpec Home Inspections",
  url: BASE_URL,
  telephone: "+1-916-432-0332",
  email: "patrick@weareprospec.com",
  image: `${BASE_URL}/assets/prospec-og-image.jpg`,
  logo: `${BASE_URL}/assets/prospec-logo.png`,
  description:
    "Property inspection services in the Sacramento area led by Patrick Murphy, a Certified Master Inspector (CMI).",
  areaServed: [
    { "@type": "City", name: "Sacramento", addressRegion: "CA" },
    { "@type": "City", name: "Folsom", addressRegion: "CA" },
    { "@type": "City", name: "Roseville", addressRegion: "CA" },
    { "@type": "City", name: "Rocklin", addressRegion: "CA" },
    { "@type": "City", name: "El Dorado Hills", addressRegion: "CA" },
    { "@type": "City", name: "Davis", addressRegion: "CA" },
    { "@type": "City", name: "Elk Grove", addressRegion: "CA" },
    { "@type": "City", name: "Placerville", addressRegion: "CA" },
    { "@type": "City", name: "Shingle Springs", addressRegion: "CA" },
  ],
  founder: {
    "@type": "Person",
    name: "Patrick Murphy",
    jobTitle: "Certified Master Inspector",
  },
};

// ─── Service Schemas ─────────────────────────────────────────────────────────
const residentialServices = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Home Inspection",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "ProSpec Home Inspections",
    url: BASE_URL,
  },
  areaServed: [
    { "@type": "City", name: "Sacramento", addressRegion: "CA" },
    { "@type": "City", name: "Folsom", addressRegion: "CA" },
    { "@type": "City", name: "Roseville", addressRegion: "CA" },
    { "@type": "City", name: "Rocklin", addressRegion: "CA" },
    { "@type": "City", name: "El Dorado Hills", addressRegion: "CA" },
    { "@type": "City", name: "Davis", addressRegion: "CA" },
    { "@type": "City", name: "Elk Grove", addressRegion: "CA" },
    { "@type": "City", name: "Placerville", addressRegion: "CA" },
    { "@type": "City", name: "Shingle Springs", addressRegion: "CA" },
  ],
  description:
    "Residential home inspections including buyer's inspections, pre-listing inspections, new construction inspections, and 11-month warranty inspections.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Residential Inspection Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Buyer's Home Inspection" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Pre-Listing Inspection" },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "New Construction Inspection",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "11-Month Warranty Inspection",
        },
      },
    ],
  },
};

const commercialServices = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Commercial Property Condition Assessment",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "ProSpec Home Inspections",
    url: BASE_URL,
  },
  areaServed: [
    { "@type": "City", name: "Sacramento", addressRegion: "CA" },
    { "@type": "City", name: "Folsom", addressRegion: "CA" },
    { "@type": "City", name: "Roseville", addressRegion: "CA" },
    { "@type": "City", name: "Rocklin", addressRegion: "CA" },
    { "@type": "City", name: "El Dorado Hills", addressRegion: "CA" },
  ],
  description:
    "Commercial property condition assessments (PCA) for lenders, brokers, and investors. ASTM-style scope available when requested and agreed in writing. Covers office, retail, industrial, multi-family, and mixed-use properties.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Commercial Inspection Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Property Condition Assessment (PCA)",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Commercial Building Inspection",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Apartment & Multi-Family Inspection",
        },
      },
    ],
  },
};

const manufacturedHomeInspectionService = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Manufactured Home Inspection",
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "ProSpec Home Inspections",
    url: BASE_URL,
  },
  areaServed: [
    { "@type": "City", name: "Sacramento", addressRegion: "CA" },
    { "@type": "City", name: "Folsom", addressRegion: "CA" },
    { "@type": "City", name: "Roseville", addressRegion: "CA" },
    { "@type": "City", name: "Rocklin", addressRegion: "CA" },
    { "@type": "City", name: "El Dorado Hills", addressRegion: "CA" },
    { "@type": "City", name: "Placerville", addressRegion: "CA" },
    { "@type": "City", name: "Shingle Springs", addressRegion: "CA" },
  ],
  description:
    "Visual, non-invasive inspection of manufactured and mobile homes covering readily accessible components. Observations include visible support components, exterior, roof, interior, plumbing, electrical, HVAC, and site drainage as applicable to the agreed scope of work.",
};

// ─── FAQ Schemas (only for pages with visible FAQs) ──────────────────────────
// These answers MUST match the exact visible text in client/src/pages/LocalHomeInspection.tsx.
// Do not paraphrase, shorten, or strengthen claims.
const sacramentoFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a home inspection cost in Sacramento?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Residential home inspections start at $385. Manufactured home inspections and 11-month warranty inspections start at $350. Final pricing depends on the size, age, type, and condition of the property and any additional agreed scope.",
      },
    },
    {
      "@type": "Question",
      name: "Do you inspect older homes in Midtown and Land Park?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Many of Sacramento's most desirable neighborhoods are full of pre-war homes with raised foundations and updated-over-time systems. ProSpec uses a non-invasive visual process to document the condition of accessible components and flag items that warrant specialist follow-up.",
      },
    },
    {
      "@type": "Question",
      name: "Will you check the HVAC system in a hot-summer climate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Because Sacramento Valley summers place heavy demand on cooling equipment, the inspection includes operating and observing the accessible heating and cooling systems and noting age, performance, and visible installation concerns.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer pre-listing inspections for Sacramento sellers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. In competitive grid-area and suburban markets, a pre-listing inspection helps sellers and agents surface visible concerns before going active, reducing escrow surprises and supporting cleaner negotiations.",
      },
    },
    {
      "@type": "Question",
      name: "How soon will I receive my Sacramento inspection report?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reports are typically delivered the same day when site conditions allow. The digital report includes photos, observations, and practical recommendations written for buyers, sellers, and agents.",
      },
    },
  ],
};

const placervilleFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does a Placerville home inspection take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most residential inspections take roughly two to four hours on site. Placerville-area properties often run toward the longer end of that range because sloped lots, elevated decks, detached crawlspace access, and longer walks around the structure all add time. Age, size, and condition affect the total, and you are welcome to attend.",
      },
    },
    {
      "@type": "Question",
      name: "Do you inspect crawlspaces and elevated decks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Crawlspaces are entered and inspected where the opening is accessible and conditions are safe, documenting visible foundation components, framing, and moisture clues. Elevated decks, stairs, and guardrails are inspected for visible, accessible condition, including post bases and pier contact where they can be seen. Where an area cannot be safely accessed, the report states that it was not inspected and explains why.",
      },
    },
    {
      "@type": "Question",
      name: "Can you inspect rural homes with wells or septic systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, ProSpec inspects rural and semi-rural Placerville-area homes. The standard inspection is a visual review of the home and its readily accessible systems. It does not include septic tank pumping or opening, water-quality laboratory testing, or well yield testing, and those are not part of the scope. Visible, accessible components such as the water heater, visible supply piping, and any visible pressure or treatment equipment are observed and documented, and specialist follow-up is recommended where appropriate. Detached structures and outbuildings are included only when specifically added to the inspection agreement.",
      },
    },
    {
      "@type": "Question",
      name: "Will you walk the roof?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Where it is safe and practical, yes. Roof access depends on weather, roof pitch and covering, the condition of the roof surface, height, and whether it can be reached safely with a ladder. When walking the roof is not appropriate, it is inspected using the best available alternative — from a ladder at the eave, from the ground, or with aerial photography. The report identifies which method was used and notes any areas that could not be evaluated.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a home inspection cost in Placerville?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Residential home inspections start at $385. Manufactured home inspections and 11-month warranty inspections start at $350. Final pricing depends on the size, age, type, and setting of the property and any additional agreed scope.",
      },
    },
    {
      "@type": "Question",
      name: "Do you inspect older and historic Placerville homes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Placerville has a deep stock of older and historic homes. ProSpec uses a non-invasive visual process to document accessible components, distinguish original construction from later repairs, and recommend specialist follow-up where appropriate.",
      },
    },
    {
      "@type": "Question",
      name: "How soon will I receive my Placerville inspection report?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reports are typically delivered the same day when site conditions allow, with photos, observations, and practical recommendations for buyers, sellers, and agents.",
      },
    },
  ],
};

// ─── Breadcrumb Schemas ──────────────────────────────────────────────────────
function buildBreadcrumb(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── Route → JSON-LD Mapping ─────────────────────────────────────────────────
function getSchemas(routePath: string): object[] {
  switch (routePath) {
    case "/":
      return [localBusinessSchema];

    case "/services":
      return [
        residentialServices,
        commercialServices,
        buildBreadcrumb([
          { name: "Home", url: BASE_URL },
          { name: "Services", url: `${BASE_URL}/services` },
        ]),
      ];

    case "/reviews":
      return [
        buildBreadcrumb([
          { name: "Home", url: BASE_URL },
          { name: "Reviews", url: `${BASE_URL}/reviews` },
        ]),
      ];

    case "/inspector":
      return [
        buildBreadcrumb([
          { name: "Home", url: BASE_URL },
          { name: "Inspector", url: `${BASE_URL}/inspector` },
        ]),
      ];

    case "/booknow":
      return [
        buildBreadcrumb([
          { name: "Home", url: BASE_URL },
          { name: "Schedule Inspection", url: `${BASE_URL}/booknow` },
        ]),
      ];

    // Local residential pages
    case "/home-inspection-sacramento":
      return [
        sacramentoFaq,
        residentialServices,
        buildBreadcrumb([
          { name: "Home", url: BASE_URL },
          { name: "Services", url: `${BASE_URL}/services` },
          { name: "Sacramento", url: `${BASE_URL}/home-inspection-sacramento` },
        ]),
      ];

    case "/home-inspection-folsom":
      return [
        residentialServices,
        buildBreadcrumb([
          { name: "Home", url: BASE_URL },
          { name: "Services", url: `${BASE_URL}/services` },
          { name: "Folsom", url: `${BASE_URL}/home-inspection-folsom` },
        ]),
      ];

    case "/home-inspection-el-dorado-hills":
      return [
        residentialServices,
        buildBreadcrumb([
          { name: "Home", url: BASE_URL },
          { name: "Services", url: `${BASE_URL}/services` },
          {
            name: "El Dorado Hills",
            url: `${BASE_URL}/home-inspection-el-dorado-hills`,
          },
        ]),
      ];

    case "/home-inspection-placerville":
      return [
        placervilleFaq,
        residentialServices,
        buildBreadcrumb([
          { name: "Home", url: BASE_URL },
          { name: "Services", url: `${BASE_URL}/services` },
          {
            name: "Placerville",
            url: `${BASE_URL}/home-inspection-placerville`,
          },
        ]),
      ];

    case "/home-inspection-shingle-springs":
      return [
        residentialServices,
        buildBreadcrumb([
          { name: "Home", url: BASE_URL },
          { name: "Services", url: `${BASE_URL}/services` },
          {
            name: "Shingle Springs",
            url: `${BASE_URL}/home-inspection-shingle-springs`,
          },
        ]),
      ];

    // Service-specific pages
    case "/new-construction-inspection":
      return [
        residentialServices,
        buildBreadcrumb([
          { name: "Home", url: BASE_URL },
          { name: "Services", url: `${BASE_URL}/services` },
          {
            name: "New Construction Inspection",
            url: `${BASE_URL}/new-construction-inspection`,
          },
        ]),
      ];

    case "/11-month-warranty-inspection":
      return [
        residentialServices,
        buildBreadcrumb([
          { name: "Home", url: BASE_URL },
          { name: "Services", url: `${BASE_URL}/services` },
          {
            name: "11-Month Warranty Inspection",
            url: `${BASE_URL}/11-month-warranty-inspection`,
          },
        ]),
      ];

    case "/manufactured-home-inspection":
      return [
        manufacturedHomeInspectionService,
        buildBreadcrumb([
          { name: "Home", url: BASE_URL },
          { name: "Services", url: `${BASE_URL}/services` },
          {
            name: "Manufactured Home Inspection",
            url: `${BASE_URL}/manufactured-home-inspection`,
          },
        ]),
      ];

    // Commercial pages
    case "/commercial-property-condition-assessments-sacramento":
      return [
        commercialServices,
        buildBreadcrumb([
          { name: "Home", url: BASE_URL },
          {
            name: "Commercial PCA",
            url: `${BASE_URL}/commercial-property-condition-assessments-sacramento`,
          },
        ]),
      ];

    case "/commercial-building-inspections-sacramento":
      return [
        commercialServices,
        buildBreadcrumb([
          { name: "Home", url: BASE_URL },
          {
            name: "Commercial Building Inspections",
            url: `${BASE_URL}/commercial-building-inspections-sacramento`,
          },
        ]),
      ];

    case "/apartment-building-inspections-sacramento":
      return [
        commercialServices,
        buildBreadcrumb([
          { name: "Home", url: BASE_URL },
          {
            name: "Apartment Inspections",
            url: `${BASE_URL}/apartment-building-inspections-sacramento`,
          },
        ]),
      ];

    default:
      return [];
  }
}

/**
 * Returns the JSON-LD script tags for a given route.
 */
export function getJsonLd(routePath: string): string {
  const schemas = getSchemas(routePath);
  if (schemas.length === 0) return "";

  return schemas
    .map(
      schema =>
        `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
    )
    .join("\n    ");
}
