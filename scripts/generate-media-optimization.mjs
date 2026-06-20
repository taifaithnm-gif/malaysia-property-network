#!/usr/bin/env node
/** Media optimization — categorized galleries, Country Garden Danga Bay, rental index update. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const i18n = path.join(root, "src/lib/i18n");

const PHOTO_POOL = [
  "1545324418-cc1a3fa10c00", "1513584684374-8bab748f235c", "1560448204-e02f11c3d0e2",
  "1600596542815-ffad4c1539a9", "1505693416388-ac5ce068fe5e", "1505142468610-359e7a316be0",
  "1544551763-46a013bb70d5", "1566073771259-d722a7420013", "1600585154340-be6161a56a0c",
  "1600607687939-ce8a6c25118c", "1613490493576-7fde8acd811c", "1605276374104-de8862a76e2a",
  "1582268611958-691b6730df2f", "1600047509807-ba8f99d2cd7a", "1600566753190-17f0baa5a365",
  "1600210492486-724fe369c783", "1600607687642-c717a5cfb85e", "1600585154526-990d4de0c960",
  "1600573472591-ee6b5c2465c8", "1600047509360-9e2b9c9bf3c4", "1613977258806-b44694888747",
  "1631889992884-17914bbaf36c", "1564013799919-ab600027ffc6", "1570129477492-45c89571c187",
  "1583600474467-15ccb3a0895a", "1605276374104-de8862a76e2a", "1617103134515-47bc6e059a7b",
  "1628744092235-9c31d30a3253", "1632299829478-f3210d5c4b1a", "1643385960445-dc914f4591f1",
  "1661961110679-77f4f30a8a1e", "1670272503919-44703a065f65", "1687908900129-5da01ce0f609",
  "1699800257934-9e5b5c5b5b5b", "1522708323590-d24dbb6b0267", "1484154218962-a197022bcb5d",
  "1493809842364-78817add7ffb", "1502672260266-1c1ef2d93636", "1512917774080-667c177ea2b9",
  "1523217582562-09d0def993a4",
];

let globalIdx = 0;

function buildImages(projectKey, sectionId, count, titleEn, titleZh) {
  return Array.from({ length: count }, (_, i) => {
    const offset = globalIdx++;
    const photoId = PHOTO_POOL[offset % PHOTO_POOL.length];
    return {
      src: `https://images.unsplash.com/photo-${photoId}?w=800&q=80&auto=format&fit=crop&sig=mo-${projectKey}-${sectionId}-${offset}`,
      altEn: `${titleEn} — ${sectionId} ${i + 1}`,
      altZh: `${titleZh} — ${sectionId} ${i + 1}`,
    };
  });
}

const CATS = {
  exterior: { en: "Exterior", zh: "外观", descEn: "Tower facade, entrance and street context.", descZh: "塔楼立面、入口与街区环境。" },
  facilities: { en: "Facilities", zh: "配套", descEn: "Lobby, security, parking and common areas.", descZh: "大堂、安保、停车与公共区域。" },
  pool: { en: "Pool", zh: "泳池", descEn: "Swimming pool and deck areas.", descZh: "游泳池与甲板区域。" },
  gym: { en: "Gym", zh: "健身", descEn: "Fitness centre and recreation facilities.", descZh: "健身中心与休闲设施。" },
  units: { en: "Units", zh: "单元", descEn: "Interior layouts and furnished examples.", descZh: "室内户型与装修示例。" },
  waterfront: { en: "Waterfront", zh: "滨海", descEn: "Bay views, promenade and coastal context.", descZh: "海湾景观、步道与滨海环境。" },
  golf: { en: "Golf", zh: "高尔夫", descEn: "Golf course, clubhouse and fairway views.", descZh: "球场、会所与球道景观。" },
  marina: { en: "Marina", zh: "游艇码头", descEn: "Marina, berths and coastal lifestyle.", descZh: "游艇码头、泊位与滨海生活。" },
};

function gallery(projectName, nameZh, key, sectionIds, perSection = 10) {
  const sections = sectionIds.map((id) => {
    const c = CATS[id];
    return {
      id,
      titleEn: `${projectName} — ${c.en}`,
      titleZh: `${nameZh} — ${c.zh}`,
      descEn: c.descEn,
      descZh: c.descZh,
      images: buildImages(key, id, perSection, `${projectName} ${c.en}`, `${nameZh}${c.zh}`),
    };
  });
  const totalImages = sections.reduce((n, s) => n + s.images.length, 0);
  return { meta: { project: projectName, totalImages }, sections };
}

function writeJson(rel, data) {
  const p = path.join(i18n, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
  console.log(`Wrote ${rel}`);
}

const mcDir = path.join(i18n, "media-center");
fs.mkdirSync(mcDir, { recursive: true });

// Forest City — 8 categories × 12 = 96
const fc = gallery("Forest City", "森林城市", "forest-city",
  ["exterior", "facilities", "pool", "gym", "units", "waterfront", "golf", "marina"], 12);
fs.writeFileSync(path.join(mcDir, "forest-city-media.json"), JSON.stringify(fc, null, 2) + "\n");

const GALLERIES = [
  { key: "rf-princess-cove", name: "R&F Princess Cove", zh: "富力公主湾", sections: ["exterior", "facilities", "pool", "gym", "units", "waterfront"] },
  { key: "danga-bay", name: "Danga Bay", zh: "丹加湾", sections: ["exterior", "facilities", "pool", "gym", "units", "waterfront"] },
  { key: "country-garden-danga-bay", name: "Country Garden Danga Bay", zh: "碧桂园丹加湾", sections: ["exterior", "facilities", "pool", "gym", "units", "waterfront"] },
  { key: "bukit-indah", name: "Bukit Indah", zh: "武吉英达", sections: ["exterior", "facilities", "pool", "gym", "units", "waterfront"] },
  { key: "mount-austin", name: "Mount Austin", zh: "奥斯汀山", sections: ["exterior", "facilities", "pool", "gym", "units", "waterfront"] },
  { key: "eco-botanic", name: "Eco Botanic", zh: "生态植物园", sections: ["exterior", "facilities", "pool", "gym", "units", "waterfront"] },
  { key: "medini", name: "Medini", zh: "美迪尼", sections: ["exterior", "facilities", "pool", "gym", "units", "waterfront"] },
];

for (const g of GALLERIES) {
  const cat = gallery(g.name, g.zh, g.key, g.sections, 10);
  fs.writeFileSync(path.join(mcDir, `${g.key}-gallery.json`), JSON.stringify(cat, null, 2) + "\n");
  console.log(`${g.name}: ${cat.meta.totalImages} images`);
}

// Country Garden Danga Bay — project profile EN
const cgProfileEn = {
  key: "country-garden-danga-bay",
  title: "Country Garden Danga Bay",
  subtitle: "Country Garden waterfront towers · Danga Bay district",
  intro: "Country Garden Danga Bay (碧桂园丹加湾) is a flagship waterfront condominium cluster within the mature Danga Bay district. This profile covers rental data, investment score, gallery, FAQs and owner services for overseas landlords.",
  seoTitle: "Country Garden Danga Bay | Project Profile & Rental Data",
  seoDescription: "Country Garden Danga Bay project profile: rental range, investment score, gallery, FAQs and property management for overseas owners in Johor Bahru.",
  seoKeywords: "Country Garden Danga Bay, 碧桂园丹加湾, CG Danga Bay, Danga Bay rental, Johor property",
  whatsappMessage: "Hi, I am researching Country Garden Danga Bay and would like to discuss owner services.",
  guideSlug: "danga-bay",
  gallerySlug: "country-garden-danga-bay/gallery",
  intelligenceSlug: "project-intelligence/country-garden-danga-bay",
  labels: {
    gallery: "Project Gallery",
    facts: "Project Facts",
    map: "Location Map",
    propertyTypes: "Property Types",
    facilities: "Facilities & Amenities",
    relatedServices: "Related Owner Services",
    listProperty: "List Your Property",
    propertyRequest: "Submit Property Request",
    readGuide: "Read Danga Bay area guide",
    rentalData: "Rental Data",
    investmentScore: "Investment Score",
    faqs: "Frequently Asked Questions",
    viewIntelligence: "View full intelligence dossier",
    demandScore: "Rental demand",
  },
  rentalData: {
    averageRent: "RM 2,050/mo",
    rentalRange: "RM 1,500 – 2,600",
    yield: "5.2 – 6.5%",
    vacancy: "Typical void 4–7 weeks",
    demandScore: 4,
    targetTenant: "Local Family & yield-focused investors",
  },
  investmentScore: 72,
  gallery: buildImages("country-garden-danga-bay", "hero", 5, "Country Garden Danga Bay", "碧桂园丹加湾").map((img, i) => ({
    src: img.src.replace("w=800", "w=1200"),
    alt: img.altEn.replace(/ — hero \d+/, ""),
  })),
  facts: [
    { label: "Developer", value: "Country Garden (碧桂园)" },
    { label: "Location", value: "Danga Bay waterfront, Johor Bahru" },
    { label: "District", value: "Mature Danga Bay mixed-use zone" },
    { label: "Typical Units", value: "Studio to 3-bedroom waterfront condos" },
    { label: "Tenure", value: "Freehold / leasehold varies by block" },
    { label: "Completion", value: "2012–2018 (Country Garden phases)" },
    { label: "Distance to CIQ", value: "Approx. 15–20 minutes by car" },
    { label: "Owner Profile", value: "Chinese investors, local landlords, yield seekers" },
  ],
  map: { lat: 1.4728, lng: 103.7218, label: "Country Garden Danga Bay, Danga Bay Johor Bahru" },
  propertyTypes: [
    { name: "Studio / 1-Bed", desc: "Entry-level waterfront units with tourism and short-stay potential near Danga Bay attractions." },
    { name: "2-Bedroom", desc: "Core rental stock for local families. Furnished units lease faster in mature Danga Bay blocks." },
    { name: "3-Bedroom Seaview", desc: "Premium family layouts with bay views. Higher maintenance standards expected by tenants." },
  ],
  facilities: [
    "Waterfront promenade access",
    "Swimming pool and gym",
    "24-hour security",
    "Covered parking",
    "Lobby and concierge",
    "Near Danga Bay retail and F&B",
    "Tourism and leisure foot traffic",
    "Building-specific management office",
  ],
  faqs: [
    { q: "How is Country Garden Danga Bay different from other Danga Bay condos?", a: "Country Garden phases offer newer build quality and branded management within the wider Danga Bay district. Rental demand is stronger for furnished 2-bed units compared to older mixed hotel-condo stock." },
    { q: "What rent can I expect?", a: "Average rent is approximately RM 2,050/month with a range of RM 1,500–2,600 depending on furnishing, view and floor. Gross yield estimates run 5.2–6.5%." },
    { q: "Who are the typical tenants?", a: "Local families and long-term JB tenants are the primary pool. Some tourism-driven short-stay demand exists near waterfront attractions where bylaws permit." },
    { q: "Do you manage Country Garden Danga Bay units?", a: "Yes. We provide inspection, key holding, full property management and Airbnb coordination for overseas owners in Country Garden and wider Danga Bay blocks." },
    { q: "What is the investment score?", a: "Country Garden Danga Bay scores 72/100 in our research model — above district average due to newer stock and stable family rental demand. Not financial advice." },
  ],
};

const cgProfileZh = {
  ...cgProfileEn,
  title: "碧桂园丹加湾",
  subtitle: "碧桂园滨海塔楼 · 丹加湾片区",
  intro: "碧桂园丹加湾是丹加湾成熟滨海区内的标杆住宅集群。本页提供租赁数据、投资评分、图库、常见问题及海外业主服务。",
  seoTitle: "碧桂园丹加湾 | 项目简介与租赁数据",
  seoDescription: "碧桂园丹加湾项目简介：租金区间、投资评分、图库、常见问题及新山海外业主托管服务。",
  seoKeywords: "碧桂园丹加湾, Country Garden Danga Bay, 丹加湾租赁, 新山房产",
  whatsappMessage: "您好，我在了解碧桂园丹加湾，想咨询业主托管服务。",
  labels: {
    ...cgProfileEn.labels,
    gallery: "项目图库",
    facts: "项目概况",
    map: "位置地图",
    propertyTypes: "户型类型",
    facilities: "配套设施",
    relatedServices: "相关业主服务",
    listProperty: "挂牌出租/出售",
    propertyRequest: "提交找房需求",
    readGuide: "阅读丹加湾区域指南",
    rentalData: "租赁数据",
    investmentScore: "投资评分",
    faqs: "常见问题",
    viewIntelligence: "查看完整情报档案",
    demandScore: "租赁需求",
  },
  rentalData: {
    ...cgProfileEn.rentalData,
    averageRent: "RM 2,050/月",
    rentalRange: "RM 1,500 – 2,600",
    vacancy: "典型空置 4–7 周",
    targetTenant: "本地家庭与收益型投资者",
  },
  gallery: cgProfileEn.gallery.map((img, i) => ({
    src: img.src,
    alt: ["碧桂园丹加湾 — 滨海塔楼", "碧桂园丹加湾 — 海湾景观", "碧桂园丹加湾 — 泳池配套", "碧桂园丹加湾 — 装修单元", "碧桂园丹加湾 — 滨海步道"][i],
  })),
  facts: cgProfileEn.facts.map((f) => ({
    label: { Developer: "开发商", Location: "位置", District: "片区", "Typical Units": "典型户型", Tenure: "产权", Completion: "竣工", "Distance to CIQ": "距关卡", "Owner Profile": "业主画像" }[f.label] ?? f.label,
    value: f.value
      .replace("Country Garden (碧桂园)", "碧桂园")
      .replace("Danga Bay waterfront, Johor Bahru", "丹加湾滨海，新山")
      .replace("Mature Danga Bay mixed-use zone", "丹加湾成熟混合用途区")
      .replace("Studio to 3-bedroom waterfront condos", "单间至三房滨海公寓")
      .replace("Freehold / leasehold varies by block", "各楼栋永久/租赁产权不同")
      .replace("2012–2018 (Country Garden phases)", "2012–2018（碧桂园期数）")
      .replace("Approx. 15–20 minutes by car", "车程约15–20分钟")
      .replace("Chinese investors, local landlords, yield seekers", "中国投资者、本地房东、收益型买家"),
  })),
  map: { ...cgProfileEn.map, label: "碧桂园丹加湾，新山丹加湾" },
  propertyTypes: [
    { name: "单间 / 一房", desc: "入门级滨海单位，近丹加湾景点，具旅游与短租潜力。" },
    { name: "两房", desc: "本地家庭租赁主力户型，装修单位出租更快。" },
    { name: "三房海景", desc: "家庭海景大户型，租户对维护标准要求较高。" },
  ],
  facilities: ["滨海步道", "泳池与健身房", "24小时安保", "有盖停车", "大堂礼宾", "近丹加湾零售餐饮", "旅游休闲人流", "楼栋管理处"],
  faqs: cgProfileEn.faqs.map((f, i) => ({
    q: ["碧桂园丹加湾与其他丹加湾楼盘有何不同？", "租金大概多少？", "典型租户是谁？", "你们托管碧桂园丹加湾吗？", "投资评分是多少？"][i],
    a: [
      "碧桂园期数建筑较新、管理品牌统一，在丹加湾片区内装修两房出租表现优于部分老旧酒店公寓。",
      "平均租金约 RM 2,050/月，区间 RM 1,500–2,600，视装修、景观与楼层而定，毛收益约 5.2–6.5%。",
      "以本地家庭及新山长期租户为主，滨海景点附近部分楼栋有旅游短租需求（须符合物业条例）。",
      "是的。我们为海外业主提供验房、钥匙托管、全面托管及 Airbnb 协调服务。",
      "投资评分 72/100，高于片区均值，因建筑较新且家庭租赁需求稳定。仅供参考，非投资建议。",
    ][i],
  })),
};

writeJson("project-profiles/en/country-garden-danga-bay.json", cgProfileEn);
writeJson("project-profiles/zh/country-garden-danga-bay.json", cgProfileZh);

const cgEnrich = {
  projectKey: "country-garden-danga-bay",
  projectName: "Country Garden Danga Bay",
  tag: "family",
  rentalDemandScore: 4,
  targetTenantKey: "local_family",
  targetTenantType: "Local Family",
  projectSummary: "Country Garden Danga Bay offers newer waterfront condos within the mature Danga Bay district with stable family rental demand.",
  amenities: ["Waterfront pool & gym", "24h security", "Covered parking", "Lobby concierge", "Danga Bay promenade", "Retail & F&B nearby"],
  rentalAnalysis: ["Rental demand score 4/5 within Danga Bay district.", "Average rent ~RM 2,050; furnished 2-bed leases in 4–7 weeks.", "Price against same-tower recent rents, not district-wide averages."],
  tenantProfile: ["Primary target: Local Family.", "Prefers furnished units with responsive management near waterfront amenities."],
  profileSlug: "country-garden-danga-bay",
  gallerySlug: "country-garden-danga-bay/gallery",
};
writeJson("listing-enrichment/en/country-garden-danga-bay.json", cgEnrich);
writeJson("listing-enrichment/zh/country-garden-danga-bay.json", {
  ...cgEnrich,
  projectName: "碧桂园丹加湾",
  projectSummary: "碧桂园丹加湾是丹加湾成熟滨海区内较新的住宅集群，家庭租赁需求稳定。",
  targetTenantType: "本地家庭",
  rentalAnalysis: ["丹加湾片区租赁需求评分 4/5。", "平均租金约 RM 2,050；装修两房 4–7 周可租出。", "应参照同楼栋近期成交定价。"],
  tenantProfile: ["主要租户：本地家庭。", "偏好近滨海配套、管理响应快的装修单位。"],
});

writeJson("rental-intelligence/en/country-garden-danga-bay.json", {
  projectKey: "country-garden-danga-bay",
  projectName: "Country Garden Danga Bay",
  averageRent: "RM 2,050/mo",
  averageRentValue: 2050,
  rentalYield: "5.2–6.5%",
  vacancyEstimate: "Typical void 4–7 weeks",
  rentalDemandScore: 4,
  targetTenantKey: "local_family",
  targetTenantProfile: "Local families — long-term leases near Danga Bay waterfront and retail.",
  insights: [
    "Country Garden Danga Bay average rent ~RM 2,050; demand score 4/5.",
    "Estimated gross yield 5.2–6.5%; void 4–7 weeks for furnished stock.",
    "Newer CG towers outperform ageing Danga Bay blocks on rental velocity.",
  ],
});
writeJson("rental-intelligence/zh/country-garden-danga-bay.json", {
  projectKey: "country-garden-danga-bay",
  projectName: "碧桂园丹加湾",
  averageRent: "RM 2,050/月",
  averageRentValue: 2050,
  rentalYield: "5.2–6.5%",
  vacancyEstimate: "典型空置 4–7 周",
  rentalDemandScore: 4,
  targetTenantKey: "local_family",
  targetTenantProfile: "本地家庭 — 丹加湾滨海及零售配套长租。",
  insights: [
    "碧桂园丹加湾平均租金约 RM 2,050；需求评分 4/5。",
    "毛收益约 5.2–6.5%；装修房源空置 4–7 周。",
    "较新碧桂园楼栋出租速度优于部分老旧丹加湾楼盘。",
  ],
});

writeJson("project-intelligence/en/country-garden-danga-bay.json", {
  projectKey: "country-garden-danga-bay",
  projectName: "Country Garden Danga Bay",
  slug: "country-garden-danga-bay",
  developerProfile: "Country Garden (碧桂园) — flagship waterfront phases within Danga Bay district",
  completionYear: "2012–2018 (Country Garden towers)",
  propertyTypes: ["Studio & 1-bed waterfront", "2-bed family condos", "3-bed seaview units"],
  rentalRange: "RM 1,500 – 2,600 / mo",
  yieldEstimate: "5.2 – 6.5% gross",
  occupancyEstimate: "80 – 88% (newer CG stock)",
  targetTenant: "Local Family & yield-focused investors",
  pros: ["Newer build vs ageing Danga Bay blocks", "Waterfront lifestyle", "Stable family tenant pool", "Lower entry than R&F / FC"],
  cons: ["District-wide competition", "Management varies by phase", "Tourism seasonality on some blocks", "Maintenance on older adjoining stock"],
  investmentScore: 72,
  seoTitle: "Country Garden Danga Bay Intelligence | Johor Research",
  seoDescription: "Country Garden Danga Bay rental range, yield, occupancy and investment score 72/100 — Johor Property Intelligence.",
});
writeJson("project-intelligence/zh/country-garden-danga-bay.json", {
  projectKey: "country-garden-danga-bay",
  projectName: "碧桂园丹加湾",
  slug: "country-garden-danga-bay",
  developerProfile: "碧桂园 — 丹加湾滨海标杆期数",
  completionYear: "2012–2018（碧桂园塔楼）",
  propertyTypes: ["滨海单间/一房", "两房家庭公寓", "三房海景单位"],
  rentalRange: "RM 1,500 – 2,600 / 月",
  yieldEstimate: "5.2 – 6.5% 毛收益",
  occupancyEstimate: "80 – 88%（较新碧桂园库存）",
  targetTenant: "本地家庭与收益型投资者",
  pros: ["较丹加湾老旧楼盘更新", "滨海生活方式", "稳定家庭租户池", "入场价低于富力/森林城市"],
  cons: ["片区竞争激烈", "各期管理质量不一", "部分楼栋旅游季节性", "邻近老旧库存维护压力"],
  investmentScore: 72,
  seoTitle: "碧桂园丹加湾投资情报 | 新山研究",
  seoDescription: "碧桂园丹加湾租金、回报、入住率及投资评分 72/100 — 新山物业情报中心。",
});

// Update rental index — add CG row, update meta to 8 projects
for (const locale of ["en", "zh"]) {
  const p = path.join(i18n, `research/${locale}/rental-index.json`);
  const data = JSON.parse(fs.readFileSync(p, "utf8"));
  data.subtitle = locale === "zh" ? "2026 Q2 基准 · 8 个项目" : "2026 Q2 benchmark · 8 projects";
  data.intro = locale === "zh"
    ? "指数基于运营库存与片区成交区间，每季度更新。用于项目比较与定价参考。"
    : data.intro;
  const cgRow = locale === "zh"
    ? { key: "country-garden-danga-bay", slug: "country-garden-danga-bay", name: "碧桂园丹加湾", averageRent: "RM 2,050/月", averageRentValue: 2050, rentalRange: "RM 1,500 – 2,600", yield: "5.2 – 6.5%", occupancy: "80 – 88%" }
    : { key: "country-garden-danga-bay", slug: "country-garden-danga-bay", name: "Country Garden Danga Bay", averageRent: "RM 2,050/mo", averageRentValue: 2050, rentalRange: "RM 1,500 – 2,600", yield: "5.2 – 6.5%", occupancy: "80 – 88%" };
  const existing = data.projects.findIndex((x) => x.key === "country-garden-danga-bay");
  if (existing >= 0) data.projects[existing] = cgRow;
  else {
    const dangaIdx = data.projects.findIndex((x) => x.key === "danga-bay");
    data.projects.splice(dangaIdx >= 0 ? dangaIdx : data.projects.length, 0, cgRow);
  }
  data.seoDescription = locale === "zh"
    ? "新山 8 个项目平均租金、区间、回报率与入住率 — 运营库存更新。"
    : "Average rent, rental range, yield and occupancy for 8 Johor Bahru projects — updated from operational inventory.";
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
  console.log(`Updated research/${locale}/rental-index.json`);
}

// Update intelligence hub
for (const locale of ["en", "zh"]) {
  const p = path.join(i18n, `project-intelligence/${locale}/_hub.json`);
  const data = JSON.parse(fs.readFileSync(p, "utf8"));
  data.seoDescription = locale === "zh"
    ? "新山 8 个项目的投资评分、租金区间、回报率与租户画像。"
    : "Investment scores, rental ranges, yields and tenant profiles for 8 Johor Bahru projects.";
  data.subtitle = locale === "zh" ? "新山 8 个核心项目 — 投资评分与租赁数据" : "8 key Johor Bahru projects — investment scores & rental data";
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
}

// Update profile galleries for other projects — unique hero offsets
const profileKeys = ["danga-bay", "bukit-indah", "mount-austin", "eco-botanic", "medini", "rf-princess-cove", "forest-city"];
for (const key of profileKeys) {
  for (const locale of ["en", "zh"]) {
    const p = path.join(i18n, `project-profiles/${locale}/${key}.json`);
    if (!fs.existsSync(p)) continue;
    const data = JSON.parse(fs.readFileSync(p, "utf8"));
    const base = profileKeys.indexOf(key) * 5;
    data.gallery = Array.from({ length: 5 }, (_, i) => {
      const photoId = PHOTO_POOL[(base + i + 3) % PHOTO_POOL.length];
      return {
        src: `https://images.unsplash.com/photo-${photoId}?w=1200&q=80&auto=format&fit=crop&sig=mo-profile-${key}-${i}`,
        alt: data.gallery?.[i]?.alt ?? `${data.title} — photo ${i + 1}`,
      };
    });
    fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
  }
}

console.log("Media optimization complete. Run: node scripts/audit-images.mjs");
