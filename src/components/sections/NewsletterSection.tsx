import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { AcquisitionCaptureForm } from "@/components/ui/AcquisitionCaptureForm";

type NewsletterSectionProps = {
  locale: Locale;
  dict: Dictionary;
};

export function NewsletterSection({ locale, dict }: NewsletterSectionProps) {
  const section = dict.home.newsletter;

  return (
    <section className="border-t border-gray-100 bg-navy-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-400">
              {section.badge}
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{section.title}</h2>
            <p className="mt-4 text-gray-300 leading-relaxed">{section.desc}</p>
            <ul className="mt-6 space-y-3">
              {section.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-gray-300">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-8 text-gray-900">
            <h3 className="text-xl font-semibold text-navy-900">{section.formTitle}</h3>
            <p className="mt-2 text-sm text-gray-600">{section.formDesc}</p>
            <div className="mt-6">
              <AcquisitionCaptureForm
                dict={dict}
                locale={locale}
                source="newsletter/johor-property-intelligence"
                labels={{
                  nameLabel: section.nameLabel,
                  emailLabel: section.emailLabel,
                  phoneLabel: section.phoneLabel,
                  submitLabel: section.submitLabel,
                  submittingLabel: dict.contact.submitting,
                  successTitle: section.successTitle,
                  successMessage: section.successMessage,
                }}
              />
            </div>
            <p className="mt-4 text-xs text-gray-500">{section.privacyNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
