import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const CACHE_KEY = "reviews:summary";
const CACHE_TTL = 60 * 60; // 1 hour in seconds

export async function GET() {
  try {
    const cached = await redis.get(CACHE_KEY);

    if (cached) {
      return NextResponse.json(
        typeof cached === "string" ? JSON.parse(cached) : cached
      );
    }

    // TODO: Fetch from reviews provider (Google Business, etc.)
    const data = {
      rating: 4.8,
      count: 1700,
      reviews: [] as {
        id: string;
        author: string;
        rating: number;
        text: string;
        date: string;
      }[],
    };

    await redis.set(CACHE_KEY, JSON.stringify(data), { ex: CACHE_TTL });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Reviews API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
