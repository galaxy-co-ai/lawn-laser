import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { pricingRules, services } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const createPricingRuleSchema = z.object({
  serviceId: z.string().uuid(),
  serviceAreaId: z.string().uuid().optional(),
  pricePerSqFt: z.number().positive().optional(),
  flatPrice: z.number().positive().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  isActive: z.boolean().default(true),
});

export async function GET() {
  try {
    const rules = await db
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
      .orderBy(services.category, services.sortOrder);

    return NextResponse.json({ success: true, data: rules });
  } catch (error) {
    console.error("Admin pricing list error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = createPricingRuleSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { serviceId, serviceAreaId, pricePerSqFt, flatPrice, minPrice, maxPrice, isActive } =
      result.data;

    const [rule] = await db
      .insert(pricingRules)
      .values({
        serviceId,
        serviceAreaId: serviceAreaId ?? null,
        pricePerSqFt: pricePerSqFt ?? null,
        flatPrice: flatPrice ?? null,
        minPrice: minPrice ?? null,
        maxPrice: maxPrice ?? null,
        isActive,
      })
      .returning();

    return NextResponse.json({ success: true, data: rule }, { status: 201 });
  } catch (error) {
    console.error("Admin pricing create error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
