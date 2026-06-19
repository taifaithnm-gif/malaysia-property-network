import type { MetadataRoute } from "next";
import { LOCALES, SITE_URL } from "@/lib/constants";
import { SERVICE_SLUG_MAP, SERVICE_CATALOG_KEYS } from "@/lib/i18n/service-catalog";

const SERVICE_PAGES = SERVICE_CATALOG_KEYS.map((key) => `services/${SERVICE_SLUG_MAP[key]}`);

const PAGES = [
  "",
  "services",
  ...SERVICE_PAGES,
  "property-management",
  "property-inspection-service",
  "key-holding-service",
  "property-management-service",
  "airbnb-coordination-service",
  "forest-city-property-management",
  "rf-princess-cove-property-management",
  "danga-bay-property-management",
  "guide/forest-city",
  "guide/forest-city-golf-resort",
  "guide/rf-princess-cove",
  "guide/danga-bay",
  "guide/johor-corporate-visit",
  "johor-bahru",
  "forest-city",
  "rf-princess-cove",
  "danga-bay",
  "about",
  "contact",
  "list-property",
  "property-request",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const page of PAGES) {
      entries.push({
        url: `${SITE_URL}/${locale}${page ? `/${page}` : ""}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${SITE_URL}/${l}${page ? `/${page}` : ""}`]),
          ),
        },
      });
    }
  }

  return entries;
}
