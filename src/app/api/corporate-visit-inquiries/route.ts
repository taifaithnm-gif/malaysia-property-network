import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServiceClient } from "@/lib/supabase/service";
import type { CorporateVisitInquiryInsert } from "@/lib/supabase/types";

function validate(body: unknown): CorporateVisitInquiryInsert | null {
  if (!body || typeof body !== "object") return null;
  const d = body as Record<string, unknown>;
  if (typeof d.full_name !== "string" || typeof d.contact !== "string" || typeof d.visit_type !== "string") {
    return null;
  }
  if (!d.full_name.trim() || !d.contact.trim() || !d.visit_type.trim()) return null;
  return {
    full_name: d.full_name.trim(),
    contact: d.contact.trim(),
    company: typeof d.company === "string" ? d.company.trim() || null : null,
    visit_type: d.visit_type.trim(),
    visit_dates: typeof d.visit_dates === "string" ? d.visit_dates.trim() || null : null,
    group_size: d.group_size != null ? Number(d.group_size) || null : null,
    notes: typeof d.notes === "string" ? d.notes.trim() || null : null,
    locale: typeof d.locale === "string" ? d.locale : "en",
    status: "new",
  };
}

export async function POST(request: Request) {
  try {
    const payload = validate(await request.json());
    if (!payload) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }
    const supabase = createServiceClient();
    const { error } = await supabase.from("corporate_visit_inquiries").insert([payload]);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
