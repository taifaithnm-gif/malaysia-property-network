#!/usr/bin/env node
/** Generates listing enrichment, project profiles, and gallery JSON for property marketplace. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const IMG = (sig) =>
  `https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&sig=${sig}`;

const PROJECTS = [
  {
    key: "forest-city",
    dbName: "Forest City",
    slug: "forest-city",
    demand: 2,
    tag: "owner_management",
    tenant: "China Owner",
    tenantKey: "china_owner",
    lat: 1.3404,
    lng: 103.593,
  },
  {
    key: "rf-princess-cove",
    dbName: "R&F Princess Cove",
    slug: "rf-princess-cove",
    demand: 5,
    tag: "commuter",
    tenant: "Singapore Commuter",
    tenantKey: "singapore_commuter",
    lat: 1.4638,
    lng: 103.764,
  },
  {
    key: "danga-bay",
    dbName: "Danga Bay",
    slug: "danga-bay",
    demand: 3,
    tag: "family",
    tenant: "Local Family",
    tenantKey: "local_family",
    lat: 1.472,
    lng: 103.768,
  },
  {
    key: "bukit-indah",
    dbName: "Bukit Indah",
    slug: "bukit-indah",
    demand: 5,
    tag: "family",
    tenant: "Local Family",
    tenantKey: "local_family",
    lat: 1.481,
    lng: 103.655,
  },
  {
    key: "mount-austin",
    dbName: "Mount Austin",
    slug: "mount-austin",
    demand: 5,
    tag: "commuter",
    tenant: "Local Family",
    tenantKey: "local_family",
    lat: 1.553,
    lng: 103.78,
  },
  {
    key: "eco-botanic",
    dbName: "Eco Botanic",
    slug: "eco-botanic",
    demand: 4,
    tag: "family",
    tenant: "Local Family",
    tenantKey: "local_family",
    lat: 1.428,
    lng: 103.615,
  },
  {
    key: "medini",
    dbName: "Medini",
    slug: "medini",
    demand: 4,
    tag: "commuter",
    tenant: "Singapore Commuter",
    tenantKey: "singapore_commuter",
    lat: 1.415,
    lng: 103.62,
  },
];

function writeJson(p, data) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
}

for (const locale of ["en", "zh"]) {
  const isZh = locale === "zh";
  for (const p of PROJECTS) {
    const title = isZh
      ? { "forest-city": "森林城市", "rf-princess-cove": "富力公主湾", "danga-bay": "丹加湾", "bukit-indah": "武吉英达", "mount-austin": "奥斯汀山", "eco-botanic": "生态植物园", "medini": "美迪尼" }[p.key]
      : p.dbName;

    const enrichment = {
      projectKey: p.key,
      projectName: p.dbName,
      tag: p.tag,
      rentalDemandScore: p.demand,
      targetTenantKey: p.tenantKey,
      targetTenantType: isZh
        ? { "China Owner": "中国业主", "Singapore Commuter": "新加坡通勤族", "Local Family": "本地家庭", Investor: "投资者" }[p.tenant] || p.tenant
        : p.tenant,
      projectSummary: isZh
        ? `${title}是柔佛新山重要住宅区，适合${p.tenant === "China Owner" ? "海外业主持有与托管" : p.tenant === "Singapore Commuter" ? "跨境通勤租赁" : "本地家庭长租"}。`
        : `${p.dbName} is a key Johor Bahru residential district suited for ${p.tenant === "China Owner" ? "overseas owner hold & management" : p.tenant === "Singapore Commuter" ? "cross-border commuter rentals" : "local family long-term leases"}.`,
      amenities: isZh
        ? ["泳池与健身房", "24小时安保", "地下停车场", "儿童游乐区", "近商超/餐饮", "物业管理处"]
        : ["Pool & gym", "24h security", "Covered parking", "Playground", "Retail & dining nearby", "On-site management"],
      rentalAnalysis: isZh
        ? [
            `租赁需求评分 ${p.demand}/5。`,
            p.demand >= 4 ? "空置期通常较短，适合长租策略。" : "建议配合业主托管服务，优化出租与维护。",
            "定价应参考同项目近期成交，而非区域均价。",
          ]
        : [
            `Rental demand score ${p.demand}/5.`,
            p.demand >= 4 ? "Typical void periods are short; favour long-term leases." : "Pair with owner-management for void and maintenance control.",
            "Price against recent same-building transactions, not district averages.",
          ],
      tenantProfile: isZh
        ? [
            `主要目标租客：${p.tenant === "China Owner" ? "中国业主（自用/托管）" : p.tenant === "Singapore Commuter" ? "新加坡跨境白领" : "本地家庭"}.`,
            "偏好装修齐全、管理规范、交通通达的单元。",
          ]
        : [
            `Primary target: ${p.tenant}.`,
            "Prefers furnished units with responsive management and good access.",
          ],
      profileSlug: p.slug,
      gallerySlug: p.key === "forest-city" ? "forest-city/media-center" : `${p.slug}/gallery`,
    };
    writeJson(
      path.join(root, `src/lib/i18n/listing-enrichment/${locale}/${p.key}.json`),
      enrichment,
    );

    if (!["forest-city", "rf-princess-cove", "danga-bay"].includes(p.key)) {
      const profile = {
        key: p.key,
        title,
        subtitle: isZh ? "新山住宅项目" : "Johor Bahru residential district",
        intro: enrichment.projectSummary,
        seoTitle: isZh ? `${title} 项目简介 | 新山物业` : `${p.dbName} Project Profile | Johor Bahru`,
        seoDescription: enrichment.projectSummary,
        seoKeywords: `${p.dbName}, Johor Bahru, ${p.key}`,
        whatsappMessage: isZh ? `您好，我想了解${title}物业。` : `Hi, I am researching ${p.dbName} property.`,
        guideSlug: p.key,
        labels: isZh
          ? { gallery: "项目图库", facts: "项目要点", map: "位置", propertyTypes: "户型", facilities: "配套", relatedServices: "相关服务", listProperty: "发布房源", propertyRequest: "求购登记", readGuide: "阅读指南" }
          : { gallery: "Gallery", facts: "Facts", map: "Map", propertyTypes: "Property Types", facilities: "Facilities", relatedServices: "Services", listProperty: "List Property", propertyRequest: "Property Request", readGuide: "Read guide" },
        gallery: [0, 1, 2, 3, 4].map((i) => ({
          src: IMG(`${p.key}-${i}`),
          alt: `${title} — ${i + 1}`,
        })),
        facts: [
          { label: isZh ? "位置" : "Location", value: isZh ? "依斯干达 / 新山" : "Iskandar / Johor Bahru" },
          { label: isZh ? "租赁需求" : "Rental demand", value: `${p.demand}/5` },
          { label: isZh ? "主要标签" : "Primary tag", value: p.tag },
          { label: isZh ? "目标租客" : "Target tenant", value: enrichment.targetTenantType },
        ],
        map: { lat: p.lat, lng: p.lng, label: title },
        propertyTypes: [
          { name: isZh ? "一房" : "1-Bedroom", desc: isZh ? "单身/情侣" : "Singles & couples" },
          { name: isZh ? "两房" : "2-Bedroom", desc: isZh ? "小家庭" : "Small families" },
          { name: isZh ? "三房" : "3-Bedroom", desc: isZh ? "家庭长租" : "Family long-term" },
        ],
        facilities: enrichment.amenities,
      };
      writeJson(path.join(root, `src/lib/i18n/project-profiles/${locale}/${p.key}.json`), profile);
    }

    if (p.key !== "forest-city") {
      const gallery = {
        meta: { project: p.dbName, totalImages: 12 },
        sections: [
          {
            id: "overview",
            titleEn: `${p.dbName} Overview`,
            titleZh: `${title} 概览`,
            descEn: `Public gallery for ${p.dbName} listings and viewings.`,
            descZh: `${title} 房源与看房公开图库。`,
            images: Array.from({ length: 12 }, (_, i) => ({
              src: IMG(`${p.key}-g${i}`),
              altEn: `${p.dbName} — photo ${i + 1}`,
              altZh: `${title} — 图 ${i + 1}`,
            })),
          },
        ],
      };
      writeJson(path.join(root, `src/lib/i18n/media-center/${p.key}-gallery.json`), gallery);
    }
  }
}

console.log("Generated enrichment, profiles (4 new), galleries for", PROJECTS.length, "projects");
