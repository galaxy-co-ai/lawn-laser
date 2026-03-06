import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { pricingRules } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const updatePricingRuleSchema = z.object({
  pricePerSqFt: z.number().positive().nullable().optional(),
  flatPrice: z.number().positive().nullable().optional(),
  minPrice: z.number().positive().nullable().optional(),
  maxPrice: z.number().positive().nullable().optional(),
  isActive: z.boolean().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = updatePricingRuleSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updates: Record<string, unknown> = { updatedAt: new Date() };
    const data = result.data;

    if (data.pricePerSqFt !== undefined) updates.pricePerSqFt = data.pricePerSqFt;
    if (data.flatPrice !== undefined) updates.flatPrice = data.flatPrice;
    if (data.minPrice !== undefined) updates.minPrice = data.minPrice;
    if (data.maxPrice !== undefined) updates.maxPrice = data.maxPrice;
    if (data.isActive !== undefined) updates.isActive = data.isActive;

    const [updated] = await db
      .update(pricingRules)
      .set(updates)
      .where(eq(pricingRules.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Pricing rule not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Admin pricing update error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [deleted] = await db
      .delete(pricingRules)
      .where(eq(pricingRules.id, id))
      .returning({ id: pricingRules.id });

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Pricing rule not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: { id: deleted.id } });
  } catch (error) {
    console.error("Admin pricing delete error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
