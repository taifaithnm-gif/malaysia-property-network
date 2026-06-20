import type { Locale } from "@/lib/constants";
import type { ListingEnrichmentKey } from "@/lib/i18n/get-listing-enrichment";

export type MethodologyDimension = {
  id: string;
  title: string;
  weight: string;
  summary: string;
  body: string;
};

export type MethodologyContent = {
  seoTitle: string;
  seoDescription: string;
  title: string;
  subtitle: string;
  intro: string;
  dimensions: MethodologyDimension[];
  scoreBands: { range: string; label: string; desc: string }[];
  labels: {
    weight: string;
    scoreBands: string;
    backToResearch: string;
    rentalIndex: string;
    projectIntelligence: string;
  };
};

export type RentalIndexProject = {
  key: ListingEnrichmentKey;
  slug: string;
  name: string;
  averageRent: string;
  averageRentValue: number;
  rentalRange: string;
  yield: string;
  occupancy: string;
};

export type RentalIndexContent = {
  seoTitle: string;
  seoDescription: string;
  title: string;
  subtitle: string;
  intro: string;
  updated: string;
  projects: RentalIndexProject[];
  labels: {
    project: string;
    averageRent: string;
    rentalRange: string;
    yield: string;
    occupancy: string;
    methodology: string;
    viewDossier: string;
  };
};

export type MarketReportKey =
  | "johor-rental-market"
  | "singapore-commuter-housing"
  | "forest-city-owner";

export type MarketReport = {
  key: MarketReportKey;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  title: string;
  subtitle: string;
  intro: string;
  published: string;
  sections: { title: string; paragraphs: string[] }[];
  labels: {
    backToResearch: string;
    allReports: string;
    rentalIndex: string;
    browseListings: string;
  };
};

export const MARKET_REPORT_KEYS: MarketReportKey[] = [
  "johor-rental-market",
  "singapore-commuter-housing",
  "forest-city-owner",
];

export const MARKET_REPORT_SLUGS: Record<MarketReportKey, string> = {
  "johor-rental-market": "research/reports/johor-rental-market",
  "singapore-commuter-housing": "research/reports/singapore-commuter-housing",
  "forest-city-owner": "research/reports/forest-city-owner",
};

const loaders = {
  methodology: {
    en: () => import("./research/en/methodology.json").then((m) => m.default),
    zh: () => import("./research/zh/methodology.json").then((m) => m.default),
  },
  rentalIndex: {
    en: () => import("./research/en/rental-index.json").then((m) => m.default),
    zh: () => import("./research/zh/rental-index.json").then((m) => m.default),
  },
  reports: {
    en: {
      "johor-rental-market": () => import("./research/en/johor-rental-market.json").then((m) => m.default),
      "singapore-commuter-housing": () =>
        import("./research/en/singapore-commuter-housing.json").then((m) => m.default),
      "forest-city-owner": () => import("./research/en/forest-city-owner.json").then((m) => m.default),
    },
    zh: {
      "johor-rental-market": () => import("./research/zh/johor-rental-market.json").then((m) => m.default),
      "singapore-commuter-housing": () =>
        import("./research/zh/singapore-commuter-housing.json").then((m) => m.default),
      "forest-city-owner": () => import("./research/zh/forest-city-owner.json").then((m) => m.default),
    },
  },
};

export async function getMethodology(locale: Locale): Promise<MethodologyContent> {
  return loaders.methodology[locale]() as Promise<MethodologyContent>;
}

export async function getRentalIndex(locale: Locale): Promise<RentalIndexContent> {
  return loaders.rentalIndex[locale]() as Promise<RentalIndexContent>;
}

export async function getMarketReport(locale: Locale, key: MarketReportKey): Promise<MarketReport> {
  return loaders.reports[locale][key]() as Promise<MarketReport>;
}

export async function getAllMarketReports(locale: Locale): Promise<MarketReport[]> {
  return Promise.all(MARKET_REPORT_KEYS.map((key) => getMarketReport(locale, key)));
}

export function buildResearchPageJsonLd(
  content: { seoTitle: string; seoDescription: string },
  locale: Locale,
  path: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://malaysiapropertynetwork.com"}/${locale}/${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.seoTitle,
    description: content.seoDescription,
    url,
  };
}
