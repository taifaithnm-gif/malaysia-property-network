import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { SectionHeading } from "@/components/ui/Button";
import { AcquisitionCaptureForm } from "@/components/ui/AcquisitionCaptureForm";

type LeadMagnetSectionProps = {
  locale: Locale;
  dict: Dictionary;
};

export function LeadMagnetSection({ locale, dict }: LeadMagnetSectionProps) {
  const section = dict.home.leadMagnets;

  return (
    <section className="border-t border-gray-100 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={section.title} subtitle={section.subtitle} />
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {section.guides.map((guide) => (
            <div
              key={guide.slug}
              className="flex flex-col rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                {section.badge}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-navy-900">{guide.title}</h3>
              <p className="mt-2 flex-1 text-sm text-gray-600 leading-relaxed">{guide.desc}</p>
              <ul className="mt-4 space-y-1 text-xs text-gray-500">
                {guide.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-teal-600">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
                <p className="mb-3 text-xs font-medium text-gray-700">{section.formIntro}</p>
                <AcquisitionCaptureForm
                  dict={dict}
                  locale={locale}
                  source={`lead-magnet/${guide.slug}`}
                  compact
                  labels={{
                    nameLabel: section.nameLabel,
                    emailLabel: section.emailLabel,
                    phoneLabel: section.phoneLabel,
                    submitLabel: section.downloadCta,
                    submittingLabel: dict.contact.submitting,
                    successTitle: section.successTitle,
                    successMessage: section.successMessage,
                    downloadLabel: section.downloadLabel,
                    downloadHref: guide.downloadPath,
                    reportLabel: section.reportLabel,
                    reportHref: `/${locale}/${guide.reportPath}`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
