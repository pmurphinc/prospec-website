import { Link } from "wouter";
import { Award, CheckCircle2, ShieldCheck, Mail, Phone, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

/* 
  DESIGN PHILOSOPHY: Approach 1 - The Master Builder (Industrial Editorial)
  Dark editorial split layout, beautiful serif pull quotes, precise credentials alignment.
*/

export default function Inspector() {
  const credentials = [
    "Certified Master Inspector (CMI) — the highest industry designation",
    "InterNACHI Certified (International Association of Certified Home Inspectors)",
    "Approximately 20 years of hands-on construction & inspection experience",
    "Over 5,000 professional property inspections successfully completed",
    "Specialist in residential structures, framing, roofing, decks, and chimneys",
    "Expert in commercial Property Condition Assessments (PCA) & ASTM standards",
  ];

  return (
    <Layout>
      <SEO 
        title="Patrick Murphy, Certified Master Inspector | ProSpec Sacramento" 
        description="Meet Patrick Murphy, a second-generation property inspector with 20 years of construction and inspection experience in Sacramento and Folsom."
        canonicalUrl="https://www.weareprospec.com/inspector"
      />
      {/* Editorial Hero Section */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            
            {/* Left Column: Headshot with frame */}
            <div className="lg:col-span-5 relative">
              <div className="border border-border/80 p-3 bg-card/20 relative z-10">
                <img
                  src="https://static.wixstatic.com/media/07e6cd_fef029ce152244d8b71f2c893f4a4611~mv2.jpg/v1/fill/w_364,h_339,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/07e6cd_fef029ce152244d8b71f2c893f4a4611~mv2.jpg"
                  alt="Patrick Murphy, CMI"
                  className="w-full h-auto grayscale brightness-95 contrast-105"
                />
              </div>
              {/* Offset decorative background block */}
              <div className="absolute inset-0 border border-primary/30 translate-x-4 translate-y-4 -z-0 pointer-events-none" />
            </div>

            {/* Right Column: Title & Intro */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 self-start font-mono text-[10px] tracking-widest uppercase text-primary">
                <Award className="h-3.5 w-3.5" />
                Certified Master Inspector
              </div>
              
              <h1 className="font-serif text-4xl sm:text-5xl text-white tracking-wider uppercase leading-tight">
                Meet Patrick Murphy
              </h1>

              <p className="font-serif text-lg text-primary italic leading-relaxed">
                "From a young age, I was captivated by the world of home construction, largely due to my father's influence as a general contractor."
              </p>

              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                Patrick is a second-generation Master Home Inspector with approximately 20 years of hands-on experience in construction, repairs, remodeling, and professional property inspections. Having completed over 5,000 inspections, Patrick has perfected his craft. His main priority is always health, safety, and providing uncompromising clarity to his clients.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 font-mono text-[10px] tracking-wider">
                <a
                  href="mailto:patrick@weareprospec.com"
                  className="border border-border/60 hover:border-white px-4 py-2.5 text-muted-foreground hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="h-3.5 w-3.5 text-primary" />
                  patrick@weareprospec.com
                </a>
                <a
                  href="tel:916-432-0332"
                  className="border border-border/60 hover:border-white px-4 py-2.5 text-muted-foreground hover:text-white transition-colors flex items-center gap-2"
                >
                  <Phone className="h-3.5 w-3.5 text-primary" />
                  (916) 432-0332
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Biography Detail */}
      <section className="border-b border-border bg-card/5 py-20 md:py-28">
        <div className="container max-w-4xl">
          <div className="flex flex-col gap-8">
            <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
              02. Professional Journey
            </span>
            
            <h2 className="font-serif text-3xl text-white tracking-wider uppercase">
              The Story of ProSpec
            </h2>

            <div className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed flex flex-col gap-6">
              <p>
                "Through hands-on learning under my father's guidance, I gained invaluable experience in various aspects of home inspections, repairs, and remodeling. Over the past two decades, I've built upon this foundation, working tirelessly to serve countless families and create safe, comfortable living spaces. Driven by a desire to carry on my father's legacy, I've dedicated myself to upholding the highest standards in the field."
              </p>
              
              <p>
                As a Certified Master Inspector (CMI) with InterNACHI, Patrick continues to expand his expertise through ongoing education and training. Specializing in structural envelopes, roofing, decks, and chimneys, he is uniquely equipped to address a wide range of complex challenges and provide accurate physical assessments for both residential buyers and commercial real estate investors.
              </p>

              <p>
                "My role as a devoted husband and father of 4 has only deepened my understanding of a home's significance. Beyond its financial value, a home is a sanctuary where memories are created and families grow. With this perspective in mind, I approach each inspection as if it were for my own family, ensuring that every detail is thoroughly examined and explained to my clients. By empowering them with knowledge about their homes, I hope to contribute to their happiness and peace of mind."
              </p>
            </div>

            {/* Pull Quote */}
            <div className="border-l-2 border-primary pl-6 py-2 my-4">
              <p className="font-serif text-lg md:text-xl text-white italic leading-relaxed">
                "By empowering clients with physical knowledge about their prospective properties, I hope to contribute to their happiness, safety, and long-term peace of mind."
              </p>
              <span className="block font-mono text-[10px] uppercase text-muted-foreground mt-2">
                — Patrick Murphy, Founder
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Checklist */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
                03. Elite Standards
              </span>
              <h2 className="font-serif text-3xl text-white tracking-wider uppercase">
                Why Experience Matters
              </h2>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                Not all home inspectors are equal. In California, licensing is minimal, which is why choosing a Certified Master Inspector (CMI) is critical. CMIs are board-certified, have completed thousands of inspections, and adhere to the strictest code of ethics and continuing education requirements.
              </p>
              <div className="flex gap-4 items-center opacity-95 mt-2">
                <img
                  src="/manus-storage/1CMI-Logo-Alternate-NoShadow_588260c5.png"
                  alt="Certified Master Inspector certification seal"
                  className="h-20 w-auto object-contain transition-all duration-300"
                />
                <div className="border border-border/60 px-4 py-2 flex items-center justify-center font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                  InterNACHI Board Certified
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 border border-border/80 bg-card/20 p-8 md:p-12">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold block mb-6">
                Patrick's Professional Credentials
              </span>
              <ul className="flex flex-col gap-4 font-sans text-xs md:text-sm text-muted-foreground">
                {credentials.map((cred, i) => (
                  <li key={i} className="flex items-start gap-3 border-b border-border/40 pb-3 last:border-0 last:pb-0">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-white font-medium">{cred}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center max-w-3xl mx-auto flex flex-col gap-6 items-center">
        <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
          04. Book Patrick Direct
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wider uppercase">
          Work with Sacramento's Best
        </h2>
        <p className="font-sans text-xs md:text-sm text-muted-foreground max-w-md leading-relaxed">
          Secure Patrick Murphy for your upcoming residential home purchase or commercial due diligence. Book online in minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
          <Link href="/booknow">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest uppercase h-12 px-8 font-bold w-full sm:w-auto">
              Schedule Your Inspection
            </Button>
          </Link>
          <Link href="/booknow">
            <Button variant="outline" className="border-border hover:border-white text-white font-mono text-xs tracking-widest uppercase h-12 px-8 w-full sm:w-auto">
              Request Commercial Quote
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
