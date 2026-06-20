import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { getPublishedListings } from "@/lib/listings";
import { POPULAR_PROJECTS, getProjectDisplayName, getTagLabel } from "@/lib/project-marketplace";
import { ListingGrid } from "@/components/listings/ListingCard";
import { SectionHeading, Button } from "@/components/ui/Button";

type PropertyMarketplaceProps = {
  locale: Locale;
  dict: Dictionary;
};

export async function PropertyMarketplace({ locale, dict }: PropertyMarketplaceProps) {
  const labels = dict.marketplace;
  const browse = dict.listingBrowse;

  const [featuredRentals, latestListings] = await Promise.all([
    getPublishedListings(locale, { listingType: "rent", featured: true, limit: 6 }),
    getPublishedListings(locale, { limit: 6 }),
  ]);

  const featuredFallback =
    featuredRentals.length > 0
      ? featuredRentals
      : await getPublishedListings(locale, { listingType: "rent", limit: 6 });

  const rankings = [...POPULAR_PROJECTS].sort(
    (a, b) => b.rentalDemandScore - a.rentalDemandScore,
  );

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={labels.title} subtitle={labels.subtitle} />

        <div className="mb-14">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-navy-900">{labels.featuredRentals}</h3>
            <Link href={`/${locale}/listings?type=rent`} className="text-sm font-medium text-teal-700 hover:underline">
              {labels.viewAll}
            </Link>
          </div>
          <ListingGrid
            listings={featuredFallback}
            locale={locale}
            emptyLabel={labels.emptyFeatured}
            emptyDesc={labels.emptyFeaturedDesc}
            bookViewingLabel={dict.listings.bookViewingCta}
            viewDetailsLabel={browse.viewDetails}
          />
        </div>

        <div className="mb-14">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-navy-900">{labels.latestListings}</h3>
            <Link href={`/${locale}/listings`} className="text-sm font-medium text-teal-700 hover:underline">
              {labels.viewAll}
            </Link>
          </div>
          <ListingGrid
            listings={latestListings}
            locale={locale}
            emptyLabel={labels.emptyLatest}
            emptyDesc={labels.emptyLatestDesc}
            bookViewingLabel={dict.listings.bookViewingCta}
            viewDetailsLabel={browse.viewDetails}
          />
        </div>

        <div className="mb-14">
          <h3 className="mb-4 text-lg font-semibold text-navy-900">{labels.popularProjects}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {POPULAR_PROJECTS.slice(0, 7).map((project) => (
              <Link
                key={project.key}
                href={`/${locale}/${project.slug}`}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <h4 className="font-semibold text-navy-900">
                  {getProjectDisplayName(project.key, locale)}
                </h4>
                <p className="mt-1 text-sm text-gray-500">{getTagLabel(project.tag, locale)}</p>
                <p className="mt-3 text-sm font-medium text-teal-700">
                  {labels.demandScore}: {project.rentalDemandScore}/5
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h3 className="mb-4 text-lg font-semibold text-navy-900">{labels.rentalDemandRankings}</h3>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">{labels.rank}</th>
                  <th className="px-4 py-3">{labels.project}</th>
                  <th className="px-4 py-3">{labels.tag}</th>
                  <th className="px-4 py-3">{labels.demandScore}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rankings.map((project, index) => (
                  <tr key={project.key} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-navy-900">{index + 1}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/${locale}/${project.slug}`}
                        className="font-medium text-teal-700 hover:underline"
                      >
                        {getProjectDisplayName(project.key, locale)}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{getTagLabel(project.tag, locale)}</td>
                    <td className="px-4 py-3 font-semibold text-navy-900">
                      {project.rentalDemandScore}/5
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button href={`/${locale}/listings`} variant="primary">
            {labels.browseAll}
          </Button>
          <Button href={`/${locale}/list-property`} variant="outline">
            {dict.listings.listPropertyCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
