import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient, isAdminSupabaseConfigured } from "@/lib/supabase/admin";
import type { PropertyListingInsert } from "@/lib/supabase/types";

function validateListing(body: unknown): PropertyListingInsert | null {
  if (!body || typeof body !== "object") return null;
  const d = body as Record<string, unknown>;

  if (typeof d.title !== "string" || typeof d.project !== "string" || typeof d.listing_type !== "string") {
    return null;
  }

  const listingType = d.listing_type as string;
  if (listingType !== "rent" && listingType !== "sale") return null;

  const status = typeof d.status === "string" ? d.status : "draft";
  if (status !== "draft" && status !== "published" && status !== "archived") return null;

  return {
    title: d.title.trim(),
    project: d.project.trim(),
    listing_type: listingType,
    property_type: typeof d.property_type === "string" ? d.property_type.trim() || null : null,
    bedrooms: typeof d.bedrooms === "number" ? d.bedrooms : d.bedrooms ? Number(d.bedrooms) : null,
    bathrooms: typeof d.bathrooms === "number" ? d.bathrooms : d.bathrooms ? Number(d.bathrooms) : null,
    size_sqft: typeof d.size_sqft === "number" ? d.size_sqft : d.size_sqft ? Number(d.size_sqft) : null,
    price: typeof d.price === "number" ? d.price : d.price ? Number(d.price) : null,
    price_label: typeof d.price_label === "string" ? d.price_label.trim() || null : null,
    currency: typeof d.currency === "string" ? d.currency : "MYR",
    image_url: typeof d.image_url === "string" ? d.image_url.trim() || null : null,
    description: typeof d.description === "string" ? d.description.trim() || null : null,
    is_featured: Boolean(d.is_featured),
    status,
    locale: typeof d.locale === "string" ? d.locale : "en",
  };
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!isAdminSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("property_listings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ listings: data ?? [] });
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
    const listing = validateListing(body);
    if (!listing) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase.from("property_listings").insert([listing]).select().single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ listing: data });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
