import { ServicesHub } from "@/components/sections/ServicesHub";
import type { Locale } from "@/lib/constants";
import { getServiceCatalog } from "@/lib/i18n/service-catalog";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const catalog = await getServiceCatalog(locale as Locale);
  const dict = await getDictionary(locale as Locale);
  return buildMetadata({
    dict,
    locale,
    path: "services",
    title: catalog.hub.seoTitle,
    description: catalog.hub.seoDescription,
    keywords: catalog.hub.seoKeywords,
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return <ServicesHub locale={locale} dict={dict} />;
}
