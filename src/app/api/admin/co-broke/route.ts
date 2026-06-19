import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";
import type { CoBrokeDealInsert } from "@/lib/supabase/types";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!isAdminSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("co_broke_deals")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ deals: data ?? [] });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!isAdminSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    if (typeof body.project !== "string" || !body.project.trim()) {
      return NextResponse.json({ error: "project required" }, { status: 400 });
    }

    const deal: CoBrokeDealInsert = {
      project: body.project.trim(),
      listing_id: typeof body.listing_id === "string" ? body.listing_id : null,
      owner_submission_id: typeof body.owner_submission_id === "string" ? body.owner_submission_id : null,
      source_agent_id: typeof body.source_agent_id === "string" ? body.source_agent_id : null,
      viewing_agent_id: typeof body.viewing_agent_id === "string" ? body.viewing_agent_id : null,
      commission_amount: body.commission_amount != null ? Number(body.commission_amount) : null,
      commission_pct: body.commission_pct != null ? Number(body.commission_pct) : null,
      deal_status: typeof body.deal_status === "string" ? body.deal_status : "prospect",
      notes: typeof body.notes === "string" ? body.notes.trim() || null : null,
    };

    const supabase = createAdminClient();
    const { data, error } = await supabase.from("co_broke_deals").insert([deal]).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ deal: data });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
