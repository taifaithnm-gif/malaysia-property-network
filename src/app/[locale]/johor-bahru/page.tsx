import { Hero } from "@/components/sections/Hero";
import { LocationPageContent } from "@/components/sections/LocationPage";
import type { Locale } from "@/lib/constants";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const loc = dict.locations.johorBahru;
  return buildMetadata({
    dict,
    locale,
    path: "johor-bahru",
    title: loc.title,
    description: loc.intro,
  });
}

export default async function JohorBahruPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const loc = dict.locations.johorBahru;

  return (
    <>
      <Hero locale={locale} dict={dict} title={loc.title} subtitle={loc.subtitle} description={loc.intro} showCta />
      <LocationPageContent locale={locale} dict={dict} locationKey="johorBahru" />
    </>
  );
}
