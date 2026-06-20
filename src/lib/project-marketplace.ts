import type { Locale } from "@/lib/constants";
import type { ListingEnrichmentKey } from "@/lib/i18n/get-listing-enrichment";

export type PopularProject = {
  key: ListingEnrichmentKey;
  slug: string;
  dbName: string;
  rentalDemandScore: number;
  tag: string;
};

/** Rental demand rankings from Sprint 02 project mix. */
export const POPULAR_PROJECTS: PopularProject[] = [
  { key: "bukit-indah", slug: "bukit-indah", dbName: "Bukit Indah", rentalDemandScore: 5, tag: "family" },
  { key: "mount-austin", slug: "mount-austin", dbName: "Mount Austin", rentalDemandScore: 5, tag: "commuter" },
  { key: "rf-princess-cove", slug: "rf-princess-cove", dbName: "R&F Princess Cove", rentalDemandScore: 5, tag: "commuter" },
  { key: "eco-botanic", slug: "eco-botanic", dbName: "Eco Botanic", rentalDemandScore: 4, tag: "family" },
  { key: "medini", slug: "medini", dbName: "Medini", rentalDemandScore: 4, tag: "commuter" },
  { key: "danga-bay", slug: "danga-bay", dbName: "Danga Bay", rentalDemandScore: 3, tag: "family" },
  { key: "forest-city", slug: "forest-city", dbName: "Forest City", rentalDemandScore: 2, tag: "owner_management" },
];

export function getProjectDisplayName(key: ListingEnrichmentKey, locale: Locale): string {
  const names: Record<Locale, Record<ListingEnrichmentKey, string>> = {
    en: {
      "forest-city": "Forest City",
      "rf-princess-cove": "R&F Princess Cove",
      "danga-bay": "Danga Bay",
      "bukit-indah": "Bukit Indah",
      "mount-austin": "Mount Austin",
      "eco-botanic": "Eco Botanic",
      medini: "Medini",
    },
    zh: {
      "forest-city": "森林城市",
      "rf-princess-cove": "富力公主湾",
      "danga-bay": "丹加湾",
      "bukit-indah": "武吉英达",
      "mount-austin": "奥斯汀山",
      "eco-botanic": "生态植物园",
      medini: "美迪尼",
    },
  };
  return names[locale][key];
}

export function getTagLabel(tag: string, locale: Locale): string {
  const labels: Record<Locale, Record<string, string>> = {
    en: {
      owner_management: "Owner management",
      commuter: "Commuter",
      family: "Family",
      investor: "Investor",
    },
    zh: {
      owner_management: "业主托管",
      commuter: "通勤",
      family: "家庭",
      investor: "投资",
    },
  };
  return labels[locale][tag] ?? tag;
}
