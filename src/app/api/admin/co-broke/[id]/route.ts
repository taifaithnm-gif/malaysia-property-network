import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";
import { CO_BROKE_DEAL_STATUS } from "@/lib/admin/acquisition-status";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!isAdminSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { id } = await context.params;

  try {
    const body = await request.json();
    const updates: Record<string, unknown> = {};

    if (typeof body.project === "string") updates.project = body.project.trim();
    if (typeof body.listing_id === "string") updates.listing_id = body.listing_id || null;
    if (typeof body.owner_submission_id === "string") updates.owner_submission_id = body.owner_submission_id || null;
    if (typeof body.source_agent_id === "string") updates.source_agent_id = body.source_agent_id || null;
    if (typeof body.viewing_agent_id === "string") updates.viewing_agent_id = body.viewing_agent_id || null;
    if (body.commission_amount != null) updates.commission_amount = Number(body.commission_amount) || null;
    if (body.commission_pct != null) updates.commission_pct = Number(body.commission_pct) || null;
    if (
      typeof body.deal_status === "string" &&
      (CO_BROKE_DEAL_STATUS as readonly string[]).includes(body.deal_status)
    ) {
      updates.deal_status = body.deal_status;
    }
    if (typeof body.notes === "string") updates.notes = body.notes.trim() || null;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const supabase = createAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("co_broke_deals")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ deal: data });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!isAdminSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { id } = await context.params;

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("co_broke_deals").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
