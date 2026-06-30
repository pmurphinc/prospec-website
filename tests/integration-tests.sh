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
if echo "$COMMERCIAL" | grep -q '<title>Commercial Property Condition Assessments Sacramento'; then
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

# ─── Summary ──────────────────────────────────────────────────────────────────
echo ""
echo "─────────────────────────────────────────────────────────────────"
echo "Results: $PASS passed, $FAIL failed"
echo ""

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
