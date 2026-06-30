## Production Site Audit: Critical SEO, Analytics, and Conversion Fixes

This PR addresses the critical and high-priority issues identified during the comprehensive production site audit of `weareprospec.com`. It has been thoroughly revised to ensure GTM is the single source of truth for analytics, to add rich JSON-LD structured data, and to provide stable conversion tracking hooks.

### The Problem (Audit Findings)
1. **No SEO Metadata for Crawlers:** The site was an SPA where all meta tags (title, description, canonical) were injected via client-side React. When Googlebot requested the page, it saw zero meta tags, severely limiting indexability and search ranking.
2. **Duplicate Content:** Both `weareprospec.com` and `www.weareprospec.com` served identical content without a 301 redirect.
3. **Soft 404s:** Visiting a non-existent URL (e.g., `/nonexistent`) returned an HTTP 200 status code, which confuses search engines.
4. **Wix Dependency:** Critical assets (logo, headshot, OG social image) were still hosted on Wix's CDN, creating a single point of failure.
5. **Missing Tracking:** No Google Analytics or Google Tag Manager implementation, making it impossible to measure ROI.

### The Solution (Implemented Fixes)

#### 1. Server-Side Meta & Structured Data Injection (Critical SEO Fix)
- Intercepts requests in the Express server (`server/index.ts`) before serving `index.html`.
- Uses a new `server/routeMeta.ts` dictionary to look up the exact title, description, and canonical URL for the requested route.
- Injects **JSON-LD Structured Data** (`server/structuredData.ts`) directly into the HTML:
  - `HomeAndConstructionBusiness` (LocalBusiness) on the homepage.
  - `Service` schema on the services and local landing pages.
  - `FAQPage` schema on local landing pages (e.g., Sacramento).
  - `BreadcrumbList` on all subpages.
- Sets `robots: index, follow` for valid routes and `noindex, nofollow` for 404s.

#### 2. Technical SEO & Routing
- Added Express middleware to force a 301 redirect from `weareprospec.com` to `www.weareprospec.com`.
- Added trailing-slash normalization (e.g., `/services/` 301 redirects to `/services`).
- Updated the SPA catch-all to check against known routes; if a route is unknown, it returns a true HTTP 404 status code and removes the canonical link.
- Updated `sitemap.xml` with current `lastmod` dates.
- Added a full bash integration test suite (`tests/integration-tests.sh`) to verify these behaviors.

#### 3. Asset Localization & Optimization
- Downloaded the logo, headshot, and OG image from Wix and placed them in `client/public/assets`.
- Optimized the logo file size from 2.5MB down to 205KB.
- Created a proper 1200x630 `prospec-og-image.jpg` for social sharing.
- Added `favicon.ico` (32x32) and `apple-touch-icon.png` (180x180).

#### 4. GTM-Only Analytics & Conversion Hooks
- **GTM is the single implementation path.** The server only injects the GTM container script (if `GTM_ID` is present in the environment). GA4 is intentionally NOT injected directly to prevent double-tracking.
- Added a robust client-side tracking utility (`client/src/lib/tracking.ts`) that listens for clicks on elements with `data-track-event` attributes.
- Added tracking hooks to all key conversion points:
  - `phone_click` (Header, Mobile Menu, Footer, Commercial CTA)
  - `email_click` (Footer)
  - `booking_cta_click` (Header, Mobile Menu, Homepage, Local Landing Pages)
  - `commercial_quote_cta_click` (Homepage, Commercial PCA)
  - `commercial_quote_submit` (Commercial Form Success)
  - `commercial_quote_error` (Commercial Form Error)
  - `scheduler_page_view` (BookNow Page Load)

> **⚠️ Spectora Booking Tracking Limitation:**
> The `booking_cta_click` and `scheduler_page_view` events track users *entering* the booking funnel. Because the actual booking happens inside a third-party Spectora iframe, we cannot track completed bookings natively via the website's dataLayer. To track completed bookings, you must configure Spectora's native Google Analytics integration or use a Spectora webhook.

### Deployment & Verification Checklist

1. **Set Environment Variables in Railway:**
   - Add `GTM_ID` (e.g., `GTM-XXXXXXX`) to your Railway environment variables.
   - *Note: Do not add GA4_MEASUREMENT_ID. Configure GA4 inside GTM instead.*

2. **Verify Server-Side SEO:**
   - Run the integration test suite: `./tests/integration-tests.sh https://www.weareprospec.com`
   - Or manually check: `curl -s https://www.weareprospec.com/ | grep '<title>'`

3. **Verify GTM Events:**
   - Open the site in Chrome.
   - Open the Developer Console.
   - Type `dataLayer` and press Enter to confirm it exists.
   - Click a "Book Now" button.
   - Type `dataLayer` again; you should see an object with `event: "booking_cta_click"`.

---
*The full Production Audit Report is available in `docs/PRODUCTION_AUDIT_REPORT.md`.*
