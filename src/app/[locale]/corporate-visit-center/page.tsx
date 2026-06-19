import type { Locale } from "@/lib/constants";
import { TravelCenterPage } from "@/components/sections/TravelCenterPage";
import { getCorporateVisitCenter } from "@/lib/i18n/get-travel-centers";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const content = await getCorporateVisitCenter(locale as Locale);
  const dict = await getDictionary(locale as Locale);
  return buildMetadata({
    dict,
    locale,
    path: "corporate-visit-center",
    title: content.seoTitle,
    description: content.seoDescription,
  });
}

export default async function CorporateVisitCenterPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const content = await getCorporateVisitCenter(locale);

  return <TravelCenterPage locale={locale} dict={dict} content={content} mode="corporate" />;
}
