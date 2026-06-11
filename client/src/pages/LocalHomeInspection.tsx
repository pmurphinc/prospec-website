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

type LocalPage = {
  slug: string;
  city: string;
  title: string;
  description: string;
  intro: string;
  localAngle: string;
  concerns: string[];
  secondaryPhrases: string[];
  manufacturedNote: string;
};

const LOCAL_PAGES: Record<string, LocalPage> = {
  "/home-inspection-sacramento": {
    slug: "home-inspection-sacramento",
    city: "Sacramento",
    title: "Home Inspection Sacramento CA | ProSpec Home Inspections",
    description:
      "Schedule a Sacramento home inspection with ProSpec. Buyer, pre-listing, new construction, and 11-month warranty inspections by a Certified Master Inspector.",
    intro:
      "ProSpec provides detailed home inspections in Sacramento for buyers, sellers, agents, and investors who need clear information before a real estate decision. Sacramento homes can range from older raised-foundation properties to remodeled suburban homes, so the inspection focuses on visible, accessible systems and practical due diligence.",
    localAngle:
      "For Sacramento properties, we pay close attention to roof condition, HVAC age and performance, crawlspace access when present, visible foundation conditions, electrical and plumbing updates, drainage patterns, and safety concerns that may affect negotiations or repair planning.",
    concerns: [
      "Older housing stock with partial remodels or mixed-era systems",
      "Raised foundations, crawlspaces, and visible moisture indicators",
      "HVAC, roof, electrical, and plumbing visibility during escrow",
      "Pre-listing inspection needs for sellers preparing a cleaner transaction",
    ],
    secondaryPhrases: [
      "home inspector Sacramento",
      "real estate inspector Sacramento",
      "pre-listing inspection Sacramento",
      "11-month warranty inspection Sacramento",
    ],
    manufacturedNote:
      "Manufactured home inspections are available when the property type and inspection agreement fit the scope.",
  },
  "/home-inspection-folsom": {
    slug: "home-inspection-folsom",
    city: "Folsom",
    title: "Home Inspection Folsom CA | ProSpec Home Inspections",
    description:
      "Folsom home inspections for buyers, sellers, new construction owners, and 11-month warranty reviews. Detailed reports from ProSpec.",
    intro:
      "ProSpec serves Folsom buyers and homeowners with careful residential inspections for resale homes, newer construction, and larger properties. The goal is straightforward: document visible conditions, explain priorities clearly, and help clients move through escrow or builder warranty conversations with confidence.",
    localAngle:
      "Folsom inspections often involve newer homes, larger floor plans, exterior drainage details, roof and attic observations, HVAC equipment, and builder finish issues that may become important during a final walkthrough or warranty period.",
    concerns: [
      "Newer construction and builder warranty review items",
      "Roof, exterior, grading, and drainage observations",
      "HVAC performance and visible installation concerns",
      "Pre-listing inspections for competitive Folsom listings",
    ],
    secondaryPhrases: [
      "home inspector Folsom CA",
      "Folsom home inspections",
      "new construction inspection Folsom",
    ],
    manufacturedNote:
      "Manufactured home inspections are available when appropriate for the property and agreed inspection scope.",
  },
  "/home-inspection-el-dorado-hills": {
    slug: "home-inspection-el-dorado-hills",
    city: "El Dorado Hills",
    title: "Home Inspection El Dorado Hills CA | ProSpec",
    description:
      "El Dorado Hills home inspections for larger homes, hillside lots, roof systems, drainage, decks, crawlspaces, and premium home due diligence.",
    intro:
      "ProSpec provides home inspections in El Dorado Hills for buyers, sellers, agents, and property owners who want a careful review before making decisions on a higher-value home. Larger homes and hillside lots benefit from organized inspection notes and direct explanations.",
    localAngle:
      "In El Dorado Hills, local property concerns often include drainage around slopes, roof systems, deck and balcony components, visible foundation and crawlspace conditions, exterior transitions, and the condition of major mechanical systems.",
    concerns: [
      "Hillside drainage and water movement around the home",
      "Decks, balconies, guardrails, and exterior components",
      "Crawlspaces, visible foundation areas, and structural observations",
      "Large-home due diligence with clear report priorities",
    ],
    secondaryPhrases: [
      "home inspector El Dorado Hills CA",
      "El Dorado Hills home inspections",
    ],
    manufacturedNote:
      "Manufactured home inspections are available when the property type and scope call for that service.",
  },
  "/home-inspection-placerville": {
    slug: "home-inspection-placerville",
    city: "Placerville",
    title: "Home Inspection Placerville CA | ProSpec",
    description:
      "Placerville home inspections for older homes, rural and semi-rural properties, raised foundations, crawlspaces, decks, roofs, electrical, plumbing, and HVAC.",
    intro:
      "ProSpec performs home inspections in Placerville for buyers, sellers, agents, and owners evaluating older homes and foothill properties. The inspection is a non-invasive visual review of readily accessible systems, with report language written to help clients understand condition, priority, and next steps.",
    localAngle:
      "Placerville properties may include older construction, raised foundations, crawlspaces, wood exterior components, sloped lots, drainage issues, decks, roofing wear, and visible electrical, plumbing, or HVAC updates completed over time.",
    concerns: [
      "Older homes with repairs, remodels, or mixed-age systems",
      "Crawlspaces, raised foundations, and visible moisture clues",
      "Decks, roofs, wood trim, siding, and exterior drainage",
      "Rural or semi-rural property observations within the inspection scope",
    ],
    secondaryPhrases: [
      "home inspections Placerville CA",
      "home inspector Placerville",
    ],
    manufacturedNote:
      "Manufactured home inspections are available in the Placerville area when applicable and included in the inspection agreement.",
  },
  "/home-inspection-shingle-springs": {
    slug: "home-inspection-shingle-springs",
    city: "Shingle Springs",
    title: "Home Inspection Shingle Springs CA | ProSpec",
    description:
      "Shingle Springs home inspections for foothill properties, larger lots, manufactured homes, drainage, roofs, decks, crawlspaces, and buyer due diligence.",
    intro:
      "ProSpec provides home inspections in Shingle Springs for buyers, sellers, agents, and property owners who need practical due diligence on foothill homes. Properties in the area can vary widely, so the inspection focuses on the home, accessible systems, and the agreed scope.",
    localAngle:
      "Shingle Springs inspections often include attention to roofs, drainage, decks, crawlspaces, visible foundation components, exterior materials, larger-lot site conditions near the home, and manufactured homes where applicable.",
    concerns: [
      "Foothill drainage and grading conditions near the structure",
      "Roofs, decks, exterior components, and crawlspace access",
      "Manufactured homes when applicable to the property type",
      "Outbuildings or detached structures only when included in scope",
    ],
    secondaryPhrases: [
      "home inspection Shingle Springs CA",
      "home inspector Shingle Springs",
    ],
    manufacturedNote:
      "Manufactured home inspections are commonly relevant in foothill areas and are available when the property and agreement call for that scope.",
  },
};

