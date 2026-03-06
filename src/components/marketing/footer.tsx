import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { BUSINESS, SERVICE_AREAS, LAWN_CARE_SERVICES, PEST_CONTROL_SERVICES } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container-marketing section-gap">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="flex flex-col gap-4">
            <span className="text-lg font-bold text-primary">{BUSINESS.name}</span>
            <p className="text-sm text-muted-foreground">
              Oklahoma City&apos;s top-rated lawn care and pest control since {BUSINESS.founded}. Inc. 5000 company with {BUSINESS.reviewCount}+ 5-star reviews.
            </p>
            <div className="flex flex-col gap-0.5 text-sm">
              <a
                href={`tel:${BUSINESS.phone.replace(/[^0-9]/g, "")}`}
                className="flex items-center gap-2 py-1.5 text-foreground/80 transition-colors hover:text-foreground"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {BUSINESS.phone}
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="flex items-center gap-2 py-1.5 text-foreground/80 transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {BUSINESS.email}
              </a>
              <div className="flex items-start gap-2 text-foreground/80">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
                </span>
              </div>
            </div>
          </div>

          {/* Lawn Care */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">Lawn Care</h3>
            <nav className="flex flex-col gap-0.5">
              {LAWN_CARE_SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/lawn-care/${service.slug}`}
                  className="py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {service.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Pest Control */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">Pest Control</h3>
            <nav className="flex flex-col gap-0.5">
              {PEST_CONTROL_SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/pest-control/${service.slug}`}
                  className="py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {service.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Service Areas */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">Service Areas</h3>
            <nav className="flex flex-col gap-0.5">
              {SERVICE_AREAS.slice(0, 8).map((area) => (
                <Link
                  key={area.slug}
                  href={`/service-areas/${area.slug}`}
                  className="py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {area.name}
                </Link>
              ))}
              <Link
                href="/service-areas"
                className="py-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                View all areas
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="py-2 transition-colors hover:text-foreground">
              Privacy policy
            </Link>
            <Link href="/terms" className="py-2 transition-colors hover:text-foreground">
              Terms of service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
