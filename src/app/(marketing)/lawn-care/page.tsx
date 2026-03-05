import type { Metadata } from "next";
import Link from "next/link";
import { LAWN_CARE_SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Lawn care services | Elite Lawn Care",
  description:
    "Professional lawn care services in Oklahoma City — fertilization, weed control, aeration, overseeding, and more.",
};

export default function LawnCarePage() {
  return (
    <>
      <section className="section-gap bg-background">
        <div className="container-marketing">
          <h1 className="text-foreground mb-4">Lawn care services</h1>
          <p className="text-lg text-muted-foreground mb-10">
            Science-backed programs customized for Oklahoma&apos;s soil and
            climate. Every treatment is verified with body cameras and blue dye
            coverage.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LAWN_CARE_SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/lawn-care/${service.slug}`}
                className="rounded-xl border border-border bg-card p-6 transition-shadow duration-[--duration-fast] hover:shadow-[--shadow-md]"
              >
                <h3 className="text-foreground text-base font-semibold mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Learn more about our {service.name.toLowerCase()} service.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-primary">
        <div className="container-marketing text-center">
          <h2 className="text-primary-foreground mb-4">
            Ready for a healthier lawn?
          </h2>
          <p className="text-primary-foreground/80 mb-6 mx-auto">
            Get a free instant quote — no phone call required.
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
