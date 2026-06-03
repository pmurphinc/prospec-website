import { Link } from "wouter";
import {
  Building2,
  Award,
  CheckCircle2,
  FileText,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";

/* 
  DESIGN PHILOSOPHY: Approach 1 - The Master Builder (Industrial Editorial)
  Dark editorial layout, clear multi-unit due diligence breakdown, custom quote links.
*/

export default function ApartmentInspections() {
  const apartmentFaqs = [
    {
      question: "How do you handle unit-by-unit inspections?",
      answer:
        "We inspect individual units using structured, efficient checklists. We check unit HVAC systems, electrical outlets, GFCIs, plumbing fixtures, water pressure, interior windows, doors, and appliances. This ensures a comprehensive representative sample or 100% full-unit review based on your due diligence needs.",
    },
    {
      question: "Do you inspect common areas and shared utility systems?",
      answer:
        "Yes, we evaluate all shared utility systems, including central boilers, laundry rooms, shared main electrical panels, leasing offices, clubhouse amenities, parking structures, and overall site drainage and walkways.",
    },
    {
      question: "How are findings reported for multi-family properties?",
      answer:
        "We deliver a comprehensive, modern digital report that groups findings by unit and system type. Major structural or building-wide mechanical issues are highlighted separately from minor, unit-specific maintenance items, supporting negotiation decisions and capital planning when included in the agreed scope.",
    },
  ];

  const apartmentInclusions = [
    "Comprehensive unit-by-unit interior evaluations",
    "Central boiler, HVAC, and main utility room inspections",
    "Detailed exterior envelope, siding, and roofing review",
    "Common areas, leasing offices, and laundry facilities",
    "Walkways, balconies, stairwells, and safety railings",
    "Deferred maintenance and capital planning notes when scoped",
    "Same-day or rapid digital reporting for entire portfolios",
    "Led directly by Patrick Murphy, Certified Master Inspector",
  ];

  return (
    <Layout>
      <SEO
        title="Apartment Building Inspections Sacramento | ProSpec"
        description="Apartment and multi-family property inspections for buyers, investors, and property owners in Sacramento, Folsom, and surrounding Northern California areas."
        canonicalUrl="https://www.weareprospec.com/apartment-building-inspections-sacramento"
        isCommercial
      />
      {/* Page Header */}
      <section className="border-b border-border bg-card/10 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold block mb-3">
              01. Portfolio Services
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-white tracking-wider uppercase mb-6 leading-tight">
              Apartment & Multi-Family <br />
              Inspections
            </h1>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
              Specialized physical due diligence for multi-family residential
              assets. Designed for portfolio investors, syndicators, and
              property managers across Sacramento and Folsom.
            </p>
          </div>
        </div>
      </section>

      {/* Due Diligence Split Layout */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Context & Bio */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
                02. Portfolio Due Diligence
              </span>
              <h2 className="font-serif text-3xl text-white tracking-wider uppercase leading-tight">
                Thorough Risk Mitigation for Multi-Family Assets
              </h2>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                Multi-family real estate transactions require balancing
                building-wide structural risks with unit-by-unit deferred
                maintenance costs. Patrick Murphy, CMI, applies approximately 20
                years of hands-on experience to deliver a structured, clear
                evaluation of the entire asset, supporting your due diligence,
                negotiation, and capital planning decisions.
              </p>
              <div className="mt-2">
                <Link href="/commercial-property-condition-assessments-sacramento#quote-form">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest uppercase h-12 px-8 font-bold">
                    Request Custom Quote
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Detailed Inclusions Grid */}
            <div className="lg:col-span-7 border border-border/80 bg-card/20 p-8 md:p-12">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold block mb-6">
                What We Evaluate:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-[10px] tracking-wider text-white">
                {apartmentInclusions.map((inc, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 border-b border-border/40 pb-2"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container">
          <FAQ items={apartmentFaqs} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center max-w-3xl mx-auto flex flex-col gap-6 items-center">
        <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
          03. Connect Direct
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wider uppercase">
          Discuss Your Multi-Family Portfolio
        </h2>
        <p className="font-sans text-xs md:text-sm text-muted-foreground max-w-md leading-relaxed">
          Contact Patrick Murphy directly to discuss your multi-family
          specifications, timeline, and custom reporting requirements.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
          <a
            href="tel:916-432-0332"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest uppercase h-12 px-8 font-bold flex items-center justify-center transition-colors w-full sm:w-auto"
          >
            Call (916) 432-0332
          </a>
          <Link href="/commercial-property-condition-assessments-sacramento#quote-form">
            <a className="border border-border hover:border-white text-white font-mono text-xs tracking-widest uppercase h-12 px-8 flex items-center justify-center transition-colors w-full sm:w-auto">
              Submit Specifications
            </a>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
