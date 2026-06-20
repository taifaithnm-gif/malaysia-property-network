import { Suspense } from "react";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { getEnrichedListings, getListingProjects } from "@/lib/listings";
import { getTagLabel } from "@/lib/project-marketplace";
import { ListingFilters } from "@/components/listings/ListingFilters";
import { ListingGrid } from "@/components/listings/ListingCard";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/ui/Button";

type ListingBrowsePageProps = {
  locale: Locale;
  dict: Dictionary;
  searchParams: Record<string, string | string[] | undefined>;
};

function param(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export async function ListingBrowsePage({ locale, dict, searchParams }: ListingBrowsePageProps) {
  const labels = dict.listingBrowse;
  const min = param(searchParams.min);
  const max = param(searchParams.max);
  const type = param(searchParams.type) as "rent" | "sale" | undefined;

  const enriched = await getEnrichedListings(locale, {
    project: param(searchParams.project),
    listingType: type,
    minPrice: min ? Number(min) : undefined,
    maxPrice: max ? Number(max) : undefined,
    tag: param(searchParams.tag),
    tenantType: param(searchParams.tenant),
    limit: 60,
  });

  const listings = enriched.map((e) => e.listing);
  const tagById = Object.fromEntries(
    enriched.map((e) => [e.listing.id, getTagLabel(e.enrichment.tag, locale)]),
  );

  return (
    <>
      <Hero
        locale={locale}
        dict={dict}
        title={labels.title}
        subtitle={labels.subtitle}
        showCta={false}
      />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={labels.resultsTitle} subtitle={labels.resultsSubtitle} align="left" />
          <Suspense fallback={null}>
            <ListingFilters locale={locale} dict={dict} projects={getListingProjects()} />
          </Suspense>
          <p className="mb-6 text-sm text-gray-500">
            {listings.length} {labels.resultCount}
          </p>
          <ListingGrid
            listings={listings}
            locale={locale}
            emptyLabel={labels.empty}
            emptyDesc={labels.emptyDesc}
            bookViewingLabel={dict.listings.bookViewingCta}
            viewDetailsLabel={labels.viewDetails}
            tagByListingId={tagById}
          />
        </div>
      </section>
    </>
  );
}
