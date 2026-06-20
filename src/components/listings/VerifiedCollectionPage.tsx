import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { getEnrichedListings } from "@/lib/listings";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/ui/Button";
import { ListingGrid } from "@/components/listings/ListingCard";
import { getVerifiedCollection } from "@/lib/verified-listings";

type VerifiedCollectionPageProps = {
  locale: Locale;
  dict: Dictionary;
  searchParams: Record<string, string | string[] | undefined>;
};

function param(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export async function VerifiedCollectionPage({
  locale,
  dict,
  searchParams,
}: VerifiedCollectionPageProps) {
  const collection = await getVerifiedCollection(locale);
  const labels = dict.verifiedListing;
  const browse = dict.listingBrowse;
  const building = param(searchParams.building);

  const enriched = await getEnrichedListings(locale, {
    verified: true,
    building,
    limit: 30,
  });

  const listings = enriched.map((e) => e.listing);
  const verifiedById = Object.fromEntries(listings.map((l) => [l.id, true]));

  return (
    <>
      <Hero
        locale={locale}
        dict={dict}
        title={collection.title}
        subtitle={collection.subtitle}
        description={collection.intro}
        showCta={false}
      />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={labels.collectionTitle}
            subtitle={`${collection.count} ${labels.collectionCount}`}
            align="left"
          />
          <div className="mb-8 flex flex-wrap gap-2 text-sm">
            <Link
              href={`/${locale}/listings/verified`}
              className={`rounded-full px-4 py-2 ${!building ? "bg-teal-700 text-white" : "bg-gray-100 text-navy-900"}`}
            >
              {labels.allBuildings}
            </Link>
            {labels.buildingFilters.map((b) => (
              <Link
                key={b.key}
                href={`/${locale}/listings/verified?building=${b.key}`}
                className={`rounded-full px-4 py-2 ${building === b.key ? "bg-teal-700 text-white" : "bg-gray-100 text-navy-900"}`}
              >
                {b.label}
              </Link>
            ))}
          </div>
          <ListingGrid
            listings={listings}
            locale={locale}
            emptyLabel={browse.empty}
            emptyDesc={browse.emptyDesc}
            bookViewingLabel={dict.listings.bookViewingCta}
            viewDetailsLabel={browse.viewDetails}
            verifiedByListingId={verifiedById}
            verifiedLabel={labels.badge}
          />
        </div>
      </section>
    </>
  );
}
