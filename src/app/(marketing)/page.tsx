import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Camera,
  FlaskConical,
  Droplets,
  RefreshCw,
  Leaf,
  Clock,
  Star,
  ChevronRight,
  MapPin,
  Sprout,
  Bug,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BUSINESS,
  SERVICE_AREAS,
  LAWN_CARE_SERVICES,
  PEST_CONTROL_SERVICES,
} from "@/lib/constants";
import { HOMEPAGE_FAQ } from "@/lib/service-content";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "Oklahoma City's top-rated lawn care & pest control | Elite Lawn Care",
  description: `${BUSINESS.reviewCount}+ five-star reviews. Inc. 5000 honoree. Professional lawn care and pest control across the OKC metro since ${BUSINESS.founded}.`,
};

const DIFFERENTIATORS = [
  {
    icon: Camera,
    title: "Body cameras on every visit",
    description:
      "Full transparency — see exactly what was done on your property, every time.",
  },
  {
    icon: FlaskConical,
    title: "In-house agronomist",
    description:
      "Science-backed lawn programs designed by a certified turf expert for Oklahoma soil.",
  },
  {
    icon: Droplets,
    title: "Blue dye coverage verification",
    description:
      "Visual proof of complete, even coverage on every application. No guesswork.",
  },
  {
    icon: RefreshCw,
    title: "Free resprays guaranteed",
    description:
      "Not satisfied? We come back and retreat at no extra cost. Period.",
  },
  {
    icon: Leaf,
    title: "Custom Oklahoma fertilizer blends",
    description:
      "Formulated specifically for Oklahoma's unique red clay soil and climate patterns.",
  },
  {
    icon: Clock,
    title: `${new Date().getFullYear() - BUSINESS.founded}+ years of experience`,
    description: `Serving the OKC metro since ${BUSINESS.founded}. We know Oklahoma lawns inside and out.`,
  },
];

export const revalidate = 60; // ISR: 1 minute

