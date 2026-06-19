import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServiceClient } from "@/lib/supabase/service";
import type { ViewingAppointmentInsert } from "@/lib/supabase/types";

function validate(body: unknown): ViewingAppointmentInsert | null {
  if (!body || typeof body !== "object") return null;
  const d = body as Record<string, unknown>;
  if (typeof d.full_name !== "string" || typeof d.contact !== "string" || typeof d.project !== "string") {
    return null;
  }
  if (!d.full_name.trim() || !d.contact.trim() || !d.project.trim()) return null;
  const listing_id =
    typeof d.listing_id === "string" && d.listing_id.trim() ? d.listing_id.trim() : null;
  return {
    full_name: d.full_name.trim(),
    contact: d.contact.trim(),
    email: typeof d.email === "string" ? d.email.trim() || null : null,
    project: d.project.trim(),
    listing_id,
    preferred_date: typeof d.preferred_date === "string" ? d.preferred_date || null : null,
    preferred_time: typeof d.preferred_time === "string" ? d.preferred_time.trim() || null : null,
    notes: typeof d.notes === "string" ? d.notes.trim() || null : null,
    locale: typeof d.locale === "string" ? d.locale : "en",
    status: "new",
    assigned_team: "unassigned",
    whatsapp_confirmed: false,
  };
}

export async function POST(request: Request) {
  try {
    const payload = validate(await request.json());
    if (!payload) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

    if (!isSupabaseConfigured()) {
      if (process.env.NODE_ENV === "development") {
        return NextResponse.json({ success: true, mode: "logged" });
      }
      return NextResponse.json({ error: "Booking service unavailable" }, { status: 503 });
    }

    const supabase = createServiceClient();
    const { error } = await supabase.from("viewing_appointments").insert([payload]);
    if (error) {
      console.error("[viewing-appointments]", error.message);
      return NextResponse.json({ error: "Failed to save booking" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
