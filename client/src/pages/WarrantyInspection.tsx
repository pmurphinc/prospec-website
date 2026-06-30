import { Link } from "wouter";
import {
  CalendarDays,
  CheckCircle2,
  FileText,
  ArrowRight,
  ClipboardList,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";

export default function WarrantyInspection() {
  const faqs = [
    {
      question: "What is an 11-month warranty inspection?",
      answer:
        "It is a visual inspection performed near the end of your builder's standard one-year warranty period. We document visible defects, settlement issues, and performance concerns so you can submit them to the builder before your coverage expires.",
    },
    {
      question: "When exactly should I schedule this?",
      answer:
        "We recommend scheduling during the 10th or 11th month of ownership. This gives you ample time to receive our report and submit your warranty claim before the 12-month deadline.",
    },
    {
      question: "Does this guarantee the builder will fix everything?",
      answer:
        "No. We document the observed conditions, but the builder determines what is covered under their specific warranty terms. Our report provides professional, objective documentation to support your claim.",
    },
    {
      question: "Is this a code compliance inspection?",
      answer:
        "No. This is a visual, non-invasive assessment of readily accessible systems and components to identify functional defects and safety concerns, not a municipal code check.",
    },
  ];

  const scopeItems = [
    "Observation of foundation settlement and cracking",
    "Visual assessment of roofing materials and attic framing",
    "Testing of accessible electrical receptacles and fixtures",
    "Operation of HVAC systems and observation of visible ductwork",
    "Checking for visible plumbing leaks under sinks and at fixtures",
    "Review of exterior cladding, doors, and window operation",
  ];

  return (
    <Layout>
      <SEO
        title="11-Month Warranty Home Inspections | ProSpec Sacramento"
        description="11-month builder warranty inspections in Sacramento and Folsom. Document defects and settlement issues before your one-year warranty expires."
        canonicalUrl="https://www.weareprospec.com/11-month-warranty-inspection"
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center border-b border-border overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663462787524/KXLMpC34TJZ2Xp2FKiV446/hero-modern-home-EznMC93naFQVondgXzhfwU.webp"
            alt="Suburban home in Sacramento"
            className="w-full h-full object-cover opacity-30 filter brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="container relative z-10 py-16">
          <div className="max-w-3xl flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 self-start font-mono text-[10px] tracking-widest uppercase text-primary">
              <CalendarDays className="h-3.5 w-3.5" />
              Residential Services
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wider uppercase leading-[1.15]">
              11-Month Warranty <br />
              <span className="text-primary">Inspections</span>
            </h1>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
              Document visible defects before your builder's warranty expires.
              ProSpec provides independent, visual assessments of homes in
              Sacramento, Folsom, and surrounding areas as they approach their
              one-year anniversary.
            </p>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
              During the first year, homes settle, materials dry out, and
              systems experience their first full cycle of seasons. Our
              inspection identifies readily accessible issues—from cracked
              stucco to HVAC performance concerns—so you can present a
              professional report to your builder while you are still covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/booknow">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono tracking-widest uppercase text-xs h-14 px-8"
                  data-track-event="booking_cta_click"
                  data-track-location="warranty_hero"
                >
                  Schedule Inspection
                </Button>
              </Link>
              <a href="tel:916-432-0332">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border hover:bg-card/50 font-mono tracking-widest uppercase text-xs h-14 px-8 text-white"
                  data-track-event="phone_click"
                  data-track-location="warranty_hero"
                >
                  Call (916) 432-0332
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Scope Section */}
      <section className="border-b border-border py-20 md:py-28 bg-card/5">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold block mb-4">
                Inspection Scope
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-white tracking-wider uppercase mb-6">
                What We Look For
              </h2>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed mb-6">
                We conduct a non-invasive, visual assessment of the readily
                accessible systems and components of the home, paying special
                attention to signs of settlement and material performance over
                the first year.
              </p>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                This is not a guarantee that the builder will repair every item,
                nor is it an engineering analysis. It is a practical evaluation
                of the home's condition designed to provide you with objective
                documentation for your warranty claim.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {scopeItems.map((item, i) => (
                  <div
                    key={i}
                    className="border border-border/50 bg-background/50 p-6 flex items-start gap-4 hover:border-primary/30 transition-colors"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold block mb-4">
              The Value
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white tracking-wider uppercase mb-6">
              Why Homeowners Choose ProSpec
            </h2>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
              We provide clear, objective documentation without the hype. Our
              reports are designed to be easily understood by both you and your
              builder's warranty department.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-border/80 bg-card/20 p-8 flex flex-col gap-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-white tracking-wide uppercase">
                Identify Settlement
              </h3>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                We look for signs of abnormal settlement, such as significant
                drywall cracking, sticking doors, and exterior cladding issues
                that often appear in the first year.
              </p>
            </div>

            <div className="border border-border/80 bg-card/20 p-8 flex flex-col gap-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-white tracking-wide uppercase">
                Objective Documentation
              </h3>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                Builders respond best to clear, professional documentation. We
                provide a digital report with photos of observed conditions, not
                just a handwritten list.
              </p>
            </div>

            <div className="border border-border/80 bg-card/20 p-8 flex flex-col gap-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-white tracking-wide uppercase">
                Same-Day Reports
              </h3>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                We understand warranty deadlines are strict. Our reports are
                typically delivered the same day so you can submit your claim
                promptly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-b border-border py-20 md:py-28 bg-card/5">
        <div className="container">
          <FAQ items={faqs} title="Warranty Inspection FAQs" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
        <div className="container relative z-10 text-center">
          <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold block mb-4">
            Ready to schedule?
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white tracking-wider uppercase mb-6 max-w-2xl mx-auto">
            Book Your Inspection
          </h2>
          <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10">
            Secure your inspection slot online in minutes. Pricing is based on
            square footage and age, visible during the booking process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booknow">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono tracking-widest uppercase text-xs h-14 px-8"
                data-track-event="booking_cta_click"
                data-track-location="warranty_bottom"
              >
                Schedule Online <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
