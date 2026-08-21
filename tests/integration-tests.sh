#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# ProSpec Website — Integration Test Suite
# ─────────────────────────────────────────────────────────────────────────────
# Run against the local dev server or the live production site.
#
# Usage:
#   ./tests/integration-tests.sh                     # defaults to localhost:3000
#   ./tests/integration-tests.sh https://www.weareprospec.com  # test production
#
# Prerequisites:
#   - curl
#   - Server running locally (if testing localhost)
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BASE_URL="${1:-http://localhost:3000}"
PASS=0
FAIL=0

pass() { echo "  ✓ $1"; PASS=$((PASS + 1)); }
fail() { echo "  ✗ $1"; FAIL=$((FAIL + 1)); }

echo ""
echo "ProSpec Integration Tests"
echo "Target: $BASE_URL"
echo "─────────────────────────────────────────────────────────────────"

# ─── Test 1: Homepage metadata in raw HTML ────────────────────────────────────
echo ""
echo "1. Homepage metadata in raw HTML"
HOMEPAGE=$(curl -s "$BASE_URL/")
if echo "$HOMEPAGE" | grep -q '<title>ProSpec Home Inspections'; then
  pass "Title tag present"
else
  fail "Title tag missing"
fi
if echo "$HOMEPAGE" | grep -q '<meta name="description"'; then
  pass "Meta description present"
else
  fail "Meta description missing"
fi
if echo "$HOMEPAGE" | grep -q '<link rel="canonical"'; then
  pass "Canonical link present"
else
  fail "Canonical link missing"
fi
if echo "$HOMEPAGE" | grep -q 'application/ld+json'; then
  pass "JSON-LD structured data present"
else
  fail "JSON-LD structured data missing"
fi
if echo "$HOMEPAGE" | grep -q 'HomeAndConstructionBusiness'; then
  pass "LocalBusiness schema present"
else
  fail "LocalBusiness schema missing"
fi
if echo "$HOMEPAGE" | grep -q 'dataLayer'; then
  pass "dataLayer initialized"
else
  fail "dataLayer not initialized"
fi

# ─── Test 2: Local landing page metadata ──────────────────────────────────────
echo ""
echo "2. Local landing page (Sacramento) metadata in raw HTML"
LOCAL_PAGE=$(curl -s "$BASE_URL/home-inspection-sacramento")
if echo "$LOCAL_PAGE" | grep -q '<title>Home Inspection Sacramento CA'; then
  pass "Local page title present"
else
  fail "Local page title missing"
fi
if echo "$LOCAL_PAGE" | grep -q '<meta name="description"'; then
  pass "Local page meta description present"
else
  fail "Local page meta description missing"
fi
if echo "$LOCAL_PAGE" | grep -q 'BreadcrumbList'; then
  pass "BreadcrumbList schema present"
else
  fail "BreadcrumbList schema missing"
fi
if echo "$LOCAL_PAGE" | grep -q 'FAQPage'; then
  pass "FAQPage schema present (Sacramento)"
else
  fail "FAQPage schema missing (Sacramento)"
fi

# ─── Test 3: Commercial page metadata ────────────────────────────────────────
echo ""
echo "3. Commercial page metadata in raw HTML"
COMMERCIAL=$(curl -s "$BASE_URL/commercial-property-condition-assessments-sacramento")
if echo "$COMMERCIAL" | grep -q '<title>Property Condition Assessments Sacramento'; then
  pass "Commercial page title present"
else
  fail "Commercial page title missing"
fi
if echo "$COMMERCIAL" | grep -q 'Commercial Property Condition Assessment'; then
  pass "Commercial Service schema present"
else
  fail "Commercial Service schema missing"
fi

# ─── Test 4: Non-www to www 301 redirect ─────────────────────────────────────
echo ""
echo "4. Non-www to www 301 redirect"
if [ "$BASE_URL" = "http://localhost:3000" ]; then
  echo "  (skipped — cannot test www redirect on localhost)"
else
  NON_WWW_STATUS=$(curl -sI -o /dev/null -w "%{http_code}" "https://weareprospec.com/")
  if [ "$NON_WWW_STATUS" = "301" ]; then
    pass "Non-www returns 301"
  else
    fail "Non-www returns $NON_WWW_STATUS (expected 301)"
  fi
fi

# ─── Test 5: Unknown route returns HTTP 404 + noindex ─────────────────────────
echo ""
echo "5. Unknown route returns HTTP 404 + noindex"
NOT_FOUND_STATUS=$(curl -sI -o /dev/null -w "%{http_code}" "$BASE_URL/this-page-does-not-exist-xyz")
if [ "$NOT_FOUND_STATUS" = "404" ]; then
  pass "Unknown route returns HTTP 404"
