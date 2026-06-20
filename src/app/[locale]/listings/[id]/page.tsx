import { notFound } from "next/navigation";
import type { Locale } from "@/lib/constants";
import { ListingDetailPage } from "@/components/listings/ListingDetailPage";
import { getPublishedListingById } from "@/lib/listings";
import { getListingEnrichment, projectNameToKey } from "@/lib/i18n/get-listing-enrichment";
import { getRentalIntelligence } from "@/lib/i18n/get-rental-intelligence";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import {
  applyVerifiedToListing,
  getVerifiedCollection,
  getVerifiedMetaByKey,
  getVerifiedMetaForListing,
  verifiedItemToPropertyListing,
} from "@/lib/verified-listings";

type PageProps = { params: Promise<{ locale: string; id: string }> };

async function resolveListing(locale: Locale, id: string) {
  const supabaseListing = await getPublishedListingById(locale, id);
  if (supabaseListing) {
    const meta = getVerifiedMetaForListing(supabaseListing);
    return {
      listing: applyVerifiedToListing(supabaseListing, meta),
      verified: meta,
    };
  }

  const meta = getVerifiedMetaByKey(id);
  if (!meta) return null;

  const collection = await getVerifiedCollection(locale);
  const item = collection.listings.find((l) => l.listing_key === id);
  if (!item) return null;

  return {
    listing: verifiedItemToPropertyListing(item, locale),
    verified: meta,
  };
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, id } = await params;
  const resolved = await resolveListing(locale as Locale, id);
  if (!resolved) return {};
  const { listing } = resolved;
  const dict = await getDictionary(locale as Locale);
  return buildMetadata({
    dict,
    locale,
    path: `listings/${id}`,
    title: `${listing.title} | ${listing.project}`,
    description: listing.description ?? `${listing.title} — ${listing.project}`,
  });
}

export default async function ListingDetailRoute({ params }: PageProps) {
  const { locale: localeParam, id } = await params;
  const locale = localeParam as Locale;
  const resolved = await resolveListing(locale, id);
  if (!resolved) notFound();

  const { listing, verified } = resolved;
  const enrichment = await getListingEnrichment(locale, listing.project);
  const projectKey = projectNameToKey(listing.project) ?? "forest-city";
  const rentalIntel = await getRentalIntelligence(locale, projectKey);
  const dict = await getDictionary(locale);

  return (
    <ListingDetailPage
      locale={locale}
      dict={dict}
      data={{ listing, enrichment, verified }}
      rentalIntel={rentalIntel}
    />
  );
}
