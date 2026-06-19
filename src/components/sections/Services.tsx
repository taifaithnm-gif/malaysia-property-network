import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { SectionHeading, Button } from "@/components/ui/Button";

type ServicesProps = {
  locale: Locale;
  dict: Dictionary;
};

const serviceIcons = [
  (
    <svg key="1" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  (
    <svg key="2" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  (
    <svg key="3" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  (
    <svg key="4" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
];

export function Services({ locale, dict }: ServicesProps) {
  const services = [
    { title: dict.home.service1Title, desc: dict.home.service1Desc },
    { title: dict.home.service2Title, desc: dict.home.service2Desc },
    { title: dict.home.service3Title, desc: dict.home.service3Desc },
    { title: dict.home.service4Title, desc: dict.home.service4Desc },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={dict.home.servicesTitle} subtitle={dict.home.servicesSubtitle} />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                {serviceIcons[i]}
              </div>
              <h3 className="text-lg font-semibold text-navy-900">{service.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href={`/${locale}/property-management`} variant="outline">
            {dict.common.learnMore}
          </Button>
        </div>
      </div>
    </section>
  );
}
