import type { Locale } from "@/lib/constants";
import {
  getProjectProfile,
  PROJECT_PROFILE_SLUGS,
  type ProjectProfileKey,
} from "@/lib/i18n/get-project-profile";
import {
  getServiceCatalog,
  SERVICE_CATALOG_KEYS,
  SERVICE_SLUG_MAP,
} from "@/lib/i18n/service-catalog";
import {
  ProjectProfilePage,
  buildProjectProfileJsonLd,
} from "@/components/sections/ProjectProfilePage";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export function createProjectProfilePage(key: ProjectProfileKey) {
  const slug = PROJECT_PROFILE_SLUGS[key];

  async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const profile = await getProjectProfile(locale as Locale, key);
    const dict = await getDictionary(locale as Locale);
    return buildMetadata({
      dict,
      locale,
      path: slug,
      title: profile.seoTitle,
      description: profile.seoDescription,
      keywords: profile.seoKeywords,
    });
  }

  async function Page({ params }: PageProps) {
    const { locale: localeParam } = await params;
    const locale = localeParam as Locale;
    const dict = await getDictionary(locale);
    const profile = await getProjectProfile(locale, key);
    const catalog = await getServiceCatalog(locale);
    const serviceLinks = SERVICE_CATALOG_KEYS.map((k) => ({
      label: catalog.items[k].title,
      slug: `services/${SERVICE_SLUG_MAP[k]}`,
    }));
    const jsonLd = buildProjectProfileJsonLd(profile, locale, slug);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ProjectProfilePage
          locale={locale}
          dict={dict}
          profile={profile}
          serviceLinks={serviceLinks}
        />
      </>
    );
  }

  return { generateMetadata, default: Page };
}
