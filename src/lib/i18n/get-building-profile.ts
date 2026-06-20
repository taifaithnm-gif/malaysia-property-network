import type { Locale } from "@/lib/constants";

export type BuildingProfileKey =
  | "phoenix"
  | "cerulean-bay"
  | "starview-bay"
  | "golf-suites"
  | "rf-phase-1"
  | "rf-phase-2"
  | "rf-phase-3";

export const BUILDING_PROFILE_KEYS: BuildingProfileKey[] = [
  "phoenix",
  "cerulean-bay",
  "starview-bay",
  "golf-suites",
  "rf-phase-1",
  "rf-phase-2",
  "rf-phase-3",
];

export type BuildingProfile = {
  key: BuildingProfileKey;
  parentProject: string;
  parentName: string;
  name: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  rentalRange: string;
  yieldEstimate: string;
  targetTenant: string;
  unitMix: string[];
  highlights: string[];
  verifiedCount: number;
  labels: {
    rentalRange: string;
    yield: string;
    targetTenant: string;
    unitMix: string;
    highlights: string;
    verifiedListings: string;
    parentProject: string;
    viewVerified: string;
  };
};

export async function getBuildingProfile(
  locale: Locale,
  key: BuildingProfileKey,
): Promise<BuildingProfile> {
  const mod = await import(`@/lib/i18n/building-profiles/${locale}/${key}.json`);
  return mod.default as BuildingProfile;
}
