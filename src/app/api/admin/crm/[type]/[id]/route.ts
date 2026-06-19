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
    const status = typeof body.status === "string" ? body.status.trim() : "";
    if (!status) {
      return NextResponse.json({ error: "Status required" }, { status: 400 });
    }

    const table = TABLE_MAP[type as CrmType];
    const supabase = createAdminClient();
    const { data, error } = await supabase.from(table).update({ status }).eq("id", id).select().single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ record: data });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
