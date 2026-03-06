"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BUSINESS } from "@/lib/constants";
import { ChevronRight, Loader2 } from "lucide-react";

export default function GetAQuotePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const services = data.getAll("services") as string[];

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone") || undefined,
          address: data.get("address") || undefined,
          source: "quote-form",
          metadata: {
            services,
            message: data.get("message") || undefined,
          },
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error?.email?.[0] || "Something went wrong");
      }

      router.push("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  return (
    <section className="section-gap bg-background">
      <div className="container-marketing max-w-2xl">
        <h1 className="mb-4 text-foreground">Get a quote</h1>
        <p className="mb-2 text-lg text-muted-foreground">
          AI-powered instant quotes coming soon.
        </p>
        <p className="mb-8 text-sm text-muted-foreground">
          In the meantime, fill out the form below and we&apos;ll get back to
          you within one business day. Or call us directly at{" "}
          <a
            href={`tel:${BUSINESS.phone.replace(/[^\d+]/g, "")}`}
            className="text-primary transition-colors duration-[var(--duration-fast)] hover:text-primary/80"
          >
            {BUSINESS.phone}
          </a>
          .
        </p>

        {error && (
          <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-foreground"
            >
              Name <span className="text-destructive">*</span>
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
              Email <span className="text-destructive">*</span>
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
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-fast)] hover:bg-primary/90 hover:shadow-[var(--shadow-md)] disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send request
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
