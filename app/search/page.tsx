"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { User, Landmark } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import SearchBar from "@/components/SearchBar";
import { searchAll, type SearchResult } from "@/lib/data";

function SearchResults() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    searchAll(q).then(setResults);
  }, [q]);

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-16">
      <SectionHeading
        eyebrow="Instant search"
        title="Search the Vault"
        description="Search across every leader and event by name, country, era, category, or tag."
      />

      <div className="mt-8">
        <SearchBar variant="hero" autoFocus />
      </div>

      {q && (
        <p className="eyebrow mt-10 mb-4">
          {results.length} result{results.length === 1 ? "" : "s"} for “{q}”
        </p>
      )}

      <div className="space-y-3">
        {results.map((r) => (
          <Link
            key={`${r.type}-${r.slug}`}
            href={`/${r.type === "leader" ? "leaders" : "events"}/${r.slug}`}
            className="glass flex items-start gap-4 rounded-xl p-4 hover:shadow-goldGlow transition-shadow"
          >
            <span className="mt-1 text-gold">
              {r.type === "leader" ? <User size={16} /> : <Landmark size={16} />}
            </span>
            <span>
              <span className="block font-display text-lg text-parchment">{r.title}</span>
              <span className="block text-sm text-gold-dim">{r.subtitle}</span>
              <span className="block text-sm text-parchment-dim mt-1 line-clamp-2">
                {r.summary}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
}
