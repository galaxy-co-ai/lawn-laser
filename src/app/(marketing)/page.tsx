import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Oklahoma City's top-rated lawn care & pest control | Elite Lawn Care",
  description: `${BUSINESS.reviewCount}+ five-star reviews. Inc. 5000 honoree. Professional lawn care and pest control across the OKC metro.`,
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="section-gap bg-background">
        <div className="container-marketing flex flex-col items-center text-center gap-6">
          <h1 className="text-display text-foreground">
            Oklahoma City&apos;s top-rated lawn care &amp; pest control
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {BUSINESS.reviewCount}+ five-star reviews. Inc. 5000 honoree. Trusted
            by thousands of Oklahoma homeowners since {BUSINESS.founded}.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/get-a-quote"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-[--duration-fast] hover:bg-primary/90"
            >
              Get an instant quote
            </Link>
            <a
              href={`tel:${BUSINESS.phone.replace(/[^\d+]/g, "")}`}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors duration-[--duration-fast] hover:bg-secondary"
            >
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-gap bg-muted">
        <div className="container-marketing">
          <h2 className="text-foreground text-center mb-8">Our services</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/lawn-care"
              className="rounded-xl border border-border bg-card p-8 transition-shadow duration-[--duration-fast] hover:shadow-[--shadow-md]"
            >
              <h3 className="text-foreground mb-2">Lawn care</h3>
              <p className="text-muted-foreground">
                Fertilization, weed control, aeration, overseeding, and more —
                customized for Oklahoma soil and climate.
              </p>
            </Link>
            <Link
              href="/pest-control"
              className="rounded-xl border border-border bg-card p-8 transition-shadow duration-[--duration-fast] hover:shadow-[--shadow-md]"
            >
              <h3 className="text-foreground mb-2">Pest control</h3>
              <p className="text-muted-foreground">
                Perimeter pest control, mosquito treatments, flea &amp; tick,
                armyworm, and seasonal pest management.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Why section */}
      <section className="section-gap bg-background">
        <div className="container-marketing">
          <h2 className="text-foreground text-center mb-10">
            Why Oklahoma City trusts Elite
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Body cameras on every visit",
                description:
                  "Full transparency — see exactly what was done on your property.",
              },
              {
                title: "In-house agronomist",
                description:
                  "Science-backed lawn programs designed by a certified turf expert.",
              },
              {
                title: "Blue dye coverage verification",
                description:
                  "Visual proof of complete, even coverage on every application.",
              },
              {
                title: "Free resprays guaranteed",
                description:
                  "Not satisfied? We come back and retreat at no extra cost.",
              },
              {
                title: "Custom Oklahoma fertilizer blends",
                description:
                  "Formulated specifically for Oklahoma's unique soil and climate.",
              },
              {
                title: "20+ years of experience",
                description: `Serving the OKC metro since ${BUSINESS.founded}. We know Oklahoma lawns.`,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h3 className="text-foreground text-base font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="section-gap bg-muted">
        <div className="container-marketing text-center">
          <div className="flex flex-col items-center gap-4">
            <p className="text-4xl font-bold text-foreground">
              {BUSINESS.googleRating} / 5.0
            </p>
            <p className="text-lg text-muted-foreground">
              Based on {BUSINESS.reviewCount}+ verified Google reviews
            </p>
            <p className="text-sm text-muted-foreground">
              Inc. 5000 fastest-growing companies (2022 - 2025) &middot; BBB A+ rated
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-primary">
        <div className="container-marketing text-center">
          <h2 className="text-primary-foreground mb-4">
            Get your free instant quote
          </h2>
          <p className="text-primary-foreground/80 mb-6 mx-auto">
            Tell us about your property and get a price in minutes — no phone
            call required.
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
