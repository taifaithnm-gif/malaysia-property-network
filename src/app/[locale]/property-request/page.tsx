import { Hero } from "@/components/sections/Hero";
import { PropertyRequestForm } from "@/components/ui/PropertyRequestForm";
import type { Locale } from "@/lib/constants";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return buildMetadata({
    dict,
    locale,
    path: "property-request",
    title: dict.propertyRequest.seoTitle,
    description: dict.propertyRequest.seoDescription,
  });
}

export default async function PropertyRequestPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const f = dict.propertyRequest;

  return (
    <>
      <Hero locale={locale} dict={dict} title={f.title} subtitle={f.subtitle} description={f.intro} showCta={false} />
      <section className="py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <PropertyRequestForm dict={dict} locale={locale} />
        </div>
      </section>
    </>
  );
}
