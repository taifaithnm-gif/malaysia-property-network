import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CONTACT_EMAIL, LOCALES, SITE_URL, WHATSAPP_NUMBER, type Locale } from "@/lib/constants";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata, buildJsonLd } from "@/lib/seo";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return buildMetadata({ dict, locale });
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: localeParam } = await params;

  if (!LOCALES.includes(localeParam as Locale)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  const orgJsonLd = buildJsonLd("LocalBusiness", {
    name: "Malaysia Property Network",
    description: dict.meta.description,
    url: SITE_URL,
    telephone: `+${WHATSAPP_NUMBER}`,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Johor Bahru",
      addressRegion: "Johor",
      addressCountry: "MY",
    },
    areaServed: ["Johor Bahru", "Forest City", "R&F Princess Cove", "Danga Bay"],
    serviceType: "Property Management",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Header locale={locale} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} dict={dict} />
      <WhatsAppButton floating label={dict.common.whatsappUs} />
    </>
  );
}
