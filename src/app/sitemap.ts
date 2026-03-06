import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  LAWN_CARE_SERVICES,
  PEST_CONTROL_SERVICES,
  SERVICE_AREAS,
} from "@/lib/constants";

const BASE = "https://lawn-laser.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await db
    .select({ slug: blogPosts.slug, updatedAt: blogPosts.updatedAt })
    .from(blogPosts)
    .where(eq(blogPosts.isPublished, true));

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/lawn-care`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/pest-control`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/service-areas`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/get-a-quote`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/awards`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/careers`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/gallery`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const servicePages: MetadataRoute.Sitemap = [
    ...LAWN_CARE_SERVICES.map((s) => ({
      url: `${BASE}/lawn-care/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...PEST_CONTROL_SERVICES.map((s) => ({
      url: `${BASE}/pest-control/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  const areaPages: MetadataRoute.Sitemap = SERVICE_AREAS.map((a) => ({
    url: `${BASE}/service-areas/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...areaPages, ...blogPages];
}
