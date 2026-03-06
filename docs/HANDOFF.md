# Lawn Laser — Session Continuation

## Continue From Here

Continuing the Lawn Laser project for Elite Lawn Care (weedcontrolokc.com).

## What's Done

### Recon (complete)
- Deep Lawn competitive intelligence: `workspace/docs/deeplawn-recon.md`
- Weed Control OKC site audit: `workspace/docs/weedcontrolokc-recon.md`

### Project Setup (complete)
- GitHub: https://github.com/galaxy-co-ai/lawn-laser
- Vercel: cbmedia/lawn-laser (connected to GitHub, auto-deploys)
- All env vars set in both `.env.local` and Vercel (Neon, Upstash, Vercel Blob, Clerk)

### Phase 1 Scaffold (complete, build passes)
- **75 files committed**, `pnpm build` passes clean
- Next.js 15 + TypeScript + Tailwind v4 + shadcn/ui
- Drizzle schema: services, service_areas, pricing_rules, measurements, leads, quotes, quote_items, blog_posts, gallery_images
- Clerk middleware protecting `/dashboard(.*)` admin routes
- Upstash Redis with rate limiters (quote: 10/min, measurement: 30/min)
- Marketing layout with responsive header + footer (using constants for nav, business info, service areas)
- 18 marketing page stubs (home, about, lawn-care, pest-control, service-areas, blog, gallery, awards, careers, contact, get-a-quote, privacy, terms, thank-you + dynamic [service], [city], [slug] routes)
- 15 admin dashboard page stubs (dashboard, quotes, leads, pricing, services, areas, content, settings)
- 4 API routes (measure, quote, lead, reviews) with zod validation
- Widget page at /widget for iframe embedding
- Brand tokens in globals.css (forest green + warm earth, both light/dark themes)
- SEO redirect map in next.config.ts from old WordPress URLs
- `designs/brand.md` with full brand brief

### Key Architecture Decisions
- `(marketing)` route group = public site with header/footer layout
- `(admin)` route group = Clerk-protected dashboard with sidebar layout
- `/widget` = standalone page (no chrome) for iframe embedding
- API routes use Upstash rate limiting + zod validation
- Drizzle ORM with Neon serverless driver
- Custom utilities defined with `@utility` (Tailwind v4 syntax, not `@layer utilities`)

## What's Next

### Immediate (Phase 1 completion)
1. **Run `drizzle-kit push`** to create database tables in Neon
2. **Seed data** — populate services and service_areas tables from constants
3. **Flesh out homepage** — real content sections (hero, services, differentiators, social proof, CTA)
4. **Flesh out marketing pages** — currently stubs with placeholder content
5. **Migrate blog content** — 40 posts from old WordPress site (in `.firecrawl/weedcontrolokc.com/`)
6. **Photo gallery** — download images from their WordPress uploads, upload to Vercel Blob

### Phase 2 (AI Quoting Engine)
7. **Property measurement API** — integrate Google Maps Geocoding + Regrid for parcel data
8. **Pricing engine** — server-side calculation from pricing_rules table
9. **Quote widget** — interactive address input → map → service selection → price display
10. **Lead capture** — save leads even on abandoned quotes

### Phase 3 (Admin Dashboard)
11. **Quote management** — list, detail, manual creation
12. **Lead pipeline** — status tracking, follow-up
13. **Pricing config** — CRUD for pricing tables, geopricing zones
14. **Analytics** — quote volume, conversion funnel

## Key Files to Know
- `src/lib/constants.ts` — all business info, services, areas, nav structure
- `src/lib/db/schema.ts` — full Drizzle schema
- `src/app/globals.css` — design tokens (both themes)
- `designs/brand.md` — brand brief
- `CLAUDE.md` — project instructions
- `docs/PRD.md` — full product requirements
- `docs/TECH-STACK.md` — stack decisions + measurement approach options
- `docs/SITE-ARCHITECTURE.md` — route map, data flow, rendering strategy

## Important Notes
- UI Gate: read `designs/CLAUDE.md` (workspace root) + `src/app/globals.css` + `designs/brand.md` before any UI work
- Semantic tokens only — no raw Tailwind colors (bg-zinc-*, text-gray-*, etc)
- Tailwind v4 uses `@utility` not `@layer utilities` for custom utility classes
- Next.js 16 dynamic route params are `Promise<{ param: string }>` (async)
- `middleware.ts` warns about deprecation in favor of "proxy" — future migration needed
