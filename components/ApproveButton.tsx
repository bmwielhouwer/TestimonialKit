"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ApproveButtonProps {
  id: string;
}

export default function ApproveButton({ id }: ApproveButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function approve() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed");
      router.refresh();
    } catch {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={approve}
      disabled={loading}
      className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
    >
      {loading ? "Approving…" : error ? "Retry" : "Approve"}
    </button>
  );
}
