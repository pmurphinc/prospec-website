import { useEffect } from "react";
import { Link } from "wouter";
import { CheckCircle2, Phone, MessageSquare, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { trackEvent } from "@/lib/tracking";
import {
  PHONE_DISPLAY,
  PHONE_SMS_HREF,
  PHONE_TEL_HREF,
} from "@shared/business";

/*
  Post-booking confirmation page.

  ── THIS IS THE ONLY PLACE booking_complete FIRES ──────────────────────────
  booking_complete here is a REDIRECT-BASED PROXY for a completed booking, not
  a confirmation from Spectora. It means "a visitor landed on our confirmation
  URL", which Spectora sends them to after they finish booking. ProSpec never
  receives a direct completion signal from Spectora: the scheduler is a
  cross-origin iframe with no documented postMessage API or callback.

  Consequences worth knowing when reading the numbers:
    - Someone who navigates here directly, or shares/bookmarks the URL, counts.
    - Someone who books but never lands on the redirect does NOT count.
  Treat this as a close proxy, not an authoritative booking count. Spectora
  remains the system of record.

  Do NOT fire booking_complete from a CTA click, from /booknow, or from the
  iframe's onLoad — none of those represent a completed booking.

  Repeated refreshes do not double-count: lib/tracking.ts records this event in
  sessionStorage, so it fires at most once per browsing session even though a
  full reload resets module state.

  MANUAL CONFIGURATION REQUIRED: in Spectora, set the post-booking redirect to
  https://www.weareprospec.com/booking-confirmed. Until that is configured and
  verified end to end, this event legitimately never fires — that means
  "pending", not "zero bookings".

  Intentionally noindex, follow (server/routeMeta.ts), excluded from
  sitemap.xml, and absent from all navigation — but still crawlable in
  robots.txt so the noindex directive can actually be seen.
*/

export default function BookingConfirmed() {
  useEffect(() => {
    trackEvent({ event: "booking_complete" });
  }, []);

  return (
    <Layout>
      <SEO
        title="Inspection Request Confirmed | ProSpec Home Inspections"
        description="Your ProSpec inspection request is confirmed. Here is what happens next, and how to reach Patrick Murphy if you need to change anything."
        canonicalUrl="https://www.weareprospec.com/booking-confirmed"
        robots="noindex, follow"
      />

      <section className="border-b border-border bg-card/10 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 self-start font-mono text-[10px] tracking-widest uppercase text-primary">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Confirmed
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wider uppercase leading-[1.15]">
              Your Inspection Request Is Confirmed
            </h1>
            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
              Thank you for scheduling with ProSpec. You will receive a
              confirmation email with your inspection details, followed by your
              digital inspection agreement and invoice before the inspection
              date.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <span className="font-mono text-[9px] tracking-widest uppercase text-primary font-bold">
                The Process
              </span>
              <h2 className="font-serif text-lg text-white tracking-wide uppercase">
                What Happens Next
              </h2>
              <ul className="flex flex-col gap-3 font-sans text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong>1. Confirmation email:</strong> your appointment
                    details arrive by email shortly.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong>2. Agreement &amp; invoice:</strong> before the
                    inspection, ProSpec emails your digital inspection agreement
                    and invoice.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong>3. The inspection:</strong> Patrick Murphy inspects
                    the property and documents the findings. You are welcome to
                    attend.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong>4. Your report:</strong> the photo-rich digital
                    report is typically delivered the same day when site
                    conditions allow.
                  </span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="border border-border/80 bg-card/20 p-6 md:p-8 flex flex-col gap-4">
                <span className="font-mono text-[9px] tracking-widest uppercase text-primary font-bold">
                  Need To Change Something?
                </span>
                <h2 className="font-serif text-base text-white tracking-wide uppercase">
                  Reach Patrick Directly
                </h2>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                  To reschedule, adjust the scope, or ask about access to the
                  property, contact ProSpec directly.
                </p>
                <a
                  href={PHONE_TEL_HREF}
                  className="border border-primary/40 hover:border-primary text-white font-mono text-xs tracking-widest uppercase py-3 text-center transition-colors flex items-center justify-center gap-2 bg-primary/5"
                  data-track-event="phone_click"
                  data-track-location="booking-confirmed"
                >
                  <Phone className="h-3.5 w-3.5 text-primary" />
                  Call {PHONE_DISPLAY}
                </a>
                <a
                  href={PHONE_SMS_HREF}
                  className="border border-border/60 hover:border-white text-white font-mono text-xs tracking-widest uppercase py-3 text-center transition-colors flex items-center justify-center gap-2"
                  data-track-event="text_click"
                  data-track-location="booking-confirmed"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-primary" />
                  Text {PHONE_DISPLAY}
                </a>
              </div>

              <div className="border border-border/60 bg-card/10 p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-mono text-[9px] tracking-widest uppercase text-primary font-bold">
                    While You Wait
                  </span>
                </div>
                <Link
                  href="/services"
                  className="font-sans text-xs text-muted-foreground hover:text-white transition-colors"
                >
                  Review what a ProSpec inspection covers →
                </Link>
                <Link
                  href="/inspector"
                  className="font-sans text-xs text-muted-foreground hover:text-white transition-colors"
                >
                  Meet Patrick Murphy, Certified Master Inspector →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
