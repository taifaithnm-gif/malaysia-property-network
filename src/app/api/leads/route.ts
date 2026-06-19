import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { LeadInsert } from "@/lib/supabase/types";

type LeadPayload = {
  full_name: string;
  email: string;
  phone: string;
  property_location?: string | null;
  message?: string | null;
  locale?: string;
  source?: string;
};

function validatePayload(body: unknown): LeadPayload | null {
  if (!body || typeof body !== "object") return null;
  const data = body as Record<string, unknown>;

  if (
    typeof data.full_name !== "string" ||
    typeof data.email !== "string" ||
    typeof data.phone !== "string"
  ) {
    return null;
  }

  if (!data.full_name.trim() || !data.email.trim() || !data.phone.trim()) {
    return null;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    return null;
  }

  return {
    full_name: data.full_name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    property_location:
      typeof data.property_location === "string" ? data.property_location.trim() || null : null,
    message: typeof data.message === "string" ? data.message.trim() || null : null,
    locale: typeof data.locale === "string" ? data.locale : "en",
    source: typeof data.source === "string" ? data.source : "website",
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = validatePayload(body);

    if (!payload) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const lead: LeadInsert = {
      full_name: payload.full_name,
      email: payload.email,
      phone: payload.phone,
      property_location: payload.property_location,
      message: payload.message,
      locale: payload.locale ?? "en",
      source: payload.source ?? "website",
      status: "new",
    };

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn("[leads] Supabase not configured — logging lead locally");
      console.info("[leads]", lead);
      return NextResponse.json({ success: true, mode: "logged" });
    }

    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert([lead]);

    if (error) {
      console.error("[leads] Supabase error:", error.message);
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
