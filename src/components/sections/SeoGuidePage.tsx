import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { SeoGuideContent } from "@/lib/i18n/get-seo-guide";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading, Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/ui/LeadForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

type ServiceLink = { label: string; slug: string };

type SeoGuidePageProps = {
  locale: Locale;
  dict: Dictionary;
  guide: SeoGuideContent;
  serviceLinks: ServiceLink[];
  leadSource: string;
};

function ProseSection({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-navy-900 mb-6">{title}</h2>
      <div className="space-y-4 text-gray-700 leading-relaxed">
        {paragraphs.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>
    </section>
  );
}

export function SeoGuidePage({ locale, dict, guide, serviceLinks, leadSource }: SeoGuidePageProps) {
  const whatsappText = encodeURIComponent(guide.whatsappMessage);
  const labels = guide.labels;

  return (
    <>
      <Hero
        locale={locale}
        dict={dict}
        title={guide.title}
        subtitle={guide.subtitle}
        description={guide.intro}
        showCta={false}
      />

      <section className="border-b border-gray-100 bg-teal-50 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 sm:px-6">
          <WhatsAppButton label={dict.common.whatsappUs} message={whatsappText} />
          <Button href={`/${locale}/property-inspection-service`} variant="primary">
            {labels.inspectionCta}
          </Button>
        </div>
      </section>

      <article className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ProseSection title={labels.overview} paragraphs={guide.overview} />
          <ProseSection title={labels.propertyManagement} paragraphs={guide.propertyManagement} />
          <ProseSection title={labels.rental} paragraphs={guide.rental} />
          <ProseSection title={labels.investment} paragraphs={guide.investment} />
        </div>
      </article>

      <section className="py-16 bg-teal-700">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-white">{labels.inspectionCtaTitle}</h2>
          <p className="mt-3 text-teal-100 leading-relaxed">{labels.inspectionCtaDesc}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={`/${locale}/property-inspection-service`} variant="secondary" size="lg">
              {labels.inspectionCta}
            </Button>
            <WhatsAppButton label={dict.common.whatsappUs} message={whatsappText} />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={labels.faqTitle} align="left" />
          <dl className="space-y-6">
            {guide.faq.map((item) => (
              <div key={item.q} className="rounded-xl border border-gray-200 bg-white p-6">
                <dt className="font-semibold text-navy-900">{item.q}</dt>
                <dd className="mt-2 text-sm text-gray-600 leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={guide.labels.servicesTitle} align="left" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {serviceLinks.map((link) => (
              <li key={link.slug}>
                <Link
                  href={`/${locale}/${link.slug}`}
                  className="flex items-center gap-2 text-teal-700 hover:text-teal-900 font-medium text-sm"
                >
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {guide.internalLinks.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title={guide.labels.relatedLinks} align="left" />
            <ul className="grid gap-3 sm:grid-cols-2">
              {guide.internalLinks.map((link) => (
                <li key={link.slug}>
                  <Link
                    href={`/${locale}/${link.slug}`}
                    className="flex items-center gap-2 text-teal-700 hover:text-teal-900 font-medium text-sm"
                  >
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
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
              <h2 className="text-3xl font-bold sm:text-4xl">{guide.labels.leadFormTitle}</h2>
              <p className="mt-4 text-gray-300 leading-relaxed">{guide.labels.leadFormDesc}</p>
              <div className="mt-8">
                <WhatsAppButton label={dict.common.whatsappUs} message={whatsappText} />
              </div>
            </div>
            <div className="rounded-2xl bg-white p-8 text-gray-900">
              <h3 className="text-xl font-semibold text-navy-900">{dict.contact.formTitle}</h3>
              <p className="mt-2 text-sm text-gray-600 mb-6">{dict.contact.formDescription}</p>
              <LeadForm dict={dict} locale={locale} source={leadSource} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function buildSeoGuideJsonLd(guide: SeoGuideContent, locale: Locale, slug: string) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://malaysiapropertynetwork.com"}/${locale}/${slug}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.seoTitle,
      description: guide.seoDescription,
      inLanguage: locale === "zh" ? "zh-CN" : "en-MY",
      url,
      author: {
        "@type": "Organization",
        name: "Malaysia Property Network",
      },
      publisher: {
        "@type": "Organization",
        name: "Malaysia Property Network",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ];
}
