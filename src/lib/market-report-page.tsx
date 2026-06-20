import type { Locale } from "@/lib/constants";
import type { MarketReportKey } from "@/lib/i18n/get-research-content";
import {
  getMarketReport,
  getAllMarketReports,
  MARKET_REPORT_SLUGS,
  buildResearchPageJsonLd,
} from "@/lib/i18n/get-research-content";
import { MarketReportPage } from "@/components/sections/MarketReportPage";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export function createMarketReportPage(key: MarketReportKey) {
  const path = MARKET_REPORT_SLUGS[key];

  async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const report = await getMarketReport(locale as Locale, key);
    const dict = await getDictionary(locale as Locale);
    return buildMetadata({
      dict,
      locale,
      path,
      title: report.seoTitle,
      description: report.seoDescription,
    });
  }

  async function Page({ params }: PageProps) {
    const { locale: localeParam } = await params;
    const locale = localeParam as Locale;
    const dict = await getDictionary(locale);
    const [report, allReports] = await Promise.all([
      getMarketReport(locale, key),
      getAllMarketReports(locale),
    ]);
    const jsonLd = buildResearchPageJsonLd(report, locale, path);

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MarketReportPage locale={locale} dict={dict} report={report} allReports={allReports} />
      </>
    );
  }

  return { generateMetadata, default: Page };
}
