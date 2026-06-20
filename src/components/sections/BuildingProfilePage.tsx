import type { Locale } from "@/lib/constants";
import type { BuildingProfile } from "@/lib/i18n/get-building-profile";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import {
  getVerifiedByBuilding,
  verifiedItemToPropertyListing,
  type VerifiedCollectionItem,
} from "@/lib/verified-listings";
import { getVerifiedCollection } from "@/lib/verified-listings";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading, Button } from "@/components/ui/Button";
import { ListingGrid } from "@/components/listings/ListingCard";

type BuildingProfilePageProps = {
  locale: Locale;
  dict: Dictionary;
  profile: BuildingProfile;
};

export async function BuildingProfilePage({ locale, dict, profile }: BuildingProfilePageProps) {
  const verifiedMeta = getVerifiedByBuilding(profile.key);
  const collection = await getVerifiedCollection(locale);
  const byKey = Object.fromEntries(collection.listings.map((l) => [l.listing_key, l]));
  const verifiedListings = verifiedMeta
    .map((m) => byKey[m.listing_key])
    .filter(Boolean)
    .map((item) => verifiedItemToPropertyListing(item as VerifiedCollectionItem, locale));

  const labels = profile.labels;
  const browse = dict.listingBrowse;

  return (
    <>
      <Hero
        locale={locale}
        dict={dict}
        title={profile.name}
        subtitle={profile.parentName}
        description={profile.intro}
        showCta={false}
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={profile.name} subtitle={profile.intro} align="left" />
          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <dt className="text-sm text-gray-500">{labels.rentalRange}</dt>
              <dd className="mt-1 font-semibold text-navy-900">{profile.rentalRange}</dd>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <dt className="text-sm text-gray-500">{labels.yield}</dt>
              <dd className="mt-1 font-semibold text-navy-900">{profile.yieldEstimate}</dd>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <dt className="text-sm text-gray-500">{labels.targetTenant}</dt>
              <dd className="mt-1 font-semibold text-navy-900">{profile.targetTenant}</dd>
            </div>
          </dl>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-navy-900">{labels.unitMix}</h3>
              <ul className="mt-3 list-inside list-disc text-gray-700">
                {profile.unitMix.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-navy-900">{labels.highlights}</h3>
              <ul className="mt-3 list-inside list-disc text-gray-700">
                {profile.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={`/${locale}/${profile.parentProject}`} variant="outline">
              {labels.parentProject}: {profile.parentName}
            </Button>
            <Button href={`/${locale}/listings/verified?building=${profile.key}`} variant="primary">
              {labels.viewVerified} ({profile.verifiedCount})
            </Button>
          </div>
        </div>
      </section>

      {verifiedListings.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={labels.verifiedListings}
              subtitle={dict.verifiedListing.buildingSubtitle}
              align="left"
            />
            <ListingGrid
              listings={verifiedListings}
              locale={locale}
              emptyLabel={browse.empty}
              emptyDesc={browse.emptyDesc}
              bookViewingLabel={dict.listings.bookViewingCta}
              viewDetailsLabel={browse.viewDetails}
              verifiedByListingId={Object.fromEntries(
                verifiedMeta.map((m) => [m.listing_key, true]),
              )}
            />
          </div>
        </section>
      )}
    </>
  );
}
