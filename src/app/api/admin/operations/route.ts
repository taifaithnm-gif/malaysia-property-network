import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!isAdminSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const supabase = createAdminClient();
    const [listings, owners, tenants, viewings, golf, corporate] = await Promise.all([
      supabase.from("property_listings").select("*").order("created_at", { ascending: false }).limit(200),
      supabase.from("owner_property_submissions").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("tenant_requests").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("viewing_appointments").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("golf_travel_inquiries").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("corporate_visit_inquiries").select("*").order("created_at", { ascending: false }).limit(100),
    ]);

    const err = listings.error || owners.error || tenants.error || viewings.error || golf.error || corporate.error;
    if (err) return NextResponse.json({ error: err.message }, { status: 500 });

    return NextResponse.json({
      listings: listings.data ?? [],
      ownerSubmissions: owners.data ?? [],
      tenantRequests: tenants.data ?? [],
      viewingAppointments: viewings.data ?? [],
      golfTravelInquiries: golf.data ?? [],
      corporateVisitInquiries: corporate.data ?? [],
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
