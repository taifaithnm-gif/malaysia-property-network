import type { Locale } from "@/lib/constants";

export type TopicPageContent = {
  slug: string;
  title: string;
  subtitle: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  whatsappMessage: string;
  leadSource: string;
  labels: {
    sectionsTitle: string;
    quickLinksTitle: string;
    servicesTitle: string;
    faqTitle: string;
    ctaTitle: string;
    ctaDesc: string;
  };
  sections: { title: string; paragraphs: string[] }[];
  quickLinks: { label: string; slug: string }[];
  faq: { q: string; a: string }[];
  relatedServiceSlug: string;
};

export type ProjectArchiveContent = {
  slug: string;
  title: string;
  subtitle: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  whatsappMessage: string;
  leadSource: string;
  labels: {
    hubTitle: string;
    sectionsTitle: string;
    resourcesTitle: string;
    servicesTitle: string;
    ctaTitle: string;
    ctaDesc: string;
  };
  sections: { title: string; paragraphs: string[] }[];
  resources: { label: string; slug: string; desc: string }[];
  faq: { q: string; a: string }[];
};

export type TopicKey = "mm2h" | "corporate-visit" | "golf-travel" | "forest-city-golf-resort";

export type ProjectArchiveKey =
  | "forest-city-resource-center"
  | "rf-princess-cove-archive"
  | "danga-bay-archive";

const topics = {
  en: {
    mm2h: () => import("./topics/en/mm2h.json").then((m) => m.default),
    "corporate-visit": () => import("./topics/en/corporate-visit.json").then((m) => m.default),
    "golf-travel": () => import("./topics/en/golf-travel.json").then((m) => m.default),
    "forest-city-golf-resort": () =>
      import("./topics/en/forest-city-golf-resort.json").then((m) => m.default),
  },
  zh: {
    mm2h: () => import("./topics/zh/mm2h.json").then((m) => m.default),
    "corporate-visit": () => import("./topics/zh/corporate-visit.json").then((m) => m.default),
    "golf-travel": () => import("./topics/zh/golf-travel.json").then((m) => m.default),
    "forest-city-golf-resort": () =>
      import("./topics/zh/forest-city-golf-resort.json").then((m) => m.default),
  },
};

const archives = {
  en: {
    "forest-city-resource-center": () =>
      import("./project-archives/en/forest-city-resource-center.json").then((m) => m.default),
    "rf-princess-cove-archive": () =>
      import("./project-archives/en/rf-princess-cove-archive.json").then((m) => m.default),
    "danga-bay-archive": () =>
      import("./project-archives/en/danga-bay-archive.json").then((m) => m.default),
  },
  zh: {
    "forest-city-resource-center": () =>
      import("./project-archives/zh/forest-city-resource-center.json").then((m) => m.default),
    "rf-princess-cove-archive": () =>
      import("./project-archives/zh/rf-princess-cove-archive.json").then((m) => m.default),
    "danga-bay-archive": () =>
      import("./project-archives/zh/danga-bay-archive.json").then((m) => m.default),
  },
};

export const TOPIC_ROUTES: Record<TopicKey, string> = {
  mm2h: "topics/mm2h",
  "corporate-visit": "topics/corporate-visit",
  "golf-travel": "topics/golf-travel",
  "forest-city-golf-resort": "forest-city/golf-resort",
};

export const ARCHIVE_ROUTES: Record<ProjectArchiveKey, string> = {
  "forest-city-resource-center": "forest-city/resource-center",
  "rf-princess-cove-archive": "rf-princess-cove/archive",
  "danga-bay-archive": "danga-bay/archive",
};

export async function getTopicPage(locale: Locale, key: TopicKey): Promise<TopicPageContent> {
  return topics[locale][key]() as Promise<TopicPageContent>;
}

export async function getProjectArchive(
  locale: Locale,
  key: ProjectArchiveKey,
): Promise<ProjectArchiveContent> {
  return archives[locale][key]() as Promise<ProjectArchiveContent>;
}
