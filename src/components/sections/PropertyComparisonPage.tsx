import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { ComparisonPage } from "@/lib/i18n/get-comparison";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading, Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

type PropertyComparisonPageProps = {
  locale: Locale;
  dict: Dictionary;
  comparison: ComparisonPage;
};

export function PropertyComparisonPage({ locale, dict, comparison }: PropertyComparisonPageProps) {
  const labels = comparison.labels;

  return (
    <>
      <Hero
        locale={locale}
        dict={dict}
        title={comparison.title}
        subtitle={comparison.subtitle}
        description={comparison.intro}
        showCta={false}
      />

      <section className="border-b border-gray-100 bg-teal-50 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 sm:px-6">
          <Button href={`/${locale}/${comparison.projectA}`} variant="outline">
            {comparison.projectAName}
          </Button>
          <span className="text-sm font-medium text-gray-500">vs</span>
          <Button href={`/${locale}/${comparison.projectB}`} variant="outline">
            {comparison.projectBName}
          </Button>
          <WhatsAppButton label={dict.common.whatsappUs} />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={labels.dimension} align="left" />
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">{labels.dimension}</th>
                  <th className="px-4 py-3">{comparison.projectAName}</th>
                  <th className="px-4 py-3">{comparison.projectBName}</th>
                  <th className="hidden px-4 py-3 md:table-cell">{labels.note}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparison.dimensions.map((row) => (
                  <tr key={row.label} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-navy-900">{row.label}</td>
                    <td className="px-4 py-3 text-gray-700">{row.valueA}</td>
                    <td className="px-4 py-3 text-gray-700">{row.valueB}</td>
                    <td className="hidden px-4 py-3 text-gray-500 md:table-cell">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-navy-900">{labels.recommendation}</h2>
          <p className="mt-4 text-gray-600">{comparison.recommendation}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={`/${locale}/listings`} variant="primary">
              {labels.viewListings}
            </Button>
            <Button href={`/${locale}/${comparison.winner}`} variant="outline">
              {labels.viewProject}: {comparison.winner === comparison.projectA ? comparison.projectAName : comparison.projectBName}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export function buildComparisonJsonLd(comparison: ComparisonPage, locale: Locale, path: string) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://malaysiapropertynetwork.com"}/${locale}/${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: comparison.seoTitle,
    description: comparison.seoDescription,
    url,
  };
}
