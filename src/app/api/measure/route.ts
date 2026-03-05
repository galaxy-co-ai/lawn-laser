import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { measurementLimiter } from "@/lib/redis";

const measureSchema = z.object({
  address: z.string().min(1, "Address is required"),
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

    // TODO: Integrate with measurement service (Google Maps / Nearmap)
    const data = {
      address,
      lat: 0,
      lng: 0,
      lawnSqFt: 0,
      lotSqFt: 0,
      buildingFootprintSqFt: 0,
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Measure API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
