/**
 * Guards the three properties that make the booking funnel trustworthy:
 *   1. Funnel steps and conversions never fire twice for one page view.
 *   2. No PII ever reaches the dataLayer.
 *   3. A conversion is never fired by a click or by visiting the booking page.
 *
 * Run: npx tsx --test tests/tracking.test.ts
 *
 * Uses node:test to match server/commercialQuote.test.ts, with a minimal DOM
 * stub instead of jsdom so the suite needs no extra dependency.
 */

import assert from "node:assert/strict";
import test, { beforeEach, describe } from "node:test";

// ─── Minimal DOM stub ────────────────────────────────────────────────────────
// Only the surface lib/tracking.ts actually touches.

interface StubElement {
  attributes: Record<string, string>;
  getAttribute(name: string): string | null;
  closest(selector: string): StubElement | null;
}

function makeElement(attributes: Record<string, string>): StubElement {
  return {
    attributes,
    getAttribute(name) {
      return name in attributes ? attributes[name] : null;
    },
    closest(selector) {
      // lib/tracking.ts only ever queries "[data-track-event]".
      const attr = selector.replace(/^\[|\]$/g, "");
      return attr in attributes ? this : null;
    },
  };
}

type ClickHandler = (event: { target: StubElement }) => void;
let clickHandlers: ClickHandler[] = [];

function installDom(pathname = "/") {
  clickHandlers = [];
  (globalThis as Record<string, unknown>).window = {
    dataLayer: [] as Array<Record<string, unknown>>,
    location: { pathname },
  };
  (globalThis as Record<string, unknown>).document = {
    body: {
      addEventListener(type: string, handler: ClickHandler) {
        if (type === "click") clickHandlers.push(handler);
      },
    },
  };
}

function click(element: StubElement) {
  for (const handler of clickHandlers) handler({ target: element });
}

function pushes(): Array<Record<string, unknown>> {
  return (
    globalThis as unknown as {
      window: { dataLayer: Array<Record<string, unknown>> };
    }
  ).window.dataLayer;
}

function eventNames(): unknown[] {
  return pushes().map(p => p.event);
}

function setPath(pathname: string) {
  (
    globalThis as unknown as { window: { location: { pathname: string } } }
  ).window.location.pathname = pathname;
}

// The module reads `window` at call time, so the stub must exist before import.
installDom();
const { trackEvent, resetViewTracking, initClickTracking } = await import(
  "../client/src/lib/tracking"
);

beforeEach(() => {
  installDom();
  resetViewTracking();
});

// ─── 1. Duplicate suppression ────────────────────────────────────────────────

describe("duplicate suppression", () => {
  test("a funnel step fires only once per page view", () => {
    assert.equal(
      trackEvent({ event: "view_service", service_type: "pool" }),
      true
    );
    assert.equal(
      trackEvent({ event: "view_service", service_type: "pool" }),
      false
    );
    assert.equal(
      trackEvent({ event: "view_service", service_type: "pool" }),
      false
    );

    assert.equal(eventNames().filter(n => n === "view_service").length, 1);
  });

  test("booking_complete fires once even if the effect re-runs", () => {
    trackEvent({ event: "booking_complete" });
    trackEvent({ event: "booking_complete" });

    assert.equal(eventNames().filter(n => n === "booking_complete").length, 1);
  });

  test("generate_lead fires once even on a double submit", () => {
    trackEvent({ event: "generate_lead" });
    trackEvent({ event: "generate_lead" });

    assert.equal(eventNames().filter(n => n === "generate_lead").length, 1);
  });

  test("scheduler_start and check_availability each fire once", () => {
    trackEvent({ event: "scheduler_start" });
    trackEvent({ event: "scheduler_start" });
    trackEvent({ event: "check_availability" });
    trackEvent({ event: "check_availability" });

    assert.equal(eventNames().filter(n => n === "scheduler_start").length, 1);
    assert.equal(
      eventNames().filter(n => n === "check_availability").length,
      1
    );
  });

  test("the same step may fire again after a route change", () => {
    trackEvent({ event: "view_service" });
    resetViewTracking();
    trackEvent({ event: "view_service" });

    assert.equal(eventNames().filter(n => n === "view_service").length, 2);
  });

  test("dedupe is keyed by path, so a different page still reports", () => {
    trackEvent({ event: "view_service", page_path: "/services" });
    trackEvent({ event: "view_service", page_path: "/services" });
    trackEvent({
      event: "view_service",
      page_path: "/manufactured-home-inspection",
    });

    assert.equal(eventNames().filter(n => n === "view_service").length, 2);
  });

  test("repeat contact clicks are NOT suppressed", () => {
    trackEvent({ event: "phone_click" });
    trackEvent({ event: "phone_click" });
    trackEvent({ event: "text_click" });
    trackEvent({ event: "text_click" });

    assert.equal(eventNames().filter(n => n === "phone_click").length, 2);
    assert.equal(eventNames().filter(n => n === "text_click").length, 2);
  });
});

