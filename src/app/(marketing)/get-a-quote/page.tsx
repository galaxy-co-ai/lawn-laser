import type { Metadata } from "next";
import { QuoteWidget } from "@/components/quote/quote-widget";

export const metadata: Metadata = {
  title: "Get a Quote — Elite Lawn Care",
  description:
    "Get an instant AI-powered quote for lawn care and pest control services in Oklahoma City. Enter your address and see pricing in seconds.",
};

export default function GetAQuotePage() {
  return (
    <section className="section-gap bg-background">
      <div className="container-marketing flex justify-center">
        <QuoteWidget />
      </div>
    </section>
  );
}
