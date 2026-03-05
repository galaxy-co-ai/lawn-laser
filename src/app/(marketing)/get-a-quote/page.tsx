import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Get a quote | Elite Lawn Care",
  description:
    "Get a free instant quote for lawn care or pest control services in the Oklahoma City metro.",
};

export default function GetAQuotePage() {
  return (
    <section className="section-gap bg-background">
      <div className="container-marketing max-w-2xl">
        <h1 className="text-foreground mb-4">Get a quote</h1>
        <p className="text-lg text-muted-foreground mb-2">
          AI-powered instant quotes coming soon.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          In the meantime, fill out the form below and we&apos;ll get back to
          you within one business day. Or call us directly at{" "}
          <a
            href={`tel:${BUSINESS.phone.replace(/[^\d+]/g, "")}`}
            className="text-primary hover:text-primary/80 transition-colors duration-[--duration-fast]"
          >
            {BUSINESS.phone}
          </a>
          .
        </p>

        <form className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-foreground"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-foreground"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="(405) 555-1234"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="address"
              className="text-sm font-medium text-foreground"
            >
              Property address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="123 Main St, Oklahoma City, OK"
            />
          </div>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-foreground">
              Services interested in
            </legend>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  name="services"
                  value="lawn-care"
                  className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
                />
                Lawn care
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  name="services"
                  value="pest-control"
                  className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
                />
                Pest control
              </label>
            </div>
          </fieldset>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-foreground"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Tell us about your property or any specific concerns..."
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-[--duration-fast] hover:bg-primary/90"
          >
            Send request
          </button>
        </form>
      </div>
    </section>
  );
}
