import type { Locale } from "@/lib/constants";
import { VerifiedCollectionPage } from "@/components/listings/VerifiedCollectionPage";
import { getVerifiedCollection } from "@/lib/verified-listings";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const collection = await getVerifiedCollection(locale as Locale);
  const dict = await getDictionary(locale as Locale);
  return buildMetadata({
    dict,
    locale,
    path: "listings/verified",
    title: collection.title,
    description: collection.intro,
  });
}

export default async function VerifiedListingsRoute({ params, searchParams }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const filters = await searchParams;

  return <VerifiedCollectionPage locale={locale} dict={dict} searchParams={filters} />;
}
