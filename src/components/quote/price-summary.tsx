"use client";

import { CheckCircle2, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

type QuoteItem = {
  serviceId: string;
  name: string;
  category: string;
  price: number;
};

type Props = {
  items: QuoteItem[];
  totalPrice: number;
  address: string;
  lawnSqFt: number;
};

export function PriceSummary({ items, totalPrice, address, lawnSqFt }: Props) {
  const lawnItems = items.filter((i) => i.category === "lawn-care");
  const pestItems = items.filter((i) => i.category === "pest-control");

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Your instant quote
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {address} — {lawnSqFt.toLocaleString()} sq ft of lawn
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card divide-y divide-border">
        {lawnItems.length > 0 && (
          <div className="p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Lawn care
            </p>
            <div className="space-y-2">
              {lawnItems.map((item) => (
                <div
                  key={item.serviceId}
                  className="flex items-center justify-between"
                >
                  <span className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    {item.name}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    ${item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {pestItems.length > 0 && (
          <div className="p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Pest control
            </p>
            <div className="space-y-2">
              {pestItems.map((item) => (
                <div
                  key={item.serviceId}
                  className="flex items-center justify-between"
                >
                  <span className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    {item.name}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    ${item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total */}
        <div className="flex items-center justify-between p-4">
          <span className="text-sm font-semibold text-foreground">
            Estimated total
          </span>
          <span className="text-2xl font-bold text-primary">
            ${totalPrice}
          </span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Per-application pricing. Final pricing confirmed after property
        inspection. Prices may vary based on actual measurements and property
        conditions.
      </p>

      <div className="flex flex-col gap-2">
        <a
          href={`tel:${BUSINESS.phone.replace(/[^\d+]/g, "")}`}
          className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card py-3 text-sm font-medium text-foreground transition-colors duration-[var(--duration-fast)] hover:bg-secondary"
        >
          <Phone className="h-4 w-4" />
          Call to schedule — {BUSINESS.phone}
        </a>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        A team member will reach out within 24 hours to confirm your quote and
        schedule service.
      </p>
    </div>
  );
}
