import type { Locale } from "@/lib/constants";
import {
  getProjectGallery,
  buildProjectGalleryJsonLd,
  type ProjectGalleryKey,
} from "@/lib/i18n/get-project-gallery";
import { ProjectMediaCenter } from "@/components/sections/ProjectMediaCenter";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export function createProjectGalleryPage(key: ProjectGalleryKey) {
  const path = `${key}/gallery`;

  async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const content = await getProjectGallery(locale as Locale, key);
    const dict = await getDictionary(locale as Locale);
    return buildMetadata({
      dict,
      locale,
      path,
      title: content.seoTitle,
      description: content.seoDescription,
    });
  }

  async function Page({ params }: PageProps) {
    const { locale: localeParam } = await params;
    const locale = localeParam as Locale;
    const dict = await getDictionary(locale);
    const content = await getProjectGallery(locale, key);
    const jsonLd = buildProjectGalleryJsonLd(content, locale, path);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ProjectMediaCenter locale={locale} dict={dict} content={content} />
      </>
    );
  }

  return { generateMetadata, default: Page };
}
