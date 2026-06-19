import type { Locale } from "@/lib/constants";

export type ProjectProfileKey = "forest-city" | "rf-princess-cove" | "danga-bay";

export type ProjectProfile = {
  key: ProjectProfileKey;
  title: string;
  subtitle: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  whatsappMessage: string;
  labels: {
    gallery: string;
    facts: string;
    map: string;
    propertyTypes: string;
    facilities: string;
    relatedServices: string;
    listProperty: string;
    propertyRequest: string;
    readGuide: string;
  };
  gallery: { src: string; alt: string }[];
  facts: { label: string; value: string }[];
  map: { lat: number; lng: number; label: string };
  propertyTypes: { name: string; desc: string }[];
  facilities: string[];
  guideSlug: string;
};

const profiles = {
  en: {
    "forest-city": () => import("./project-profiles/en/forest-city.json").then((m) => m.default),
    "rf-princess-cove": () =>
      import("./project-profiles/en/rf-princess-cove.json").then((m) => m.default),
    "danga-bay": () => import("./project-profiles/en/danga-bay.json").then((m) => m.default),
  },
  zh: {
    "forest-city": () => import("./project-profiles/zh/forest-city.json").then((m) => m.default),
    "rf-princess-cove": () =>
      import("./project-profiles/zh/rf-princess-cove.json").then((m) => m.default),
    "danga-bay": () => import("./project-profiles/zh/danga-bay.json").then((m) => m.default),
  },
};

export const PROJECT_PROFILE_SLUGS: Record<ProjectProfileKey, string> = {
  "forest-city": "forest-city",
  "rf-princess-cove": "rf-princess-cove",
  "danga-bay": "danga-bay",
};

export async function getProjectProfile(
  locale: Locale,
  key: ProjectProfileKey,
): Promise<ProjectProfile> {
  return profiles[locale][key]() as Promise<ProjectProfile>;
}