const serviceCards = [
  {
    title: "Buyer's Home Inspections",
    price: "Residential inspections start at $385.",
    text: "A detailed visual inspection for buyers who need a clear understanding of the home's readily accessible systems before removing contingencies or negotiating repairs.",
  },
  {
    title: "Pre-Listing Inspections",
    price: "Residential inspections start at $385.",
    text: "A practical way for sellers and agents to identify repair items early, reduce surprises, and present the property with more confidence.",
  },
  {
    title: "New Construction Inspections",
    price: "Residential inspections start at $385.",
    text: "A third-party inspection before closing or final walkthrough to document visible concerns, installation issues, and items to discuss with the builder.",
  },
  {
    title: "11-Month Warranty Inspections",
    price: "11-month warranty inspections start at $350.",
    text: "A review near the end of the first year of ownership so visible concerns can be documented before the builder warranty window closes.",
  },
  {
    title: "Manufactured Home Inspections",
    price: "Manufactured home inspections start at $350.",
    text: "Inspection of accessible manufactured home components, including visible support, exterior, roof, interior, plumbing, electrical, HVAC, and site drainage observations based on scope.",
  },
];

const inspectedItems = [
  "Roof coverings, flashings, penetrations, and visible drainage details",
  "Exterior siding, trim, windows, doors, decks, balconies, and grading near the home",
  "Visible structure, foundation areas, attic, and crawlspace when safely accessible",
  "Electrical panels, visible wiring conditions, outlets, and safety observations",
  "Plumbing fixtures, supply and drain observations, and water heater review",
  "Heating, cooling, ventilation, and accessible distribution components",
  "Interior walls, ceilings, floors, doors, windows, stairs, and built-in appliances",
  "Safety concerns, moisture indicators, and repair priorities documented with photos",
];

const trustItems = [
  "Certified Master Inspector",
  "Approximately 20 years of construction and inspection experience",
  "Residential and commercial inspection background",
  "Professional digital reports with photos and clear recommendations",
];

const internalLinks = [
  { label: "Services", href: "/services" },
  { label: "Reviews", href: "/reviews" },
  { label: "Inspector", href: "/inspector" },
  { label: "Book Now", href: "/booknow" },
];

