import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { SectionHeading } from "@/components/ui/Button";

type HomeConversionLayerProps = {
  locale: Locale;
  dict: Dictionary;
};

export function HomeConversionLayer({ locale, dict }: HomeConversionLayerProps) {
  const layer = dict.home.conversionLayer;

  return (
    <section className="border-b border-gray-100 bg-teal-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={layer.title} subtitle={layer.subtitle} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {layer.actions.map((action) => (
            <Link
              key={action.slug}
              href={`/${locale}/${action.href}`}
              className="group flex flex-col rounded-xl border border-teal-100 bg-white p-5 shadow-sm transition-shadow hover:border-teal-300 hover:shadow-md"
            >
              <span className="text-2xl" aria-hidden>
                {action.icon}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-navy-900 group-hover:text-teal-700">
                {action.title}
              </h3>
              <p className="mt-1 flex-1 text-xs text-gray-600 leading-relaxed">{action.desc}</p>
              <span className="mt-3 text-xs font-semibold text-teal-700">
                {layer.ctaLabel} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
