import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";
import type { PropertyListing } from "@/lib/supabase/types";

type ListingUpdate = Partial<Omit<PropertyListing, "id" | "created_at" | "updated_at">>;
type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!isAdminSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { id } = await context.params;

  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const raw = body as Record<string, unknown>;
    const updates: ListingUpdate = {};

    if (typeof raw.title === "string") updates.title = raw.title.trim();
    if (typeof raw.project === "string") updates.project = raw.project.trim();
    if (raw.listing_type === "rent" || raw.listing_type === "sale") updates.listing_type = raw.listing_type;
    if (typeof raw.property_type === "string") updates.property_type = raw.property_type.trim() || null;
    if (raw.bedrooms != null) updates.bedrooms = Number(raw.bedrooms) || null;
    if (raw.bathrooms != null) updates.bathrooms = Number(raw.bathrooms) || null;
    if (raw.size_sqft != null) updates.size_sqft = Number(raw.size_sqft) || null;
    if (raw.price != null) updates.price = Number(raw.price) || null;
    if (typeof raw.price_label === "string") updates.price_label = raw.price_label.trim() || null;
    if (typeof raw.currency === "string") updates.currency = raw.currency;
    if (typeof raw.image_url === "string") updates.image_url = raw.image_url.trim() || null;
    if (typeof raw.description === "string") updates.description = raw.description.trim() || null;
    if (typeof raw.is_featured === "boolean") updates.is_featured = raw.is_featured;
    if (raw.status === "draft" || raw.status === "published" || raw.status === "archived") {
      updates.status = raw.status;
    }
    if (typeof raw.locale === "string") updates.locale = raw.locale;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("property_listings")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ listing: data });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!isAdminSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { id } = await context.params;

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("property_listings").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
