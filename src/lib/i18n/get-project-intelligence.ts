import type { Locale } from "@/lib/constants";
import type { ListingEnrichmentKey } from "@/lib/i18n/get-listing-enrichment";

export type ProjectIntelligenceKey = ListingEnrichmentKey;

export type ProjectIntelligence = {
  projectKey: ProjectIntelligenceKey;
  projectName: string;
  slug: string;
  developerProfile: string;
  completionYear: string;
  propertyTypes: string[];
  rentalRange: string;
  yieldEstimate: string;
  occupancyEstimate: string;
  targetTenant: string;
  pros: string[];
  cons: string[];
  investmentScore: number;
  seoTitle: string;
  seoDescription: string;
};

export type ProjectIntelligenceHub = {
  seoTitle: string;
  seoDescription: string;
  title: string;
  subtitle: string;
  intro: string;
  methodologyTitle: string;
  methodology: string;
  labels: ProjectIntelligenceLabels;
};

export type ResearchCenter = {
  seoTitle: string;
  seoDescription: string;
  title: string;
  subtitle: string;
  intro: string;
  pillars: { title: string; desc: string }[];
  ctaTitle: string;
  ctaDesc: string;
  labels: {
    viewDirectory: string;
    topProjects: string;
    compare: string;
    listings: string;
    methodology: string;
    methodologyFull: string;
    rentalIndex: string;
    viewFullIndex: string;
    marketReports: string;
    marketReportsDesc: string;
    notAdvice: string;
  };
};

export type ProjectIntelligenceLabels = {
  project: string;
  score: string;
  rentalRange: string;
  yield: string;
  occupancy: string;
  targetTenant: string;
  viewDossier: string;
  developer: string;
  completion: string;
  propertyTypes: string;
  pros: string;
  cons: string;
  backToResearch: string;
  browseListings: string;
  viewProject: string;
  compareProjects: string;
};

export const PROJECT_INTELLIGENCE_KEYS: ProjectIntelligenceKey[] = [
  "mount-austin",
  "rf-princess-cove",
  "bukit-indah",
  "eco-botanic",
  "danga-bay",
  "medini",
  "forest-city",
];

const dossiers = {
  en: {
    "forest-city": () => import("./project-intelligence/en/forest-city.json").then((m) => m.default),
    "rf-princess-cove": () =>
      import("./project-intelligence/en/rf-princess-cove.json").then((m) => m.default),
    "danga-bay": () => import("./project-intelligence/en/danga-bay.json").then((m) => m.default),
    "bukit-indah": () => import("./project-intelligence/en/bukit-indah.json").then((m) => m.default),
    "mount-austin": () => import("./project-intelligence/en/mount-austin.json").then((m) => m.default),
    "eco-botanic": () => import("./project-intelligence/en/eco-botanic.json").then((m) => m.default),
    medini: () => import("./project-intelligence/en/medini.json").then((m) => m.default),
  },
  zh: {
    "forest-city": () => import("./project-intelligence/zh/forest-city.json").then((m) => m.default),
    "rf-princess-cove": () =>
      import("./project-intelligence/zh/rf-princess-cove.json").then((m) => m.default),
    "danga-bay": () => import("./project-intelligence/zh/danga-bay.json").then((m) => m.default),
    "bukit-indah": () => import("./project-intelligence/zh/bukit-indah.json").then((m) => m.default),
    "mount-austin": () => import("./project-intelligence/zh/mount-austin.json").then((m) => m.default),
    "eco-botanic": () => import("./project-intelligence/zh/eco-botanic.json").then((m) => m.default),
    medini: () => import("./project-intelligence/zh/medini.json").then((m) => m.default),
  },
};

export async function getProjectIntelligence(
  locale: Locale,
  key: ProjectIntelligenceKey,
): Promise<ProjectIntelligence> {
  return dossiers[locale][key]() as Promise<ProjectIntelligence>;
}

export async function getAllProjectIntelligence(
  locale: Locale,
): Promise<ProjectIntelligence[]> {
  const items = await Promise.all(
    PROJECT_INTELLIGENCE_KEYS.map((key) => getProjectIntelligence(locale, key)),
  );
  return items.sort((a, b) => b.investmentScore - a.investmentScore);
}

export async function getProjectIntelligenceHub(locale: Locale): Promise<ProjectIntelligenceHub> {
  if (locale === "zh") {
    return import("./project-intelligence/zh/_hub.json").then((m) => m.default as ProjectIntelligenceHub);
  }
  return import("./project-intelligence/en/_hub.json").then((m) => m.default as ProjectIntelligenceHub);
}

export async function getResearchCenter(locale: Locale): Promise<ResearchCenter> {
  if (locale === "zh") {
    return import("./project-intelligence/zh/_research.json").then((m) => m.default as ResearchCenter);
  }
  return import("./project-intelligence/en/_research.json").then((m) => m.default as ResearchCenter);
}

export function scoreColor(score: number): string {
  if (score >= 80) return "text-teal-700 bg-teal-50 border-teal-200";
  if (score >= 65) return "text-blue-700 bg-blue-50 border-blue-200";
  if (score >= 50) return "text-amber-700 bg-amber-50 border-amber-200";
  return "text-gray-700 bg-gray-50 border-gray-200";
}

export function buildProjectIntelligenceJsonLd(
  intel: ProjectIntelligence,
  locale: Locale,
  path: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://malaysiapropertynetwork.com"}/${locale}/${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: intel.seoTitle,
    description: intel.seoDescription,
    url,
    about: { "@type": "Place", name: intel.projectName },
  };
}

export function buildResearchCenterJsonLd(
  center: { seoTitle: string; seoDescription: string },
  locale: Locale,
  path: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://malaysiapropertynetwork.com"}/${locale}/${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: center.seoTitle,
    description: center.seoDescription,
    url,
  };
}
