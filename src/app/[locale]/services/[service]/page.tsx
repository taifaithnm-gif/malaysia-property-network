import { notFound } from "next/navigation";
import type { Locale } from "@/lib/constants";
import {
  getServiceCatalog,
  SLUG_TO_SERVICE_KEY,
  getServiceSlug,
} from "@/lib/i18n/service-catalog";
import {
  ServicePage,
  buildServiceJsonLd,
} from "@/components/sections/ServicePage";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { SERVICE_SLUG_MAP, SERVICE_CATALOG_KEYS } from "@/lib/i18n/service-catalog";

type PageProps = {
  params: Promise<{ locale: string; service: string }>;
};

export function generateStaticParams() {
  return SERVICE_CATALOG_KEYS.flatMap((key) =>
    ["en", "zh"].map((locale) => ({
      locale,
      service: SERVICE_SLUG_MAP[key],
    })),
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, service: serviceSlug } = await params;
  const key = SLUG_TO_SERVICE_KEY[serviceSlug];
  if (!key) return {};
  const catalog = await getServiceCatalog(locale as Locale);
  const item = catalog.items[key];
  const dict = await getDictionary(locale as Locale);
  return buildMetadata({
    dict,
    locale,
    path: getServiceSlug(key),
    title: item.seoTitle,
    description: item.seoDescription,
    keywords: item.seoKeywords,
  });
}

export default async function CatalogServicePage({ params }: PageProps) {
  const { locale: localeParam, service: serviceSlug } = await params;
  const key = SLUG_TO_SERVICE_KEY[serviceSlug];

  if (!key) notFound();

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const catalog = await getServiceCatalog(locale);
  const item = catalog.items[key];
  const path = getServiceSlug(key);
  const jsonLd = buildServiceJsonLd(item, locale, path);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePage
        locale={locale}
        dict={dict}
        service={item}
        source={`services/${serviceSlug}`}
      />
    </>
  );
}
