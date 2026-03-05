# Lawn Laser — Product Requirements Document

> **Version:** 1.0
> **Date:** 2026-03-05
> **Status:** Draft
> **Client:** Elite Lawn Care (weedcontrolokc.com)

---

## 1. Executive Summary

Lawn Laser is a modern web platform for Elite Lawn Care (DBA "Weed Control OKC"), replacing their broken WordPress/Elementor site and eliminating their Deep Lawn vendor dependency. The platform combines a high-performance marketing site with an in-house AI-powered property measurement and quoting engine — covering both lawn care AND pest control services.

**Core thesis:** Elite Lawn Care is an Inc. 5000 company with 1,700+ reviews running on a website that undermines their reputation. We fix that AND save them $3-6K/year in Deep Lawn fees by building the quoting tool in-house.

---

## 2. Goals & Success Metrics

### Business Goals
1. Replace broken WordPress site with a fast, professional platform
2. Eliminate Deep Lawn dependency (save $3-6K/year, own customer data)
3. Enable online quoting for pest control (currently lawn-only via Deep Lawn)
4. Increase quote-to-customer conversion rate
5. Reduce manual quoting workload for office staff

### Success Metrics
| Metric | Current | Target |
|--------|---------|--------|
| Page load (LCP) | ~3-5s (Elementor) | <1.5s |
| Quote generation time | 30-60s (Deep Lawn) | <15s |
| Services quotable online | Lawn only | Lawn + Pest |
| Monthly Deep Lawn cost | $155-225/mo | $0 |
| Mobile usability score | Unknown | 95+ |
| Broken pages/elements | 10+ critical issues | 0 |

---

## 3. User Personas

### P1: Homeowner (Primary — Quote Seeker)
- OKC metro resident, 30-55 years old
- Searching "lawn care near me" or "pest control OKC"
- Wants instant price without calling
- Will compare 2-3 companies before deciding
- **Key need:** Fast, trustworthy quote with clear pricing

### P2: Elite Office Staff (Internal Quoting)
- Answers phones, generates quotes manually
- Needs to pull up property measurements instantly
- Currently uses Deep Lawn dashboard for lawn, manual process for pest
- **Key need:** Single tool for all service quoting

### P3: Elite Field Technician
- On-site, uses phone/tablet
- Needs to verify property measurements, note issues
- Currently no mobile tool
- **Key need:** Mobile-friendly measurement view

### P4: Elite Owner/Manager
- Tracks leads, conversion, revenue
- Needs dashboard visibility into quote pipeline
- Currently no unified view
- **Key need:** Analytics on quote volume, conversion, revenue

---

## 4. Feature Requirements

### Phase 1: Marketing Site (MVP — Ship First)

#### F1.1 — Homepage
- Hero with instant quote CTA (address input → measurement)
- Service overview cards (Lawn Care, Pest Control)
- Social proof: Google review count + rating (live pull), Inc. 5000 badges
- Video showcase (YouTube embeds, leveraging 18.9K subscriber channel)
- FAQ accordion
- Latest blog posts

#### F1.2 — Service Pages
- `/lawn-care` — Fertilization, Weed Control, Soil Conditioning, Aeration, Top Dressing, Overseeding, Grub Control, Spring Dead Spot
- `/pest-control` — Perimeter, Mosquito, Flea/Tick, Chigger, Armyworm, Bagworm, Webworm
- Each with: description, process explanation, before/after gallery, CTA to quote
- Individual sub-service pages (currently missing — major SEO gap)

#### F1.3 — Service Area Pages (17 locations)
- Template-driven with unique local content per city
- Embedded quote widget
- Location-specific reviews (if available via Google Places API)
- Local SEO schema markup (LocalBusiness JSON-LD)

#### F1.4 — About Page
- Company story (2003 founding, 20+ years)
- Team section with photos
- Differentiators (agronomist, body cameras, blue dye, custom fertilizer)
- Awards (Inc. 5000 2022-2025, BBB A+, Best of Moore)

#### F1.5 — Blog / Learning Center (Unified)
- Merge current blog + learning center into single content hub
- Blog posts with proper taxonomy (Lawn Care, Pest Control, Seasonal Tips)
- YouTube video embeds alongside written content
- Proper URL structure: `/blog/[slug]`
- SEO: proper dates, categories, author attribution

#### F1.6 — Gallery
- Real photo gallery (not a link to Facebook)
- Before/after comparisons
- Filterable by service type
- Lightbox viewing

#### F1.7 — Contact Page
- Form with smart defaults (Oklahoma pre-selected)
- Google Maps embed
- Business hours
- Phone (click-to-call), email, address

#### F1.8 — Careers Page
- Job listings (managed in CMS or pulled from Indeed API)
- Company culture section
- Benefits/perks
- Application form or Indeed integration

#### F1.9 — Quote Page (`/get-a-quote`)
- Primary conversion page
- Address input → AI measurement → service selection → instant price
- Fallback manual form for edge cases
- Covers lawn care AND pest control

### Phase 2: AI Quoting Engine (Core Differentiator)

