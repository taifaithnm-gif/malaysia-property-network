import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./config";
import type { Database } from "./types";

/** Server-side client for API routes (no cookies required). */
export function createServiceClient() {
  const env = getSupabaseEnv();
  if (!env) {
    throw new Error("Supabase is not configured");
  }

  return createSupabaseClient<Database>(env.url, env.anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
