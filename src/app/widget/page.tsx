import type { Metadata } from "next";
import { QuoteWidget } from "@/components/quote/quote-widget";

export const metadata: Metadata = {
  title: "Get a Quote — Elite Lawn Care",
};

export default function WidgetPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <QuoteWidget />
    </div>
  );
}
