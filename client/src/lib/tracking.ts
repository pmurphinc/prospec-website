/**
 * GTM DataLayer Tracking Utility
 *
 * Pushes structured events to window.dataLayer for Google Tag Manager.
 * GTM handles forwarding events to GA4, Meta Pixel, or other destinations.
 *
 * IMPORTANT: No PII (names, emails, phone numbers, addresses) is ever sent.
 * Only event names and non-identifying context (page path, element type) are tracked.
 */

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

type TrackingEvent =
  | "phone_click"
  | "email_click"
  | "booking_cta_click"
  | "commercial_quote_cta_click"
  | "commercial_quote_submit"
  | "commercial_quote_error"
  | "scheduler_page_view";

interface EventParams {
  event: TrackingEvent;
  page_path?: string;
  element_location?: string;
}

/**
 * Push a custom event to the GTM dataLayer.
 * Does NOT include any PII — only event name and page context.
 */
export function trackEvent(params: EventParams): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: params.event,
    page_path: params.page_path || window.location.pathname,
    element_location: params.element_location || undefined,
  });
}

/**
 * Attaches click listeners to elements with data-track-* attributes.
 * Call once on app mount. Uses event delegation on document.body.
 *
 * Supported data attributes:
 *   data-track-event="phone_click"
 *   data-track-event="email_click"
 *   data-track-event="booking_cta_click"
 *   data-track-event="commercial_quote_cta_click"
 *   data-track-location="header" (optional context)
 */
export function initClickTracking(): void {
  if (typeof document === "undefined") return;

  document.body.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement).closest("[data-track-event]");
    if (!target) return;

    const eventName = target.getAttribute("data-track-event") as TrackingEvent;
    const location = target.getAttribute("data-track-location") || undefined;

    if (eventName) {
      trackEvent({
        event: eventName,
        element_location: location,
      });
    }
  });
}
