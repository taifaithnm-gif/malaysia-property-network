import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!isAdminSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const supabase = createAdminClient();

    const [leads, owners, tenants] = await Promise.all([
      supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("owner_property_submissions").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("tenant_requests").select("*").order("created_at", { ascending: false }).limit(100),
    ]);

    if (leads.error || owners.error || tenants.error) {
      return NextResponse.json(
        { error: leads.error?.message || owners.error?.message || tenants.error?.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      leads: leads.data ?? [],
      ownerSubmissions: owners.data ?? [],
      tenantRequests: tenants.data ?? [],
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
