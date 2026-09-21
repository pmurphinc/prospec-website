# SEO / Conversion Status and Next Steps

Last updated: 2026-09-21

## Correcting the record: there is no unmerged SEO PR

An external SEO review dated 2026-09-20 concluded that approved SEO/tracking
work was "not live" because the site was "still serving the older August
build," and made "merge and deploy the existing SEO/tracking PR" its top
recommendation.

That is wrong, and acting on it would have produced nothing. Verified against
this repository:

- **All pull requests are closed and merged.** PRs #1–#8. None open.
- **`main` HEAD is `73d30e9`, dated 2026-08-12.** The deployed bundle was also
  dated August 12. The deployment was *current*, not stale.
- **The features described as "approved but not deployed" did not exist in the
  codebase at all.** A search for `booking-confirmed`, `booking_complete`,
  `generate_lead`, `sameAs` and `sms:` returned zero hits across the repo.

The work had never been written. This matters for planning: it was a build
task, not a deploy task.

**If a future review makes this claim again, check `git log` and the open-PR
list before scheduling a "merge" that has nothing behind it.**

## The empty `<div id="root">` is architecture, not a failed deploy

The same review flagged that raw HTML contains no `<h1>` or page copy, and
filed it under work that should already have shipped.

This is the expected behavior of this application. It is a Vite SPA.
`server/index.ts` injects `<title>`, meta description, canonical, Open Graph,
Twitter Card and JSON-LD into the HTML template — but never renders body
content. No merge changes that. It requires prerendering or SSR (scoped
below).

It is also the correct explanation for search snippets pulling footer
boilerplate instead of page copy.

Worth keeping in proportion: Google renders JavaScript, so indexing still
works, as that review itself observed — all five city pages are discoverable.
The cost falls hardest on crawlers that do not execute JS, which increasingly
includes LLM and AI-answer crawlers.

## Fixed in this branch (commit `06170e6`)

| Issue | File | Change |
|---|---|---|
| `/services` advertised "$350" while listing $385 services | `server/routeMeta.ts` | Quotes the $385 residential starting price |
| "Perfect Star Rating" — unattributed, undated, permanent claim | `client/src/pages/Reviews.tsx` | Attributed to Google, dated, figure in a named constant |
| `/booking-confirmed` returned 404 | `client/src/pages/BookingConfirmed.tsx` | Page added, `booking_complete` event, noindex, 200 |
| No entity connections in schema | `server/structuredData.ts` | `sameAs` with the Spectora profile |

### A note on the pricing fix

$350 was **not** a false price. It is the real starting price for manufactured
home and 11-month warranty inspections. $385 is residential. The description
was misleading rather than false: it named buyer's, pre-listing and new
construction inspections (all $385) and then quoted $350. The fix was a
rewrite, not a find-and-replace.

### A note on the review-rating fix

`server/structuredData.ts` already documents a deliberate policy of excluding
`aggregateRating` from JSON-LD as not independently verifiable. The visible
copy was not holding to that same standard. The rating is now attributed and
dated; the schema exclusion stays in place. Do not add `aggregateRating` to
the JSON-LD to "match" the visible figure.

## Blocked on account access — these cannot be done from the repo

### 1. Google Business Profile address (most urgent)

Google Maps still displays `5836 Fallen Oak Dr STE. C, Pollock Pines, CA
95726`. ProSpec operates as a service-area business.

- Hide or correct the address on the **existing** listing.
- Do **not** create a new listing. The existing one carries the review history
  (~37 reviews, 5.0). A new listing starts at zero and splits the entity.

Note the site's own schema is already correct here: `structuredData.ts`
contains no postal address and uses a proper `areaServed` city list. This is
purely a profile problem.

### 2. InterNACHI duplicate profiles

At least five profile URLs share certificate `NACHI17030156`, variously
labeled Pollock Pines, Sacramento, Rescue, Camino and El Dorado Hills. The
directory also alternately associates ProSpec with Cameron Park and Rancho
Cordova.

