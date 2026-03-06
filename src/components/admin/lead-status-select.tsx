"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = ["new", "contacted", "quoted", "won", "lost"] as const;

type Props = {
  leadId: string;
  currentStatus: string;
};

export function LeadStatusSelect({ leadId, currentStatus }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleChange(newStatus: string) {
    setSaving(true);
    setStatus(newStatus);

    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        setStatus(currentStatus);
      } else {
        router.refresh();
      }
    } catch {
      setStatus(currentStatus);
    } finally {
      setSaving(false);
    }
  }

  return (
    <select
      value={status}
      onChange={(e) => handleChange(e.target.value)}
      disabled={saving}
      className="rounded-md border border-input bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </option>
      ))}
    </select>
  );
}
