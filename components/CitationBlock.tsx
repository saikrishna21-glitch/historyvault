import { BookOpen } from "lucide-react";
import type { Reference } from "@/lib/types";

export default function CitationBlock({ references }: { references: Reference[] }) {
  if (!references?.length) return null;

  return (
    <div className="dossier p-6 bg-ink-raised/60">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen size={16} className="text-gold" />
        <p className="eyebrow">Sources &amp; References</p>
      </div>
      <ul className="space-y-3">
        {references.map((ref) => (
          <li key={ref.url} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
            <a
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-parchment hover:text-gold gold-underline transition-colors"
            >
              {ref.label}
            </a>
            {ref.publisher && (
              <span className="text-xs font-mono text-parchment-dim">
                — {ref.publisher}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
