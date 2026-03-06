import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { quotes, quoteItems, leads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const createQuoteSchema = z.object({
  lead: z.object({
    firstName: z.string().min(1),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
  measurementId: z.string().uuid(),
  items: z
    .array(
      z.object({
        serviceId: z.string().uuid(),
        unitPrice: z.number().positive(),
        quantity: z.number().int().positive().default(1),
      })
    )
    .min(1),
  expiresInDays: z.number().int().positive().default(30),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = createQuoteSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { lead: leadData, measurementId, items, expiresInDays } = result.data;

    // Create lead
    const [lead] = await db
      .insert(leads)
      .values({
        firstName: leadData.firstName,
        lastName: leadData.lastName,
        email: leadData.email,
        phone: leadData.phone,
        address: leadData.address,
        source: "admin",
        status: "quoted",
      })
      .returning({ id: leads.id });

    // Calculate total
    const totalPrice = items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );

    // Create quote
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    const [quote] = await db
      .insert(quotes)
      .values({
        leadId: lead.id,
        measurementId,
        totalPrice: Math.round(totalPrice),
        status: "pending",
        expiresAt,
      })
      .returning({ id: quotes.id });

    // Create quote items
    await db.insert(quoteItems).values(
      items.map((item) => ({
        quoteId: quote.id,
        serviceId: item.serviceId,
        unitPrice: item.unitPrice,
        totalPrice: item.unitPrice * item.quantity,
        quantity: item.quantity,
      }))
    );

    return NextResponse.json(
      { success: true, data: { quoteId: quote.id, leadId: lead.id } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin quote create error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
