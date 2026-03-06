import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { services, serviceAreas } from "../src/lib/db/schema";
import {
  LAWN_CARE_SERVICES,
  PEST_CONTROL_SERVICES,
  SERVICE_AREAS,
} from "../src/lib/constants";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  console.log("Seeding services...");

  // Lawn care services
  for (let i = 0; i < LAWN_CARE_SERVICES.length; i++) {
    const s = LAWN_CARE_SERVICES[i];
    await db.insert(services).values({
      name: s.name,
      slug: s.slug,
      category: "lawn-care",
      sortOrder: i,
    });
  }

  // Pest control services
  for (let i = 0; i < PEST_CONTROL_SERVICES.length; i++) {
    const s = PEST_CONTROL_SERVICES[i];
    await db.insert(services).values({
      name: s.name,
      slug: s.slug,
      category: "pest-control",
      sortOrder: i,
    });
  }

  console.log(`  ✓ ${LAWN_CARE_SERVICES.length + PEST_CONTROL_SERVICES.length} services`);

  console.log("Seeding service areas...");

  for (const area of SERVICE_AREAS) {
    await db.insert(serviceAreas).values({
      name: area.name,
      slug: area.slug,
    });
  }

  console.log(`  ✓ ${SERVICE_AREAS.length} service areas`);
  console.log("Done.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
