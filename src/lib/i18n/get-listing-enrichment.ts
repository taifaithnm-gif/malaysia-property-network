import type { Locale } from "@/lib/constants";

export type ListingEnrichmentKey =
  | "forest-city"
  | "rf-princess-cove"
  | "danga-bay"
  | "bukit-indah"
  | "mount-austin"
  | "eco-botanic"
  | "medini";

export type ListingEnrichment = {
  projectKey: ListingEnrichmentKey;
  projectName: string;
  tag: string;
  rentalDemandScore: number;
  targetTenantType: string;
  targetTenantKey: string;
  projectSummary: string;
  amenities: string[];
  rentalAnalysis: string[];
  tenantProfile: string[];
  profileSlug: string;
  gallerySlug: string;
};

const PROJECT_NAME_MAP: Record<string, ListingEnrichmentKey> = {
  "Forest City": "forest-city",
  "R&F Princess Cove": "rf-princess-cove",
  "Danga Bay": "danga-bay",
  "Bukit Indah": "bukit-indah",
  "Mount Austin": "mount-austin",
  "Eco Botanic": "eco-botanic",
  Medini: "medini",
};

const loaders = {
  en: {
    "forest-city": () => import("./listing-enrichment/en/forest-city.json").then((m) => m.default),
    "rf-princess-cove": () =>
      import("./listing-enrichment/en/rf-princess-cove.json").then((m) => m.default),
    "danga-bay": () => import("./listing-enrichment/en/danga-bay.json").then((m) => m.default),
    "bukit-indah": () => import("./listing-enrichment/en/bukit-indah.json").then((m) => m.default),
    "mount-austin": () => import("./listing-enrichment/en/mount-austin.json").then((m) => m.default),
    "eco-botanic": () => import("./listing-enrichment/en/eco-botanic.json").then((m) => m.default),
    medini: () => import("./listing-enrichment/en/medini.json").then((m) => m.default),
  },
  zh: {
    "forest-city": () => import("./listing-enrichment/zh/forest-city.json").then((m) => m.default),
    "rf-princess-cove": () =>
      import("./listing-enrichment/zh/rf-princess-cove.json").then((m) => m.default),
    "danga-bay": () => import("./listing-enrichment/zh/danga-bay.json").then((m) => m.default),
    "bukit-indah": () => import("./listing-enrichment/zh/bukit-indah.json").then((m) => m.default),
    "mount-austin": () => import("./listing-enrichment/zh/mount-austin.json").then((m) => m.default),
    "eco-botanic": () => import("./listing-enrichment/zh/eco-botanic.json").then((m) => m.default),
    medini: () => import("./listing-enrichment/zh/medini.json").then((m) => m.default),
  },
};

export function projectNameToKey(project: string): ListingEnrichmentKey | null {
  return PROJECT_NAME_MAP[project] ?? null;
}

export async function getListingEnrichment(
  locale: Locale,
  project: string,
): Promise<ListingEnrichment> {
  const key = projectNameToKey(project) ?? "forest-city";
  return loaders[locale][key]() as Promise<ListingEnrichment>;
}

export const LISTING_PROJECTS = Object.keys(PROJECT_NAME_MAP);

export const LISTING_TAGS = ["owner_management", "commuter", "family", "investor"] as const;
export type ListingTag = (typeof LISTING_TAGS)[number];

export const LISTING_TENANT_KEYS = [
  "china_owner",
  "singapore_commuter",
  "local_family",
  "investor",
] as const;

export type ListingTenantKey = (typeof LISTING_TENANT_KEYS)[number];

export function getTenantLabel(key: ListingTenantKey, locale: Locale): string {
  const labels: Record<Locale, Record<ListingTenantKey, string>> = {
    en: {
      china_owner: "China Owner",
      singapore_commuter: "Singapore Commuter",
      local_family: "Local Family",
      investor: "Investor",
    },
    zh: {
      china_owner: "中国业主",
      singapore_commuter: "新加坡通勤族",
      local_family: "本地家庭",
      investor: "投资者",
    },
  };
  return labels[locale][key];
}
