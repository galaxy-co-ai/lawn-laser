# Lawn Laser — Site Architecture

> **Version:** 1.0
> **Date:** 2026-03-05

---

## Route Map

```
lawn-laser/
├── src/
│   ├── app/
│   │   ├── (marketing)/                    -- Public marketing site (no auth)
│   │   │   ├── layout.tsx                  -- Marketing layout (header, footer, nav)
│   │   │   ├── page.tsx                    -- Homepage
│   │   │   ├── about/page.tsx
│   │   │   ├── lawn-care/
│   │   │   │   ├── page.tsx                -- Lawn care overview
│   │   │   │   ├── [service]/page.tsx      -- Individual service (fertilization, weed-control, etc.)
│   │   │   ├── pest-control/
│   │   │   │   ├── page.tsx                -- Pest control overview
│   │   │   │   ├── [service]/page.tsx      -- Individual pest service (mosquito, flea-tick, etc.)
│   │   │   ├── service-areas/
│   │   │   │   ├── page.tsx                -- Service areas hub
│   │   │   │   ├── [city]/page.tsx         -- Per-city pages (oklahoma-city-ok, edmond-ok, etc.)
│   │   │   ├── get-a-quote/page.tsx        -- Primary quote page (AI widget + fallback form)
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx                -- Blog index with categories
│   │   │   │   ├── [slug]/page.tsx         -- Individual blog post
│   │   │   ├── gallery/page.tsx            -- Photo gallery with filters
│   │   │   ├── awards/page.tsx
│   │   │   ├── careers/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── privacy/page.tsx
│   │   │   ├── terms/page.tsx
│   │   │   └── thank-you/page.tsx
│   │   │
│   │   ├── (admin)/                        -- Admin dashboard (Clerk auth required)
│   │   │   ├── layout.tsx                  -- Admin layout (sidebar, topbar)
│   │   │   ├── dashboard/page.tsx          -- Overview / analytics
│   │   │   ├── quotes/
│   │   │   │   ├── page.tsx                -- Quote list
│   │   │   │   ├── [id]/page.tsx           -- Quote detail
│   │   │   │   └── new/page.tsx            -- Manual quote creation
│   │   │   ├── leads/
│   │   │   │   ├── page.tsx                -- Lead pipeline
│   │   │   │   └── [id]/page.tsx           -- Lead detail
│   │   │   ├── pricing/
│   │   │   │   ├── page.tsx                -- Pricing table management
│   │   │   │   ├── geopricing/page.tsx     -- Zone-based pricing (map editor)
│   │   │   │   └── packages/page.tsx       -- Package/bundle builder
│   │   │   ├── services/page.tsx           -- Service CRUD
│   │   │   ├── areas/page.tsx              -- Service area management
│   │   │   ├── content/
│   │   │   │   ├── blog/page.tsx           -- Blog post management
│   │   │   │   └── gallery/page.tsx        -- Gallery management
│   │   │   └── settings/page.tsx           -- Account, integrations, widget config
│   │   │
│   │   ├── api/
│   │   │   ├── measure/route.ts            -- Property measurement endpoint
│   │   │   ├── quote/route.ts              -- Quote generation endpoint
│   │   │   ├── lead/route.ts               -- Lead capture endpoint
│   │   │   ├── checkout/route.ts           -- Stripe checkout
│   │   │   ├── reviews/route.ts            -- Cached Google reviews
│   │   │   ├── webhook/
│   │   │   │   ├── stripe/route.ts         -- Stripe webhooks
│   │   │   │   └── clerk/route.ts          -- Clerk webhooks
│   │   │   └── admin/                      -- Protected admin API routes
│   │   │       ├── quotes/route.ts
│   │   │       ├── leads/route.ts
│   │   │       ├── pricing/route.ts
│   │   │       ├── services/route.ts
│   │   │       ├── areas/route.ts
│   │   │       └── analytics/route.ts
│   │   │
│   │   ├── widget/                         -- Embeddable quote widget (standalone)
│   │   │   └── page.tsx                    -- Renders in iframe, minimal bundle
│   │   │
│   │   └── layout.tsx                      -- Root layout
│   │
│   ├── components/
│   │   ├── ui/                             -- shadcn/ui base components
│   │   ├── marketing/                      -- Marketing site components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── service-card.tsx
│   │   │   ├── testimonial-carousel.tsx
│   │   │   ├── faq-accordion.tsx
│   │   │   ├── cta-section.tsx
│   │   │   ├── gallery-grid.tsx
│   │   │   ├── blog-card.tsx
│   │   │   └── video-embed.tsx
│   │   ├── quote/                          -- Quote engine components
│   │   │   ├── address-input.tsx           -- Autocomplete address search
│   │   │   ├── property-map.tsx            -- Interactive map with measurement overlay
│   │   │   ├── measurement-display.tsx     -- Sq ft breakdown
│   │   │   ├── service-selector.tsx        -- Pick services/packages
│   │   │   ├── price-summary.tsx           -- Itemized pricing
│   │   │   ├── lead-form.tsx              -- Contact capture
│   │   │   ├── checkout-form.tsx          -- Payment + e-signature
│   │   │   └── quote-widget.tsx           -- Combined widget (all steps)
│   │   ├── admin/                          -- Admin dashboard components
│   │   │   ├── sidebar.tsx
│   │   │   ├── data-table.tsx
│   │   │   ├── stat-card.tsx
│   │   │   ├── pricing-editor.tsx
│   │   │   ├── geopricing-map.tsx
│   │   │   └── lead-pipeline.tsx
│   │   └── shared/                         -- Shared across marketing + admin
│   │       ├── map-provider.tsx
│   │       ├── seo-meta.tsx
│   │       └── phone-link.tsx
│   │
│   ├── lib/
│   │   ├── db/
│   │   │   ├── index.ts                   -- Drizzle client
│   │   │   ├── schema.ts                  -- Full schema
│   │   │   └── migrations/                -- Drizzle migrations
│   │   ├── measurement/
│   │   │   ├── geocode.ts                 -- Address → coordinates
│   │   │   ├── parcel.ts                  -- Fetch parcel boundaries (Regrid)
│   │   │   ├── imagery.ts                 -- Fetch satellite/aerial images
│   │   │   ├── calculate.ts              -- Compute lawn/building/hardscape areas
│   │   │   └── cache.ts                  -- Cache measurements in DB + Redis
│   │   ├── pricing/
│   │   │   ├── engine.ts                 -- Core pricing calculation
│   │   │   ├── geopricing.ts             -- Zone-based price adjustments
│   │   │   └── packages.ts              -- Bundle/package pricing logic
│   │   ├── integrations/
│   │   │   ├── stripe.ts                 -- Stripe client + helpers
│   │   │   ├── google-reviews.ts         -- Google Business Profile API
│   │   │   ├── resend.ts                -- Email client
│   │   │   └── mapbox.ts               -- Mapbox client
│   │   ├── auth.ts                       -- Clerk helpers
│   │   ├── redis.ts                      -- Upstash Redis client
│   │   ├── utils.ts                      -- Shared utilities
│   │   └── constants.ts                  -- Service definitions, area codes, etc.
│   │
│   ├── styles/
│   │   └── globals.css                   -- Tailwind v4 + design tokens
│   │
│   └── content/                          -- Static content (if using MDX for blog)
│       ├── blog/
│       └── services/
│
├── public/
│   ├── images/
│   │   ├── gallery/
│   │   ├── team/
│   │   ├── awards/
│   │   └── og/                           -- Open Graph images
│   ├── fonts/
│   └── widget.js                         -- Embeddable widget loader script
│
├── docs/                                 -- Project documentation
│   ├── PRD.md
│   ├── TECH-STACK.md
│   ├── SITE-ARCHITECTURE.md
│   └── REDIRECTS.md                      -- URL mapping from old site
│
├── drizzle.config.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local.example
```

