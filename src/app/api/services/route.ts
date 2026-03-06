import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  try {
    const allServices = await db
      .select({
        id: services.id,
        name: services.name,
        slug: services.slug,
        category: services.category,
        shortDescription: services.shortDescription,
      })
      .from(services)
      .where(eq(services.isActive, true))
      .orderBy(asc(services.sortOrder));

    return NextResponse.json({
      success: true,
      data: allServices,
    });
  } catch (error) {
    console.error("Services API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
