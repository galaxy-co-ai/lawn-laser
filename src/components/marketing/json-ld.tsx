import { BUSINESS } from "@/lib/constants";

const BASE_URL = "https://lawn-laser.vercel.app";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#organization`,
    name: BUSINESS.name,
    alternateName: BUSINESS.dba,
    url: BASE_URL,
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
    image: `${BASE_URL}/og.png`,
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
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
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

export function ArticleJsonLd({
  title,
  slug,
  excerpt,
  publishedAt,
  updatedAt,
  featuredImage,
  category,
}: {
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt?: Date | null;
  updatedAt?: Date | null;
  featuredImage?: string | null;
  category?: string | null;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    url: `${BASE_URL}/blog/${slug}`,
    ...(featuredImage && { image: featuredImage }),
    ...(publishedAt && { datePublished: publishedAt.toISOString() }),
    ...(updatedAt && { dateModified: updatedAt.toISOString() }),
    ...(excerpt && { description: excerpt }),
    ...(category && { articleSection: category }),
    author: {
      "@type": "Organization",
      name: BUSINESS.name,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
      url: BASE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceJsonLd({
  name,
  slug,
  category,
  description,
}: {
  name: string;
  slug: string;
  category: "lawn-care" | "pest-control";
  description: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    url: `${BASE_URL}/${category}/${slug}`,
    description,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#organization`,
      name: BUSINESS.name,
    },
    areaServed: {
      "@type": "City",
      name: "Oklahoma City",
      containedInPlace: {
        "@type": "State",
        name: "Oklahoma",
      },
    },
    serviceType: category === "lawn-care" ? "Lawn Care" : "Pest Control",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CityLocalBusinessJsonLd({
  cityName,
  citySlug,
}: {
  cityName: string;
  citySlug: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/service-areas/${citySlug}#localbusiness`,
    name: `${BUSINESS.name} - ${cityName}`,
    url: `${BASE_URL}/service-areas/${citySlug}`,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: cityName,
      addressRegion: "OK",
      addressCountry: "US",
    },
    parentOrganization: {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#organization`,
      name: BUSINESS.name,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(BUSINESS.googleRating),
      reviewCount: String(BUSINESS.reviewCount),
      bestRating: "5",
    },
    description: `Professional lawn care and pest control services in ${cityName}, Oklahoma. ${BUSINESS.reviewCount}+ five-star reviews.`,
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQPageJsonLd({
  questions,
}: {
  questions: { q: string; a: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
