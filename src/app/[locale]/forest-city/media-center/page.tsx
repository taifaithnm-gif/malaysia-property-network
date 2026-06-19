import type { Locale } from "@/lib/constants";
import {
  ForestCityMediaCenter,
} from "@/components/sections/ForestCityMediaCenter";
import { getForestCityMediaCenter, buildMediaCenterJsonLd } from "@/lib/i18n/get-media-center";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const content = getForestCityMediaCenter(locale as Locale);
  const dict = await getDictionary(locale as Locale);
  return buildMetadata({
    dict,
    locale,
    path: "forest-city/media-center",
    title: content.seoTitle,
    description: content.seoDescription,
  });
}

export default async function ForestCityMediaCenterPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const content = getForestCityMediaCenter(locale);
  const jsonLd = buildMediaCenterJsonLd(content, locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ForestCityMediaCenter locale={locale} dict={dict} content={content} />
    </>
  );
}
