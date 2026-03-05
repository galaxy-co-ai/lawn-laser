import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Elite Lawn Care",
  description:
    "Before and after photos of lawn care and pest control results across the Oklahoma City metro.",
};

export default function GalleryPage() {
  return (
    <section className="section-gap bg-background">
      <div className="container-marketing">
        <h1 className="text-foreground mb-4">Gallery</h1>
        <p className="text-lg text-muted-foreground mb-10">
          See the results — before and after transformations from real Oklahoma
          properties.
        </p>

        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">
            Photo gallery coming soon. Check back to see before and after lawn
            transformations, treatment coverage shots, and seasonal results.
          </p>
        </div>
      </div>
    </section>
  );
}
