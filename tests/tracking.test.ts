/**
 * Guards the properties that make the booking funnel trustworthy:
 *   1. Event names describe what actually happened.
 *   2. Funnel steps and conversions are never double-counted.
 *   3. booking_complete survives a page refresh without duplicating.
 *   4. No PII ever reaches the dataLayer.
 *   5. A conversion is never fired by a click or by visiting the booking page.
 *   6. Dedupe keys are route-scoped, so different routes report independently.
 *
 * Run: npx tsx --test tests/tracking.test.ts
 *
 * Uses node:test to match server/commercialQuote.test.ts, with a minimal DOM
 * stub instead of jsdom so the suite needs no extra dependency.
 */

import assert from "node:assert/strict";
import test, { beforeEach, describe } from "node:test";

// ─── Minimal DOM stub ────────────────────────────────────────────────────────

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
      const attr = selector.replace(/^\[|\]$/g, "");
      return attr in attributes ? this : null;
    },
  };
}

type ClickHandler = (event: { target: StubElement }) => void;
let clickHandlers: ClickHandler[] = [];

/** Minimal sessionStorage that can persist across simulated page reloads. */
function makeSessionStorage(seed: Map<string, string>) {
  return {
    getItem: (k: string) => (seed.has(k) ? seed.get(k)! : null),
    setItem: (k: string, v: string) => void seed.set(k, v),
    removeItem: (k: string) => void seed.delete(k),
    key: (i: number) => [...seed.keys()][i] ?? null,
    get length() {
      return seed.size;
    },
  };
}

let sessionSeed = new Map<string, string>();

