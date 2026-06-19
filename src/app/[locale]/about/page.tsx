import { Hero } from "@/components/sections/Hero";
import { PageCTA } from "@/components/sections/CTA";
import { SectionHeading } from "@/components/ui/Button";
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
    path: "about",
    title: dict.about.title,
    description: dict.about.mission,
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const about = dict.about;

  const values = [
    { title: about.value1Title, desc: about.value1Desc },
    { title: about.value2Title, desc: about.value2Desc },
    { title: about.value3Title, desc: about.value3Desc },
  ];

  return (
    <>
      <Hero
        locale={locale}
        dict={dict}
        title={about.title}
        subtitle={about.subtitle}
        description={about.mission}
        showCta={false}
      />
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={about.storyTitle} align="left" />
          <p className="text-lg text-gray-600 leading-relaxed">{about.story}</p>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={about.valuesTitle} />
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl bg-white p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-semibold text-navy-900">{value.title}</h3>
                <p className="mt-3 text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PageCTA locale={locale} dict={dict} />
    </>
  );
}
