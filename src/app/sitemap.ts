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
  "owners",
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
  "forest-city/resource-center",
  "forest-city/golf-resort",
  "rf-princess-cove/archive",
  "danga-bay/archive",
  "topics/mm2h",
  "topics/corporate-visit",
  "topics/golf-travel",
  "golf-travel-center",
  "corporate-visit-center",
  "listings",
  "bukit-indah",
  "mount-austin",
  "eco-botanic",
  "medini",
  "bukit-indah/gallery",
  "mount-austin/gallery",
  "eco-botanic/gallery",
  "medini/gallery",
  "compare/forest-city-vs-rf-princess-cove",
  "compare/bukit-indah-vs-mount-austin",
  "compare/eco-botanic-vs-medini",
  "research",
  "research/methodology",
  "research/rental-index",
  "research/reports/johor-rental-market",
  "research/reports/singapore-commuter-housing",
  "research/reports/forest-city-owner",
  "project-intelligence",
  "project-intelligence/forest-city",
  "project-intelligence/rf-princess-cove",
  "project-intelligence/danga-bay",
  "project-intelligence/bukit-indah",
  "project-intelligence/mount-austin",
  "project-intelligence/eco-botanic",
  "project-intelligence/medini",
  "rf-princess-cove/gallery",
  "danga-bay/gallery",
  "forest-city-golf",
  "forest-city-marina",
  "forest-city-hotels",
  "princess-cove-ciq",
  "princess-cove-investment",
  "danga-bay/lifestyle",
  "danga-bay/rental-market",
  "danga-bay/family-living",
  "golf",
  "corporate-visits",
  "mm2h",
  "book-viewing",
  "forest-city/media-center",
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
