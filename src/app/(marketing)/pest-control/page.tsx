import type { Metadata } from "next";
import Link from "next/link";
import { PEST_CONTROL_SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pest control services | Elite Lawn Care",
  description:
    "Professional pest control services in Oklahoma City — perimeter pest, mosquito, flea & tick, and seasonal pest management.",
};

export default function PestControlPage() {
  return (
    <>
      <section className="section-gap bg-background">
        <div className="container-marketing">
          <h1 className="text-foreground mb-4">Pest control services</h1>
          <p className="text-lg text-muted-foreground mb-10">
            Keep your yard and home perimeter pest-free with targeted treatments
            designed for Oklahoma&apos;s pest pressure.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PEST_CONTROL_SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/pest-control/${service.slug}`}
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
            Ready to eliminate pests?
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
