import { Link } from "wouter";
import { Star, ShieldCheck, Award, Quote, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

/* 
  DESIGN PHILOSOPHY: Approach 1 - The Master Builder (Industrial Editorial)
  Dark grid alignment, bold serif testimonials, monospace star indicators, local authority trust.
*/

export default function Reviews() {
  const reviews = [
    {
      text: "Our house was inspected and serviced by Patrick Murphy and he was the textbook example of a professional tradesman. He was both efficient and thorough with his inspection; with detailed explanations and documentation. He was extremely knowledgeable about his work and was able to inform and advice me about many small aspects of home maintainance I was not aware of. Also explained things in layman terms so as a non tradesperson I easily understood all issues he brought up. Overall Patrick went above and beyond for my family and I highly recommend their service.",
      author: "Rancho Cordova, CA",
      stars: 5,
    },
    {
      text: "Patrick is the best, I was overly impressed with the amount of knowledge and experience that he carried. Patrick provided a level of customer service unmatched. Our home was a raised foundation and he explored every part of it. very hands-on and not afraid to get dirty in the inspection process. This is the guy you want inspecting your potential future home. Also broke down the report for us to understand, instead of trying to figure it out through the reports. I would highly recommend that Patrick inspect your future home!",
      author: "Sacramento, CA",
      stars: 5,
    },
    {
      text: "This company is absolutely wonderful. During the stressful time of buying a home, Patrick blew me away with how thorough and professional he was. Not only would I highly recommend this company for a home inspection, I would put it in the category of a 'must'. Some of the best money I have ever spent.",
      author: "Sacramento, CA",
      stars: 5,
    },
    {
      text: "These guys provide off the charts, excellent services. They were on time, very clean, professional and personable. Patrick really took his time and looked our (potential) house over with a very careful and experienced eye. They found many things I would never even cam close to discovering on my own. Not only did they point out the issues that negatively effected my purchase, but they gave many wonderful recommendations on how I could fix them myself or hire someone to get their hands dirty for me. For instance, the dishwasher was full of hard water buildup and Patrick suggested purchasing a dishwasher cleaning product which would remove the buildup while lubricating the working parts of the appliance. The bottom line is, if you're looking for a professional and knowledgeable home inspection service, there is no better choice than Prospec. Thank You Patrick!!!",
      author: "Davis, CA",
      stars: 5,
    },
    {
      text: "Soon as I met Patrick he professionally introduced himself and explained to me exactly what he does and what to expect when working with him. He is very personable and very professional. Thank you for your service Patrick.",
      author: "Sacramento, CA",
      stars: 5,
    },
  ];

  return (
    <Layout>
      <SEO 
        title="Customer Reviews & Testimonials | ProSpec Sacramento" 
        description="Read 5-star reviews from real home buyers, sellers, and real estate agents in Sacramento and Folsom who trust Certified Master Inspector Patrick Murphy."
        canonicalUrl="https://www.weareprospec.com/reviews"
      />
      {/* Page Header */}
      <section className="border-b border-border bg-card/10 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold block mb-3">
              01. Client Satisfaction
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-white tracking-wider uppercase mb-6 leading-tight">
              5-Star Client Reviews
            </h1>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
              Don't just take our word for it. Read honest feedback from home buyers, sellers, and real estate professionals across Sacramento, Folsom, and the greater Sacramento Valley who have trusted Patrick Murphy with their physical due diligence.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Overview */}
      <section className="border-b border-border bg-card/5 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="border border-border/60 p-6 bg-card/10 flex flex-col gap-2 justify-center">
              <span className="font-serif text-3xl text-white font-bold">5.0 / 5.0</span>
              <div className="flex gap-1 justify-center md:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground mt-1">
                Perfect Star Rating
              </span>
            </div>
            
            <div className="border border-border/60 p-6 bg-card/10 flex flex-col gap-2 justify-center">
              <span className="font-serif text-3xl text-white font-bold">100%</span>
              <span className="font-sans text-xs text-muted-foreground leading-relaxed">
                Of clients surveyed report feeling significantly more confident in their property purchase after our inspection.
              </span>
              <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground">
                Confidence Rating
              </span>
            </div>

            <div className="border border-border/60 p-6 bg-card/10 flex flex-col gap-2 justify-center">
              <span className="font-serif text-3xl text-white font-bold">CMI</span>
              <span className="font-sans text-xs text-muted-foreground leading-relaxed">
                Inspections are led by a Certified Master Inspector, the absolute highest professional credential in the industry.
              </span>
              <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground">
                Elite Credentials
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
            {reviews.map((rev, index) => (
              <div
                key={index}
                className="border border-border/80 bg-card/20 p-8 md:p-12 flex flex-col md:flex-row gap-8 relative hover:border-primary/40 transition-colors"
              >
                {/* Quote Icon Background */}
                <Quote className="absolute top-6 right-6 h-12 w-12 text-border/10 pointer-events-none" />

                {/* Left Side: Rating & Author */}
                <div className="md:w-1/4 shrink-0 flex flex-col gap-2">
                  <div className="flex gap-1">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] uppercase text-white tracking-wider font-bold">
                    {rev.author}
                  </span>
                  <span className="font-mono text-[9px] uppercase text-muted-foreground">
                    Verified Client
                  </span>
                </div>

                {/* Right Side: Review Text */}
                <div className="flex-grow flex flex-col gap-4">
                  <p className="font-serif text-base md:text-lg text-white leading-relaxed italic">
                    "{rev.text}"
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground">
                      Same-Day Digital Report Delivered
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center max-w-3xl mx-auto flex flex-col gap-6 items-center">
        <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
          02. Secure Your Due Diligence
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wider uppercase">
          Experience the ProSpec Difference
        </h2>
        <p className="font-sans text-xs md:text-sm text-muted-foreground max-w-md leading-relaxed">
          Don't settle for checkbox inspectors. Hire a Certified Master Inspector with approximately 20 years of construction and inspection experience.
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