#### F2.1 — Property Measurement
- Address input → geocode → satellite/aerial imagery fetch
- AI measurement of: lawn area, lot area, building footprint, driveway, sidewalk
- Display measurements on interactive map overlay
- Customer can adjust/edit boundaries
- Support for both residential and light commercial

#### F2.2 — Instant Quote Generation
- Pricing tables configurable by Elite staff (per-service, per-sqft, per-zone)
- Geopricing: different rates by service area/zone
- Bundle/package pricing (e.g., "Full Lawn Program" = 9 visits)
- Pest control quoting based on building footprint + perimeter
- Display itemized quote with total

#### F2.3 — Quote-to-Customer Flow
- Lead capture (name, email, phone) before showing price
- Service selection with add-ons
- Checkout: e-signature, terms acceptance, card on file
- Confirmation email + SMS
- Abandoned quote tracking (lead saved even without checkout)

#### F2.4 — Embeddable Widget
- Standalone JS widget embeddable on any page
- Same functionality as `/get-a-quote` in compact form
- Configurable colors/branding
- Used on homepage, service area pages, service pages

### Phase 3: Admin Dashboard

#### F3.1 — Quote Management
- View all quotes (pending, accepted, expired)
- Manual quote creation for phone/field staff
- Quote follow-up automation (email/SMS reminders)

#### F3.2 — Pricing Configuration
- Service pricing tables (CRUD)
- Geopricing zones (map-based editor)
- Package/bundle builder
- Seasonal pricing overrides

#### F3.3 — Lead Pipeline
- All leads from widget, manual form, phone
- Status tracking (new → contacted → quoted → won/lost)
- Abandoned cart/quote recovery

#### F3.4 — Analytics
- Quote volume by source, service, area
- Conversion funnel (visit → quote → lead → customer)
- Revenue tracking
- Service area heatmap

### Phase 4: Integrations (Future)

#### F4.1 — CRM Sync
- Push leads/customers to their CRM (TBD which they use)
- Bi-directional sync for customer status

#### F4.2 — Payment Processing
- Stripe for card-on-file and checkout
- Recurring billing for service programs

#### F4.3 — Google Business Profile
- Live review count/rating on site
- Review request automation post-service

#### F4.4 — SMS/Email Automation
- Quote follow-up sequences
- Seasonal service reminders
- Appointment confirmations

---

## 5. Content Migration Plan

### From Current WordPress Site
| Content | Count | Action |
|---------|-------|--------|
| Blog posts | 40 | Migrate with correct dates, fix URL structure |
| Service area pages | 17 | Rewrite with unique content, keep SEO juice via redirects |
| Photo gallery | ~30 images | Download from WordPress uploads, organize by service |
| YouTube videos | 15+ | Embed references (no migration needed) |
| Landing pages (door2door, yard-sign, etc.) | 5 | Evaluate if still active, migrate or redirect |

### From Deep Lawn
| Data | Action |
|------|--------|
| Pricing tables | Export and rebuild in admin dashboard |
| Service area definitions | Map to geopricing zones |
| Historical quotes/leads | Export if API allows, import to new system |

---

## 6. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| **Performance** | LCP < 1.5s, FID < 100ms, CLS < 0.1 |
| **Uptime** | 99.9% |
| **Mobile** | Mobile-first design, responsive down to 320px |
| **SEO** | Server-rendered, proper meta tags, JSON-LD schema |
| **Accessibility** | WCAG 2.1 AA compliance |
| **Security** | HTTPS, input sanitization, rate limiting on quote API |
| **Scalability** | Handle 1,000+ quotes/day without degradation |
| **Browser support** | Chrome, Safari, Firefox, Edge (last 2 versions) |

---

## 7. Out of Scope (for now)

- Native mobile app (responsive web is sufficient)
- Multi-tenant / white-label (this is Elite-specific)
- Snow removal quoting (Elite doesn't offer it)
- Commercial property measurement (residential focus)
- Route optimization (Phase 4+ consideration)
- Customer self-service portal (Phase 4+)

---

## 8. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Satellite imagery accuracy | Customers get bad quotes | Allow manual adjustment; use HD imagery for tree-heavy areas; human review threshold |
| Deep Lawn data export | Lose historical quote data | Attempt API export early; worst case, start fresh |
| SEO ranking loss during migration | Traffic drop | 301 redirects for all existing URLs; submit sitemap immediately |
| Client resistance to change | Project stalls | Phase 1 (marketing site) ships independently of Phase 2 (quoting) |
| Imagery API costs | Higher than Deep Lawn | Google Maps Static API is cheap ($2/1000 requests); Mapbox free tier generous |

---

## 9. Timeline (Suggested)

| Phase | Scope | Duration |
|-------|-------|----------|
| **Phase 1** | Marketing site + CMS | 3-4 weeks |
| **Phase 2** | AI quoting engine + widget | 4-6 weeks |
| **Phase 3** | Admin dashboard | 2-3 weeks |
| **Phase 4** | Integrations | Ongoing |

Phase 1 can ship independently — the client gets immediate value (fixed site) while Phase 2 develops in parallel.
