import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";
import type { AgentInsert } from "@/lib/supabase/types";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!isAdminSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("agents")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ agents: data ?? [] });
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
    if (!body || typeof body.full_name !== "string" || !body.full_name.trim()) {
      return NextResponse.json({ error: "full_name required" }, { status: 400 });
    }

    const agent: AgentInsert = {
      full_name: body.full_name.trim(),
      whatsapp: typeof body.whatsapp === "string" ? body.whatsapp.trim() || null : null,
      email: typeof body.email === "string" ? body.email.trim() || null : null,
      agency: typeof body.agency === "string" ? body.agency.trim() || null : null,
      commission_rate_pct: body.commission_rate_pct != null ? Number(body.commission_rate_pct) : null,
      commission_notes: typeof body.commission_notes === "string" ? body.commission_notes.trim() || null : null,
      project_tags: Array.isArray(body.project_tags) ? body.project_tags : [],
      status: body.status === "inactive" ? "inactive" : "active",
      notes: typeof body.notes === "string" ? body.notes.trim() || null : null,
    };

    const supabase = createAdminClient();
    const { data, error } = await supabase.from("agents").insert([agent]).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ agent: data });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
