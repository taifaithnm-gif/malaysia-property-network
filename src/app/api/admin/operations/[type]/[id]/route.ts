import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";

type RouteContext = { params: Promise<{ type: string; id: string }> };

const TABLE_MAP: Record<string, string> = {
  viewings: "viewing_appointments",
  golf: "golf_travel_inquiries",
  corporate: "corporate_visit_inquiries",
  listings: "property_listings",
  owners: "owner_property_submissions",
  tenants: "tenant_requests",
};

export async function PATCH(request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!isAdminSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { type, id } = await context.params;
  const table = TABLE_MAP[type];
  if (!table) return NextResponse.json({ error: "Invalid type" }, { status: 400 });

  try {
    const body = await request.json();
    const updates: Record<string, unknown> = {};
    if (typeof body.status === "string") updates.status = body.status.trim();
    if (typeof body.assigned_team === "string") updates.assigned_team = body.assigned_team;
    if (typeof body.whatsapp_confirmed === "boolean") updates.whatsapp_confirmed = body.whatsapp_confirmed;

    const supabase = createAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any).from(table).update(updates).eq("id", id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ record: data });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
