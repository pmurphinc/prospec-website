import { Link } from "wouter";
import { ShieldCheck, CheckCircle2, Clock, MapPin, Award, Users, Star, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

/* 
  DESIGN PHILOSOPHY: Approach 1 - The Master Builder (Industrial Editorial)
  Dark editorial design, large typography, structural grid sections, real data, no-nonsense copy.
*/

export default function Home() {
  const trustPoints = [
    {
      title: "Certified Master Inspector (CMI)",
      desc: "The highest designation in the industry, held by only the top tier of experienced inspectors.",
    },
    {
      title: "Same-Day Digital Reports",
      desc: "Comprehensive HTML and PDF reports with detailed high-resolution photos delivered the same day.",
    },
    {
      title: "5,000+ Inspections Completed",
      desc: "Approximately 20 years of real-world construction and inspection experience in the local area.",
    },
    {
      title: "InterNACHI Certified",
      desc: "Fully backed and accredited by the International Association of Certified Home Inspectors.",
    },
  ];

  const quickServices = [
    {
      title: "Residential Home Inspections",
      price: "Starting at $350",
      desc: "Thorough structural, mechanical, and safety inspections for homebuyers and pre-listing sellers.",
      href: "/services",
    },
    {
      title: "Commercial Property Condition Assessments (PCA)",
      price: "Custom Quotes",
      desc: "ASTM-based physical condition assessments and due diligence reporting for commercial real estate buyers.",
      href: "/commercial-property-condition-assessments-sacramento",
    },
  ];

  const miniReviews = [
    {
      text: "Our house was inspected and serviced by Patrick Murphy and he was the textbook example of a professional tradesman. He was both efficient and thorough with his inspection; with detailed explanations and documentation.",
      author: "Rancho Cordova, CA",
      stars: 5,
    },
    {
      text: "Patrick is the best, I was overly impressed with the amount of knowledge and experience that he carried. Patrick provided a level of customer service unmatched. Our home was a raised foundation and he explored every part of it.",
      author: "Sacramento, CA",
      stars: 5,
    },
  ];

  const serviceAreas = [
    "Sacramento", "Folsom", "Roseville", "Rocklin", "El Dorado Hills", "Davis", "Elk Grove", "Placerville"
  ];

  return (
    <Layout>
      <SEO 
        title="ProSpec - Sacramento's Certified Master Home Inspector" 
        description="Schedule Sacramento's premier Certified Master Home Inspector. Same-day digital reports. 20 years of construction experience. Serving Sacramento, Folsom, and surrounding areas."
        canonicalUrl="https://www.weareprospec.com/"
      />
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center border-b border-border overflow-hidden">
        {/* Compressed background image with low-key dramatic sunset lighting */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663462787524/KXLMpC34TJZ2Xp2FKiV446/hero-modern-home-EznMC93naFQVondgXzhfwU.webp"
            alt="Sacramento Modern Architectural Home"
            className="w-full h-full object-cover opacity-35 filter brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="container relative z-10 py-20">
          <div className="max-w-3xl flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 self-start font-mono text-[10px] tracking-widest uppercase text-primary">
              <Award className="h-3 w-3" />
              Certified Master Inspector
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white tracking-wider uppercase leading-[1.1]">
              Sacramento’s <br />
              <span className="text-primary">Certified Master</span> <br />
              Home Inspector
            </h1>

            <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
              Same-day reports. 20 years of construction & inspection experience. Providing uncompromising physical due diligence across Sacramento, Folsom, and the greater Sacramento Valley.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/booknow">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest uppercase h-12 px-8 font-bold">
                  Schedule Your Inspection
                </Button>
              </Link>
              <Link href="/commercial-property-condition-assessments-sacramento">
                <Button variant="outline" className="border-border hover:border-white text-white font-mono text-xs tracking-widest uppercase h-12 px-8">
                  Request Commercial PCA Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Starting Price Tag - Monospace Grid Badge */}
        <div className="absolute bottom-10 right-6 md:right-12 lg:right-24 border border-border/80 bg-card/80 backdrop-blur-md px-6 py-4 flex flex-col items-end hidden md:flex">
          <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground">Residential Inspections</span>
          <span className="font-serif text-2xl text-white font-bold mt-1">Starting at $350</span>
        </div>
      </section>

      {/* 2. TRUST BADGES / CERTIFICATION AREA */}
      <section className="border-b border-border bg-card/20 py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* CMI Logo Feature */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start border-b lg:border-b-0 lg:border-r border-border/40 pb-6 lg:pb-0 lg:pr-8">
              <img 
                src="/manus-storage/1CMI-Logo-Alternate-NoShadow_588260c5.png" 
                alt="Certified Master Inspector certification seal" 
                className="h-20 sm:h-24 w-auto object-contain"
              />
            </div>
            {/* Trust points list */}
            <div className="lg:col-span-9 flex flex-wrap items-center justify-between gap-6 opacity-90">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-white">Certified Master Inspector (CMI)</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-primary shrink-0" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-white">InterNACHI Accredited</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-white">20 Years Local Experience</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-white">5,000+ Completed Inspections</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUE PROPOSITION: WHY CHOOSE PROSPEC */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side: Editorial Typography */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
                01. Uncompromising Standards
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wider uppercase leading-tight">
                Confidence Built on Real-World Experience
              </h2>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                We understand that your property is one of the most important investments you will ever make. At ProSpec, we do not perform rushed, checkbox inspections. We conduct deep physical diagnostics to identify critical defects, safety issues, and deferred maintenance concerns before they cost you.
              </p>
              <div className="border-l border-primary pl-4 py-1">
                <p className="font-serif text-sm italic text-white leading-relaxed">
                  "I inspect every property as if my own family were moving in. No shortcuts, no fluff, just detailed facts."
                </p>
                <span className="block font-mono text-[10px] uppercase text-muted-foreground mt-2">
                  — Patrick Murphy, Founder & CMI
                </span>
              </div>
            </div>

            {/* Right side: 4-Grid Trust points */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {trustPoints.map((point, index) => (
                <div key={index} className="border border-border/60 p-6 bg-card/10 flex flex-col gap-3 hover:border-primary/40 transition-colors">
                  <span className="font-mono text-xs text-primary font-bold">0{index + 1}.</span>
                  <h3 className="font-serif text-lg text-white tracking-wide">{point.title}</h3>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">{point.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. SPLIT SERVICES OVERVIEW: RESIDENTIAL & COMMERCIAL */}
      <section className="border-b border-border bg-card/10 py-20 md:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
            <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
              02. Professional Services
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wider uppercase">
              Residential & Commercial Due Diligence
            </h2>
            <p className="font-sans text-xs md:text-sm text-muted-foreground">
              Whether you are purchasing a single-family home or acquiring a commercial office park, our specialized inspection services deliver total clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {quickServices.map((service, index) => (
              <div
                key={index}
                className="border border-border/80 bg-card/30 p-8 md:p-12 flex flex-col justify-between gap-8 relative group hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                      {index === 0 ? "Residential Due Diligence" : "Commercial Real Estate"}
                    </span>
                    <span className="font-mono text-xs text-primary font-bold">{service.price}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-white tracking-wide uppercase group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                <Link href={service.href}>
                  <a className="font-mono text-[10px] tracking-widest uppercase text-white hover:text-primary transition-colors flex items-center gap-2 self-start">
                    Explore Service Details
                    <ArrowRight className="h-3 w-3 text-primary group-hover:translate-x-1 transition-transform" />
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. REVIEWS PREVIEW SECTION */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-4 flex flex-col gap-6">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
                03. Client Testimonials
              </span>
              <h2 className="font-serif text-3xl text-white tracking-wider uppercase leading-tight">
                Highly Rated by Local Buyers
              </h2>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                Our commitment to detail and clear communication has earned us 5-star reviews across Sacramento and Folsom. We break down complex reports into simple, actionable insights.
              </p>
              <Link href="/reviews">
                <a className="font-mono text-[10px] tracking-widest uppercase text-primary hover:text-white transition-colors flex items-center gap-2 self-start">
                  Read All Customer Reviews
                  <ArrowRight className="h-3 w-3" />
                </a>
              </Link>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {miniReviews.map((rev, index) => (
                <div key={index} className="border border-border/60 bg-card/20 p-6 md:p-8 flex flex-col justify-between gap-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-1">
                      {[...Array(rev.stars)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed italic">
                      "{rev.text}"
                    </p>
                  </div>
                  <span className="font-mono text-[10px] uppercase text-white tracking-wider">
                    — 5/5 Stars, {rev.author}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 6. LOCAL SERVICE AREA SECTION */}
      <section className="border-b border-border bg-card/5 py-20">
        <div className="container">
          <div className="border border-border/80 bg-card/30 p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="max-w-xl flex flex-col gap-4">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
                04. Local Service Area
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-white tracking-wider uppercase">
                Serving the Sacramento Valley
              </h2>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                ProSpec provides residential home inspections and commercial property condition assessments across Sacramento, Folsom, and surrounding areas. Our local experience means we understand regional building practices and climate-specific considerations.
              </p>
            </div>

            <div className="w-full lg:max-w-md">
              <div className="grid grid-cols-2 gap-4 font-mono text-[11px] tracking-wider text-white">
                {serviceAreas.map((area, i) => (
                  <div key={i} className="flex items-center gap-2 border-b border-border/40 pb-2">
                    <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>{area}, CA</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Compressed background image detail */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663462787524/KXLMpC34TJZ2Xp2FKiV446/inspector-detail-YE5FABDMR37naMApv7XZ3y.webp"
            alt="Inspector thermal imaging"
            className="w-full h-full object-cover opacity-15 filter grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-background/90" />
        </div>

        <div className="container relative z-10 text-center max-w-3xl flex flex-col gap-6 items-center">
          <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
            05. Take Action
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wider uppercase leading-tight">
            Schedule Your Professional Due Diligence Today
          </h2>
          <p className="font-sans text-xs md:text-sm text-muted-foreground max-w-lg leading-relaxed">
            Protect your capital and gain absolute confidence. Book your residential inspection instantly online, or contact Patrick Murphy for a custom commercial quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
            <Link href="/booknow">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest uppercase h-12 px-8 font-bold w-full sm:w-auto">
                Schedule Residential Inspection
              </Button>
            </Link>
            <Link href="/commercial-property-condition-assessments-sacramento">
              <Button variant="outline" className="border-border hover:border-white text-white font-mono text-xs tracking-widest uppercase h-12 px-8 w-full sm:w-auto">
                Request Commercial Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
