import type { Locale } from "@/lib/constants";
import {
  getProjectArchive,
  ARCHIVE_ROUTES,
  type ProjectArchiveKey,
} from "@/lib/i18n/get-phase6-content";
import {
  getServiceCatalog,
  SERVICE_CATALOG_KEYS,
  SERVICE_SLUG_MAP,
} from "@/lib/i18n/service-catalog";
import {
  ProjectArchivePage,
  buildArchiveJsonLd,
} from "@/components/sections/ProjectArchivePage";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export function createProjectArchivePage(archiveKey: ProjectArchiveKey) {
  const slug = ARCHIVE_ROUTES[archiveKey];

  async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const archive = await getProjectArchive(locale as Locale, archiveKey);
    const dict = await getDictionary(locale as Locale);
    return buildMetadata({
      dict,
      locale,
      path: slug,
      title: archive.seoTitle,
      description: archive.seoDescription,
      keywords: archive.seoKeywords,
    });
  }

  async function Page({ params }: PageProps) {
    const { locale: localeParam } = await params;
    const locale = localeParam as Locale;
    const dict = await getDictionary(locale);
    const archive = await getProjectArchive(locale, archiveKey);
    const catalog = await getServiceCatalog(locale);
    const serviceLinks = SERVICE_CATALOG_KEYS.map((key) => ({
      label: catalog.items[key].title,
      slug: `services/${SERVICE_SLUG_MAP[key]}`,
    }));
    const jsonLd = buildArchiveJsonLd(archive, locale, slug);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ProjectArchivePage locale={locale} dict={dict} archive={archive} serviceLinks={serviceLinks} />
      </>
    );
  }

  return { generateMetadata, default: Page };
}
