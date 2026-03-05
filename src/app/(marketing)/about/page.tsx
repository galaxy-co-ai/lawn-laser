import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About us | Elite Lawn Care",
  description: `Founded in ${BUSINESS.founded}, Elite Lawn Care has grown to become Oklahoma City's most trusted lawn care and pest control provider.`,
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-gap bg-background">
        <div className="container-marketing">
          <h1 className="text-foreground mb-4">About Elite Lawn Care</h1>
          <p className="text-lg text-muted-foreground">
            Serving Oklahoma homeowners with science-backed lawn care and pest
            control since {BUSINESS.founded}.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-gap bg-muted">
        <div className="container-marketing">
          <h2 className="text-foreground mb-6">Our story</h2>
          <div className="prose max-w-none">
            <p className="text-muted-foreground mb-4">
              Founded in {BUSINESS.founded}, Elite Lawn Care started with a
              simple mission: deliver honest, effective lawn care to Oklahoma
              City homeowners. Over two decades later, that mission hasn&apos;t
              changed — but our capabilities have grown dramatically.
            </p>
            <p className="text-muted-foreground">
              Today we serve thousands of customers across 17 cities in the OKC
              metro, backed by an in-house agronomist, custom fertilizer blends,
              and technology that ensures every visit meets our standards.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-gap bg-background">
        <div className="container-marketing">
          <h2 className="text-foreground mb-6">Our team</h2>
          <p className="text-muted-foreground">
            Team profiles coming soon. Our crew includes certified technicians,
            a staff agronomist, and a leadership team with decades of combined
            experience in Oklahoma turf management.
          </p>
        </div>
      </section>

      {/* Differentiators */}
      <section className="section-gap bg-muted">
        <div className="container-marketing">
          <h2 className="text-foreground mb-6">What sets us apart</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Body cameras on every service visit",
              "In-house agronomist on staff",
              "Blue dye coverage verification",
              "Free resprays if you're not satisfied",
              "Custom Oklahoma fertilizer blends",
              "20+ years serving the OKC metro",
            ].map((item) => (
              <li
                key={item}
                className="rounded-lg border border-border bg-card p-4 text-sm text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Awards */}
      <section className="section-gap bg-background">
        <div className="container-marketing">
          <h2 className="text-foreground mb-6">Awards and recognition</h2>
          <ul className="space-y-3">
            <li className="text-muted-foreground">
              Inc. 5000 fastest-growing private companies (2022, 2023, 2024, 2025)
            </li>
            <li className="text-muted-foreground">
              BBB A+ accredited business
            </li>
            <li className="text-muted-foreground">
              Best of Moore &amp; South OKC 2024
            </li>
          </ul>
          <div className="mt-8">
            <Link
              href="/awards"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-[--duration-fast]"
            >
              View all awards
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
