import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServiceClient } from "@/lib/supabase/service";
import type { PropertyListing } from "@/lib/supabase/types";
import type { Locale } from "@/lib/constants";

export type ListingFilter = {
  listingType?: "rent" | "sale";
  featured?: boolean;
  limit?: number;
};

export async function getPublishedListings(
  locale: Locale,
  filter: ListingFilter = {},
): Promise<PropertyListing[]> {
  const { listingType, featured, limit = 6 } = filter;

  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createServiceClient();
    let query = supabase
      .from("property_listings")
      .select("*")
      .eq("status", "published")
      .eq("locale", locale)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (listingType) {
      query = query.eq("listing_type", listingType);
    }
    if (featured) {
      query = query.eq("is_featured", true);
    }

    const { data, error } = await query;
    if (error) {
      console.error("[listings]", error.message);
      return [];
    }
    return data ?? [];
  } catch {
    return [];
  }
}

export function formatListingPrice(listing: PropertyListing, locale: Locale): string {
  if (listing.price_label) return listing.price_label;
  if (listing.price == null) return "—";
  const formatted = new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-MY", {
    style: "currency",
    currency: listing.currency || "MYR",
    maximumFractionDigits: 0,
  }).format(listing.price);
  return listing.listing_type === "rent" ? `${formatted}/mo` : formatted;
}
