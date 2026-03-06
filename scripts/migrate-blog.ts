import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { blogPosts } from "../src/lib/db/schema";
import { marked } from "marked";
import * as fs from "fs";
import * as path from "path";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const SCRAPE_DIR = path.resolve(
  __dirname,
  "../../.firecrawl/weedcontrolokc.com"
);

// Blog post directories (not site structure pages)
const SITE_PAGES = new Set([
  "about",
  "awards",
  "blog",
  "careers",
  "category",
  "contact",
  "gallery",
  "get-a-quote",
  "lawn-care",
  "learning-center",
  "location-page",
  "pest-control",
  "privacy",
  "service-areas",
  "sitemap",
  "terms",
  "blanchard-ok",
]);

// Category mapping based on content keywords
function categorize(title: string, content: string): string {
  const text = (title + " " + content).toLowerCase();
  if (
    text.includes("pest") ||
    text.includes("mosquito") ||
    text.includes("flea") ||
    text.includes("tick") ||
    text.includes("chigger") ||
    text.includes("armyworm") ||
    text.includes("bagworm") ||
    text.includes("webworm") ||
    text.includes("grub") ||
    text.includes("perimeter")
  )
    return "Pest Control";
  if (
    text.includes("fertiliz") ||
    text.includes("weed control") ||
    text.includes("pre-emergent") ||
    text.includes("nitrogen") ||
    text.includes("potassium")
  )
    return "Lawn Care";
  if (
    text.includes("aerat") ||
    text.includes("overseed") ||
    text.includes("soil condition") ||
    text.includes("top dress")
  )
    return "Lawn Care";
  if (text.includes("tree") || text.includes("holiday"))
    return "Seasonal Tips";
  return "Lawn Care";
}

function cleanContent(raw: string): string {
  // Remove navigation/skip links at the top
  let content = raw.replace(/^\[Skip to content\].*?\n+/i, "");

  // Remove comment form section and everything after
  const commentIdx = content.indexOf("## Leave a Reply");
  if (commentIdx > 0) {
    content = content.slice(0, commentIdx);
  }

  // Remove duplicate sections (scraped pages sometimes repeat content)
  const sections = content.split(/\n(?=## )/);
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const section of sections) {
    const key = section.trim().slice(0, 100);
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(section);
    }
  }
  content = unique.join("\n");

  // Remove trailing whitespace chars like ‍ (zero-width joiner)
  content = content.replace(/‍\n*/g, "");

  // Clean up excessive newlines
  content = content.replace(/\n{3,}/g, "\n\n");

  return content.trim();
}

function extractFirstImage(content: string): string | undefined {
  const match = content.match(/!\[.*?\]\((https?:\/\/[^)]+)\)/);
  return match?.[1];
}

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function extractExcerpt(content: string): string {
  // Get first paragraph that's not an image
  const lines = content.split("\n").filter((l) => l.trim() && !l.startsWith("!") && !l.startsWith("#") && !l.startsWith("["));
  const first = lines[0] || "";
  return first.slice(0, 300);
}

async function migrate() {
  const entries = fs.readdirSync(SCRAPE_DIR, { withFileTypes: true });
  const blogDirs = entries.filter(
    (e) => e.isDirectory() && !SITE_PAGES.has(e.name)
  );

  // Also check blog/ and learning-center/ subdirectories
  const blogSubdir = path.join(SCRAPE_DIR, "blog");
  if (fs.existsSync(blogSubdir)) {
    const blogEntries = fs.readdirSync(blogSubdir, { withFileTypes: true });
    for (const e of blogEntries) {
      if (e.isDirectory() && !SITE_PAGES.has(e.name)) {
        blogDirs.push({ ...e, name: `blog/${e.name}` } as fs.Dirent);
      }
    }
  }

  const learningSubdir = path.join(SCRAPE_DIR, "learning-center");
  if (fs.existsSync(learningSubdir)) {
    const lcEntries = fs.readdirSync(learningSubdir, { withFileTypes: true });
    for (const e of lcEntries) {
      if (e.isDirectory()) {
        blogDirs.push({ ...e, name: `learning-center/${e.name}` } as fs.Dirent);
      }
    }
  }

  console.log(`Found ${blogDirs.length} blog post candidates\n`);

  let inserted = 0;
  let skipped = 0;

  for (const dir of blogDirs) {
    const indexPath = path.join(SCRAPE_DIR, dir.name, "index.md");
    if (!fs.existsSync(indexPath)) {
      console.log(`  SKIP ${dir.name} — no index.md`);
      skipped++;
      continue;
    }

    const raw = fs.readFileSync(indexPath, "utf-8");
    const cleaned = cleanContent(raw);

    if (cleaned.length < 100) {
      console.log(`  SKIP ${dir.name} — too short (${cleaned.length} chars)`);
      skipped++;
      continue;
    }

    // Extract slug (last segment)
    const slug = dir.name.split("/").pop()!;
    const title = titleFromSlug(slug);
    const excerpt = extractExcerpt(cleaned);
    const featuredImage = extractFirstImage(cleaned);
    const category = categorize(title, cleaned);
    const html = await marked.parse(cleaned);

    try {
      await db.insert(blogPosts).values({
        title,
        slug,
        excerpt,
        content: html,
        category,
        featuredImage,
        isPublished: true,
        publishedAt: new Date("2025-01-01"), // Default date since scrape doesn't include dates
      });
      console.log(`  OK   ${slug} (${category})`);
      inserted++;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("unique")) {
        console.log(`  DUP  ${slug} — already exists`);
        skipped++;
      } else {
        console.error(`  ERR  ${slug}: ${msg}`);
        skipped++;
      }
    }
  }

  console.log(`\nDone: ${inserted} inserted, ${skipped} skipped`);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
