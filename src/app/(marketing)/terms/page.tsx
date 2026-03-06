import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of use | Elite Lawn Care",
  description: `Terms of use for ${BUSINESS.name} (${BUSINESS.dba}).`,
};

export default function TermsPage() {
  return (
    <section className="section-gap bg-background">
      <div className="container-reading">
        <h1 className="text-foreground mb-6">Terms of use</h1>
        <div className="space-y-6 text-sm text-muted-foreground">
          <div>
            <h2 className="text-foreground mb-2 text-base font-semibold">
              Form submission, SMS, &amp; customer contact disclaimer
            </h2>
            <p>
              By submitting any form presented on this website, I agree that my
              phone number and email address may receive communications regarding
              service notices, billing communications, promotions/deals, and
              other notifications from our company. These messages may be
              delivered via email, SMS, calls, or voicemails. You can opt-out of
              SMS communications at any time by replying &quot;STOP&quot;. You
              can opt-out of email promotional communications at any time by
              clicking the unsubscribe link. Your information is only used
              internally to provide/offer services and never sold to any 3rd
              parties. For more information, please review our{" "}
              <Link
                href="/privacy"
                className="text-primary hover:text-primary/80 transition-colors duration-[var(--duration-fast)]"
              >
                privacy policy
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="text-foreground mb-2 text-base font-semibold">
              Use of this website
            </h2>
            <p>
              This website is operated by {BUSINESS.name} (&quot;
              {BUSINESS.dba}&quot;). By accessing and using this website, you
              accept and agree to be bound by these terms of use. If you do not
              agree, please do not use this website.
            </p>
          </div>

          <div>
            <h2 className="text-foreground mb-2 text-base font-semibold">
              Service descriptions
            </h2>
            <p>
              {BUSINESS.name} makes every effort to accurately describe the
              services offered on this website. However, we do not warrant that
              service descriptions or other content on this site are accurate,
              complete, reliable, current, or error-free. All service pricing is
              subject to change and will be confirmed in your individual quote.
            </p>
          </div>

          <div>
            <h2 className="text-foreground mb-2 text-base font-semibold">
              Intellectual property
            </h2>
            <p>
              All content on this website — including text, graphics, logos,
              images, and software — is the property of {BUSINESS.name} or its
              content suppliers and is protected by United States and
              international copyright laws. Unauthorized duplication or
              publication of any materials from this Site is expressly
              prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-foreground mb-2 text-base font-semibold">
              Limitation of liability
            </h2>
            <p>
              {BUSINESS.name} shall not be liable for any damages arising from
              the use of or inability to use this website or the services
              described herein. This includes but is not limited to direct,
              indirect, incidental, punitive, and consequential damages.
            </p>
          </div>

          <div>
            <h2 className="text-foreground mb-2 text-base font-semibold">
              Governing law
            </h2>
            <p>
              These terms shall be governed by and construed in accordance with
              the laws of the State of Oklahoma, without regard to its conflict
              of law provisions.
            </p>
          </div>

          <div>
            <h2 className="text-foreground mb-2 text-base font-semibold">
              Contact
            </h2>
            <p>
              If you have questions about these terms, please contact us at{" "}
              <a
                href={`mailto:${BUSINESS.email}`}
                className="text-primary hover:text-primary/80 transition-colors duration-[var(--duration-fast)]"
              >
                {BUSINESS.email}
              </a>{" "}
              or call{" "}
              <a
                href={`tel:${BUSINESS.phone.replace(/[^\d+]/g, "")}`}
                className="text-primary hover:text-primary/80 transition-colors duration-[var(--duration-fast)]"
              >
                {BUSINESS.phone}
              </a>
              .
            </p>
          </div>

          <p className="pt-4 text-xs text-muted-foreground/70">
            &copy; {new Date().getFullYear()} {BUSINESS.name}, All rights
            reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
