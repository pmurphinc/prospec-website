import { Link } from "wouter";
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink } from "lucide-react";

/* 
  DESIGN PHILOSOPHY: Approach 1 - The Master Builder (Industrial Editorial)
  Footer with structured layout, clean alignment, fine border divisions, and detailed local SEO linkages.
*/

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border mt-auto">
      {/* Upper Footer - Grid */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand & Bio */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group self-start">
              <div className="flex items-center justify-center transition-opacity group-hover:opacity-90">
                <img
                  src="https://static.wixstatic.com/media/07e6cd_bf96e5111b0d4e9297ec02ee9dd29f0a~mv2.png"
                  alt="ProSpec Home Inspections logo"
                  className="h-11 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col border-l border-border/40 pl-3">
                <span className="font-serif text-lg tracking-wider font-bold text-white uppercase leading-none">
                  Pro<span className="text-primary">Spec</span>
                </span>
                <span className="text-[8px] font-mono tracking-widest text-muted-foreground uppercase mt-1 leading-none">
                  Master Inspector
                </span>
              </div>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed font-sans">
              Sacramento Valley's premier property inspection firm. Led by
              Patrick Murphy, a Certified Master Inspector (CMI) with
              approximately 20 years of hands-on construction and inspection
              expertise. Delivering premium-grade, detailed digital reports for
              homebuyers and commercial property investors.
            </p>
            <div className="flex gap-4 items-center">
              <div className="border border-primary/50 bg-primary/10 px-4 py-3 text-center font-mono text-[9px] tracking-widest uppercase text-white transition-all duration-300">
                Certified Master Inspector
              </div>
              <div className="border border-border/60 px-3 py-1 flex items-center justify-center font-mono text-[9px] tracking-widest uppercase text-muted-foreground hover:text-white hover:border-white transition-colors">
                InterNACHI Certified
              </div>
            </div>
          </div>

          {/* Column 2: Residential Services */}
          <div className="flex flex-col gap-5">
            <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
              Residential Inspections
            </span>
            <ul className="flex flex-col gap-3 font-sans text-xs">
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Buyer's Home Inspections
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Pre-Listing Inspections
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  New Construction Inspections
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  11-Month Warranty Inspections
                </Link>
              </li>
              <li>
                <a
                  href="https://app.spectora.com/home-inspectors/my-inspection-company-14f9d0e41f/sample_reports"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  View Sample Reports
                  <ExternalLink className="h-3 w-3 text-primary" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Commercial Services */}
          <div className="flex flex-col gap-5">
            <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
              Commercial Inspections
            </span>
            <ul className="flex flex-col gap-3 font-sans text-xs">
              <li>
                <Link
                  href="/commercial-property-condition-assessments-sacramento"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Property Condition Assessments (PCA)
                </Link>
              </li>
              <li>
                <Link
                  href="/commercial-building-inspections-sacramento"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Commercial Building Inspections
                </Link>
              </li>
              <li>
                <Link
                  href="/apartment-building-inspections-sacramento"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Apartment & Multi-Family Inspections
                </Link>
              </li>
              <li>
                <Link
                  href="/commercial-property-condition-assessments-sacramento"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  ASTM-Style Property Condition Assessments
                </Link>
              </li>
              <li>
                <Link
                  href="/commercial-property-condition-assessments-sacramento"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Investor Due Diligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Service Area */}
          <div className="flex flex-col gap-5">
            <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
              Connect with ProSpec
            </span>
            <ul className="flex flex-col gap-4 font-sans text-xs">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Serving Sacramento, Folsom, Roseville, Rocklin, El Dorado
                  Hills, Davis, Elk Grove, Placerville & Greater Sacramento
                  Valley
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="tel:916-432-0332"
                  className="text-muted-foreground hover:text-white transition-colors font-mono"
                >
                  (916) 432-0332
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="mailto:patrick@weareprospec.com"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  patrick@weareprospec.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Lower Footer - Copyright & Legal */}
      <div className="border-t border-border/40 bg-background/50 py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] tracking-wider text-muted-foreground">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <span>© {currentYear} ProSpec. All Rights Reserved.</span>
            <span className="hidden md:inline text-border">|</span>
            <span>Sacramento & Folsom, California</span>
          </div>
          <div className="flex gap-6">
            <Link
              href="/booknow"
              className="hover:text-white transition-colors uppercase"
            >
              Schedule Online
            </Link>
            <Link
              href="/services"
              className="hover:text-white transition-colors uppercase"
            >
              Our Services
            </Link>
            <Link
              href="/inspector"
              className="hover:text-white transition-colors uppercase"
            >
              Meet Patrick
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
