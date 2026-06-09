"use client";

import { useState } from "react";

interface EmbedCodeProps {
  businessId: string;
  appUrl: string;
}

export default function EmbedCode({ businessId, appUrl }: EmbedCodeProps) {
  const [copied, setCopied] = useState(false);
  const base = appUrl.replace(/\/$/, "");
  const snippet = `<iframe
  src="${base}/widget/${businessId}"
  title="Customer testimonials"
  width="100%"
  height="600"
  style="border:0;"
  loading="lazy"
></iframe>`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-slate-700">Embed your widget</h3>
        <button
          type="button"
          onClick={copy}
          className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-700"
        >
          {copied ? "Copied!" : "Copy code"}
        </button>
      </div>
      <p className="mb-3 text-xs text-slate-500">
        Paste this snippet anywhere in your site&apos;s HTML to show your approved testimonials.
      </p>
      <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">
        <code>{snippet}</code>
      </pre>
    </div>
  );
}
