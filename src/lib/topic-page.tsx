import type { Locale } from "@/lib/constants";
import {
  getTopicPage,
  TOPIC_ROUTES,
  type TopicKey,
} from "@/lib/i18n/get-phase6-content";
import {
  getServiceCatalog,
  SERVICE_CATALOG_KEYS,
  SERVICE_SLUG_MAP,
} from "@/lib/i18n/service-catalog";
import {
  TopicLandingPage,
  buildTopicJsonLd,
} from "@/components/sections/TopicLandingPage";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export function createTopicPage(topicKey: TopicKey) {
  const slug = TOPIC_ROUTES[topicKey];

  async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const topic = await getTopicPage(locale as Locale, topicKey);
    const dict = await getDictionary(locale as Locale);
    return buildMetadata({
      dict,
      locale,
      path: slug,
      title: topic.seoTitle,
      description: topic.seoDescription,
      keywords: topic.seoKeywords,
    });
  }

  async function Page({ params }: PageProps) {
    const { locale: localeParam } = await params;
    const locale = localeParam as Locale;
    const dict = await getDictionary(locale);
    const topic = await getTopicPage(locale, topicKey);
    const catalog = await getServiceCatalog(locale);
    const serviceLinks = SERVICE_CATALOG_KEYS.map((key) => ({
      label: catalog.items[key].title,
      slug: `services/${SERVICE_SLUG_MAP[key]}`,
    }));
    const jsonLd = buildTopicJsonLd(topic, locale, slug);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <TopicLandingPage locale={locale} dict={dict} topic={topic} serviceLinks={serviceLinks} />
      </>
    );
  }

  return { generateMetadata, default: Page };
}
