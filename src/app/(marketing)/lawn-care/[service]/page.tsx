import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LAWN_CARE_SERVICES, BUSINESS } from "@/lib/constants";

type Props = {
  params: Promise<{ service: string }>;
};

export async function generateStaticParams() {
  return LAWN_CARE_SERVICES.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const found = LAWN_CARE_SERVICES.find((s) => s.slug === service);
  if (!found) return {};

  return {
    title: `${found.name} | Lawn care | Elite Lawn Care`,
    description: `Professional ${found.name.toLowerCase()} services in Oklahoma City from Elite Lawn Care.`,
  };
}

export default async function LawnServicePage({ params }: Props) {
  const { service } = await params;
  const found = LAWN_CARE_SERVICES.find((s) => s.slug === service);

  if (!found) notFound();

  return (
    <>
      <section className="section-gap bg-background">
        <div className="container-marketing">
          <p className="text-sm text-muted-foreground mb-2">
            <Link
              href="/lawn-care"
              className="hover:text-primary transition-colors duration-[--duration-fast]"
            >
              Lawn care
            </Link>{" "}
            / {found.name}
          </p>
          <h1 className="text-foreground mb-4">{found.name}</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Professional {found.name.toLowerCase()} services for Oklahoma City
            and the surrounding metro. Backed by {BUSINESS.reviewCount}+ reviews
            and our free respray guarantee.
          </p>
          <div className="rounded-xl border border-border bg-card p-8">
            <p className="text-muted-foreground">
              Detailed service content coming soon. This page will include
              pricing information, before/after photos, FAQ, and seasonal
              scheduling details.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-primary">
        <div className="container-marketing text-center">
          <h2 className="text-primary-foreground mb-4">
            Get a {found.name.toLowerCase()} quote
          </h2>
          <p className="text-primary-foreground/80 mb-6 mx-auto">
            Free instant quotes — no phone call required.
          </p>
          <Link
            href="/get-a-quote"
            className="inline-flex items-center justify-center rounded-lg bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors duration-[--duration-fast] hover:bg-background/90"
          >
            Get an instant quote
          </Link>
        </div>
      </section>
    </>
  );
}
