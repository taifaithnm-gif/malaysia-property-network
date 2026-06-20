import { notFound } from "next/navigation";
import type { Locale } from "@/lib/constants";
import { ListingDetailPage } from "@/components/listings/ListingDetailPage";
import { getPublishedListingById } from "@/lib/listings";
import { getListingEnrichment } from "@/lib/i18n/get-listing-enrichment";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale, id } = await params;
  const listing = await getPublishedListingById(locale as Locale, id);
  if (!listing) return {};
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
  const listing = await getPublishedListingById(locale, id);
  if (!listing) notFound();

  const enrichment = await getListingEnrichment(locale, listing.project);
  const dict = await getDictionary(locale);

  return (
    <ListingDetailPage
      locale={locale}
      dict={dict}
      data={{ listing, enrichment }}
    />
  );
}
