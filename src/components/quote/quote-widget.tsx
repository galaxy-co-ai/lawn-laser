"use client";

import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { AddressStep } from "./address-step";
import { MeasurementDisplay } from "./measurement-display";
import { ServiceSelector } from "./service-selector";
import { LeadCapture } from "./lead-capture";
import { PriceSummary } from "./price-summary";

type MeasurementData = {
  measurementId: string;
  address: string;
  lawnSqFt: number;
  lotSqFt: number;
  buildingFootprintSqFt: number;
};

type QuoteItem = {
  serviceId: string;
  name: string;
  category: string;
  price: number;
};

type QuoteResult = {
  items: QuoteItem[];
  totalPrice: number;
};

type Step = "address" | "services" | "contact" | "quote";

const STEP_LABELS: Record<Step, string> = {
  address: "Property",
  services: "Services",
  contact: "Contact",
  quote: "Quote",
};

const STEPS: Step[] = ["address", "services", "contact", "quote"];

export function QuoteWidget() {
  const [step, setStep] = useState<Step>("address");
  const [measurement, setMeasurement] = useState<MeasurementData | null>(null);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentStepIndex = STEPS.indexOf(step);

  function handleAddressComplete(data: MeasurementData) {
    setMeasurement(data);
    setStep("services");
  }

  function handleServicesNext() {
    if (selectedServiceIds.length === 0) return;
    setStep("contact");
  }

  async function handleLeadComplete(lead: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) {
    if (!measurement) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          measurementId: measurement.measurementId,
          serviceIds: selectedServiceIds,
          lead,
        }),
      });

      const json = await res.json();

      if (!json.success) {
        setError(
          typeof json.error === "string"
            ? json.error
            : "Could not generate quote. Please try again."
        );
        return;
      }

      setQuoteResult({
        items: json.data.items,
        totalPrice: json.data.totalPrice,
      });
      setStep("quote");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function goBack() {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setStep(STEPS[prevIndex]);
      setError(null);
    }
  }

  return (
    <div className="w-full max-w-lg space-y-4">
      {/* Progress bar */}
      <div className="flex items-center gap-1">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={`h-1 w-full rounded-full transition-colors duration-[var(--duration-normal)] ${
                i <= currentStepIndex ? "bg-primary" : "bg-border"
              }`}
            />
            <span
              className={`text-[10px] ${
                i <= currentStepIndex
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {STEP_LABELS[s]}
            </span>
          </div>
        ))}
      </div>

      {/* Back button */}
      {currentStepIndex > 0 && step !== "quote" && (
        <button
          type="button"
          onClick={goBack}
          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>
      )}

      {/* Measurement display (persistent after step 1) */}
      {measurement && step !== "address" && step !== "quote" && (
        <MeasurementDisplay
          address={measurement.address}
          lawnSqFt={measurement.lawnSqFt}
          lotSqFt={measurement.lotSqFt}
          buildingFootprintSqFt={measurement.buildingFootprintSqFt}
        />
      )}

      {/* Steps */}
      {step === "address" && (
        <AddressStep onComplete={handleAddressComplete} />
      )}

      {step === "services" && (
        <>
          <ServiceSelector
            selectedIds={selectedServiceIds}
            onChange={setSelectedServiceIds}
          />
          <button
            type="button"
            onClick={handleServicesNext}
            disabled={selectedServiceIds.length === 0}
            className="flex w-full items-center justify-center rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors duration-[var(--duration-fast)] hover:bg-primary/90 disabled:opacity-50"
          >
            Continue ({selectedServiceIds.length} selected)
          </button>
        </>
      )}

      {step === "contact" && (
        <>
          {loading ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Calculating your quote...
              </p>
            </div>
          ) : (
            <LeadCapture onComplete={handleLeadComplete} />
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </>
      )}

      {step === "quote" && quoteResult && measurement && (
        <PriceSummary
          items={quoteResult.items}
          totalPrice={quoteResult.totalPrice}
          address={measurement.address}
          lawnSqFt={measurement.lawnSqFt}
        />
      )}
    </div>
  );
}
