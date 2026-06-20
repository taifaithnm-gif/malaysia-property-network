import { LISTING_PROJECTS } from "@/lib/i18n/get-listing-enrichment";
import { SERVICE_CATALOG_KEYS } from "@/lib/i18n/service-catalog";

export type MarketplaceStats = {
  totalListings: number;
  projectsCovered: number;
  ownerServices: number;
};

/** Real counts only — listings from Supabase when configured; projects & services from catalog. */
export async function getMarketplaceStats(): Promise<MarketplaceStats> {
  const stats: MarketplaceStats = {
    totalListings: 0,
    projectsCovered: LISTING_PROJECTS.length,
    ownerServices: SERVICE_CATALOG_KEYS.length,
  };

  try {
    const { isSupabaseConfigured } = await import("@/lib/supabase/config");
    if (!isSupabaseConfigured()) return stats;

    const { createServiceClient } = await import("@/lib/supabase/service");
    const supabase = createServiceClient();
    const { count } = await supabase
      .from("property_listings")
      .select("*", { count: "exact", head: true })
      .eq("status", "published");

    if (count != null) {
      stats.totalListings = count;
    }
  } catch {
    /* return zeros + catalog counts */
  }

  return stats;
}
