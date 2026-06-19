import type { Locale } from "@/lib/constants";
import type { TopicPageContent } from "@/lib/i18n/get-phase6-content";
import mediaCatalog from "@/lib/i18n/media-center/forest-city-media.json";

export type ContentHubPageContent = TopicPageContent & {
  gallery: { src: string; alt: string }[];
  facts: { label: string; value: string }[];
  labels: TopicPageContent["labels"] & {
    galleryTitle: string;
    factsTitle: string;
  };
};

type ContentHubJson = Omit<ContentHubPageContent, "gallery"> & {
  mediaSectionId?: string;
  gallery?: { src: string; alt: string }[];
};

export type ContentHubKey =
  | "forest-city-golf"
  | "forest-city-marina"
  | "forest-city-hotels"
  | "princess-cove-ciq"
  | "princess-cove-investment"
  | "danga-bay-lifestyle"
  | "danga-bay-rental-market"
  | "danga-bay-family-living"
  | "golf"
  | "corporate-visits"
  | "mm2h";

const hubs = {
  en: {
    "forest-city-golf": () =>
      import("./content-hubs/en/forest-city-golf.json").then((m) => m.default),
    "forest-city-marina": () =>
      import("./content-hubs/en/forest-city-marina.json").then((m) => m.default),
    "forest-city-hotels": () =>
      import("./content-hubs/en/forest-city-hotels.json").then((m) => m.default),
    "princess-cove-ciq": () =>
      import("./content-hubs/en/princess-cove-ciq.json").then((m) => m.default),
    "princess-cove-investment": () =>
      import("./content-hubs/en/princess-cove-investment.json").then((m) => m.default),
    "danga-bay-lifestyle": () =>
      import("./content-hubs/en/danga-bay-lifestyle.json").then((m) => m.default),
    "danga-bay-rental-market": () =>
      import("./content-hubs/en/danga-bay-rental-market.json").then((m) => m.default),
    "danga-bay-family-living": () =>
      import("./content-hubs/en/danga-bay-family-living.json").then((m) => m.default),
    golf: () => import("./content-hubs/en/golf.json").then((m) => m.default),
    "corporate-visits": () =>
      import("./content-hubs/en/corporate-visits.json").then((m) => m.default),
    mm2h: () => import("./content-hubs/en/mm2h.json").then((m) => m.default),
  },
  zh: {
    "forest-city-golf": () =>
      import("./content-hubs/zh/forest-city-golf.json").then((m) => m.default),
    "forest-city-marina": () =>
      import("./content-hubs/zh/forest-city-marina.json").then((m) => m.default),
    "forest-city-hotels": () =>
      import("./content-hubs/zh/forest-city-hotels.json").then((m) => m.default),
    "princess-cove-ciq": () =>
      import("./content-hubs/zh/princess-cove-ciq.json").then((m) => m.default),
    "princess-cove-investment": () =>
      import("./content-hubs/zh/princess-cove-investment.json").then((m) => m.default),
    "danga-bay-lifestyle": () =>
      import("./content-hubs/zh/danga-bay-lifestyle.json").then((m) => m.default),
    "danga-bay-rental-market": () =>
      import("./content-hubs/zh/danga-bay-rental-market.json").then((m) => m.default),
    "danga-bay-family-living": () =>
      import("./content-hubs/zh/danga-bay-family-living.json").then((m) => m.default),
    golf: () => import("./content-hubs/zh/golf.json").then((m) => m.default),
    "corporate-visits": () =>
      import("./content-hubs/zh/corporate-visits.json").then((m) => m.default),
    mm2h: () => import("./content-hubs/zh/mm2h.json").then((m) => m.default),
  },
};

export const CONTENT_HUB_ROUTES: Record<ContentHubKey, string> = {
  "forest-city-golf": "forest-city-golf",
  "forest-city-marina": "forest-city-marina",
  "forest-city-hotels": "forest-city-hotels",
  "princess-cove-ciq": "princess-cove-ciq",
  "princess-cove-investment": "princess-cove-investment",
  "danga-bay-lifestyle": "danga-bay/lifestyle",
  "danga-bay-rental-market": "danga-bay/rental-market",
  "danga-bay-family-living": "danga-bay/family-living",
  golf: "golf",
  "corporate-visits": "corporate-visits",
  mm2h: "mm2h",
};

function resolveGallery(raw: ContentHubJson, locale: Locale): { src: string; alt: string }[] {
  if (raw.gallery?.length) return raw.gallery;
  if (!raw.mediaSectionId) return [];
  const section = mediaCatalog.sections.find((s) => s.id === raw.mediaSectionId);
  if (!section) return [];
  return section.images.slice(0, 6).map((img) => ({
    src: img.src,
    alt: locale === "zh" ? img.altZh : img.altEn,
  }));
}

export async function getContentHubPage(
  locale: Locale,
  key: ContentHubKey,
): Promise<ContentHubPageContent> {
  const raw = (await hubs[locale][key]()) as ContentHubJson;
  const { mediaSectionId: _media, gallery: _gallery, ...rest } = raw;
  return {
    ...rest,
    gallery: resolveGallery(raw, locale),
  };
}
