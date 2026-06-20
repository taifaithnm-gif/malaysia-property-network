#!/usr/bin/env node
/**
 * Sprint 03 — rental intelligence JSON + property comparison pages (EN/ZH).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function writeJson(p, data) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
}

const RENTAL_INTEL = [
  { key: "forest-city", dbName: "Forest City", avgRent: 2440, yield: "3.2–4.1%", vacancy: "8–14 weeks", tenantKey: "china_owner", demand: 2 },
  { key: "rf-princess-cove", dbName: "R&F Princess Cove", avgRent: 3195, yield: "4.5–5.8%", vacancy: "2–4 weeks", tenantKey: "singapore_commuter", demand: 5 },
  { key: "danga-bay", dbName: "Danga Bay", avgRent: 2100, yield: "5.0–6.2%", vacancy: "4–8 weeks", tenantKey: "local_family", demand: 3 },
  { key: "bukit-indah", dbName: "Bukit Indah", avgRent: 2725, yield: "4.8–5.5%", vacancy: "2–5 weeks", tenantKey: "local_family", demand: 5 },
  { key: "mount-austin", dbName: "Mount Austin", avgRent: 3015, yield: "5.2–6.0%", vacancy: "2–4 weeks", tenantKey: "local_family", demand: 5 },
  { key: "eco-botanic", dbName: "Eco Botanic", avgRent: 3115, yield: "4.6–5.4%", vacancy: "3–6 weeks", tenantKey: "local_family", demand: 4 },
  { key: "medini", dbName: "Medini", avgRent: 2400, yield: "4.4–5.6%", vacancy: "3–7 weeks", tenantKey: "singapore_commuter", demand: 4 },
];

const TENANT_PROFILES = {
  en: {
    china_owner: "Overseas Chinese owners — hold, self-use, or owner-management with remote reporting.",
    singapore_commuter: "Singapore professionals — weekday JB / weekend SG; CIQ and RTS corridor priority.",
    local_family: "Johor families — long-term leases, school zones, AEON and suburban amenities.",
    investor: "Yield-focused investors — furnished units, secondary market, rental ROI tracking.",
  },
  zh: {
    china_owner: "海外华人业主——持有、自用或远程托管，需中文沟通与定期巡检报告。",
    singapore_commuter: "新加坡通勤族——工作日新山、周末返新；优先关卡与 RTS 走廊。",
    local_family: "新山本地家庭——长租为主，重视学区、AEON 与郊区生活配套。",
    investor: "收益型投资者——装修出租、二手市场、关注租金回报率。",
  },
};

const NAMES = {
  en: { "forest-city": "Forest City", "rf-princess-cove": "R&F Princess Cove", "danga-bay": "Danga Bay", "bukit-indah": "Bukit Indah", "mount-austin": "Mount Austin", "eco-botanic": "Eco Botanic", medini: "Medini" },
  zh: { "forest-city": "森林城市", "rf-princess-cove": "富力公主湾", "danga-bay": "丹加湾", "bukit-indah": "武吉英达", "mount-austin": "奥斯汀山", "eco-botanic": "生态植物园", medini: "美迪尼" },
};

for (const locale of ["en", "zh"]) {
  const isZh = locale === "zh";
  for (const p of RENTAL_INTEL) {
    const name = NAMES[locale][p.key];
    writeJson(path.join(root, `src/lib/i18n/rental-intelligence/${locale}/${p.key}.json`), {
      projectKey: p.key,
      projectName: p.dbName,
      averageRent: isZh ? `RM ${p.avgRent.toLocaleString()}/月` : `RM ${p.avgRent.toLocaleString()}/mo`,
      averageRentValue: p.avgRent,
      rentalYield: p.yield,
      vacancyEstimate: isZh ? `典型空置 ${p.vacancy}` : `Typical void ${p.vacancy}`,
      rentalDemandScore: p.demand,
      targetTenantKey: p.tenantKey,
      targetTenantProfile: TENANT_PROFILES[locale][p.tenantKey],
      insights: isZh
        ? [
            `${name} 平均租金约 RM ${p.avgRent}，需求评分 ${p.demand}/5。`,
            `预估租金回报率 ${p.yield}；${p.vacancy.replace("Typical void ", "空置期 ").replace("weeks", "周")}。`,
            TENANT_PROFILES[locale][p.tenantKey],
          ]
        : [
            `${p.dbName} average rent ~RM ${p.avgRent}; demand score ${p.demand}/5.`,
            `Estimated gross yield ${p.yield}; ${p.vacancy}.`,
            TENANT_PROFILES[locale][p.tenantKey],
          ],
    });
  }
}

const COMPARISONS = [
  {
    key: "forest-city-vs-rf-princess-cove",
    slug: "compare/forest-city-vs-rf-princess-cove",
    projectA: "forest-city",
    projectB: "rf-princess-cove",
    winner: "rf-princess-cove",
    en: {
      title: "Forest City vs R&F Princess Cove",
      subtitle: "Owner-management resort vs Causeway commuter premium",
      intro: "Forest City suits overseas owner-management and lifestyle holds; R&F Princess Cove dominates Singapore commuter rental velocity near CIQ.",
      recommendation: "Choose Forest City for China Owner PM revenue; choose R&F for commuter rental speed and higher average rent.",
      dimensions: [
        { label: "Average rent", valueA: "RM 2,440/mo", valueB: "RM 3,195/mo", note: "R&F commands CIQ premium" },
        { label: "Rental yield", valueA: "3.2–4.1%", valueB: "4.5–5.8%", note: "R&F higher gross yield" },
        { label: "Vacancy estimate", valueA: "8–14 weeks", valueB: "2–4 weeks", note: "R&F faster re-let" },
        { label: "Target tenant", valueA: "China Owner", valueB: "Singapore Commuter", note: "Different buyer personas" },
        { label: "Demand score", valueA: "2/5", valueB: "5/5", note: "R&F local liquidity leader" },
      ],
    },
    zh: {
      title: "森林城市 vs 富力公主湾",
      subtitle: "业主托管度假盘 vs 关卡通勤溢价盘",
      intro: "森林城市适合海外业主持有与托管；富力公主湾近关卡，新加坡通勤租赁周转更快。",
      recommendation: "选森林城市做华人业主托管服务；选富力公主湾做通勤租赁与更高均租。",
      dimensions: [
        { label: "平均租金", valueA: "RM 2,440/月", valueB: "RM 3,195/月", note: "富力享关卡溢价" },
        { label: "租金回报率", valueA: "3.2–4.1%", valueB: "4.5–5.8%", note: "富力毛收益率更高" },
        { label: "空置预估", valueA: "8–14 周", valueB: "2–4 周", note: "富力再租更快" },
        { label: "目标租客", valueA: "中国业主", valueB: "新加坡通勤族", note: "客群定位不同" },
        { label: "需求评分", valueA: "2/5", valueB: "5/5", note: "富力本地流动性领先" },
      ],
    },
  },
  {
    key: "bukit-indah-vs-mount-austin",
    slug: "compare/bukit-indah-vs-mount-austin",
    projectA: "bukit-indah",
    projectB: "mount-austin",
    winner: "mount-austin",
    en: {
      title: "Bukit Indah vs Mount Austin",
      subtitle: "Family township stability vs JB rental hotspot",
      intro: "Both score 5/5 for local family demand. Bukit Indah offers AEON-linked lifestyle; Mount Austin leads on rent levels and tenant pool breadth.",
      recommendation: "Bukit Indah for stable family void periods; Mount Austin for maximum rental rate and re-let speed.",
      dimensions: [
        { label: "Average rent", valueA: "RM 2,725/mo", valueB: "RM 3,015/mo", note: "Mount Austin slightly higher" },
        { label: "Rental yield", valueA: "4.8–5.5%", valueB: "5.2–6.0%", note: "Mount Austin yield edge" },
        { label: "Vacancy estimate", valueA: "2–5 weeks", valueB: "2–4 weeks", note: "Both fast re-let" },
        { label: "Target tenant", valueA: "Local Family", valueB: "Local Family", note: "Same core tenant" },
        { label: "Demand score", valueA: "5/5", valueB: "5/5", note: "Tied — top JB districts" },
      ],
    },
    zh: {
      title: "武吉英达 vs 奥斯汀山",
      subtitle: "家庭城镇稳定 vs 新山租赁热点",
      intro: "两者本地家庭需求均为 5/5。武吉英达近 AEON 生活圈；奥斯汀山均租更高、租客池更广。",
      recommendation: "武吉英达求稳定空置；奥斯汀山求更高租金与再租速度。",
      dimensions: [
        { label: "平均租金", valueA: "RM 2,725/月", valueB: "RM 3,015/月", note: "奥斯汀山略高" },
        { label: "租金回报率", valueA: "4.8–5.5%", valueB: "5.2–6.0%", note: "奥斯汀山回报略优" },
        { label: "空置预估", valueA: "2–5 周", valueB: "2–4 周", note: "两者再租均快" },
        { label: "目标租客", valueA: "本地家庭", valueB: "本地家庭", note: "核心客群相同" },
        { label: "需求评分", valueA: "5/5", valueB: "5/5", note: "并列新山前列" },
      ],
    },
  },
  {
    key: "eco-botanic-vs-medini",
    slug: "compare/eco-botanic-vs-medini",
    projectA: "eco-botanic",
    projectB: "medini",
    winner: "eco-botanic",
    en: {
      title: "Eco Botanic vs Medini",
      subtitle: "Family education cluster vs Iskandar commuter corridor",
      intro: "Eco Botanic targets family tenants near Educity with higher average rent. Medini serves Singapore commuters and regional workers at lower price points.",
      recommendation: "Eco Botanic for family 3-bed long-term; Medini for commuter 1–2 bed and entry yield.",
      dimensions: [
        { label: "Average rent", valueA: "RM 3,115/mo", valueB: "RM 2,400/mo", note: "Eco Botanic premium" },
        { label: "Rental yield", valueA: "4.6–5.4%", valueB: "4.4–5.6%", note: "Comparable yields" },
        { label: "Vacancy estimate", valueA: "3–6 weeks", valueB: "3–7 weeks", note: "Eco slightly tighter" },
        { label: "Target tenant", valueA: "Local Family", valueB: "Singapore Commuter", note: "Family vs commuter" },
        { label: "Demand score", valueA: "4/5", valueB: "4/5", note: "Both growth corridors" },
      ],
    },
    zh: {
      title: "生态植物园 vs 美迪尼",
      subtitle: "家庭教育集群 vs 依斯干达通勤走廊",
      intro: "生态植物园面向教育城家庭租客，均租更高；美迪尼服务新加坡通勤族，价位更入门。",
      recommendation: "生态植物园做家庭三房长租；美迪尼做通勤一至两房与入门收益。",
      dimensions: [
        { label: "平均租金", valueA: "RM 3,115/月", valueB: "RM 2,400/月", note: "生态植物园溢价" },
        { label: "租金回报率", valueA: "4.6–5.4%", valueB: "4.4–5.6%", note: "回报率接近" },
        { label: "空置预估", valueA: "3–6 周", valueB: "3–7 周", note: "生态略紧" },
        { label: "目标租客", valueA: "本地家庭", valueB: "新加坡通勤族", note: "家庭 vs 通勤" },
        { label: "需求评分", valueA: "4/5", valueB: "4/5", note: "均属增长走廊" },
      ],
    },
  },
];

for (const locale of ["en", "zh"]) {
  for (const c of COMPARISONS) {
    const copy = c[locale];
    writeJson(path.join(root, `src/lib/i18n/comparisons/${locale}/${c.key}.json`), {
      key: c.key,
      slug: c.slug,
      projectA: c.projectA,
      projectB: c.projectB,
      projectAName: NAMES[locale][c.projectA],
      projectBName: NAMES[locale][c.projectB],
      winner: c.winner,
      seoTitle: locale === "zh" ? `${copy.title} | 新山物业对比` : `${copy.title} | Johor Bahru Comparison`,
      seoDescription: copy.intro,
      title: copy.title,
      subtitle: copy.subtitle,
      intro: copy.intro,
      recommendation: copy.recommendation,
      dimensions: copy.dimensions,
      labels: locale === "zh"
        ? { dimension: "对比维度", projectA: "项目 A", projectB: "项目 B", note: "说明", recommendation: "建议", viewListings: "浏览房源", viewProject: "查看项目" }
        : { dimension: "Dimension", projectA: "Project A", projectB: "Project B", note: "Note", recommendation: "Recommendation", viewListings: "Browse listings", viewProject: "View project" },
    });
  }
}

console.log("Generated rental intelligence (7×2) and comparisons (3×2)");
