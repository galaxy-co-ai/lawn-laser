import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog | Elite Lawn Care",
  description:
    "Lawn care tips, pest control guides, and seasonal advice for Oklahoma homeowners.",
};

export const revalidate = 300; // ISR: 5 minutes

export default async function BlogPage() {
  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.isPublished, true))
    .orderBy(desc(blogPosts.publishedAt));

  return (
    <section className="section-gap bg-background">
      <div className="container-marketing">
        <h1 className="mb-4 text-foreground">Blog</h1>
        <p className="mb-10 text-lg text-muted-foreground">
          Lawn care tips, pest control guides, and seasonal advice for Oklahoma
          homeowners.
        </p>

        {posts.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              Blog posts coming soon. Check back for seasonal lawn care tips,
              pest identification guides, and Oklahoma-specific turf advice.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border border-border bg-card transition-all duration-[var(--duration-fast)] hover:shadow-[var(--shadow-md)]"
              >
                {post.featuredImage && (
                  <div className="aspect-[16/9] overflow-hidden rounded-t-xl bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-[var(--duration-smooth)] group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  {post.category && (
                    <Badge variant="secondary" className="mb-2">
                      {post.category}
                    </Badge>
                  )}
                  <h2 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                  )}
                  {post.publishedAt && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.publishedAt.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
