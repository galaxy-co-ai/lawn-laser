"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2, Plus, X } from "lucide-react";

type Service = {
  id: string;
  name: string;
  category: string;
};

type LineItem = {
  serviceId: string;
  unitPrice: number;
  quantity: number;
};

export default function NewQuotePage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lead fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Line items
  const [items, setItems] = useState<LineItem[]>([
    { serviceId: "", unitPrice: 0, quantity: 1 },
  ]);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setServices(json.data);
      });
  }, []);

  function addItem() {
    setItems([...items, { serviceId: "", unitPrice: 0, quantity: 1 }]);
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index));
  }

  function updateItem(index: number, field: keyof LineItem, value: string | number) {
    setItems(
      items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  }

  const total = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim()) return;

    const validItems = items.filter((item) => item.serviceId && item.unitPrice > 0);
    if (validItems.length === 0) {
      setError("Add at least one service with a price.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // First measure the address to get a measurementId
      const measureRes = await fetch("/api/measure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: address.trim() || "Manual entry" }),
      });

      const measureJson = await measureRes.json();
      if (!measureJson.success) {
        setError("Could not create measurement record.");
        return;
      }

      const res = await fetch("/api/admin/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead: {
            firstName: firstName.trim(),
            lastName: lastName.trim() || undefined,
            email: email.trim() || undefined,
            phone: phone.trim() || undefined,
            address: address.trim() || undefined,
          },
          measurementId: measureJson.data.id,
          items: validItems,
        }),
      });

      const json = await res.json();

      if (!json.success) {
        setError("Failed to create quote. Please try again.");
        return;
      }

      router.push(`/quotes/${json.data.quoteId}`);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">New Quote</h1>
        <Button variant="outline" asChild>
          <Link href="/quotes">Cancel</Link>
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Customer Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Property Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St, Oklahoma City, OK 73101"
            />
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Services & Pricing</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add Service
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-end gap-3">
              <div className="flex-1 space-y-1">
                {index === 0 && (
                  <Label className="text-xs text-muted-foreground">
                    Service
                  </Label>
                )}
                <select
                  value={item.serviceId}
                  onChange={(e) =>
                    updateItem(index, "serviceId", e.target.value)
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select service...</option>
                  {services
                    .filter((s) => s.category === "lawn-care")
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  <option disabled>──────────</option>
                  {services
                    .filter((s) => s.category === "pest-control")
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="w-28 space-y-1">
                {index === 0 && (
                  <Label className="text-xs text-muted-foreground">
                    Price ($)
                  </Label>
                )}
                <Input
                  type="number"
                  min="0"
                  step="1"
                  value={item.unitPrice || ""}
                  onChange={(e) =>
                    updateItem(index, "unitPrice", Number(e.target.value))
                  }
                  placeholder="0"
                />
              </div>

              <div className="w-20 space-y-1">
                {index === 0 && (
                  <Label className="text-xs text-muted-foreground">Qty</Label>
                )}
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(index, "quantity", Number(e.target.value))
                  }
                />
              </div>

              {items.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeItem(index)}
                  className="h-10 w-10 shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          <div className="flex justify-end border-t border-border pt-3">
            <p className="text-lg font-bold text-foreground">
              Total: <span className="text-primary">${total}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={submitting} className="min-w-[160px]">
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Quote"
          )}
        </Button>
      </div>
    </form>
  );
}
