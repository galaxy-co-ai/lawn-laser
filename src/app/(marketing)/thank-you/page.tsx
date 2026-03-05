import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Thank you | Elite Lawn Care",
  description: "Thank you for contacting Elite Lawn Care.",
};

export default function ThankYouPage() {
  return (
    <section className="section-gap bg-background">
      <div className="container-marketing max-w-2xl text-center">
        <h1 className="text-foreground mb-4">Thank you</h1>
        <p className="text-lg text-muted-foreground mb-4">
          We&apos;ve received your request and will get back to you within one
          business day.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Need an answer sooner? Call us at{" "}
          <a
            href={`tel:${BUSINESS.phone.replace(/[^\d+]/g, "")}`}
            className="text-primary hover:text-primary/80 transition-colors duration-[--duration-fast]"
          >
            {BUSINESS.phone}
          </a>
          .
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-[--duration-fast] hover:bg-primary/90"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
