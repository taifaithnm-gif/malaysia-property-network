import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/constants";

export function isValidLocale(locale: string): locale is Locale {
  return (LOCALES as readonly string[]).includes(locale);
}

export function getLocaleOrDefault(locale: string): Locale {
  return isValidLocale(locale) ? locale : DEFAULT_LOCALE;
}
