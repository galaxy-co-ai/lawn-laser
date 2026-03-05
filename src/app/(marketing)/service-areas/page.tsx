import type { Metadata } from "next";
import Link from "next/link";
import { SERVICE_AREAS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Service areas | Elite Lawn Care",
  description:
    "Elite Lawn Care serves 17 cities across the Oklahoma City metro including Edmond, Norman, Moore, Yukon, and more.",
};

export default function ServiceAreasPage() {
  return (
    <section className="section-gap bg-background">
      <div className="container-marketing">
        <h1 className="text-foreground mb-4">Service areas</h1>
        <p className="text-lg text-muted-foreground mb-10">
          We proudly serve homeowners across 17 cities in the Oklahoma City
          metro area. Select your city to learn more about services available in
          your area.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {SERVICE_AREAS.map((area) => (
            <Link
              key={area.slug}
              href={`/service-areas/${area.slug}`}
              className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors duration-[--duration-fast] hover:bg-secondary hover:text-secondary-foreground"
            >
              {area.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
