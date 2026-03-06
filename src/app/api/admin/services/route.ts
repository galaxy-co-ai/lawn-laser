import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";

const createServiceSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  category: z.enum(["lawn-care", "pest-control"]),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = createServiceSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const [service] = await db
      .insert(services)
      .values(result.data)
      .returning();

    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error) {
    console.error("Admin service create error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
