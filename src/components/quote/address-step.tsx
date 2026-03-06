"use client";

import { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";

type Props = {
  onComplete: (data: {
    measurementId: string;
    address: string;
    lawnSqFt: number;
    lotSqFt: number;
    buildingFootprintSqFt: number;
  }) => void;
};

export function AddressStep({ onComplete }: Props) {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!address.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/measure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: address.trim() }),
      });

      const json = await res.json();

      if (!json.success) {
        setError(
          typeof json.error === "string"
            ? json.error
            : "Could not measure this address. Please try again."
        );
        return;
      }

      onComplete({
        measurementId: json.data.id,
        address: json.data.address,
        lawnSqFt: json.data.lawnSqFt,
        lotSqFt: json.data.lotSqFt,
        buildingFootprintSqFt: json.data.buildingFootprintSqFt,
      });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Where is your property?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your full address and we&apos;ll measure your lawn instantly.
        </p>
      </div>

      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="123 Main St, Oklahoma City, OK 73101"
          className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          disabled={loading}
          autoFocus
        />
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || !address.trim()}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors duration-[var(--duration-fast)] hover:bg-primary/90 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Measuring your property...
          </>
        ) : (
          "Measure my lawn"
        )}
      </button>
    </form>
  );
}
