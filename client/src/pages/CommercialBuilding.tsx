import { Link } from "wouter";
import {
  Building,
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
  Dark editorial layout, clear division of structural components, custom quote links.
*/

export default function CommercialBuilding() {
  const buildingFaqs = [
    {
      question: "What types of commercial buildings do you inspect?",
      answer:
        "We inspect a wide variety of commercial assets, including retail strip malls, standalone retail buildings, medical offices, light industrial warehouses, flex spaces, professional office buildings, and mixed-use properties in the Sacramento Valley.",
    },
    {
      question: "Do you inspect triple-net (NNN) lease properties?",
      answer:
        "Yes, NNN lease inspections are one of our specialties. We help commercial tenants identify pre-existing defects and deferred maintenance issues before they sign a lease and assume full maintenance responsibility for the building envelope and systems.",
    },
    {
      question:
        "What major systems are evaluated during a commercial building inspection?",
      answer:
        "We inspect the structural framing and foundation, building envelope (siding, windows, doors), roofing systems, commercial HVAC systems, electrical panels and distribution, plumbing systems, and readily visible life-safety items such as exit signs and emergency lighting as included in the agreed scope.",
    },
  ];

  const systemsInspected = [
    "Commercial HVAC units, boilers, and distribution systems",
    "Electrical main panels, distribution boards, and visible safety observations",
    "Plumbing systems, commercial water heaters, and main lines",
    "Structural integrity, framing, slab-on-grade, and foundations",
    "Roofing systems, commercial drainage, and parapet walls",
    "Building envelope, storefront glass, siding, and exterior doors",
    "Readily visible life-safety observations and egress notes",
    "Accessibility-related observations when included in scope",
  ];

  return (
    <Layout>
      <SEO
        title="Commercial Building Inspections Sacramento | ProSpec"
        description="Commercial building inspections for office, retail, warehouse, mixed-use, and light commercial properties in Sacramento, Folsom, and surrounding areas."
        canonicalUrl="https://www.weareprospec.com/commercial-building-inspections-sacramento"
        isCommercial
      />
      {/* Page Header */}
      <section className="border-b border-border bg-card/10 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold block mb-3">
              01. Specialized Services
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-white tracking-wider uppercase mb-6 leading-tight">
              Commercial Building <br />
              Inspections
            </h1>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
              Practical, detailed physical evaluations of commercial assets.
              Designed for local business owners, commercial tenants, and
              private real estate investors across Sacramento and Folsom.
            </p>
          </div>
        </div>
      </section>

      {/* Systems Inspected Split Layout */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Context & Bio */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
                02. Technical Coverage
              </span>
              <h2 className="font-serif text-3xl text-white tracking-wider uppercase leading-tight">
                Visual System & Structural Assessment
              </h2>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                Commercial buildings have complex mechanical and structural
                systems that differ significantly from residential homes.
                Patrick Murphy, CMI, applies approximately 20 years of hands-on
                experience to document visible defects, note apparent safety
                concerns, and flag deferred maintenance before they impact your
                business operations.
              </p>
              <div className="mt-2">
                <Link href="/commercial-property-condition-assessments-sacramento#quote-form">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest uppercase h-12 px-8 font-bold">
                    Request Custom Quote
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Detailed Systems Grid */}
            <div className="lg:col-span-7 border border-border/80 bg-card/20 p-8 md:p-12">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold block mb-6">
                What We Evaluate:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-[10px] tracking-wider text-white">
                {systemsInspected.map((sys, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 border-b border-border/40 pb-2"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{sys}</span>
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
          <FAQ items={buildingFaqs} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center max-w-3xl mx-auto flex flex-col gap-6 items-center">
        <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
          03. Connect Direct
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wider uppercase">
          Discuss Your Commercial Asset
        </h2>
        <p className="font-sans text-xs md:text-sm text-muted-foreground max-w-md leading-relaxed">
          Contact Patrick Murphy directly to discuss your commercial property
          specs, timeline, and custom reporting requirements.
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
