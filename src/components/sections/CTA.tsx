import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/ui/LeadForm";

type CTAProps = {
  locale: Locale;
  dict: Dictionary;
  showForm?: boolean;
};

export function CTA({ locale, dict, showForm = false }: CTAProps) {
  const reasons = [dict.home.why1, dict.home.why2, dict.home.why3, dict.home.why4];

  return (
    <section className="py-20 bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-12 ${showForm ? "lg:grid-cols-2" : ""}`}>
          <div>
            {!showForm && (
              <h2 className="text-3xl font-bold sm:text-4xl">{dict.home.whyTitle}</h2>
            )}
            {showForm && (
              <>
                <h2 className="text-3xl font-bold sm:text-4xl">{dict.home.ctaTitle}</h2>
                <p className="mt-4 text-gray-300">{dict.home.ctaDescription}</p>
              </>
            )}
            <ul className="mt-8 space-y-4">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">{reason}</span>
                </li>
              ))}
            </ul>
            {!showForm && (
              <div className="mt-10">
                <h3 className="text-2xl font-bold">{dict.home.ctaTitle}</h3>
                <p className="mt-2 text-gray-300">{dict.home.ctaDescription}</p>
                <Button href={`/${locale}/contact`} className="mt-6" size="lg">
                  {dict.common.contactUs}
                </Button>
              </div>
            )}
          </div>
          {showForm && (
            <div className="rounded-2xl bg-white p-8 text-gray-900">
              <h3 className="text-xl font-semibold text-navy-900">{dict.contact.formTitle}</h3>
              <p className="mt-2 text-sm text-gray-600 mb-6">{dict.contact.formDescription}</p>
              <LeadForm dict={dict} locale={locale} source="cta-section" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function PageCTA({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="py-16 bg-teal-700">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">{dict.home.ctaTitle}</h2>
        <p className="mt-3 text-teal-100">{dict.home.ctaDescription}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href={`/${locale}/contact`} variant="secondary" size="lg">
            {dict.common.getStarted}
          </Button>
        </div>
      </div>
    </section>
  );
}
