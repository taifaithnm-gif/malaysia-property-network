import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { MethodologyContent } from "@/lib/i18n/get-research-content";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading, Button } from "@/components/ui/Button";

type MethodologyPageProps = {
  locale: Locale;
  dict: Dictionary;
  content: MethodologyContent;
};

export function MethodologyPage({ locale, dict, content }: MethodologyPageProps) {
  const labels = content.labels;

  return (
    <>
      <Hero locale={locale} dict={dict} title={content.title} subtitle={content.subtitle} description={content.intro} showCta={false} />

      <section className="border-b border-gray-100 bg-teal-50 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4 px-4">
          <Button href={`/${locale}/research/rental-index`} variant="primary">{labels.rentalIndex}</Button>
          <Button href={`/${locale}/project-intelligence`} variant="outline">{labels.projectIntelligence}</Button>
          <Button href={`/${locale}/research`} variant="outline">{labels.backToResearch}</Button>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {content.dimensions.map((dim) => (
              <article key={dim.id} className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <h2 className="text-xl font-bold text-navy-900">{dim.title}</h2>
                  <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-800">
                    {labels.weight}: {dim.weight}
                  </span>
                </div>
                <p className="mt-3 font-medium text-gray-700">{dim.summary}</p>
                <p className="mt-4 text-gray-600 leading-relaxed">{dim.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={labels.scoreBands} align="left" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.scoreBands.map((band) => (
              <div key={band.range} className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-lg font-bold text-teal-700">{band.range}</p>
                <p className="mt-1 font-semibold text-navy-900">{band.label}</p>
                <p className="mt-2 text-sm text-gray-600">{band.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
