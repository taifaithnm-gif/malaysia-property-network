import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import {
  getSeoGuide,
  SEO_GUIDE_SLUGS,
  type SeoGuideKey,
} from "@/lib/i18n/get-seo-guide";
import {
  getServiceCatalog,
  SERVICE_CATALOG_KEYS,
  SERVICE_SLUG_MAP,
} from "@/lib/i18n/service-catalog";
import {
  SeoGuidePage,
  buildSeoGuideJsonLd,
} from "@/components/sections/SeoGuidePage";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function createSeoGuidePage(guideKey: SeoGuideKey) {
  const slug = SEO_GUIDE_SLUGS[guideKey];

  async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const guide = await getSeoGuide(locale as Locale, guideKey);
    const dict = await getDictionary(locale as Locale);
    return buildMetadata({
      dict,
      locale,
      path: slug,
      title: guide.seoTitle,
      description: guide.seoDescription,
      keywords: guide.seoKeywords,
    });
  }

  async function Page({ params }: PageProps) {
    const { locale: localeParam } = await params;
    const locale = localeParam as Locale;
    const dict = await getDictionary(locale);
    const guide = await getSeoGuide(locale, guideKey);
    const catalog = await getServiceCatalog(locale);
    const serviceLinks = SERVICE_CATALOG_KEYS.map((key) => ({
      label: catalog.items[key].title,
      slug: `services/${SERVICE_SLUG_MAP[key]}`,
    }));
    const jsonLd = buildSeoGuideJsonLd(guide, locale, slug);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SeoGuidePage
          locale={locale}
          dict={dict}
          guide={guide}
          serviceLinks={serviceLinks}
          leadSource={`guide/${guideKey}`}
        />
      </>
    );
  }

  return { generateMetadata, default: Page };
}
