import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { TopicPageContent } from "@/lib/i18n/get-phase6-content";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading, Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/ui/LeadForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

type ServiceLink = { label: string; slug: string };

type TopicLandingPageProps = {
  locale: Locale;
  dict: Dictionary;
  topic: TopicPageContent;
  serviceLinks: ServiceLink[];
};

export function TopicLandingPage({ locale, dict, topic, serviceLinks }: TopicLandingPageProps) {
  const whatsappText = encodeURIComponent(topic.whatsappMessage);

  return (
    <>
      <Hero locale={locale} dict={dict} title={topic.title} subtitle={topic.subtitle} description={topic.intro} showCta={false} />
      <section className="border-b border-gray-100 bg-teal-50 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 sm:px-6">
          <WhatsAppButton label={dict.common.whatsappUs} message={whatsappText} />
          <Button href={`/${locale}/services/${topic.relatedServiceSlug}`} variant="primary">
            {dict.common.learnMore}
          </Button>
        </div>
      </section>
      <article className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={topic.labels.sectionsTitle} align="left" />
          {topic.sections.map((section) => (
            <section key={section.title} className="mb-12">
              <h2 className="text-xl font-bold text-navy-900 mb-4">{section.title}</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
      {topic.quickLinks.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title={topic.labels.quickLinksTitle} align="left" />
            <ul className="grid gap-3 sm:grid-cols-2">
              {topic.quickLinks.map((link) => (
                <li key={link.slug}>
                  <Link href={`/${locale}/${link.slug}`} className="text-teal-700 hover:text-teal-900 font-medium text-sm">
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={topic.labels.faqTitle} align="left" />
          <dl className="space-y-4">
            {topic.faq.map((item) => (
              <div key={item.q} className="rounded-xl border border-gray-200 bg-white p-6">
                <dt className="font-semibold text-navy-900">{item.q}</dt>
                <dd className="mt-2 text-sm text-gray-600">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={topic.labels.servicesTitle} align="left" />
          <ul className="grid gap-2 sm:grid-cols-2">
            {serviceLinks.map((link) => (
              <li key={link.slug}>
                <Link href={`/${locale}/${link.slug}`} className="text-sm font-medium text-teal-700 hover:text-teal-900">
                  → {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="py-20 bg-navy-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-3xl font-bold">{topic.labels.ctaTitle}</h2>
              <p className="mt-4 text-gray-300">{topic.labels.ctaDesc}</p>
              <div className="mt-8">
                <WhatsAppButton label={dict.common.whatsappUs} message={whatsappText} />
              </div>
            </div>
            <div className="rounded-2xl bg-white p-8 text-gray-900">
              <LeadForm dict={dict} locale={locale} source={topic.leadSource} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function buildTopicJsonLd(topic: TopicPageContent, locale: Locale, path: string) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://malaysiapropertynetwork.com"}/${locale}/${path}`;
  return [
    { "@context": "https://schema.org", "@type": "WebPage", name: topic.seoTitle, description: topic.seoDescription, url },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: topic.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];
}
