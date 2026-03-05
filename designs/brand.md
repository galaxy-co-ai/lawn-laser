# Elite Lawn Care (Weed Control OKC) — Brand Brief

> **Project:** Lawn Laser
> **Client:** Elite Lawn Care / weedcontrolokc.com
> **Date:** 2026-03-05

---

## Brand Identity

- **Business name:** Elite Lawn Care
- **DBA / URL brand:** Weed Control OKC
- **Tagline:** "Oklahoma City's Top-Rated Lawn Care & Pest Control"
- **Founded:** 2003 (20+ years)
- **Location:** Oklahoma City metro (17 service areas)
- **Personality:** Professional, trustworthy, family-owned but operationally elite. Not corporate — approachable with substance.

## Voice & Tone

- **Confident but not arrogant** — "We've earned 1,700+ reviews" not "We're the best"
- **Practical** — Oklahoma homeowners want straight talk, not marketing fluff
- **Knowledgeable** — agronomist on staff, custom fertilizer blend, body cameras. Lead with expertise.
- **Warm** — family-owned, community-rooted, 20+ years in the same metro

## Color Palette

### Primary: Forest Green
The core brand color — trust, growth, lawn care. Used for primary CTAs, nav accents, key UI elements.

| Token | Light Mode | Dark Mode | Use |
|-------|-----------|-----------|-----|
| `--primary` | `oklch(0.45 0.15 145)` | `oklch(0.65 0.18 145)` | Primary buttons, links, accents |
| `--primary-foreground` | `oklch(0.99 0 0)` | `oklch(0.12 0.02 145)` | Text on primary |

### Secondary: Warm Earth
Grounds the green — soil, roots, Oklahoma earth tones.

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `--secondary` | `oklch(0.95 0.01 80)` | `oklch(0.22 0.02 80)` |
| `--secondary-foreground` | `oklch(0.25 0.02 80)` | `oklch(0.92 0.01 80)` |

### Accent: Amber/Gold
Awards, CTAs that need contrast from green, Inc. 5000 badge energy.

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `--accent` | `oklch(0.80 0.15 85)` | `oklch(0.75 0.14 85)` |
| `--accent-foreground` | `oklch(0.20 0.03 85)` | `oklch(0.15 0.02 85)` |

### Surfaces

| Token | Light Mode | Dark Mode | Notes |
|-------|-----------|-----------|-------|
| `--background` | `oklch(0.98 0.005 100)` | `oklch(0.14 0.01 145)` | Warm off-white / deep forest |
| `--foreground` | `oklch(0.15 0.01 80)` | `oklch(0.92 0.005 80)` | Near-black / warm light |
| `--card` | `oklch(1 0 0)` | `oklch(0.19 0.015 145)` | Pure white / elevated dark |
| `--card-foreground` | `oklch(0.15 0.01 80)` | `oklch(0.92 0.005 80)` | Same as foreground |
| `--muted` | `oklch(0.96 0.005 100)` | `oklch(0.22 0.01 145)` | Subtle backgrounds |
| `--muted-foreground` | `oklch(0.55 0.01 80)` | `oklch(0.65 0.01 80)` | Secondary text |
| `--border` | `oklch(0.91 0.005 100)` | `oklch(0.28 0.01 145)` | Dividers |
| `--input` | `oklch(0.91 0.005 100)` | `oklch(0.28 0.01 145)` | Input borders |
| `--ring` | `oklch(0.45 0.15 145)` | `oklch(0.65 0.18 145)` | Focus rings = primary |

### Semantic Colors

| Token | Value | Use |
|-------|-------|-----|
| `--destructive` | `oklch(0.58 0.22 25)` | Error, delete |
| `--success` | `oklch(0.55 0.18 150)` | Success states |
| `--warning` | `oklch(0.75 0.15 80)` | Warnings |
| `--info` | `oklch(0.55 0.15 240)` | Info states |

## Typography

### Font Stack
- **Primary (headings, nav, CTAs):** Inter — clean, professional, excellent readability
- **Secondary (body, descriptions):** Inter — same family for cohesion
- **Mono (code, data):** Geist Mono

### Scale (follows constitution clamp() rules)
All per the design constitution. No overrides needed.

## Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius` | `0.5rem` (8px) | Base radius |
| Buttons | `--radius-pill` → full rounded for primary CTAs | Friendly, approachable |
| Cards | `--radius-md` (6px) | Clean, professional |
| Inputs | `--radius-md` (6px) | Matches cards |

## Shadows

| Token | Light | Dark |
|-------|-------|------|
| `--shadow-sm` | `0 1px 2px oklch(0.15 0.01 80 / 0.06)` | `0 1px 2px oklch(0 0 0 / 0.2)` |
| `--shadow-md` | `0 4px 8px oklch(0.15 0.01 80 / 0.08)` | `0 4px 8px oklch(0 0 0 / 0.3)` |
| `--shadow-lg` | `0 12px 24px oklch(0.15 0.01 80 / 0.1)` | `0 12px 24px oklch(0 0 0 / 0.4)` |

Shadows are warm-tinted (matching earth tones), not neutral gray.

## Motion

- **Personality:** Minimal but polished. Not playful, not corporate-stiff.
- **Page transitions:** Instant swap (no crossfade)
- **Loading states:** Skeleton shimmer
- **Hover effects:** Subtle background shift + shadow increase on cards
- **Parallax:** Off
- **Spring physics:** Off — standard CSS transitions

## Imagery

- **Professional photography** — Elite has excellent recent photos (2025)
- **Hero:** Full-width lawn shots with service vehicle/signage
- **Gallery:** Before/after comparisons, crew at work, equipment
- **YouTube:** 18.9K subscribers — embed strategically, not buried
- **Icons:** Lucide (consistent with shadcn/ui)

## Competitive Positioning

- **vs Don's Lawn (46 years, 2,000+ reviews):** We're the modern, tech-forward choice. Body cameras, custom fertilizer, instant online quotes.
- **vs generic lawn services:** Inc. 5000 four years running. This isn't a side hustle.
- **Trust signals:** 1,700+ reviews, BBB A+, Inc. 5000 2022-2025, 20+ years, in-house agronomist
