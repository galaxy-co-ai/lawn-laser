import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Elite Lawn Care",
  description:
    "Lawn care tips, pest control guides, and seasonal advice for Oklahoma homeowners.",
};

export default function BlogPage() {
  return (
    <section className="section-gap bg-background">
      <div className="container-marketing">
        <h1 className="text-foreground mb-4">Blog</h1>
        <p className="text-lg text-muted-foreground mb-10">
          Lawn care tips, pest control guides, and seasonal advice for Oklahoma
          homeowners.
        </p>

        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">
            Blog posts coming soon. Check back for seasonal lawn care tips,
            pest identification guides, and Oklahoma-specific turf advice.
          </p>
        </div>
      </div>
    </section>
  );
}
