import { Link } from "wouter";
import {
  Home,
  CheckCircle2,
  FileText,
  ArrowRight,
  Wrench,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";

export default function ManufacturedHomeInspection() {
  const faqs = [
    {
      question: "What is included in a manufactured home inspection?",
      answer:
        "We conduct a visual, non-invasive assessment of readily accessible systems including the structure, roof, exterior, interior, plumbing, electrical, HVAC, and visible support components based on the agreed scope of work.",
    },
    {
      question: "Do you certify the foundation for HUD or FHA loans?",
      answer:
        "No. A standard home inspection is not an engineering certification, a HUD compliance check, or a permanent foundation certification. If your lender requires an engineer's certification, you will need to hire a licensed structural engineer.",
    },
    {
      question: "Will you check the tie-downs and skirting?",
      answer:
        "Yes, we will visually observe the readily accessible support components, tie-downs, and skirting to note their general condition at the time of inspection.",
    },
    {
      question: "Is pricing different for manufactured homes?",
      answer:
        "Manufactured home inspections start at $350. Final pricing depends on the size, age, and any additional agreed scope.",
    },
  ];

  const scopeItems = [
    "Visual observation of accessible support components and tie-downs",
    "Assessment of roofing materials, flashing, and exterior cladding",
    "Testing of accessible electrical panels and receptacles",
    "Operation of HVAC systems and observation of visible ductwork",
    "Checking for visible plumbing leaks and testing fixtures",
    "Observation of site drainage and visible utility connections",
  ];

  return (
    <Layout>
      <SEO
        title="Manufactured & Mobile Home Inspections | ProSpec Sacramento"
        description="Professional manufactured and mobile home inspections in Sacramento, Folsom, and El Dorado County. Clear, objective reporting by a Certified Master Inspector."
        canonicalUrl="https://www.weareprospec.com/manufactured-home-inspection"
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center border-b border-border overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663462787524/KXLMpC34TJZ2Xp2FKiV446/hero-modern-home-EznMC93naFQVondgXzhfwU.webp"
            alt="Manufactured home"
            className="w-full h-full object-cover opacity-30 filter brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="container relative z-10 py-16">
          <div className="max-w-3xl flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 self-start font-mono text-[10px] tracking-widest uppercase text-primary">
              <Home className="h-3.5 w-3.5" />
              Residential Services
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wider uppercase leading-[1.15]">
              Manufactured Home <br />
              <span className="text-primary">Inspections</span>
            </h1>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
              Clear, objective assessments of manufactured and mobile homes.
              ProSpec provides independent, visual inspections in Sacramento,
              Folsom, and surrounding areas to help buyers and owners understand
              the condition of their property.
            </p>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
              Manufactured homes have unique structural and mechanical systems.
              We evaluate readily accessible components—from the support system
              to the roof—providing you with a detailed digital report of
              observed conditions and safety concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/booknow">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono tracking-widest uppercase text-xs h-14 px-8"
                  data-track-event="booking_cta_click"
                  data-track-location="manufactured_hero"
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
                  data-track-location="manufactured_hero"
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
                accessible systems and components of the manufactured home,
                including the exterior, interior, roof, plumbing, electrical,
                and HVAC systems.
              </p>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                This inspection is not an engineering certification, a HUD
                compliance check, or a guarantee of future performance. When
                significant concerns are observed, we recommend evaluation by
                qualified specialists.
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
              Why Buyers Choose ProSpec
            </h2>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
              Led by a Certified Master Inspector, our reports provide clear,
              objective documentation of the property's condition without hype or
              alarmism.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-border/80 bg-card/20 p-8 flex flex-col gap-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-white tracking-wide uppercase">
                Detailed Observation
              </h3>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                We visually assess readily accessible components, from the
                support system to the roof, providing a comprehensive overview of
                the home's current condition.
              </p>
            </div>

            <div className="border border-border/80 bg-card/20 p-8 flex flex-col gap-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <Wrench className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-white tracking-wide uppercase">
                Identify Safety Concerns
              </h3>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                We prioritize documenting visible safety concerns, such as
                improper electrical wiring or significant plumbing leaks
                observed at the time of inspection.
              </p>
            </div>

            <div className="border border-border/80 bg-card/20 p-8 flex flex-col gap-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-white tracking-wide uppercase">
                Clear Reporting
              </h3>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                You receive a same-day digital report with photos and practical
                recommendations, giving you the information you need to make an
                informed decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-b border-border py-20 md:py-28 bg-card/5">
        <div className="container">
          <FAQ items={faqs} title="Manufactured Home FAQs" />
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
                data-track-location="manufactured_bottom"
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
