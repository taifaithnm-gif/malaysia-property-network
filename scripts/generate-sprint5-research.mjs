#!/usr/bin/env node
/** Sprint 05 — methodology, Johor rental index, market reports (EN/ZH). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function writeJson(p, data) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
}

const INDEX_PROJECTS = [
  { key: "mount-austin", name: "Mount Austin", avgRent: 3015, range: "RM 2,000 – 3,800", yield: "5.2 – 6.0%", occupancy: "90 – 95%" },
  { key: "rf-princess-cove", name: "R&F Princess Cove", avgRent: 3195, range: "RM 2,200 – 4,500", yield: "4.5 – 5.8%", occupancy: "85 – 92%" },
  { key: "bukit-indah", name: "Bukit Indah", avgRent: 2725, range: "RM 1,800 – 3,200", yield: "4.8 – 5.5%", occupancy: "88 – 94%" },
  { key: "eco-botanic", name: "Eco Botanic", avgRent: 3115, range: "RM 2,100 – 3,600", yield: "4.6 – 5.4%", occupancy: "82 – 88%" },
  { key: "medini", name: "Medini", avgRent: 2400, range: "RM 1,600 – 3,000", yield: "4.4 – 5.6%", occupancy: "80 – 87%" },
  { key: "danga-bay", name: "Danga Bay", avgRent: 2100, range: "RM 1,400 – 2,800", yield: "5.0 – 6.2%", occupancy: "78 – 85%" },
  { key: "forest-city", name: "Forest City", avgRent: 2440, range: "RM 1,600 – 3,500", yield: "3.2 – 4.1%", occupancy: "65 – 75%" },
];

for (const locale of ["en", "zh"]) {
  const isZh = locale === "zh";

  writeJson(path.join(root, `src/lib/i18n/research/${locale}/methodology.json`), {
    seoTitle: isZh ? "投资评分方法论 | 新山物业研究" : "Investment Score Methodology | Johor Research",
    seoDescription: isZh
      ? "马来西亚物业网络如何评估租赁需求、回报率、入住率、流动性与未来增长，形成 0–100 投资评分。"
      : "How Malaysia Property Network scores rental demand, yield, occupancy, liquidity and future growth into a 0–100 investment score.",
    title: isZh ? "投资评分方法论" : "Investment Score Methodology",
    subtitle: isZh ? "五维框架 · 透明研究 · 非投资建议" : "Five dimensions · transparent research · not financial advice",
    intro: isZh
      ? "我们的 0–100 投资评分综合五项市场维度，数据来自 Sprint 运营库存、公开成交区间与区域租赁基准。每项维度权重因项目类型而异。"
      : "Our 0–100 investment score combines five market dimensions using operational inventory, published transaction bands and district rental benchmarks. Weights vary by project type.",
    dimensions: [
      {
        id: "rental-demand",
        title: isZh ? "租赁需求 (Rental Demand)" : "Rental Demand",
        weight: "25%",
        summary: isZh ? "租户池深度、再租速度与跨境通勤暴露。" : "Tenant pool depth, re-let velocity and cross-border commuter exposure.",
        body: isZh
          ? "评估本地家庭、新加坡通勤族或海外业主托管等主力客群规模。Mount Austin、Bukit Indah、R&F 评分最高；Forest City 以业主托管需求为主，本地租赁需求较弱。"
          : "Measures primary tenant segments — local families, Singapore commuters, or overseas owner-management. Mount Austin, Bukit Indah and R&F score highest; Forest City is owner-management weighted with weaker local rental demand.",
      },
      {
        id: "yield",
        title: isZh ? "回报率 (Yield)" : "Yield",
        weight: "25%",
        summary: isZh ? "毛租金回报率相对入场价与维护成本。" : "Gross rental yield vs entry price and carrying costs.",
        body: isZh
          ? "基于项目平均租金与典型二手入场价推算毛收益区间。Danga Bay、Mount Austin 毛收益较高；Forest City 因入场价与空置期，毛收益偏低。"
          : "Derived from average rent and typical resale entry bands. Danga Bay and Mount Austin show stronger gross yields; Forest City is lower due to entry price and void risk.",
      },
      {
        id: "occupancy",
        title: isZh ? "入住率 (Occupancy)" : "Occupancy",
        weight: "20%",
        summary: isZh ? "典型空置期与有效入住率。" : "Typical void periods and effective occupancy.",
        body: isZh
          ? "以周计空置期换算有效入住率。通勤盘（R&F）与家庭盘（Bukit Indah、Mount Austin）空置最短；Forest City 空置期最长。"
          : "Void weeks converted to effective occupancy. Commuter (R&F) and family (Bukit Indah, Mount Austin) districts show shortest voids; Forest City longest.",
      },
      {
        id: "liquidity",
        title: isZh ? "流动性 (Liquidity)" : "Liquidity",
        weight: "15%",
        summary: isZh ? "二手成交量、挂牌周转与银行按揭接受度。" : "Resale volume, listing turnover and mortgage acceptance.",
        body: isZh
          ? "成熟社区（Danga Bay、Bukit Indah）流动性较好；大型度假盘（Forest City）周转慢但适合长期持有与托管服务。"
          : "Mature districts (Danga Bay, Bukit Indah) resell faster; resort-scale Forest City turns slower but suits long-hold owner-management.",
      },
      {
        id: "future-growth",
        title: isZh ? "未来增长 (Future Growth)" : "Future Growth",
        weight: "15%",
        summary: isZh ? "基建、RTS、依斯干达就业与供应 pipeline。" : "Infrastructure, RTS, Iskandar jobs and supply pipeline.",
        body: isZh
          ? "Medini、Eco Botanic 受益于依斯干达走廊；R&F 受 RTS / 关卡政策影响；Forest City 增长叙事偏长期生活方式而非本地租赁。"
          : "Medini and Eco Botanic benefit from Iskandar corridor growth; R&F tied to RTS / border policy; Forest City growth narrative is lifestyle-long-term vs local rental.",
      },
    ],
    scoreBands: isZh
      ? [
          { range: "80 – 100", label: "强租赁投资", desc: "高需求、短空置、流动性好" },
          { range: "65 – 79", label: "稳健", desc: "平衡收益与风险" },
          { range: "50 – 64", label: "选择性", desc: "需定价与装修策略" },
          { range: "0 – 49", label: " niche / 托管导向", desc: "业主服务优于纯租赁 velocity" },
        ]
      : [
          { range: "80 – 100", label: "Strong rental investment", desc: "High demand, short void, good liquidity" },
          { range: "65 – 79", label: "Solid", desc: "Balanced yield and risk" },
          { range: "50 – 64", label: "Selective", desc: "Needs pricing and furnishing strategy" },
          { range: "0 – 49", label: "Niche / management-led", desc: "Owner services over rental velocity" },
        ],
    labels: isZh
      ? { weight: "权重", scoreBands: "评分区间", backToResearch: "返回研究中心", rentalIndex: "新山租赁指数", projectIntelligence: "项目情报" }
      : { weight: "Weight", scoreBands: "Score bands", backToResearch: "Back to Research", rentalIndex: "Johor Rental Index", projectIntelligence: "Project intelligence" },
  });

  const names = isZh
    ? { "mount-austin": "奥斯汀山", "rf-princess-cove": "富力公主湾", "bukit-indah": "武吉英达", "eco-botanic": "生态植物园", medini: "美迪尼", "danga-bay": "丹加湾", "forest-city": "森林城市" }
    : Object.fromEntries(INDEX_PROJECTS.map((p) => [p.key, p.name]));

  writeJson(path.join(root, `src/lib/i18n/research/${locale}/rental-index.json`), {
    seoTitle: isZh ? "新山租赁指数 | 7 大项目租金数据" : "Johor Rental Index | 7 Project Rental Data",
    seoDescription: isZh
      ? "Forest City、富力公主湾、丹加湾、武吉英达、奥斯汀山、生态植物园、美迪尼平均租金、区间、回报率与入住率。"
      : "Average rent, rental range, yield and occupancy for 7 Johor Bahru projects — updated from operational inventory.",
    title: isZh ? "新山租赁指数" : "Johor Rental Index",
    subtitle: isZh ? "2026 Q2 基准 · 7 大项目" : "2026 Q2 benchmark · 7 projects",
    intro: isZh
      ? "指数基于 Sprint 03/04 运营库存与区域成交基准，每季度复核。用于项目对比与租赁定价参考。"
      : "Index grounded in Sprint 03/04 operational inventory and district transaction bands, reviewed quarterly. Use for project comparison and pricing reference.",
    updated: "2026-06-20",
    projects: INDEX_PROJECTS.map((p) => ({
      key: p.key,
      slug: p.key,
      name: names[p.key],
      averageRent: isZh ? `RM ${p.avgRent.toLocaleString()}/月` : `RM ${p.avgRent.toLocaleString()}/mo`,
      averageRentValue: p.avgRent,
      rentalRange: p.range,
      yield: p.yield,
      occupancy: p.occupancy,
    })),
    labels: isZh
      ? { project: "项目", averageRent: "平均租金", rentalRange: "租金区间", yield: "回报率", occupancy: "入住率", methodology: "评分方法论", viewDossier: "项目情报" }
      : { project: "Project", averageRent: "Average rent", rentalRange: "Rental range", yield: "Yield", occupancy: "Occupancy", methodology: "Methodology", viewDossier: "Intelligence dossier" },
  });

  const reports = [
    {
      key: "johor-rental-market",
      slug: "research/reports/johor-rental-market",
      titleEn: "Johor Rental Market Report",
      titleZh: "新山租赁市场报告",
      subtitleEn: "Q2 2026 — family, commuter & yield districts",
      subtitleZh: "2026 Q2 — 家庭、通勤与收益型社区",
      introEn: "Overview of Johor Bahru rental velocity across 7 tracked projects. Mount Austin and Bukit Indah lead local family demand; R&F dominates commuter premium.",
      introZh: "新山 7 大跟踪项目租赁周转概览。奥斯汀山与武吉英达领先本地家庭需求；富力公主湾主导通勤溢价。",
      sectionsEn: [
        { title: "Market snapshot", paragraphs: ["300 rental listings tracked across 7 projects.", "Average rent spans RM 2,100–3,200 for 2-bed family stock.", "Void periods shortest in Mount Austin (2–4 weeks) and R&F (2–4 weeks)."] },
        { title: "Tenant mix", paragraphs: ["Local Family: 45% of portfolio intent.", "Singapore Commuter: 28%.", "China Owner / management: 27%."] },
        { title: "Outlook", paragraphs: ["RTS completion supports R&F and Medini commuter narratives.", "Suburban family districts remain supply-constrained for furnished 2-bed."] },
      ],
      sectionsZh: [
        { title: "市场概览", paragraphs: ["7 大项目共跟踪 300 条租赁库存。", "两房家庭盘均租约 RM 2,100–3,200。", "奥斯汀山与富力空置期最短（2–4 周）。"] },
        { title: "租客结构", paragraphs: ["本地家庭约占 45%。", "新加坡通勤族约 28%。", "中国业主 / 托管约 27%。"] },
        { title: "展望", paragraphs: ["RTS 通车利好富力与美迪尼通勤叙事。", "郊区家庭盘装修两房供应仍偏紧。"] },
      ],
    },
    {
      key: "singapore-commuter-housing",
      slug: "research/reports/singapore-commuter-housing",
      titleEn: "Singapore Commuter Housing Report",
      titleZh: "新加坡通勤住房报告",
      subtitleEn: "CIQ, RTS & Iskandar cross-border rental",
      subtitleZh: "关卡、RTS 与依斯干达跨境租赁",
      introEn: "Analysis for Singapore-based tenants and investors targeting JB commuter stock — R&F Princess Cove, Medini and selected Mount Austin blocks.",
      introZh: "面向新加坡租客与投资者的新山通勤房源分析——富力公主湾、美迪尼及部分奥斯汀山楼栋。",
      sectionsEn: [
        { title: "Commuter corridors", paragraphs: ["R&F Princess Cove: highest CIQ footfall, RM 2,200–4,500 rent band.", "Medini: lower entry, Legoland / Tuas narrative, RM 1,600–3,000.", "Weekend and flex-work patterns post-2024 border normalization."] },
        { title: "Pricing drivers", paragraphs: ["1-bed furnished CIQ view commands premium.", "Car park and management responsiveness are top tenant filters.", "SGD–MYR spread supports yield arbitrage for investors."] },
        { title: "Risks", paragraphs: ["Border policy and queue times affect tenant retention.", "Oversupply in new Medini phases — price to recent transactions."] },
      ],
      sectionsZh: [
        { title: "通勤走廊", paragraphs: ["富力公主湾：关卡客流最高，租金 RM 2,200–4,500。", "美迪尼：入场较低，RM 1,600–3,000。", "2024 年后跨境灵活办公与周末居住模式增加。"] },
        { title: "定价因素", paragraphs: ["一房装修关卡景溢价明显。", "车位与管理响应是租客首要筛选。", "新马汇率差支撑投资者收益套利。"] },
        { title: "风险", paragraphs: ["边境政策与排队时间影响租客留存。", "美迪尼新盘供应增加——定价需参考近期成交。"] },
      ],
    },
    {
      key: "forest-city-owner",
      slug: "research/reports/forest-city-owner",
      titleEn: "Forest City Owner Report",
      titleZh: "森林城市业主报告",
      subtitleEn: "Overseas owner-management & rental reality",
      subtitleZh: "海外业主托管与租赁现实",
      introEn: "Dedicated intelligence for China and overseas Forest City owners — rental velocity, void risk, and when owner-management outperforms pure rental plays.",
      introZh: "面向中国与海外森林城市业主的专项情报——租赁周转、空置风险，以及何时托管优于纯租赁策略。",
      sectionsEn: [
        { title: "Owner profile", paragraphs: ["Primary holder: China Owner — self-use, holiday, or managed rent.", "Local JB tenant pool is limited; marketing requires Chinese channels.", "Average rent ~RM 2,440; void 8–14 weeks without active management."] },
        { title: "Service fit", paragraphs: ["Inspection, key-holding and PM revenue align with owner needs.", "Rental-only investors should compare yield vs carrying cost carefully.", "Golf / marina amenities support lifestyle marketing, not commuter demand."] },
        { title: "Recommendation", paragraphs: ["Cap FC rental inventory acquisition; prioritize PM relationships.", "Price against same-tower recent rents, not JB averages.", "Pair listings with Forest City media center for due diligence."] },
      ],
      sectionsZh: [
        { title: "业主画像", paragraphs: ["主要持有人：中国业主——自用、度假或托管出租。", "本地新山租客池有限；营销需中文渠道。", "均租约 RM 2,440；无活跃管理时空置 8–14 周。"] },
        { title: "服务匹配", paragraphs: ["巡检、钥匙托管与 PM 收入契合业主需求。", "纯租赁投资者需仔细比较收益与持有成本。", "高尔夫 / 码头配套支撑生活方式营销，非通勤需求。"] },
        { title: "建议", paragraphs: ["控制 FC 租赁库存收购；优先 PM 关系。", "定价参考同塔近期租金，非新山均价。", "房源配森林城市图库便于尽调。"] },
      ],
    },
  ];

  for (const r of reports) {
    writeJson(path.join(root, `src/lib/i18n/research/${locale}/${r.key}.json`), {
      key: r.key,
      slug: r.slug,
      seoTitle: isZh ? `${r.titleZh} | 新山物业研究` : `${r.titleEn} | Johor Research`,
      seoDescription: isZh ? r.introZh : r.introEn,
      title: isZh ? r.titleZh : r.titleEn,
      subtitle: isZh ? r.subtitleZh : r.subtitleEn,
      intro: isZh ? r.introZh : r.introEn,
      published: "2026-06-20",
      sections: isZh ? r.sectionsZh : r.sectionsEn,
      labels: isZh
        ? { backToResearch: "返回研究中心", allReports: "全部报告", rentalIndex: "租赁指数", browseListings: "浏览房源" }
        : { backToResearch: "Back to Research", allReports: "All reports", rentalIndex: "Rental index", browseListings: "Browse listings" },
    });
  }
}

fs.mkdirSync(path.join(root, "OPERATIONS/sprint-05"), { recursive: true });
fs.writeFileSync(
  path.join(root, "OPERATIONS/sprint-05/README.md"),
  `# Operational Sprint 05 — Trust & Authority

## Routes

| Path | Content |
|------|---------|
| \`/research/methodology\` | Investment score methodology (5 dimensions) |
| \`/research/rental-index\` | Johor Rental Index — 7 projects |
| \`/research/reports/johor-rental-market\` | Johor Rental Market Report |
| \`/research/reports/singapore-commuter-housing\` | Singapore Commuter Housing Report |
| \`/research/reports/forest-city-owner\` | Forest City Owner Report |

## Generate

\`\`\`bash
node scripts/generate-sprint5-research.mjs
\`\`\`

## Trust layer

Homepage trust stats use **real** listing count (Supabase), project count (7), and service catalog count — no estimated viewing or gallery counters.
`,
);

console.log("Generated Sprint 05 research content (methodology, rental index, 3 reports × 2 locales)");
