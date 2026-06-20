import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { MarketplaceStats } from "@/lib/marketplace-stats";
import { SectionHeading } from "@/components/ui/Button";

type MarketplaceTrustLayerProps = {
  locale: Locale;
  dict: Dictionary;
  stats: MarketplaceStats;
};

export function MarketplaceTrustLayer({ locale, dict, stats }: MarketplaceTrustLayerProps) {
  const labels = dict.marketplaceTrust;

  const items = [
    { value: `${stats.totalListings}+`, label: labels.totalListings },
    { value: String(stats.projectsCovered), label: labels.projectsCovered },
    { value: String(stats.ownerServices), label: labels.ownerServices },
    { value: `${stats.viewingRequests}+`, label: labels.viewingRequests },
  ];

  return (
    <section className="border-y border-gray-200 bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={labels.title} subtitle={labels.subtitle} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-gray-100 bg-gray-50 px-6 py-8 text-center shadow-sm"
            >
              <p className="text-3xl font-bold text-teal-700">{item.value}</p>
              <p className="mt-2 text-sm font-medium text-navy-900">{item.label}</p>
            </div>
          ))}
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {labels.trustItems.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-0.5 text-teal-600">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <Link href={`/${locale}/listings`} className="font-semibold text-teal-700 hover:underline">
            {labels.browseListings}
          </Link>
          <Link href={`/${locale}/research`} className="font-semibold text-teal-700 hover:underline">
            {labels.researchCenter}
          </Link>
          <Link href={`/${locale}/compare/forest-city-vs-rf-princess-cove`} className="font-semibold text-teal-700 hover:underline">
            {labels.viewComparisons}
          </Link>
        </div>
      </div>
    </section>
  );
}
