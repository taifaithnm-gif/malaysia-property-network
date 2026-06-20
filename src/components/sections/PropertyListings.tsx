import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { PropertyListing } from "@/lib/supabase/types";
import { getPublishedListings } from "@/lib/listings";
import { SectionHeading, Button } from "@/components/ui/Button";
import { ListingGrid } from "@/components/listings/ListingCard";

type PropertyListingsProps = {
  locale: Locale;
  dict: Dictionary;
};

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
            viewDetailsLabel={labels.viewDetailsCta}
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
            viewDetailsLabel={labels.viewDetailsCta}
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
            viewDetailsLabel={labels.viewDetailsCta}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button href={`/${locale}/listings`} variant="primary">
            {dict.marketplace.browseAll}
          </Button>
          <Button href={`/${locale}/list-property`} variant="outline">
            {labels.listPropertyCta}
          </Button>
        </div>
      </div>
    </section>
  );
}

