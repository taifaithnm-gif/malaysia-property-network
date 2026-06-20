import type { Locale } from "@/lib/constants";
import type { ListingEnrichmentKey } from "@/lib/i18n/get-listing-enrichment";
import { projectNameToKey } from "@/lib/i18n/get-listing-enrichment";

export type RentalIntelligence = {
  projectKey: ListingEnrichmentKey;
  projectName: string;
  averageRent: string;
  averageRentValue: number;
  rentalYield: string;
  vacancyEstimate: string;
  rentalDemandScore: number;
  targetTenantKey: string;
  targetTenantProfile: string;
  insights: string[];
};

const loaders = {
  en: {
    "forest-city": () => import("./rental-intelligence/en/forest-city.json").then((m) => m.default),
    "rf-princess-cove": () =>
      import("./rental-intelligence/en/rf-princess-cove.json").then((m) => m.default),
    "danga-bay": () => import("./rental-intelligence/en/danga-bay.json").then((m) => m.default),
    "bukit-indah": () => import("./rental-intelligence/en/bukit-indah.json").then((m) => m.default),
    "mount-austin": () => import("./rental-intelligence/en/mount-austin.json").then((m) => m.default),
    "eco-botanic": () => import("./rental-intelligence/en/eco-botanic.json").then((m) => m.default),
    medini: () => import("./rental-intelligence/en/medini.json").then((m) => m.default),
  },
  zh: {
    "forest-city": () => import("./rental-intelligence/zh/forest-city.json").then((m) => m.default),
    "rf-princess-cove": () =>
      import("./rental-intelligence/zh/rf-princess-cove.json").then((m) => m.default),
    "danga-bay": () => import("./rental-intelligence/zh/danga-bay.json").then((m) => m.default),
    "bukit-indah": () => import("./rental-intelligence/zh/bukit-indah.json").then((m) => m.default),
    "mount-austin": () => import("./rental-intelligence/zh/mount-austin.json").then((m) => m.default),
    "eco-botanic": () => import("./rental-intelligence/zh/eco-botanic.json").then((m) => m.default),
    medini: () => import("./rental-intelligence/zh/medini.json").then((m) => m.default),
  },
};

export async function getRentalIntelligence(
  locale: Locale,
  key: ListingEnrichmentKey,
): Promise<RentalIntelligence> {
  return loaders[locale][key]() as Promise<RentalIntelligence>;
}

export async function getRentalIntelligenceByProject(
  locale: Locale,
  project: string,
): Promise<RentalIntelligence | null> {
  const key = projectNameToKey(project);
  if (!key) return null;
  return getRentalIntelligence(locale, key);
}
