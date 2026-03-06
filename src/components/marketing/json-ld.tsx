import { BUSINESS } from "@/lib/constants";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://lawn-laser.vercel.app/#organization",
    name: BUSINESS.name,
    alternateName: BUSINESS.dba,
    url: "https://lawn-laser.vercel.app",
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    foundingDate: String(BUSINESS.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.3886,
      longitude: -97.4943,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(BUSINESS.googleRating),
      reviewCount: String(BUSINESS.reviewCount),
      bestRating: "5",
    },
    sameAs: [
      BUSINESS.social.facebook,
      BUSINESS.social.youtube,
      BUSINESS.social.instagram,
      BUSINESS.social.tiktok,
    ],
    priceRange: "$$",
    image: "https://lawn-laser.vercel.app/og.png",
    description: `Oklahoma City's top-rated lawn care and pest control since ${BUSINESS.founded}. ${BUSINESS.reviewCount}+ five-star reviews.`,
    areaServed: {
      "@type": "City",
      name: "Oklahoma City",
      containedInPlace: {
        "@type": "State",
        name: "Oklahoma",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Lawn Care & Pest Control Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Lawn Care",
            description:
              "Fertilization, weed control, aeration, overseeding, and soil conditioning for Oklahoma lawns.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pest Control",
            description:
              "Perimeter pest control, mosquito control, flea & tick, and seasonal pest management.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BUSINESS.name,
    url: "https://lawn-laser.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://lawn-laser.vercel.app/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
