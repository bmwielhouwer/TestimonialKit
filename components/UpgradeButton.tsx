"use client";

import { useState } from "react";

interface UpgradeButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function UpgradeButton({ className = "", children }: UpgradeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upgrade() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const json = await res.json();
      if (!res.ok || !json.url) {
        throw new Error(json.error ?? "Unable to start checkout.");
      }
      window.location.href = json.url as string;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button type="button" onClick={upgrade} disabled={loading} className={className}>
        {loading ? "Redirecting…" : children ?? "Upgrade to Pro"}
      </button>
      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
    </div>
  );
}
