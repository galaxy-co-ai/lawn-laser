import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of service | Elite Lawn Care",
  description: `Terms of service for ${BUSINESS.name} (${BUSINESS.dba}).`,
};

export default function TermsPage() {
  return (
    <section className="section-gap bg-background">
      <div className="container-reading">
        <h1 className="text-foreground mb-6">Terms of service</h1>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            These terms of service govern your use of the {BUSINESS.name} (
            &quot;{BUSINESS.dba}&quot;) website and services.
          </p>
          <p>Full terms of service content coming soon.</p>
          <p>
            If you have questions about our terms, please contact us at{" "}
            <a
              href={`mailto:${BUSINESS.email}`}
              className="text-primary hover:text-primary/80 transition-colors duration-[--duration-fast]"
            >
              {BUSINESS.email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
