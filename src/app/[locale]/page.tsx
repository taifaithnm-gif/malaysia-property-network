import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { PriorityServices } from "@/components/sections/ServicesHub";
import { PropertyMarketplace } from "@/components/sections/PropertyMarketplace";
import { MarketplaceTrustLayer } from "@/components/sections/MarketplaceTrustLayer";
import { getMarketplaceStats } from "@/lib/marketplace-stats";
import { Locations } from "@/components/sections/Locations";
import { CTA } from "@/components/sections/CTA";
import type { Locale } from "@/lib/constants";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const stats = await getMarketplaceStats();

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <PriorityServices locale={locale} dict={dict} />
      <PropertyMarketplace locale={locale} dict={dict} />
      <MarketplaceTrustLayer locale={locale} dict={dict} stats={stats} />
      <Services locale={locale} dict={dict} />
      <Locations locale={locale} dict={dict} />
      <CTA locale={locale} dict={dict} showForm />
    </>
  );
}
