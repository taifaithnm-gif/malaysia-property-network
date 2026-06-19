import { Hero } from "@/components/sections/Hero";
import { ViewingAppointmentForm } from "@/components/ui/ViewingAppointmentForm";
import type { Locale } from "@/lib/constants";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getPublishedListings } from "@/lib/listings";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ listing?: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return buildMetadata({
    dict,
    locale,
    path: "book-viewing",
    title: dict.bookViewing.seoTitle,
    description: dict.bookViewing.seoDescription,
  });
}

export default async function BookViewingPage({ params, searchParams }: PageProps) {
  const { locale: localeParam } = await params;
  const { listing: listingId } = await searchParams;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const b = dict.bookViewing;

  const published = await getPublishedListings(locale, { limit: 50 });
  const listings = published.map((l) => ({ id: l.id, title: l.title, project: l.project }));

  return (
    <>
      <Hero locale={locale} dict={dict} title={b.title} subtitle={b.subtitle} description={b.intro} showCta={false} />
      <section className="py-16">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <ViewingAppointmentForm
            locale={locale}
            dict={dict}
            listings={listings}
            preselectedListingId={listingId}
          />
        </div>
      </section>
    </>
  );
}
