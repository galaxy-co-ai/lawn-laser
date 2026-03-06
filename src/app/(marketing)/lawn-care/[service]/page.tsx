import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LAWN_CARE_SERVICES, BUSINESS } from "@/lib/constants";
import { LAWN_SERVICE_CONTENT } from "@/lib/service-content";

type Props = {
  params: Promise<{ service: string }>;
};

export async function generateStaticParams() {
  return LAWN_CARE_SERVICES.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const found = LAWN_CARE_SERVICES.find((s) => s.slug === service);
  if (!found) return {};

  const content = LAWN_SERVICE_CONTENT[service];
  return {
    title: `${found.name} | Lawn care | Elite Lawn Care`,
    description:
      content?.intro.slice(0, 155) ??
      `Professional ${found.name.toLowerCase()} services in Oklahoma City from Elite Lawn Care.`,
  };
}

export default async function LawnServicePage({ params }: Props) {
  const { service } = await params;
  const found = LAWN_CARE_SERVICES.find((s) => s.slug === service);
  if (!found) notFound();

  const content = LAWN_SERVICE_CONTENT[service];

  return (
    <>
      {/* Header */}
      <section className="section-gap bg-background">
        <div className="container-marketing">
          <p className="mb-2 text-sm text-muted-foreground">
            <Link
              href="/lawn-care"
              className="transition-colors duration-[var(--duration-fast)] hover:text-primary"
            >
              Lawn care
            </Link>{" "}
            / {found.name}
          </p>

          <h1 className="mb-4 text-foreground">
            {content?.headline ?? found.name}
          </h1>

          <p className="mb-8 text-lg text-muted-foreground">
            {content?.intro ??
              `Professional ${found.name.toLowerCase()} services for Oklahoma City and the surrounding metro. Backed by ${BUSINESS.reviewCount}+ reviews and our free respray guarantee.`}
          </p>

          {content && (
            <>
              {/* What we do */}
              <div className="mb-10">
                <h2 className="mb-4 text-foreground">What we do</h2>
                <ul className="space-y-3">
                  {content.details.map((detail) => (
                    <li key={detail} className="flex gap-3 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="mb-10 rounded-xl border border-border bg-card p-8">
                <h2 className="mb-4 text-foreground">Results you can expect</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {content.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex gap-3 text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Seasonal note */}
              {content.seasonalNote && (
                <div className="mb-10 rounded-xl border border-accent/30 bg-accent/5 p-6">
                  <h3 className="mb-2 text-sm font-semibold text-accent-foreground">
                    Seasonal timing
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {content.seasonalNote}
                  </p>
                </div>
              )}

              {/* FAQ */}
              {content.faq.length > 0 && (
                <div className="mb-10">
                  <h2 className="mb-4 text-foreground">
                    Frequently asked questions
                  </h2>
                  <Accordion type="single" collapsible className="rounded-xl border border-border bg-card px-6">
                    {content.faq.map((item, i) => (
                      <AccordionItem key={i} value={`faq-${i}`}>
                        <AccordionTrigger>{item.q}</AccordionTrigger>
                        <AccordionContent>{item.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-primary">
        <div className="container-marketing flex flex-col items-center gap-4 text-center">
          <h2 className="text-primary-foreground">
            Get a {found.name.toLowerCase()} quote
          </h2>
          <p className="mx-auto max-w-xl text-primary-foreground/80">
            Free instant quotes — no phone call required.
          </p>
          <Link
            href="/get-a-quote"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-fast)] hover:bg-background/90 hover:shadow-[var(--shadow-md)]"
          >
            Get an instant quote
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