else
  fail "Unknown route returns $NOT_FOUND_STATUS (expected 404)"
fi
NOT_FOUND_BODY=$(curl -s "$BASE_URL/this-page-does-not-exist-xyz")
if echo "$NOT_FOUND_BODY" | grep -q 'noindex'; then
  pass "404 page has noindex meta"
else
  fail "404 page missing noindex meta"
fi
if echo "$NOT_FOUND_BODY" | grep -q 'canonical'; then
  fail "404 page has canonical (should not)"
else
  pass "404 page has no canonical link"
fi

# ─── Test 6: Trailing-slash redirect ─────────────────────────────────────────
echo ""
echo "6. Trailing-slash redirect"
TRAILING_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/services/")
if [ "$TRAILING_STATUS" = "301" ]; then
  pass "/services/ returns 301 redirect"
else
  fail "/services/ returns $TRAILING_STATUS (expected 301)"
fi

# ─── Test 7: Sitemap and robots.txt reachable ─────────────────────────────────
echo ""
echo "7. Sitemap and robots.txt reachable"
SITEMAP_STATUS=$(curl -sI -o /dev/null -w "%{http_code}" "$BASE_URL/sitemap.xml")
if [ "$SITEMAP_STATUS" = "200" ]; then
  pass "sitemap.xml returns 200"
else
  fail "sitemap.xml returns $SITEMAP_STATUS"
fi
ROBOTS_STATUS=$(curl -sI -o /dev/null -w "%{http_code}" "$BASE_URL/robots.txt")
if [ "$ROBOTS_STATUS" = "200" ]; then
  pass "robots.txt returns 200"
else
  fail "robots.txt returns $ROBOTS_STATUS"
fi

# ─── Test 8: Sacramento FAQ schema accuracy ──────────────────────────────────
echo ""
echo "8. Sacramento FAQ schema accuracy"
SAC_PAGE=$(curl -s "$BASE_URL/home-inspection-sacramento")
if echo "$SAC_PAGE" | grep -q 'Residential home inspections start at \$385'; then
  pass "FAQ schema contains correct \$385 pricing"
else
  fail "FAQ schema missing correct \$385 pricing"
fi
if echo "$SAC_PAGE" | grep -q 'starts at \$350 for standard homes'; then
  fail "FAQ schema contains incorrect old \$350 wording (should not)"
else
  pass "FAQ schema does not contain incorrect old \$350 wording"
fi
if echo "$SAC_PAGE" | grep -q 'Manufactured home inspections and 11-month warranty inspections start at \$350'; then
  pass "FAQ schema contains correct manufactured/warranty \$350 wording"
else
  fail "FAQ schema missing manufactured/warranty \$350 wording"
fi

# ─── Test 9: Homepage has exactly one server-rendered LocalBusiness schema ─────
echo ""
echo "9. Homepage has exactly one server-rendered LocalBusiness schema"
HOMEPAGE_SCHEMAS=$(echo "$HOMEPAGE" | grep -o 'HomeAndConstructionBusiness' | wc -l)
if [ "$HOMEPAGE_SCHEMAS" -eq 1 ]; then
  pass "Homepage has exactly 1 HomeAndConstructionBusiness schema"
else
  fail "Homepage has $HOMEPAGE_SCHEMAS HomeAndConstructionBusiness schemas (expected 1)"
fi

# ─── Test 10: No duplicate client-side #prospec-seo-schema script ──────────────
echo ""
echo "10. No duplicate client-side schema script"
if echo "$HOMEPAGE" | grep -q 'prospec-seo-schema'; then
  fail "Homepage contains #prospec-seo-schema (client-side duplicate)"
else
  pass "Homepage does not contain #prospec-seo-schema"
fi

# ─── Test 11: No unsupported schema claims ────────────────────────────────────
echo ""
echo "11. No unsupported schema claims"
if echo "$HOMEPAGE" | grep -q 'premier property inspection firm'; then
  fail "Homepage schema contains unsupported 'premier' claim"
else
  pass "Homepage schema does not contain 'premier' claim"
fi
SERVICES_PAGE=$(curl -s "$BASE_URL/services")
if echo "$SERVICES_PAGE" | grep -q '"@type":"State"'; then
  fail "Services schema uses State-level areaServed (should be City only)"
else
  pass "Services schema uses City-level areaServed only"
fi
if echo "$HOMEPAGE" | grep -q 'openingHoursSpecification'; then
  fail "Homepage schema contains unverified business hours"
else
  pass "Homepage schema does not contain business hours"
fi

