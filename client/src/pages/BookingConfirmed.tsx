import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { CheckCircle2, Phone, Mail, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { trackEvent } from "@/lib/tracking";

/*
  DESIGN PHILOSOPHY: Approach 1 - The Master Builder (Industrial Editorial)

  Post-booking confirmation page. This is the destination for Spectora's
  return URL after a completed booking, and it is the only point in the funnel
  where a completed booking can be observed — the scheduler itself runs in a
  cross-origin iframe, so its internal events are not readable from this page.

  Because of that, booking_complete here means "the visitor reached the
  post-booking return URL", not "Spectora recorded a paid booking". Treat GA4's
  count as a close proxy and reconcile against Spectora's own booking records
  before relying on it for acquisition cost.

  Setup required outside this repo for the event to fire at all:
    1. Spectora → set the post-booking return URL to
       https://www.weareprospec.com/booking-confirmed
    2. GTM → add a trigger on the custom event `booking_complete`, forwarding
       to GA4 as a conversion.
    3. GA4 → mark `booking_complete` as a key event.
*/

export default function BookingConfirmed() {
  // Guard against double-firing under React 18 StrictMode, which mounts
  // effects twice in development and would otherwise inflate the count.
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackEvent({ event: "booking_complete" });
  }, []);

  return (
    <Layout>
      <SEO
        title="Inspection Booked | ProSpec Home Inspections"
        description="Your inspection request has been received. ProSpec will follow up to confirm the appointment details."
        canonicalUrl="https://www.weareprospec.com/booking-confirmed"
        robots="noindex, follow"
      />

      {/* Confirmation Header */}
      <section className="border-b border-border bg-card/10 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold block mb-3">
              01. Confirmed
            </span>
            <div className="flex items-start gap-4 mb-6">
              <CheckCircle2 className="h-8 w-8 text-primary shrink-0 mt-1" />
              <h1 className="font-serif text-4xl sm:text-5xl text-white tracking-wider uppercase leading-tight">
                Your Inspection Is Booked
              </h1>
            </div>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
              Thank you for scheduling with ProSpec. Your booking has been
              received and a confirmation email is on its way with your
              appointment details and inspection agreement.
            </p>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="border-b border-border py-12 md:py-16">
        <div className="container">
          <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold block mb-8">
            02. What Happens Next
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-border/60 p-6 bg-card/10 flex flex-col gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <span className="font-serif text-xl text-white font-bold">
                Check Your Email
              </span>
              <span className="font-sans text-xs text-muted-foreground leading-relaxed">
                Your confirmation includes the appointment time, address, and
                the inspection agreement to review and sign.
              </span>
            </div>

            <div className="border border-border/60 p-6 bg-card/10 flex flex-col gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-serif text-xl text-white font-bold">
                Plan To Attend
              </span>
              <span className="font-sans text-xs text-muted-foreground leading-relaxed">
                You are welcome to join the inspection. Patrick will walk you
                through observed conditions and answer questions on site.
              </span>
            </div>

            <div className="border border-border/60 p-6 bg-card/10 flex flex-col gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="font-serif text-xl text-white font-bold">
                Same-Day Report
              </span>
              <span className="font-sans text-xs text-muted-foreground leading-relaxed">
                Your photo-documented digital report is delivered the same day
                as the inspection.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Need To Change Something */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold block mb-4">
              03. Need To Change Something?
            </span>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed mb-6">
              If you need to reschedule, adjust the scope, or add a service,
              reach out directly and Patrick will take care of it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:916-432-0332"
                data-track-event="phone_click"
                data-track-location="booking_confirmed"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-primary hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                (916) 432-0332
              </a>
              <a
                href="mailto:patrick@weareprospec.com"
                data-track-event="email_click"
                data-track-location="booking_confirmed"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-primary hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                patrick@weareprospec.com
              </a>
            </div>

            <div className="mt-10 pt-8 border-t border-border/60">
              <Link
                href="/"
                className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                ← Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
