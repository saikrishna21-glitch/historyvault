// Data access layer for History Vault.
//
// By default this reads from the local JSON fixtures in /data so the site
// runs immediately with zero configuration. Once Supabase credentials are
// set in .env.local (see .env.example) and the schema in
// /supabase/schema.sql has been applied and seeded, swap the bodies of
// these functions for Supabase queries — the function signatures and
// return types (see lib/types.ts) are already shaped to match the
// `leaders` and `events` tables, so page components do not need to change.
//
// Example Supabase swap for getLeaders():
//   const { data, error } = await supabase.from("leaders").select("*");
//   if (error) throw error;
//   return data as Leader[];

import leadersJson from "@/data/leaders.json";
import eventsJson from "@/data/events.json";
import type { Leader, HistoricalEvent } from "./types";

const leaders = leadersJson as Leader[];
const events = eventsJson as HistoricalEvent[];

export async function getLeaders(): Promise<Leader[]> {
  return leaders;
}

export async function getFeaturedLeaders(): Promise<Leader[]> {
  return leaders.filter((l) => l.featured);
}

export async function getLeaderBySlug(slug: string): Promise<Leader | undefined> {
  return leaders.find((l) => l.slug === slug);
}

export async function getEvents(): Promise<HistoricalEvent[]> {
  return events;
}

export async function getFeaturedEvents(): Promise<HistoricalEvent[]> {
  return events.filter((e) => e.featured);
}

export async function getEventBySlug(slug: string): Promise<HistoricalEvent | undefined> {
  return events.find((e) => e.slug === slug);
}

export function getLeaderFilterOptions(list: Leader[]) {
  return {
    countries: Array.from(new Set(list.map((l) => l.country))).sort(),
    eras: Array.from(new Set(list.map((l) => l.era))).sort(),
    categories: Array.from(new Set(list.map((l) => l.category))).sort(),
  };
}

export function getEventFilterOptions(list: HistoricalEvent[]) {
  return {
    centuries: Array.from(new Set(list.map((e) => e.century))).sort(),
    continents: Array.from(new Set(list.map((e) => e.continent))).sort(),
    categories: Array.from(new Set(list.map((e) => e.category))).sort(),
  };
}

// Lightweight instant search across both leaders and events by name/title,
// tags, country/continent, and summary. Used by the search page and the
// header search bar's autocomplete dropdown.
export interface SearchResult {
  type: "leader" | "event";
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
}

export async function searchAll(query: string): Promise<SearchResult[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const leaderResults: SearchResult[] = leaders
    .filter((l) =>
      [l.name, l.country, l.era, l.category, l.summary, ...l.tags]
        .join(" ")
        .toLowerCase()
        .includes(q)
    )
    .map((l) => ({
      type: "leader",
      slug: l.slug,
      title: l.name,
      subtitle: `${l.title} · ${l.country}`,
      summary: l.summary,
    }));

  const eventResults: SearchResult[] = events
    .filter((e) =>
      [e.title, e.continent, e.century, e.category, e.summary, ...e.tags]
        .join(" ")
        .toLowerCase()
        .includes(q)
    )
    .map((e) => ({
      type: "event",
      slug: e.slug,
      title: e.title,
      subtitle: `${e.century} · ${e.continent}`,
      summary: e.summary,
    }));

  return [...leaderResults, ...eventResults];
}