// ─── 2. No PII ───────────────────────────────────────────────────────────────

describe("no PII reaches the dataLayer", () => {
  const ALLOWED = new Set([
    "event",
    "page_path",
    "landing_path",
    "city_page",
    "service_type",
    "cta_location",
  ]);

  test("parameters outside the allowlist are stripped", () => {
    trackEvent({
      event: "generate_lead",
      service_type: "commercial_quote",
      // Deliberately smuggled in — every one of these must be dropped.
      name: "Jane Buyer",
      email: "jane@example.com",
      phone: "916-555-0199",
      address: "123 Real Street, Sacramento CA",
    } as never);

    const payload = pushes()[0];
    for (const key of Object.keys(payload)) {
      assert.ok(
        ALLOWED.has(key),
        `unexpected key "${key}" reached the dataLayer`
      );
    }

    const serialized = JSON.stringify(payload);
    for (const secret of ["Jane", "example.com", "555-0199", "Real Street"]) {
      assert.ok(!serialized.includes(secret), `PII "${secret}" leaked`);
    }
  });

  test("empty optional params are omitted rather than sent blank", () => {
    trackEvent({ event: "phone_click", cta_location: "" });

    assert.ok(!("cta_location" in pushes()[0]));
  });

  test("click tracking forwards only non-PII attributes", () => {
    initClickTracking();
    click(
      makeElement({
        "data-track-event": "phone_click",
        "data-track-location": "header",
        // An attribute holding PII must never be read or forwarded.
        "data-customer-email": "jane@example.com",
        href: "tel:+19164320332",
      })
    );

    const payload = pushes()[0];
    for (const key of Object.keys(payload)) {
      assert.ok(
        ALLOWED.has(key),
        `unexpected key "${key}" reached the dataLayer`
      );
    }
    assert.ok(!JSON.stringify(payload).includes("example.com"));
    assert.equal(payload.cta_location, "header");
  });
});

// ─── 3. No false conversions ─────────────────────────────────────────────────

describe("no false conversions", () => {
  test("a CTA click never emits booking_complete or generate_lead", () => {
    initClickTracking();

    click(
      makeElement({
        "data-track-event": "booking_cta_click",
        "data-track-location": "hero",
      })
    );
    click(makeElement({ "data-track-event": "phone_click" }));
    click(makeElement({ "data-track-event": "text_click" }));

    const names = eventNames();
    assert.ok(names.includes("booking_cta_click"));
    assert.ok(names.includes("phone_click"));
    assert.ok(names.includes("text_click"));
    assert.ok(
      !names.includes("booking_complete"),
      "a click must never count as a completed booking"
    );
    assert.ok(
      !names.includes("generate_lead"),
      "a click must never count as a lead"
    );
  });

  test("clicks on untracked elements are ignored", () => {
    initClickTracking();
    click(makeElement({ href: "/services" }));

    assert.equal(pushes().length, 0);
  });

  test("check_availability is not a conversion", () => {
    // The Spectora iframe finishing its load tells us nothing about whether a
    // booking happened — it must never stand in for booking_complete.
    trackEvent({ event: "check_availability" });

    assert.deepEqual(eventNames(), ["check_availability"]);
  });

  test("visiting the scheduler is not a completed booking", () => {
    setPath("/booknow");
    trackEvent({ event: "scheduler_start" });

    assert.ok(!eventNames().includes("booking_complete"));
  });
});

// ─── Payload shape ───────────────────────────────────────────────────────────

describe("event payload shape", () => {
  test("page path is always included", () => {
    setPath("/home-inspection-folsom");
    trackEvent({ event: "view_service", service_type: "residential" });

    assert.deepEqual(pushes()[0], {
      event: "view_service",
      page_path: "/home-inspection-folsom",
      service_type: "residential",
    });
  });

  test("dataLayer is created if the GTM snippet has not run yet", () => {
    delete (globalThis as unknown as { window: { dataLayer?: unknown } }).window
      .dataLayer;
    trackEvent({ event: "phone_click" });

    assert.ok(Array.isArray(pushes()));
    assert.equal(pushes().length, 1);
  });
});
