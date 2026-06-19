import { Hero } from "@/components/sections/Hero";
import { PageCTA } from "@/components/sections/CTA";
import { SectionHeading } from "@/components/ui/Button";
import type { Locale } from "@/lib/constants";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return buildMetadata({
    dict,
    locale,
    path: "property-management",
    title: dict.propertyManagement.title,
    description: dict.propertyManagement.intro,
  });
}

export default async function PropertyManagementPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const pm = dict.propertyManagement;

  const steps = [
    { title: pm.step1Title, desc: pm.step1Desc },
    { title: pm.step2Title, desc: pm.step2Desc },
    { title: pm.step3Title, desc: pm.step3Desc },
    { title: pm.step4Title, desc: pm.step4Desc },
  ];

  const features = [
    pm.feature1, pm.feature2, pm.feature3, pm.feature4,
    pm.feature5, pm.feature6, pm.feature7, pm.feature8,
  ];

  return (
    <>
      <Hero
        locale={locale}
        dict={dict}
        title={pm.title}
        subtitle={pm.subtitle}
        description={pm.intro}
        showCta
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={pm.processTitle} />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.title} className="relative">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={pm.featuresTitle} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 rounded-lg bg-white p-4 border border-gray-100">
                <svg className="h-5 w-5 shrink-0 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PageCTA locale={locale} dict={dict} />
    </>
  );
}
