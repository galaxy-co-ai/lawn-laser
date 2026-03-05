import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICE_AREAS, BUSINESS } from "@/lib/constants";

type Props = {
  params: Promise<{ city: string }>;
};

export async function generateStaticParams() {
  return SERVICE_AREAS.map((a) => ({ city: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const found = SERVICE_AREAS.find((a) => a.slug === city);
  if (!found) return {};

  return {
    title: `Lawn care & pest control in ${found.name} | Elite Lawn Care`,
    description: `Professional lawn care and pest control services in ${found.name}, OK. ${BUSINESS.reviewCount}+ reviews. Free instant quotes.`,
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const found = SERVICE_AREAS.find((a) => a.slug === city);

  if (!found) notFound();

  return (
    <>
      <section className="section-gap bg-background">
        <div className="container-marketing">
          <p className="text-sm text-muted-foreground mb-2">
            <Link
              href="/service-areas"
              className="hover:text-primary transition-colors duration-[--duration-fast]"
            >
              Service areas
            </Link>{" "}
            / {found.name}
          </p>
          <h1 className="text-foreground mb-4">
            Lawn care &amp; pest control in {found.name}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Elite Lawn Care provides professional lawn care and pest control
            services to homeowners in {found.name}, Oklahoma. Backed by{" "}
            {BUSINESS.reviewCount}+ five-star reviews and our free respray
            guarantee.
          </p>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-foreground text-base font-semibold mb-2">
                Lawn care
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Fertilization, weed control, aeration, overseeding, and
                more — customized for {found.name} lawns.
              </p>
              <Link
                href="/lawn-care"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-[--duration-fast]"
              >
                View lawn care services
              </Link>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-foreground text-base font-semibold mb-2">
                Pest control
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Perimeter pest, mosquito, flea &amp; tick, and seasonal pest
                management for {found.name} homes.
              </p>
              <Link
                href="/pest-control"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-[--duration-fast]"
              >
                View pest control services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-primary">
        <div className="container-marketing text-center">
          <h2 className="text-primary-foreground mb-4">
            Get a free quote in {found.name}
          </h2>
          <p className="text-primary-foreground/80 mb-6 mx-auto">
            Instant quotes — no phone call required.
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
