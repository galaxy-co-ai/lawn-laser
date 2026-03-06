# Lawn Laser — Master Plan

> **Last updated:** 2026-03-05 (session 4)
> **Rule:** Update this file after completing any task. This is the single source of truth.

---

## Status Key

- `[ ]` — Not started
- `[~]` — In progress
- `[x]` — Done
- `[!]` — Blocked (see notes)
- `[-]` — Skipped / deferred

---

## Phase 0: Infrastructure (DONE)

- [x] P0.1 — GitHub repo + Vercel project
- [x] P0.2 — Neon database provisioned
- [x] P0.3 — Upstash Redis provisioned
- [x] P0.4 — Clerk auth provisioned
- [x] P0.5 — Vercel Blob provisioned
- [x] P0.6 — Env vars in `.env.local` + Vercel (all environments)
- [x] P0.7 — Next.js 15 + Tailwind v4 + shadcn/ui scaffold
- [x] P0.8 — Drizzle schema (9 tables)
- [x] P0.9 — Clerk middleware protecting `/dashboard(.*)`
- [x] P0.10 — Upstash rate limiters (quote: 10/min, measurement: 30/min)
- [x] P0.11 — Design tokens (globals.css, both themes)
- [x] P0.12 — Brand brief (`designs/brand.md`)
- [x] P0.13 — SEO redirect map in `next.config.ts`
- [x] P0.14 — `drizzle-kit push` — tables created in Neon
- [x] P0.15 — Seed script — 15 services + 17 service areas populated

---

## Phase 1: Marketing Site (Ship First)

### 1A — Homepage & Core Layout

- [x] P1A.1 — Marketing layout (header + footer)
- [x] P1A.2 — Responsive header with dropdowns + mobile Sheet
- [x] P1A.3 — Footer (4-col: company, lawn, pest, areas)
- [x] P1A.4 — Homepage: hero, services, differentiators, social proof, service areas, CTA
- [x] P1A.5 — Homepage: FAQ accordion (PRD F1.1)
- [x] P1A.6 — Homepage: latest blog posts section (PRD F1.1)
- [x] P1A.7 — Homepage: YouTube video showcase embed (PRD F1.1)
- [x] P1A.8 — JSON-LD schema: Organization + LocalBusiness + WebSite
- [x] P1A.9 — Delete `src/app/page.tsx` (default Next.js boilerplate conflicts with marketing page)

### 1B — Service Pages

- [x] P1B.1 — `/lawn-care` overview page (service grid with links)
- [x] P1B.2 — `/pest-control` overview page (service grid with links)
- [x] P1B.3 — `/lawn-care/[service]` — real content for all 8 lawn services
  - [x] Fertilization
  - [x] Weed Control
  - [x] Soil Conditioning
  - [x] Core Aeration
  - [x] Top Dressing
  - [x] Overseeding
  - [x] Grub Control
  - [x] Spring Dead Spot Treatment
- [x] P1B.4 — `/pest-control/[service]` — real content for all 7 pest services
  - [x] Perimeter Pest Control
  - [x] Mosquito Control
  - [x] Flea & Tick Control
  - [x] Chigger Control
  - [x] Armyworm Control
  - [x] Bagworm Treatment
  - [x] Webworm Treatment
- [ ] P1B.5 — Service pages: before/after gallery section (depends on P1E)
- [x] P1B.6 — Service pages: CTA to quote widget
- [x] P1B.7 — Service pages: JSON-LD Service schema

### 1C — Service Area Pages

- [x] P1C.1 — `/service-areas` hub page (lists all 17 cities)
- [x] P1C.2 — `/service-areas/[city]` dynamic template (lawn + pest sections + CTA)
- [x] P1C.3 — Unique local content per city (not just template with city name swapped)
- [x] P1C.4 — JSON-LD LocalBusiness schema per city page
- [ ] P1C.5 — Embedded quote widget on each area page (depends on P2.4)

### 1D — Blog / Content Hub

- [x] P1D.1 — Migrate blog posts from WordPress scrape data (14 posts migrated)
  - [x] Parse scraped markdown files
  - [x] Extract title, content, category, featured image
  - [x] Insert into `blog_posts` table
  - [x] Map old URLs to new slugs
- [x] P1D.2 — `/blog` index page with category filtering and pagination
- [x] P1D.3 — `/blog/[slug]` post template with proper typography
- [x] P1D.4 — Blog: JSON-LD Article schema
- [x] P1D.5 — Blog: YouTube video embeds where referenced in content
- [x] P1D.6 — Blog: related posts section

### 1E — Photo Gallery

