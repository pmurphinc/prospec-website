import React, { useEffect } from "react";

/* 
  DESIGN PHILOSOPHY: Approach 1 - The Master Builder (Industrial Editorial)
  Dynamic SEO manager component that sets document titles, descriptions, open graph tags,
  and injects a LocalBusiness JSON-LD schema markup into the page head.
*/

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  isCommercial?: boolean;
}

export default function SEO({
  title,
  description,
  canonicalUrl = "https://www.weareprospec.com",
  isCommercial = false,
}: SEOProps) {
  useEffect(() => {
    // 1. Set Title
    document.title = title;

    // 2. Set Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // 3. Set Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 4. Inject Schema Markup (JSON-LD)
    const existingSchema = document.getElementById("prospec-seo-schema");
    if (existingSchema) {
      existingSchema.remove();
    }

    const schemaScript = document.createElement("script");
    schemaScript.id = "prospec-seo-schema";
    schemaScript.type = "application/ld+json";

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "HomeInspector",
      "name": "ProSpec",
      "image": "https://static.wixstatic.com/media/07e6cd_bf96e5111b0d4e9297ec02ee9dd29f0a~mv2.png",
      "url": "https://www.weareprospec.com",
      "telephone": "+1-916-432-0332",
      "email": "patrick@weareprospec.com",
      "priceRange": "$$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sacramento",
        "addressRegion": "CA",
        "postalCode": "95814",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "38.5816",
        "longitude": "-121.4944"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      },
      "sameAs": [
        "https://www.weareprospec.com"
      ],
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Sacramento" },
        { "@type": "AdministrativeArea", "name": "Folsom" },
        { "@type": "AdministrativeArea", "name": "Roseville" },
        { "@type": "AdministrativeArea", "name": "Rocklin" },
        { "@type": "AdministrativeArea", "name": "El Dorado Hills" },
        { "@type": "AdministrativeArea", "name": "Davis" },
        { "@type": "AdministrativeArea", "name": "Elk Grove" },
        { "@type": "AdministrativeArea", "name": "Placerville" }
      ]
    };

    schemaScript.text = JSON.stringify(localBusinessSchema);
    document.head.appendChild(schemaScript);

    return () => {
      // Clean up schema script on unmount
      const schema = document.getElementById("prospec-seo-schema");
      if (schema) {
        schema.remove();
      }
    };
  }, [title, description, canonicalUrl]);

  return null; // This component handles side effects and does not render visual markup
}
