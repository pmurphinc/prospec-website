import { Link } from "wouter";
import { Building2, Award, CheckCircle2, FileText, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import CommercialQuoteForm from "@/components/CommercialQuoteForm";
import FAQ from "@/components/FAQ";

/* 
  DESIGN PHILOSOPHY: Approach 1 - The Master Builder (Industrial Editorial)
  Premium commercial real estate presentation, structured due diligence, custom quote form, ASTM-style copy.
*/

export default function CommercialPCA() {
  const pcaFaqs = [
    {
      question: "What is a Property Condition Assessment (PCA)?",
      answer: "A Property Condition Assessment (PCA) is an in-depth physical evaluation of a commercial real estate asset. It is typically performed during real estate transactions (acquisition, refinancing, or leasing) to identify physical deficiencies, deferred maintenance, and capital expenditures required over a specific holding period (typically 12 years). Our reports follow the industry-standard ASTM E2018 guidelines.",
    },
    {
      question: "What standards do you follow for commercial inspections?",
      answer: "ProSpec strictly follows the ASTM E2018 Standard Guide for Property Condition Assessments: Baseline Property Condition Assessment Process. This is the gold standard for commercial real estate due diligence in the United States, recognized by major lenders, institutional investors, and commercial brokers.",
    },
    {
      question: "What is included in a Property Condition Report (PCR)?",
      answer: "Our comprehensive Property Condition Report (PCR) includes an executive summary of the asset, detailed descriptions and condition reviews of all major systems (structure, roof, HVAC, electrical, plumbing, site drainage), life-safety reviews, and immediate/short-term repair cost tables. We also provide a Capital Reserve Schedule (typically 12-year) to help you budget for upcoming capital replacements.",
    },
    {
      question: "How long does it take to complete a commercial inspection and report?",
      answer: "The timeline depends on the property size and complexity. Typically, a site walkthrough takes 2 to 6 hours. The final ASTM-compliant Property Condition Report is delivered within 3 to 5 business days, though expedited delivery can be arranged for tight escrow timelines.",
    },
  ];

  const standardsList = [
    "ASTM E2018 baseline assessment guidelines",
    "Detailed structural frame & building envelope reviews",
    "Comprehensive commercial HVAC, electrical & plumbing diagnostics",
    "Life-safety, fire protection & ADA accessibility surveys",
    "Immediate repairs & 12-year Capital Reserve Schedules",
    "Led directly by Patrick Murphy, Certified Master Inspector",
  ];

  return (
    <Layout>
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
              ASTM E2018 Standards
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wider uppercase leading-[1.15]">
              Commercial Property <br />
              <span className="text-primary">Condition Assessments</span> (PCA)
            </h1>

            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
              Protect your capital and mitigate transaction risk. ProSpec delivers ASTM E2018-compliant Property Condition Assessments and commercial inspections across Sacramento and Folsom.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#quote-form"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest uppercase h-12 px-8 font-bold flex items-center justify-center transition-colors"
              >
                Request Custom Proposal
              </a>
              <Link href="/services">
                <a className="border border-border hover:border-white text-white font-mono text-xs tracking-widest uppercase h-12 px-8 flex items-center justify-center transition-colors">
                  Explore All Services
                </a>
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
                Mitigate Risk with ASTM-Compliant Assessments
              </h2>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                Commercial real estate transactions demand absolute thoroughness. A ProSpec Property Condition Assessment (PCA) provides institutional-grade physical due diligence, giving buyers, lenders, and brokers a clear, objective overview of the asset's current condition and upcoming capital liabilities.
              </p>
              <div className="border-l border-primary pl-4 py-1">
                <p className="font-serif text-sm italic text-white leading-relaxed">
                  "Our reports don't just list issues—they categorize them by severity and provide immediate cost tables and long-term capital reserve schedules to protect your investment."
                </p>
                <span className="block font-mono text-[10px] uppercase text-muted-foreground mt-2">
                  — Patrick Murphy, Founder & CMI
                </span>
              </div>
            </div>

            {/* Right side: Technical Checklist */}
            <div className="lg:col-span-7 border border-border/80 bg-card/20 p-8 md:p-12">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold block mb-6">
                Institutional Due Diligence Standards
              </span>
              <ul className="flex flex-col gap-4 font-sans text-xs md:text-sm text-muted-foreground">
                {standardsList.map((std, i) => (
                  <li key={i} className="flex items-start gap-3 border-b border-border/40 pb-3 last:border-0 last:pb-0">
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
      <section id="quote-form" className="border-b border-border bg-card/5 py-20 md:py-28">
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
          Discuss your commercial property specifications, timeline, and reporting requirements directly with our Certified Master Inspector.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
          <a
            href="tel:916-432-0332"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest uppercase h-12 px-8 font-bold flex items-center justify-center transition-colors w-full sm:w-auto"
          >
            Call (916) 432-0332
          </a>
          <a
            href="#quote-form"
            className="border border-border hover:border-white text-white font-mono text-xs tracking-widest uppercase h-12 px-8 flex items-center justify-center transition-colors w-full sm:w-auto"
          >
            Submit Specifications
          </a>
        </div>
      </section>
    </Layout>
  );
}
