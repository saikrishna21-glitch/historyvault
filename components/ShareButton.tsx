"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // user cancelled or share failed — fall through to clipboard
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full border border-vault-rule px-4 py-2 text-sm text-parchment-dim hover:border-gold hover:text-gold transition-colors"
    >
      {copied ? <Check size={14} /> : <Share2 size={14} />}
      <span>{copied ? "Link copied" : "Share"}</span>
    </button>
  );
}
