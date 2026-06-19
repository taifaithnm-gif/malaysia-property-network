import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading, Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/ui/LeadForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export type OwnerLandingContent = {
  title: string;
  subtitle: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  whatsappMessage: string;
  painTitle: string;
  painPoints: string[];
  servicesTitle: string;
  servicesSubtitle: string;
  services: {
    title: string;
    desc: string;
    slug: string;
  }[];
  trustTitle: string;
  trustItems: string[];
  ctaTitle: string;
  ctaDescription: string;
};

type OwnerAcquisitionLandingProps = {
  locale: Locale;
  dict: Dictionary;
  landing: OwnerLandingContent;
  source: string;
};

export function OwnerAcquisitionLanding({
  locale,
  dict,
  landing,
  source,
}: OwnerAcquisitionLandingProps) {
  const labels = dict.ownerLanding.common;
  const whatsappText = encodeURIComponent(landing.whatsappMessage);

  return (
    <>
      <Hero
        locale={locale}
        dict={dict}
        title={landing.title}
        subtitle={landing.subtitle}
        description={landing.intro}
        showCta={false}
      />

      <section className="border-b border-gray-100 bg-teal-50 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 sm:px-6">
          <WhatsAppButton label={dict.common.whatsappUs} message={whatsappText} />
          <Button href={`/${locale}/contact`} variant="outline">
            {dict.common.contactUs}
          </Button>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={landing.painTitle} align="left" />
          <ul className="space-y-4">
            {landing.painPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={landing.servicesTitle} subtitle={landing.servicesSubtitle} />
          <div className="grid gap-6 sm:grid-cols-2">
            {landing.services.map((service) => (
              <Link
                key={service.slug}
                href={`/${locale}/${service.slug}`}
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-navy-900 group-hover:text-teal-700">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{service.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-700">
                  {labels.learnMore}
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={landing.trustTitle} align="left" />
          <div className="grid gap-4 sm:grid-cols-2">
            {landing.trustItems.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">{landing.ctaTitle}</h2>
              <p className="mt-4 text-gray-300 leading-relaxed">{landing.ctaDescription}</p>
              <div className="mt-8">
                <WhatsAppButton label={dict.common.whatsappUs} message={whatsappText} />
              </div>
            </div>
            <div className="rounded-2xl bg-white p-8 text-gray-900">
              <h3 className="text-xl font-semibold text-navy-900">{dict.contact.formTitle}</h3>
              <p className="mt-2 text-sm text-gray-600 mb-6">{dict.contact.formDescription}</p>
              <LeadForm dict={dict} locale={locale} source={source} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
