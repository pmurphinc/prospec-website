import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Home,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import FAQ from "@/components/FAQ";

/*
  DESIGN PHILOSOPHY: Approach 1 - The Master Builder (Industrial Editorial)

  SEO NOTE (duplicate-content fix):
  Each city is driven by a fully distinct content record below. Beyond the
  obvious city-name swap, every page now carries unique multi-paragraph intros,
  a city-specific local-context narrative, differentiated service emphasis,
  unique inspection-focus copy, varied section eyebrows/headings, a unique CTA
  line, and city-specific FAQ entries. This ensures Google sees each landing
  page as substantially unique rather than a templated duplicate.
*/

type ServiceCard = {
  title: string;
  price: string;
  text: string;
  href?: string;
};

type Faq = {
  question: string;
  answer: string;
};

/*
  Local field photography (optional, per city).

  These are ProSpec's own inspection photographs. Only cities that have a
  reviewed, privacy-cleared photo set define them; every other city renders
  exactly as before. Source files carry no EXIF, GPS, or client-identifying
  metadata, and filenames are deliberately generic.

  Width/height are the intrinsic pixel dimensions of the optimized asset and
  must stay in sync with the files in /assets/placerville so the browser can
  reserve space and avoid layout shift.
*/
type LocalPhoto = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

type LocalPage = {
  slug: string;
  city: string;
  region: string;
  title: string;
  description: string;
  // Hero
  heroEyebrow: string;
  /** Optional H1 override. Defaults to "Home Inspection in {city}, CA". */
  h1Heading?: string;
  introParagraphs: string[];
  // Optional local field photography (see LocalPhoto)
  leadPhoto?: LocalPhoto;
  leadPhotoHeading?: string;
  leadPhotoParagraphs?: string[];
  fieldPhotosEyebrow?: string;
  fieldPhotosHeading?: string;
  fieldPhotosLede?: string;
  fieldPhotos?: LocalPhoto[];
  // Trust band (city-tuned)
  trustItems: string[];
  // Section 01 - services
  servicesEyebrow: string;
  servicesHeading: string;
  servicesLede: string;
  serviceCards: ServiceCard[];
  // Section 02 - what is inspected
  inspectedEyebrow: string;
  inspectedHeading: string;
  inspectedLede: string;
  inspectedItems: string[];
  // Section 03 - local concerns
  concernsEyebrow: string;
  concernsHeading: string;
  localAngle: string;
  concerns: string[];
  secondaryPhrases: string[];
  // Local context (unique narrative block)
  contextEyebrow: string;
  contextHeading: string;
  contextParagraphs: string[];
  contextHighlights: { label: string; value: string }[];
  // CTA
  ctaHeading: string;
  ctaLine: string;
  // FAQ
  faqs: Faq[];
};

const SHARED_INTERNAL_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Reviews", href: "/reviews" },
  { label: "Inspector", href: "/inspector" },
  { label: "Book Now", href: "/booknow" },
];

