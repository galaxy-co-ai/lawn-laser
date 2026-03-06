import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact | Elite Lawn Care",
  description:
    "Get in touch with Elite Lawn Care. Call, email, or visit us in Oklahoma City.",
};

export default function ContactPage() {
  return (
    <section className="section-gap bg-background">
      <div className="container-marketing">
        <h1 className="text-foreground mb-4">Contact us</h1>
        <p className="text-lg text-muted-foreground mb-10">
          Have a question or ready to get started? Reach out and we&apos;ll get
          back to you within one business day.
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-foreground text-lg font-semibold mb-4">
                Contact information
              </h2>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="font-medium text-foreground">Phone</dt>
                  <dd>
                    <a
                      href={`tel:${BUSINESS.phone.replace(/[^\d+]/g, "")}`}
                      className="text-primary hover:text-primary/80 transition-colors duration-[--duration-fast]"
                    >
                      {BUSINESS.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${BUSINESS.email}`}
                      className="text-primary hover:text-primary/80 transition-colors duration-[--duration-fast]"
                    >
                      {BUSINESS.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Address</dt>
                  <dd className="text-muted-foreground">
                    {BUSINESS.address.street}
                    <br />
                    {BUSINESS.address.city}, {BUSINESS.address.state}{" "}
                    {BUSINESS.address.zip}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-lg border border-border">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.state} ${BUSINESS.address.zip}`)}&output=embed`}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Elite Lawn Care location"
            />
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-foreground text-lg font-semibold mb-4">
              Send us a message
            </h2>
            <form className="space-y-4">
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
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-[--duration-fast] hover:bg-primary/90"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
