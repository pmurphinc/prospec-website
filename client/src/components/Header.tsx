import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Phone, Menu, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

/* 
  DESIGN PHILOSOPHY: Approach 1 - The Master Builder (Industrial Editorial)
  Header with sharp 1px grid borders, asymmetric layout, clean monospace style active indicators.
*/

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    {
      name: "Commercial PCA",
      href: "/commercial-property-condition-assessments-sacramento",
    },
    { name: "Reviews", href: "/reviews" },
    { name: "Inspector", href: "/inspector" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-border/80 py-3"
          : "bg-background/40 backdrop-blur-xs border-border/30 py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group shrink-0 mr-4">
          <div className="flex items-center justify-center transition-opacity group-hover:opacity-90">
            <img
              src="https://static.wixstatic.com/media/07e6cd_bf96e5111b0d4e9297ec02ee9dd29f0a~mv2.png"
              alt="ProSpec Home Inspections logo"
              className="h-11 sm:h-12 md:h-14 max-h-[56px] w-auto object-contain"
            />
          </div>
          <div className="flex flex-col border-l border-border/40 pl-3 pr-2">
            <span className="font-serif text-lg tracking-wider font-bold text-white uppercase leading-none">
              Pro<span className="text-primary">Spec</span>
            </span>
            <span className="text-[8px] font-mono tracking-widest text-muted-foreground uppercase mt-1 leading-none">
              Master Inspector
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center border-l border-border/40 pl-8 ml-4 h-10 gap-8">
          {navItems.map(item => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-sans text-xs tracking-widest uppercase transition-colors relative py-2 ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="tel:916-432-0332"
            className="flex items-center gap-2 font-mono text-xs tracking-wider text-muted-foreground hover:text-white transition-colors border border-border/40 px-4 py-2"
          >
            <Phone className="h-3 w-3 text-primary" />
            (916) 432-0332
          </a>
          <Link href="/booknow">
            <Button
              variant="default"
              className="text-xs font-mono tracking-wider uppercase bg-primary hover:bg-primary/90 text-primary-foreground font-bold border border-primary px-5 py-2 hover:scale-95 transition-transform"
            >
              Book Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden border border-border/40 p-2 text-muted-foreground hover:text-white hover:border-white transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed left-0 right-0 top-[69px] sm:top-[73px] md:top-[81px] bg-background border-b border-t border-border/80 shadow-2xl z-[9999] animate-fade-in flex flex-col justify-between p-6 h-[calc(100vh-85px)] overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navItems.map(item => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-serif text-xl tracking-wide py-3.5 px-4 border-b border-border/10 flex items-center min-h-[48px] ${
                    isActive
                      ? "text-primary bg-card/40 font-bold border-l-2 border-l-primary"
                      : "text-white hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/booknow"
              onClick={() => setIsOpen(false)}
              className={`font-serif text-xl tracking-wide py-3.5 px-4 border-b border-border/10 flex items-center min-h-[48px] ${
                location === "/booknow"
                  ? "text-primary bg-card/40 font-bold border-l-2 border-l-primary"
                  : "text-white hover:text-primary"
              }`}
            >
              Book Now / Schedule
            </Link>
          </div>

          <div className="flex flex-col gap-4 pt-6 mt-6 border-t border-border/40">
            <a
              href="tel:916-432-0332"
              className="flex items-center justify-center gap-3 font-mono text-sm tracking-wider border border-border/60 py-3.5 text-white min-h-[48px] bg-card/20 hover:bg-card/40 transition-colors"
            >
              <Phone className="h-4 w-4 text-primary" />
              (916) 432-0332
            </a>
            <Link
              href="/booknow"
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              <Button className="w-full py-6 text-sm font-mono tracking-widest uppercase bg-primary hover:bg-primary/90 text-primary-foreground font-bold min-h-[48px]">
                Schedule Inspection
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
