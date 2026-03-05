import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Careers | Elite Lawn Care",
  description:
    "Join the Elite Lawn Care team — Oklahoma City's fastest-growing lawn care and pest control company.",
};

export default function CareersPage() {
  return (
    <section className="section-gap bg-background">
      <div className="container-marketing">
        <h1 className="text-foreground mb-4">Careers</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Join Oklahoma City&apos;s fastest-growing lawn care and pest control
          team. We&apos;re an Inc. 5000 company looking for people who take
          pride in their work.
        </p>

        <div className="rounded-xl border border-border bg-card p-8 mb-8">
          <h2 className="text-foreground text-lg font-semibold mb-3">
            Why work at Elite
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Competitive pay and benefits</li>
            <li>Year-round employment</li>
            <li>Growth opportunities — we promote from within</li>
            <li>Professional training and certifications</li>
            <li>Be part of a team recognized by Inc. 5000 four years running</li>
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-8">
          <h2 className="text-foreground text-lg font-semibold mb-3">
            Current openings
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Contact us to learn about current openings and apply.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`tel:${BUSINESS.phone.replace(/[^\d+]/g, "")}`}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-[--duration-fast] hover:bg-primary/90"
            >
              Call {BUSINESS.phone}
            </a>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors duration-[--duration-fast] hover:bg-secondary"
            >
              Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
