"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/constants";

type LanguageSwitcherProps = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  function switchLocale(newLocale: Locale) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/") || `/${newLocale}`;
  }

  return (
    <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 text-sm">
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={switchLocale(l)}
          className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
            l === locale
              ? "bg-teal-700 text-white"
              : "text-gray-600 hover:text-navy-900"
          }`}
          aria-current={l === locale ? "true" : undefined}
        >
          {l === "en" ? "EN" : "中文"}
        </Link>
      ))}
    </div>
  );
}
