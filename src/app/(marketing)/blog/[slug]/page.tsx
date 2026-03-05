import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${title} | Blog | Elite Lawn Care`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <section className="section-gap bg-background">
      <div className="container-reading">
        <p className="text-sm text-muted-foreground mb-2">
          <Link
            href="/blog"
            className="hover:text-primary transition-colors duration-[--duration-fast]"
          >
            Blog
          </Link>{" "}
          / {title}
        </p>
        <h1 className="text-foreground mb-6">{title}</h1>
        <div className="rounded-xl border border-border bg-card p-8">
          <p className="text-muted-foreground">
            This blog post is coming soon.
          </p>
        </div>
      </div>
    </section>
  );
}
