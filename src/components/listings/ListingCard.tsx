import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { PropertyListing } from "@/lib/supabase/types";
import { formatListingPrice } from "@/lib/listings";
import { Button } from "@/components/ui/Button";

type ListingCardProps = {
  listing: PropertyListing;
  locale: Locale;
  bookViewingLabel: string;
  viewDetailsLabel: string;
  tagLabel?: string;
};

export function ListingCard({
  listing,
  locale,
  bookViewingLabel,
  viewDetailsLabel,
  tagLabel,
}: ListingCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <Link href={`/${locale}/listings/${listing.id}`} className="block">
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
          {tagLabel && (
            <span className="absolute right-3 top-3 rounded-full bg-navy-900/80 px-3 py-1 text-xs font-medium text-white">
              {tagLabel}
            </span>
          )}
        </div>
      </Link>
      <div className="p-5">
        <Link href={`/${locale}/listings/${listing.id}`}>
          <h3 className="font-semibold text-navy-900 hover:text-teal-700">{listing.title}</h3>
        </Link>
        <p className="mt-1 text-sm text-gray-500">{listing.project}</p>
        <p className="mt-2 text-lg font-bold text-teal-700">
          {formatListingPrice(listing, locale)}
        </p>
        {listing.property_type && (
          <p className="mt-1 text-sm text-gray-600">{listing.property_type}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button href={`/${locale}/listings/${listing.id}`} variant="primary" className="text-sm">
            {viewDetailsLabel}
          </Button>
          <Button
            href={`/${locale}/book-viewing?listing=${listing.id}`}
            variant="outline"
            className="text-sm"
          >
            {bookViewingLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}

type ListingGridProps = {
  listings: PropertyListing[];
  locale: Locale;
  emptyLabel: string;
  emptyDesc: string;
  bookViewingLabel: string;
  viewDetailsLabel: string;
  tagByListingId?: Record<string, string>;
};

export function ListingGrid({
  listings,
  locale,
  emptyLabel,
  emptyDesc,
  bookViewingLabel,
  viewDetailsLabel,
  tagByListingId,
}: ListingGridProps) {
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
        <ListingCard
          key={listing.id}
          listing={listing}
          locale={locale}
          bookViewingLabel={bookViewingLabel}
          viewDetailsLabel={viewDetailsLabel}
          tagLabel={tagByListingId?.[listing.id]}
        />
      ))}
    </div>
  );
}
