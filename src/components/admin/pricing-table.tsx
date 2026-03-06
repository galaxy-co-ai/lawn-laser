"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus, Loader2, Check, X } from "lucide-react";

type PricingRule = {
  id: string;
  serviceId: string;
  pricePerSqFt: number | null;
  flatPrice: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  isActive: boolean;
  serviceName: string;
  serviceSlug: string;
  serviceCategory: string;
};

type ServiceWithoutRule = {
  id: string;
  name: string;
  slug: string;
  category: string;
};

type Props = {
  category: "lawn-care" | "pest-control";
  label: string;
  rules: PricingRule[];
  servicesWithoutRules: ServiceWithoutRule[];
};

type EditState = {
  ruleId: string | null;
  serviceId: string | null;
  isNew: boolean;
  pricePerSqFt: string;
  flatPrice: string;
  minPrice: string;
  maxPrice: string;
};

const EMPTY_EDIT: EditState = {
  ruleId: null,
  serviceId: null,
  isNew: false,
  pricePerSqFt: "",
  flatPrice: "",
  minPrice: "",
  maxPrice: "",
};

export function PricingTable({ category, label, rules, servicesWithoutRules }: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState<EditState>(EMPTY_EDIT);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startEdit = useCallback((rule: PricingRule) => {
    setEditing({
      ruleId: rule.id,
      serviceId: rule.serviceId,
      isNew: false,
      pricePerSqFt: rule.pricePerSqFt?.toString() ?? "",
      flatPrice: rule.flatPrice?.toString() ?? "",
      minPrice: rule.minPrice?.toString() ?? "",
      maxPrice: rule.maxPrice?.toString() ?? "",
    });
    setError(null);
  }, []);

  const startCreate = useCallback((service: ServiceWithoutRule) => {
    setEditing({
      ruleId: null,
      serviceId: service.id,
      isNew: true,
      pricePerSqFt: "",
      flatPrice: "",
      minPrice: "",
      maxPrice: "",
    });
    setError(null);
  }, []);

  const cancel = useCallback(() => {
    setEditing(EMPTY_EDIT);
    setError(null);
  }, []);

  async function save() {
    setSaving(true);
    setError(null);

    const payload: Record<string, unknown> = {};
    if (editing.pricePerSqFt) payload.pricePerSqFt = parseFloat(editing.pricePerSqFt);
    if (editing.flatPrice) payload.flatPrice = parseFloat(editing.flatPrice);
    if (editing.minPrice) payload.minPrice = parseFloat(editing.minPrice);
    if (editing.maxPrice) payload.maxPrice = parseFloat(editing.maxPrice);

    try {
      if (editing.isNew) {
        payload.serviceId = editing.serviceId;
        const res = await fetch("/api/admin/pricing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!json.success) {
          setError(typeof json.error === "string" ? json.error : "Failed to create rule");
          return;
        }
      } else {
        // Clear values that are empty (set to null)
        if (!editing.pricePerSqFt) payload.pricePerSqFt = null;
        if (!editing.flatPrice) payload.flatPrice = null;
        if (!editing.minPrice) payload.minPrice = null;
        if (!editing.maxPrice) payload.maxPrice = null;

        const res = await fetch(`/api/admin/pricing/${editing.ruleId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!json.success) {
          setError(typeof json.error === "string" ? json.error : "Failed to update rule");
          return;
        }
      }

      setEditing(EMPTY_EDIT);
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  }

  async function deleteRule(ruleId: string) {
    setDeleting(ruleId);
    try {
      const res = await fetch(`/api/admin/pricing/${ruleId}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) {
        setError(typeof json.error === "string" ? json.error : "Failed to delete");
        return;
      }
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setDeleting(null);
    }
  }

  async function toggleActive(rule: PricingRule) {
    try {
      const res = await fetch(`/api/admin/pricing/${rule.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !rule.isActive }),
      });
      const json = await res.json();
      if (json.success) router.refresh();
    } catch {
      // silent fail — user can retry
    }
  }

  const isPestControl = category === "pest-control";

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground">{label}</h2>
        {servicesWithoutRules.length > 0 && !editing.isNew && (
          <div className="relative">
            <select
              className="appearance-none rounded-lg border border-input bg-background px-3 py-1.5 pr-8 text-sm text-foreground"
              value=""
              onChange={(e) => {
                const svc = servicesWithoutRules.find((s) => s.id === e.target.value);
                if (svc) startCreate(svc);
              }}
            >
              <option value="">+ Add pricing rule</option>
              {servicesWithoutRules.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <Plus className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          </div>
        )}
      </div>

      {error && (
        <div className="border-b border-border bg-destructive/10 px-6 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="px-6 py-3 font-medium">Service</th>
              {!isPestControl && (
                <th className="px-6 py-3 font-medium text-right">$/sqft</th>
              )}
              {isPestControl && (
                <th className="px-6 py-3 font-medium text-right">Flat price</th>
              )}
              <th className="px-6 py-3 font-medium text-right">Min</th>
              <th className="px-6 py-3 font-medium text-right">Max</th>
              <th className="px-6 py-3 font-medium text-center">Active</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => {
              const isEditing = editing.ruleId === rule.id;

              return (
                <tr key={rule.id} className="border-b border-border last:border-0">
                  <td className="px-6 py-3 font-medium text-foreground">
                    {rule.serviceName}
                  </td>

                  {/* Price column */}
                  {!isPestControl && (
                    <td className="px-6 py-3 text-right">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.001"
                          value={editing.pricePerSqFt}
                          onChange={(e) =>
                            setEditing((s) => ({ ...s, pricePerSqFt: e.target.value }))
                          }
                          className="w-24 rounded border border-input bg-background px-2 py-1 text-right text-sm text-foreground"
                          placeholder="0.006"
                        />
                      ) : (
                        <span className="text-foreground">
                          {rule.pricePerSqFt
                            ? `$${rule.pricePerSqFt.toFixed(3)}`
                            : "—"}
                        </span>
                      )}
                    </td>
                  )}
                  {isPestControl && (
                    <td className="px-6 py-3 text-right">
                      {isEditing ? (
                        <input
                          type="number"
                          step="1"
                          value={editing.flatPrice}
                          onChange={(e) =>
                            setEditing((s) => ({ ...s, flatPrice: e.target.value }))
                          }
                          className="w-24 rounded border border-input bg-background px-2 py-1 text-right text-sm text-foreground"
                          placeholder="65"
                        />
                      ) : (
                        <span className="text-foreground">
                          {rule.flatPrice ? `$${rule.flatPrice}` : "—"}
                        </span>
                      )}
                    </td>
                  )}

                  {/* Min */}
                  <td className="px-6 py-3 text-right">
                    {isEditing ? (
                      <input
                        type="number"
                        step="1"
                        value={editing.minPrice}
                        onChange={(e) =>
                          setEditing((s) => ({ ...s, minPrice: e.target.value }))
                        }
                        className="w-20 rounded border border-input bg-background px-2 py-1 text-right text-sm text-foreground"
                        placeholder="45"
                      />
                    ) : (
                      <span className="text-muted-foreground">
                        {rule.minPrice ? `$${rule.minPrice}` : "—"}
                      </span>
                    )}
                  </td>

                  {/* Max */}
                  <td className="px-6 py-3 text-right">
                    {isEditing ? (
                      <input
                        type="number"
                        step="1"
                        value={editing.maxPrice}
                        onChange={(e) =>
                          setEditing((s) => ({ ...s, maxPrice: e.target.value }))
                        }
                        className="w-20 rounded border border-input bg-background px-2 py-1 text-right text-sm text-foreground"
                        placeholder="350"
                      />
                    ) : (
                      <span className="text-muted-foreground">
                        {rule.maxPrice ? `$${rule.maxPrice}` : "—"}
                      </span>
                    )}
                  </td>

                  {/* Active toggle */}
                  <td className="px-6 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => toggleActive(rule)}
                      className={`inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        rule.isActive ? "bg-primary" : "bg-border"
                      }`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
                          rule.isActive ? "translate-x-4" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-3 text-right">
                    {isEditing ? (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={save}
                          disabled={saving}
                          className="rounded p-1 text-primary hover:bg-primary/10 disabled:opacity-50"
                        >
                          {saving ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={cancel}
                          className="rounded p-1 text-muted-foreground hover:bg-muted"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => startEdit(rule)}
                          className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteRule(rule.id)}
                          disabled={deleting === rule.id}
                          className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                        >
                          {deleting === rule.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}

            {/* New rule row */}
            {editing.isNew && (
              <tr className="border-b border-border bg-muted/30">
                <td className="px-6 py-3 font-medium text-foreground">
                  {servicesWithoutRules.find((s) => s.id === editing.serviceId)?.name ?? "—"}
                </td>
                {!isPestControl && (
                  <td className="px-6 py-3 text-right">
                    <input
                      type="number"
                      step="0.001"
                      value={editing.pricePerSqFt}
                      onChange={(e) =>
                        setEditing((s) => ({ ...s, pricePerSqFt: e.target.value }))
                      }
                      className="w-24 rounded border border-input bg-background px-2 py-1 text-right text-sm text-foreground"
                      placeholder="0.006"
                      autoFocus
                    />
                  </td>
                )}
                {isPestControl && (
                  <td className="px-6 py-3 text-right">
                    <input
                      type="number"
                      step="1"
                      value={editing.flatPrice}
                      onChange={(e) =>
                        setEditing((s) => ({ ...s, flatPrice: e.target.value }))
                      }
                      className="w-24 rounded border border-input bg-background px-2 py-1 text-right text-sm text-foreground"
                      placeholder="65"
                      autoFocus
                    />
                  </td>
                )}
                <td className="px-6 py-3 text-right">
                  <input
                    type="number"
                    step="1"
                    value={editing.minPrice}
                    onChange={(e) =>
                      setEditing((s) => ({ ...s, minPrice: e.target.value }))
                    }
                    className="w-20 rounded border border-input bg-background px-2 py-1 text-right text-sm text-foreground"
                    placeholder="45"
                  />
                </td>
                <td className="px-6 py-3 text-right">
                  <input
                    type="number"
                    step="1"
                    value={editing.maxPrice}
                    onChange={(e) =>
                      setEditing((s) => ({ ...s, maxPrice: e.target.value }))
                    }
                    className="w-20 rounded border border-input bg-background px-2 py-1 text-right text-sm text-foreground"
                    placeholder="350"
                  />
                </td>
                <td className="px-6 py-3 text-center">
                  <span className="text-xs text-muted-foreground">Active</span>
                </td>
                <td className="px-6 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={save}
                      disabled={saving}
                      className="rounded p-1 text-primary hover:bg-primary/10 disabled:opacity-50"
                    >
                      {saving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={cancel}
                      className="rounded p-1 text-muted-foreground hover:bg-muted"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )}

            {rules.length === 0 && !editing.isNew && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                  No pricing rules configured. Add one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
