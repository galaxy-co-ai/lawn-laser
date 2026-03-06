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
- [x] P1C.5 — Embedded quote widget on each area page (depends on P2.4)

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
- [x] P1F.8 — `/contact` — Google Maps embed (free embed URL)
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

- [x] P2A.1 — Google Maps Geocoding integration (address → lat/lng + formatted address)
- [x] P2A.2 — Regrid API integration (parcel boundary + building footprint via point lookup)
- [-] P2A.3 — Satellite imagery fetch (deferred — not needed for MVP)
- [x] P2A.4 — Lawn area calculation (lot - building - hardscape) with polygon area from Regrid
- [x] P2A.5 — Measurement caching (DB)
- [x] P2A.6 — `/api/measure` — real Google+Regrid with zip-code fallback (`src/lib/measurement.ts`)
- **Note:** Regrid trial token restricted to 7 counties (Dallas, TX area). OKC uses fallback estimation until Self-Serve plan (expires 2026-04-04).

### 2B — Pricing Engine

- [x] P2B.1 — Core pricing calculation from `pricing_rules` table (`src/lib/pricing.ts`)
- [ ] P2B.2 — Geopricing zone lookup
- [ ] P2B.3 — Package/bundle pricing logic
- [x] P2B.4 — `/api/quote` — full implementation (pricing + lead + quote persistence)
- [x] P2B.5 — Seed 15 pricing rules (8 lawn per-sqft, 7 pest flat) via `scripts/seed-pricing.ts`

### 2C — Quote Widget Components

- [x] P2C.1 — Address autocomplete input (Google Places API, graceful fallback if script fails)
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

- [x] P3A.1 — `/quotes` — list with customer, amount, status, dates (real DB queries)
- [x] P3A.2 — `/quotes/[id]` — full detail: customer, property, line items, timeline
- [x] P3A.3 — `/quotes/new` — manual quote creation form (select services, set prices, create lead)
- [x] P3A.4 — Admin API: `/api/admin/quotes` POST + `/api/admin/quotes/[id]` PATCH (status)

### 3B — Lead Pipeline

- [x] P3B.1 — `/leads` — list with name, contact, source, status, date (real DB queries)
- [x] P3B.2 — `/leads/[id]` — detail with contact info, timeline, quotes, metadata
- [x] P3B.3 — Status transitions via dropdown (new → contacted → quoted → won/lost)
- [x] P3B.4 — Admin API: `/api/admin/leads/[id]` PATCH (status, contact) + DELETE

### 3C — Pricing Configuration

- [x] P3C.1 — `/pricing` — service pricing tables CRUD (inline edit, create, delete, toggle active)
- [ ] P3C.2 — `/pricing/geopricing` — zone-based pricing map editor
- [ ] P3C.3 — `/pricing/packages` — package/bundle builder
- [ ] P3C.4 — Seasonal pricing overrides
- [x] P3C.5 — Admin API: `/api/admin/pricing` CRUD (GET, POST, PATCH, DELETE)

### 3D — Service & Area Management

- [x] P3D.1 — `/services` — service list with pricing rules, status (real DB queries)
- [x] P3D.2 — `/areas` — service area list with status (real DB queries)
- [x] P3D.3 — Admin API: `/api/admin/services` POST + `[id]` PATCH/DELETE, `/api/admin/areas` POST + `[id]` PATCH/DELETE

### 3E — Content Management

- [x] P3E.1 — `/content/blog` — blog post list with title, category, status, date (real DB)
- [ ] P3E.2 — `/content/gallery` — image upload to Vercel Blob, manage gallery
- [x] P3E.3 — Rich text blog editor (TipTap): create + edit posts, toolbar, publish toggle
- [x] P3E.4 — Blog CRUD API: `/api/admin/blog` POST + `[id]` GET/PATCH/DELETE

### 3F — Dashboard & Analytics

- [x] P3F.1 — `/dashboard` — real stats (total quotes, active leads, conversion rate, 30d revenue)
- [x] P3F.2 — Dashboard: recent leads + recent quotes tables
- [x] P3F.3 — Conversion funnel visualization (horizontal bar chart, lead pipeline by status)
- [ ] P3F.4 — Admin API: `/api/admin/analytics`

### 3G — Settings

- [x] P3G.1 — `/settings` — business info, widget embed code + URL params, integration status

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

Phase 2 core is complete — quote widget is live on `/get-a-quote`, `/widget`, and all 17 service area pages.
Address autocomplete (Google Places) is wired up. Contact page has Google Maps embed.

**Still blocked on external dependencies:**
- **Regrid production** — Trial covers 7 TX counties; need Self-Serve plan for OKC coverage
- **P1E.1-6** — Photo gallery (needs images from client or Facebook)
- **P1F.9** — Team photos on about page (needs assets from client)
- **P1H.6-7** — Lighthouse audit + GA setup (post-deployment)
- **Vercel env vars** — `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` needs to be set in Vercel for prod

**Ready to build next:**
- **P3C.1-5** — Pricing tables CRUD in admin
- **P3D.3** — Service + area CRUD APIs
- **P3E.3** — Rich text blog editor (TipTap)
- **P3F.3** — Conversion funnel visualization
- **P2B.2-3** — Geopricing zones + package/bundle pricing

---

## Dependencies & Blockers

| Task | Depends On | Notes |
|------|-----------|-------|
| P1A.6 (blog posts on homepage) | P1D.1 (blog migration) | Need posts in DB first |
| P1B.5 (service page galleries) | P1E (gallery pipeline) | Need images in Blob first |
| P1C.5 (widget on area pages) | P2D (embeddable widget) | Phase 2 |
| P1F.8 (Google Maps on contact) | — | API key provisioned, ready to build |
| P1F.9 (team photos on about) | Client assets | Need from Elite |
| P1G.4 (AI quote widget) | — | Done |
| Regrid OKC coverage | Self-Serve plan | Trial restricted to 7 TX counties |
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