export default async function HomePage() {
  const latestPosts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.isPublished, true))
    .orderBy(desc(blogPosts.publishedAt))
    .limit(3);

  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />

      {/* Hero */}
      <section className="section-gap bg-background">
        <div className="container-marketing flex flex-col items-center gap-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Star className="h-3 w-3 fill-accent text-accent" />
              {BUSINESS.googleRating} / 5.0 — {BUSINESS.reviewCount}+ reviews
            </Badge>
            <Badge variant="secondary">Inc. 5000 (2022–2025)</Badge>
          </div>

          <h1 className="text-display text-foreground">
            Oklahoma City&apos;s top&#8209;rated
            <br className="hidden sm:inline" /> lawn care &amp; pest control
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground">
            Trusted by thousands of Oklahoma homeowners since {BUSINESS.founded}.
            Science&#8209;backed programs, real&#8209;time transparency, and
            results you can see — guaranteed.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/get-a-quote"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-primary/90 hover:shadow-[var(--shadow-md)]"
            >
              Get an instant quote
              <ChevronRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${BUSINESS.phone.replace(/[^\d+]/g, "")}`}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors duration-[var(--duration-fast)] hover:bg-secondary"
            >
              Call {BUSINESS.phone}
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Shield className="h-3.5 w-3.5 text-primary" /> BBB A+ rated
            </span>
            <span className="flex items-center gap-1">
              <Camera className="h-3.5 w-3.5 text-primary" /> Body cameras on
              every visit
            </span>
            <span className="flex items-center gap-1">
              <RefreshCw className="h-3.5 w-3.5 text-primary" /> Free resprays
              guaranteed
            </span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-gap bg-muted">
        <div className="container-marketing">
          <div className="mb-10 text-center">
            <h2 className="text-foreground">Our services</h2>
            <p className="mx-auto mt-3 text-muted-foreground">
              Comprehensive lawn care and pest control programs customized for
              Oklahoma&apos;s unique climate.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Lawn Care card */}
            <Link
              href="/lawn-care"
              className="group rounded-xl border border-border bg-card p-8 transition-all duration-[var(--duration-fast)] hover:shadow-[var(--shadow-md)]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Sprout className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-foreground">Lawn care</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Fertilization, weed control, aeration, overseeding, and more —
                customized for Oklahoma soil and climate.
              </p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {LAWN_CARE_SERVICES.map((s) => (
                  <li
                    key={s.slug}
                    className="text-sm text-muted-foreground"
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
                View lawn care services
                <ChevronRight className="h-4 w-4" />
              </span>
            </Link>

            {/* Pest Control card */}
            <Link
              href="/pest-control"
              className="group rounded-xl border border-border bg-card p-8 transition-all duration-[var(--duration-fast)] hover:shadow-[var(--shadow-md)]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Bug className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-foreground">Pest control</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Perimeter pest control, mosquito treatments, flea &amp; tick,
                armyworm, and seasonal pest management.
              </p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {PEST_CONTROL_SERVICES.map((s) => (
                  <li
                    key={s.slug}
                    className="text-sm text-muted-foreground"
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
                View pest control services
                <ChevronRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Elite */}
      <section className="section-gap bg-background">
        <div className="container-marketing">
          <div className="mb-10 text-center">
            <h2 className="text-foreground">
              Why Oklahoma City trusts Elite
            </h2>
            <p className="mx-auto mt-3 text-muted-foreground">
              Not all lawn care companies are created equal. Here&apos;s what
              sets us apart.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIATORS.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="section-gap bg-muted">
        <div className="container-marketing">
          <div className="flex flex-col items-center gap-6 text-center">
            {/* Star rating */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 fill-accent text-accent"
                />
              ))}
            </div>

            <div>
              <p className="text-4xl font-bold text-foreground">
                {BUSINESS.googleRating} / 5.0
              </p>
              <p className="mt-1 text-muted-foreground">
                Based on {BUSINESS.reviewCount}+ verified Google reviews
              </p>
            </div>

            {/* Accolades */}
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="outline" className="px-3 py-1.5 text-xs">
                Inc. 5000 — 4 consecutive years
              </Badge>
              <Badge variant="outline" className="px-3 py-1.5 text-xs">
                BBB A+ rated
              </Badge>
              <Badge variant="outline" className="px-3 py-1.5 text-xs">
                Founded {BUSINESS.founded}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-gap bg-background">
        <div className="container-marketing">
          <div className="mb-10 text-center">
            <h2 className="text-foreground">Serving the OKC metro</h2>
            <p className="mx-auto mt-3 text-muted-foreground">
              Professional lawn care and pest control across {SERVICE_AREAS.length}{" "}
              communities in the Oklahoma City metro area.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {SERVICE_AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground transition-colors duration-[var(--duration-fast)] hover:bg-secondary"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                {area.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      {latestPosts.length > 0 && (
        <section className="section-gap bg-background">
          <div className="container-marketing">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-foreground">From the blog</h2>
                <p className="mt-3 text-muted-foreground">
                  Tips and guides for Oklahoma homeowners.
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:flex"
              >
                View all posts
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group rounded-xl border border-border bg-card transition-all duration-[var(--duration-fast)] hover:shadow-[var(--shadow-md)]"
                >
                  {post.featuredImage && (
                    <div className="aspect-[16/9] overflow-hidden rounded-t-xl bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-[var(--duration-smooth)] group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    {post.category && (
                      <Badge variant="secondary" className="mb-2">
                        {post.category}
                      </Badge>
                    )}
                    <h3 className="mb-2 text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary">
                      {post.title}
                    </h3>
                    {post.publishedAt && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.publishedAt.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 text-center sm:hidden">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary"
              >
                View all posts
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section-gap bg-muted">
        <div className="container-marketing">
          <div className="mb-10 text-center">
            <h2 className="text-foreground">Frequently asked questions</h2>
            <p className="mx-auto mt-3 text-muted-foreground">
              Common questions about our lawn care and pest control services.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <Accordion
              type="single"
              collapsible
              className="rounded-xl border border-border bg-card px-6"
            >
              {HOMEPAGE_FAQ.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-primary">
        <div className="container-marketing flex flex-col items-center gap-6 text-center">
          <h2 className="text-primary-foreground">
            Get your free instant quote
          </h2>
          <p className="mx-auto max-w-xl text-primary-foreground/80">
            Enter your address and get a customized price in minutes — no phone
            call required. Our AI-powered system measures your property and
            calculates an accurate quote on the spot.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/get-a-quote"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-fast)] hover:bg-background/90 hover:shadow-[var(--shadow-md)]"
            >
              Get an instant quote
              <ChevronRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${BUSINESS.phone.replace(/[^\d+]/g, "")}`}
              className="inline-flex items-center justify-center rounded-lg border border-primary-foreground/20 px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-[var(--duration-fast)] hover:bg-primary-foreground/10"
            >
              Or call {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
