// Supabase client factory.
//
// History Vault ships using local JSON fixtures (see lib/data.ts) so it runs
// with zero setup. To move to a live database:
//   1. Create a Supabase project and run /supabase/schema.sql against it.
//   2. Seed the `leaders` and `events` tables (the JSON files in /data map
//      directly to the table columns and can be imported as-is).
//   3. Copy .env.example to .env.local and fill in your project URL/anon key.
//   4. Update the functions in lib/data.ts to query `supabase` instead of
//      the JSON imports (an example query is included there).
//
// This file intentionally throws only when actually called without env
// vars set, rather than at import time, so the JSON-fixture code path keeps
// working out of the box without any Supabase project configured.

import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local, or continue using the " +
        "local JSON fixtures in lib/data.ts."
    );
  }

  client = createClient(url, anonKey);
  return client;
}
