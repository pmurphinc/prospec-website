/**
 * GTM DataLayer Tracking Utility
 *
 * Pushes structured events to window.dataLayer for Google Tag Manager
 * (container GTM-PSZRF8VS, injected server-side in server/index.ts).
 * GTM forwards events to GA4. This is the ONLY analytics path in the app —
 * do not add a gtag.js snippet or a second analytics product.
 *
 * ── PRIVACY ────────────────────────────────────────────────────────────────
 * No PII is ever sent. `trackEvent` copies only the keys in ALLOWED_PARAMS
 * onto the dataLayer payload; anything else a caller passes is dropped.
 * Names, email addresses, phone numbers, and inspection addresses must never
 * reach GA4. Device category is supplied automatically by GA4 and is never
 * collected here.
 *
 * ── CONVERSION HONESTY ─────────────────────────────────────────────────────
 * `booking_complete` fires ONLY on a real load of /booking-confirmed, which is
 * reachable only via Spectora's post-booking redirect. It is never fired from a
 * button click or from an ordinary /booknow visit. `generate_lead` fires only
 * after the commercial quote API returns success.
 *
 * ── WHAT CANNOT BE MEASURED ────────────────────────────────────────────────
 * The Spectora scheduler is a cross-origin iframe (app.spectora.com) with no
 * documented postMessage API. Date selection, add-on selection, the price shown
 * inside the scheduler, and the submission itself CANNOT be observed from this
 * page. `check_availability` therefore means "the scheduler iframe finished
 * loading on our side" — not "the user viewed availability". Completed-booking
 * tracking stays pending until the Spectora redirect to /booking-confirmed is
 * configured and tested.
 */

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

export type TrackingEvent =
  // ── Booking funnel ────────────────────────────────────────────────────────
  | "view_service"
  | "scheduler_start"
  | "check_availability"
  | "quote_view"
  | "phone_click"
  | "text_click"
  | "generate_lead"
  | "booking_complete"
  // ── Retained (no requested equivalent) ────────────────────────────────────
  | "email_click"
  | "booking_cta_click"
  | "commercial_quote_cta_click"
  | "commercial_quote_error";

/**
 * The complete set of parameter keys permitted on a dataLayer payload.
 * Anything not listed here is stripped before the push. All values are
 * non-identifying page/UI context.
 */
const ALLOWED_PARAMS = [
  "page_path",
  "landing_path",
  "city_page",
  "service_type",
  "cta_location",
] as const;

type AllowedParam = (typeof ALLOWED_PARAMS)[number];

export type EventParams = {
  event: TrackingEvent;
} & Partial<Record<AllowedParam, string>>;

/**
 * Events that represent a funnel step or a conversion and must fire at most
 * once per page view. Click events are intentionally excluded — a user may
 * legitimately click "call" twice.
 */
const ONCE_PER_VIEW: ReadonlySet<TrackingEvent> = new Set<TrackingEvent>([
  "view_service",
  "scheduler_start",
  "check_availability",
  "quote_view",
  "generate_lead",
  "booking_complete",
]);

/** Keys already fired for the current page view. Cleared on route change. */
let firedThisView = new Set<string>();

/**
 * Clears the per-view dedupe state. Call on client-side route change so the
 * same funnel step can be measured again on the next page.
 */
export function resetViewTracking(): void {
  firedThisView = new Set<string>();
}

/** Test-only accessor for the dedupe state. */
export function __getFiredThisView(): ReadonlySet<string> {
  return firedThisView;
}

/**
 * Push a custom event to the GTM dataLayer.
 * Returns true if the event was pushed, false if it was suppressed as a
 * duplicate funnel step.
 */
export function trackEvent(params: EventParams): boolean {
  if (typeof window === "undefined") return false;

  const pagePath =
    params.page_path ||
    (typeof window.location !== "undefined" ? window.location.pathname : "");

  if (ONCE_PER_VIEW.has(params.event)) {
    const key = `${params.event}::${pagePath}`;
    if (firedThisView.has(key)) return false;
    firedThisView.add(key);
  }

  const payload: Record<string, unknown> = {
    event: params.event,
    page_path: pagePath,
  };

  for (const key of ALLOWED_PARAMS) {
    if (key === "page_path") continue;
    const value = params[key];
    if (typeof value === "string" && value.length > 0) {
      payload[key] = value;
    }
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  return true;
}

/**
 * Attaches click listeners to elements with data-track-* attributes.
 * Call once on app mount. Uses event delegation on document.body.
 *
 * Supported attributes:
 *   data-track-event="phone_click" | "text_click" | "email_click"
 *                    | "booking_cta_click" | "commercial_quote_cta_click"
 *   data-track-location="header"   (optional; becomes cta_location)
 *   data-track-service="..."       (optional; becomes service_type)
 */
export function initClickTracking(): void {
  if (typeof document === "undefined") return;

  document.body.addEventListener("click", e => {
    const target = (e.target as HTMLElement).closest("[data-track-event]");
    if (!target) return;

    const eventName = target.getAttribute("data-track-event") as TrackingEvent;
    if (!eventName) return;

    trackEvent({
      event: eventName,
      cta_location: target.getAttribute("data-track-location") || undefined,
      service_type: target.getAttribute("data-track-service") || undefined,
    });
  });
}
