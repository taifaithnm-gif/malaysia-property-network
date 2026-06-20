import type { Locale } from "@/lib/constants";
import { ResearchCenterPage } from "@/components/sections/ResearchCenterPage";
import {
  getResearchCenter,
  getAllProjectIntelligence,
  buildResearchCenterJsonLd,
} from "@/lib/i18n/get-project-intelligence";
import { getAllMarketReports } from "@/lib/i18n/get-research-content";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const center = await getResearchCenter(locale as Locale);
  const dict = await getDictionary(locale as Locale);
  return buildMetadata({
    dict,
    locale,
    path: "research",
    title: center.seoTitle,
    description: center.seoDescription,
  });
}

export default async function ResearchPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const [center, projects, reports] = await Promise.all([
    getResearchCenter(locale),
    getAllProjectIntelligence(locale),
    getAllMarketReports(locale),
  ]);
  const jsonLd = buildResearchCenterJsonLd(center, locale, "research");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResearchCenterPage locale={locale} dict={dict} center={center} projects={projects} reports={reports} />
    </>
  );
}
