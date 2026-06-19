import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { CorporateVisitCenterContent, GolfTravelCenterContent, TravelPackage } from "@/lib/i18n/get-travel-centers";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CenterInquiryForm } from "@/components/ui/CenterInquiryForm";

type TravelCenterPageProps =
  | { locale: Locale; dict: Dictionary; mode: "golf"; content: GolfTravelCenterContent }
  | { locale: Locale; dict: Dictionary; mode: "corporate"; content: CorporateVisitCenterContent };

export function TravelCenterPage(props: TravelCenterPageProps) {
  const { locale, dict, mode, content } = props;
  const items: TravelPackage[] = mode === "golf" ? props.content.packages : props.content.programs;
  const apiPath = mode === "golf" ? "/api/golf-travel-inquiries" : "/api/corporate-visit-inquiries";
  const typeField = mode === "golf" ? "package_type" : "visit_type";
  const optionLabelKey = mode === "golf" ? "packageType" : "visitType";

  return (
    <>
      <Hero locale={locale} dict={dict} title={content.title} subtitle={content.subtitle} description={content.intro} showCta={false} />
      <section className="border-b border-gray-100 bg-teal-50 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 sm:px-6">
          <WhatsAppButton label={dict.common.whatsappUs} message={encodeURIComponent(content.whatsappMessage)} />
          <Link href={`/${locale}/book-viewing`} className="text-sm font-semibold text-teal-700 hover:underline">
            {mode === "golf" ? "Book viewing" : "Book inspection tour"} →
          </Link>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={mode === "corporate" ? content.labels.programsTitle : content.labels.packagesTitle}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((pkg) => (
              <article key={pkg.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-navy-900">{pkg.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{pkg.desc}</p>
                <ul className="mt-4 space-y-1 text-sm text-gray-700">
                  {pkg.highlights.map((h) => (
                    <li key={h}>• {h}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={content.labels.inquiryTitle} align="left" />
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8">
            <CenterInquiryForm
              locale={locale}
              apiPath={apiPath}
              labels={content.labels}
              options={items}
              optionLabelKey={optionLabelKey as "packageType" | "visitType"}
              typeField={typeField as "package_type" | "visit_type"}
              successMessage={content.labels.success}
            />
          </div>
        </div>
      </section>
    </>
  );
}
