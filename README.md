# History Vault

An elegant, citation-first archive of the world's greatest leaders and its
most important historical events — dark theme, gold accents, glassmorphism,
and a full editorial data model built for real sourced content.

This build ships as a working, production-ready Next.js application with a
**small sample dataset** (6 leaders, 6 events) so you can run it immediately.
**Before a real launch, replace the sample dataset** with fully-sourced
entries — see "A note on historical accuracy" below.

---

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** for styling, **Framer Motion** for animation
- **Supabase** (Postgres) as the optional live database — ships with a local
  JSON fixture fallback so it runs with zero configuration
- `lucide-react` for icons

> Note on shadcn/ui: the brief asked for shadcn/ui, but this build uses
> hand-built Tailwind components instead, styled to a specific "archival
> dossier" design language (see Design below) rather than shadcn's default
> primitives. If you'd like shadcn/ui wired in for its accessible primitives
> (Dialog, Command palette, etc.), run `npx shadcn@latest init` and swap in
> its components — the Tailwind tokens in `tailwind.config.ts` are already
> structured to drop into shadcn's theming system.

## Design

- **Palette:** warm near-black (`ink`), antique gold (`gold`), ivory text
  (`parchment`), with a rare deep-emerald accent reserved for "verified
  source" moments.
- **Type:** Fraunces (display serif) for headlines, Inter for body copy, IBM
  Plex Mono for dates, tags, and citations — reinforcing the archival/ledger
  feel.
- **Signature element:** the "dossier" frame (thin gold hairline border with
  museum-vitrine corner brackets, see `.dossier` in `globals.css`) and the
  "ledger rail" vertical timeline (`.ledger-rail` / `.ledger-tick`) used
  consistently across leader profiles, event pages, and the world timeline.
- Respects `prefers-reduced-motion`; all interactive elements have visible
  keyboard focus states.

## Project structure

```
history-vault/
├── app/
│   ├── layout.tsx           # fonts, theme init, nav/footer, SEO metadata
│   ├── page.tsx             # Home
│   ├── leaders/
│   │   ├── page.tsx         # World Leaders listing + filters
│   │   └── [slug]/page.tsx  # Leader profile (dossier)
│   ├── events/
│   │   ├── page.tsx         # Historical Events listing + filters
│   │   └── [slug]/page.tsx  # Event detail (dossier)
│   ├── timeline/page.tsx    # Full interactive world timeline
│   ├── search/page.tsx      # Instant search results page
│   ├── sitemap.ts           # Dynamic sitemap for SEO
│   └── robots.ts
├── components/              # Reusable UI: cards, filters, timeline, etc.
├── lib/
│   ├── types.ts             # Leader / HistoricalEvent / Reference types
│   ├── data.ts              # Data access layer (JSON now, Supabase-ready)
│   ├── supabase.ts          # Supabase client factory
│   ├── useBookmarks.ts      # localStorage-backed bookmarks hook
│   └── utils.ts
├── data/
│   ├── leaders.json         # Sample dataset — replace/extend with sourced content
│   └── events.json
├── supabase/
│   └── schema.sql           # Postgres schema mirroring lib/types.ts
└── public/
    ├── portraits/            # Placeholder monogram SVGs — replace with real images
    └── events/                # Placeholder SVGs — replace with real images
```

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. No environment variables are required — the
site reads from `data/leaders.json` and `data/events.json` out of the box.

## Moving to a live Supabase database

The JSON fixtures are a drop-in stand-in for a real database so the site
works immediately. To make content editable without a code deploy:

1. Create a project at [supabase.com](https://supabase.com).
2. Run `supabase/schema.sql` in the Supabase SQL editor (creates `leaders`
   and `events` tables with public read-only Row Level Security).
3. Import the contents of `data/leaders.json` / `data/events.json` into
   their respective tables — the JSON fields map directly to columns
   (camelCase → snake_case, e.g. `birthYear` → `birth_year`).
4. Copy `.env.example` to `.env.local` and fill in your Supabase project URL
   and anon key.
5. In `lib/data.ts`, swap each function body for a Supabase query — an
   example is included as a comment at the top of that file.

## A note on historical accuracy

Per the project brief, **no historical facts should be invented**. The
sample entries in `data/leaders.json` and `data/events.json` describe
well-documented, widely-taught figures and events (e.g. Lincoln, Gandhi,
Mandela, WWII, the French Revolution) using only well-established facts, and
each entry links to a reputable source (Britannica, national archives,
NASA, the Nobel Prize organization). Before a production launch:

- Have an editor verify every fact against the cited source and correct any
  drift.
- Confirm every reference URL is live and still points to the correct page.
- Replace placeholder portrait/event SVGs in `public/` with licensed images
  from museums, archives, or press agencies, with proper attribution.
- Extend the dataset to cover Ancient and Medieval history — the timeline
  and filtering UI already support any century/era without code changes.

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. If using Supabase, add `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` as Environment Variables in the Vercel
   project settings.
4. Deploy — Vercel auto-detects Next.js, no build configuration needed.

To deploy elsewhere (Netlify, Render, a Node server, etc.), run
`npm run build` then `npm run start`, or use Next.js's static/standalone
output options per your host's Next.js guide.

## Features implemented

- Dark "Vault" theme + light "Reading Room" theme, toggled and persisted
- Glassmorphism cards/nav (`backdrop-blur` + translucent borders)
- Framer Motion scroll-reveal animations throughout, `prefers-reduced-motion` safe
- Reading progress bar (`components/ReadingProgress.tsx`)
- Bookmark favorites, persisted to `localStorage` (no login required)
- Native share (Web Share API) with clipboard-copy fallback
- Instant search with autocomplete dropdown + dedicated results page
- Filter by country/era/category (leaders) and century/continent/category (events)
- Related leaders / related events on every dossier page
- Lazy-loaded images via `next/image` (except above-the-fold hero images)
- SEO: per-page metadata, Open Graph tags, dynamic `sitemap.xml` and `robots.txt`
- Fully responsive from mobile through desktop
