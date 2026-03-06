import { db } from "@/lib/db";
import { services, pricingRules } from "@/lib/db/schema";
import { eq, and, inArray } from "drizzle-orm";

export type QuoteLineItem = {
  serviceId: string;
  serviceName: string;
  serviceSlug: string;
  category: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
};

export type QuoteCalculation = {
  items: QuoteLineItem[];
  subtotal: number;
  totalPrice: number;
};

/**
 * Calculate pricing for selected services based on property measurements.
 *
 * Lawn care services use per-sq-ft pricing (clamped to min/max).
 * Pest control services use flat pricing.
 */
export async function calculateQuote(
  serviceIds: string[],
  lawnSqFt: number,
  buildingFootprintSqFt: number
): Promise<QuoteCalculation> {
  // Fetch services + pricing rules in one go
  const allServices = await db
    .select({
      id: services.id,
      name: services.name,
      slug: services.slug,
      category: services.category,
      pricePerSqFt: pricingRules.pricePerSqFt,
      flatPrice: pricingRules.flatPrice,
      minPrice: pricingRules.minPrice,
      maxPrice: pricingRules.maxPrice,
    })
    .from(services)
    .innerJoin(
      pricingRules,
      and(
        eq(pricingRules.serviceId, services.id),
        eq(pricingRules.isActive, true)
      )
    )
    .where(
      and(eq(services.isActive, true), inArray(services.id, serviceIds))
    );

  const items: QuoteLineItem[] = [];

  for (const svc of allServices) {
    let unitPrice: number;

    if (svc.category === "lawn-care" && svc.pricePerSqFt) {
      // Lawn services: price per sq ft, clamped
      const rawPrice = lawnSqFt * svc.pricePerSqFt;
      unitPrice = Math.max(
        svc.minPrice ?? 0,
        Math.min(rawPrice, svc.maxPrice ?? Infinity)
      );
    } else if (svc.flatPrice) {
      // Pest services: flat rate
      unitPrice = svc.flatPrice;
    } else {
      // Fallback to minimum
      unitPrice = svc.minPrice ?? 0;
    }

    // Round to nearest dollar
    unitPrice = Math.round(unitPrice);

    items.push({
      serviceId: svc.id,
      serviceName: svc.name,
      serviceSlug: svc.slug,
      category: svc.category,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice,
    });
  }

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return {
    items,
    subtotal,
    totalPrice: subtotal,
  };
}
