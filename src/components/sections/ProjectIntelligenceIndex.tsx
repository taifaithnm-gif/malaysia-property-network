import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type {
  ProjectIntelligence,
  ProjectIntelligenceHub,
} from "@/lib/i18n/get-project-intelligence";
import { scoreColor } from "@/lib/i18n/get-project-intelligence";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading, Button } from "@/components/ui/Button";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type ProjectIntelligenceIndexProps = {
  locale: Locale;
  dict: Dictionary;
  hub: ProjectIntelligenceHub;
  projects: ProjectIntelligence[];
};

export function ProjectIntelligenceIndex({
  locale,
  dict,
  hub,
  projects,
}: ProjectIntelligenceIndexProps) {
  const labels = hub.labels;

  return (
    <>
      <Hero
        locale={locale}
        dict={dict}
        title={hub.title}
        subtitle={hub.subtitle}
        description={hub.intro}
        showCta={false}
      />

      <section className="border-b border-gray-100 bg-gray-50 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4 px-4">
          <Button href={`/${locale}/research`} variant="outline">
            {labels.backToResearch}
          </Button>
          <Button href={`/${locale}/listings`} variant="primary">
            {labels.browseListings}
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((p) => (
              <article
                key={p.projectKey}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-navy-900">{p.projectName}</h2>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{p.developerProfile}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-sm font-bold ${scoreColor(p.investmentScore)}`}
                  >
                    {p.investmentScore}
                  </span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-gray-500">{labels.rentalRange}</dt>
                    <dd className="font-medium text-navy-900">{p.rentalRange}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">{labels.yield}</dt>
                    <dd className="font-medium text-navy-900">{p.yieldEstimate}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">{labels.occupancy}</dt>
                    <dd className="font-medium text-navy-900">{p.occupancyEstimate}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">{labels.targetTenant}</dt>
                    <dd className="font-medium text-navy-900">{p.targetTenant}</dd>
                  </div>
                </dl>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/${locale}/project-intelligence/${p.slug}`}
                    className="text-sm font-semibold text-teal-700 hover:underline"
                  >
                    {labels.viewDossier} →
                  </Link>
                  <Link
                    href={`/${locale}/${p.slug}`}
                    className="text-sm text-gray-600 hover:text-teal-700"
                  >
                    {labels.viewProject}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-teal-50 py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <SectionHeading title={hub.methodologyTitle} subtitle={hub.methodology} />
        </div>
      </section>
    </>
  );
}
