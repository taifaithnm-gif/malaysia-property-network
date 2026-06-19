"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS, SITE_NAME, type Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";

type HeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  function navHref(href: string) {
    return href ? `/${locale}/${href}` : `/${locale}`;
  }

  function isActive(href: string) {
    const target = navHref(href);
    return pathname === target || (href !== "" && pathname.startsWith(`${target}/`));
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-sm font-bold text-white">
            MP
          </span>
          <span className="hidden font-bold text-navy-900 sm:block">{SITE_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, key }) => (
            <Link
              key={key}
              href={navHref(href)}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(href)
                  ? "bg-teal-50 text-teal-800"
                  : "text-gray-600 hover:bg-gray-50 hover:text-navy-900"
              }`}
            >
              {dict.nav[key as keyof typeof dict.nav]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher locale={locale} />
          <Button href={`/${locale}/contact`} size="sm">
            {dict.common.getStarted}
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map(({ href, key }) => (
              <Link
                key={key}
                href={navHref(href)}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  isActive(href) ? "bg-teal-50 text-teal-800" : "text-gray-600"
                }`}
              >
                {dict.nav[key as keyof typeof dict.nav]}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
            <LanguageSwitcher locale={locale} />
            <Button href={`/${locale}/contact`} size="sm">
              {dict.common.getStarted}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
