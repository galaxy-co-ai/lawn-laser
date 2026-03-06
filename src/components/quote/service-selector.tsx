"use client";

import { useEffect, useState } from "react";
import { Loader2, Sprout, Bug, CheckCircle2 } from "lucide-react";

type Service = {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string | null;
};

type Props = {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
};

export function ServiceSelector({ selectedIds, onChange }: Props) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setServices(json.data);
      })
      .finally(() => setLoading(false));
  }, []);

  function toggle(id: string) {
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((s) => s !== id)
        : [...selectedIds, id]
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const lawnServices = services.filter((s) => s.category === "lawn-care");
  const pestServices = services.filter((s) => s.category === "pest-control");

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Select your services
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose the services you&apos;re interested in.
        </p>
      </div>

      {/* Lawn Care */}
      <div>
        <div className="mb-2 flex items-center gap-1.5">
          <Sprout className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Lawn care</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {lawnServices.map((svc) => (
            <button
              key={svc.id}
              type="button"
              onClick={() => toggle(svc.id)}
              className={`flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-all duration-[var(--duration-fast)] ${
                selectedIds.includes(svc.id)
                  ? "border-primary bg-primary/5 text-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50"
              }`}
            >
              <CheckCircle2
                className={`h-4 w-4 shrink-0 ${
                  selectedIds.includes(svc.id) ? "text-primary" : "text-border"
                }`}
              />
              {svc.name}
            </button>
          ))}
        </div>
      </div>

      {/* Pest Control */}
      <div>
        <div className="mb-2 flex items-center gap-1.5">
          <Bug className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Pest control</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {pestServices.map((svc) => (
            <button
              key={svc.id}
              type="button"
              onClick={() => toggle(svc.id)}
              className={`flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-all duration-[var(--duration-fast)] ${
                selectedIds.includes(svc.id)
                  ? "border-primary bg-primary/5 text-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50"
              }`}
            >
              <CheckCircle2
                className={`h-4 w-4 shrink-0 ${
                  selectedIds.includes(svc.id) ? "text-primary" : "text-border"
                }`}
              />
              {svc.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
