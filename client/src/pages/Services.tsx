import { Link } from "wouter";
import {
  ShieldCheck,
  Award,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Layers,
  Sparkles,
  Zap,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

/* 
  DESIGN PHILOSOPHY: Approach 1 - The Master Builder (Industrial Editorial)
  Dark grid panels, highly detailed service breakdown, clear CTA buttons, structural alignment.
*/

export default function Services() {
  const residentialServices = [
    {
      title: "Buyer's Home Inspections",
      price: "Starting at $350",
      desc: "A comprehensive physical examination of the home's major systems and components. We inspect from foundation to roof, helping buyers make fully informed, confident purchasing decisions.",
      who: "Homebuyers wanting a complete assessment of their prospective property before closing escrow.",
      features: [
        "Complete structural & foundation review",
        "Roofing, attic, and insulation inspection",
        "Electrical panels & wiring safety check",
        "Plumbing systems & fixture testing",
      ],
    },
    {
      title: "Pre-Listing Inspections",
      price: "Starting at $350",
      desc: "Identify property issues and hidden defects before listing your home for sale. A pre-listing inspection prevents surprise repair demands during negotiations and helps you sell faster.",
      who: "Home sellers looking to streamline their transaction and protect their asking price.",
      features: [
        "Early identification of major defects",
        "Option to address repairs on your schedule",
        "Increases buyer confidence and trust",
        "Smooths out the escrow & closing process",
      ],
    },
    {
      title: "New Construction Inspections",
      price: "Starting at $355",
      desc: "Even brand-new homes can have significant building defects, code violations, or safety issues. We inspect the home prior to your final builder walkthrough to ensure everything is built correctly.",
      who: "Buyers of newly constructed homes preparing for their final walkthrough and key handover.",
      features: [
        "Verifies builder quality of work",
        "Identifies hidden framing or HVAC issues",
        "Ensures compliance with basic safety standards",
        "Creates a punch list for the builder to resolve",
      ],
    },
    {
      title: "11-Month Warranty Inspections",
      price: "Starting at $350",
      desc: "Performed just before your one-year builder warranty expires. We identify warrantable defects that occurred during the first year of settlement so you can get them repaired at the builder's expense.",
      who: "Homeowners in a new build home whose 12-month builder warranty is about to expire.",
      features: [
        "Catch settling and structural shifts",
        "Verify mechanical system performance",
        "Document issues for builder warranty claims",
        "Zero out-of-pocket repair costs for covered items",
      ],
    },
  ];

  const commercialServices = [
    {
      title: "Property Condition Assessments (PCA)",
      desc: "Commercial property condition assessment based on the agreed scope of work. We visually assess readily accessible major systems and identify deferred maintenance priorities.",
      who: "Commercial buyers, investors, brokers, and lenders seeking scoped risk observations.",
      features: [
        "ASTM-style reporting when requested and scoped",
        "Opinion-based repair and maintenance recommendations",
        "Capital planning notes when included in scope",
        "HVAC, electrical, plumbing, and roofing analysis",
      ],
      href: "/commercial-property-condition-assessments-sacramento",
    },
    {
      title: "Commercial Building Inspections",
      desc: "A practical, thorough physical inspection of light commercial, retail, or industrial buildings. We visually assess readily accessible structural components, electrical panels, commercial HVAC units, and visible life-safety items included in scope.",
      who: "Small business owners, local investors, and commercial tenants with triple-net (NNN) leases.",
      features: [
        "Light commercial, retail, and office spaces",
        "Detailed structural and envelope evaluation",
        "Clear, direct, and practical recommendations",
        "Same-day or rapid digital report delivery",
      ],
      href: "/commercial-building-inspections-sacramento",
    },
    {
      title: "Apartment & Multi-Family Inspections",
      desc: "Specialized due diligence for multi-family residential assets. We inspect individual unit interiors, common areas, shared utility systems, laundry rooms, and major structural envelopes.",
      who: "Multi-family property buyers, real estate syndicators, and residential portfolio investors.",
      features: [
        "Multi-unit portfolio and apartment buildings",
        "Unit-by-unit interior condition checklists",
        "Shared HVAC, boiler, and electrical review",
        "Deferred maintenance and capital planning notes",
      ],
      href: "/apartment-building-inspections-sacramento",
    },
  ];

  const standardInclusions = [
    "Roof, attic space, and visible insulation",
    "Exterior siding, trim, windows, and site drainage",
    "Foundation, crawlspace, and structural framing",
    "Electrical main panels, subpanels, and branch wiring",
    "Plumbing supply lines, drains, water heaters, and fixtures",
    "HVAC (heating, ventilation, and air conditioning) systems",
    "Interior walls, ceilings, doors, and window operations",
    "Built-in kitchen appliances and safety controls",
  ];

  return (
    <Layout>
      <SEO
        title="Residential & Commercial Property Inspections | ProSpec Sacramento"
        description="Comprehensive property inspections by Certified Master Inspector Patrick Murphy. Serving Sacramento, Folsom, Roseville, and Davis. Same-day digital reports."
        canonicalUrl="https://www.weareprospec.com/services"
      />
      {/* Page Header */}
      <section className="border-b border-border bg-card/10 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold block mb-3">
              01. Service Catalog
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-white tracking-wider uppercase mb-6 leading-tight">
              Home & Commercial <br />
              Inspection Services
            </h1>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
              From residential home purchases to institutional commercial
              acquisitions, ProSpec provides highly detailed physical due
              diligence. Every inspection is led by Patrick Murphy, a Certified
              Master Inspector with approximately 20 years of construction and
              inspection experience.
            </p>
          </div>
        </div>
      </section>

      {/* Residential Services Section */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container">
          <div className="flex flex-col gap-4 mb-16 max-w-2xl">
            <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
              02. Residential Inspections
            </span>
            <h2 className="font-serif text-3xl text-white tracking-wider uppercase">
              Residential Due Diligence
            </h2>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
              Complete physical evaluations of residential properties. We
              identify structural defects, system failures, and immediate safety
              hazards, giving you absolute confidence in your purchase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {residentialServices.map((service, index) => (
              <div
                key={index}
                className="border border-border/80 bg-card/20 p-8 flex flex-col justify-between gap-8 hover:border-primary/40 transition-colors"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-serif text-xl text-white tracking-wide uppercase">
                      {service.title}
                    </h3>
                    <span className="font-mono text-xs text-primary font-bold shrink-0">
                      {service.price}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>

                  <div className="border-t border-border/40 pt-4 mt-2">
                    <span className="font-mono text-[9px] tracking-widest uppercase text-white block mb-2">
                      Who It Is For:
                    </span>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-4">
                      {service.who}
                    </p>

                    <ul className="grid grid-cols-1 gap-2 font-mono text-[10px] tracking-wider text-white">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link href="/booknow">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest uppercase py-3 font-bold">
                    Schedule This Inspection
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Services Section */}
      <section className="border-b border-border bg-card/5 py-20 md:py-28">
        <div className="container">
          <div className="flex flex-col gap-4 mb-16 max-w-2xl">
            <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
              03. Commercial Inspections
            </span>
            <h2 className="font-serif text-3xl text-white tracking-wider uppercase">
              Commercial & Investor Services
            </h2>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
              Professional, ASTM-style commercial physical assessments designed
              for property investors, brokers, and business owners. We provide
              opinion-based observations, recommendations, and deferred
              maintenance notes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {commercialServices.map((service, index) => (
              <div
                key={index}
                className="border border-border/80 bg-card/30 p-8 flex flex-col justify-between gap-8 hover:border-primary/40 transition-colors group"
              >
                <div className="flex flex-col gap-4">
                  <h3 className="font-serif text-xl text-white tracking-wide uppercase group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>

                  <div className="border-t border-border/40 pt-4 mt-2">
                    <span className="font-mono text-[9px] tracking-widest uppercase text-white block mb-2">
                      Target Audience:
                    </span>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-4">
                      {service.who}
                    </p>

                    <ul className="flex flex-col gap-2 font-mono text-[10px] tracking-wider text-white">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link href={service.href}>
                  <Button
                    variant="outline"
                    className="w-full border-border hover:border-white text-white font-mono text-xs tracking-widest uppercase py-3"
                  >
                    View Service Details
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standard Inclusions Section */}
      <section className="border-b border-border py-20">
        <div className="container">
          <div className="border border-border/80 bg-card/30 p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row justify-between gap-12 items-center">
            <div className="max-w-xl flex flex-col gap-4">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
                04. What's Covered
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-white tracking-wider uppercase">
                Included in Every Inspection
              </h2>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                We perform an exhaustive, non-invasive physical evaluation of
                all major structural, mechanical, and safety components of the
                property. Our findings are documented in an easy-to-read, modern
                digital report complete with photos.
              </p>
              <div className="mt-2">
                <a
                  href="https://app.spectora.com/home-inspectors/my-inspection-company-14f9d0e41f/sample_reports"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-widest uppercase text-primary hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  View Sample Digital Report
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="w-full lg:max-w-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-[10px] tracking-wider text-white">
                {standardInclusions.map((inclusion, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 border-b border-border/40 pb-2"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{inclusion}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center max-w-3xl mx-auto flex flex-col gap-6 items-center">
        <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
          05. Take Action
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wider uppercase">
          Ready to Secure Your Property?
        </h2>
        <p className="font-sans text-xs md:text-sm text-muted-foreground max-w-md leading-relaxed">
          Book your residential inspection instantly online using our real-time
          scheduling system, or contact us directly to discuss your commercial
          property specs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
          <Link href="/booknow">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest uppercase h-12 px-8 font-bold w-full sm:w-auto">
              Schedule Residential Inspection
            </Button>
          </Link>
          <Link href="/booknow">
            <Button
              variant="outline"
              className="border-border hover:border-white text-white font-mono text-xs tracking-widest uppercase h-12 px-8 w-full sm:w-auto"
            >
              Request Commercial Quote
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
