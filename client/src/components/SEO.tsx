import { useEffect } from "react";

/*
  SEO Component — Client-Side Meta Tag Manager

  Updates document title, description, canonical, Open Graph, and Twitter Card
  meta tags during client-side SPA navigation.

  NOTE: JSON-LD structured data is rendered server-side only (server/structuredData.ts).
  This component does NOT create any JSON-LD to avoid duplication.
*/

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
}

const DEFAULT_CANONICAL_URL = "https://www.weareprospec.com";
const DEFAULT_SOCIAL_IMAGE =
  "https://www.weareprospec.com/assets/prospec-og-image.jpg";

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string
) {
  let meta = document.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  );

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
}

export default function SEO({
  title,
  description,
  canonicalUrl = DEFAULT_CANONICAL_URL,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", DEFAULT_SOCIAL_IMAGE);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", DEFAULT_SOCIAL_IMAGE);

    let canonicalLink = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);
  }, [title, description, canonicalUrl]);

  return null;
}