function buildFaqs(page: LocalPage) {
  const city = page.city;

  return [
    {
      question: `How much does a home inspection cost in ${city}?`,
      answer:
        "Residential home inspections start at $385. Manufactured home inspections start at $350, and 11-month warranty inspections start at $350. Final pricing depends on property size, age, type, and any additional agreed scope.",
    },
    {
      question: `Do you inspect older homes in ${city}?`,
      answer:
        "Yes. ProSpec inspects older homes using a non-invasive visual process focused on readily accessible systems and components. The report documents visible concerns and recommends further evaluation by qualified specialists when appropriate.",
    },
    {
      question: "Do you offer pre-listing inspections?",
      answer:
        "Yes. Pre-listing inspections help sellers and agents identify visible concerns before the home goes active, which can reduce surprises during escrow and support more informed pricing and repair planning.",
    },
    {
      question: "Do you inspect new construction homes?",
      answer:
        "Yes. New construction inspections can help document visible installation concerns, incomplete work, safety items, and questions to raise with the builder before closing or during the warranty period.",
    },
    {
      question: "Do you inspect manufactured homes?",
      answer:
        page.manufacturedNote +
        " Manufactured home inspections start at $350 and are limited to visible, accessible components included in the agreed scope.",
    },
    {
      question: "How soon will I receive the report?",
      answer:
        "Reports are typically delivered the same day when site conditions and inspection scope allow. The digital report includes photos, observations, and practical recommendations written for buyers, sellers, and agents.",
    },
  ];
}

export default function LocalHomeInspection() {
  const [location] = useLocation();
  const page = LOCAL_PAGES[location] ?? LOCAL_PAGES["/home-inspection-sacramento"];
  const canonicalUrl = `https://www.weareprospec.com/${page.slug}`;

  return (
    <Layout>
      <SEO
        title={page.title}
        description={page.description}
        canonicalUrl={canonicalUrl}
        serviceType={`Home inspection services in ${page.city}, CA`}
        areaServed={[page.city]}
      />

      <section className="relative min-h-[62vh] flex items-center border-b border-border overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663462787524/KXLMpC34TJZ2Xp2FKiV446/hero-modern-home-EznMC93naFQVondgXzhfwU.webp"
            alt={`${page.city} home inspection service area`}
            className="w-full h-full object-cover opacity-25 filter brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/30" />
        </div>

        <div className="container relative z-10 py-16">
          <div className="max-w-3xl flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 self-start font-mono text-[10px] tracking-widest uppercase text-primary">
              <MapPin className="h-3.5 w-3.5" />
              {page.city}, California
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wider uppercase leading-[1.15]">
              Home Inspection in <br />
              <span className="text-primary">{page.city}, CA</span>
            </h1>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed max-w-2xl">
              {page.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/booknow">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest uppercase h-12 px-8 font-bold">
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

      <section className="border-b border-border bg-card/20 py-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {trustItems.map(item => (
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

      <section className="border-b border-border py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
            <div className="lg:col-span-4 flex flex-col gap-5">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
                01. Local Residential Services
              </span>
              <h2 className="font-serif text-3xl text-white tracking-wider uppercase">
                Inspection Services for {page.city} Homes
              </h2>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                ProSpec supports buyers, sellers, real estate agents, investors,
                and homeowners with careful residential inspections and
                professional reports. The work is visual, non-invasive, and
                focused on readily accessible systems and components.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {internalLinks.map(link => (
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
              {serviceCards.map(service => (
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/5 py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-5 flex flex-col gap-5">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
                02. What Is Inspected
              </span>
              <h2 className="font-serif text-3xl text-white tracking-wider uppercase">
                Visible Systems, Clear Priorities
              </h2>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                A home inspection is not a code compliance inspection,
                structural engineering report, mold clearance, pest
                certification, or warranty guarantee. It is a professional
                visual inspection of readily accessible systems so you can make
                better real estate decisions.
              </p>
              <Link href="/reviews">
                <a className="font-mono text-[10px] tracking-widest uppercase text-primary hover:text-white transition-colors inline-flex items-center gap-2 self-start">
                  Read Local Reviews
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </Link>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inspectedItems.map(item => (
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

      <section className="border-b border-border py-20 md:py-28">
        <div className="container">
          <div className="border border-border/80 bg-card/25 p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 flex flex-col gap-5">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
                03. Local Concerns
              </span>
              <h2 className="font-serif text-3xl text-white tracking-wider uppercase">
                {page.city} Inspection Focus
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

      <section className="border-b border-border bg-card/5 py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-6 items-center">
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-[10px] tracking-widest uppercase text-primary">
              <Award className="h-3.5 w-3.5" />
              Schedule Online
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wider uppercase">
              Book a {page.city} Home Inspection
            </h2>
            <p className="font-sans text-xs md:text-sm text-muted-foreground max-w-xl leading-relaxed">
              Choose ProSpec for professional residential inspection reporting
              led by a Certified Master Inspector. Schedule online at /booknow
              or review service details before booking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link href="/booknow">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest uppercase h-12 px-8 font-bold w-full sm:w-auto">
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

      <section className="border-b border-border py-20 md:py-28">
        <div className="container">
          <FAQ
            items={buildFaqs(page)}
            title={`${page.city} Home Inspection FAQ`}
            subtitle="Straight answers about pricing, scope, reports, and local residential inspection services."
          />
        </div>
      </section>

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
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest uppercase h-11 px-6 font-bold w-full sm:w-auto">
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
