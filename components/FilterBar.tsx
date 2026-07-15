"use client";

import { SlidersHorizontal } from "lucide-react";

export interface FilterConfig {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function FilterBar({ filters }: { filters: FilterConfig[] }) {
  return (
    <div className="glass rounded-2xl p-4 flex flex-wrap items-center gap-3">
      <span className="flex items-center gap-2 eyebrow text-gold shrink-0">
        <SlidersHorizontal size={14} />
        Filter
      </span>
      {filters.map((f) => (
        <select
          key={f.label}
          value={f.value}
          onChange={(e) => f.onChange(e.target.value)}
          className="bg-ink-raised border border-vault-rule rounded-full px-4 py-2 text-sm text-parchment focus:border-gold outline-none"
        >
          <option value="">All {f.label}</option>
          {f.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}