- [!] P1E.1 — Download images from WordPress uploads (WordPress gallery page is empty — images are on Facebook only)
- [ ] P1E.2 — Upload images to Vercel Blob
- [ ] P1E.3 — Insert records into `gallery_images` table
- [ ] P1E.4 — `/gallery` page with category filters (lawn, pest, team, before-after)
- [ ] P1E.5 — Lightbox viewing component
- [ ] P1E.6 — Gallery: ImageGallery JSON-LD schema

### 1F — Supporting Pages

- [x] P1F.1 — `/about` page (story, team placeholder, differentiators, awards)
- [x] P1F.2 — `/awards` page (Inc. 5000, BBB, Best of Moore)
- [x] P1F.3 — `/careers` page (why Elite + contact for openings)
- [x] P1F.4 — `/contact` page (form, info, map placeholder)
- [x] P1F.5 — `/thank-you` confirmation page
- [x] P1F.6 — `/privacy` — real privacy policy content
- [x] P1F.7 — `/terms` — real terms of service content
- [ ] P1F.8 — `/contact` — Google Maps embed (needs API key)
- [ ] P1F.9 — `/about` — real team photos (depends on assets from client)

### 1G — Get a Quote Page

- [x] P1G.1 — `/get-a-quote` — basic form (name, email, phone, address, services, message)
- [x] P1G.2 — Form submission → API → lead capture in DB
- [x] P1G.3 — Redirect to `/thank-you` on success
- [x] P1G.4 — Replace with AI quote widget (QuoteWidget component)

### 1H — SEO & Performance

- [x] P1H.1 — Old WordPress URL redirects in `next.config.ts`
- [x] P1H.2 — XML sitemap generation (Next.js native `sitemap.ts`)
- [x] P1H.3 — robots.txt (Next.js native `robots.ts`)
- [x] P1H.4 — Open Graph images (per page type)
- [x] P1H.5 — Favicon + web app manifest
- [ ] P1H.6 — Performance audit (Lighthouse) and fixes
- [ ] P1H.7 — Google Analytics / Tag Manager setup

### 1I — Mobile Polish

- [x] P1I.1 — Sticky bottom CTA bar on mobile (call + quote)
- [x] P1I.2 — Touch-friendly tap targets audit
- [x] P1I.3 — Mobile nav refinement (test Sheet behavior)
- [x] P1I.4 — Responsive image optimization (`next/image` with proper sizes)

---

## Phase 2: AI Quoting Engine

### 2A — Property Measurement API

- [!] P2A.1 — Google Maps Geocoding integration (BLOCKED: needs API key)
- [!] P2A.2 — Regrid API integration (BLOCKED: needs API key)
- [!] P2A.3 — Satellite imagery fetch (BLOCKED: needs API key)
- [x] P2A.4 — Lawn area calculation (lot - building - hardscape) — mock estimation using zip code averages
- [x] P2A.5 — Measurement caching (DB)
- [x] P2A.6 — `/api/measure` — mock implementation with DB caching (real APIs when keys provisioned)

### 2B — Pricing Engine

- [x] P2B.1 — Core pricing calculation from `pricing_rules` table (`src/lib/pricing.ts`)
- [ ] P2B.2 — Geopricing zone lookup
- [ ] P2B.3 — Package/bundle pricing logic
- [x] P2B.4 — `/api/quote` — full implementation (pricing + lead + quote persistence)
- [x] P2B.5 — Seed 15 pricing rules (8 lawn per-sqft, 7 pest flat) via `scripts/seed-pricing.ts`

### 2C — Quote Widget Components

- [!] P2C.1 — Address autocomplete input (BLOCKED: needs Google Places API key) — plain input for now
- [ ] P2C.2 — Interactive property map with measurement overlay
- [x] P2C.3 — Measurement display (sq ft breakdown)
- [x] P2C.4 — Service selector (fetches from `/api/services`, grouped by category)
- [x] P2C.5 — Price summary (itemized pricing by category + total)
- [x] P2C.6 — Lead capture form (first/last name, email, phone)
- [x] P2C.7 — Combined quote widget (4-step flow: address → services → contact → quote)

### 2D — Embeddable Widget

- [x] P2D.1 — `/widget` page — full quote flow with QuoteWidget component
- [x] P2D.2 — `public/widget.js` loader script (auto-detects origin, data attributes for config)
- [x] P2D.3 — PostMessage API (resize, ready, quote-complete events via WidgetShell)
- [x] P2D.4 — Widget URL params (services, area, accent color)

### 2E — Lead Capture & Abandoned Quotes

- [x] P2E.1 — `/api/lead` route (inserts to DB)
- [x] P2E.1b — `/api/services` GET route (active services ordered by sortOrder)
- [x] P2E.2 — Save lead even on abandoned quote (sendBeacon on beforeunload)
- [ ] P2E.3 — Abandoned quote email follow-up (depends on P4.4)

---

## Phase 3: Admin Dashboard

### 3A — Quote Management

