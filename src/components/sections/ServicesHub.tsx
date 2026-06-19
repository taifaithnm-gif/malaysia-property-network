import Link from "next/link";
import type { Locale } from "@/lib/constants";
import {
  getServiceCatalog,
  PRIORITY_SERVICE_KEYS,
  SERVICE_CATALOG_KEYS,
  SERVICE_SLUG_MAP,
  type ServiceCatalogKey,
} from "@/lib/i18n/service-catalog";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/ui/Button";

type ServicesHubProps = {
  locale: Locale;
  dict: Dictionary;
};

export async function ServicesHub({ locale, dict }: ServicesHubProps) {
  const catalog = await getServiceCatalog(locale);

  return (
    <>
      <Hero
        locale={locale}
        dict={dict}
        title={catalog.hub.title}
        subtitle={catalog.hub.subtitle}
        description={catalog.hub.intro}
        showCta={false}
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={dict.serviceCatalog.hub.allServicesTitle}
            subtitle={dict.serviceCatalog.hub.allServicesSubtitle}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_CATALOG_KEYS.map((key) => {
              const item = catalog.items[key];
              const slug = SERVICE_SLUG_MAP[key];
              return (
                <Link
                  key={key}
                  href={`/${locale}/services/${slug}`}
                  className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-navy-900 group-hover:text-teal-700">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">{item.intro}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-teal-700">
                    {dict.common.learnMore} →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

type PriorityServicesProps = {
  locale: Locale;
  dict: Dictionary;
};

export async function PriorityServices({ locale, dict }: PriorityServicesProps) {
  const catalog = await getServiceCatalog(locale);

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={dict.serviceCatalog.hub.priorityTitle}
          subtitle={dict.serviceCatalog.hub.prioritySubtitle}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRIORITY_SERVICE_KEYS.map((key) => {
            const item = catalog.items[key];
            const slug = SERVICE_SLUG_MAP[key];
            return (
              <Link
                key={key}
                href={`/${locale}/services/${slug}`}
                className="group rounded-xl bg-white p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-navy-900 group-hover:text-teal-700">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{item.subtitle}</p>
              </Link>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 font-semibold text-teal-700 hover:text-teal-900"
          >
            {dict.serviceCatalog.hub.viewAllServices} →
          </Link>
        </div>
      </div>
    </section>
  );
}
