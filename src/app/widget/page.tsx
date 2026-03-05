import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Quote - Elite Lawn Care",
};

export default function WidgetPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Get an Instant Quote
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter your address and we will measure your lawn in seconds.
        </p>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Enter your address"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="button"
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get instant quote
          </button>
        </div>
      </div>
    </div>
  );
}