# ─── Test 12: Manufactured-home route uses dedicated schema ──────────────────
echo ""
echo "12. Manufactured-home route uses dedicated schema"
MFG_PAGE=$(curl -s "$BASE_URL/manufactured-home-inspection")
if echo "$MFG_PAGE" | grep -q 'Manufactured Home Inspection'; then
  pass "Manufactured-home page has manufactured-home-specific Service schema"
else
  fail "Manufactured-home page missing manufactured-home-specific schema"
fi
if echo "$MFG_PAGE" | grep -q '"serviceType":"Home Inspection"'; then
  fail "Manufactured-home page uses generic residential schema (should not)"
else
  pass "Manufactured-home page does not use generic residential schema"
fi
if echo "$MFG_PAGE" | grep -q 'non-invasive inspection of manufactured'; then
  pass "Manufactured-home schema description matches dedicated wording"
else
  fail "Manufactured-home schema description does not match dedicated wording"
fi


# ─── Test 13: /booknow indexing controls ─────────────────────────────────────
echo ""
echo "13. /booknow indexing controls"
BOOKNOW_PAGE=$(curl -s "$BASE_URL/booknow")
if echo "$BOOKNOW_PAGE" | grep -q '<meta name="robots" content="noindex, follow"'; then
  pass "/booknow is noindex, follow"
else
  fail "/booknow is NOT noindex, follow"
fi
if echo "$BOOKNOW_PAGE" | grep -q '<link rel="canonical" href="https://www.weareprospec.com/booknow"'; then
  pass "/booknow has a self-referencing HTTPS www canonical"
else
  fail "/booknow canonical is missing or not self-referencing"
fi
SITEMAP=$(curl -s "$BASE_URL/sitemap.xml")
if echo "$SITEMAP" | grep -q '/booknow'; then
  fail "/booknow appears in sitemap.xml (it must not)"
else
  pass "/booknow is excluded from sitemap.xml"
fi
ROBOTS=$(curl -s "$BASE_URL/robots.txt")
# Crawlers MUST be able to fetch /booknow, or they never see the noindex tag.
if echo "$ROBOTS" | grep -qiE '^[[:space:]]*Disallow:[[:space:]]*/booknow'; then
  fail "robots.txt disallows /booknow (noindex would never be seen)"
else
  pass "robots.txt allows /booknow to be crawled"
fi
# The Spectora iframe is deliberately deferred until it nears the viewport, so
# app.spectora.com is NOT expected in the raw HTML. What must be there without
# JS is the booking page's own content and a working way to reach ProSpec.
if echo "$BOOKNOW_PAGE" | grep -qF 'Schedule Your Inspection'; then
  pass "/booknow has its heading in raw HTML"
else
  fail "/booknow heading missing from raw HTML"
fi
if echo "$BOOKNOW_PAGE" | grep -qF 'href="tel:+19164320332"'; then
  pass "/booknow offers a phone fallback in raw HTML"
else
  fail "/booknow has no phone fallback in raw HTML"
