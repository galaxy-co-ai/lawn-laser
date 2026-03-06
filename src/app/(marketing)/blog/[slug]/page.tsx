import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq, ne, desc, and } from "drizzle-orm";
import { Calendar, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ArticleJsonLd } from "@/components/marketing/json-ld";
import { embedYouTubeVideos } from "@/lib/youtube-embed";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);

  if (!post) return {};

  return {
    title: `${post.title} | Blog | Elite Lawn Care`,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);

  if (!post || !post.isPublished) notFound();

  // Fetch related posts (same category, excluding current)
  const relatedPosts = post.category
    ? await db
        .select({
          id: blogPosts.id,
          title: blogPosts.title,
          slug: blogPosts.slug,
          excerpt: blogPosts.excerpt,
          featuredImage: blogPosts.featuredImage,
          category: blogPosts.category,
          publishedAt: blogPosts.publishedAt,
        })
        .from(blogPosts)
        .where(
          and(
            eq(blogPosts.isPublished, true),
            eq(blogPosts.category, post.category!),
            ne(blogPosts.id, post.id)
          )
        )
        .orderBy(desc(blogPosts.publishedAt))
        .limit(3)
    : [];

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        slug={post.slug}
        excerpt={post.excerpt}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        featuredImage={post.featuredImage}
        category={post.category}
      />

      <section className="section-gap bg-background">
        <div className="container-reading">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-[var(--duration-fast)] hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          {post.category && (
            <Badge variant="secondary" className="mb-3">
              {post.category}
            </Badge>
          )}

          <h1 className="mb-4 text-foreground">{post.title}</h1>

          {post.publishedAt && (
            <div className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {post.publishedAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          )}

          {post.featuredImage && (
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 720px) 100vw, 720px"
                priority
              />
            </div>
          )}

          <div
            className="blog-content max-w-none text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a:hover]:text-primary/80 [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-foreground [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_strong]:text-foreground [&_img]:my-6 [&_img]:rounded-xl"
            dangerouslySetInnerHTML={{ __html: embedYouTubeVideos(post.content) }}
          />
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-gap bg-muted">
          <div className="container-marketing">
            <h2 className="mb-6 text-foreground">Related articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group rounded-xl border border-border bg-card transition-all duration-[var(--duration-fast)] hover:shadow-[var(--shadow-md)]"
                >
                  {related.featuredImage && (
                    <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl bg-muted">
                      <Image
                        src={related.featuredImage}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-[var(--duration-smooth)] group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="mb-2 text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary">
                      {related.title}
                    </h3>
                    {related.publishedAt && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {related.publishedAt.toLocaleDateString("en-US", {
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
          </div>
        </section>
      )}
    </>
  );
}
