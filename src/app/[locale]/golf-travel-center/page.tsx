import type { Locale } from "@/lib/constants";
import { TravelCenterPage } from "@/components/sections/TravelCenterPage";
import { getGolfTravelCenter } from "@/lib/i18n/get-travel-centers";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const content = await getGolfTravelCenter(locale as Locale);
  const dict = await getDictionary(locale as Locale);
  return buildMetadata({
    dict,
    locale,
    path: "golf-travel-center",
    title: content.seoTitle,
    description: content.seoDescription,
  });
}

export default async function GolfTravelCenterPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const content = await getGolfTravelCenter(locale);

  return <TravelCenterPage locale={locale} dict={dict} content={content} mode="golf" />;
}
