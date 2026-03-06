"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  isActive: boolean;
  endpoint: "services" | "areas";
};

export function ActiveToggle({ id, isActive, endpoint }: Props) {
  const router = useRouter();
  const [active, setActive] = useState(isActive);
  const [saving, setSaving] = useState(false);

  async function toggle() {
    setSaving(true);
    const next = !active;
    setActive(next); // optimistic

    try {
      const res = await fetch(`/api/admin/${endpoint}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: next }),
      });
      const json = await res.json();
      if (!json.success) {
        setActive(!next); // revert
      } else {
        router.refresh();
      }
    } catch {
      setActive(!next); // revert
    } finally {
      setSaving(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={saving}
      className={`inline-flex h-5 w-9 items-center rounded-full transition-colors disabled:opacity-50 ${
        active ? "bg-primary" : "bg-border"
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
          active ? "translate-x-4" : "translate-x-1"
        }`}
      />
    </button>
  );
}
