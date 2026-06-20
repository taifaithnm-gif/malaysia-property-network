import type { Locale } from "@/lib/constants";
import type { BuildingProfileKey } from "@/lib/i18n/get-building-profile";
import { getBuildingProfile } from "@/lib/i18n/get-building-profile";
import { BuildingProfilePage } from "@/components/sections/BuildingProfilePage";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export function createBuildingProfilePage(key: BuildingProfileKey) {
  async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const profile = await getBuildingProfile(locale as Locale, key);
    const dict = await getDictionary(locale as Locale);
    return buildMetadata({
      dict,
      locale,
      path: profile.slug,
      title: profile.seoTitle,
      description: profile.seoDescription,
    });
  }

  async function Page({ params }: PageProps) {
    const { locale: localeParam } = await params;
    const locale = localeParam as Locale;
    const dict = await getDictionary(locale);
    const profile = await getBuildingProfile(locale, key);

    return <BuildingProfilePage locale={locale} dict={dict} profile={profile} />;
  }

  return { generateMetadata, default: Page };
}
