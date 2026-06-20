import type { Locale } from "@/lib/constants";
import catalog from "./media-center/forest-city-media.json";

export type MediaImage = { src: string; altEn: string; altZh: string };
export type MediaSection = {
  id: string;
  titleEn: string;
  titleZh: string;
  descEn: string;
  descZh: string;
  images: MediaImage[];
};

export type MediaCenterContent = {
  title: string;
  subtitle: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  labels: {
    allSections: string;
    imageCount: string;
    bookViewing: string;
    resourceCenter?: string;
    projectPage?: string;
  };
  sections: MediaSection[];
  totalImages: number;
};

const copy = {
  en: {
    title: "Forest City Media Center",
    subtitle: "Official photo library for overseas owners and buyers",
    intro: "Browse 100+ public images across Golf Resort, Marina, Hotel, and Villa districts. Use for due diligence, marketing, and viewing preparation.",
    seoTitle: "Forest City Media Center | Photo Library",
    seoDescription: "100+ Forest City public images — golf resort, marina, hotel, villa sections.",
    labels: {
      allSections: "All sections",
      imageCount: "images",
      bookViewing: "Book a viewing",
      resourceCenter: "Resource center",
    },
  },
  zh: {
    title: "森林城市影像中心",
    subtitle: "面向海外业主与买家的官方图库",
    intro: "浏览高尔夫度假村、游艇码头、酒店、别墅四大分区 100+ 张公开图片，用于尽调、营销与看楼准备。",
    seoTitle: "森林城市影像中心 | 官方图库",
    seoDescription: "森林城市 100+ 公开图片——高尔夫、码头、酒店、别墅分区。",
    labels: {
      allSections: "全部分区",
      imageCount: "张图片",
      bookViewing: "预约看楼",
      resourceCenter: "资料中心",
    },
  },
};

export function getForestCityMediaCenter(locale: Locale): MediaCenterContent {
  const c = copy[locale];
  const sections = catalog.sections.map((s) => ({
    id: s.id,
    titleEn: s.titleEn,
    titleZh: s.titleZh,
    descEn: s.descEn,
    descZh: s.descZh,
    images: s.images,
  }));

  return {
    ...c,
    sections,
    totalImages: catalog.meta.totalImages,
  };
}

export function getMediaSectionTitle(section: MediaSection, locale: Locale): string {
  return locale === "zh" ? section.titleZh : section.titleEn;
}

export function getMediaSectionDesc(section: MediaSection, locale: Locale): string {
  return locale === "zh" ? section.descZh : section.descEn;
}

export function getMediaImageAlt(image: MediaImage, locale: Locale): string {
  return locale === "zh" ? image.altZh : image.altEn;
}

export function buildMediaCenterJsonLd(content: MediaCenterContent, locale: Locale) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://malaysiapropertynetwork.com"}/${locale}/forest-city/media-center`;
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: content.seoTitle,
    description: content.seoDescription,
    url,
    numberOfItems: content.totalImages,
  };
}
