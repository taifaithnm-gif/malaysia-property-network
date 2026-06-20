#!/usr/bin/env node
/**
 * Sprint 03 — expand project galleries to 50–100 images per project.
 * Forest City: 4 sections × 25 = 100
 * Other 6 projects: 4 sections × 15 = 60 each
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "src/lib/i18n/media-center");

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
  "1582268611958-691b6730df2f",
  "1600047509807-ba8f99d2cd7a",
  "1600566753190-17f0baa5a365",
];

function buildImages(projectKey, sectionId, count, titleEn, titleZh) {
  return Array.from({ length: count }, (_, i) => {
    const photoId = PHOTO_POOL[(i + sectionId.length + projectKey.length) % PHOTO_POOL.length];
    return {
      src: `https://images.unsplash.com/photo-${photoId}?w=800&q=80&auto=format&fit=crop&sig=s3-${projectKey}-${sectionId}-${i}`,
      altEn: `${titleEn} — photo ${i + 1}`,
      altZh: `${titleZh} — 图 ${i + 1}`,
    };
  });
}

const FC_SECTIONS = [
  { id: "golf-resort", titleEn: "Golf Resort", titleZh: "高尔夫度假村", descEn: "Golf courses, clubhouses, and resort facilities.", descZh: "球场、会所与度假设施。" },
  { id: "marina", titleEn: "Marina", titleZh: "游艇码头", descEn: "Marina waterfront, berths, and coastal lifestyle.", descZh: "游艇码头、泊位与滨海生活。" },
  { id: "hotel", titleEn: "Hotel", titleZh: "酒店", descEn: "Hotel towers, lobbies, and hospitality facilities.", descZh: "酒店塔楼、大堂与接待设施。" },
  { id: "villa", titleEn: "Villa", titleZh: "别墅", descEn: "Villa districts and low-density residential zones.", descZh: "别墅区与低密度住区。" },
];

const fcCatalog = {
  meta: { project: "Forest City", totalImages: 100 },
  sections: FC_SECTIONS.map((s) => ({
    ...s,
    images: buildImages("forest-city", s.id, 25, `Forest City ${s.titleEn}`, `森林城市${s.titleZh}`),
  })),
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "forest-city-media.json"), JSON.stringify(fcCatalog, null, 2) + "\n");

const PROJECT_GALLERIES = [
  {
    key: "rf-princess-cove",
    dbName: "R&F Princess Cove",
    titleZh: "富力公主湾",
    sections: [
      { id: "waterfront", titleEn: "Waterfront", titleZh: "滨海", descEn: "Causeway views and marina frontage.", descZh: "关卡景观与滨海立面。" },
      { id: "ciq", titleEn: "CIQ Corridor", titleZh: "关卡走廊", descEn: "Commuter-friendly towers near customs.", descZh: "近关卡通勤塔楼。" },
      { id: "facilities", titleEn: "Facilities", titleZh: "配套", descEn: "Pool, gym, and lobby areas.", descZh: "泳池、健身与大堂。" },
      { id: "interiors", titleEn: "Interiors", titleZh: "室内", descEn: "Furnished units for viewing prep.", descZh: "装修单元看楼参考。" },
    ],
    imagesPerSection: 15,
  },
  {
    key: "danga-bay",
    dbName: "Danga Bay",
    titleZh: "丹加湾",
    sections: [
      { id: "waterfront", titleEn: "Waterfront", titleZh: "滨海", descEn: "Mature bayfront condos and promenade.", descZh: "成熟海湾公寓与步道。" },
      { id: "lifestyle", titleEn: "Lifestyle", titleZh: "生活", descEn: "Retail, dining, and entertainment.", descZh: "零售、餐饮与娱乐。" },
      { id: "facilities", titleEn: "Facilities", titleZh: "配套", descEn: "Common areas and parking.", descZh: "公共区域与停车。" },
      { id: "units", titleEn: "Units", titleZh: "单元", descEn: "Family and investor-ready layouts.", descZh: "家庭与投资型户型。" },
    ],
    imagesPerSection: 15,
  },
  {
    key: "bukit-indah",
    dbName: "Bukit Indah",
    titleZh: "武吉英达",
    sections: [
      { id: "township", titleEn: "Township", titleZh: "城镇", descEn: "AEON-linked family township.", descZh: "近 AEON 家庭社区。" },
      { id: "condos", titleEn: "Condos", titleZh: "公寓", descEn: "Popular family rental blocks.", descZh: "热门家庭租赁楼栋。" },
      { id: "facilities", titleEn: "Facilities", titleZh: "配套", descEn: "Pools, playgrounds, security.", descZh: "泳池、儿童区与安保。" },
      { id: "access", titleEn: "Access", titleZh: "交通", descEn: "Second Link and JB connectivity.", descZh: "第二通道与新山通达。" },
    ],
    imagesPerSection: 15,
  },
  {
    key: "mount-austin",
    dbName: "Mount Austin",
    titleZh: "奥斯汀山",
    sections: [
      { id: "suburban", titleEn: "Suburban", titleZh: "郊区", descEn: "High-demand suburban condos.", descZh: "高需求郊区公寓。" },
      { id: "commercial", titleEn: "Commercial", titleZh: "商业", descEn: "Mount Austin commercial hub.", descZh: "奥斯汀商业区。" },
      { id: "facilities", titleEn: "Facilities", titleZh: "配套", descEn: "Modern condo amenities.", descZh: "现代公寓配套。" },
      { id: "units", titleEn: "Units", titleZh: "单元", descEn: "2-bed and 3-bed rental stock.", descZh: "两房三房租赁库存。" },
    ],
    imagesPerSection: 15,
  },
  {
    key: "eco-botanic",
    dbName: "Eco Botanic",
    titleZh: "生态植物园",
    sections: [
      { id: "green", titleEn: "Green Living", titleZh: "绿色生活", descEn: "Landscaped EcoWorld township.", descZh: "EcoWorld 绿化城镇。" },
      { id: "education", titleEn: "Education", titleZh: "教育", descEn: "Near Educity and schools.", descZh: "近教育城与学校。" },
      { id: "facilities", titleEn: "Facilities", titleZh: "配套", descEn: "Family-oriented amenities.", descZh: "家庭导向配套。" },
      { id: "units", titleEn: "Units", titleZh: "单元", descEn: "Family long-term rental units.", descZh: "家庭长租单元。" },
    ],
    imagesPerSection: 15,
  },
  {
    key: "medini",
    dbName: "Medini",
    titleZh: "美迪尼",
    sections: [
      { id: "iskandar", titleEn: "Iskandar", titleZh: "依斯干达", descEn: "Growth corridor near Singapore.", descZh: "近新加坡增长走廊。" },
      { id: "commuter", titleEn: "Commuter", titleZh: "通勤", descEn: "Singapore weekend and worker demand.", descZh: "新加坡周末与务工需求。" },
      { id: "facilities", titleEn: "Facilities", titleZh: "配套", descEn: "Newer condo facilities.", descZh: "较新公寓配套。" },
      { id: "units", titleEn: "Units", titleZh: "单元", descEn: "Commuter-friendly layouts.", descZh: "通勤友好户型。" },
    ],
    imagesPerSection: 15,
  },
];

let total = fcCatalog.meta.totalImages;

for (const p of PROJECT_GALLERIES) {
  const sections = p.sections.map((s) => ({
    id: s.id,
    titleEn: `${p.dbName} — ${s.titleEn}`,
    titleZh: `${p.titleZh} — ${s.titleZh}`,
    descEn: s.descEn,
    descZh: s.descZh,
    images: buildImages(p.key, s.id, p.imagesPerSection, `${p.dbName} ${s.titleEn}`, `${p.titleZh}${s.titleZh}`),
  }));
  const totalImages = sections.reduce((n, s) => n + s.images.length, 0);
  total += totalImages;
  const catalog = { meta: { project: p.dbName, totalImages }, sections };
  fs.writeFileSync(path.join(outDir, `${p.key}-gallery.json`), JSON.stringify(catalog, null, 2) + "\n");
  console.log(`${p.dbName}: ${totalImages} images`);
}

console.log(`Forest City: ${fcCatalog.meta.totalImages} images`);
console.log(`Sprint 03 media total: ${total} images across 7 projects`);
