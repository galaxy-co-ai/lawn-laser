import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Calendar, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  return (
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
          <div className="mb-8 overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        <div
          className="blog-content max-w-none text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a:hover]:text-primary/80 [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-foreground [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_strong]:text-foreground [&_img]:my-6 [&_img]:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </section>
  );
}
