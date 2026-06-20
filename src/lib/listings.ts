import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServiceClient } from "@/lib/supabase/service";
import type { PropertyListing } from "@/lib/supabase/types";
import type { Locale } from "@/lib/constants";
import {
  getListingEnrichment,
  LISTING_PROJECTS,
  type ListingTag,
} from "@/lib/i18n/get-listing-enrichment";

export type ListingFilter = {
  listingType?: "rent" | "sale";
  featured?: boolean;
  project?: string;
  minPrice?: number;
  maxPrice?: number;
  tag?: ListingTag | string;
  tenantType?: string;
  limit?: number;
};

export type EnrichedListing = {
  listing: PropertyListing;
  enrichment: Awaited<ReturnType<typeof getListingEnrichment>>;
};

export async function getPublishedListings(
  locale: Locale,
  filter: ListingFilter = {},
): Promise<PropertyListing[]> {
  const { listingType, featured, project, minPrice, maxPrice, limit = 6 } = filter;

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
    if (project) {
      query = query.eq("project", project);
    }
    if (minPrice != null) {
      query = query.gte("price", minPrice);
    }
    if (maxPrice != null) {
      query = query.lte("price", maxPrice);
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

export async function getPublishedListingById(
  locale: Locale,
  id: string,
): Promise<PropertyListing | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("property_listings")
      .select("*")
      .eq("id", id)
      .eq("status", "published")
      .eq("locale", locale)
      .maybeSingle();

    if (error) {
      console.error("[listings]", error.message);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export async function getEnrichedListings(
  locale: Locale,
  filter: ListingFilter = {},
): Promise<EnrichedListing[]> {
  const fetchLimit = filter.tag || filter.tenantType ? 200 : (filter.limit ?? 100);
  const listings = await getPublishedListings(locale, { ...filter, limit: fetchLimit });

  const enriched = await Promise.all(
    listings.map(async (listing) => ({
      listing,
      enrichment: await getListingEnrichment(locale, listing.project),
    })),
  );

  return enriched.filter(({ enrichment }) => {
    if (filter.tag && enrichment.tag !== filter.tag) return false;
    if (filter.tenantType && enrichment.targetTenantKey !== filter.tenantType) return false;
    return true;
  });
}

export function getListingProjects(): string[] {
  return LISTING_PROJECTS;
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
