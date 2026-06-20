import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { MarketReport, MarketReportKey } from "@/lib/i18n/get-research-content";
import { MARKET_REPORT_SLUGS } from "@/lib/i18n/get-research-content";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";

type MarketReportPageProps = {
  locale: Locale;
  dict: Dictionary;
  report: MarketReport;
  allReports: MarketReport[];
};

export function MarketReportPage({ locale, dict, report, allReports }: MarketReportPageProps) {
  const labels = report.labels;

  return (
    <>
      <Hero locale={locale} dict={dict} title={report.title} subtitle={report.subtitle} description={report.intro} showCta={false} />

      <section className="border-b border-gray-100 bg-gray-50 py-4 text-center text-sm text-gray-500">
        Published {report.published}
      </section>

      <section className="border-b border-gray-100 bg-teal-50 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4 px-4">
          <Button href={`/${locale}/research/rental-index`} variant="outline">{labels.rentalIndex}</Button>
          <Button href={`/${locale}/listings`} variant="primary">{labels.browseListings}</Button>
          <Button href={`/${locale}/research`} variant="outline">{labels.backToResearch}</Button>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {report.sections.map((section) => (
            <article key={section.title} className="mb-12">
              <h2 className="text-xl font-bold text-navy-900">{section.title}</h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((p) => (
                  <p key={p} className="text-gray-600 leading-relaxed">{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50 py-12">
        <div className="mx-auto max-w-3xl px-4">
          <h3 className="text-sm font-semibold uppercase text-gray-500">{labels.allReports}</h3>
          <ul className="mt-4 space-y-2">
            {allReports.map((r) => (
              <li key={r.key}>
                <Link
                  href={`/${locale}/${MARKET_REPORT_SLUGS[r.key as MarketReportKey]}`}
                  className={`text-sm ${r.key === report.key ? "font-bold text-teal-700" : "text-gray-700 hover:text-teal-700"}`}
                >
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
