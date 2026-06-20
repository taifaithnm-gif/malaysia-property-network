/** Sprint 03 marketplace metrics — used for trust layer and SEO. */
export const MARKETPLACE_STATS: MarketplaceStats = {
  totalListings: 300,
  projectsCovered: 7,
  ownerServices: 6,
  viewingRequests: 850,
  galleryImages: 460,
};

export type MarketplaceStats = {
  totalListings: number;
  projectsCovered: number;
  ownerServices: number;
  viewingRequests: number;
  galleryImages: number;
};

export async function getMarketplaceStats(): Promise<MarketplaceStats> {
  const base = { ...MARKETPLACE_STATS };
  try {
    const { isSupabaseConfigured } = await import("@/lib/supabase/config");
    if (!isSupabaseConfigured()) return base;
    const { createServiceClient } = await import("@/lib/supabase/service");
    const supabase = createServiceClient();
    const { count } = await supabase
      .from("property_listings")
      .select("*", { count: "exact", head: true })
      .eq("status", "published");
    if (count != null && count > 0) {
      base.totalListings = count;
    }
    const { count: viewingCount } = await supabase
      .from("viewing_appointments")
      .select("*", { count: "exact", head: true });
    if (viewingCount != null && viewingCount > 0) {
      base.viewingRequests = viewingCount;
    }
  } catch {
    /* use sprint defaults */
  }
  return base;
}
