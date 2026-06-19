import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { ServicePage } from "@/components/sections/ServicePage";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type ServiceContent = Dictionary["services"]["propertyInspection"];

type ServicePageConfig = {
  slug: string;
  source: string;
  getService: (dict: Dictionary) => ServiceContent;
};

export function createServicePage({ slug, source, getService }: ServicePageConfig) {
  async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);
    const service = getService(dict);
    return buildMetadata({
      dict,
      locale,
      path: slug,
      title: service.title,
      description: service.intro,
    });
  }

  async function Page({ params }: PageProps) {
    const { locale: localeParam } = await params;
    const locale = localeParam as Locale;
    const dict = await getDictionary(locale);
    const service = getService(dict);

    return (
      <ServicePage locale={locale} dict={dict} service={service} source={source} />
    );
  }

  return { generateMetadata, default: Page };
}
