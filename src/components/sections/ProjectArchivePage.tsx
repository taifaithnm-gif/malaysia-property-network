import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { ProjectArchiveContent } from "@/lib/i18n/get-phase6-content";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading, Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/ui/LeadForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

type ServiceLink = { label: string; slug: string };

type ProjectArchivePageProps = {
  locale: Locale;
  dict: Dictionary;
  archive: ProjectArchiveContent;
  serviceLinks: ServiceLink[];
};

export function ProjectArchivePage({ locale, dict, archive, serviceLinks }: ProjectArchivePageProps) {
  const whatsappText = encodeURIComponent(archive.whatsappMessage);

  return (
    <>
      <Hero locale={locale} dict={dict} title={archive.title} subtitle={archive.subtitle} description={archive.intro} showCta={false} />
      <section className="border-b border-gray-100 bg-teal-50 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 sm:px-6">
          <WhatsAppButton label={dict.common.whatsappUs} message={whatsappText} />
          <Button href={`/${locale}/list-property`} variant="primary">
            {dict.common.submitInquiry}
          </Button>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={archive.labels.resourcesTitle} subtitle={archive.labels.hubTitle} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {archive.resources.map((res) => (
              <Link
                key={res.slug}
                href={`/${locale}/${res.slug}`}
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:border-teal-300 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-navy-900 group-hover:text-teal-700">{res.label}</h3>
                <p className="mt-2 text-sm text-gray-600">{res.desc}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-teal-700">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <article className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={archive.labels.sectionsTitle} align="left" />
          {archive.sections.map((section) => (
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
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={archive.labels.servicesTitle} align="left" />
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
              <h2 className="text-3xl font-bold">{archive.labels.ctaTitle}</h2>
              <p className="mt-4 text-gray-300">{archive.labels.ctaDesc}</p>
            </div>
            <div className="rounded-2xl bg-white p-8 text-gray-900">
              <LeadForm dict={dict} locale={locale} source={archive.leadSource} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function buildArchiveJsonLd(archive: ProjectArchiveContent, locale: Locale, path: string) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://malaysiapropertynetwork.com"}/${locale}/${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: archive.seoTitle,
    description: archive.seoDescription,
    url,
  };
}
