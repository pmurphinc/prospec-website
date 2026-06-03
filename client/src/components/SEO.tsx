import { useEffect } from "react";

/* 
  DESIGN PHILOSOPHY: Approach 1 - The Master Builder (Industrial Editorial)
  Dynamic SEO manager component that sets document titles, descriptions, social tags,
  canonical URLs, and LocalBusiness JSON-LD schema markup without duplicating tags.
*/

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  isCommercial?: boolean;
}

const DEFAULT_CANONICAL_URL = "https://www.weareprospec.com";
const DEFAULT_SOCIAL_IMAGE =
  "https://static.wixstatic.com/media/07e6cd_bf96e5111b0d4e9297ec02ee9dd29f0a~mv2.png";

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
  isCommercial = false,
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

    const existingSchema = document.getElementById("prospec-seo-schema");
    if (existingSchema) {
      existingSchema.remove();
    }

    const schemaScript = document.createElement("script");
    schemaScript.id = "prospec-seo-schema";
    schemaScript.type = "application/ld+json";

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      name: "ProSpec",
      image: DEFAULT_SOCIAL_IMAGE,
      url: DEFAULT_CANONICAL_URL,
      telephone: "+1-916-432-0332",
      email: "patrick@weareprospec.com",
      priceRange: "$$$",
      description,
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
      sameAs: [DEFAULT_CANONICAL_URL],
      areaServed: [
        { "@type": "AdministrativeArea", name: "Sacramento" },
        { "@type": "AdministrativeArea", name: "Folsom" },
        { "@type": "AdministrativeArea", name: "Roseville" },
        { "@type": "AdministrativeArea", name: "Rocklin" },
        { "@type": "AdministrativeArea", name: "El Dorado Hills" },
        { "@type": "AdministrativeArea", name: "Davis" },
        { "@type": "AdministrativeArea", name: "Elk Grove" },
        { "@type": "AdministrativeArea", name: "Placerville" },
      ],
      ...(isCommercial
        ? {
            serviceType:
              "Commercial property inspection and property condition assessment",
          }
        : {}),
    };

    schemaScript.text = JSON.stringify(localBusinessSchema);
    document.head.appendChild(schemaScript);

    return () => {
      const schema = document.getElementById("prospec-seo-schema");
      if (schema) {
        schema.remove();
      }
    };
  }, [title, description, canonicalUrl, isCommercial]);

  return null;
}
