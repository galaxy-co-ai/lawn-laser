import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/quotes", "/leads", "/pricing", "/services", "/areas", "/content", "/settings", "/api/", "/widget"],
    },
    sitemap: "https://lawn-laser.vercel.app/sitemap.xml",
  };
}
