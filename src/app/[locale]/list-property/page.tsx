import { Hero } from "@/components/sections/Hero";
import { ListPropertyForm } from "@/components/ui/ListPropertyForm";
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
    path: "list-property",
    title: dict.listProperty.seoTitle,
    description: dict.listProperty.seoDescription,
  });
}

export default async function ListPropertyPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const f = dict.listProperty;

  return (
    <>
      <Hero locale={locale} dict={dict} title={f.title} subtitle={f.subtitle} description={f.intro} showCta={false} />
      <section className="py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <ListPropertyForm dict={dict} locale={locale} />
        </div>
      </section>
    </>
  );
}
