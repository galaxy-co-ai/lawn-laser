import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { quoteLimiter } from "@/lib/redis";

const quoteSchema = z.object({
  measurementId: z.string().min(1, "Measurement ID is required"),
  serviceIds: z.array(z.string()).min(1, "At least one service is required"),
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

    const { measurementId, serviceIds } = result.data;

    // TODO: Calculate quote from measurement data + selected services
    const data = {
      quoteId: crypto.randomUUID(),
      measurementId,
      serviceIds,
      items: [] as { serviceId: string; name: string; price: number }[],
      totalPrice: 0,
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
