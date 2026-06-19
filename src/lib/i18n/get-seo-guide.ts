import type { Locale } from "@/lib/constants";

export type SeoGuideContent = {
  title: string;
  subtitle: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  whatsappMessage: string;
  labels: {
    overview: string;
    propertyManagement: string;
    rental: string;
    investment: string;
    faqTitle: string;
    relatedLinks: string;
    servicesTitle: string;
    leadFormTitle: string;
    leadFormDesc: string;
    inspectionCta: string;
    inspectionCtaTitle: string;
    inspectionCtaDesc: string;
  };
  overview: string[];
  propertyManagement: string[];
  rental: string[];
  investment: string[];
  faq: { q: string; a: string }[];
  internalLinks: { label: string; slug: string }[];
};

export type SeoGuideKey =
  | "forest-city"
  | "forest-city-golf-resort"
  | "rf-princess-cove"
  | "danga-bay"
  | "johor-corporate-visit";

const guides = {
  en: {
    "forest-city": () => import("./guides/en/forest-city.json").then((m) => m.default),
    "forest-city-golf-resort": () =>
      import("./guides/en/forest-city-golf-resort.json").then((m) => m.default),
    "rf-princess-cove": () => import("./guides/en/rf-princess-cove.json").then((m) => m.default),
    "danga-bay": () => import("./guides/en/danga-bay.json").then((m) => m.default),
    "johor-corporate-visit": () =>
      import("./guides/en/johor-corporate-visit.json").then((m) => m.default),
  },
  zh: {
    "forest-city": () => import("./guides/zh/forest-city.json").then((m) => m.default),
    "forest-city-golf-resort": () =>
      import("./guides/zh/forest-city-golf-resort.json").then((m) => m.default),
    "rf-princess-cove": () => import("./guides/zh/rf-princess-cove.json").then((m) => m.default),
    "danga-bay": () => import("./guides/zh/danga-bay.json").then((m) => m.default),
    "johor-corporate-visit": () =>
      import("./guides/zh/johor-corporate-visit.json").then((m) => m.default),
  },
};

export async function getSeoGuide(
  locale: Locale,
  key: SeoGuideKey,
): Promise<SeoGuideContent> {
  return guides[locale][key]() as Promise<SeoGuideContent>;
}

export const SEO_GUIDE_SLUGS: Record<SeoGuideKey, string> = {
  "forest-city": "guide/forest-city",
  "forest-city-golf-resort": "guide/forest-city-golf-resort",
  "rf-princess-cove": "guide/rf-princess-cove",
  "danga-bay": "guide/danga-bay",
  "johor-corporate-visit": "guide/johor-corporate-visit",
};
