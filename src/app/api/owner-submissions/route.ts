import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServiceClient } from "@/lib/supabase/service";
import type { OwnerPropertySubmissionInsert } from "@/lib/supabase/types";

type Payload = {
  owner_name: string;
  whatsapp: string;
  wechat?: string | null;
  project: string;
  unit_type: string;
  intent: string;
  notes?: string | null;
  locale?: string;
};

function validate(body: unknown): Payload | null {
  if (!body || typeof body !== "object") return null;
  const d = body as Record<string, unknown>;
  if (
    typeof d.owner_name !== "string" ||
    typeof d.whatsapp !== "string" ||
    typeof d.project !== "string" ||
    typeof d.unit_type !== "string" ||
    typeof d.intent !== "string"
  ) {
    return null;
  }
  if (!d.owner_name.trim() || !d.whatsapp.trim() || !d.project.trim() || !d.unit_type.trim() || !d.intent.trim()) {
    return null;
  }
  return {
    owner_name: d.owner_name.trim(),
    whatsapp: d.whatsapp.trim(),
    wechat: typeof d.wechat === "string" ? d.wechat.trim() || null : null,
    project: d.project.trim(),
    unit_type: d.unit_type.trim(),
    intent: d.intent.trim(),
    notes: typeof d.notes === "string" ? d.notes.trim() || null : null,
    locale: typeof d.locale === "string" ? d.locale : "en",
  };
}

export async function POST(request: Request) {
  try {
    const payload = validate(await request.json());
    if (!payload) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const row: OwnerPropertySubmissionInsert = {
      ...payload,
      status: "new",
    };

    if (!isSupabaseConfigured()) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[owner-submissions] Supabase not configured — logging locally");
        console.info("[owner-submissions]", row);
        return NextResponse.json({ success: true, mode: "logged" });
      }
      return NextResponse.json({ error: "Submission service unavailable" }, { status: 503 });
    }

    const supabase = createServiceClient();
    const { error } = await supabase.from("owner_property_submissions").insert([row]);

    if (error) {
      console.error("[owner-submissions]", error.message);
      return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