/** Simulates a fresh document. Pass keepSession to model a reload. */
function installDom(pathname = "/", keepSession = false) {
  clickHandlers = [];
  if (!keepSession) sessionSeed = new Map();
  (globalThis as Record<string, unknown>).window = {
    dataLayer: [] as Array<Record<string, unknown>>,
    location: { pathname },
    sessionStorage: makeSessionStorage(sessionSeed),
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

installDom();
const { trackEvent, initClickTracking, __resetTrackingForTests } = await import(
  "../client/src/lib/tracking"
);

beforeEach(() => {
  installDom();
  __resetTrackingForTests();
});

// ─── 1. Event vocabulary ─────────────────────────────────────────────────────

describe("event names describe what actually happened", () => {
  test("scheduler_view fires for the booking page load", () => {
    setPath("/booknow");
    assert.equal(trackEvent({ event: "scheduler_view" }), true);
    assert.deepEqual(eventNames(), ["scheduler_view"]);
  });

  test("scheduler_loaded is the iframe load, never an availability check", () => {
    setPath("/booknow");
    trackEvent({ event: "scheduler_loaded" });

    const names = eventNames();
    assert.deepEqual(names, ["scheduler_loaded"]);
    assert.ok(!names.includes("check_availability"));
    assert.ok(!names.includes("booking_complete"));
  });

  test("booking_cta_click is a click, distinct from scheduler_view", () => {
    trackEvent({ event: "booking_cta_click", element_location: "hero" });

    assert.deepEqual(eventNames(), ["booking_cta_click"]);
    assert.ok(!eventNames().includes("scheduler_view"));
  });
});

// ─── 2. Duplicate suppression ────────────────────────────────────────────────

describe("duplicate suppression", () => {
  test("a funnel step fires only once for the same route and params", () => {
    setPath("/services");
    assert.equal(
      trackEvent({ event: "view_service", service_type: "pool" }),
      true
    );
    assert.equal(
      trackEvent({ event: "view_service", service_type: "pool" }),
      false
    );
    assert.equal(eventNames().filter(n => n === "view_service").length, 1);
  });

  test("scheduler_view and scheduler_loaded each fire once", () => {
    setPath("/booknow");
    trackEvent({ event: "scheduler_view" });
    trackEvent({ event: "scheduler_view" });
    trackEvent({ event: "scheduler_loaded" });
    trackEvent({ event: "scheduler_loaded" });

    assert.equal(eventNames().filter(n => n === "scheduler_view").length, 1);
    assert.equal(eventNames().filter(n => n === "scheduler_loaded").length, 1);
  });

  test("generate_lead fires once even on a double submit", () => {
    trackEvent({ event: "generate_lead" });
    trackEvent({ event: "generate_lead" });

    assert.equal(eventNames().filter(n => n === "generate_lead").length, 1);
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

// ─── 3. Route-scoped keys ────────────────────────────────────────────────────

describe("dedupe keys are route-scoped", () => {
  test("the same event reports independently on a different route", () => {
    setPath("/services");
    trackEvent({ event: "view_service", service_type: "all_services" });
    trackEvent({ event: "view_service", service_type: "all_services" });

    setPath("/home-inspection-folsom");
    trackEvent({
      event: "view_service",
      service_type: "residential_home_inspection",
      city_page: "home-inspection-folsom",
    });

    const fired = pushes().filter(p => p.event === "view_service");
    assert.equal(fired.length, 2);
    assert.equal(fired[0].page_path, "/services");
    assert.equal(fired[1].page_path, "/home-inspection-folsom");
    assert.equal(fired[1].city_page, "home-inspection-folsom");
  });

  test("different parameters on the same route are different keys", () => {
    setPath("/services");
    trackEvent({ event: "quote_view", service_type: "commercial_quote" });
    trackEvent({ event: "quote_view", service_type: "apartment_quote" });

    assert.equal(eventNames().filter(n => n === "quote_view").length, 2);
  });

  test("no route-change reset hook is required for correct counting", () => {
    // Regression guard: dedupe must not depend on an external reset, because
    // the previous implementation mutated global state during React render.
    setPath("/a");
    trackEvent({ event: "view_service" });
    setPath("/b");
    trackEvent({ event: "view_service" });
    setPath("/a");
    trackEvent({ event: "view_service" }); // already counted for /a

    assert.equal(eventNames().filter(n => n === "view_service").length, 2);
  });
});

// ─── 4. booking_complete survives refresh without duplicating ────────────────

describe("booking_complete is refresh-safe", () => {
  test("a page refresh does not produce a second completion", () => {
    setPath("/booking-confirmed");
    assert.equal(trackEvent({ event: "booking_complete" }), true);
    assert.equal(
      pushes().filter(p => p.event === "booking_complete").length,
      1
    );

    // Simulate F5: new document and fresh module state, same session.
    installDom("/booking-confirmed", true);
    assert.equal(trackEvent({ event: "booking_complete" }), false);
    assert.equal(
      pushes().filter(p => p.event === "booking_complete").length,
      0
    );

    // A third load, still the same session.
    installDom("/booking-confirmed", true);
    assert.equal(trackEvent({ event: "booking_complete" }), false);
  });

  test("a new session may report a genuinely new booking", () => {
    setPath("/booking-confirmed");
    trackEvent({ event: "booking_complete" });

    // A new browsing session means both fresh sessionStorage AND a freshly
    // loaded module, unlike the refresh case above where only module state
    // resets. A second, genuine booking must still be counted.
    installDom("/booking-confirmed", false);
    __resetTrackingForTests();

    assert.equal(trackEvent({ event: "booking_complete" }), true);
    assert.equal(
      pushes().filter(p => p.event === "booking_complete").length,
      1
    );
  });

  test("storage being unavailable never blocks the event", () => {
    setPath("/booking-confirmed");
    const w = (globalThis as unknown as { window: Record<string, unknown> })
      .window;
    Object.defineProperty(w, "sessionStorage", {
      get() {
        throw new Error("storage disabled");
      },
      configurable: true,
    });

    assert.equal(trackEvent({ event: "booking_complete" }), true);
  });
});

// ─── 5. No PII ───────────────────────────────────────────────────────────────

describe("no PII reaches the dataLayer", () => {
  const ALLOWED = new Set([
    "event",
    "page_path",
    "landing_path",
    "city_page",
    "service_type",
    "element_location",
  ]);

  test("parameters outside the allowlist are stripped", () => {
    trackEvent({
      event: "generate_lead",
      service_type: "commercial_quote",
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
    trackEvent({ event: "phone_click", element_location: "" });

    assert.ok(!("element_location" in pushes()[0]));
  });

  test("click tracking forwards only non-PII attributes", () => {
    initClickTracking();
    click(
      makeElement({
        "data-track-event": "phone_click",
        "data-track-location": "header",
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
    assert.equal(payload.element_location, "header");
  });

  test("element_location is the key the published GA4 tag reads", () => {
    // The live GA4 Event tag maps its parameter from a Data Layer Variable
    // named element_location. Renaming this key silently empties that
    // parameter in GA4, so it is pinned here.
    trackEvent({ event: "phone_click", element_location: "footer" });

    assert.equal(pushes()[0].element_location, "footer");
    assert.ok(!("cta_location" in pushes()[0]));
  });
});

// ─── 6. No false conversions ─────────────────────────────────────────────────

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
    assert.ok(!names.includes("generate_lead"), "a click must never be a lead");
  });

  test("clicks on untracked elements are ignored", () => {
    initClickTracking();
    click(makeElement({ href: "/services" }));

    assert.equal(pushes().length, 0);
  });

  test("visiting the scheduler is not a completed booking", () => {
    setPath("/booknow");
    trackEvent({ event: "scheduler_view" });
    trackEvent({ event: "scheduler_loaded" });

    assert.ok(!eventNames().includes("booking_complete"));
  });
});

// ─── 7. Payload shape ────────────────────────────────────────────────────────

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
