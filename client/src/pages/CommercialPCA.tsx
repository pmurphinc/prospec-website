import { Link } from "wouter";
import {
  Building2,
  Award,
  CheckCircle2,
  FileText,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import CommercialQuoteForm from "@/components/CommercialQuoteForm";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";

/* 
  DESIGN PHILOSOPHY: Approach 1 - The Master Builder (Industrial Editorial)
  Commercial real estate presentation, structured due diligence, and custom quote form.
*/

export default function CommercialPCA() {
  const pcaFaqs = [
    {
      question: "How is a commercial inspection priced?",
      answer:
        "Cost depends on the property size, age, occupancy, systems, location, requested scope, and report requirements. Share the property details with ProSpec to receive a scope-based quote.",
    },
    {
      question: "What is a Property Condition Assessment (PCA)?",
      answer:
        "A Property Condition Assessment (PCA) is a scoped physical evaluation of a commercial real estate asset. It can support acquisition, refinancing, or leasing decisions by documenting observed deficiencies, deferred maintenance, and capital-planning information included in the inspection agreement.",
    },
    {
      question: "How is the scope of a commercial assessment established?",
      answer:
        "The inspection agreement defines the systems, accessible areas, reporting format, and level of detail for each property. ProSpec reviews the requested deliverables with the client before preparing a proposal.",
    },
    {
      question: "What is included in a Property Condition Report (PCR)?",
      answer:
        "A Property Condition Report can include an executive summary, visual assessment of readily accessible major systems, opinion-based observations and recommendations, and capital planning notes when included in the agreed scope.",
    },
    {
      question:
        "How long does it take to complete a commercial inspection and report?",
      answer:
        "The timeline depends on the property size and complexity. Typically, a site walkthrough takes 2 to 6 hours. The final Property Condition Report is typically delivered within 3 to 5 business days, though expedited delivery can be arranged for tight escrow timelines.",
    },
  ];

  const standardsList = [
    "Assessment and reporting tailored to the written scope",
    "Visual structural frame & building envelope observations",
    "Visual assessment of readily accessible HVAC, electrical & plumbing systems",
    "Readily visible life-safety observations within the agreed scope",
    "Opinion-based recommendations and capital planning notes when scoped",
    "Led directly by Patrick Murphy, Certified Master Inspector",
  ];

  return (
    <Layout>
      <SEO
        title="Property Condition Assessments Sacramento | ProSpec"
        description="Sacramento property condition assessments for commercial due diligence, with an agreed scope, major-system observations, deficiency reporting and capital-planning information."
        canonicalUrl="https://www.weareprospec.com/commercial-property-condition-assessments-sacramento"
      />
      {/* Editorial Hero Section */}
      <section className="relative min-h-[60vh] flex items-center border-b border-border overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663462787524/KXLMpC34TJZ2Xp2FKiV446/commercial-building-GYFDFQy7q2timvbXZeXETy.webp"
            alt="Sacramento Commercial Office Building"
            className="w-full h-full object-cover opacity-30 filter brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="container relative z-10 py-16">
          <div className="max-w-3xl flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 self-start font-mono text-[10px] tracking-widest uppercase text-primary">
              <Building2 className="h-3.5 w-3.5" />
              Scope Defined Before Inspection
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wider uppercase leading-[1.15]">
              Commercial Property <br />
              <span className="text-primary">Condition Assessments</span> (PCA)
            </h1>

            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
              Protect your capital and mitigate transaction risk. ProSpec
              provides commercial property condition assessments based on the
              agreed scope of work across Sacramento and Folsom.
            </p>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
              A PCA is the broadest of ProSpec's commercial offerings: where a
              building inspection answers “what condition is this asset in
              today,” a Property Condition Assessment frames those observations
              for acquisition, refinancing, and lease decisions, with deficiency
              reporting and capital-planning information when those deliverables
              are included in the written scope. It is built for lenders,
              brokers, and investors who need due diligence they can put in
              front of a committee.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#quote-form"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest uppercase h-12 px-8 font-bold flex items-center justify-center transition-colors"
                data-track-event="commercial_quote_cta_click"
                data-track-location="commercial-pca-hero"
              >
                Request Custom Proposal
              </a>
              <Link href="/services">
                <a className="border border-border hover:border-white text-white font-mono text-xs tracking-widest uppercase h-12 px-8 flex items-center justify-center transition-colors">
                  Explore All Services
                </a>
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 mt-6 font-mono text-[10px] tracking-widest uppercase">
              <Link
                href="/commercial-building-inspections-sacramento"
                className="text-primary hover:text-white"
              >
                Commercial building inspections
              </Link>
              <Link
                href="/commercial-property-condition-assessments-sacramento"
                className="text-primary hover:text-white"
              >
                Property condition assessments
              </Link>
              <Link
                href="/apartment-building-inspections-sacramento"
                className="text-primary hover:text-white"
              >
                Apartment and multifamily inspections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Due Diligence Value Proposition */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left side: Editorial Typography */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
                01. Professional Standards
              </span>
              <h2 className="font-serif text-3xl text-white tracking-wider uppercase leading-tight">
                Mitigate Risk with Scoped Commercial Assessments
              </h2>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                Commercial real estate transactions require practical, carefully
                scoped due diligence. A ProSpec Property Condition Assessment
                (PCA) provides a visual assessment of readily accessible major
                systems, giving buyers, lenders, and brokers opinion-based
                observations about the asset's current condition and potential
                maintenance priorities.
              </p>
              <div className="border-l border-primary pl-4 py-1">
                <p className="font-serif text-sm italic text-white leading-relaxed">
                  "Our reports organize observations by priority and provide
                  recommendations or capital planning notes when included in the
                  agreed scope of work."
                </p>
                <span className="block font-mono text-[10px] uppercase text-muted-foreground mt-2">
                  — Patrick Murphy, Founder & CMI
                </span>
              </div>
            </div>

            {/* Right side: Technical Checklist */}
            <div className="lg:col-span-7 border border-border/80 bg-card/20 p-8 md:p-12">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold block mb-6">
                Commercial Due Diligence Scope Options
              </span>
              <ul className="flex flex-col gap-4 font-sans text-xs md:text-sm text-muted-foreground">
                {standardsList.map((std, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 border-b border-border/40 pb-3 last:border-0 last:pb-0"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-white font-medium">{std}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Quote Form Section */}
      <section
        id="quote-form"
        className="border-b border-border bg-card/5 py-20 md:py-28"
      >
        <div className="container">
          <CommercialQuoteForm />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container">
          <FAQ items={pcaFaqs} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center max-w-3xl mx-auto flex flex-col gap-6 items-center">
        <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
          02. Connect Direct
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wider uppercase">
          Speak with Patrick Murphy, CMI
        </h2>
        <p className="font-sans text-xs md:text-sm text-muted-foreground max-w-md leading-relaxed">
          Discuss your commercial property specifications, timeline, and
          reporting requirements directly with our Certified Master Inspector.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
          <a
            href="tel:916-432-0332"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest uppercase h-12 px-8 font-bold flex items-center justify-center transition-colors w-full sm:w-auto"
            data-track-event="phone_click"
            data-track-location="commercial-pca-cta"
          >
            Call (916) 432-0332
          </a>
          <a
            href="#quote-form"
            className="border border-border hover:border-white text-white font-mono text-xs tracking-widest uppercase h-12 px-8 flex items-center justify-center transition-colors w-full sm:w-auto"
            data-track-event="commercial_quote_cta_click"
            data-track-location="commercial-pca-cta"
          >
            Submit Specifications
          </a>
        </div>
      </section>
    </Layout>
  );
}
