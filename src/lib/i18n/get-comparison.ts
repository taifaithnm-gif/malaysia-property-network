import type { Locale } from "@/lib/constants";
import type { ListingEnrichmentKey } from "@/lib/i18n/get-listing-enrichment";

export type ComparisonKey =
  | "forest-city-vs-rf-princess-cove"
  | "bukit-indah-vs-mount-austin"
  | "eco-botanic-vs-medini";

export type ComparisonPage = {
  key: ComparisonKey;
  slug: string;
  projectA: ListingEnrichmentKey;
  projectB: ListingEnrichmentKey;
  projectAName: string;
  projectBName: string;
  winner: ListingEnrichmentKey;
  seoTitle: string;
  seoDescription: string;
  title: string;
  subtitle: string;
  intro: string;
  recommendation: string;
  dimensions: { label: string; valueA: string; valueB: string; note: string }[];
  labels: {
    dimension: string;
    projectA: string;
    projectB: string;
    note: string;
    recommendation: string;
    viewListings: string;
    viewProject: string;
  };
};

export const COMPARISON_ROUTES: Record<ComparisonKey, string> = {
  "forest-city-vs-rf-princess-cove": "compare/forest-city-vs-rf-princess-cove",
  "bukit-indah-vs-mount-austin": "compare/bukit-indah-vs-mount-austin",
  "eco-botanic-vs-medini": "compare/eco-botanic-vs-medini",
};

const loaders = {
  en: {
    "forest-city-vs-rf-princess-cove": () =>
      import("./comparisons/en/forest-city-vs-rf-princess-cove.json").then((m) => m.default),
    "bukit-indah-vs-mount-austin": () =>
      import("./comparisons/en/bukit-indah-vs-mount-austin.json").then((m) => m.default),
    "eco-botanic-vs-medini": () =>
      import("./comparisons/en/eco-botanic-vs-medini.json").then((m) => m.default),
  },
  zh: {
    "forest-city-vs-rf-princess-cove": () =>
      import("./comparisons/zh/forest-city-vs-rf-princess-cove.json").then((m) => m.default),
    "bukit-indah-vs-mount-austin": () =>
      import("./comparisons/zh/bukit-indah-vs-mount-austin.json").then((m) => m.default),
    "eco-botanic-vs-medini": () =>
      import("./comparisons/zh/eco-botanic-vs-medini.json").then((m) => m.default),
  },
};

export async function getComparisonPage(
  locale: Locale,
  key: ComparisonKey,
): Promise<ComparisonPage> {
  return loaders[locale][key]() as Promise<ComparisonPage>;
}

export const COMPARISON_KEYS = Object.keys(COMPARISON_ROUTES) as ComparisonKey[];
