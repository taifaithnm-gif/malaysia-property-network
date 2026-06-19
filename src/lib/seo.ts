import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type BuildMetadataOptions = {
  dict: Dictionary;
  path?: string;
  title?: string;
  description?: string;
  keywords?: string;
  locale?: string;
};

export function buildMetadata({
  dict,
  path = "",
  title,
  description,
  keywords,
  locale = "en",
}: BuildMetadataOptions): Metadata {
  const pageTitle = title ?? dict.meta.title;
  const pageDescription = description ?? dict.meta.description;
  const pageKeywords = keywords ?? dict.meta.keywords;
  const url = `${SITE_URL}/${locale}${path ? `/${path}` : ""}`;

  return {
    title: {
      default: pageTitle,
      template: `%s | ${SITE_NAME}`,
    },
    description: pageDescription,
    keywords: pageKeywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en${path ? `/${path}` : ""}`,
        zh: `${SITE_URL}/zh${path ? `/${path}` : ""}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_MY",
      url,
      siteName: SITE_NAME,
      title: pageTitle,
      description: pageDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildJsonLd(type: "Organization" | "LocalBusiness" | "WebPage", data: Record<string, unknown>) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };
}
