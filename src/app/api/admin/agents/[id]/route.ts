import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";

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

    if (typeof body.full_name === "string") updates.full_name = body.full_name.trim();
    if (typeof body.whatsapp === "string") updates.whatsapp = body.whatsapp.trim() || null;
    if (typeof body.email === "string") updates.email = body.email.trim() || null;
    if (typeof body.agency === "string") updates.agency = body.agency.trim() || null;
    if (body.commission_rate_pct != null) updates.commission_rate_pct = Number(body.commission_rate_pct) || null;
    if (typeof body.commission_notes === "string") updates.commission_notes = body.commission_notes.trim() || null;
    if (Array.isArray(body.project_tags)) updates.project_tags = body.project_tags;
    if (body.status === "active" || body.status === "inactive") updates.status = body.status;
    if (typeof body.notes === "string") updates.notes = body.notes.trim() || null;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const supabase = createAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any).from("agents").update(updates).eq("id", id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ agent: data });
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
    const { error } = await supabase.from("agents").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