- [ ] P3A.1 — `/quotes` — list with filters (pending, accepted, expired)
- [ ] P3A.2 — `/quotes/[id]` — quote detail view
- [ ] P3A.3 — `/quotes/new` — manual quote creation form
- [ ] P3A.4 — Admin API: `/api/admin/quotes` CRUD

### 3B — Lead Pipeline

- [ ] P3B.1 — `/leads` — pipeline view with status tracking
- [ ] P3B.2 — `/leads/[id]` — lead detail with history
- [ ] P3B.3 — Status transitions (new → contacted → quoted → won/lost)
- [ ] P3B.4 — Admin API: `/api/admin/leads` CRUD

### 3C — Pricing Configuration

- [ ] P3C.1 — `/pricing` — service pricing tables CRUD
- [ ] P3C.2 — `/pricing/geopricing` — zone-based pricing map editor
- [ ] P3C.3 — `/pricing/packages` — package/bundle builder
- [ ] P3C.4 — Seasonal pricing overrides
- [ ] P3C.5 — Admin API: `/api/admin/pricing` CRUD

### 3D — Service & Area Management

- [ ] P3D.1 — `/services` — service CRUD (currently empty state)
- [ ] P3D.2 — `/areas` — service area management (currently empty state)
- [ ] P3D.3 — Admin API: `/api/admin/services` + `/api/admin/areas` CRUD

### 3E — Content Management

- [ ] P3E.1 — `/content/blog` — blog post editor (create, edit, publish)
- [ ] P3E.2 — `/content/gallery` — image upload to Vercel Blob, manage gallery
- [ ] P3E.3 — Rich text editor for blog posts (TipTap or similar)

### 3F — Dashboard & Analytics

- [ ] P3F.1 — `/dashboard` — real stats (query DB for totals)
- [ ] P3F.2 — Quote volume by source, service, area
- [ ] P3F.3 — Conversion funnel visualization
- [ ] P3F.4 — Admin API: `/api/admin/analytics`

### 3G — Settings

- [ ] P3G.1 — `/settings` — widget config, integrations, account

---

## Phase 4: Integrations

- [ ] P4.1 — Stripe: payment processing + checkout
- [ ] P4.2 — Stripe: recurring billing for service programs
- [ ] P4.3 — Google Business Profile: live review count/rating on site
- [ ] P4.4 — Resend: email automation (quote follow-up, confirmations)
- [ ] P4.5 — SMS automation (Twilio or similar)
- [ ] P4.6 — CRM sync (TBD which CRM client uses)
- [ ] P4.7 — Google Analytics / Tag Manager
- [ ] P4.8 — Clerk webhooks for user events

---

## Immediate Queue (What's Next)

Phase 2 core is complete — quote widget is live on `/get-a-quote` and `/widget`.

**Still blocked on external dependencies:**
- **P2A.1-3** — Real measurement APIs (needs Google Maps + Regrid API keys)
- **P2C.1** — Address autocomplete (needs Google Places API key)
- **P1E.1-6** — Photo gallery (needs images from client or Facebook)
- **P1F.8** — Google Maps on contact page (needs Google Maps API key)
- **P1F.9** — Team photos on about page (needs assets from client)
- **P1H.6-7** — Lighthouse audit + GA setup (post-deployment)

**Ready to build next:**
- **P2B.2-3** — Geopricing zones + package/bundle pricing
- **P2C.2** — Interactive property map overlay
- **Phase 3** — Admin dashboard

---

## Dependencies & Blockers

| Task | Depends On | Notes |
|------|-----------|-------|
| P1A.6 (blog posts on homepage) | P1D.1 (blog migration) | Need posts in DB first |
| P1B.5 (service page galleries) | P1E (gallery pipeline) | Need images in Blob first |
| P1C.5 (widget on area pages) | P2D (embeddable widget) | Phase 2 |
| P1F.8 (Google Maps on contact) | Google Maps API key | Need to provision |
| P1F.9 (team photos on about) | Client assets | Need from Elite |
| P1G.4 (AI quote widget) | P2C + P2D (Phase 2) | Replaces basic form |
| P2A.1-3 (measurement APIs) | API keys (Google, Regrid) | Need to provision |
| P3 (all admin) | P2 (quoting engine) | Admin manages what quoting creates |
| P4.1-2 (Stripe) | Stripe account | Need client's Stripe or create new |

---

## Content Needs (From Client)

Things we can't build without client input:

- [ ] Team photos and bios (for `/about` team section)
- [ ] Preferred CRM system (for Phase 4 integration)
- [ ] Stripe account details (for payment processing)
- [ ] Approval on privacy policy / terms of service text
- [ ] Pricing data for all services (for pricing rules seeding)
- [ ] Any specific FAQ questions they want on homepage
- [ ] Confirmation on which landing pages to keep vs redirect (door2door, yard-sign, etc.)
