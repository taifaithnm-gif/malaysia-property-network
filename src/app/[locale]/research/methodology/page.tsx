import type { Locale } from "@/lib/constants";
import { MethodologyPage } from "@/components/sections/MethodologyPage";
import { getMethodology, buildResearchPageJsonLd } from "@/lib/i18n/get-research-content";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const content = await getMethodology(locale as Locale);
  const dict = await getDictionary(locale as Locale);
  return buildMetadata({
    dict,
    locale,
    path: "research/methodology",
    title: content.seoTitle,
    description: content.seoDescription,
  });
}

export default async function MethodologyRoute({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const content = await getMethodology(locale);
  const jsonLd = buildResearchPageJsonLd(content, locale, "research/methodology");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MethodologyPage locale={locale} dict={dict} content={content} />
    </>
  );
}
