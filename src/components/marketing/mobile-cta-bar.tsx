"use client";

import Link from "next/link";
import { Phone, FileText } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export function MobileCtaBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm px-4 py-2 md:hidden">
      <div className="flex gap-2">
        <a
          href={`tel:${BUSINESS.phone.replace(/[^\d+]/g, "")}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors duration-[var(--duration-fast)] active:bg-secondary"
        >
          <Phone className="h-4 w-4" />
          Call now
        </a>
        <Link
          href="/get-a-quote"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors duration-[var(--duration-fast)] active:bg-primary/90"
        >
          <FileText className="h-4 w-4" />
          Get a quote
        </Link>
      </div>
    </div>
  );
}
