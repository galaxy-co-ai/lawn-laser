import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a quote | Elite Lawn Care",
  description:
    "Get a free instant quote for lawn care or pest control services in the Oklahoma City metro.",
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
