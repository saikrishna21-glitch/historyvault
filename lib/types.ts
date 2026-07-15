// Core content types for History Vault.
// These mirror the Supabase table shapes in /supabase/schema.sql, so the same
// types work whether data comes from the local JSON fixtures (default) or
// a live Supabase database (see lib/data.ts).

export interface Reference {
  label: string; // e.g. "Britannica — Napoleon I"
  url: string;
  publisher?: string; // e.g. "Encyclopaedia Britannica", "The National Archives"
}

export interface TimelineEvent {
  year: string; // supports ranges/eras, e.g. "1799" or "c. 1799"
  label: string;
}

export interface Leader {
  slug: string;
  name: string;
  title: string; // e.g. "Emperor of the French"
  country: string;
  era: string; // e.g. "18th–19th century"
  category: string; // e.g. "Military & Empire", "Independence Movements"
  birthYear: number | null;
  deathYear: number | null;
  portraitUrl: string;
  summary: string;
  biography: string;
  earlyLife: string;
  riseToPower: string;
  majorAchievements: string[];
  leadershipStyle: string;
  speeches: { title: string; year: string; excerptNote: string }[];
  timeline: TimelineEvent[];
  legacy: string;
  tags: string[];
  references: Reference[];
  featured?: boolean;
}

export interface HistoricalEvent {
  slug: string;
  title: string;
  century: string; // e.g. "20th century"
  continent: string;
  category: string; // e.g. "War & Conflict", "Revolution", "Science & Discovery"
  yearStart: number;
  yearEnd: number | null;
  imageUrl: string;
  summary: string;
  background: string;
  causes: string[];
  keyPeople: { name: string; role: string; leaderSlug?: string }[];
  timeline: TimelineEvent[];
  mapNote: string; // description of geographic scope (used by the map placeholder)
  consequences: string[];
  longTermImpact: string;
  tags: string[];
  references: Reference[];
  featured?: boolean;
}
