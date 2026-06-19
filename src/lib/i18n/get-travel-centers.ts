import type { Locale } from "@/lib/constants";

export type TravelPackage = {
  id: string;
  type: string;
  title: string;
  desc: string;
  highlights: string[];
};

export type GolfTravelCenterContent = {
  title: string;
  subtitle: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  whatsappMessage: string;
  labels: Record<string, string>;
  packages: TravelPackage[];
};

export type CorporateProgram = TravelPackage;

export type CorporateVisitCenterContent = Omit<GolfTravelCenterContent, "packages"> & {
  programs: TravelPackage[];
  labels: GolfTravelCenterContent["labels"] & { programsTitle: string };
};

const loaders = {
  "golf-travel-center": {
    en: () => import("./centers/en/golf-travel-center.json").then((m) => m.default),
    zh: () => import("./centers/zh/golf-travel-center.json").then((m) => m.default),
  },
  "corporate-visit-center": {
    en: () => import("./centers/en/corporate-visit-center.json").then((m) => m.default),
    zh: () => import("./centers/zh/corporate-visit-center.json").then((m) => m.default),
  },
};

export async function getGolfTravelCenter(locale: Locale): Promise<GolfTravelCenterContent> {
  return loaders["golf-travel-center"][locale]() as Promise<GolfTravelCenterContent>;
}

export async function getCorporateVisitCenter(locale: Locale): Promise<CorporateVisitCenterContent> {
  const data = await loaders["corporate-visit-center"][locale]();
  return data as CorporateVisitCenterContent;
}
