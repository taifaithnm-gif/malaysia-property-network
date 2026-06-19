import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { ContentHubPageContent } from "@/lib/i18n/get-content-hub";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading, Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/ui/LeadForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

type ServiceLink = { label: string; slug: string };

type ContentHubPageProps = {
  locale: Locale;
  dict: Dictionary;
  hub: ContentHubPageContent;
  serviceLinks: ServiceLink[];
};

export function ContentHubPage({ locale, dict, hub, serviceLinks }: ContentHubPageProps) {
  const whatsappText = encodeURIComponent(hub.whatsappMessage);

  return (
    <>
      <Hero
        locale={locale}
        dict={dict}
        title={hub.title}
        subtitle={hub.subtitle}
        description={hub.intro}
        showCta={false}
      />
      <section className="border-b border-gray-100 bg-teal-50 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 sm:px-6">
          <WhatsAppButton label={dict.common.whatsappUs} message={whatsappText} />
          <Button href={`/${locale}/services/${hub.relatedServiceSlug}`} variant="primary">
            {dict.common.learnMore}
          </Button>
        </div>
      </section>
      {hub.gallery.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title={hub.labels.galleryTitle} align="left" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {hub.gallery.map((image, i) => (
                <div
                  key={image.src}
                  className={`relative overflow-hidden rounded-xl bg-gray-100 ${i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 aspect-[16/10]" : "aspect-[4/3]"}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {hub.facts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title={hub.labels.factsTitle} align="left" />
            <dl className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
              {hub.facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-2 gap-4 px-6 py-4">
                  <dt className="text-sm font-medium text-gray-500">{fact.label}</dt>
                  <dd className="text-sm font-semibold text-navy-900">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}
      <article className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={hub.labels.sectionsTitle} align="left" />
          {hub.sections.map((section) => (
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
      {hub.quickLinks.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title={hub.labels.quickLinksTitle} align="left" />
            <ul className="grid gap-3 sm:grid-cols-2">
              {hub.quickLinks.map((link) => (
                <li key={link.slug}>
                  <Link
                    href={`/${locale}/${link.slug}`}
                    className="text-teal-700 hover:text-teal-900 font-medium text-sm"
                  >
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
          <SectionHeading title={hub.labels.faqTitle} align="left" />
          <dl className="space-y-4">
            {hub.faq.map((item) => (
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
          <SectionHeading title={hub.labels.servicesTitle} align="left" />
          <ul className="grid gap-2 sm:grid-cols-2">
            {serviceLinks.map((link) => (
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
      <section className="py-20 bg-navy-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-3xl font-bold">{hub.labels.ctaTitle}</h2>
              <p className="mt-4 text-gray-300">{hub.labels.ctaDesc}</p>
              <div className="mt-8">
                <WhatsAppButton label={dict.common.whatsappUs} message={whatsappText} />
              </div>
            </div>
            <div className="rounded-2xl bg-white p-8 text-gray-900">
              <LeadForm dict={dict} locale={locale} source={hub.leadSource} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function buildContentHubJsonLd(
  hub: ContentHubPageContent,
  locale: Locale,
  path: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://malaysiapropertynetwork.com"}/${locale}/${path}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: hub.seoTitle,
      description: hub.seoDescription,
      url,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: hub.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];
}
