import type { Locale } from "@/lib/constants";
import { RentalIndexPage } from "@/components/sections/RentalIndexPage";
import { getRentalIndex, buildResearchPageJsonLd } from "@/lib/i18n/get-research-content";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const content = await getRentalIndex(locale as Locale);
  const dict = await getDictionary(locale as Locale);
  return buildMetadata({
    dict,
    locale,
    path: "research/rental-index",
    title: content.seoTitle,
    description: content.seoDescription,
  });
}

export default async function RentalIndexRoute({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const content = await getRentalIndex(locale);
  const jsonLd = buildResearchPageJsonLd(content, locale, "research/rental-index");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RentalIndexPage locale={locale} dict={dict} content={content} />
    </>
  );
}
