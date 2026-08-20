import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

/**
 * Fires a single `view_service` funnel event when a service or city landing
 * page mounts.
 *
 * Deduped by lib/tracking.ts (`ONCE_PER_VIEW`), so a re-render, a StrictMode
 * double-invoked effect, or a repeated mount at the same path will not produce
 * a second event. The dedupe state is cleared on route change in App.tsx.
 *
 * Only non-PII context is passed through.
 */
export function useViewService(serviceType: string, cityPage?: string): void {
  useEffect(() => {
    trackEvent({
      event: "view_service",
      service_type: serviceType,
      city_page: cityPage,
    });
  }, [serviceType, cityPage]);
}