Ask InterNACHI to consolidate to one canonical profile and correct the
location. **Once consolidated, add that canonical URL to `sameAs` in
`server/structuredData.ts`** — it was deliberately left out for now, because
naming a URL that later turns out to be the non-canonical duplicate would
split the entity signal further rather than repair it.

### 3. Booking measurement (now unblocked by this branch)

The page and event exist; the wiring does not. In order:

1. **Spectora** → set the post-booking return URL to
   `https://www.weareprospec.com/booking-confirmed`
2. **GTM** → add a trigger on custom event `booking_complete`, forward to GA4.
   Map the existing `commercial_quote_submit` event to GA4's standard
   `generate_lead` here rather than adding a second code-side event.
3. **GA4** → verify in DebugView with one real test booking, *then* mark
   `booking_complete` and `generate_lead` as key events.

Interpret the number honestly: `booking_complete` fires when a visitor reaches
the return URL. The Spectora scheduler is a cross-origin iframe, so its
internal events are unreadable from the page. It is a close proxy, not a
Spectora-confirmed booking count — reconcile against Spectora's own records
before using it to compute acquisition cost.

### 4. Search Console

After this branch deploys: request indexing for `/services` and `/reviews`
(both have corrected copy and bumped `lastmod`). Inspect `/booknow` but do
**not** request indexing — its `noindex, follow` and canonical are already
correct at `server/routeMeta.ts`; its lingering appearance in branded search
is stale index processing that resolves on its own.

## Scoping: prerendering (the real SEO item)

**Recommendation: build-time prerendering, not runtime SSR.**

This site is a good fit for it — roughly 17 fixed routes, entirely static
content, no per-user rendering, and a build step that already runs on deploy.
Runtime SSR would add per-request cost and hydration complexity for no gain
here, and a framework migration is not remotely justified.

Approach: add a prerender pass after `vite build` that renders each known
route to static HTML.

**The main integration risk** is the interaction with existing meta injection.
`server/index.ts` currently reads one `index.html` template and injects
route-specific meta and JSON-LD into it at request time. Prerendered per-route
files must not bypass that, or every page ships the same generic head. Two
workable shapes:

- Run the existing `injectMeta()` over each prerendered file at build time and
  serve the results as static files. Simplest; keeps one source of truth for
  meta in `routeMeta.ts`.
- Keep request-time injection and have the prerender step supply only body
  content. More moving parts; no real advantage.

Prefer the first. Either way `getRouteMeta` / `getJsonLd` stay the single
source of truth — do not fork the meta definitions into the prerender step.

Keep `/booking-confirmed` and `/booknow` out of prerendering or ensure they
stay `noindex`.

## Known broken: the test suite does not run

`npx vitest run` fails on clean `main` with:

```
Cannot start service: Host version "0.21.5" does not match binary version "0.25.10"
```

vitest 2.1.9 pins esbuild 0.21.5 while the installed binary is 0.25.10. This
predates the current branch and is unrelated to it, but it means
`server/commercialQuote.test.ts` is effectively dead code — it cannot be
executed, so it is not protecting the commercial quote handler.

Worth fixing before relying on tests to validate anything.

## Priority order

The external items are slower and gate more than the code items, so they go
first even though they are not engineering work.

1. **Google Business Profile address** — urgent, no code, protects the reviews
2. **Deploy this branch** — the copy fixes are live-site accuracy issues
3. **Review volume** — start now; it is the slowest-compounding item and the
   actual competitive gap (~37 reviews against competitors with 100–600+).
   The 5.0 rating is an asset; quantity is the constraint, not sentiment.
4. **InterNACHI consolidation** — external, slow, then update `sameAs`
5. **Measurement wiring** — Spectora → GTM → GA4, in that order
6. **Prerendering** — largest code lift, real payoff, scope deliberately
7. **Repair the test suite**