const LOCAL_PAGES: Record<string, LocalPage> = {
  /* ============================ SACRAMENTO ============================ */
  "/home-inspection-sacramento": {
    slug: "home-inspection-sacramento",
    city: "Sacramento",
    region: "Sacramento County",
    title: "Home Inspection Sacramento CA | ProSpec Home Inspections",
    description:
      "Schedule a Sacramento home inspection with ProSpec. Buyer, pre-listing, new construction, and 11-month warranty inspections by a Certified Master Inspector serving Midtown, Land Park, Pocket, and Natomas.",
    heroEyebrow: "Capital City Residential Inspections",
    introParagraphs: [
      "Sacramento is one of California's most layered housing markets, where Craftsman bungalows in Midtown and Land Park sit a few blocks from mid-century ranch homes, infill condos, and master-planned subdivisions in Natomas and the Pocket. ProSpec inspects across that full range, giving buyers, sellers, agents, and investors a clear read on a home before contingencies are removed.",
      "Because so much of the city's inventory was built before modern construction codes and then partially remodeled over the decades, a Sacramento inspection often comes down to separating original systems from later upgrades. ProSpec documents what is visible and accessible, explains which findings actually matter, and keeps the report focused on practical real estate decisions rather than alarm.",
    ],
    trustItems: [
      "Certified Master Inspector serving the Sacramento grid and suburbs",
      "Roughly 20 years of construction and inspection experience",
      "Comfortable with older raised-foundation and remodeled homes",
      "Same-day digital reports with photos and clear priorities",
    ],
    servicesEyebrow: "01. Sacramento Residential Services",
    servicesHeading: "Inspection Services for Sacramento Homes",
    servicesLede:
      "From a first-time buyer in Tahoe Park to an investor evaluating a flipped duplex near downtown, ProSpec tailors the inspection to the property and the transaction. Every service is a visual, non-invasive review of readily accessible systems.",
    serviceCards: [
      {
        title: "Buyer's Home Inspections",
        price: "Residential inspections start at $385.",
        text: "Ideal for Sacramento buyers navigating competitive offers, this inspection documents the condition of the home's accessible systems so you can remove contingencies or renegotiate with real information.",
      },
      {
        title: "Pre-Listing Inspections",
        price: "Residential inspections start at $385.",
        text: "Sellers in tight Midtown and Land Park markets use a pre-listing inspection to surface repair items early, avoid escrow surprises, and present a cleaner, more defensible listing.",
      },
      {
        title: "New Construction Inspections",
        price: "Residential inspections start at $385.",
        text: "For new builds in Natomas, North Sacramento, and surrounding subdivisions, a third-party walkthrough before closing documents installation concerns and items to raise with the builder.",
        href: "/new-construction-inspection",
      },
      {
        title: "11-Month Warranty Inspections",
        price: "11-month warranty inspections start at $350.",
        text: "A review near the end of the first ownership year so settling, finish, and mechanical concerns can be documented before the builder warranty window closes.",
        href: "/11-month-warranty-inspection",
      },
      {
        title: "Manufactured Home Inspections",
        price: "Manufactured home inspections start at $350.",
        text: "Inspection of accessible manufactured home components, including visible support, exterior, roof, interior, plumbing, electrical, HVAC, and site drainage observations based on the agreed scope.",
        href: "/manufactured-home-inspection",
      },
    ],
    inspectedEyebrow: "02. What Is Inspected",
    inspectedHeading: "Original Systems vs. Later Upgrades",
    inspectedLede:
      "A Sacramento home inspection is a professional visual review of readily accessible systems, not a code-compliance audit, engineering report, or pest certification. On older grid-area homes, the value is in clarifying which components are original and which were updated over time.",
    inspectedItems: [
      "Roof coverings, flashings, and drainage on older and re-roofed homes",
      "Raised foundations, basements, and crawlspaces where safely accessible",
      "Aging or mixed-era electrical panels, wiring, and added circuits",
      "Galvanized, copper, or repiped plumbing and water heater condition",
      "HVAC age and performance, including converted or added systems",
      "Exterior siding, trim, windows, and grading near the structure",
      "Interior walls, ceilings, floors, stairs, and built-in appliances",
      "Safety concerns and moisture indicators documented with photos",
    ],
    concernsEyebrow: "03. Sacramento Concerns",
    concernsHeading: "Sacramento Inspection Focus",
    localAngle:
      "For Sacramento properties we pay close attention to roof condition, HVAC age in a hot-summer climate, crawlspace access on raised foundations, visible foundation movement, electrical and plumbing updates from different eras, and drainage on flat valley lots that can pool water against the structure.",
    concerns: [
      "Older housing stock with partial remodels and mixed-era systems",
      "Raised foundations, crawlspaces, and visible moisture indicators",
      "HVAC capacity and condition for Sacramento Valley summer heat",
      "Flat-lot drainage and grading that directs water toward the home",
    ],
    secondaryPhrases: [
      "home inspector Sacramento",
      "real estate inspector Sacramento",
      "pre-listing inspection Sacramento",
      "11-month warranty inspection Sacramento",
    ],
    contextEyebrow: "04. Local Context",
    contextHeading: "Inspecting in the Sacramento Valley",
    contextParagraphs: [
      "Sacramento's flat valley floor, hot dry summers, and clay-heavy soils shape what tends to show up during an inspection. Long cooling seasons put real strain on HVAC equipment, and homes with original or undersized systems often reveal performance issues that matter to a buyer's budget.",
      "The city's deep stock of pre-1970 homes also means inspections frequently involve raised foundations, older service panels, and plumbing that has been partially updated. ProSpec's reporting separates these realities into clear priorities so you are not guessing about what to fix first.",
    ],
    contextHighlights: [
      {
        label: "Common housing era",
        value: "Pre-war bungalows to modern infill",
      },
      { label: "Foundation type", value: "Frequently raised w/ crawlspace" },
      { label: "Climate factor", value: "Hot-summer HVAC demand" },
      { label: "Terrain", value: "Flat valley lots, drainage focus" },
    ],
    ctaHeading: "Book a Sacramento Home Inspection",
    ctaLine:
      "Get a clear, photo-documented report on your Sacramento home from a Certified Master Inspector who knows the city's older and newer housing stock. Schedule online or review service details first.",
    faqs: [
      {
        question: "How much does a home inspection cost in Sacramento?",
        answer:
          "Residential home inspections start at $385. Manufactured home inspections and 11-month warranty inspections start at $350. Final pricing depends on the size, age, type, and condition of the property and any additional agreed scope.",
      },
      {
        question: "Do you inspect older homes in Midtown and Land Park?",
        answer:
          "Yes. Many of Sacramento's most desirable neighborhoods are full of pre-war homes with raised foundations and updated-over-time systems. ProSpec uses a non-invasive visual process to document the condition of accessible components and flag items that warrant specialist follow-up.",
      },
      {
        question: "Will you check the HVAC system in a hot-summer climate?",
        answer:
          "Yes. Because Sacramento Valley summers place heavy demand on cooling equipment, the inspection includes operating and observing the accessible heating and cooling systems and noting age, performance, and visible installation concerns.",
      },
      {
        question:
          "Do you offer pre-listing inspections for Sacramento sellers?",
        answer:
          "Yes. In competitive grid-area and suburban markets, a pre-listing inspection helps sellers and agents surface visible concerns before going active, reducing escrow surprises and supporting cleaner negotiations.",
      },
      {
        question: "How soon will I receive my Sacramento inspection report?",
        answer:
          "Reports are typically delivered the same day when site conditions allow. The digital report includes photos, observations, and practical recommendations written for buyers, sellers, and agents.",
      },
    ],
  },

  /* ============================== FOLSOM ============================== */
  "/home-inspection-folsom": {
    slug: "home-inspection-folsom",
    city: "Folsom",
    region: "Sacramento County / Highway 50 corridor",
    title: "Home Inspection Folsom CA | ProSpec Home Inspections",
    description:
      "Folsom home inspections for buyers, sellers, new construction owners, and 11-month warranty reviews. Detailed reports for Empire Ranch, Folsom Ranch, and established neighborhoods from ProSpec.",
    heroEyebrow: "Folsom & Highway 50 Corridor",
    introParagraphs: [
      "Folsom blends newer master-planned communities like Folsom Ranch and Empire Ranch with established neighborhoods near the historic district and Folsom Lake. That mix means an inspection here can swing from a recently completed production home to a twenty-year-old property with its first round of aging systems, and ProSpec adapts the review accordingly.",
      "Buyers in Folsom are frequently purchasing larger floor plans and newer construction, where the most valuable findings are builder finish issues, drainage details, and mechanical installations rather than age-related wear. ProSpec documents these clearly so they can be raised during a final walkthrough or warranty conversation.",
    ],
    trustItems: [
      "Certified Master Inspector serving Folsom and the Highway 50 corridor",
      "Experience with newer production and larger-floor-plan homes",
      "Builder finish and warranty-item documentation",
      "Same-day digital reports with photos and clear priorities",
    ],
    servicesEyebrow: "01. Folsom Residential Services",
    servicesHeading: "Inspection Services for Folsom Homes",
    servicesLede:
      "Whether you are closing on a new build in Folsom Ranch or buying an established home near the lake, ProSpec scopes the inspection to the property. Every service is a visual, non-invasive review of readily accessible systems.",
    serviceCards: [
      {
        title: "Buyer's Home Inspections",
        price: "Residential inspections start at $385.",
        text: "For Folsom buyers purchasing larger or newer homes, this inspection documents accessible systems and finish quality so you understand the property before removing contingencies.",
      },
      {
        title: "Pre-Listing Inspections",
        price: "Residential inspections start at $385.",
        text: "In Folsom's competitive listing market, sellers use a pre-listing inspection to identify items early and present the home with fewer surprises during escrow.",
      },
      {
        title: "New Construction Inspections",
        price: "Residential inspections start at $385.",
        text: "Folsom's active new-build communities make a third-party inspection valuable before closing, capturing installation and finish concerns to discuss with the builder.",
        href: "/new-construction-inspection",
      },
      {
        title: "11-Month Warranty Inspections",
        price: "11-month warranty inspections start at $350.",
        text: "Especially relevant for newer Folsom homes, this review near the end of the first year documents settling and finish issues before the builder warranty window closes.",
        href: "/11-month-warranty-inspection",
      },
      {
        title: "Manufactured Home Inspections",
        price: "Manufactured home inspections start at $350.",
        text: "Inspection of accessible manufactured home components, including visible support, exterior, roof, interior, plumbing, electrical, HVAC, and site drainage observations based on the agreed scope.",
        href: "/manufactured-home-inspection",
      },
    ],
    inspectedEyebrow: "02. What Is Inspected",
    inspectedHeading: "Finish Quality and System Performance",
    inspectedLede:
      "A Folsom home inspection is a professional visual review of readily accessible systems, not a code-compliance audit or warranty guarantee. On newer homes, attention shifts toward installation quality, drainage, and finish details that affect long-term performance.",
    inspectedItems: [
      "Roof coverings, flashings, and attic observations on newer roofs",
      "Exterior siding, stucco, windows, and grading on larger lots",
      "Visible structure, slab or crawlspace, and framing observations",
      "Electrical panels, distribution, and visible wiring conditions",
      "Plumbing fixtures, supply and drain observations, and water heater review",
      "HVAC equipment performance and visible installation concerns",
      "Builder finish items, doors, windows, stairs, and built-in appliances",
      "Drainage, moisture indicators, and repair priorities documented with photos",
    ],
    concernsEyebrow: "03. Folsom Concerns",
    concernsHeading: "Folsom Inspection Focus",
    localAngle:
      "Folsom inspections often involve newer homes, larger floor plans, exterior drainage on graded lots, roof and attic observations, HVAC equipment sizing, and builder finish issues that can become important during a final walkthrough or warranty period.",
    concerns: [
      "Newer construction and builder warranty review items",
      "Roof, exterior, grading, and drainage observations on larger lots",
      "HVAC performance and visible installation concerns",
      "Pre-listing inspections for competitive Folsom listings",
    ],
    secondaryPhrases: [
      "home inspector Folsom CA",
      "Folsom home inspections",
      "new construction inspection Folsom",
    ],
    contextEyebrow: "04. Local Context",
    contextHeading: "Inspecting Newer Folsom Communities",
    contextParagraphs: [
      "Much of Folsom's housing growth has come from master-planned development south of Highway 50, where production builders deliver homes quickly across large graded sites. The most common inspection findings on these properties tend to be drainage and grading details, attic and HVAC installation items, and minor finish concerns rather than age-related failures.",
      "Established Folsom neighborhoods closer to the lake and historic district behave more like a typical resale market, where roof age, original mechanical systems, and exterior wear become the focus. ProSpec tailors the report to whichever type of property you are buying or selling.",
    ],
    contextHighlights: [
      {
        label: "Common housing era",
        value: "Newer master-planned + 1990s-2000s",
      },
      { label: "Foundation type", value: "Predominantly slab-on-grade" },
      { label: "Climate factor", value: "Hot-summer cooling demand" },
      { label: "Terrain", value: "Graded lots, drainage detailing" },
    ],
    ctaHeading: "Book a Folsom Home Inspection",
    ctaLine:
      "Get a detailed, photo-documented report on your Folsom home or new build from a Certified Master Inspector. Schedule online or review service details before booking.",
    faqs: [
      {
        question: "How much does a home inspection cost in Folsom?",
        answer:
          "Residential home inspections start at $385. Manufactured home inspections and 11-month warranty inspections start at $350. Larger Folsom floor plans may affect final pricing along with property age, type, and any additional agreed scope.",
      },
      {
        question: "Do you inspect new construction homes in Folsom Ranch?",
        answer:
          "Yes. New construction inspections are common in Folsom's master-planned communities. ProSpec documents visible installation concerns, incomplete work, and items to raise with the builder before closing or during the warranty period.",
      },
      {
        question:
          "What is the difference between a buyer's and an 11-month warranty inspection?",
        answer:
          "A buyer's inspection happens before you purchase the home, while an 11-month warranty inspection happens near the end of the first ownership year on a newer build so settling and finish issues can be documented before the builder warranty closes. Both are popular with Folsom homeowners.",
      },
      {
        question: "Do you serve established neighborhoods near Folsom Lake?",
        answer:
          "Yes. ProSpec inspects throughout Folsom, including older neighborhoods near the lake and historic district where roof age and original mechanical systems are typically the focus rather than builder finish items.",
      },
      {
        question: "How soon will I receive my Folsom inspection report?",
        answer:
          "Reports are typically delivered the same day when site conditions allow, with photos, observations, and practical recommendations for buyers, sellers, and agents.",
      },
    ],
  },

  /* ========================= EL DORADO HILLS ========================= */
  "/home-inspection-el-dorado-hills": {
    slug: "home-inspection-el-dorado-hills",
    city: "El Dorado Hills",
    region: "El Dorado County",
    title: "Home Inspection El Dorado Hills CA | ProSpec",
    description:
      "El Dorado Hills home inspections for larger homes, hillside lots, roof systems, drainage, decks, crawlspaces, and premium home due diligence by a Certified Master Inspector.",
    heroEyebrow: "El Dorado County Hillside Estates",
    introParagraphs: [
      "El Dorado Hills is defined by larger homes on sloped, view-oriented lots in communities like Serrano, Blackstone, and the neighborhoods rising above Highway 50. These properties carry features rarely seen on a flat valley lot — multi-level grading, extensive decking, retaining elements, and significant mechanical systems — and each of those deserves careful attention during an inspection.",
      "ProSpec approaches higher-value El Dorado Hills homes with organized, prioritized reporting. The goal is to give buyers, sellers, and agents a clear picture of how the home and its site are performing, especially where slope and drainage interact with the structure, so a premium purchase is backed by real due diligence.",
    ],
    trustItems: [
      "Certified Master Inspector serving El Dorado Hills and Serrano",
      "Experience with larger homes and hillside, view-lot construction",
      "Focus on slope drainage, decks, and major mechanical systems",
      "Same-day digital reports with photos and clear priorities",
    ],
    servicesEyebrow: "01. El Dorado Hills Residential Services",
    servicesHeading: "Inspection Services for El Dorado Hills Homes",
    servicesLede:
      "From a hillside estate in Serrano to a custom home on a view lot, ProSpec scopes the inspection to the size and complexity of the property. Every service is a visual, non-invasive review of readily accessible systems.",
    serviceCards: [
      {
        title: "Buyer's Home Inspections",
        price: "Residential inspections start at $385.",
        text: "For buyers of larger El Dorado Hills homes, this inspection delivers organized documentation of accessible systems, decks, and site conditions before contingencies are removed.",
      },
      {
        title: "Pre-Listing Inspections",
        price: "Residential inspections start at $385.",
        text: "Sellers of premium El Dorado Hills properties use a pre-listing inspection to surface deck, drainage, and mechanical items early and protect a higher asking price.",
      },
      {
        title: "New Construction Inspections",
        price: "Residential inspections start at $385.",
        text: "On newer custom and semi-custom El Dorado Hills homes, a third-party inspection documents installation and finish concerns to raise with the builder before closing.",
        href: "/new-construction-inspection",
      },
      {
        title: "11-Month Warranty Inspections",
        price: "11-month warranty inspections start at $350.",
        text: "A first-year review for newer El Dorado Hills homes, documenting settling, finish, and mechanical concerns before the builder warranty window closes.",
        href: "/11-month-warranty-inspection",
      },
      {
        title: "Manufactured Home Inspections",
        price: "Manufactured home inspections start at $350.",
        text: "Inspection of accessible manufactured home components, including visible support, exterior, roof, interior, plumbing, electrical, HVAC, and site drainage observations based on the agreed scope.",
        href: "/manufactured-home-inspection",
      },
    ],
    inspectedEyebrow: "02. What Is Inspected",
    inspectedHeading: "Slope, Structure, and Systems",
    inspectedLede:
      "An El Dorado Hills home inspection is a professional visual review of readily accessible systems, not an engineering or geotechnical report. On hillside and larger homes, the inspection emphasizes how slope, drainage, decks, and major systems interact.",
    inspectedItems: [
      "Roof systems, flashings, and drainage across larger roof areas",
      "Decks, balconies, guardrails, stairs, and exterior connections",
      "Hillside grading and drainage patterns around the structure",
      "Visible foundation areas, crawlspaces, and structural observations",
      "Electrical panels, subpanels, and visible wiring on larger homes",
      "Plumbing fixtures, supply and drain observations, and water heaters",
      "Multiple or zoned HVAC systems and accessible distribution",
      "Interior finishes, built-in appliances, and moisture indicators with photos",
    ],
    concernsEyebrow: "03. El Dorado Hills Concerns",
    concernsHeading: "El Dorado Hills Inspection Focus",
    localAngle:
      "In El Dorado Hills, local property concerns often include drainage around slopes and retaining elements, large roof systems, deck and balcony components, visible foundation and crawlspace conditions, exterior transitions, and the condition of major or zoned mechanical systems.",
    concerns: [
      "Hillside drainage and water movement around the home and lot",
      "Decks, balconies, guardrails, and elevated exterior components",
      "Crawlspaces, visible foundation areas, and structural observations",
      "Large-home and view-lot due diligence with clear report priorities",
    ],
    secondaryPhrases: [
      "home inspector El Dorado Hills CA",
      "El Dorado Hills home inspections",
      "hillside home inspection El Dorado Hills",
    ],
    contextEyebrow: "04. Local Context",
    contextHeading: "Inspecting Hillside El Dorado Hills Homes",
    contextParagraphs: [
      "El Dorado Hills sits in the western foothills of El Dorado County, where homes are routinely built into slopes to capture views. That topography makes drainage and grading central to an inspection: how water is directed away from the structure, how decks and stairs are supported, and how retaining and exterior elements are holding up over time.",
      "Larger square footage also means more systems to evaluate — multiple HVAC zones, larger roof areas, and extensive plumbing and electrical distribution. ProSpec organizes findings on these premium homes by priority so a significant purchase is grounded in clear, documented information.",
    ],
    contextHighlights: [
      {
        label: "Common housing era",
        value: "Larger custom & semi-custom homes",
      },
      { label: "Foundation type", value: "Slab and raised on graded slopes" },
      { label: "Climate factor", value: "Foothill heat + zoned HVAC" },
      { label: "Terrain", value: "Hillside view lots, slope drainage" },
    ],
    ctaHeading: "Book an El Dorado Hills Home Inspection",
    ctaLine:
      "Get organized, photo-documented reporting on your El Dorado Hills home — including slope, deck, and major-system observations — from a Certified Master Inspector. Schedule online or review services first.",
    faqs: [
      {
        question: "How much does a home inspection cost in El Dorado Hills?",
        answer:
          "Residential home inspections start at $385. Because El Dorado Hills homes are often larger, final pricing reflects square footage, the number of systems, property age, and any additional agreed scope.",
      },
      {
        question: "Do you inspect hillside and view-lot homes?",
        answer:
          "Yes. Hillside lots are common in El Dorado Hills, and the inspection pays particular attention to grading, drainage around the structure, deck and stair support, and visible foundation areas, all within a non-invasive visual scope.",
      },
      {
        question: "Do you check decks and balconies on larger homes?",
        answer:
          "Yes. Decks, balconies, guardrails, and elevated walkways are evaluated for visible, accessible condition and safety observations, which is especially relevant on the multi-level homes common in El Dorado Hills.",
      },
      {
        question: "Can you inspect homes with multiple HVAC zones?",
        answer:
          "Yes. Larger El Dorado Hills homes frequently have multiple or zoned heating and cooling systems. The inspection operates and observes the accessible equipment and notes performance and visible installation concerns for each.",
      },
      {
        question: "How soon will I receive my El Dorado Hills report?",
        answer:
          "Reports are typically delivered the same day when site conditions allow, with photos, prioritized observations, and practical recommendations for buyers, sellers, and agents.",
      },
    ],
  },

  /* ============================ PLACERVILLE ============================ */
  "/home-inspection-placerville": {
    slug: "home-inspection-placerville",
    city: "Placerville",
    region: "El Dorado County foothills",
    title: "Home Inspector Placerville, CA | ProSpec Home Inspections",
    description:
      "Certified Master Inspector serving Placerville and El Dorado County. Thorough home inspections, same-day digital reports, and 5,000+ inspections completed.",
    heroEyebrow: "Historic Foothill Properties",
    h1Heading: "Home Inspections in",
    introParagraphs: [
      "ProSpec provides home inspections in Placerville and the surrounding El Dorado County foothills, including Diamond Springs, Camino, Pollock Pines, Shingle Springs, Cameron Park, El Dorado, and the rural roads that branch off Highway 50. Whether the property sits a few blocks from Main Street or at the end of a long gravel driveway, the inspection is scoped to the home in front of it.",
      "Placerville is a historic Gold Rush town, and its housing reflects that heritage — older and even historic homes near the downtown core, mixed with rural and semi-rural properties on wooded, sloping lots. Inspecting here often means working through decades of repairs, additions, and system updates layered onto original construction. ProSpec performs a non-invasive visual review of readily accessible components and writes the report so buyers, sellers, and owners understand condition, priority, and sensible next steps without unnecessary alarm.",
    ],
    leadPhotoHeading: "Inspecting Placerville and the El Dorado Foothills",
    leadPhotoParagraphs: [
      "Foothill homes do not behave like valley homes. Lots slope, driveways climb, decks stand on posts and piers rather than sitting on grade, and water has somewhere to go when it rains. Roof coverings vary widely — composition, concrete tile, and standing-seam metal all appear within a few miles of one another — and many properties run on propane and a private well rather than municipal services.",
      "Every photograph on this page is from a ProSpec inspection in Placerville or the surrounding El Dorado County foothills. They are here to show the conditions this area actually presents, and what gets looked at during an inspection.",
    ],
    leadPhoto: {
      src: "/assets/placerville/foothill-home-exterior-placerville.webp",
      alt: "Front entrance of a stone-and-stucco foothill home inspected by ProSpec in the Placerville area",
      caption:
        "A stone-and-stucco foothill home under mature pines in the Placerville area.",
      width: 1800,
      height: 1350,
    },
    fieldPhotosEyebrow: "05. From Recent Inspections",
    fieldPhotosHeading: "What a Foothill Inspection Looks Like",
    fieldPhotosLede:
      "Photographs from ProSpec inspections in Placerville and the surrounding El Dorado County foothills, covering the areas that most often matter on a sloped, wooded, or rural lot.",
    fieldPhotos: [
      {
        src: "/assets/placerville/roof-inspection-ladder-access.webp",
        alt: "Inspection ladder set at the roof edge for a walked roof inspection on an El Dorado County home",
        caption:
          "Roof access. Where the roof can be walked safely, it is walked — ladder set at the eave.",
        width: 1500,
        height: 1125,
      },
      {
        src: "/assets/placerville/aerial-roof-inspection-placerville.webp",
        alt: "Aerial view of composition shingle roof planes and a valley, with tree cover close to the roofline, during a Placerville-area roof inspection",
        caption:
          "Aerial coverage of roof planes and valleys, and the tree canopy pressing in around them.",
        width: 1600,
        height: 900,
      },
      {
        src: "/assets/placerville/crawlspace-inspection-placerville.webp",
        alt: "Crawlspace inspection showing concrete stem wall, foundation vents, and floor framing",
        caption:
          "Crawlspaces are entered where access is safe, documenting stem walls, vents, and framing.",
        width: 1400,
        height: 1050,
      },
      {
        src: "/assets/placerville/deck-pier-hillside-placerville.webp",
        alt: "Deck support post and concrete pier on sloping ground beneath an elevated foothill deck",
        caption:
          "Elevated decks on slope: post bases, pier contact, and how the grade falls away.",
        width: 1400,
        height: 1050,
      },
      {
        src: "/assets/placerville/stone-retaining-wall-el-dorado-county.webp",
        alt: "Terraced stone retaining walls and hillside grading on a rural El Dorado County property",
        caption:
          "Retaining walls and terracing, and the way water moves across a foothill site.",
        width: 1500,
        height: 1125,
      },
    ],
    trustItems: [
      "Certified Master Inspector serving Placerville and El Dorado County",
      "5,000+ property inspections completed",
      "Experience with older, historic, and rural foothill homes",
      "Same-day digital reports with photos and clear priorities",
    ],
    servicesEyebrow: "01. Placerville Residential Services",
    servicesHeading: "Inspection Services for Placerville Homes",
    servicesLede:
      "From a historic home near Main Street to a rural property on acreage, ProSpec scopes the inspection to the age and setting of the home. Every service is a visual, non-invasive review of readily accessible systems.",
    serviceCards: [
      {
        title: "Buyer's Home Inspections",
        price: "Residential inspections start at $385.",
        text: "For Placerville buyers evaluating older or rural homes, this inspection documents accessible systems and the realities of layered repairs before contingencies are removed.",
      },
      {
        title: "Pre-Listing Inspections",
        price: "Residential inspections start at $385.",
        text: "Sellers of foothill and historic Placerville homes use a pre-listing inspection to identify wood, roof, and system items early and reduce escrow surprises.",
      },
      {
        title: "New Construction Inspections",
        price: "Residential inspections start at $385.",
        text: "On newer rural builds around Placerville, a third-party inspection documents installation concerns and items to raise with the builder before closing.",
        href: "/new-construction-inspection",
      },
      {
        title: "11-Month Warranty Inspections",
        price: "11-month warranty inspections start at $350.",
        text: "A first-year review for newer Placerville-area homes, documenting settling and finish concerns before the builder warranty window closes.",
        href: "/11-month-warranty-inspection",
      },
      {
        title: "Manufactured Home Inspections",
        price: "Manufactured home inspections start at $350.",
        text: "Common on foothill acreage, this inspection covers accessible manufactured home components — visible support, exterior, roof, interior, plumbing, electrical, HVAC, and site drainage — based on the agreed scope.",
        href: "/manufactured-home-inspection",
      },
    ],
    inspectedEyebrow: "02. What Is Inspected",
    inspectedHeading: "Aging Homes and Layered Repairs",
    inspectedLede:
      "A Placerville home inspection is a professional visual review of readily accessible systems, not a code-compliance or pest certification. On older foothill homes, the inspection focuses on distinguishing original construction from later repairs and additions.",
    inspectedItems: [
      "Roof coverings and flashings — composition, tile, and metal roofs",
      "Raised foundations, crawlspaces, and visible moisture clues",
      "Elevated decks, stairs, guardrails, post bases, and pier contact",
      "Retaining walls and site grading visible around the structure",
      "Older or upgraded electrical panels, wiring, and added circuits",
      "Plumbing supply and drain observations and water heater condition",
      "HVAC, propane-fired equipment, wood-burning appliances, and distribution",
      "Sloped-lot drainage and how water moves relative to the home",
    ],
    concernsEyebrow: "03. Placerville Concerns",
    concernsHeading: "Placerville Inspection Focus",
    localAngle:
      "Placerville properties may include older or historic construction, raised foundations and crawlspaces, elevated decks on sloping ground, retaining walls, varied roof coverings with heavy tree exposure, and visible electrical, plumbing, or HVAC updates completed across different eras. Conditions vary considerably from one foothill property to the next, so the inspection is scoped to the specific home and lot.",
    concerns: [
      "Sloped lots, site grading, retaining walls, and where water goes",
      "Crawlspaces, raised foundations, and visible moisture clues",
      "Elevated decks, stairs, and exterior structures on posts and piers",
      "Roof condition and weather exposure under heavy tree cover",
      "Older and historic homes with repairs, remodels, or mixed-age systems",
      "Rural properties on propane, private wells, or septic systems",
    ],
    // Nearby communities rather than raw keyword phrases: these are genuine
    // service-area signals and read naturally on the page.
    secondaryPhrases: [
      "Diamond Springs",
      "Camino",
      "Pollock Pines",
      "El Dorado",
      "Cameron Park",
      "Somerset",
    ],
    contextEyebrow: "04. Local Context",
    contextHeading: "Inspecting in the El Dorado Foothills",
    contextParagraphs: [
      "Placerville's elevation, wooded lots, and older building stock create a different inspection profile than the valley floor. Lots slope, so grading, drainage, and retaining walls matter in a way they rarely do on flat ground. Decks and exterior stairs are frequently elevated on posts and piers rather than sitting on grade, which puts attention on post bases, pier contact, and the ground conditions underneath.",
      "Roofs here carry real weather and tree exposure, and coverings vary — composition, concrete tile, and standing-seam metal all appear across the area. Where a roof can be accessed safely it is walked; where it cannot, it is inspected from a ladder at the eave, from the ground, or with aerial photography, and the report says which method was used.",
      "Rural and semi-rural properties add their own considerations: propane rather than natural gas, private wells and septic systems, longer site runs, and drainage shaped by slope and seasonal moisture. ProSpec documents what is visible and accessible, notes where a specialist should take a closer look, and keeps the report focused on condition and priority so you can plan with confidence.",
    ],
    contextHighlights: [
      {
        label: "Common housing era",
        value: "Historic to mixed-era rural homes",
      },
      { label: "Foundation type", value: "Often raised w/ crawlspace" },
      { label: "Roof coverings", value: "Composition, tile, and metal" },
      { label: "Rural utilities", value: "Often propane, well, and septic" },
      { label: "Terrain", value: "Sloped, wooded, semi-rural lots" },
    ],
    ctaHeading: "Book a Placerville Home Inspection",
    ctaLine:
      "Get a clear, photo-documented report on your Placerville home from a Certified Master Inspector with 5,000+ inspections completed. Reports are typically delivered the same day when site conditions allow. Schedule online in a couple of minutes, or review services first.",
    faqs: [
      {
        question: "How long does a Placerville home inspection take?",
        answer:
          "Most residential inspections take roughly two to four hours on site. Placerville-area properties often run toward the longer end of that range because sloped lots, elevated decks, detached crawlspace access, and longer walks around the structure all add time. Age, size, and condition affect the total, and you are welcome to attend.",
      },
      {
        question: "Do you inspect crawlspaces and elevated decks?",
        answer:
          "Yes. Crawlspaces are entered and inspected where the opening is accessible and conditions are safe, documenting visible foundation components, framing, and moisture clues. Elevated decks, stairs, and guardrails are inspected for visible, accessible condition, including post bases and pier contact where they can be seen. Where an area cannot be safely accessed, the report states that it was not inspected and explains why.",
      },
      {
        question: "Can you inspect rural homes with wells or septic systems?",
        answer:
          "Yes, ProSpec inspects rural and semi-rural Placerville-area homes. The standard inspection is a visual review of the home and its readily accessible systems. It does not include septic tank pumping or opening, water-quality laboratory testing, or well yield testing, and those are not part of the scope. Visible, accessible components such as the water heater, visible supply piping, and any visible pressure or treatment equipment are observed and documented, and specialist follow-up is recommended where appropriate. Detached structures and outbuildings are included only when specifically added to the inspection agreement.",
      },
      {
        question: "Will you walk the roof?",
        answer:
          "Where it is safe and practical, yes. Roof access depends on weather, roof pitch and covering, the condition of the roof surface, height, and whether it can be reached safely with a ladder. When walking the roof is not appropriate, it is inspected using the best available alternative — from a ladder at the eave, from the ground, or with aerial photography. The report identifies which method was used and notes any areas that could not be evaluated.",
      },
      {
        question: "How much does a home inspection cost in Placerville?",
        answer:
          "Residential home inspections start at $385. Manufactured home inspections and 11-month warranty inspections start at $350. Final pricing depends on the size, age, type, and setting of the property and any additional agreed scope.",
      },
      {
        question: "Do you inspect older and historic Placerville homes?",
        answer:
          "Yes. Placerville has a deep stock of older and historic homes. ProSpec uses a non-invasive visual process to document accessible components, distinguish original construction from later repairs, and recommend specialist follow-up where appropriate.",
      },
      {
        question: "How soon will I receive my Placerville inspection report?",
        answer:
          "Reports are typically delivered the same day when site conditions allow, with photos, observations, and practical recommendations for buyers, sellers, and agents.",
      },
    ],
  },

  /* ========================= SHINGLE SPRINGS ========================= */
  "/home-inspection-shingle-springs": {
    slug: "home-inspection-shingle-springs",
    city: "Shingle Springs",
    region: "El Dorado County foothills",
    title: "Home Inspection Shingle Springs CA | ProSpec",
    description:
      "Shingle Springs home inspections for foothill properties, larger lots, manufactured homes, drainage, roofs, decks, crawlspaces, and buyer due diligence by a Certified Master Inspector.",
    heroEyebrow: "Rural Foothill Acreage",
    introParagraphs: [
      "Shingle Springs sits along Highway 50 in the El Dorado County foothills, where properties tend toward larger lots, acreage, and a wide mix of home types — from production homes in newer subdivisions to custom builds and manufactured homes set back on wooded parcels. ProSpec inspects across that variety with a scope matched to each property.",
      "Because Shingle Springs properties differ so much from one another, the inspection stays focused on the home itself, its accessible systems, and the conditions immediately around the structure. ProSpec documents what is visible, explains the priorities plainly, and keeps the report practical for buyers, sellers, and owners doing real due diligence.",
    ],
    trustItems: [
      "Certified Master Inspector serving Shingle Springs and the foothills",
      "Experience with acreage, manufactured, and custom foothill homes",
      "Focus on drainage, roofs, decks, and crawlspace access",
      "Same-day digital reports with photos and clear priorities",
    ],
    servicesEyebrow: "01. Shingle Springs Residential Services",
    servicesHeading: "Inspection Services for Shingle Springs Homes",
    servicesLede:
      "From a manufactured home on acreage to a custom build on a wooded parcel, ProSpec scopes the inspection to the property and the transaction. Every service is a visual, non-invasive review of readily accessible systems.",
    serviceCards: [
      {
        title: "Buyer's Home Inspections",
        price: "Residential inspections start at $385.",
        text: "For Shingle Springs buyers evaluating acreage or mixed-type homes, this inspection documents accessible systems and site conditions before contingencies are removed.",
      },
      {
        title: "Pre-Listing Inspections",
        price: "Residential inspections start at $385.",
        text: "Sellers of foothill Shingle Springs properties use a pre-listing inspection to identify roof, drainage, and system items early and reduce escrow surprises.",
      },
      {
        title: "New Construction Inspections",
        price: "Residential inspections start at $385.",
        text: "On newer Shingle Springs builds, a third-party inspection documents installation and finish concerns to raise with the builder before closing.",
        href: "/new-construction-inspection",
      },
      {
        title: "11-Month Warranty Inspections",
        price: "11-month warranty inspections start at $350.",
        text: "A first-year review for newer Shingle Springs homes, documenting settling and finish concerns before the builder warranty window closes.",
        href: "/11-month-warranty-inspection",
      },
      {
        title: "Manufactured Home Inspections",
        price: "Manufactured home inspections start at $350.",
        text: "Very common on Shingle Springs acreage, this inspection covers accessible manufactured home components — visible support, exterior, roof, interior, plumbing, electrical, HVAC, and site drainage — based on the agreed scope.",
        href: "/manufactured-home-inspection",
      },
    ],
    inspectedEyebrow: "02. What Is Inspected",
    inspectedHeading: "Property Type Drives the Scope",
    inspectedLede:
      "A Shingle Springs home inspection is a professional visual review of readily accessible systems, not a code-compliance or warranty guarantee. Because property types vary so widely here, the scope is matched to the specific home and lot.",
    inspectedItems: [
      "Roof coverings, flashings, and drainage across varied roof types",
      "Decks, exterior components, and access points on larger lots",
      "Crawlspaces, visible foundation or support, and structural observations",
      "Manufactured home support and connections when applicable",
      "Electrical panels, distribution, and visible wiring conditions",
      "Plumbing supply and drain observations and water heater review",
      "HVAC performance and accessible distribution components",
      "Foothill grading, drainage near the home, and moisture indicators with photos",
    ],
    concernsEyebrow: "03. Shingle Springs Concerns",
    concernsHeading: "Shingle Springs Inspection Focus",
    localAngle:
      "Shingle Springs inspections often include attention to roofs, foothill drainage, decks, crawlspaces, visible foundation or manufactured-home support components, exterior materials, larger-lot site conditions near the home, and manufactured homes where applicable.",
    concerns: [
      "Foothill drainage and grading conditions near the structure",
      "Roofs, decks, exterior components, and crawlspace access",
      "Manufactured homes when applicable to the property type",
      "Outbuildings or detached structures only when included in scope",
    ],
    secondaryPhrases: [
      "home inspection Shingle Springs CA",
      "home inspector Shingle Springs",
      "manufactured home inspection Shingle Springs",
    ],
    contextEyebrow: "04. Local Context",
    contextHeading: "Inspecting Shingle Springs Acreage",
    contextParagraphs: [
      "Shingle Springs is characterized by larger parcels and a true mix of housing, which makes property type the single biggest factor in an inspection. A manufactured home on acreage, a 1990s production home, and a newer custom build each present different priorities, from support and connections to roof age and drainage.",
      "Foothill grading and seasonal moisture also matter, particularly how water moves around the structure on a sloped or wooded lot. ProSpec keeps the inspection centered on the home and accessible systems, with detached structures included only when specifically scoped.",
    ],
    contextHighlights: [
      { label: "Common housing era", value: "Mixed: manufactured to custom" },
      { label: "Foundation type", value: "Crawlspace, slab, & MH support" },
      { label: "Climate factor", value: "Foothill heat and seasonal moisture" },
      { label: "Terrain", value: "Larger acreage, sloped wooded lots" },
    ],
    ctaHeading: "Book a Shingle Springs Home Inspection",
    ctaLine:
      "Get a clear, photo-documented report on your Shingle Springs home — matched to the property type and lot — from a Certified Master Inspector. Schedule online or review services first.",
    faqs: [
      {
        question: "How much does a home inspection cost in Shingle Springs?",
        answer:
          "Residential home inspections start at $385. Manufactured home inspections and 11-month warranty inspections start at $350. Final pricing depends on property size, age, type, and any additional agreed scope, which varies widely in Shingle Springs.",
      },
      {
        question: "Do you inspect manufactured homes on acreage?",
        answer:
          "Yes. Manufactured homes are very common on Shingle Springs parcels. The inspection covers visible, accessible components — including support and connections — based on the agreed scope, with manufactured home inspections starting at $350.",
      },
      {
        question: "Do you inspect detached structures and outbuildings?",
        answer:
          "The standard inspection focuses on the primary home and its accessible systems. Detached garages, shops, or outbuildings can be included when specifically added to the inspection agreement and scope.",
      },
      {
        question: "How do you handle drainage on larger foothill lots?",
        answer:
          "The inspection observes grading and drainage conditions in the area immediately around the structure, noting how water appears to move relative to the home, within a non-invasive visual scope.",
      },
      {
        question: "How soon will I receive my Shingle Springs report?",
        answer:
          "Reports are typically delivered the same day when site conditions allow, with photos, observations, and practical recommendations for buyers, sellers, and agents.",
      },
    ],
  },
};

