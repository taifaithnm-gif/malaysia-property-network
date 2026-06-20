import type { Locale } from "@/lib/constants";
import {
  getComparisonPage,
  COMPARISON_ROUTES,
  type ComparisonKey,
} from "@/lib/i18n/get-comparison";
import {
  PropertyComparisonPage,
  buildComparisonJsonLd,
} from "@/components/sections/PropertyComparisonPage";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export function createComparisonPage(key: ComparisonKey) {
  const path = COMPARISON_ROUTES[key];

  async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const comparison = await getComparisonPage(locale as Locale, key);
    const dict = await getDictionary(locale as Locale);
    return buildMetadata({
      dict,
      locale,
      path,
      title: comparison.seoTitle,
      description: comparison.seoDescription,
    });
  }

  async function Page({ params }: PageProps) {
    const { locale: localeParam } = await params;
    const locale = localeParam as Locale;
    const dict = await getDictionary(locale);
    const comparison = await getComparisonPage(locale, key);
    const jsonLd = buildComparisonJsonLd(comparison, locale, path);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PropertyComparisonPage locale={locale} dict={dict} comparison={comparison} />
      </>
    );
  }

  return { generateMetadata, default: Page };
}
