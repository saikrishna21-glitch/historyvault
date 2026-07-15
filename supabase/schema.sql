-- History Vault — Supabase schema
-- Run this in the Supabase SQL editor (or via `supabase db push`) to create
-- the tables backing the site. Row Level Security is enabled with public
-- read access, since all content here is meant to be publicly viewable;
-- writes should go through a service role key from an admin/editorial tool,
-- never from the browser client.

create extension if not exists "uuid-ossp";

-- ─── Leaders ─────────────────────────────────────────────────────────────
create table if not exists leaders (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  title text not null,
  country text not null,
  era text not null,
  category text not null,
  birth_year int,
  death_year int,
  portrait_url text,
  summary text not null,
  biography text not null,
  early_life text not null,
  rise_to_power text not null,
  major_achievements jsonb not null default '[]',   -- string[]
  leadership_style text not null,
  speeches jsonb not null default '[]',              -- { title, year, excerptNote }[]
  timeline jsonb not null default '[]',               -- { year, label }[]
  legacy text not null,
  tags jsonb not null default '[]',                   -- string[]
  references jsonb not null default '[]',             -- { label, url, publisher }[]
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leaders_country_idx on leaders (country);
create index if not exists leaders_era_idx on leaders (era);
create index if not exists leaders_category_idx on leaders (category);

-- ─── Historical Events ──────────────────────────────────────────────────
create table if not exists events (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  century text not null,
  continent text not null,
  category text not null,
  year_start int not null,
  year_end int,
  image_url text,
  summary text not null,
  background text not null,
  causes jsonb not null default '[]',                 -- string[]
  key_people jsonb not null default '[]',             -- { name, role, leaderSlug }[]
  timeline jsonb not null default '[]',                -- { year, label }[]
  map_note text,
  consequences jsonb not null default '[]',            -- string[]
  long_term_impact text not null,
  tags jsonb not null default '[]',                    -- string[]
  references jsonb not null default '[]',              -- { label, url, publisher }[]
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists events_century_idx on events (century);
create index if not exists events_continent_idx on events (continent);
create index if not exists events_category_idx on events (category);

-- ─── Row Level Security: public read-only ──────────────────────────────
alter table leaders enable row level security;
alter table events enable row level security;

create policy "Public read access to leaders"
  on leaders for select
  using (true);

create policy "Public read access to events"
  on events for select
  using (true);

-- Writes are intentionally NOT granted to the anon/public role. Manage
-- content through the Supabase dashboard or an authenticated editorial
-- tool using the service role key.
