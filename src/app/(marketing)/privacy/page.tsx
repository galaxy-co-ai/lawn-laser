import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy policy | Elite Lawn Care",
  description: `Privacy policy for ${BUSINESS.name} (${BUSINESS.dba}).`,
};

export default function PrivacyPage() {
  return (
    <section className="section-gap bg-background">
      <div className="container-reading">
        <h1 className="text-foreground mb-6">Privacy policy</h1>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            {BUSINESS.name} (&quot;{BUSINESS.dba}&quot;) is committed to
            protecting your privacy. This privacy policy outlines how we
            collect, use, and protect your personal information.
          </p>
          <p>Full privacy policy content coming soon.</p>
          <p>
            If you have questions about our privacy practices, please contact us
            at{" "}
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
