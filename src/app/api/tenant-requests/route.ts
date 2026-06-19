import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServiceClient } from "@/lib/supabase/service";
import type { TenantRequestInsert } from "@/lib/supabase/types";

type Payload = {
  full_name: string;
  contact: string;
  budget?: string | null;
  intent: string;
  preferred_project?: string | null;
  move_in_date?: string | null;
  locale?: string;
};

function validate(body: unknown): Payload | null {
  if (!body || typeof body !== "object") return null;
  const d = body as Record<string, unknown>;
  if (typeof d.full_name !== "string" || typeof d.contact !== "string" || typeof d.intent !== "string") {
    return null;
  }
  if (!d.full_name.trim() || !d.contact.trim() || !d.intent.trim()) return null;
  if (d.intent !== "rent" && d.intent !== "buy") return null;

  return {
    full_name: d.full_name.trim(),
    contact: d.contact.trim(),
    budget: typeof d.budget === "string" ? d.budget.trim() || null : null,
    intent: d.intent,
    preferred_project: typeof d.preferred_project === "string" ? d.preferred_project.trim() || null : null,
    move_in_date: typeof d.move_in_date === "string" && d.move_in_date ? d.move_in_date : null,
    locale: typeof d.locale === "string" ? d.locale : "en",
  };
}

export async function POST(request: Request) {
  try {
    const payload = validate(await request.json());
    if (!payload) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const row: TenantRequestInsert = {
      ...payload,
      status: "new",
    };

    if (!isSupabaseConfigured()) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[tenant-requests] Supabase not configured — logging locally");
        console.info("[tenant-requests]", row);
        return NextResponse.json({ success: true, mode: "logged" });
      }
      return NextResponse.json({ error: "Request service unavailable" }, { status: 503 });
    }

    const supabase = createServiceClient();
    const { error } = await supabase.from("tenant_requests").insert([row]);

    if (error) {
      console.error("[tenant-requests]", error.message);
      return NextResponse.json({ error: "Failed to save request" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
