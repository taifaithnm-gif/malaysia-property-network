import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { ResearchCenter, ProjectIntelligence } from "@/lib/i18n/get-project-intelligence";
import { scoreColor } from "@/lib/i18n/get-project-intelligence";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading, Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

type ResearchCenterPageProps = {
  locale: Locale;
  dict: Dictionary;
  center: ResearchCenter;
  projects: ProjectIntelligence[];
};

export function ResearchCenterPage({ locale, dict, center, projects }: ResearchCenterPageProps) {
  const labels = center.labels;

  return (
    <>
      <Hero
        locale={locale}
        dict={dict}
        title={center.title}
        subtitle={center.subtitle}
        description={center.intro}
        showCta={false}
      />

      <section className="border-b border-gray-100 bg-teal-50 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 sm:px-6">
          <Button href={`/${locale}/project-intelligence`} variant="primary">
            {labels.viewDirectory}
          </Button>
          <Button href={`/${locale}/listings`} variant="outline">
            {labels.listings}
          </Button>
          <WhatsAppButton label={dict.common.whatsappUs} />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={labels.methodology} align="left" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {center.pillars.map((pillar) => (
              <div key={pillar.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-navy-900">{pillar.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={labels.topProjects} align="left" />
          <div className="mt-8 overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Rental range</th>
                  <th className="px-4 py-3">Yield</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {projects.map((p, i) => (
                  <tr key={p.projectKey} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{i + 1}</td>
                    <td className="px-4 py-3 font-medium text-navy-900">{p.projectName}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${scoreColor(p.investmentScore)}`}
                      >
                        {p.investmentScore}/100
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{p.rentalRange}</td>
                    <td className="px-4 py-3 text-gray-600">{p.yieldEstimate}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/${locale}/project-intelligence/${p.slug}`}
                        className="font-medium text-teal-700 hover:underline"
                      >
                        Dossier →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-900">{center.ctaTitle}</h2>
          <p className="mt-4 text-gray-600">{center.ctaDesc}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={`/${locale}/project-intelligence`} variant="primary">
              {labels.viewDirectory}
            </Button>
            <Button href={`/${locale}/compare/bukit-indah-vs-mount-austin`} variant="outline">
              {labels.compare}
            </Button>
          </div>
          <p className="mt-8 text-xs text-gray-500">{labels.notAdvice}</p>
        </div>
      </section>
    </>
  );
}
