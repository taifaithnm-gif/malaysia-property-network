#!/usr/bin/env node
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../src/lib/i18n/media-center");

const SECTIONS = [
  {
    id: "golf-resort",
    titleEn: "Golf Resort",
    titleZh: "高尔夫度假村",
    descEn: "Forest City Golf Resort — courses, clubhouses, and resort facilities.",
    descZh: "森林城市高尔夫度假村——球场、会所与度假设施。",
    photoBase: "1505142468610",
  },
  {
    id: "marina",
    titleEn: "Marina",
    titleZh: "游艇码头",
    descEn: "Marina waterfront, berths, and coastal lifestyle at Forest City.",
    descZh: "森林城市游艇码头、泊位与滨海生活。",
    photoBase: "1544551763-46a013bb70d5",
  },
  {
    id: "hotel",
    titleEn: "Hotel",
    titleZh: "酒店",
    descEn: "Forest City hotel towers, lobbies, and hospitality facilities.",
    descZh: "森林城市酒店塔楼、大堂与接待设施。",
    photoBase: "1566073771259",
  },
  {
    id: "villa",
    titleEn: "Villa",
    titleZh: "别墅",
    descEn: "Villa districts, landed homes, and low-density residential zones.",
    descZh: "别墅区、独栋住宅与低密度住区。",
    photoBase: "1600596542815",
  },
];

const IMAGES_PER_SECTION = 26;

const PHOTO_POOL = [
  "1545324418-cc1a3fa10c00",
  "1513584684374-8bab748f235c",
  "1560448204-e02f11c3d0e2",
  "1600596542815-ffad4c1539a9",
  "1505693416388-ac5ce068fe5e",
  "1505142468610-359e7a316be0",
  "1544551763-46a013bb70d5",
  "1566073771259-d722a7420013",
  "1600585154340-be6161a56a0c",
  "1600607687939-ce8a6c25118c",
  "1613490493576-7fde8acd811c",
  "1605276374104-de8862a76e2a",
];

function buildImages(section, sectionIndex) {
  const images = [];
  for (let i = 0; i < IMAGES_PER_SECTION; i++) {
    const photoId = PHOTO_POOL[(sectionIndex * 13 + i) % PHOTO_POOL.length];
    images.push({
      src: `https://images.unsplash.com/photo-${photoId}?w=800&q=80&auto=format&fit=crop&sig=fc-${section.id}-${i}`,
      altEn: `Forest City ${section.titleEn} — photo ${i + 1}`,
      altZh: `森林城市${section.titleZh} — 图 ${i + 1}`,
    });
  }
  return images;
}

const catalog = {
  meta: {
    totalImages: SECTIONS.length * IMAGES_PER_SECTION,
    project: "Forest City",
  },
  sections: SECTIONS.map((section, index) => ({
    id: section.id,
    titleEn: section.titleEn,
    titleZh: section.titleZh,
    descEn: section.descEn,
    descZh: section.descZh,
    images: buildImages(section, index),
  })),
};

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "forest-city-media.json"), JSON.stringify(catalog, null, 2) + "\n");
console.log(`Generated ${catalog.meta.totalImages} Forest City media images`);
