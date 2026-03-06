import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { measurements } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { measurementLimiter } from "@/lib/redis";
import { measureProperty } from "@/lib/measurement";

const measureSchema = z.object({
  address: z.string().min(5, "Please enter a full address"),
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";

    const { success: allowed } = await measurementLimiter.limit(ip);
    if (!allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = measureSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { address } = result.data;

    // Check cache first
    const [existing] = await db
      .select()
      .from(measurements)
      .where(eq(measurements.address, address))
      .limit(1);

    if (existing) {
      return NextResponse.json({
        success: true,
        data: {
          id: existing.id,
          address: existing.address,
          lat: existing.lat,
          lng: existing.lng,
          lawnSqFt: existing.lawnSqFt,
          lotSqFt: existing.lotSqFt,
          buildingFootprintSqFt: existing.buildingFootprintSqFt,
          source: existing.source,
        },
      });
    }

    // Measure property using Google Geocoding + Regrid (with fallback)
    const measured = await measureProperty(address);

    // Save to DB
    const [saved] = await db
      .insert(measurements)
      .values({
        address: measured.formattedAddress,
        lat: measured.lat,
        lng: measured.lng,
        lawnSqFt: measured.lawnSqFt,
        lotSqFt: measured.lotSqFt,
        buildingFootprintSqFt: measured.buildingFootprintSqFt,
        drivewaySqFt: measured.drivewaySqFt,
        sidewalkSqFt: measured.sidewalkSqFt,
        source: measured.source,
      })
      .returning({ id: measurements.id });

    return NextResponse.json({
      success: true,
      data: {
        id: saved.id,
        address: measured.formattedAddress,
        lat: measured.lat,
        lng: measured.lng,
        lawnSqFt: measured.lawnSqFt,
        lotSqFt: measured.lotSqFt,
        buildingFootprintSqFt: measured.buildingFootprintSqFt,
        source: measured.source,
      },
    });
  } catch (error) {
    console.error("Measure API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
