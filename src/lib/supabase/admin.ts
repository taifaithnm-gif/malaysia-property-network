import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const PLACEHOLDER_KEY = "your-service-role-key";

export function isAdminSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !key) return false;
  if (key === PLACEHOLDER_KEY) return false;

  return url.startsWith("https://") && url.includes(".supabase.co");
}

/** Server-side admin client — bypasses RLS. Never import in client components. */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !key || key === PLACEHOLDER_KEY) {
    throw new Error("Supabase service role is not configured");
  }

  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
