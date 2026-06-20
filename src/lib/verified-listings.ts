import type { Locale } from "@/lib/constants";
import type { PropertyListing } from "@/lib/supabase/types";
import registry from "@/lib/i18n/verified-listings/registry.json";

export type VerifiedListingMeta = {
  listing_key: string;
  match_title: string;
  project: string;
  building: string;
  verified_listing: boolean;
  onsite_checked: boolean;
  verified_date: string;
  inspector?: string;
  real_photos: string[];
  hero_photo: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  size_sqft: number;
  listing_type: string;
  furnished: boolean;
};

export type VerifiedCollectionItem = VerifiedListingMeta & {
  title: string;
  currency: string;
  verifiedBadge: string;
  onsiteLabel: string;
};

export type VerifiedCollection = {
  title: string;
  subtitle: string;
  intro: string;
  count: number;
  listings: VerifiedCollectionItem[];
};

const REGISTRY = registry.listings as VerifiedListingMeta[];

const INTERIM_IMAGES: Record<string, string[]> = {
  "Forest City": [
    "https://images.unsplash.com/photo-1699800257934-9e5b5c5b5b5b?w=1200&q=80&auto=format&fit=crop&sig=mo-verified-fc-0",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80&auto=format&fit=crop&sig=mo-verified-fc-1",
    "https://images.unsplash.com/photo-1484154218962-a197022bcb5d?w=1200&q=80&auto=format&fit=crop&sig=mo-verified-fc-2",
  ],
  "R&F Princess Cove": [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93636?w=1200&q=80&auto=format&fit=crop&sig=mo-verified-rf-0",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80&auto=format&fit=crop&sig=mo-verified-rf-1",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80&auto=format&fit=crop&sig=mo-verified-rf-2",
  ],
  "Country Garden Danga Bay": [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80&auto=format&fit=crop&sig=mo-verified-cg-0",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&auto=format&fit=crop&sig=mo-verified-cg-1",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&auto=format&fit=crop&sig=mo-verified-cg-2",
  ],
};

function normalizeTitle(title: string): string {
  return title.trim().toLowerCase();
}

export function getVerifiedRegistry(): VerifiedListingMeta[] {
  return REGISTRY;
}

export function getVerifiedMetaByKey(key: string): VerifiedListingMeta | undefined {
  return REGISTRY.find((r) => r.listing_key === key);
}

export function getVerifiedMetaForListing(listing: PropertyListing): VerifiedListingMeta | undefined {
  const byKey = getVerifiedMetaByKey(listing.id);
  if (byKey) return byKey;
  const title = normalizeTitle(listing.title);
  return REGISTRY.find((r) => normalizeTitle(r.match_title) === title);
}

export function isVerifiedListing(listing: PropertyListing): boolean {
  return getVerifiedMetaForListing(listing) != null;
}

function interimImage(project: string, index: number): string {
  const pool = INTERIM_IMAGES[project] ?? INTERIM_IMAGES["Forest City"];
  return pool[index % pool.length];
}

export function resolveListingImage(meta: VerifiedListingMeta, index = 0): string {
  return interimImage(meta.project, index);
}

export function resolvePhotoGallery(meta: VerifiedListingMeta): string[] {
  return meta.real_photos.map((_, i) => interimImage(meta.project, i));
}

export async function getVerifiedCollection(locale: Locale): Promise<VerifiedCollection> {
  const mod = await import(`@/lib/i18n/verified-listings/${locale}/collection.json`);
  return mod.default as VerifiedCollection;
}

export function verifiedItemToPropertyListing(
  item: VerifiedCollectionItem,
  locale: Locale,
): PropertyListing {
  const now = new Date().toISOString();
  return {
    id: item.listing_key,
    title: item.title,
    project: item.project,
    listing_type: item.listing_type,
    property_type: item.furnished ? "Furnished" : "Unfurnished",
    bedrooms: item.bedrooms,
    bathrooms: item.bathrooms,
    size_sqft: item.size_sqft,
    price: item.price,
    price_label: null,
    currency: item.currency,
    image_url: resolveListingImage(item, 0),
    description: null,
    is_featured: true,
    status: "published",
    locale,
    agent_id: null,
    source_import_id: null,
    created_at: now,
    updated_at: now,
  };
}

export async function getVerifiedPropertyListings(locale: Locale): Promise<PropertyListing[]> {
  const collection = await getVerifiedCollection(locale);
  return collection.listings.map((item) => verifiedItemToPropertyListing(item, locale));
}

export function applyVerifiedToListing(
  listing: PropertyListing,
  meta?: VerifiedListingMeta,
): PropertyListing {
  if (!meta) return listing;
  return {
    ...listing,
    image_url: listing.image_url ?? resolveListingImage(meta, 0),
    is_featured: listing.is_featured || meta.verified_listing,
  };
}

export function getVerifiedByBuilding(buildingKey: string): VerifiedListingMeta[] {
  return REGISTRY.filter((r) => r.building === buildingKey);
}

export function getVerifiedByProject(projectName: string): VerifiedListingMeta[] {
  return REGISTRY.filter((r) => r.project === projectName);
}
