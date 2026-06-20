import type { Locale } from "@/lib/constants";
import { ListingBrowsePage } from "@/components/listings/ListingBrowsePage";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return buildMetadata({
    dict,
    locale,
    path: "listings",
    title: dict.listingBrowse.seoTitle,
    description: dict.listingBrowse.seoDescription,
  });
}

export default async function ListingsPage({ params, searchParams }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const filters = await searchParams;

  return <ListingBrowsePage locale={locale} dict={dict} searchParams={filters} />;
}
