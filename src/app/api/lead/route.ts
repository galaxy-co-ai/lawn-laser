import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";

const leadSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  source: z.string().optional().default("website"),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, firstName, lastName, ...rest } = result.data;

    // Support both "name" (single field) and "firstName"/"lastName" (split)
    let first = firstName;
    let last = lastName;
    if (name && !firstName) {
      const parts = name.trim().split(/\s+/);
      first = parts[0];
      last = parts.length > 1 ? parts.slice(1).join(" ") : undefined;
    }

    const [lead] = await db
      .insert(leads)
      .values({
        firstName: first,
        lastName: last,
        ...rest,
      })
      .returning({ id: leads.id });

    return NextResponse.json(
      { success: true, data: { leadId: lead.id } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
