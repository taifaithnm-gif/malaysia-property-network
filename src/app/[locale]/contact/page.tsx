import { Hero } from "@/components/sections/Hero";
import { LeadForm } from "@/components/ui/LeadForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_NUMBER, type Locale } from "@/lib/constants";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return buildMetadata({
    dict,
    locale,
    path: "contact",
    title: dict.contact.title,
    description: dict.contact.subtitle,
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero
        locale={locale}
        dict={dict}
        title={dict.contact.title}
        subtitle={dict.contact.subtitle}
        showCta={false}
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-navy-900">{dict.contact.formTitle}</h2>
              <p className="mt-2 text-gray-600">{dict.contact.formDescription}</p>
              <div className="mt-8">
                <LeadForm dict={dict} locale={locale} source="contact-page" />
              </div>
            </div>
            <div className="space-y-8">
              <div className="rounded-2xl bg-gray-50 p-8 border border-gray-100">
                <h3 className="text-lg font-semibold text-navy-900">{dict.footer.contactInfo}</h3>
                <dl className="mt-6 space-y-4">
                  <div>
                    <dt className="text-sm text-gray-500">{dict.common.phone}</dt>
                    <dd className="mt-1 font-medium text-navy-900">
                      <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-teal-700">
                        {WHATSAPP_DISPLAY}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">{dict.common.email}</dt>
                    <dd className="mt-1 font-medium text-navy-900">
                      <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-teal-700">
                        {CONTACT_EMAIL}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">{dict.common.address}</dt>
                    <dd className="mt-1 font-medium text-navy-900">{dict.common.officeAddress}</dd>
                  </div>
                </dl>
                <div className="mt-8">
                  <WhatsAppButton label={dict.common.whatsappUs} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
