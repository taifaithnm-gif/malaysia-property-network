import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { EnrichedListing } from "@/lib/listings";
import { formatListingPrice } from "@/lib/listings";
import { getTagLabel } from "@/lib/project-marketplace";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

type ListingDetailPageProps = {
  locale: Locale;
  dict: Dictionary;
  data: EnrichedListing;
};

export function ListingDetailPage({ locale, dict, data }: ListingDetailPageProps) {
  const { listing, enrichment } = data;
  const labels = dict.listingDetail;

  const facts = [
    { label: labels.project, value: listing.project },
    listing.property_type ? { label: labels.propertyType, value: listing.property_type } : null,
    listing.bedrooms != null ? { label: labels.bedrooms, value: String(listing.bedrooms) } : null,
    listing.bathrooms != null ? { label: labels.bathrooms, value: String(listing.bathrooms) } : null,
    listing.size_sqft != null
      ? { label: labels.size, value: `${listing.size_sqft} sqft` }
      : null,
    { label: labels.listingType, value: listing.listing_type === "rent" ? labels.rent : labels.sale },
    { label: labels.demandScore, value: `${enrichment.rentalDemandScore}/5` },
    { label: labels.tag, value: getTagLabel(enrichment.tag, locale) },
    { label: labels.targetTenant, value: enrichment.targetTenantType },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <section className="bg-navy-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-teal-300">{listing.project}</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">{listing.title}</h1>
          <p className="mt-4 text-2xl font-semibold text-teal-300">
            {formatListingPrice(listing, locale)}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={`/${locale}/book-viewing?listing=${listing.id}`} variant="primary">
              {labels.bookViewing}
            </Button>
            <Button href={`/${locale}/${enrichment.profileSlug}`} variant="outline">
              {labels.viewProject}
            </Button>
            <WhatsAppButton label={dict.common.whatsappUs} />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
            {listing.image_url ? (
              <Image
                src={listing.image_url}
                alt={listing.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                {listing.project}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-navy-900">{labels.propertyFacts}</h2>
            <dl className="mt-4 divide-y divide-gray-100 rounded-xl border border-gray-200">
              {facts.map((fact) => (
                <div key={fact.label} className="flex justify-between gap-4 px-4 py-3 text-sm">
                  <dt className="text-gray-500">{fact.label}</dt>
                  <dd className="font-medium text-navy-900">{fact.value}</dd>
                </div>
              ))}
            </dl>
            {listing.description && (
              <p className="mt-6 text-gray-600">{listing.description}</p>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-navy-900">{labels.projectSummary}</h2>
          <p className="mt-4 max-w-3xl text-gray-600">{enrichment.projectSummary}</p>
          <Link
            href={`/${locale}/${enrichment.gallerySlug}`}
            className="mt-4 inline-block text-sm font-semibold text-teal-700 hover:underline"
          >
            → {labels.viewGallery}
          </Link>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-xl font-semibold text-navy-900">{labels.nearbyAmenities}</h2>
            <ul className="mt-4 space-y-2">
              {enrichment.amenities.map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-600">
                  <span className="text-teal-600">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-navy-900">{labels.targetTenantProfile}</h2>
            <ul className="mt-4 space-y-2">
              {enrichment.tenantProfile.map((item) => (
                <li key={item} className="text-gray-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-teal-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-navy-900">{labels.rentalAnalysis}</h2>
          <ul className="mt-4 max-w-3xl space-y-3">
            {enrichment.rentalAnalysis.map((item) => (
              <li key={item} className="rounded-lg bg-white p-4 text-gray-700 shadow-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
