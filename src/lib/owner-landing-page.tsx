import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import {
  OwnerAcquisitionLanding,
  type OwnerLandingContent,
} from "@/components/sections/OwnerAcquisitionLanding";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type OwnerLandingConfig = {
  slug: string;
  source: string;
  getLanding: (dict: Dictionary) => OwnerLandingContent;
};

export function createOwnerLandingPage({ slug, source, getLanding }: OwnerLandingConfig) {
  async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);
    const landing = getLanding(dict);
    return buildMetadata({
      dict,
      locale,
      path: slug,
      title: landing.seoTitle,
      description: landing.seoDescription,
      keywords: landing.seoKeywords,
    });
  }

  async function Page({ params }: PageProps) {
    const { locale: localeParam } = await params;
    const locale = localeParam as Locale;
    const dict = await getDictionary(locale);
    const landing = getLanding(dict);

    return (
      <OwnerAcquisitionLanding
        locale={locale}
        dict={dict}
        landing={landing}
        source={source}
      />
    );
  }

  return { generateMetadata, default: Page };
}
