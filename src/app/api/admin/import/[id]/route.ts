import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";
import { IMPORT_QUEUE_STATUS } from "@/lib/admin/acquisition-status";

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

    if (typeof body.source_url === "string") updates.source_url = body.source_url.trim();
    if (typeof body.source_platform === "string") updates.source_platform = body.source_platform.trim();
    if (typeof body.project === "string") updates.project = body.project.trim();
    if (typeof body.agent_id === "string") updates.agent_id = body.agent_id || null;
    if (typeof body.title === "string") updates.title = body.title.trim() || null;
    if (typeof body.notes === "string") updates.notes = body.notes.trim() || null;
    if (typeof body.listing_id === "string") updates.listing_id = body.listing_id || null;
    if (
      typeof body.status === "string" &&
      (IMPORT_QUEUE_STATUS as readonly string[]).includes(body.status)
    ) {
      updates.status = body.status;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const supabase = createAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("property_import_queue")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ import: data });
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
    const { error } = await supabase.from("property_import_queue").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
