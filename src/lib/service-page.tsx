import type { Locale } from "@/lib/constants";
import type { ServiceCatalogItem } from "@/lib/i18n/service-catalog";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { ServicePage, buildServiceJsonLd } from "@/components/sections/ServicePage";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type LegacyServiceContent = Dictionary["services"]["propertyInspection"];

type ServicePageConfig = {
  slug: string;
  source: string;
  getService: (dict: Dictionary) => LegacyServiceContent;
};

function adaptLegacyService(
  service: LegacyServiceContent,
  dict: Dictionary,
): ServiceCatalogItem {
  const labels = dict.serviceCatalog.common;
  return {
    title: service.title,
    subtitle: service.subtitle,
    intro: service.intro,
    seoTitle: service.title,
    seoDescription: service.intro,
    seoKeywords: dict.meta.keywords,
    whatsappMessage: `${labels.defaultWhatsapp} (${service.title})`,
    targetCustomersTitle: labels.targetCustomersTitle,
    targetCustomers: [],
    scopeTitle: labels.scopeTitle,
    scope: [],
    steps: service.steps,
    areas: service.areas,
    pricing: service.pricing,
    faq: service.faq,
    ctaTitle: service.ctaTitle,
    ctaDescription: service.ctaDescription,
    relatedLinks: [],
  };
}

export function createServicePage({ slug, source, getService }: ServicePageConfig) {
  async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);
    const service = adaptLegacyService(getService(dict), dict);
    return buildMetadata({
      dict,
      locale,
      path: slug,
      title: service.seoTitle,
      description: service.seoDescription,
      keywords: service.seoKeywords,
    });
  }

  async function Page({ params }: PageProps) {
    const { locale: localeParam } = await params;
    const locale = localeParam as Locale;
    const dict = await getDictionary(locale);
    const service = adaptLegacyService(getService(dict), dict);
    const jsonLd = buildServiceJsonLd(service, locale, slug);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ServicePage locale={locale} dict={dict} service={service} source={source} />
      </>
    );
  }

  return { generateMetadata, default: Page };
}
