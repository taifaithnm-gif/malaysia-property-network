import type { Locale } from "@/lib/constants";
import type { ListingEnrichmentKey } from "@/lib/i18n/get-listing-enrichment";
import {
  getMediaImageAlt,
  getMediaSectionDesc,
  getMediaSectionTitle,
  type MediaCenterContent,
  type MediaSection,
} from "@/lib/i18n/get-media-center";

export type ProjectGalleryKey = Exclude<ListingEnrichmentKey, "forest-city">;

type GalleryCatalog = {
  meta: { project: string; totalImages: number };
  sections: MediaSection[];
};

const catalogs: Record<ProjectGalleryKey, () => Promise<{ default: GalleryCatalog }>> = {
  "rf-princess-cove": () => import("./media-center/rf-princess-cove-gallery.json"),
  "danga-bay": () => import("./media-center/danga-bay-gallery.json"),
  "country-garden-danga-bay": () => import("./media-center/country-garden-danga-bay-gallery.json"),
  "bukit-indah": () => import("./media-center/bukit-indah-gallery.json"),
  "mount-austin": () => import("./media-center/mount-austin-gallery.json"),
  "eco-botanic": () => import("./media-center/eco-botanic-gallery.json"),
  medini: () => import("./media-center/medini-gallery.json"),
};

const copy: Record<
  Locale,
  Record<ProjectGalleryKey, { title: string; subtitle: string; intro: string; seoTitle: string; seoDescription: string }>
> = {
  en: {
    "rf-princess-cove": {
      title: "R&F Princess Cove Gallery",
      subtitle: "Waterfront condos near the Causeway",
      intro: "Browse public photos for R&F Princess Cove units — ideal for commuter rentals and cross-border buyers.",
      seoTitle: "R&F Princess Cove Gallery | Photo Library",
      seoDescription: "Public photo gallery for R&F Princess Cove listings and viewings.",
    },
    "danga-bay": {
      title: "Danga Bay Gallery",
      subtitle: "Established waterfront district",
      intro: "Explore Danga Bay condo and apartment imagery for rental due diligence.",
      seoTitle: "Danga Bay Gallery | Photo Library",
      seoDescription: "Public photo gallery for Danga Bay property listings.",
    },
    "country-garden-danga-bay": {
      title: "Country Garden Danga Bay Gallery",
      subtitle: "Country Garden waterfront towers",
      intro: "Browse categorized photos for Country Garden Danga Bay — exterior, facilities, pool, gym, units and waterfront.",
      seoTitle: "Country Garden Danga Bay Gallery | Photo Library",
      seoDescription: "Public photo gallery for Country Garden Danga Bay listings and viewings.",
    },
    "bukit-indah": {
      title: "Bukit Indah Gallery",
      subtitle: "Family-friendly township near AEON",
      intro: "Gallery for Bukit Indah condos popular with local families and long-term tenants.",
      seoTitle: "Bukit Indah Gallery | Photo Library",
      seoDescription: "Public photo gallery for Bukit Indah rental listings.",
    },
    "mount-austin": {
      title: "Mount Austin Gallery",
      subtitle: "High-demand suburban condos",
      intro: "Photos of Mount Austin units — strong rental demand from JB professionals.",
      seoTitle: "Mount Austin Gallery | Photo Library",
      seoDescription: "Public photo gallery for Mount Austin property listings.",
    },
    "eco-botanic": {
      title: "Eco Botanic Gallery",
      subtitle: "Green township living",
      intro: "Eco Botanic project imagery for family rentals and owner-managed units.",
      seoTitle: "Eco Botanic Gallery | Photo Library",
      seoDescription: "Public photo gallery for Eco Botanic listings.",
    },
    medini: {
      title: "Medini Gallery",
      subtitle: "Iskandar Puteri growth corridor",
      intro: "Medini condo gallery for Singapore commuters and regional tenants.",
      seoTitle: "Medini Gallery | Photo Library",
      seoDescription: "Public photo gallery for Medini property listings.",
    },
  },
  zh: {
    "rf-princess-cove": {
      title: "富力公主湾图库",
      subtitle: "近关卡滨海住宅",
      intro: "浏览富力公主湾公开图片，适合通勤租赁与跨境买家尽调。",
      seoTitle: "富力公主湾图库 | 公开图片",
      seoDescription: "富力公主湾房源与看楼公开图库。",
    },
    "danga-bay": {
      title: "丹加湾图库",
      subtitle: "成熟滨海社区",
      intro: "丹加湾公寓公开图片，用于租赁尽调。",
      seoTitle: "丹加湾图库 | 公开图片",
      seoDescription: "丹加湾房源公开图库。",
    },
    "country-garden-danga-bay": {
      title: "碧桂园丹加湾图库",
      subtitle: "碧桂园滨海塔楼",
      intro: "碧桂园丹加湾分类图库 — 外观、配套、泳池、健身、单元与滨海景观。",
      seoTitle: "碧桂园丹加湾图库 | 公开图片",
      seoDescription: "碧桂园丹加湾房源与看楼公开图库。",
    },
    "bukit-indah": {
      title: "武吉英达图库",
      subtitle: "近 AEON 家庭社区",
      intro: "武吉英达公寓图库，适合本地家庭长租。",
      seoTitle: "武吉英达图库 | 公开图片",
      seoDescription: "武吉英达租赁房源公开图库。",
    },
    "mount-austin": {
      title: "奥斯汀山图库",
      subtitle: "高需求郊区公寓",
      intro: "奥斯汀山单元图片，新山白领租赁需求旺盛。",
      seoTitle: "奥斯汀山图库 | 公开图片",
      seoDescription: "奥斯汀山房源公开图库。",
    },
    "eco-botanic": {
      title: "生态植物园图库",
      subtitle: "绿色城镇住宅",
      intro: "生态植物园项目图片，适合家庭长租与业主托管。",
      seoTitle: "生态植物园图库 | 公开图片",
      seoDescription: "生态植物园房源公开图库。",
    },
    medini: {
      title: "美迪尼图库",
      subtitle: "依斯干达增长走廊",
      intro: "美迪尼公寓图库，面向新加坡通勤族。",
      seoTitle: "美迪尼图库 | 公开图片",
      seoDescription: "美迪尼房源公开图库。",
    },
  },
};

const labels = {
  en: {
    allSections: "All sections",
    imageCount: "images",
    bookViewing: "Book a viewing",
    projectPage: "Project profile",
  },
  zh: {
    allSections: "全部分区",
    imageCount: "张图片",
    bookViewing: "预约看楼",
    projectPage: "项目简介",
  },
};

export async function getProjectGallery(
  locale: Locale,
  key: ProjectGalleryKey,
): Promise<MediaCenterContent & { projectSlug: string }> {
  const catalog = (await catalogs[key]()).default;
  const c = copy[locale][key];
  return {
    ...c,
    labels: labels[locale],
    sections: catalog.sections,
    totalImages: catalog.meta.totalImages,
    projectSlug: key,
  };
}

export { getMediaImageAlt, getMediaSectionDesc, getMediaSectionTitle };

export function buildProjectGalleryJsonLd(
  content: MediaCenterContent,
  locale: Locale,
  path: string,
) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://malaysiapropertynetwork.com"}/${locale}/${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: content.seoTitle,
    description: content.seoDescription,
    url,
    numberOfItems: content.totalImages,
  };
}
