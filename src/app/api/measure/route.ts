import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { measurements } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { measurementLimiter } from "@/lib/redis";

const measureSchema = z.object({
  address: z.string().min(5, "Please enter a full address"),
});

// Average lot sizes by OKC metro zip code prefix (in sq ft)
// Source: typical residential lots in Oklahoma City metro
const OKC_AVG_LOT_SQFT: Record<string, number> = {
  "730": 8500, // Central OKC
  "731": 9500, // South OKC / Moore / Norman
  "732": 10000, // Edmond area
  "733": 12000, // Rural edges (Tuttle, Blanchard)
  "734": 11000, // Mustang / Yukon
  "735": 8000, // Midwest City / Del City
};

const DEFAULT_LOT_SQFT = 9000;
const BUILDING_RATIO = 0.18; // ~18% of lot is building footprint
const HARDSCAPE_RATIO = 0.12; // ~12% of lot is driveway/sidewalk

function estimateMeasurements(address: string) {
  // Extract zip code from address
  const zipMatch = address.match(/\b(\d{5})(?:-\d{4})?\b/);
  const zip = zipMatch?.[1];
  const prefix = zip?.slice(0, 3);

  const lotSqFt = (prefix && OKC_AVG_LOT_SQFT[prefix]) || DEFAULT_LOT_SQFT;
  const buildingFootprintSqFt = Math.round(lotSqFt * BUILDING_RATIO);
  const hardscapeSqFt = Math.round(lotSqFt * HARDSCAPE_RATIO);
  const lawnSqFt = lotSqFt - buildingFootprintSqFt - hardscapeSqFt;

  // Mock lat/lng for OKC metro center
  const lat = 35.4676 + (Math.random() - 0.5) * 0.1;
  const lng = -97.5164 + (Math.random() - 0.5) * 0.1;

  return {
    lat: Math.round(lat * 10000) / 10000,
    lng: Math.round(lng * 10000) / 10000,
    lotSqFt,
    buildingFootprintSqFt,
    lawnSqFt,
    drivewaySqFt: Math.round(hardscapeSqFt * 0.7),
    sidewalkSqFt: Math.round(hardscapeSqFt * 0.3),
  };
}

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

    // TODO: Replace with real geocoding + satellite measurement when API keys are provisioned
    const estimated = estimateMeasurements(address);

    // Save to DB
    const [saved] = await db
      .insert(measurements)
      .values({
        address,
        lat: estimated.lat,
        lng: estimated.lng,
        lawnSqFt: estimated.lawnSqFt,
        lotSqFt: estimated.lotSqFt,
        buildingFootprintSqFt: estimated.buildingFootprintSqFt,
        drivewaySqFt: estimated.drivewaySqFt,
        sidewalkSqFt: estimated.sidewalkSqFt,
        source: "estimate",
      })
      .returning({ id: measurements.id });

    return NextResponse.json({
      success: true,
      data: {
        id: saved.id,
        address,
        ...estimated,
        source: "estimate",
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
