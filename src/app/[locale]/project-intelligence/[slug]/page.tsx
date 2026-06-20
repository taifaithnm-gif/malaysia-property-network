import { notFound } from "next/navigation";
import type { Locale } from "@/lib/constants";
import { ProjectIntelligenceDetail } from "@/components/sections/ProjectIntelligenceDetail";
import {
  getProjectIntelligence,
  getProjectIntelligenceHub,
  PROJECT_INTELLIGENCE_KEYS,
  buildProjectIntelligenceJsonLd,
  type ProjectIntelligenceKey,
} from "@/lib/i18n/get-project-intelligence";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

const SLUG_TO_KEY: Record<string, ProjectIntelligenceKey> = {
  "forest-city": "forest-city",
  "rf-princess-cove": "rf-princess-cove",
  "danga-bay": "danga-bay",
  "bukit-indah": "bukit-indah",
  "mount-austin": "mount-austin",
  "eco-botanic": "eco-botanic",
  medini: "medini",
};

const INTELLIGENCE_SLUGS = [
  "forest-city",
  "rf-princess-cove",
  "danga-bay",
  "bukit-indah",
  "mount-austin",
  "eco-botanic",
  "medini",
] as const;

export function generateStaticParams() {
  return INTELLIGENCE_SLUGS.flatMap((slug) =>
    ["en", "zh"].map((locale) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const key = SLUG_TO_KEY[slug];
  if (!key) return {};
  const intel = await getProjectIntelligence(locale as Locale, key);
  const dict = await getDictionary(locale as Locale);
  return buildMetadata({
    dict,
    locale,
    path: `project-intelligence/${slug}`,
    title: intel.seoTitle,
    description: intel.seoDescription,
  });
}

export default async function ProjectIntelligenceDetailPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const key = SLUG_TO_KEY[slug];
  if (!key) notFound();

  const dict = await getDictionary(locale);
  const [intel, hub] = await Promise.all([
    getProjectIntelligence(locale, key),
    getProjectIntelligenceHub(locale),
  ]);
  const path = `project-intelligence/${slug}`;
  const jsonLd = buildProjectIntelligenceJsonLd(intel, locale, path);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectIntelligenceDetail locale={locale} dict={dict} intel={intel} labels={hub.labels} />
    </>
  );
}
