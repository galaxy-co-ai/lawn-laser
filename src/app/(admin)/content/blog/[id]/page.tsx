import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { BlogPostForm } from "@/components/admin/blog-post-form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;

  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);

  if (!post) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Edit Blog Post</h1>
      <BlogPostForm
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          category: post.category ?? "",
          featuredImage: post.featuredImage ?? "",
          isPublished: post.isPublished,
        }}
      />
    </div>
  );
}
