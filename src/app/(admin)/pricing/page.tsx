import Link from "next/link";
import { db } from "@/lib/db";
import { pricingRules, services } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { PricingTable } from "@/components/admin/pricing-table";

export default async function PricingPage() {
  const [allRules, allServices] = await Promise.all([
    db
      .select({
        id: pricingRules.id,
        serviceId: pricingRules.serviceId,
        serviceAreaId: pricingRules.serviceAreaId,
        pricePerSqFt: pricingRules.pricePerSqFt,
        flatPrice: pricingRules.flatPrice,
        minPrice: pricingRules.minPrice,
        maxPrice: pricingRules.maxPrice,
        isActive: pricingRules.isActive,
        updatedAt: pricingRules.updatedAt,
        serviceName: services.name,
        serviceSlug: services.slug,
        serviceCategory: services.category,
      })
      .from(pricingRules)
      .innerJoin(services, eq(pricingRules.serviceId, services.id))
      .orderBy(services.sortOrder),
    db
      .select({
        id: services.id,
        name: services.name,
        slug: services.slug,
        category: services.category,
      })
      .from(services)
      .where(eq(services.isActive, true))
      .orderBy(services.sortOrder),
  ]);

  const serviceIdsWithRules = new Set(allRules.map((r) => r.serviceId));

  const lawnRules = allRules.filter((r) => r.serviceCategory === "lawn-care");
  const pestRules = allRules.filter((r) => r.serviceCategory === "pest-control");

  const lawnServicesWithoutRules = allServices.filter(
    (s) => s.category === "lawn-care" && !serviceIdsWithRules.has(s.id)
  );
  const pestServicesWithoutRules = allServices.filter(
    (s) => s.category === "pest-control" && !serviceIdsWithRules.has(s.id)
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Pricing Management</h1>
        <div className="flex gap-2">
          <Link
            href="/pricing/geopricing"
            className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Geopricing
          </Link>
          <Link
            href="/pricing/packages"
            className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Packages
          </Link>
        </div>
      </div>

      <PricingTable
        category="lawn-care"
        label="Lawn Care — Per Square Foot"
        rules={lawnRules}
        servicesWithoutRules={lawnServicesWithoutRules}
      />

      <PricingTable
        category="pest-control"
        label="Pest Control — Flat Rate"
        rules={pestRules}
        servicesWithoutRules={pestServicesWithoutRules}
      />
    </div>
  );
}
