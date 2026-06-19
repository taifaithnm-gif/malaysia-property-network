import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";
import {
  AGENT_CONTACT_STATUS,
  OWNER_OUTREACH_STATUS,
} from "@/lib/admin/acquisition-status";

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

    if (typeof body.assigned_agent_id === "string") updates.assigned_agent_id = body.assigned_agent_id || null;
    if (
      typeof body.owner_outreach_status === "string" &&
      (OWNER_OUTREACH_STATUS as readonly string[]).includes(body.owner_outreach_status)
    ) {
      updates.owner_outreach_status = body.owner_outreach_status;
    }
    if (
      typeof body.agent_contact_status === "string" &&
      (AGENT_CONTACT_STATUS as readonly string[]).includes(body.agent_contact_status)
    ) {
      updates.agent_contact_status = body.agent_contact_status;
    }
    if (typeof body.status === "string") updates.status = body.status.trim();

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const supabase = createAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("owner_property_submissions")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ owner: data });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
