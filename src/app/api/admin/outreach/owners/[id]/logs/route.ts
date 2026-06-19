import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!isAdminSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { id: ownerSubmissionId } = await context.params;

  try {
    const body = await request.json();
    if (typeof body.note !== "string" || !body.note.trim()) {
      return NextResponse.json({ error: "note required" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("outreach_follow_up_logs")
      .insert([
        {
          owner_submission_id: ownerSubmissionId,
          agent_id: typeof body.agent_id === "string" ? body.agent_id : null,
          note: body.note.trim(),
          follow_up_date: typeof body.follow_up_date === "string" ? body.follow_up_date || null : null,
        },
      ])
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ log: data });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
