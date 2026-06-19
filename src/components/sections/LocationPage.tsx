import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { SectionHeading } from "@/components/ui/Button";
import { PageCTA } from "./CTA";

type LocationPageProps = {
  locale: Locale;
  dict: Dictionary;
  locationKey: "johorBahru" | "forestCity" | "rfPrincessCove" | "dangaBay";
};

export function LocationPageContent({ locale, dict, locationKey }: LocationPageProps) {
  const loc = dict.locations[locationKey];

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={loc.title} subtitle={loc.subtitle} align="left" />
          <p className="text-lg text-gray-600 leading-relaxed">{loc.intro}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {loc.highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3"
              >
                <svg className="h-5 w-5 shrink-0 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PageCTA locale={locale} dict={dict} />
    </>
  );
}
