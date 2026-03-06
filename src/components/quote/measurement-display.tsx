"use client";

import { Ruler, Home, Trees } from "lucide-react";

type Props = {
  address: string;
  lawnSqFt: number;
  lotSqFt: number;
  buildingFootprintSqFt: number;
};

function formatSqFt(n: number): string {
  return n.toLocaleString("en-US");
}

export function MeasurementDisplay({
  address,
  lawnSqFt,
  lotSqFt,
  buildingFootprintSqFt,
}: Props) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Property measurement
      </p>
      <p className="mb-3 text-sm text-foreground font-medium">{address}</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center gap-1 rounded-md bg-muted p-3">
          <Trees className="h-4 w-4 text-primary" />
          <span className="text-lg font-bold text-foreground">
            {formatSqFt(lawnSqFt)}
          </span>
          <span className="text-[11px] text-muted-foreground">Lawn sq ft</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-md bg-muted p-3">
          <Ruler className="h-4 w-4 text-primary" />
          <span className="text-lg font-bold text-foreground">
            {formatSqFt(lotSqFt)}
          </span>
          <span className="text-[11px] text-muted-foreground">Lot sq ft</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-md bg-muted p-3">
          <Home className="h-4 w-4 text-primary" />
          <span className="text-lg font-bold text-foreground">
            {formatSqFt(buildingFootprintSqFt)}
          </span>
          <span className="text-[11px] text-muted-foreground">Building</span>
        </div>
      </div>
    </div>
  );
}
