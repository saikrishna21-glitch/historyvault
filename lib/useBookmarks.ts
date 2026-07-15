"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "history-vault:bookmarks";

export interface BookmarkEntry {
  type: "leader" | "event";
  slug: string;
  title: string;
}

function readStore(): BookmarkEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BookmarkEntry[]) : [];
  } catch {
    return [];
  }
}

function writeStore(entries: BookmarkEntry[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/** Manage the visitor's bookmarked leaders/events, persisted to localStorage. */
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkEntry[]>([]);

  useEffect(() => {
    setBookmarks(readStore());
  }, []);

  const isBookmarked = useCallback(
    (type: BookmarkEntry["type"], slug: string) =>
      bookmarks.some((b) => b.type === type && b.slug === slug),
    [bookmarks]
  );

  const toggleBookmark = useCallback((entry: BookmarkEntry) => {
    setBookmarks((prev) => {
      const exists = prev.some(
        (b) => b.type === entry.type && b.slug === entry.slug
      );
      const next = exists
        ? prev.filter((b) => !(b.type === entry.type && b.slug === entry.slug))
        : [...prev, entry];
      writeStore(next);
      return next;
    });
  }, []);

  return { bookmarks, isBookmarked, toggleBookmark };
}
