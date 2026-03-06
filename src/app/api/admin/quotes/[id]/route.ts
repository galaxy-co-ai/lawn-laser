import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { quotes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const VALID_STATUSES = ["pending", "accepted", "rejected", "expired"] as const;

const updateSchema = z.object({
  status: z.enum(VALID_STATUSES).optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = updateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const [updated] = await db
      .update(quotes)
      .set({ ...result.data, updatedAt: new Date() })
      .where(eq(quotes.id, id))
      .returning({ id: quotes.id, status: quotes.status });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Quote not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Admin quote update error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
