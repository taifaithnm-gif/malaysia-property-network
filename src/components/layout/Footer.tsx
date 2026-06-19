import Link from "next/link";
import {
  CONTACT_EMAIL,
  NAV_LINKS,
  SITE_NAME,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
  type Locale,
} from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type FooterProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: FooterProps) {
  const locationLinks = NAV_LINKS.filter((l) =>
    ["johorBahru", "forestCity", "rfPrincessCove", "dangaBay"].includes(l.key),
  );

  return (
    <footer className="border-t border-gray-200 bg-navy-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-sm font-bold text-white">
                MP
              </span>
              <span className="font-bold text-white">{SITE_NAME}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{dict.footer.tagline}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {dict.footer.quickLinks}
            </h3>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.filter((l) => !locationLinks.some((loc) => loc.key === l.key)).map(
                ({ href, key }) => (
                  <li key={key}>
                    <Link
                      href={href ? `/${locale}/${href}` : `/${locale}`}
                      className="hover:text-teal-400 transition-colors"
                    >
                      {dict.nav[key as keyof typeof dict.nav]}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {dict.footer.locations}
            </h3>
            <ul className="space-y-2 text-sm">
              {locationLinks.map(({ href, key }) => (
                <li key={key}>
                  <Link
                    href={`/${locale}/${href}`}
                    className="hover:text-teal-400 transition-colors"
                  >
                    {dict.nav[key as keyof typeof dict.nav]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {dict.footer.contactInfo}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-500">{dict.common.phone}: </span>
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-teal-400">
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <span className="text-gray-500">{dict.common.email}: </span>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-teal-400">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <span className="text-gray-500">{dict.common.address}: </span>
                {dict.common.officeAddress}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {SITE_NAME}. {dict.common.allRightsReserved}
        </div>
      </div>
    </footer>
  );
}
