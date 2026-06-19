import type { MetadataRoute } from "next";
import { LOCALES, SITE_URL } from "@/lib/constants";

const PAGES = [
  "",
  "property-management",
  "property-inspection-service",
  "key-holding-service",
  "property-management-service",
  "airbnb-coordination-service",
  "johor-bahru",
  "forest-city",
  "rf-princess-cove",
  "danga-bay",
  "about",
  "contact",
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
