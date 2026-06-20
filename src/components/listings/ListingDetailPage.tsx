import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { EnrichedListing } from "@/lib/listings";
import { formatListingPrice } from "@/lib/listings";
import { getTagLabel } from "@/lib/project-marketplace";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { VerifiedBadge } from "@/components/listings/VerifiedBadge";
import { resolvePhotoGallery } from "@/lib/verified-listings";

import type { RentalIntelligence } from "@/lib/i18n/get-rental-intelligence";

type ListingDetailPageProps = {
  locale: Locale;
  dict: Dictionary;
  data: EnrichedListing;
  rentalIntel: RentalIntelligence;
};

export function ListingDetailPage({ locale, dict, data, rentalIntel }: ListingDetailPageProps) {
  const { listing, enrichment, verified } = data;
  const labels = dict.listingDetail;
  const verifiedLabels = dict.verifiedListing;

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
    verified?.verified_date
      ? { label: verifiedLabels.verifiedDate, value: verified.verified_date }
      : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const verifiedPhotos = verified ? resolvePhotoGallery(verified) : [];

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
          {verified && (
            <div className="mt-6 max-w-xl">
              <VerifiedBadge
                label={verifiedLabels.badge}
                onsiteLabel={verified.onsite_checked ? verifiedLabels.onsiteChecked : undefined}
                verifiedDate={`${verifiedLabels.verifiedDate}: ${verified.verified_date}`}
              />
            </div>
          )}
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

      {verifiedPhotos.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold text-navy-900">{verifiedLabels.realPhotos}</h2>
            <p className="mt-2 text-sm text-gray-600">{verifiedLabels.realPhotosNote}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {verifiedPhotos.map((src, i) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={src}
                    alt={`${listing.title} — ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
          <h2 className="text-xl font-semibold text-navy-900">{labels.rentalIntelligence}</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <dt className="text-xs uppercase text-gray-500">{labels.averageRent}</dt>
              <dd className="mt-1 text-lg font-semibold text-navy-900">{rentalIntel.averageRent}</dd>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <dt className="text-xs uppercase text-gray-500">{labels.rentalYield}</dt>
              <dd className="mt-1 text-lg font-semibold text-navy-900">{rentalIntel.rentalYield}</dd>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <dt className="text-xs uppercase text-gray-500">{labels.vacancyEstimate}</dt>
              <dd className="mt-1 text-lg font-semibold text-navy-900">{rentalIntel.vacancyEstimate}</dd>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <dt className="text-xs uppercase text-gray-500">{labels.targetTenantProfile}</dt>
              <dd className="mt-1 text-sm font-medium text-navy-900">{rentalIntel.targetTenantProfile}</dd>
            </div>
          </dl>
          <h3 className="mt-8 text-lg font-semibold text-navy-900">{labels.rentalAnalysis}</h3>
          <ul className="mt-4 max-w-3xl space-y-3">
            {rentalIntel.insights.map((item) => (
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
