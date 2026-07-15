"use client";

import { Search, User, Landmark } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { searchAll, type SearchResult } from "@/lib/data";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  variant?: "hero" | "compact";
  placeholder?: string;
  autoFocus?: boolean;
}

export default function SearchBar({
  variant = "compact",
  placeholder = "Search leaders, wars, revolutions, eras…",
  autoFocus = false,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    searchAll(query).then((r) => {
      if (active) setResults(r.slice(0, 6));
    });
    return () => {
      active = false;
    };
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={cn(
          "glass flex items-center gap-3 rounded-full px-5",
          variant === "hero" ? "py-4" : "py-2.5"
        )}
      >
        <Search size={variant === "hero" ? 20 : 16} className="text-gold shrink-0" />
        <input
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className={cn(
            "w-full bg-transparent outline-none placeholder:text-parchment-dim/70",
            variant === "hero" ? "text-lg" : "text-sm"
          )}
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full glass rounded-2xl overflow-hidden">
          {results.map((r) => (
            <Link
              key={`${r.type}-${r.slug}`}
              href={`/${r.type === "leader" ? "leaders" : "events"}/${r.slug}`}
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 px-4 py-3 hover:bg-gold/10 transition-colors border-b border-white/5 last:border-none"
            >
              <span className="mt-0.5 text-gold">
                {r.type === "leader" ? <User size={14} /> : <Landmark size={14} />}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-parchment truncate">
                  {r.title}
                </span>
                <span className="block text-xs text-parchment-dim truncate">
                  {r.subtitle}
                </span>
              </span>
            </Link>
          ))}
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            onClick={() => setOpen(false)}
            className="block text-center eyebrow py-3 hover:bg-gold/10 transition-colors"
          >
            See all results
          </Link>
        </div>
      )}
    </div>
  );
}
