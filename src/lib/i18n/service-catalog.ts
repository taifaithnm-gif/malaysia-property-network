import type { Locale } from "@/lib/constants";

export type ServiceCatalogItem = {
  title: string;
  subtitle: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  whatsappMessage: string;
  targetCustomersTitle: string;
  targetCustomers: string[];
  scopeTitle: string;
  scope: string[];
  steps: { title: string; desc: string }[];
  areas: { name: string; example: string }[];
  pricing: { name: string; price: string; desc: string }[];
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaDescription: string;
  relatedLinks: { label: string; slug: string }[];
};

export type ServiceCatalog = {
  hub: {
    title: string;
    subtitle: string;
    intro: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
  };
  items: Record<ServiceCatalogKey, ServiceCatalogItem>;
};

export const SERVICE_CATALOG_KEYS = [
  "propertyManagement",
  "airbnbManagement",
  "furnitureAppliancePackage",
  "inspectionKeyHolding",
  "corporateVisitServices",
  "golfTravelServices",
  "mm2hLandingSupport",
  "propertySales",
] as const;

export type ServiceCatalogKey = (typeof SERVICE_CATALOG_KEYS)[number];

export const SERVICE_SLUG_MAP: Record<ServiceCatalogKey, string> = {
  propertyManagement: "property-management",
  airbnbManagement: "airbnb-management",
  furnitureAppliancePackage: "furniture-appliance-package",
  inspectionKeyHolding: "inspection-key-holding",
  corporateVisitServices: "corporate-visit-services",
  golfTravelServices: "golf-travel-services",
  mm2hLandingSupport: "mm2h-landing-support",
  propertySales: "property-sales",
};

export const SLUG_TO_SERVICE_KEY: Record<string, ServiceCatalogKey> = Object.fromEntries(
  Object.entries(SERVICE_SLUG_MAP).map(([key, slug]) => [slug, key as ServiceCatalogKey]),
) as Record<string, ServiceCatalogKey>;

export const PRIORITY_SERVICE_KEYS: ServiceCatalogKey[] = [
  "propertyManagement",
  "airbnbManagement",
  "inspectionKeyHolding",
  "furnitureAppliancePackage",
];

const catalogs = {
  en: () => import("./service-catalog/en.json").then((m) => m.default as ServiceCatalog),
  zh: () => import("./service-catalog/zh.json").then((m) => m.default as ServiceCatalog),
};

export async function getServiceCatalog(locale: Locale): Promise<ServiceCatalog> {
  return catalogs[locale]();
}

export function getServiceSlug(key: ServiceCatalogKey): string {
  return `services/${SERVICE_SLUG_MAP[key]}`;
}
