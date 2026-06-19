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
    const [owners, agents, deals, logs] = await Promise.all([
      supabase
        .from("owner_property_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100),
      supabase.from("agents").select("*").order("full_name"),
      supabase.from("co_broke_deals").select("*").order("created_at", { ascending: false }).limit(100),
      supabase
        .from("outreach_follow_up_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(300),
    ]);

    const err = owners.error || agents.error || deals.error || logs.error;
    if (err) return NextResponse.json({ error: err.message }, { status: 500 });

    return NextResponse.json({
      owners: owners.data ?? [],
      agents: agents.data ?? [],
      deals: deals.data ?? [],
      logs: logs.data ?? [],
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
