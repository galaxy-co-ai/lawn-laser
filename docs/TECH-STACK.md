# Lawn Laser — Tech Stack

> **Version:** 1.0
> **Date:** 2026-03-05

---

## Core Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 15 (App Router) | SSR/SSG for SEO, React Server Components, proven stack |
| **Language** | TypeScript (strict) | Type safety across full stack |
| **Database** | Neon (PostgreSQL) | Serverless Postgres, branching, generous free tier |
| **ORM** | Drizzle ORM | Type-safe, lightweight, great DX with Neon |
| **Auth** | Clerk | Admin dashboard auth, user management (client creates) |
| **Cache** | Upstash Redis | Rate limiting, session cache, quote caching (client creates) |
| **Hosting** | Vercel | Edge functions, ISR, preview deployments, analytics |
| **CMS** | Sanity (or MDX) | Blog/content management — TBD based on client's content workflow |
| **Styling** | Tailwind CSS v4 | Utility-first, design token system, fast iteration |
| **Components** | shadcn/ui | Accessible, customizable, no vendor lock |

---

## AI Quoting Engine Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Geocoding** | Google Maps Geocoding API | Address → lat/lng coordinates |
| **Satellite Imagery** | Google Maps Static API | Property imagery for measurement display |
| **Aerial Imagery** | Mapbox Satellite | Higher-res alternative, generous free tier |
| **HD Imagery (optional)** | Nearmap API | 5-6cm resolution, "leaves-off" winter shots (premium add-on) |
| **Property Data** | Google Maps Platform + Regrid API | Parcel boundaries, building footprints |
| **Measurement AI** | Custom model OR Segmentation API | Lawn/building/driveway segmentation from aerial imagery |
| **Map Display** | Mapbox GL JS (or Google Maps JS) | Interactive property map with editable overlays |
| **Quote Calculation** | Server-side pricing engine | Pricing tables + geopricing zones → instant quote |

### Measurement Approach Options

**Option A: Third-Party Segmentation (Recommended for MVP)**
- Use Regrid/LightBox for parcel boundaries
- Use Google Earth Engine or Mapbox for land cover classification
- Calculate lawn = lot area - building footprint - hardscape
- Accuracy: ~85-90% (comparable to Deep Lawn)
- Cost: Low ($0.01-0.05/lookup)

**Option B: Custom ML Model (Phase 2+)**
- Train segmentation model on aerial imagery (U-Net or similar)
- Label: lawn, building, driveway, sidewalk, tree canopy
- Requires training data (~500-1000 labeled properties)
- Accuracy: 90-95% with tuning
- Cost: Compute for inference ($0.01-0.02/measurement)

**Option C: Hybrid**
- Regrid for parcel + building footprint (authoritative data)
- Simple pixel classification for lawn vs hardscape within parcel
- Manual adjustment UI for edge cases
- Best accuracy-to-cost ratio

**Recommendation:** Start with **Option C (Hybrid)** — use authoritative parcel/building data from Regrid, compute lawn area by subtraction, allow customer edits. Upgrade to custom ML model if accuracy isn't sufficient.

---

## Infrastructure

| Service | Purpose | Tier |
|---------|---------|------|
| **Vercel** | Hosting, edge functions, CDN | Pro ($20/mo) |
| **Neon** | PostgreSQL database | Scale plan (client creates) |
| **Upstash Redis** | Caching, rate limiting | Pay-as-you-go (client creates) |
| **Clerk** | Auth for admin dashboard | Pro (client creates) |
| **Vercel Blob** | Image storage (gallery, blog) | Included with Vercel (client creates) |
| **Google Maps Platform** | Geocoding, imagery, map display | Pay-as-you-go (~$200 free/mo credit) |
| **Mapbox** | Satellite imagery, map rendering | Free tier (50K loads/mo) |
| **Regrid** | Parcel data, building footprints | API plan (~$100-300/mo) |
| **Stripe** | Payment processing | Standard (2.9% + $0.30) |
| **Resend** | Transactional email | Free tier (100 emails/day) |

### Estimated Monthly Infrastructure Cost
| Item | Cost |
|------|------|
| Vercel Pro | $20 |
| Neon | $19-69 |
| Upstash Redis | $0-10 |
| Clerk | $25 |
| Google Maps APIs | $0-50 (within free credit) |
| Mapbox | $0 (free tier) |
| Regrid API | $100-300 |
| Resend | $0-20 |
| **Total** | **~$165-495/mo** |

vs. current: WordPress hosting ($20-50) + Deep Lawn ($155-225/mo) + manual labor = **$175-275/mo + time**

The infrastructure pays for itself through Deep Lawn elimination alone, and the quoting tool covers lawn AND pest (which Deep Lawn doesn't).

---

## Development Tools

| Tool | Purpose |
|------|---------|
| **pnpm** | Package manager |
| **Biome** | Linting + formatting (fast, single tool) |
| **Vitest** | Unit testing |
| **Playwright** | E2E testing |
| **GitHub Actions** | CI/CD |
| **Vercel Preview** | PR preview deployments |

---

## Database Schema (High-Level)

```
-- Core
services              -- lawn care, pest control sub-services
service_areas         -- 17 OKC metro zones with geo boundaries
pricing_rules         -- per-service, per-area pricing tables
packages              -- bundled service programs

-- Quoting
measurements          -- cached property measurements (address, lat/lng, areas)
quotes                -- generated quotes with line items
quote_items           -- individual services on a quote
leads                 -- contact info from quote flow (even abandoned)

-- Content
blog_posts            -- if using DB-backed CMS (or Sanity handles this)
gallery_images        -- photo metadata, categories
testimonials          -- curated reviews for display

-- Admin
users                 -- Clerk-managed admin users
audit_log             -- pricing changes, quote modifications
```

---

## API Routes (High-Level)

```
-- Public (no auth)
POST /api/measure          -- address → property measurements
POST /api/quote            -- measurements + services → price
POST /api/lead             -- save lead contact info
POST /api/checkout         -- complete purchase (Stripe)
GET  /api/reviews          -- cached Google reviews

-- Admin (Clerk auth)
GET  /api/admin/quotes     -- list all quotes
GET  /api/admin/leads      -- list all leads
CRUD /api/admin/services   -- manage services
CRUD /api/admin/pricing    -- manage pricing rules
CRUD /api/admin/areas      -- manage service areas + geopricing
GET  /api/admin/analytics  -- dashboard data
```

---

## Key Dependencies

```json
{
  "dependencies": {
    "next": "^15",
    "@clerk/nextjs": "^6",
    "drizzle-orm": "^0.38",
    "@neondatabase/serverless": "^0.10",
    "@upstash/redis": "^1",
    "@upstash/ratelimit": "^2",
    "@stripe/stripe-js": "^5",
    "stripe": "^17",
    "@mapbox/mapbox-gl": "^3",
    "resend": "^4",
    "zod": "^3",
    "tailwindcss": "^4",
    "class-variance-authority": "^0.7",
    "clsx": "^2",
    "tailwind-merge": "^2"
  }
}
```
