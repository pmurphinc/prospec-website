/**
 * GTM DataLayer Tracking Utility
 *
 * Pushes structured events to window.dataLayer for Google Tag Manager
 * (container GTM-PSZRF8VS, injected server-side in server/index.ts).
 * GTM forwards events to GA4 (G-GDY5DXZ6Z7). This is the ONLY analytics path
 * in the app — do not add a gtag.js snippet or a second analytics product.
 *
 * ── A dataLayer.push IS NOT COLLECTION ─────────────────────────────────────
 * Pushing an event here only makes it available to GTM. It reaches GA4 only if
 * the published container has a Custom Event trigger matching the event name
 * and a GA4 Event tag wired to it. As inspected on the live container, the
 * trigger regex covers only:
 *   phone_click, email_click, booking_cta_click, commercial_quote_cta_click,
 *   commercial_quote_submit, commercial_quote_error, scheduler_page_view
 * Every other event below is pushed but NOT yet forwarded. Funnel reporting is
 * PENDING until the container is updated and verified in GA4 DebugView.
 * See docs/GTM_CONFIGURATION.md for the exact triggers, tags, and variables.
 *
 * ── PARAMETER NAMING ───────────────────────────────────────────────────────
 * `element_location` is named to match the Data Layer Variable the published
 * GA4 Event tag already reads. Do not rename it without republishing GTM — the
 * tag would silently start sending an empty value.
 *
 * ── PRIVACY ────────────────────────────────────────────────────────────────
 * No PII is ever sent. `trackEvent` copies only the keys in ALLOWED_PARAMS
 * onto the payload; anything else a caller passes is dropped. Names, email
 * addresses, phone numbers, and inspection addresses must never reach GA4.
 * Device category is supplied automatically by GA4 and is never collected here.
 *
 * ── EVENT NAMES DESCRIBE WHAT ACTUALLY HAPPENED ────────────────────────────
 *   booking_cta_click — a visitor clicked a Book Now / scheduling CTA
 *   scheduler_view    — /booknow loaded
 *   scheduler_loaded  — the Spectora iframe finished loading
 *   booking_complete  — /booking-confirmed loaded via the configured redirect
 *
 * `scheduler_loaded` is NOT an availability check. The Spectora scheduler is a
 * cross-origin iframe (app.spectora.com) with no documented postMessage API:
 * date selection, add-on selection, the price shown inside the scheduler, and
 * the submission itself CANNOT be observed from this page.
 *
 * `booking_complete` is a REDIRECT-BASED PROXY for completion, not a
 * confirmation from Spectora. It means "a visitor landed on our confirmation
 * URL", which Spectora sends them to after booking. It is never fired from a
 * click, and it stays inactive until that redirect is configured and tested.
 */

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

export type TrackingEvent =
  // ── Booking funnel ────────────────────────────────────────────────────────
  | "view_service"
  | "booking_cta_click"
  | "scheduler_view"
  | "scheduler_loaded"
  | "quote_view"
  | "phone_click"
  | "text_click"
  | "generate_lead"
  | "booking_complete"
  // ── Retained ──────────────────────────────────────────────────────────────
  | "email_click"
  | "commercial_quote_cta_click"
  | "commercial_quote_error";

/**
 * The complete set of parameter keys permitted on a payload. Anything not
 * listed here is stripped before the push. All values are non-identifying
 * page/UI context.
 */
const ALLOWED_PARAMS = [
  "page_path",
  "landing_path",
  "city_page",
  "service_type",
  "element_location",
] as const;

type AllowedParam = (typeof ALLOWED_PARAMS)[number];

export type EventParams = {
  event: TrackingEvent;
} & Partial<Record<AllowedParam, string>>;

/**
 * Funnel steps and conversions, which must not be double-counted. Click events
 * are excluded — a visitor may legitimately click "call" twice.
 */
const DEDUPED_EVENTS: ReadonlySet<TrackingEvent> = new Set<TrackingEvent>([
  "view_service",
  "scheduler_view",
  "scheduler_loaded",
  "quote_view",
  "generate_lead",
  "booking_complete",
]);

/**
 * Conversions that must survive a full page reload. Module state resets on
 * refresh, so these are additionally recorded in sessionStorage — otherwise
 * re-loading /booking-confirmed would report a second booking.
 */
const SESSION_SCOPED_EVENTS: ReadonlySet<TrackingEvent> =
  new Set<TrackingEvent>(["booking_complete"]);

const SESSION_KEY_PREFIX = "prospec_tracked:";

/**
 * Dedupe keys already seen in this document. Keys are route-scoped — they
 * include the event name, the pathname, and the normalized parameters — so a
 * different route (or different service/city context) is a different key and
 * reports independently.
 *
 * NOTE: this is only ever written from `trackEvent`, which is called from
 * effects and DOM event handlers. Nothing here is mutated during React render.
 */
const seenKeys = new Set<string>();

/** Builds a route-scoped, parameter-aware dedupe key. */
function dedupeKey(event: TrackingEvent, payload: Record<string, unknown>) {
  const normalized = ALLOWED_PARAMS.map(p => `${p}=${payload[p] ?? ""}`).join(
    "|"
  );
  return `${event}|${normalized}`;
}

function sessionAlreadyFired(key: string): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY_PREFIX + key) !== null;
  } catch {
    // Private mode / storage disabled — fall back to in-document dedupe only.
    return false;
  }
}

function markSessionFired(key: string): void {
  try {
    window.sessionStorage.setItem(SESSION_KEY_PREFIX + key, "1");
  } catch {
    /* storage unavailable; in-document dedupe still applies */
  }
}

/** Test-only: clears dedupe state. Never called from application code. */
export function __resetTrackingForTests(): void {
  seenKeys.clear();
  try {
    const store = window.sessionStorage;
    for (let i = store.length - 1; i >= 0; i--) {
      const k = store.key(i);
      if (k?.startsWith(SESSION_KEY_PREFIX)) store.removeItem(k);
    }
  } catch {
    /* no storage in this environment */
  }
}

/**
 * Push a custom event to the GTM dataLayer.
 * Returns true if it was pushed, false if suppressed as a duplicate.
 */
export function trackEvent(params: EventParams): boolean {
  if (typeof window === "undefined") return false;

  const pagePath =
    params.page_path ||
    (typeof window.location !== "undefined" ? window.location.pathname : "");

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

  if (DEDUPED_EVENTS.has(params.event)) {
    const key = dedupeKey(params.event, payload);
    if (seenKeys.has(key)) return false;
    if (SESSION_SCOPED_EVENTS.has(params.event)) {
      if (sessionAlreadyFired(key)) return false;
      markSessionFired(key);
    }
    seenKeys.add(key);
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
 *   data-track-location="header"   (optional; becomes element_location)
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
      element_location: target.getAttribute("data-track-location") || undefined,
      service_type: target.getAttribute("data-track-service") || undefined,
    });
  });
}