export default function LocalHomeInspection() {
  const [location] = useLocation();
  const page =
    LOCAL_PAGES[location] ?? LOCAL_PAGES["/home-inspection-sacramento"];
  const canonicalUrl = `https://www.weareprospec.com/${page.slug}`;

  return (
    <Layout>
      <SEO
        title={page.title}
        description={page.description}
        canonicalUrl={canonicalUrl}
      />

      {/* HERO */}
      <section className="relative min-h-[62vh] flex items-center border-b border-border overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/*
            Decorative hero backdrop only: it sits at 25% opacity behind a
            gradient and carries no information, so it takes empty alt text and
            is hidden from assistive tech. It is also generic stock, so it must
            not assert a location it cannot support.
          */}
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663462787524/KXLMpC34TJZ2Xp2FKiV446/hero-modern-home-EznMC93naFQVondgXzhfwU.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-25 filter brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/30" />
        </div>

        <div className="container relative z-10 py-16">
          <div className="max-w-3xl flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 self-start font-mono text-[10px] tracking-widest uppercase text-primary">
              <MapPin className="h-3.5 w-3.5" />
              {page.heroEyebrow}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wider uppercase leading-[1.15]">
              {page.h1Heading ?? "Home Inspection in"} <br />
              <span className="text-primary">{page.city}, CA</span>
            </h1>
            <div className="flex flex-col gap-4 max-w-2xl">
              {page.introParagraphs.map((para, i) => (
                <p
                  key={i}
                  className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/booknow">
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest uppercase h-12 px-8 font-bold"
                  data-track-event="booking_cta_click"
                  data-track-location="local-page-hero"
                >
                  Schedule Your Inspection
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  className="border-border hover:border-white text-white font-mono text-xs tracking-widest uppercase h-12 px-8"
                >
                  View Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="border-b border-border bg-card/20 py-10">
        <div className="container">
          <div
            className="grid grid-cols-1 md:grid-cols-2
 lg:grid-cols-4 gap-5"
          >
            {page.trustItems.map(item => (
              <div
                key={item}
                className="flex items-start gap-3 border border-border/50 bg-card/20 p-4"
              >
                <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="font-mono text-[10px] tracking-wider uppercase text-white leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD PHOTO + LOCAL INTRO (cities with local field photography only) */}
      {page.leadPhoto && (
        <section className="border-b border-border py-16 md:py-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <figure className="flex flex-col gap-3">
                  <img
                    src={page.leadPhoto.src}
                    alt={page.leadPhoto.alt}
                    width={page.leadPhoto.width}
                    height={page.leadPhoto.height}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-auto border border-border/80"
                  />
                  <figcaption className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground/80 leading-relaxed">
                    {page.leadPhoto.caption}
                  </figcaption>
                </figure>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-5">
                <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
                  Local Inspection Experience
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-white tracking-wider uppercase">
                  {page.leadPhotoHeading}
                </h2>
                {page.leadPhotoParagraphs?.map((para, i) => (
                  <p
                    key={i}
                    className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 01 - SERVICES */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
            <div className="lg:col-span-4 flex flex-col gap-5">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
                {page.servicesEyebrow}
              </span>
              <h2 className="font-serif text-3xl text-white tracking-wider uppercase">
                {page.servicesHeading}
              </h2>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                {page.servicesLede}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {SHARED_INTERNAL_LINKS.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-mono text-[10px] tracking-widest uppercase text-primary hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {page.serviceCards.map(service => (
                <div
                  key={service.title}
                  className="border border-border/80 bg-card/20 p-6 flex flex-col gap-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-lg text-white tracking-wide uppercase">
                      {service.title}
                    </h3>
                    <ClipboardCheck className="h-5 w-5 text-primary shrink-0" />
                  </div>
                  <p className="font-mono text-[10px] tracking-wider uppercase text-primary font-bold">
                    {service.price}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    {service.text}
                  </p>
                  {service.href && (
                    <Link
                      href={service.href}
                      className="font-mono text-[10px] tracking-widest uppercase text-primary hover:text-white transition-colors inline-flex items-center gap-1 mt-auto pt-2"
                    >
                      Learn More <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02 - WHAT IS INSPECTED */}
      <section className="border-b border-border bg-card/5 py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-5 flex flex-col gap-5">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
                {page.inspectedEyebrow}
              </span>
              <h2 className="font-serif text-3xl text-white tracking-wider uppercase">
                {page.inspectedHeading}
              </h2>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                {page.inspectedLede}
              </p>
              {/*
                wouter's <Link> already renders the anchor, so it takes the
                className directly. Nesting an inner <a> produced invalid
                HTML and a hydration warning.
              */}
              <Link
                href="/reviews"
                className="font-mono text-[10px] tracking-widest uppercase text-primary hover:text-white transition-colors inline-flex items-center gap-2 self-start"
              >
                Read Local Reviews
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {page.inspectedItems.map(item => (
                <div
                  key={item}
                  className="flex items-start gap-3 border-b border-border/40 pb-3"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span className="font-sans text-xs text-muted-foreground leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03 - LOCAL CONCERNS */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container">
          <div className="border border-border/80 bg-card/25 p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 flex flex-col gap-5">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
                {page.concernsEyebrow}
              </span>
              <h2 className="font-serif text-3xl text-white tracking-wider uppercase">
                {page.concernsHeading}
              </h2>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                {page.localAngle}
              </p>
              <div className="flex flex-wrap gap-2">
                {page.secondaryPhrases.map(phrase => (
                  <span
                    key={phrase}
                    className="border border-border/60 px-3 py-2 font-mono text-[9px] tracking-widest uppercase text-muted-foreground"
                  >
                    {phrase}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5">
              {page.concerns.map(concern => (
                <div
                  key={concern}
                  className="border border-border/60 bg-background/40 p-5 flex items-start gap-3"
                >
                  <Home className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    {concern}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04 - LOCAL CONTEXT (unique narrative) */}
      <section className="border-b border-border bg-card/5 py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
                {page.contextEyebrow}
              </span>
              <h2 className="font-serif text-3xl text-white tracking-wider uppercase">
                {page.contextHeading}
              </h2>
              {page.contextParagraphs.map((para, i) => (
                <p
                  key={i}
                  className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed"
                >
                  {para}
                </p>
              ))}
              <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/70">
                Serving {page.city} and the surrounding {page.region}.
              </p>
            </div>

            <div className="lg:col-span-5 border border-border/80 bg-card/20 p-8 flex flex-col gap-5">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
                {page.city} At A Glance
              </span>
              <div className="flex flex-col divide-y divide-border/40">
                {page.contextHighlights.map(item => (
                  <div
                    key={item.label}
                    className="flex items-start justify-between gap-4 py-3"
                  >
                    <span className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="font-sans text-xs text-white text-right max-w-[60%] leading-relaxed">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05 - FIELD PHOTOGRAPHY (cities with local photo sets only) */}
      {page.fieldPhotos && page.fieldPhotos.length > 0 && (
        <section className="border-b border-border py-20 md:py-28">
          <div className="container">
            <div className="flex flex-col gap-4 max-w-2xl mb-12">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
                {page.fieldPhotosEyebrow}
              </span>
              <h2 className="font-serif text-3xl text-white tracking-wider uppercase">
                {page.fieldPhotosHeading}
              </h2>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                {page.fieldPhotosLede}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {page.fieldPhotos.map(photo => (
                <figure
                  key={photo.src}
                  className="flex flex-col gap-3 border border-border/60 bg-card/20 p-3"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto aspect-[4/3] object-cover"
                  />
                  <figcaption className="font-sans text-xs text-muted-foreground leading-relaxed px-1 pb-1">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-b border-border bg-card/5 py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-6 items-center">
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-[10px] tracking-widest uppercase text-primary">
              <Award className="h-3.5 w-3.5" />
              Schedule Online
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wider uppercase">
              {page.ctaHeading}
            </h2>
            <p className="font-sans text-xs md:text-sm text-muted-foreground max-w-xl leading-relaxed">
              {page.ctaLine}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link href="/booknow">
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest uppercase h-12 px-8 font-bold w-full sm:w-auto"
                  data-track-event="booking_cta_click"
                  data-track-location="local-page-cta"
                >
                  Schedule Your Inspection
                </Button>
              </Link>
              <Link href="/inspector">
                <Button
                  variant="outline"
                  className="border-border hover:border-white text-white font-mono text-xs tracking-widest uppercase h-12 px-8 w-full sm:w-auto"
                >
                  Meet Your Inspector
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container">
          <FAQ
            items={page.faqs}
            title={`${page.city} Home Inspection FAQ`}
            subtitle={`Straight answers about pricing, scope, reports, and residential inspection services in ${page.city}.`}
          />
        </div>
      </section>

      {/* COMPARE FOOTER */}
      <section className="py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between border border-border/80 bg-card/20 p-8">
            <div className="flex items-start gap-4">
              <FileText className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h2 className="font-serif text-xl text-white tracking-wide uppercase mb-2">
                  Compare Services Before You Book
                </h2>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed max-w-xl">
                  Review residential pricing, sample inspection categories, and
                  commercial inspection options before scheduling your
                  {` ${page.city}`} inspection.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link href="/services">
                <Button
                  variant="outline"
                  className="border-border hover:border-white text-white font-mono text-xs tracking-widest uppercase h-11 px-6 w-full sm:w-auto"
                >
                  Services
                </Button>
              </Link>
              <Link href="/booknow">
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest uppercase h-11 px-6 font-bold w-full sm:w-auto"
                  data-track-event="booking_cta_click"
                  data-track-location="local-page-footer-bar"
                >
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
