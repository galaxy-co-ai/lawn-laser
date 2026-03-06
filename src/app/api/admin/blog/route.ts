import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";

const createPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  category: z.string().optional(),
  featuredImage: z.string().url().optional(),
  isPublished: z.boolean().default(false),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = createPostSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const values = {
      ...result.data,
      publishedAt: result.data.isPublished ? new Date() : null,
    };

    const [post] = await db.insert(blogPosts).values(values).returning();

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    console.error("Admin blog create error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
