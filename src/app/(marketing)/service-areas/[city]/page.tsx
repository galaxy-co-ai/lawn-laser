import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { SERVICE_AREAS, BUSINESS } from "@/lib/constants";
import { CITY_CONTENT } from "@/lib/city-content";
import { CityLocalBusinessJsonLd } from "@/components/marketing/json-ld";
import { QuoteWidget } from "@/components/quote/quote-widget";

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

  const content = CITY_CONTENT[city];
  return {
    title: `Lawn care & pest control in ${found.name} | Elite Lawn Care`,
    description:
      content?.intro.slice(0, 155) ??
      `Professional lawn care and pest control services in ${found.name}, OK. ${BUSINESS.reviewCount}+ reviews. Free instant quotes.`,
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const found = SERVICE_AREAS.find((a) => a.slug === city);

  if (!found) notFound();

  const content = CITY_CONTENT[city];

  return (
    <>
      <CityLocalBusinessJsonLd cityName={found.name} citySlug={found.slug} />

      <section className="section-gap bg-background">
        <div className="container-marketing">
          <p className="text-sm text-muted-foreground mb-2">
            <Link
              href="/service-areas"
              className="hover:text-primary transition-colors duration-[var(--duration-fast)]"
            >
              Service areas
            </Link>{" "}
            / {found.name}
          </p>
          <h1 className="text-foreground mb-4">
            Lawn care &amp; pest control in {found.name}
          </h1>

          {content ? (
            <>
              <p className="text-lg text-muted-foreground mb-8">
                {content.intro}
              </p>

              {/* Highlights */}
              <div className="mb-8">
                <ul className="space-y-3">
                  {content.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Local facts */}
              <div className="mb-8 rounded-xl border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">
                  {content.localFacts}
                </p>
              </div>
            </>
          ) : (
            <p className="text-lg text-muted-foreground mb-8">
              Elite Lawn Care provides professional lawn care and pest control
              services to homeowners in {found.name}, Oklahoma. Backed by{" "}
              {BUSINESS.reviewCount}+ five-star reviews and our free respray
              guarantee.
            </p>
          )}

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
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-[var(--duration-fast)]"
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
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-[var(--duration-fast)]"
              >
                View pest control services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Inline quote widget */}
      <section className="section-gap bg-muted/50">
        <div className="container-marketing">
          <h2 className="text-foreground text-center mb-2">
            Get a free quote in {found.name}
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Instant quotes — no phone call required.
          </p>
          <div className="flex justify-center">
            <QuoteWidget preselectedArea={found.name} />
          </div>
        </div>
      </section>
    </>
  );
}
