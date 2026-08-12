import express from "express";
import { createServer } from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createCommercialQuoteHandler } from "./commercialQuote";
import { getRouteMeta, isKnownRoute, getCanonicalPath } from "./routeMeta";
import { getJsonLd } from "./structuredData";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "25kb" }));

  // ─── Redirect non-www to www ───────────────────────────────────────────────
  app.use((req, res, next) => {
    const host = req.hostname;
    if (host === "weareprospec.com") {
      const redirectUrl = `https://www.weareprospec.com${req.originalUrl}`;
      return res.redirect(301, redirectUrl);
    }
    next();
  });

  // ─── Trailing-slash normalization ──────────────────────────────────────────
  // Redirect /services/ → /services (except root /)
  app.use((req, res, next) => {
    if (
      req.path !== "/" &&
      req.path.endsWith("/") &&
      (req.method === "GET" || req.method === "HEAD")
    ) {
      const canonical = req.path.slice(0, -1);
      const query = req.originalUrl.includes("?")
        ? req.originalUrl.slice(req.originalUrl.indexOf("?"))
        : "";
      return res.redirect(301, canonical + query);
    }
    next();
  });

  // ─── API Routes ────────────────────────────────────────────────────────────
  app.post("/api/commercial-quote", createCommercialQuoteHandler());

  app.use("/api", (_req, res) => {
    res.status(404).json({ message: "API route not found." });
  });

  // ─── Static Files ──────────────────────────────────────────────────────────
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath, { index: false }));

  // ─── SPA Fallback with SEO Meta Injection ──────────────────────────────────
  const indexHtmlPath = path.join(staticPath, "index.html");
  let indexHtmlTemplate = "";
  try {
    indexHtmlTemplate = fs.readFileSync(indexHtmlPath, "utf-8");
  } catch {
    console.error("Could not read index.html template from", indexHtmlPath);
  }

  app.get("*", (req, res) => {
    const routePath = getCanonicalPath(req.path);

    // Return proper 404 for unknown routes
    if (!isKnownRoute(routePath)) {
      const meta = getRouteMeta("/404");
      const jsonLd = ""; // No structured data on 404
      const html = injectMeta(indexHtmlTemplate, meta, true, jsonLd);
      return res.status(404).send(html);
    }

    // Inject route-specific meta tags and structured data for known routes
    const meta = getRouteMeta(routePath);
    const jsonLd = getJsonLd(routePath);
    const html = injectMeta(indexHtmlTemplate, meta, false, jsonLd);
    res.send(html);
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.info(`Server running on http://localhost:${port}/`);
  });
}

interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  robots?: "index, follow" | "noindex, follow";
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectMeta(
  template: string,
  meta: RouteMeta,
  is404: boolean,
  jsonLd: string
): string {
  const ogImage =
    meta.ogImage || "https://www.weareprospec.com/assets/prospec-og-image.jpg";
  const gtmId = process.env.GTM_ID || "";

  // Build the meta tags to inject after <title>
  // NOTE: GTM is the single analytics implementation path.
  // GA4 should be configured as a tag inside GTM, not injected directly.
  // If GA4_MEASUREMENT_ID is also set, it is intentionally ignored to prevent
  // double pageview tracking.
  const metaTags = `
    ${!is404 ? `<meta name="description" content="${escapeHtml(meta.description)}" />` : ""}
    ${!is404 ? `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />` : ""}
    <link rel="icon" href="/favicon.ico" sizes="32x32" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    ${!is404 ? `<meta property="og:url" content="${escapeHtml(meta.canonical)}" />` : ""}
    <meta property="og:image" content="${escapeHtml(ogImage)}" />
    <meta property="og:site_name" content="ProSpec Home Inspections" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    <meta name="twitter:image" content="${escapeHtml(ogImage)}" />
    <meta name="robots" content="${is404 ? "noindex, nofollow" : meta.robots || "index, follow"}" />
    ${
      gtmId
        ? `<!-- Google Tag Manager (head) -->
    <script>window.dataLayer=window.dataLayer||[];</script>
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');</script>
    <!-- End Google Tag Manager -->`
        : `<!-- GTM not configured. Set GTM_ID env var to enable. -->
    <script>window.dataLayer=window.dataLayer||[];</script>`
    }
    ${jsonLd}
  `;

  // GTM noscript for body (if GTM is configured)
  const gtmNoscript = gtmId
    ? `<!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->`
    : "";

  let html = template.replace(
    /<title>.*?<\/title>/,
    `<title>${escapeHtml(meta.title)}</title>${metaTags}`
  );

  // Inject GTM noscript after <body>
  if (gtmNoscript) {
    html = html.replace("<body>", `<body>\n    ${gtmNoscript}`);
  }

  return html;
}

startServer().catch(error => {
  console.error("Failed to start server", error);
  process.exit(1);
});
