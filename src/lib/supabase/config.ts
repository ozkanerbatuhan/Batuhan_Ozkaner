/** Centralized check for whether Supabase env vars are present. */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * When false, the site runs in "demo" mode: public pages render the curated
 * fallback project list and the admin area is effectively disabled. This keeps
 * the site deployable and viewable before any Supabase credentials are set.
 */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