---

## Page Rendering Strategy

| Route Pattern | Rendering | Cache | Rationale |
|--------------|-----------|-------|-----------|
| Homepage | ISR (60s) | CDN | Mostly static, reviews refresh periodically |
| Service pages | SSG | CDN (long) | Content changes rarely |
| Service area pages | SSG | CDN (long) | 17 pages, mostly static |
| Blog posts | SSG | CDN (long) | Static content |
| Blog index | ISR (300s) | CDN | Updates when new posts added |
| Get a Quote | CSR | None | Dynamic, interactive widget |
| Gallery | ISR (3600s) | CDN | Updates infrequently |
| Admin pages | CSR | None | Dynamic, auth-gated |
| API routes | Dynamic | Redis (varies) | Real-time data |

---

## Embeddable Widget Architecture

The quote widget needs to work both as a native page (`/get-a-quote`) and as an embeddable iframe on service/area pages.

```
Widget Loading:
1. Host page includes <script src="https://lawn-laser.vercel.app/widget.js">
2. Script creates iframe pointing to /widget?theme=light&service=lawn
3. iframe loads minimal React app (no marketing chrome)
4. PostMessage API for communication (height resize, completion events)
5. Parent page receives "quote_complete" event with lead data
```

Widget supports URL params:
- `service` — pre-select lawn-care or pest-control
- `area` — pre-select service area
- `theme` — light/dark
- `color` — brand accent color

