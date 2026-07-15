"use client";

import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/lib/useBookmarks";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  type: "leader" | "event";
  slug: string;
  title: string;
  label?: boolean;
}

export default function BookmarkButton({ type, slug, title, label }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const active = isBookmarked(type, slug);

  return (
    <button
      onClick={() => toggleBookmark({ type, slug, title })}
      aria-pressed={active}
      aria-label={active ? "Remove bookmark" : "Add bookmark"}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
        active
          ? "border-gold bg-gold/10 text-gold"
          : "border-vault-rule text-parchment-dim hover:border-gold hover:text-gold"
      )}
    >
      <Bookmark size={14} className={active ? "fill-gold" : ""} />
      {label !== false && <span>{active ? "Bookmarked" : "Bookmark"}</span>}
    </button>
  );
}
