import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ShieldCheck,
  Award,
  Phone,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { trackEvent } from "@/lib/tracking";
import {
  PHONE_DISPLAY,
  PHONE_SMS_HREF,
  PHONE_TEL_HREF,
} from "@shared/business";

/* 
  DESIGN PHILOSOPHY: Approach 1 - The Master Builder (Industrial Editorial)
  Dark editorial layout, fine border divisions, responsive Spectora booking widget iframe.
*/

export default function BookNow() {
  const [loading, setLoading] = useState(true);
  // The Spectora iframe is deferred until it is near the viewport so the page
  // and its Call / Text CTAs stay interactive while the third-party scheduler
  // loads. `shouldLoadIframe` gates the <iframe> entirely.
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const iframeSlotRef = useRef<HTMLDivElement | null>(null);

  const spectoraIframeUrl =
    "https://app.spectora.com/home-inspectors/my-inspection-company-14f9d0e41f/schedule?iframe=true";

  // Reaching the scheduler page is the top of the measurable booking funnel.
  // This is NOT a booking — booking_complete fires only on /booking-confirmed.
  useEffect(() => {
    trackEvent({ event: "scheduler_view" });
  }, []);

  // Load the scheduler when it approaches the viewport.
  //
  // BOOKING RELIABILITY: deferring must never be able to strand the scheduler.
  // This is the primary conversion path, so there are three independent ways it
  // can load — a viewport-proximity check, an IntersectionObserver fast path,
  // and an unconditional timeout backstop. If any one of them fires, the iframe
  // loads. A browser where IntersectionObserver silently never fires (or is
  // missing entirely) still gets a working scheduler via the backstop.
  useEffect(() => {
    const slot = iframeSlotRef.current;
    if (!slot) return;

    let settled = false;
    const load = () => {
      if (settled) return;
      settled = true;
      setShouldLoadIframe(true);
    };

    // 1. Already at or near the viewport on mount — no observer needed.
    const isNearViewport = () => {
      const rect = slot.getBoundingClientRect();
      return rect.top < window.innerHeight + 400 && rect.bottom > -400;
    };
    if (isNearViewport()) {
      load();
      return;
    }

    // 2. Fast path: load as soon as the slot approaches the viewport.
    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        entries => {
          if (entries.some(entry => entry.isIntersecting)) load();
        },
        { rootMargin: "400px" }
      );
      observer.observe(slot);
    }

    // 3. Backstop: a passive scroll check plus an unconditional timer, so the
    //    scheduler loads even if the observer never reports.
    const onScroll = () => {
      if (isNearViewport()) load();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const backstop = window.setTimeout(load, 2500);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(backstop);
    };
  }, []);

  return (
    <Layout>
      <SEO
        title="Schedule Your Inspection Online | ProSpec Sacramento"
        description="Book your residential home inspection online with ProSpec. Review real-time availability, select service add-ons, and secure your inspection slot in minutes. Same-day reports."
        canonicalUrl="https://www.weareprospec.com/booknow"
        robots="noindex, follow"
      />
      {/* Page Header */}
      <section className="border-b border-border bg-card/10 py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold block mb-3">
              01. Scheduling
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-white tracking-wider uppercase mb-4 leading-tight">
              Schedule Your Inspection
            </h1>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
              Book your residential inspection instantly online. Review
              real-time availability, select your service add-ons, get immediate
              pricing, and secure your inspection slot in minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Embed Container */}
      <section className="border-b border-border py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Side: Spectora Widget */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="border border-border/80 bg-card/30 relative min-h-[700px] flex flex-col">
                {/* Header Indicator */}
                <div className="border-b border-border/60 px-6 py-4 bg-card/50 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-[9px] tracking-widest uppercase text-white font-bold">
                      Spectora Secure Online Scheduler
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-muted-foreground uppercase hidden sm:inline">
                    Same-Day Digital Reports
                  </span>
                </div>

                {/* The Widget Iframe */}
                <div ref={iframeSlotRef} className="flex-grow relative">
                  {loading && (
                    <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center gap-3 z-10">
                      <div className="h-8 w-8 border-2 border-primary border-t-transparent animate-spin" />
                      <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                        Loading Scheduler...
                      </span>
                    </div>
                  )}

                  {shouldLoadIframe ? (
                    <iframe
                      src={spectoraIframeUrl}
                      title="Spectora Booking Widget"
                      className="w-full h-[700px] border-0"
                      loading="lazy"
                      onLoad={() => {
                        setLoading(false);
                        // The iframe finished loading. That is all this means:
                        // it is NOT an availability check and NOT a booking.
                        // Nothing inside app.spectora.com is observable from
                        // here (cross-origin, no postMessage API).
                        trackEvent({ event: "scheduler_loaded" });
                      }}
                      allow="geolocation"
                    />
                  ) : (
                    <div className="w-full h-[700px]" aria-hidden="true" />
                  )}
                </div>
              </div>
            </div>

            {/* Right Side: Booking Support & Policies */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {/* Box 1: Urgent Booking */}
              <div className="border border-border/80 bg-card/20 p-6 md:p-8 flex flex-col gap-4">
                <span className="font-mono text-[9px] tracking-widest uppercase text-primary font-bold">
                  Need Immediate Help?
                </span>
                <h3 className="font-serif text-lg text-white tracking-wide uppercase">
                  Urgent / Next-Day Booking
                </h3>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                  If you need a last-minute inspection, have an extremely tight
                  escrow deadline, or do not see your preferred slot available
                  online, contact Patrick Murphy directly. We do our best to
                  accommodate urgent requests.
                </p>
                <a
                  href={PHONE_TEL_HREF}
                  className="border border-primary/40 hover:border-primary text-white font-mono text-xs tracking-widest uppercase py-3 text-center transition-colors flex items-center justify-center gap-2 mt-2 bg-primary/5"
                  data-track-event="phone_click"
                  data-track-location="booknow-sidebar"
                >
                  <Phone className="h-3.5 w-3.5 text-primary" />
                  Call {PHONE_DISPLAY}
                </a>
                <a
                  href={PHONE_SMS_HREF}
                  className="border border-border/60 hover:border-white text-white font-mono text-xs tracking-widest uppercase py-3 text-center transition-colors flex items-center justify-center gap-2"
                  data-track-event="text_click"
                  data-track-location="booknow-sidebar"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-primary" />
                  Text {PHONE_DISPLAY}
                </a>
              </div>

              {/* Box 2: What to Expect */}
              <div className="border border-border/60 bg-card/10 p-6 flex flex-col gap-4">
                <span className="font-mono text-[9px] tracking-widest uppercase text-primary font-bold">
                  The Process
                </span>
                <h3 className="font-serif text-base text-white tracking-wide uppercase">
                  What Happens Next?
                </h3>
                <ul className="flex flex-col gap-3 font-sans text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>1. Confirm Details:</strong> Complete the secure
                      online form. You'll receive an instant confirmation email.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>2. Agreement & Payment:</strong> Before the
                      inspection, we'll email your digital inspection agreement
                      and invoice.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>3. Detailed Inspection:</strong> Patrick Murphy
                      will thoroughly inspect the property and document all
                      findings.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>4. Same-Day Report:</strong> Your highly detailed,
                      photo-rich digital report is delivered the very same
                      evening.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Box 3: Commercial Warning */}
              <div className="border border-destructive/30 bg-destructive/5 p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-primary" />
                  <span className="font-mono text-[9px] tracking-widest uppercase text-primary font-bold">
                    Commercial Properties
                  </span>
                </div>
                <h3 className="font-serif text-base text-white tracking-wide uppercase">
                  Commercial PCA Inquiries
                </h3>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                  Commercial property inspections, multi-family portfolios, and
                  property condition assessments require custom scoping and
                  proposal generation. Do not use the residential scheduler
                  above for commercial assets.
                </p>
                <Link
                  href="/commercial-property-condition-assessments-sacramento"
                  className="font-mono text-[10px] tracking-widest uppercase text-primary hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  Request Commercial Quote
                  <Clock className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
