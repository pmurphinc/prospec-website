import { Link } from "wouter";
import {
  Home,
  CheckCircle2,
  FileText,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";

export default function NewConstructionInspection() {
  const faqs = [
    {
      question: "Do I really need an inspection on a brand-new home?",
      answer:
        "Yes. Even the best builders use multiple subcontractors, and municipal code inspectors only check for minimum life-safety compliance, not quality of workmanship. An independent visual inspection helps identify missing insulation, improper roof flashing, disconnected HVAC ducts, and framing defects before you close escrow.",
    },
    {
      question: "When should I schedule a new construction inspection?",
      answer:
        "Ideally, the inspection should take place a few days before your final builder walk-through. This gives you time to present the report to the builder so they can address any defects before you take possession of the home.",
    },
    {
      question: "Will this inspection guarantee my home is built to code?",
      answer:
        "No. A home inspection is an independent visual assessment of the home's condition at the time of inspection, not a municipal code compliance check or an engineering certification. We focus on identifying functional defects and safety concerns.",
    },
    {
      question: "What happens if you find defects?",
      answer:
        "You will receive a detailed digital report with photos and clear descriptions of the observed conditions. You can use this report as a punch list to request repairs from the builder prior to closing.",
    },
  ];

  const scopeItems = [
    "Visual assessment of the foundation and structural components",
    "Roofing, flashing, and attic insulation review",
    "Observation of accessible plumbing fixtures and visible piping",
    "Electrical panel and accessible receptacle testing",
    "HVAC system operation and visible ductwork connections",
    "Exterior cladding, grading, and drainage observations",
  ];

  return (
    <Layout>
      <SEO
        title="New Construction Home Inspections | ProSpec Sacramento"
        description="Independent new construction home inspections in Sacramento, Folsom, and El Dorado Hills. Identify builder defects before your final walk-through."
        canonicalUrl="https://www.weareprospec.com/new-construction-inspection"
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center border-b border-border overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663462787524/KXLMpC34TJZ2Xp2FKiV446/hero-modern-home-EznMC93naFQVondgXzhfwU.webp"
            alt="New construction home in Sacramento area"
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
              New Construction <br />
              <span className="text-primary">Home Inspections</span>
            </h1>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
              Protect your investment before you close. ProSpec provides
              independent, visual inspections of newly built homes in Sacramento,
              Folsom, and El Dorado County to identify construction defects and
              oversights before your final builder walk-through.
            </p>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
              A municipal code inspector ensures minimum life-safety compliance,
              but they do not verify the quality of workmanship. Our inspection
              provides you with a detailed punch list of observed conditions,
              giving you the leverage to have the builder correct issues before
              you take the keys.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/booknow">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono tracking-widest uppercase text-xs h-14 px-8"
                  data-track-event="booking_cta_click"
                  data-track-location="new_construction_hero"
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
                  data-track-location="new_construction_hero"
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
                Modern homes are built fast, often resulting in forgotten
                details. We conduct a non-invasive, visual assessment of the
                readily accessible systems and components of the home.
              </p>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                This is not an engineering analysis or a guarantee of future
                performance, but a practical evaluation of the home's condition
                at the time of inspection. When significant defects are observed,
                we recommend evaluation by qualified specialists.
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
              Why Buyers Trust ProSpec
            </h2>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
              Led by a Certified Master Inspector, our reports cut through the
              noise. We provide clear, objective documentation of the property's
              condition without hype or alarmism.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-border/80 bg-card/20 p-8 flex flex-col gap-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-white tracking-wide uppercase">
                Independent Review
              </h3>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                We work exclusively for you, not the builder. Our only goal is
                to provide you with an accurate assessment of the home's
                condition.
              </p>
            </div>

            <div className="border border-border/80 bg-card/20 p-8 flex flex-col gap-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <AlertTriangle className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-white tracking-wide uppercase">
                Catch Hidden Defects
              </h3>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                We regularly find disconnected ductwork, missing attic
                insulation, and improper roof flashing that buyers and municipal
                inspectors miss.
              </p>
            </div>

            <div className="border border-border/80 bg-card/20 p-8 flex flex-col gap-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-white tracking-wide uppercase">
                The Ultimate Punch List
              </h3>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                You receive a same-day digital report with photos. It serves as
                the perfect, professional punch list to hand directly to your
                builder's superintendent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-b border-border py-20 md:py-28 bg-card/5">
        <div className="container">
          <FAQ items={faqs} title="New Construction FAQs" />
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
                data-track-location="new_construction_bottom"
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
