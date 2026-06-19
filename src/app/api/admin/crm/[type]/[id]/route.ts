import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";

type CrmType = "leads" | "owner-submissions" | "tenant-requests";

const TABLE_MAP: Record<CrmType, "leads" | "owner_property_submissions" | "tenant_requests"> = {
  leads: "leads",
  "owner-submissions": "owner_property_submissions",
  "tenant-requests": "tenant_requests",
};

type RouteContext = { params: Promise<{ type: string; id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!isAdminSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { type, id } = await context.params;
  if (!(type in TABLE_MAP)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const updates: Record<string, unknown> = {};

    if (typeof body.status === "string" && body.status.trim()) {
      updates.status = body.status.trim();
    }
    if (typeof body.whatsapp_confirmed === "boolean" && type === "leads") {
      updates.whatsapp_confirmed = body.whatsapp_confirmed;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const table = TABLE_MAP[type as CrmType];
    const supabase = createAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any).from(table).update(updates).eq("id", id).select().single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ record: data });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
