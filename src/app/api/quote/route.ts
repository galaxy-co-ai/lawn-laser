import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { measurements, quotes, quoteItems, leads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { quoteLimiter } from "@/lib/redis";
import { calculateQuote } from "@/lib/pricing";

const quoteSchema = z.object({
  measurementId: z.string().uuid("Invalid measurement ID"),
  serviceIds: z.array(z.string().uuid()).min(1, "Select at least one service"),
  // Optional lead info — captured before showing price
  lead: z
    .object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
    })
    .optional(),
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";

    const { success: allowed } = await quoteLimiter.limit(ip);
    if (!allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = quoteSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { measurementId, serviceIds, lead: leadInfo } = result.data;

    // Fetch measurement data
    const [measurement] = await db
      .select()
      .from(measurements)
      .where(eq(measurements.id, measurementId))
      .limit(1);

    if (!measurement) {
      return NextResponse.json(
        { success: false, error: "Measurement not found" },
        { status: 404 }
      );
    }

    // Calculate pricing
    const calculation = await calculateQuote(
      serviceIds,
      measurement.lawnSqFt ?? 0,
      measurement.buildingFootprintSqFt ?? 0
    );

    if (calculation.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "No valid services found for pricing" },
        { status: 400 }
      );
    }

    // Create or find lead
    let leadId: string | undefined;
    if (leadInfo?.email || leadInfo?.phone) {
      const [savedLead] = await db
        .insert(leads)
        .values({
          firstName: leadInfo.firstName,
          lastName: leadInfo.lastName,
          email: leadInfo.email,
          phone: leadInfo.phone,
          address: measurement.address,
          source: "widget",
          status: "new",
          measurementId: measurement.id,
          metadata: { serviceIds },
        })
        .returning({ id: leads.id });
      leadId = savedLead.id;
    }

    // Save quote if we have a lead
    let quoteId: string | undefined;
    if (leadId) {
      const [savedQuote] = await db
        .insert(quotes)
        .values({
          leadId,
          measurementId: measurement.id,
          totalPrice: calculation.totalPrice,
          status: "pending",
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          metadata: { source: "widget" },
        })
        .returning({ id: quotes.id });
      quoteId = savedQuote.id;

      // Save line items
      if (savedQuote.id) {
        await db.insert(quoteItems).values(
          calculation.items.map((item) => ({
            quoteId: savedQuote.id,
            serviceId: item.serviceId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          }))
        );
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        quoteId,
        measurementId,
        address: measurement.address,
        lawnSqFt: measurement.lawnSqFt,
        items: calculation.items.map((item) => ({
          serviceId: item.serviceId,
          name: item.serviceName,
          category: item.category,
          price: item.unitPrice,
        })),
        totalPrice: calculation.totalPrice,
      },
    });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