---

## SEO & Redirect Strategy

### URL Mapping (Old → New)

```
# Core pages (1:1)
/lawn-care/              → /lawn-care
/pest-control/           → /pest-control
/get-a-quote/            → /get-a-quote
/about/                  → /about
/contact/                → /contact
/gallery/                → /gallery
/awards/                 → /awards
/careers/                → /careers
/blog/                   → /blog
/learning-center/        → /blog (merge)
/service-areas/          → /service-areas

# Service area pages (1:1)
/service-areas/oklahoma-city-ok/  → /service-areas/oklahoma-city-ok
/service-areas/edmond-ok/         → /service-areas/edmond-ok
... (all 17)

# Root-level blog posts → /blog/[slug]
/bagworms-vs-webworms-whats-the-difference/  → /blog/bagworms-vs-webworms
/the-perfect-fertilization-schedule.../       → /blog/fertilization-schedule-oklahoma-city
... (all 40 posts)

# Old/orphaned pages → redirects
/location-page/          → /service-areas/oklahoma-city-ok
/blanchard-ok/2/         → /service-areas/blanchard-ok
/category/uncategorized/ → /blog
/weed-control/           → /lawn-care/weed-control
/lawn-fertilization/     → /lawn-care/fertilization
/grub-control/           → /lawn-care/grub-control
/perimeter-pest-control/ → /pest-control/perimeter
/mosquito-control/       → /pest-control/mosquito
... (all orphaned sub-service URLs)

# Landing pages (evaluate if still active)
/door-2-door/            → keep or redirect to homepage
/yard-sign/              → keep or redirect to homepage
/doorhanger/             → keep or redirect to homepage
/tv/                     → keep or redirect to homepage
```

### Schema Markup (per page type)

- **Homepage:** Organization + LocalBusiness + WebSite (sitelinks search)
- **Service pages:** Service schema with area served
- **Service area pages:** LocalBusiness with specific geo coordinates
- **Blog posts:** Article schema with author, datePublished
- **FAQ sections:** FAQPage schema (rich snippets)
- **Gallery:** ImageGallery schema

---

## Data Flow: Quote Generation

```
User enters address
       │
       ▼
  [Geocode API]  ──→  lat/lng coordinates
       │
       ▼
  [Check Redis cache]  ──→  cached measurement? return it
       │ (miss)
       ▼
  [Regrid API]  ──→  parcel boundary + building footprint
       │
       ▼
  [Mapbox/Google]  ──→  satellite imagery for display
       │
       ▼
  [Calculate]  ──→  lawn_sqft = lot - building - hardscape
       │
       ▼
  [Cache in DB + Redis]
       │
       ▼
  User sees property map with measurements
       │
       ▼
  User selects services
       │
       ▼
  [Pricing Engine]  ──→  lookup pricing table × sqft × geozone
       │
       ▼
  User sees instant quote
       │
       ▼
  [Lead Capture]  ──→  save to DB (even if abandoned)
       │
       ▼
  [Checkout]  ──→  Stripe payment + e-signature
       │
       ▼
  [Confirmation]  ──→  email + SMS via Resend
```

---

## Mobile-First Approach

The current site is responsive but designed desktop-first. Lawn Laser flips this:

1. **Quote widget:** Thumb-friendly address input, swipeable service cards, large tap targets
2. **Phone CTA:** Sticky bottom bar on mobile with call + quote buttons
3. **Gallery:** Swipe carousel on mobile, grid on desktop
4. **Navigation:** Bottom sheet nav on mobile (not hamburger)
5. **Service areas:** GPS-based auto-detection ("Looks like you're in Edmond — see our services")
6. **Maps:** Touch-friendly measurement adjustment on property overlay
