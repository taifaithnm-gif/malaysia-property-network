import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { ProjectProfile } from "@/lib/i18n/get-project-profile";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading, Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { scoreColor } from "@/lib/i18n/get-project-intelligence";

type ServiceLink = { label: string; slug: string };

type ProjectProfilePageProps = {
  locale: Locale;
  dict: Dictionary;
  profile: ProjectProfile;
  serviceLinks: ServiceLink[];
};

export function ProjectProfilePage({
  locale,
  dict,
  profile,
  serviceLinks,
}: ProjectProfilePageProps) {
  const whatsappText = encodeURIComponent(profile.whatsappMessage);
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${profile.map.lng - 0.02}%2C${profile.map.lat - 0.015}%2C${profile.map.lng + 0.02}%2C${profile.map.lat + 0.015}&layer=mapnik&marker=${profile.map.lat}%2C${profile.map.lng}`;

  return (
    <>
      <Hero
        locale={locale}
        dict={dict}
        title={profile.title}
        subtitle={profile.subtitle}
        description={profile.intro}
        showCta={false}
      />

      <section className="border-b border-gray-100 bg-teal-50 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 sm:px-6">
          <WhatsAppButton label={dict.common.whatsappUs} message={whatsappText} />
          <Button href={`/${locale}/list-property`} variant="primary">
            {profile.labels.listProperty}
          </Button>
          <Button href={`/${locale}/property-request`} variant="outline">
            {profile.labels.propertyRequest}
          </Button>
          {profile.gallerySlug && (
            <Button href={`/${locale}/${profile.gallerySlug}`} variant="outline">
              {profile.labels.gallery}
            </Button>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={profile.labels.gallery} align="left" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profile.gallery.map((image, i) => (
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

      {profile.rentalData && profile.labels.rentalData && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title={profile.labels.rentalData} align="left" />
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <dt className="text-sm text-gray-500">Average rent</dt>
                <dd className="mt-1 text-lg font-semibold text-navy-900">{profile.rentalData.averageRent}</dd>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <dt className="text-sm text-gray-500">Rental range</dt>
                <dd className="mt-1 text-lg font-semibold text-navy-900">{profile.rentalData.rentalRange}</dd>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <dt className="text-sm text-gray-500">Yield</dt>
                <dd className="mt-1 text-lg font-semibold text-navy-900">{profile.rentalData.yield}</dd>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <dt className="text-sm text-gray-500">Vacancy</dt>
                <dd className="mt-1 text-lg font-semibold text-navy-900">{profile.rentalData.vacancy}</dd>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <dt className="text-sm text-gray-500">{profile.labels.demandScore}</dt>
                <dd className="mt-1 text-lg font-semibold text-navy-900">{profile.rentalData.demandScore}/5</dd>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <dt className="text-sm text-gray-500">Target tenant</dt>
                <dd className="mt-1 text-lg font-semibold text-navy-900">{profile.rentalData.targetTenant}</dd>
              </div>
            </dl>
          </div>
        </section>
      )}

      {profile.investmentScore != null && profile.labels.investmentScore && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div>
                <h2 className="text-2xl font-bold text-navy-900">{profile.labels.investmentScore}</h2>
                <p className="mt-2 text-sm text-gray-600">Research score (0–100) — not financial advice</p>
              </div>
              <span
                className={`inline-flex rounded-full border px-6 py-3 text-2xl font-bold ${scoreColor(profile.investmentScore)}`}
              >
                {profile.investmentScore}/100
              </span>
              {profile.intelligenceSlug && profile.labels.viewIntelligence && (
                <Link
                  href={`/${locale}/${profile.intelligenceSlug}`}
                  className="text-sm font-semibold text-teal-700 hover:underline"
                >
                  {profile.labels.viewIntelligence} →
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading title={profile.labels.facts} align="left" />
              <dl className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
                {profile.facts.map((fact) => (
                  <div key={fact.label} className="grid grid-cols-2 gap-4 px-6 py-4">
                    <dt className="text-sm font-medium text-gray-500">{fact.label}</dt>
                    <dd className="text-sm text-navy-900">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6">
                <Link
                  href={`/${locale}/guide/${profile.guideSlug}`}
                  className="text-sm font-semibold text-teal-700 hover:text-teal-900"
                >
                  {profile.labels.readGuide} →
                </Link>
              </div>
            </div>
            <div>
              <SectionHeading title={profile.labels.map} align="left" />
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <iframe
                  title={profile.map.label}
                  src={mapSrc}
                  className="h-80 w-full"
                  loading="lazy"
                />
                <p className="border-t border-gray-100 px-4 py-3 text-sm text-gray-600">
                  {profile.map.label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={profile.labels.propertyTypes} align="left" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {profile.propertyTypes.map((type) => (
              <div
                key={type.name}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-semibold text-navy-900">{type.name}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={profile.labels.facilities} align="left" />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {profile.facilities.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700"
              >
                <svg className="h-5 w-5 shrink-0 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {profile.faqs && profile.faqs.length > 0 && profile.labels.faqs && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title={profile.labels.faqs} align="left" />
            <dl className="space-y-6">
              {profile.faqs.map((faq) => (
                <div key={faq.q} className="rounded-xl border border-gray-200 bg-white p-6">
                  <dt className="font-semibold text-navy-900">{faq.q}</dt>
                  <dd className="mt-2 text-sm text-gray-600 leading-relaxed">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={profile.labels.relatedServices} align="left" />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {serviceLinks.map((link) => (
              <li key={link.slug}>
                <Link
                  href={`/${locale}/${link.slug}`}
                  className="block rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-teal-700 hover:border-teal-300 hover:bg-teal-50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export function buildProjectProfileJsonLd(profile: ProjectProfile, locale: Locale, slug: string) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://malaysiapropertynetwork.com"}/${locale}/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: profile.seoTitle,
    description: profile.seoDescription,
    url,
    geo: {
      "@type": "GeoCoordinates",
      latitude: profile.map.lat,
      longitude: profile.map.lng,
    },
  };
}
