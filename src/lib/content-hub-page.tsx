import type { Locale } from "@/lib/constants";
import {
  getContentHubPage,
  CONTENT_HUB_ROUTES,
  type ContentHubKey,
} from "@/lib/i18n/get-content-hub";
import {
  getServiceCatalog,
  SERVICE_CATALOG_KEYS,
  SERVICE_SLUG_MAP,
} from "@/lib/i18n/service-catalog";
import {
  ContentHubPage,
  buildContentHubJsonLd,
} from "@/components/sections/ContentHubPage";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export function createContentHubPage(hubKey: ContentHubKey) {
  const slug = CONTENT_HUB_ROUTES[hubKey];

  async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const hub = await getContentHubPage(locale as Locale, hubKey);
    const dict = await getDictionary(locale as Locale);
    return buildMetadata({
      dict,
      locale,
      path: slug,
      title: hub.seoTitle,
      description: hub.seoDescription,
      keywords: hub.seoKeywords,
    });
  }

  async function Page({ params }: PageProps) {
    const { locale: localeParam } = await params;
    const locale = localeParam as Locale;
    const dict = await getDictionary(locale);
    const hub = await getContentHubPage(locale, hubKey);
    const catalog = await getServiceCatalog(locale);
    const serviceLinks = SERVICE_CATALOG_KEYS.map((key) => ({
      label: catalog.items[key].title,
      slug: `services/${SERVICE_SLUG_MAP[key]}`,
    }));
    const jsonLd = buildContentHubJsonLd(hub, locale, slug);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ContentHubPage locale={locale} dict={dict} hub={hub} serviceLinks={serviceLinks} />
      </>
    );
  }

  return { generateMetadata, default: Page };
}
