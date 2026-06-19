import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";
import type { PropertyImportQueueInsert } from "@/lib/supabase/types";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!isAdminSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const supabase = createAdminClient();
    const [imports, agents] = await Promise.all([
      supabase
        .from("property_import_queue")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200),
      supabase.from("agents").select("id, full_name, project_tags").eq("status", "active"),
    ]);

    if (imports.error) return NextResponse.json({ error: imports.error.message }, { status: 500 });

    return NextResponse.json({
      imports: imports.data ?? [],
      agents: agents.data ?? [],
    });
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
    if (
      typeof body.source_url !== "string" ||
      typeof body.source_platform !== "string" ||
      typeof body.project !== "string"
    ) {
      return NextResponse.json({ error: "source_url, source_platform, project required" }, { status: 400 });
    }

    const row: PropertyImportQueueInsert = {
      source_url: body.source_url.trim(),
      source_platform: body.source_platform.trim(),
      project: body.project.trim(),
      agent_id: typeof body.agent_id === "string" ? body.agent_id : null,
      status: "pending",
      title: typeof body.title === "string" ? body.title.trim() || null : null,
      notes: typeof body.notes === "string" ? body.notes.trim() || null : null,
    };

    const supabase = createAdminClient();
    const { data, error } = await supabase.from("property_import_queue").insert([row]).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ import: data });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
