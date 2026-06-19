import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { ServiceCatalogItem } from "@/lib/i18n/service-catalog";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading, Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/ui/LeadForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export type ServiceContent = ServiceCatalogItem;

type ServicePageProps = {
  locale: Locale;
  dict: Dictionary;
  service: ServiceCatalogItem;
  source: string;
};

export function ServicePage({ locale, dict, service, source }: ServicePageProps) {
  const labels = dict.serviceCatalog.common;
  const whatsappText = encodeURIComponent(service.whatsappMessage);

  return (
    <>
      <Hero
        locale={locale}
        dict={dict}
        title={service.title}
        subtitle={service.subtitle}
        description={service.intro}
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

      {(service.targetCustomers.length > 0 || service.scope.length > 0) && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              {service.targetCustomers.length > 0 && (
                <div>
                  <SectionHeading title={service.targetCustomersTitle} align="left" />
                  <ul className="space-y-3">
                    {service.targetCustomers.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                        <svg className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {service.scope.length > 0 && (
                <div>
                  <SectionHeading title={service.scopeTitle} align="left" />
                  <ul className="space-y-3">
                    {service.scope.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                        <svg className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={labels.processTitle} subtitle={labels.processSubtitle} />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((step, i) => (
              <div key={step.title}>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={labels.areasTitle} subtitle={labels.areasSubtitle} />
          <div className="grid gap-6 sm:grid-cols-2">
            {service.areas.map((area) => (
              <div key={area.name} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-navy-900">{area.name}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{area.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={labels.pricingTitle} subtitle={labels.pricingSubtitle} />
          <div className="grid gap-6 md:grid-cols-3">
            {service.pricing.map((tier) => (
              <div key={tier.name} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-navy-900">{tier.name}</h3>
                <p className="mt-2 text-2xl font-bold text-teal-700">{tier.price}</p>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{tier.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">{labels.pricingDisclaimer}</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={labels.faqTitle} />
          <dl className="space-y-6">
            {service.faq.map((item) => (
              <div key={item.q} className="rounded-xl border border-gray-200 bg-white p-6">
                <dt className="font-semibold text-navy-900">{item.q}</dt>
                <dd className="mt-2 text-sm text-gray-600 leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {service.relatedLinks.length > 0 && (
        <section className="py-12 border-t border-gray-100">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title={labels.relatedServices} align="left" />
            <ul className="grid gap-2 sm:grid-cols-2">
              {service.relatedLinks.map((link) => (
                <li key={link.slug}>
                  <Link
                    href={`/${locale}/${link.slug}`}
                    className="text-sm font-medium text-teal-700 hover:text-teal-900"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="py-20 bg-navy-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">{service.ctaTitle}</h2>
              <p className="mt-4 text-gray-300 leading-relaxed">{service.ctaDescription}</p>
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

export function buildServiceJsonLd(service: ServiceCatalogItem, locale: Locale, path: string) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://malaysiapropertynetwork.com"}/${locale}/${path}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.seoTitle,
      description: service.seoDescription,
      url,
      provider: { "@type": "Organization", name: "Malaysia Property Network" },
      areaServed: ["Forest City", "R&F Princess Cove", "Danga Bay", "Johor Bahru"],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];
}
