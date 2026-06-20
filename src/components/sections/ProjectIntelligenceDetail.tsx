import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type {
  ProjectIntelligence,
  ProjectIntelligenceHub,
} from "@/lib/i18n/get-project-intelligence";
import { scoreColor } from "@/lib/i18n/get-project-intelligence";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

type ProjectIntelligenceDetailProps = {
  locale: Locale;
  dict: Dictionary;
  intel: ProjectIntelligence;
  labels: ProjectIntelligenceHub["labels"];
};

export function ProjectIntelligenceDetail({
  locale,
  dict,
  intel,
  labels,
}: ProjectIntelligenceDetailProps) {
  return (
    <>
      <Hero
        locale={locale}
        dict={dict}
        title={intel.projectName}
        subtitle={labels.developer}
        description={intel.developerProfile}
        showCta={false}
      />

      <section className="border-b border-gray-100 bg-teal-50 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 sm:px-6">
          <span
            className={`rounded-full border px-4 py-2 text-sm font-bold ${scoreColor(intel.investmentScore)}`}
          >
            {labels.score}: {intel.investmentScore}/100
          </span>
          <Button href={`/${locale}/${intel.slug}`} variant="outline">
            {labels.viewProject}
          </Button>
          <Button href={`/${locale}/listings?project=${encodeURIComponent(intel.projectName)}`} variant="primary">
            {labels.browseListings}
          </Button>
          <WhatsAppButton label={dict.common.whatsappUs} />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: labels.developer, value: intel.developerProfile },
              { label: labels.completion, value: intel.completionYear },
              { label: labels.rentalRange, value: intel.rentalRange },
              { label: labels.yield, value: intel.yieldEstimate },
              { label: labels.occupancy, value: intel.occupancyEstimate },
              { label: labels.targetTenant, value: intel.targetTenant },
            ].map((row) => (
              <div key={row.label} className="rounded-xl border border-gray-200 bg-white p-5">
                <dt className="text-xs font-medium uppercase text-gray-500">{row.label}</dt>
                <dd className="mt-2 text-sm font-medium text-navy-900">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-navy-900">{labels.propertyTypes}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {intel.propertyTypes.map((t) => (
              <li
                key={t}
                className="rounded-full bg-white px-4 py-2 text-sm text-gray-700 shadow-sm ring-1 ring-gray-200"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-lg font-semibold text-teal-700">{labels.pros}</h2>
            <ul className="mt-4 space-y-3">
              {intel.pros.map((item) => (
                <li key={item} className="flex gap-2 text-gray-700">
                  <span className="text-teal-600">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-amber-700">{labels.cons}</h2>
            <ul className="mt-4 space-y-3">
              {intel.cons.map((item) => (
                <li key={item} className="flex gap-2 text-gray-700">
                  <span className="text-amber-600">−</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-navy-900 py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}/research`} className="text-sm text-teal-300 hover:underline">
            ← {labels.backToResearch}
          </Link>
          <Link
            href={`/${locale}/project-intelligence`}
            className="text-sm text-teal-300 hover:underline"
          >
            {labels.compareProjects} / Directory
          </Link>
        </div>
      </section>
    </>
  );
}
