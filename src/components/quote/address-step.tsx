"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin, Loader2 } from "lucide-react";

type Props = {
  onComplete: (data: {
    measurementId: string;
    address: string;
    lawnSqFt: number;
    lotSqFt: number;
    buildingFootprintSqFt: number;
  }) => void;
  defaultAddress?: string;
};

declare global {
  interface Window {
    google?: {
      maps: {
        places: {
          Autocomplete: new (
            input: HTMLInputElement,
            opts: Record<string, unknown>
          ) => {
            addListener: (event: string, cb: () => void) => void;
            getPlace: () => { formatted_address?: string };
          };
        };
      };
    };
    __gmapsLoaded?: boolean;
    __gmapsCallbacks?: (() => void)[];
  }
}

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (window.__gmapsLoaded && window.google?.maps?.places) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    if (!window.__gmapsCallbacks) {
      window.__gmapsCallbacks = [];

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=__gmapsInit`;
      script.async = true;
      script.defer = true;

      (window as unknown as Record<string, () => void>).__gmapsInit = () => {
        window.__gmapsLoaded = true;
        window.__gmapsCallbacks?.forEach((cb) => cb());
        window.__gmapsCallbacks = [];
      };

      document.head.appendChild(script);
    }

    window.__gmapsCallbacks.push(resolve);
  });
}

export function AddressStep({ onComplete, defaultAddress }: Props) {
  const [address, setAddress] = useState(defaultAddress ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const autocompleteRef = useRef<any>(null);

  const initAutocomplete = useCallback(async () => {
    if (!inputRef.current || autocompleteRef.current) return;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;

    try {
      await loadGoogleMapsScript(apiKey);
      if (!window.google?.maps?.places || !inputRef.current) return;

      const ac = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["address"],
        componentRestrictions: { country: "us" },
        fields: ["formatted_address"],
      });

      ac.addListener("place_changed", () => {
        const place = ac.getPlace();
        if (place.formatted_address) {
          setAddress(place.formatted_address);
        }
      });

      autocompleteRef.current = ac as typeof autocompleteRef.current;
    } catch {
      // Autocomplete failed to load — user can still type manually
    }
  }, []);

  useEffect(() => {
    initAutocomplete();
  }, [initAutocomplete]);

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
          ref={inputRef}
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
