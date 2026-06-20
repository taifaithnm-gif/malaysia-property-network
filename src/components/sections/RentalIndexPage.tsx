import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { RentalIndexContent } from "@/lib/i18n/get-research-content";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";

type RentalIndexPageProps = {
  locale: Locale;
  dict: Dictionary;
  content: RentalIndexContent;
};

export function RentalIndexPage({ locale, dict, content }: RentalIndexPageProps) {
  const labels = content.labels;
  const sorted = [...content.projects].sort((a, b) => b.averageRentValue - a.averageRentValue);

  return (
    <>
      <Hero locale={locale} dict={dict} title={content.title} subtitle={content.subtitle} description={content.intro} showCta={false} />

      <section className="border-b border-gray-100 bg-gray-50 py-4 text-center text-sm text-gray-500">
        Updated {content.updated}
      </section>

      <section className="border-b border-gray-100 bg-teal-50 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4 px-4">
          <Button href={`/${locale}/research/methodology`} variant="outline">{labels.methodology}</Button>
          <Button href={`/${locale}/research`} variant="outline">Research Center</Button>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-navy-900 text-xs uppercase text-white">
                <tr>
                  <th className="px-4 py-3">{labels.project}</th>
                  <th className="px-4 py-3">{labels.averageRent}</th>
                  <th className="px-4 py-3">{labels.rentalRange}</th>
                  <th className="px-4 py-3">{labels.yield}</th>
                  <th className="px-4 py-3">{labels.occupancy}</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sorted.map((p) => (
                  <tr key={p.key} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-navy-900">{p.name}</td>
                    <td className="px-4 py-3 text-teal-700 font-medium">{p.averageRent}</td>
                    <td className="px-4 py-3 text-gray-600">{p.rentalRange}</td>
                    <td className="px-4 py-3 text-gray-600">{p.yield}</td>
                    <td className="px-4 py-3 text-gray-600">{p.occupancy}</td>
                    <td className="px-4 py-3">
                      <Link href={`/${locale}/project-intelligence/${p.slug}`} className="font-medium text-teal-700 hover:underline">
                        {labels.viewDossier} →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
