import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wrench } from "lucide-react";
import { db } from "@/lib/db";
import { services, pricingRules } from "@/lib/db/schema";
import { ActiveToggle } from "@/components/admin/active-toggle";
import Link from "next/link";

export default async function ServicesPage() {
  const allServices = await db
    .select({
      id: services.id,
      name: services.name,
      slug: services.slug,
      category: services.category,
      shortDescription: services.shortDescription,
      isActive: services.isActive,
      sortOrder: services.sortOrder,
    })
    .from(services)
    .orderBy(services.category, services.sortOrder);

  const allPricing = await db
    .select({
      serviceId: pricingRules.serviceId,
      pricePerSqFt: pricingRules.pricePerSqFt,
      flatPrice: pricingRules.flatPrice,
      minPrice: pricingRules.minPrice,
      maxPrice: pricingRules.maxPrice,
      isActive: pricingRules.isActive,
    })
    .from(pricingRules);

  const pricingByService = new Map<string, (typeof allPricing)[0]>();
  for (const rule of allPricing) {
    pricingByService.set(rule.serviceId, rule);
  }

  const lawnServices = allServices.filter((s) => s.category === "lawn-care");
  const pestServices = allServices.filter((s) => s.category === "pest-control");

  function renderServiceTable(
    title: string,
    serviceList: typeof allServices
  ) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {title} ({serviceList.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {serviceList.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
              <Wrench className="h-8 w-8" />
              <p>No services configured</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Service</th>
                    <th className="pb-3 pr-4 font-medium">Pricing</th>
                    <th className="pb-3 pr-4 font-medium">Min / Max</th>
                    <th className="pb-3 font-medium text-center">Active</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceList.map((svc) => {
                    const pricing = pricingByService.get(svc.id);
                    return (
                      <tr
                        key={svc.id}
                        className="border-b border-border last:border-0"
                      >
                        <td className="py-3 pr-4">
                          <p className="font-medium text-foreground">
                            {svc.name}
                          </p>
                          {svc.shortDescription && (
                            <p className="text-xs text-muted-foreground">
                              {svc.shortDescription}
                            </p>
                          )}
                        </td>
                        <td className="py-3 pr-4 text-muted-foreground">
                          {pricing?.pricePerSqFt
                            ? `$${pricing.pricePerSqFt}/sqft`
                            : pricing?.flatPrice
                              ? `$${pricing.flatPrice} flat`
                              : (
                                <Link
                                  href="/pricing"
                                  className="text-primary hover:underline"
                                >
                                  Set pricing
                                </Link>
                              )}
                        </td>
                        <td className="py-3 pr-4 text-muted-foreground">
                          {pricing
                            ? `$${pricing.minPrice ?? "—"} / $${pricing.maxPrice ?? "—"}`
                            : "—"}
                        </td>
                        <td className="py-3 text-center">
                          <ActiveToggle
                            id={svc.id}
                            isActive={svc.isActive}
                            endpoint="services"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">
        Service Management
      </h1>

      {renderServiceTable("Lawn Care", lawnServices)}
      {renderServiceTable("Pest Control", pestServices)}
    </div>
  );
}
