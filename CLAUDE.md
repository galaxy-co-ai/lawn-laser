# Lawn Laser

## What Is This
AI-powered lawn care & pest control platform for Elite Lawn Care (weedcontrolokc.com).
Replaces their broken WordPress site + eliminates Deep Lawn vendor dependency.

## Stack
Next.js 15 (App Router) | TypeScript | Neon (Postgres) | Drizzle ORM | Clerk Auth | Upstash Redis | Vercel | Tailwind v4 | shadcn/ui

## Key Docs
- `docs/PRD.md` — Full product requirements
- `docs/TECH-STACK.md` — Stack decisions, API choices, cost estimates
- `docs/SITE-ARCHITECTURE.md` — Route map, data flow, rendering strategy

## Recon (in workspace root)
- `docs/deeplawn-recon.md` — Deep Lawn competitive intelligence (what we're replacing)
- `docs/weedcontrolokc-recon.md` — Current site audit (what we're fixing)

## UI Gate
Before ANY UI work: Read `designs/CLAUDE.md` + `src/styles/globals.css` + `designs/brand.md`.
Semantic tokens only. No raw Tailwind colors. 4px grid. All interactive states.

## Git
- Conventional commits (feat, fix, chore, docs)
- Co-Authored-By footer on all commits
- pnpm only

## Project Phases
1. Marketing site + CMS (ship first)
2. AI quoting engine + widget (core differentiator)
3. Admin dashboard
4. Integrations (Stripe, CRM, Google Reviews, SMS)
