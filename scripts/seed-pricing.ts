import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { services, pricingRules } from "../src/lib/db/schema";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

// Realistic OKC lawn care pricing (based on industry averages)
// Lawn services: per sq ft pricing with min/max
// Pest services: flat pricing based on building perimeter/footprint
const PRICING: Record<
  string,
  { pricePerSqFt?: number; flatPrice?: number; minPrice: number; maxPrice: number }
> = {
  // Lawn Care (per sq ft)
  fertilization: { pricePerSqFt: 0.006, minPrice: 45, maxPrice: 350 },
  "weed-control": { pricePerSqFt: 0.005, minPrice: 45, maxPrice: 300 },
  "soil-conditioning": { pricePerSqFt: 0.008, minPrice: 75, maxPrice: 450 },
  "core-aeration": { pricePerSqFt: 0.012, minPrice: 85, maxPrice: 500 },
  "top-dressing": { pricePerSqFt: 0.015, minPrice: 150, maxPrice: 800 },
  overseeding: { pricePerSqFt: 0.01, minPrice: 100, maxPrice: 600 },
  "grub-control": { pricePerSqFt: 0.007, minPrice: 65, maxPrice: 400 },
  "spring-dead-spot": { pricePerSqFt: 0.009, minPrice: 85, maxPrice: 450 },

  // Pest Control (flat pricing)
  perimeter: { flatPrice: 65, minPrice: 45, maxPrice: 150 },
  mosquito: { flatPrice: 85, minPrice: 65, maxPrice: 175 },
  "flea-tick": { flatPrice: 75, minPrice: 55, maxPrice: 165 },
  chigger: { flatPrice: 70, minPrice: 50, maxPrice: 150 },
  armyworm: { flatPrice: 95, minPrice: 75, maxPrice: 200 },
  bagworm: { flatPrice: 110, minPrice: 85, maxPrice: 250 },
  webworm: { flatPrice: 110, minPrice: 85, maxPrice: 250 },
};

async function main() {
  console.log("Seeding pricing rules...\n");

  // Get all services
  const allServices = await db.select().from(services).where(eq(services.isActive, true));

  let inserted = 0;
  for (const svc of allServices) {
    const pricing = PRICING[svc.slug];
    if (!pricing) {
      console.log(`  SKIP ${svc.slug} — no pricing defined`);
      continue;
    }

    try {
      await db.insert(pricingRules).values({
        serviceId: svc.id,
        pricePerSqFt: pricing.pricePerSqFt ?? null,
        flatPrice: pricing.flatPrice ?? null,
        minPrice: pricing.minPrice,
        maxPrice: pricing.maxPrice,
        isActive: true,
      });
      console.log(
        `  OK   ${svc.slug} — ${
          pricing.pricePerSqFt
            ? `$${pricing.pricePerSqFt}/sqft`
            : `$${pricing.flatPrice} flat`
        } ($${pricing.minPrice}–$${pricing.maxPrice})`
      );
      inserted++;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`  ERR  ${svc.slug} — ${msg}`);
    }
  }

  console.log(`\nDone: ${inserted} pricing rules inserted.`);
}

main().catch(console.error);
