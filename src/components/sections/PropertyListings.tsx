import Image from "next/image";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { PropertyListing } from "@/lib/supabase/types";
import { formatListingPrice, getPublishedListings } from "@/lib/listings";
import { SectionHeading, Button } from "@/components/ui/Button";

type PropertyListingsProps = {
  locale: Locale;
  dict: Dictionary;
};

function ListingGrid({
  listings,
  locale,
  emptyLabel,
  emptyDesc,
  bookViewingLabel,
}: {
  listings: PropertyListing[];
  locale: Locale;
  emptyLabel: string;
  emptyDesc: string;
  bookViewingLabel: string;
}) {
  if (listings.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
        <p className="font-medium text-navy-900">{emptyLabel}</p>
        <p className="mt-2 text-sm text-gray-600">{emptyDesc}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => (
        <article
          key={listing.id}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
        >
          <div className="relative aspect-[4/3] bg-gray-100">
            {listing.image_url ? (
              <Image
                src={listing.image_url}
                alt={listing.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                {listing.project}
              </div>
            )}
            {listing.is_featured && (
              <span className="absolute left-3 top-3 rounded-full bg-teal-700 px-3 py-1 text-xs font-semibold text-white">
                Featured
              </span>
            )}
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-navy-900">{listing.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{listing.project}</p>
            <p className="mt-2 text-lg font-bold text-teal-700">
              {formatListingPrice(listing, locale)}
            </p>
            {listing.property_type && (
              <p className="mt-1 text-sm text-gray-600">{listing.property_type}</p>
            )}
            <div className="mt-4">
              <Button href={`/${locale}/book-viewing?listing=${listing.id}`} variant="outline" className="text-sm">
                {bookViewingLabel}
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export async function PropertyListings({ locale, dict }: PropertyListingsProps) {
  const labels = dict.listings;
  const [rentals, sales, featured] = await Promise.all([
    getPublishedListings(locale, { listingType: "rent", limit: 3 }),
    getPublishedListings(locale, { listingType: "sale", limit: 3 }),
    getPublishedListings(locale, { featured: true, limit: 3 }),
  ]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={labels.title} subtitle={labels.subtitle} />

        <div className="mb-12">
          <h3 className="mb-4 text-lg font-semibold text-navy-900">{labels.featuredTitle}</h3>
          <ListingGrid
            listings={featured}
            locale={locale}
            emptyLabel={labels.emptyFeatured}
            emptyDesc={labels.emptyFeaturedDesc}
            bookViewingLabel={labels.bookViewingCta}
          />
        </div>

        <div className="mb-12">
          <h3 className="mb-4 text-lg font-semibold text-navy-900">{labels.rentalsTitle}</h3>
          <ListingGrid
            listings={rentals}
            locale={locale}
            emptyLabel={labels.emptyRentals}
            emptyDesc={labels.emptyRentalsDesc}
            bookViewingLabel={labels.bookViewingCta}
          />
        </div>

        <div className="mb-10">
          <h3 className="mb-4 text-lg font-semibold text-navy-900">{labels.salesTitle}</h3>
          <ListingGrid
            listings={sales}
            locale={locale}
            emptyLabel={labels.emptySales}
            emptyDesc={labels.emptySalesDesc}
            bookViewingLabel={labels.bookViewingCta}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button href={`/${locale}/list-property`} variant="primary">
            {labels.listPropertyCta}
          </Button>
          <Button href={`/${locale}/property-request`} variant="outline">
            {labels.requestPropertyCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
