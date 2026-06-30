# ProSpec Production Site Audit Report

**Prepared for:** Murph (Pmurphinc)  
**Date:** June 30, 2026  
**Site:** https://www.weareprospec.com  
**Repository:** pmurphinc/prospec-website

---

## Executive Summary

The ProSpec website is well-designed, fast-loading, and professionally branded. However, the production site had several critical technical issues that were actively preventing Google from properly indexing the site and preventing accurate conversion tracking. This audit identified these issues, prioritized them by revenue impact, and implemented fixes.

The single most impactful finding was that **Google could not see any of your page titles, descriptions, or metadata** because they were injected via JavaScript after the page loaded.

---

## Confirmed Live-Site Findings vs. Assumptions

| Finding | Status | Verification Method |
|---------|--------|---------------------|
| **No server-side metadata** | Confirmed | `curl` on live site returned no `<title>` or `<meta>` tags in raw HTML. |
| **Duplicate www/non-www** | Confirmed | Both `weareprospec.com` and `www.weareprospec.com` returned HTTP 200 with identical content. |
| **Soft 404s** | Confirmed | `/this-does-not-exist` returned HTTP 200 instead of 404. |
| **Missing Analytics** | Confirmed | Inspected live DOM and repository; no GA4 or GTM scripts were present. |
| **Wix CDN Dependency** | Confirmed | Logo and headshot image URLs pointed to `static.wixstatic.com`. |
| **Spectora iframe tracking** | Confirmed | The BookNow page embeds Spectora via iframe, preventing native cross-domain tracking without Spectora-side configuration. |

---

## Critical Issues Fixed

### 1. Server-Side Meta Tag & JSON-LD Injection
The Express server now intercepts every page request and injects the correct `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph tags, and Twitter Card tags directly into the HTML before sending it to the browser. 

Additionally, rich **JSON-LD structured data** is now injected server-side. This includes `HomeAndConstructionBusiness` schema on the homepage, `Service` schema on service pages, `FAQPage` schema on local landing pages, and `BreadcrumbList` navigation.

### 2. Proper 404 Handling & Trailing Slashes
Unknown URLs now return an HTTP 404 status code (previously they returned 200). A `noindex, nofollow` robots directive is injected for 404 pages, and the canonical link is intentionally removed. Furthermore, URLs with trailing slashes (e.g., `/services/`) now 301 redirect to their canonical versions (e.g., `/services`).

### 3. www Redirect
An Express middleware now issues a 301 redirect from `weareprospec.com` to `www.weareprospec.com`, consolidating all link equity and eliminating duplicate content concerns.

### 4. Local Asset Optimization
All images previously hosted on Wix's CDN have been downloaded, optimized, and stored locally in `client/public/assets/`. The logo was reduced from 2.5MB to 205KB. A proper Open Graph image (1200x630) was created for social sharing. Favicon and Apple Touch Icon have been added.

### 5. GTM Analytics & Conversion Hooks
Google Tag Manager (GTM) has been established as the single implementation path for analytics. The server injects the GTM container script based on the `GTM_ID` environment variable.

Client-side tracking hooks have been added to all major conversion points using data attributes (`data-track-event` and `data-track-location`). These push structured events to the `dataLayer` without sending any Personally Identifiable Information (PII).

**Tracked Events:**
- `phone_click`
- `email_click`
- `booking_cta_click`
- `commercial_quote_cta_click`
- `commercial_quote_submit`
- `commercial_quote_error`
- `scheduler_page_view`

---

## How to Deploy & Verify

### 1. Railway Environment Setup
To enable tracking, you must add your Google Tag Manager ID to the Railway project environment variables:
- **Variable Name:** `GTM_ID`
- **Variable Value:** `GTM-XXXXXXX` (replace with your actual container ID)

*Do not add `GA4_MEASUREMENT_ID`. GA4 should be configured as a tag inside your GTM container.*

### 2. Post-Deployment Verification Checklist

Once the PR is merged and deployed, verify the fixes:

**Server-Side SEO & Redirects:**
Run the included integration test script against the live site:
```bash
./tests/integration-tests.sh https://www.weareprospec.com
```
This script automatically verifies the 301 redirects, 404 status codes, trailing slash normalization, and presence of server-rendered metadata and JSON-LD.

**Analytics & Conversion Events:**
1. Open https://www.weareprospec.com in Google Chrome.
2. Right-click and select "Inspect" to open Developer Tools.
3. Go to the "Console" tab.
4. Type `dataLayer` and press Enter. You should see an array.
5. Click the "Book Now" button in the header.
6. Type `dataLayer` again. Expand the array and look at the last item. It should look like:
   ```json
   {
     "event": "booking_cta_click",
     "page_path": "/",
     "element_location": "header"
   }
   ```

### 3. Note on Spectora Bookings
The `booking_cta_click` and `scheduler_page_view` events track users entering your funnel. However, because the actual booking occurs inside the Spectora iframe, the website cannot track the final "booking completed" event natively. To measure actual completed bookings in GA4, you must configure Spectora's native Google Analytics integration or set up a Spectora webhook.
