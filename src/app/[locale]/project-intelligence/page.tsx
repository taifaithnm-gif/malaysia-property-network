import type { Locale } from "@/lib/constants";
import { ProjectIntelligenceIndex } from "@/components/sections/ProjectIntelligenceIndex";
import {
  getProjectIntelligenceHub,
  getAllProjectIntelligence,
  buildResearchCenterJsonLd,
} from "@/lib/i18n/get-project-intelligence";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const hub = await getProjectIntelligenceHub(locale as Locale);
  const dict = await getDictionary(locale as Locale);
  return buildMetadata({
    dict,
    locale,
    path: "project-intelligence",
    title: hub.seoTitle,
    description: hub.seoDescription,
  });
}

export default async function ProjectIntelligencePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const [hub, projects] = await Promise.all([
    getProjectIntelligenceHub(locale),
    getAllProjectIntelligence(locale),
  ]);
  const jsonLd = buildResearchCenterJsonLd(
    { seoTitle: hub.seoTitle, seoDescription: hub.seoDescription },
    locale,
    "project-intelligence",
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectIntelligenceIndex locale={locale} dict={dict} hub={hub} projects={projects} />
    </>
  );
}
