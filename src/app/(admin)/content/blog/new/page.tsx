import { BlogPostForm } from "@/components/admin/blog-post-form";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">New Blog Post</h1>
      <BlogPostForm />
    </div>
  );
}