fi
# The scheduler itself must still be wired up in the client bundle.
if grep -rqF 'app.spectora.com' dist/public/assets/*.js 2>/dev/null; then
  pass "Spectora scheduler URL is present in the client bundle"
elif [ "$BASE_URL" != "http://localhost:3000" ]; then
  pass "Spectora bundle check skipped (remote target)"
else
  fail "Spectora scheduler URL missing from the client bundle"
fi

# ─── Test 14: /booking-confirmed indexing controls ───────────────────────────
echo ""
echo "14. /booking-confirmed indexing controls"
CONFIRMED_PAGE=$(curl -s "$BASE_URL/booking-confirmed")
if echo "$CONFIRMED_PAGE" | grep -q '<meta name="robots" content="noindex, follow"'; then
  pass "/booking-confirmed is noindex, follow"
else
  fail "/booking-confirmed is NOT noindex, follow"
fi
if echo "$CONFIRMED_PAGE" | grep -q '<link rel="canonical" href="https://www.weareprospec.com/booking-confirmed"'; then
  pass "/booking-confirmed has a self-referencing canonical"
else
  fail "/booking-confirmed canonical is missing or not self-referencing"
fi
if echo "$SITEMAP" | grep -q '/booking-confirmed'; then
  fail "/booking-confirmed appears in sitemap.xml (it must not)"
else
  pass "/booking-confirmed is excluded from sitemap.xml"
fi

# ─── Test 15: Pricing consistency ────────────────────────────────────────────
echo ""
echo "15. Pricing consistency between metadata and visible copy"
SERVICES_BODY=$(curl -s "$BASE_URL/services")
SERVICES_META=$(echo "$SERVICES_BODY" | grep -o '<meta name="description" content="[^"]*"')
if echo "$SERVICES_META" | grep -q '385'; then
  pass "/services meta description states the 385 residential starting price"
else
  fail "/services meta description does not state the 385 residential price"
fi
if echo "$SERVICES_META" | grep -qE 'pricing starting at .?350'; then
  fail "/services meta implies ALL inspections start at 350"
else
  pass "/services meta does not imply all inspections start at 350"
fi
if echo "$SERVICES_BODY" | grep -q 'Final pricing varies based on square footage'; then
  pass "/services carries the pricing qualifier in static HTML"
else
  fail "/services is missing the pricing qualifier in static HTML"
fi

# ─── Test 16: Crawlable above-the-fold content in raw HTML ───────────────────
echo ""
echo "16. Crawlable above-the-fold content in raw HTML (pre-JS)"
check_static_route() {
  local route="$1"
  local expected_h1="$2"
  local body
  body=$(curl -s "$BASE_URL$route")

  local h1_count
  h1_count=$(echo "$body" | grep -o '<h1' | wc -l | tr -d ' ')
  if [ "$h1_count" = "1" ]; then
    pass "$route has exactly one <h1> in raw HTML"
  else
    fail "$route has $h1_count <h1> elements in raw HTML (expected 1)"
  fi

  if echo "$body" | grep -qF "$expected_h1"; then
    pass "$route <h1> text is present in raw HTML"
  else
    fail "$route <h1> text missing from raw HTML"
  fi

  if echo "$body" | grep -qF 'href="tel:+19164320332"'; then
    pass "$route has a tel: link in raw HTML"
  else
    fail "$route has no tel: link in raw HTML"
  fi

  if echo "$body" | grep -qF 'href="sms:+19164320332"'; then
    pass "$route has an sms: link in raw HTML"
  else
    fail "$route has no sms: link in raw HTML"
  fi

  if echo "$body" | grep -qF '/booknow'; then
    pass "$route has a booking CTA in raw HTML"
  else
    fail "$route has no booking CTA in raw HTML"
  fi

  # The block must be real visible content, never hidden SEO text.
  if echo "$body" | grep -o '<div id="prospec-static-content"[^>]*>' | grep -qiE 'display:[[:space:]]*none|visibility:[[:space:]]*hidden|aria-hidden'; then
    fail "$route static content block is hidden (cloaking risk)"
  else
    pass "$route static content block is visible, not hidden"
  fi
}

check_static_route "/" "Certified Master Home Inspector"
check_static_route "/services" "Inspection Services"
check_static_route "/reviews" "ProSpec Client Reviews"
check_static_route "/inspector" "Meet Patrick Murphy"
check_static_route "/booknow" "Schedule Your Inspection"
check_static_route "/home-inspection-sacramento" "Home Inspection in Sacramento, CA"
check_static_route "/home-inspection-folsom" "Home Inspection in Folsom, CA"
check_static_route "/home-inspection-el-dorado-hills" "Home Inspection in El Dorado Hills, CA"
check_static_route "/home-inspection-placerville" "Home Inspections in Placerville, CA"
check_static_route "/home-inspection-shingle-springs" "Home Inspection in Shingle Springs, CA"
check_static_route "/new-construction-inspection" "New Construction Home Inspections"
check_static_route "/11-month-warranty-inspection" "11-Month Warranty Inspections"
check_static_route "/manufactured-home-inspection" "Manufactured Home Inspections"
check_static_route "/commercial-property-condition-assessments-sacramento" "Commercial Property Condition Assessments (PCA)"
check_static_route "/commercial-building-inspections-sacramento" "Commercial Building Inspections"
check_static_route "/apartment-building-inspections-sacramento" "Apartment &amp; Multi-Family Inspections"

# ─── Test 16b: no obsolete PCA sample-report URL anywhere ────────────────────
echo ""
echo "16b. No obsolete PCA sample-report URL"
for r in / /services /booknow /commercial-property-condition-assessments-sacramento; do
  BODY=$(curl -s "$BASE_URL$r")
  if echo "$BODY" | grep -qiE 'sample_reports?/[0-9]|pca[-_]sample|sample[-_]pca'; then
    fail "$r links a specific sample report URL"
  else
    pass "$r links no specific sample-report URL"
  fi
done

# ─── Test 17: Unique titles and descriptions ─────────────────────────────────
echo ""
echo "17. Unique titles and meta descriptions across indexable routes"
ROUTES="/ /services /reviews /inspector /home-inspection-sacramento /home-inspection-folsom /home-inspection-el-dorado-hills /home-inspection-placerville /home-inspection-shingle-springs /new-construction-inspection /11-month-warranty-inspection /manufactured-home-inspection /commercial-property-condition-assessments-sacramento /commercial-building-inspections-sacramento /apartment-building-inspections-sacramento"
ROUTE_COUNT=0
TITLE_FILE=$(mktemp)
DESC_FILE=$(mktemp)
for r in $ROUTES; do
  ROUTE_COUNT=$((ROUTE_COUNT + 1))
  PAGE=$(curl -s "$BASE_URL$r")
  echo "$PAGE" | grep -o '<title>[^<]*</title>' | head -1 >> "$TITLE_FILE"
  echo "$PAGE" | grep -o '<meta name="description" content="[^"]*"' | head -1 >> "$DESC_FILE"
done
UNIQUE_TITLES=$(sort -u "$TITLE_FILE" | grep -c '<title>' || true)
UNIQUE_DESCS=$(sort -u "$DESC_FILE" | grep -c 'name="description"' || true)
rm -f "$TITLE_FILE" "$DESC_FILE"
if [ "$UNIQUE_TITLES" = "$ROUTE_COUNT" ]; then
  pass "All $ROUTE_COUNT indexable routes have unique titles"
else
  fail "Only $UNIQUE_TITLES unique titles across $ROUTE_COUNT routes"
fi
if [ "$UNIQUE_DESCS" = "$ROUTE_COUNT" ]; then
  pass "All $ROUTE_COUNT indexable routes have unique meta descriptions"
else
  fail "Only $UNIQUE_DESCS unique descriptions across $ROUTE_COUNT routes"
fi

# ─── Test 18: Reviews page carries no unsupported rating ─────────────────────
echo ""
echo "18. Reviews page carries no unsupported rating claim"
REVIEWS_PAGE=$(curl -s "$BASE_URL/reviews")
if echo "$REVIEWS_PAGE" | grep -q 'aggregateRating'; then
  fail "Reviews page emits aggregateRating"
else
  pass "Reviews page emits no aggregateRating"
fi
if echo "$REVIEWS_PAGE" | grep -q '"@type":"Review"'; then
  fail "Reviews page emits Review schema"
else
  pass "Reviews page emits no Review schema"
fi
if echo "$REVIEWS_PAGE" | grep -qi 'Perfect Star Rating'; then
  fail "Reviews page still claims a Perfect Star Rating"
else
  pass "Reviews page makes no 'Perfect Star Rating' claim"
fi
if echo "$REVIEWS_PAGE" | grep -qi 'Cerified'; then
  fail "Reviews page contains the misspelled 'Cerified' keyword text"
else
  pass "Reviews page contains no misspelled 'Cerified' keyword text"
fi

# ─── Test 19: Single analytics implementation ────────────────────────────────
echo ""
echo "19. Single analytics implementation (no duplicate systems)"
GTM_COUNT=$(echo "$HOMEPAGE" | grep -o 'googletagmanager.com/gtm.js' | wc -l | tr -d ' ')
if [ "$GTM_COUNT" -le 1 ]; then
  pass "Homepage loads the GTM container at most once ($GTM_COUNT)"
else
  fail "Homepage loads the GTM container $GTM_COUNT times"
fi
if echo "$HOMEPAGE" | grep -q 'googletagmanager.com/gtag/js'; then
  fail "Homepage loads gtag.js directly (duplicates GA4 via GTM)"
else
  pass "Homepage does not load gtag.js directly"
fi

# ─── Test 20: Business identity consistency ──────────────────────────────────
echo ""
echo "20. Business identity consistency"
if echo "$HOMEPAGE" | grep -qF '"telephone":"+1-916-432-0332"'; then
  pass "Schema telephone matches the canonical number"
else
  fail "Schema telephone does not match the canonical number"
fi
if echo "$HOMEPAGE" | grep -qF '"identifier":"NACHI17030156"'; then
  pass "Schema carries the InterNACHI ID"
else
  fail "Schema is missing the InterNACHI ID"
fi
if echo "$HOMEPAGE" | grep -qE '"(streetAddress|postalCode)"'; then
  fail "Schema publishes a street address (service-area business must not)"
else
  pass "Schema publishes no street address"
fi
if echo "$HOMEPAGE" | grep -qF '"sameAs":[""'; then
  fail "Schema sameAs contains an empty placeholder URL"
else
  pass "Schema sameAs contains no empty placeholder URLs"
fi

# ─── Summary ──────────────────────────────────────────────────────────────────
echo ""
echo "─────────────────────────────────────────────────────────────────"
echo "Results: $PASS passed, $FAIL failed"
echo ""

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
