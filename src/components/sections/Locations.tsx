import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { SectionHeading } from "@/components/ui/Button";

type LocationsProps = {
  locale: Locale;
  dict: Dictionary;
};

const locations = [
  { slug: "forest-city", key: "forestCity" as const, color: "from-green-600 to-green-800" },
  { slug: "rf-princess-cove", key: "rfPrincessCove" as const, color: "from-purple-600 to-purple-800" },
  { slug: "danga-bay", key: "dangaBay" as const, color: "from-orange-600 to-orange-800" },
  { slug: "bukit-indah", key: "bukitIndah" as const, color: "from-teal-600 to-teal-800" },
  { slug: "mount-austin", key: "mountAustin" as const, color: "from-blue-600 to-blue-800" },
  { slug: "eco-botanic", key: "ecoBotanic" as const, color: "from-emerald-600 to-emerald-800" },
  { slug: "medini", key: "medini" as const, color: "from-indigo-600 to-indigo-800" },
];

export function Locations({ locale, dict }: LocationsProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={dict.home.locationsTitle} subtitle={dict.home.locationsSubtitle} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map(({ slug, key, color }) => {
            const loc = dict.locations[key];
            return (
              <Link
                key={slug}
                href={`/${locale}/${slug}`}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-90`} />
                <div className="relative">
                  <h3 className="text-2xl font-bold">{loc.title}</h3>
                  <p className="mt-2 text-sm text-white/80">{loc.subtitle}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white/90 group-hover:text-white">
                    {dict.common.learnMore}
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
