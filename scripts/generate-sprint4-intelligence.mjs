#!/usr/bin/env node
/** Sprint 04 — Johor Property Intelligence Center dossiers (EN/ZH). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const PROJECTS = [
  {
    key: "forest-city",
    slug: "forest-city",
    dbName: "Forest City",
    developerEn: "Country Garden Pacificview — Forest City mixed-use mega-development",
    developerZh: "碧桂园太平洋景——森林城市综合 mega 开发",
    completionEn: "2014–ongoing (phased towers & villa districts)",
    completionZh: "2014 年起分期交付（塔楼与别墅区持续建设）",
    typesEn: ["Studio & 1-bed condos", "2–3 bed seaview units", "Golf & marina districts", "Hotel-branded residences"],
    typesZh: ["Studio 与一房", "两至三房海景", "高尔夫与码头分区", "酒店式公寓"],
    rentalEn: "RM 1,600 – 3,500 / mo",
    rentalZh: "RM 1,600 – 3,500 / 月",
    yieldEn: "3.2 – 4.1% gross",
    yieldZh: "毛收益 3.2 – 4.1%",
    occupancyEn: "65 – 75% rental occupancy (owner-hold heavy)",
    occupancyZh: "租赁入住率约 65–75%（业主自持比例高）",
    tenantEn: "China Owner (hold / self-use / managed rent)",
    tenantZh: "中国业主（持有 / 自用 / 托管出租）",
    prosEn: ["Resort-scale amenities (golf, marina, hotels)", "International brand visibility", "Strong fit for owner-management revenue", "Large unit inventory for buyers"],
    prosZh: ["度假级配套（高尔夫、码头、酒店）", "国际品牌知名度", "适合业主托管服务收入", "房源供应量大"],
    consEn: ["Weak local JB tenant pool", "Long void periods without PM support", "Distance from CIQ / JB CBD", "Speculative secondary market volatility"],
    consZh: ["本地新山租客池弱", "无托管时空置期长", "距关卡 / 新山市区远", "二手市场波动较大"],
    score: 42,
  },
  {
    key: "rf-princess-cove",
    slug: "rf-princess-cove",
    dbName: "R&F Princess Cove",
    developerEn: "R&F Properties (Guangzhou) — premium Causeway-adjacent waterfront",
    developerZh: "富力地产（广州）——近关卡 premium 滨海项目",
    completionEn: "2018–2023 (Phase 1 & 2, CIQ-linked towers)",
    completionZh: "2018–2023（一期二期，近关卡塔楼）",
    typesEn: ["1-bed CIQ view", "2-bed commuter units", "3-bed family layouts", "Sky villa typologies"],
    typesZh: ["一房关卡景", "两房通勤单元", "三房家庭户型", "Sky Villa 类型"],
    rentalEn: "RM 2,200 – 4,500 / mo",
    rentalZh: "RM 2,200 – 4,500 / 月",
    yieldEn: "4.5 – 5.8% gross",
    yieldZh: "毛收益 4.5 – 5.8%",
    occupancyEn: "85 – 92% (strong commuter demand)",
    occupancyZh: "入住率 85–92%（通勤需求强）",
    tenantEn: "Singapore Commuter & cross-border professionals",
    tenantZh: "新加坡通勤族与跨境白领",
    prosEn: ["Walking distance culture to CIQ", "Highest SG footfall in JB condo market", "Fast re-let on 1-bed stock", "Premium facilities support rent levels"],
    prosZh: ["步行文化近关卡", "新山公寓新加坡客流最高", "一房再租速度快", "高端配套支撑租金"],
    consEn: ["Higher entry price vs suburban JB", "Strata & maintenance fees elevated", "Competitive supply within R&F phases", "Cross-border policy sensitivity"],
    consZh: ["入场价高于新山郊区", "管理费较高", "富力内部同业竞争", "跨境政策敏感"],
    score: 88,
  },
  {
    key: "danga-bay",
    slug: "danga-bay",
    dbName: "Danga Bay",
    developerEn: "Multiple developers — Country Garden, Mah Sing, UMLand (mature district)",
    developerZh: "多开发商——碧桂园、Mah Sing、UMLand 等（成熟片区）",
    completionEn: "2008–2018 (established resale stock)",
    completionZh: "2008–2018（成熟二手库存）",
    typesEn: ["1–2 bed affordable condos", "3-bed family units", "Serviced apartment stock", "Waterfront & city-view towers"],
    typesZh: ["一至两房经济公寓", "三房家庭单位", "服务式公寓", "海景与城市景塔楼"],
    rentalEn: "RM 1,400 – 2,800 / mo",
    rentalZh: "RM 1,400 – 2,800 / 月",
    yieldEn: "5.0 – 6.2% gross",
    yieldZh: "毛收益 5.0 – 6.2%",
    occupancyEn: "78 – 85% (mature tenant base)",
    occupancyZh: "入住率 78–85%（成熟租客群）",
    tenantEn: "Local Family & yield-focused investors",
    tenantZh: "本地家庭与收益型投资者",
    prosEn: ["Proven rental history", "Lower entry vs R&F / FC", "Tourism & waterfront lifestyle", "Wide resale liquidity"],
    prosZh: ["租赁历史成熟", "入场价低于富力 / 森林城市", "旅游与滨水生活", "二手流动性好"],
    consEn: ["Ageing stock in some blocks", "Management quality varies by building", "Lower rent growth ceiling", "Competition from newer Iskandar stock"],
    consZh: ["部分楼栋房龄较老", "管理质量因楼而异", "租金增长天花板较低", "受依斯干达新盘竞争"],
    score: 68,
  },
  {
    key: "bukit-indah",
    slug: "bukit-indah",
    dbName: "Bukit Indah",
    developerEn: "Multiple — EcoWorld, Scientex, Boon Lay (AEON-linked township)",
    developerZh: "多开发商——EcoWorld、Scientex、Boon Lay 等（近 AEON 城镇）",
    completionEn: "2010–2022 (ongoing infill condos)",
    completionZh: "2010–2022（持续补充公寓）",
    typesEn: ["2-bed family condos", "3-bed long-term lease units", "Suburban low-rise blocks", "Near AEON & Second Link access"],
    typesZh: ["两房家庭公寓", "三房长租单位", "郊区低密楼栋", "近 AEON 与第二通道"],
    rentalEn: "RM 1,800 – 3,200 / mo",
    rentalZh: "RM 1,800 – 3,200 / 月",
    yieldEn: "4.8 – 5.5% gross",
    yieldZh: "毛收益 4.8 – 5.5%",
    occupancyEn: "88 – 94% (family stability)",
    occupancyZh: "入住率 88–94%（家庭稳定）",
    tenantEn: "Local Family — schools, AEON, long-term leases",
    tenantZh: "本地家庭——学区、AEON、长租",
    prosEn: ["Top local demand score (5/5)", "Short void periods", "Family tenant loyalty", "Mature retail & transport"],
    prosZh: ["本地需求评分最高（5/5）", "空置期短", "家庭租客粘性强", "零售与交通成熟"],
    consEn: ["Lower headline rent vs Mount Austin", "Suburban not waterfront", "Limited SG commuter appeal", "New supply in adjacent townships"],
    consZh: [" headline 租金低于奥斯汀山", "非滨海郊区", "新加坡通勤吸引力有限", "邻近城镇有新供应"],
    score: 86,
  },
  {
    key: "mount-austin",
    slug: "mount-austin",
    dbName: "Mount Austin",
    developerEn: "Multiple — Hao Yuan, Tropika, Pulai Spring developers",
    developerZh: "多开发商——浩源、Tropika、Pulai Spring 等",
    completionEn: "2012–2024 (high-churn suburban condos)",
    completionZh: "2012–2024（高周转郊区公寓）",
    typesEn: ["1-bed singles/couples", "2-bed JB professionals", "3-bed small families", "Commercial-linked towers"],
    typesZh: ["一房单身 / 情侣", "两房新山白领", "三房小家庭", "商业联动塔楼"],
    rentalEn: "RM 2,000 – 3,800 / mo",
    rentalZh: "RM 2,000 – 3,800 / 月",
    yieldEn: "5.2 – 6.0% gross",
    yieldZh: "毛收益 5.2 – 6.0%",
    occupancyEn: "90 – 95% (JB #1 rental hotspot)",
    occupancyZh: "入住率 90–95%（新山租赁热点）",
    tenantEn: "Local Family & JB working professionals",
    tenantZh: "本地家庭与新山在职专业人士",
    prosEn: ["Highest suburban rent velocity", "Broad tenant pool", "Strong 2-bed furnished demand", "Active resale & rental market"],
    prosZh: ["郊区租金周转最快", "租客池最广", "两房装修需求强", "租售市场活跃"],
    consEn: ["Traffic peak-hour congestion", "Quality varies by developer", "Not SG commuter core", "Competition among similar blocks"],
    consZh: ["高峰交通拥堵", "开发商品质参差", "非新加坡通勤核心", "同类楼盘竞争激烈"],
    score: 91,
  },
  {
    key: "eco-botanic",
    slug: "eco-botanic",
    dbName: "Eco Botanic",
    developerEn: "EcoWorld Development — landscaped Eco township cluster",
    developerZh: "EcoWorld 发展——生态城镇集群",
    completionEn: "2016–2024 (EcoWorld phased launches)",
    completionZh: "2016–2024（EcoWorld 分期推出）",
    typesEn: ["2–3 bed family condos", "Educity-proximity units", "Green township layouts", "Premium EcoWorld finishes"],
    typesZh: ["两至三房家庭公寓", "近教育城单元", "绿色城镇规划", "EcoWorld 装修标准"],
    rentalEn: "RM 2,100 – 3,600 / mo",
    rentalZh: "RM 2,100 – 3,600 / 月",
    yieldEn: "4.6 – 5.4% gross",
    yieldZh: "毛收益 4.6 – 5.4%",
    occupancyEn: "82 – 88% (family & educity demand)",
    occupancyZh: "入住率 82–88%（家庭与教育城需求）",
    tenantEn: "Local Family — school zones & green living",
    tenantZh: "本地家庭——学区与绿色生活",
    prosEn: ["EcoWorld brand & landscaping", "Educity / Medini employment spillover", "Family long-term leases", "Newer stock vs Danga Bay"],
    prosZh: ["EcoWorld 品牌与绿化", "教育城 / 美迪尼就业外溢", "家庭长租", "比丹加湾更新"],
    consEn: ["Premium vs Medini entry price", "Still maturing tenant pool", "Distance from CIQ", "Dependent on Iskandar job growth"],
    consZh: ["入场价高于美迪尼", "租客池仍在成熟", "距关卡较远", "依赖依斯干达就业增长"],
    score: 79,
  },
  {
    key: "medini",
    slug: "medini",
    dbName: "Medini",
    developerEn: "Multiple — UMLand, Sunway, Medini Iskandar developers",
    developerZh: "多开发商——UMLand、Sunway、美迪尼依斯干达等",
    completionEn: "2014–2023 (Nusajaya growth corridor)",
    completionZh: "2014–2023（努沙再也增长走廊）",
    typesEn: ["1–2 bed commuter units", "Family 3-bed near Legoland", "Iskandar Puteri condos", "Regional tenant layouts"],
    typesZh: ["一至两房通勤单元", "近乐高乐园三房", "依斯干达公主城公寓", "区域租客户型"],
    rentalEn: "RM 1,600 – 3,000 / mo",
    rentalZh: "RM 1,600 – 3,000 / 月",
    yieldEn: "4.4 – 5.6% gross",
    yieldZh: "毛收益 4.4 – 5.6%",
    occupancyEn: "80 – 87% (commuter + regional workers)",
    occupancyZh: "入住率 80–87%（通勤与区域务工）",
    tenantEn: "Singapore Commuter & regional / theme-park workers",
    tenantZh: "新加坡通勤族与区域 / 主题乐园务工",
    prosEn: ["Iskandar infrastructure growth", "Lower entry than R&F", "Legoland & Tuas proximity narrative", "Singapore weekend tenant segment"],
    prosZh: ["依斯干达基建发展", "入场价低于富力", "近乐高 / 大士叙事", "新加坡周末租客群"],
    consEn: ["Less mature than Bukit Indah", "Supply pipeline ongoing", "Yield sensitive to SG border policy", "Mixed building quality"],
    consZh: ["成熟度不及武吉英达", "持续有新供应", "收益受新加坡边境政策影响", "楼宇品质参差"],
    score: 74,
  },
];

const NAMES = {
  en: { "forest-city": "Forest City", "rf-princess-cove": "R&F Princess Cove", "danga-bay": "Danga Bay", "bukit-indah": "Bukit Indah", "mount-austin": "Mount Austin", "eco-botanic": "Eco Botanic", medini: "Medini" },
  zh: { "forest-city": "森林城市", "rf-princess-cove": "富力公主湾", "danga-bay": "丹加湾", "bukit-indah": "武吉英达", "mount-austin": "奥斯汀山", "eco-botanic": "生态植物园", medini: "美迪尼" },
};

function writeJson(p, data) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
}

for (const locale of ["en", "zh"]) {
  const isZh = locale === "zh";
  for (const p of PROJECTS) {
    const name = NAMES[locale][p.key];
    writeJson(path.join(root, `src/lib/i18n/project-intelligence/${locale}/${p.key}.json`), {
      projectKey: p.key,
      projectName: p.dbName,
      slug: p.slug,
      developerProfile: isZh ? p.developerZh : p.developerEn,
      completionYear: isZh ? p.completionZh : p.completionEn,
      propertyTypes: isZh ? p.typesZh : p.typesEn,
      rentalRange: isZh ? p.rentalZh : p.rentalEn,
      yieldEstimate: isZh ? p.yieldZh : p.yieldEn,
      occupancyEstimate: isZh ? p.occupancyZh : p.occupancyEn,
      targetTenant: isZh ? p.tenantZh : p.tenantEn,
      pros: isZh ? p.prosZh : p.prosEn,
      cons: isZh ? p.consZh : p.consEn,
      investmentScore: p.score,
      seoTitle: isZh ? `${name} 投资情报 | 新山物业研究` : `${p.dbName} Investment Intelligence | Johor Research`,
      seoDescription: isZh
        ? `${name}开发商、租金区间、回报率、入住率与投资建议——马来西亚物业网络新山研究中心。`
        : `${p.dbName} developer profile, rental range, yield, occupancy & investment score — Johor Property Intelligence Center.`,
    });
  }

  writeJson(path.join(root, `src/lib/i18n/project-intelligence/${locale}/_hub.json`), {
    seoTitle: isZh ? "项目情报目录 | 新山物业研究" : "Project Intelligence Directory | Johor Research",
    seoDescription: isZh
      ? "7 大新山项目投资评分、租金区间、回报率与目标租客对比。"
      : "Investment scores, rental ranges, yields and tenant profiles for 7 Johor Bahru projects.",
    title: isZh ? "项目情报目录" : "Project Intelligence Directory",
    subtitle: isZh ? "7 大新山住宅项目 — 投资评分与租赁数据" : "7 key Johor Bahru projects — investment scores & rental data",
    intro: isZh
      ? "按投资评分排序，点击查看各项目开发商背景、户型、租金区间、回报率、入住率、优劣势与目标租客。"
      : "Ranked by investment score. Open each dossier for developer profile, property types, rental range, yield, occupancy, pros/cons and target tenant.",
    methodologyTitle: isZh ? "评分方法" : "Scoring methodology",
    methodology: isZh
      ? "投资评分（0–100）综合租赁需求、空置风险、租客池深度、租金增长与跨境政策暴露。仅供研究参考，非投资建议。"
      : "Investment score (0–100) blends rental demand, void risk, tenant pool depth, rent growth and cross-border exposure. Research only — not financial advice.",
    labels: isZh
      ? {
          project: "项目",
          score: "投资评分",
          rentalRange: "租金区间",
          yield: "回报率",
          occupancy: "入住率",
          targetTenant: "目标租客",
          viewDossier: "查看情报",
          developer: "开发商",
          completion: "竣工年份",
          propertyTypes: "户型",
          pros: "优势",
          cons: "劣势",
          backToResearch: "返回研究中心",
          browseListings: "浏览房源",
          viewProject: "项目主页",
          compareProjects: "项目对比",
        }
      : {
          project: "Project",
          score: "Investment score",
          rentalRange: "Rental range",
          yield: "Yield",
          occupancy: "Occupancy",
          targetTenant: "Target tenant",
          viewDossier: "View dossier",
          developer: "Developer",
          completion: "Completion",
          propertyTypes: "Property types",
          pros: "Pros",
          cons: "Cons",
          backToResearch: "Back to Research Center",
          browseListings: "Browse listings",
          viewProject: "Project hub",
          compareProjects: "Compare projects",
        },
  });

  writeJson(path.join(root, `src/lib/i18n/project-intelligence/${locale}/_research.json`), {
    seoTitle: isZh ? "新山物业研究中心 | 柔佛投资情报" : "Johor Property Intelligence Center | Malaysia Research",
    seoDescription: isZh
      ? "新山 7 大项目开发商、租金、回报率、入住率与投资评分——Forest City、富力公主湾、丹加湾、武吉英达、奥斯汀山、生态植物园、美迪尼。"
      : "Research hub for Forest City, R&F Princess Cove, Danga Bay, Bukit Indah, Mount Austin, Eco Botanic & Medini — yields, occupancy & investment scores.",
    title: isZh ? "新山物业研究中心" : "Johor Property Intelligence Center",
    subtitle: isZh ? "权威市场情报 · 7 大项目 · 中英双语" : "Authoritative market intelligence · 7 projects · EN/ZH",
    intro: isZh
      ? "马来西亚物业网络研究中心为新山及依斯干达投资者提供结构化项目情报：开发商背景、竣工年份、户型、租金区间、回报率、入住率、目标租客、优劣势与投资评分。"
      : "Malaysia Property Network Research Center delivers structured dossiers for Johor Bahru & Iskandar investors — developer profiles, completion timelines, property types, rental ranges, yields, occupancy, tenant fit, pros/cons and investment scores.",
    pillars: isZh
      ? [
          { title: "市场数据", desc: "租金区间、回报率与入住率来自 Sprint 03 运营库存与区域成交基准。" },
          { title: "项目深度", desc: "7 大项目独立情报档案，含开发商与优劣势分析。" },
          { title: "投资评分", desc: "0–100 综合评分，便于跨项目比较与决策支持。" },
          { title: "业主服务", desc: "情报与托管、巡检、看楼预约服务联动，非纯信息站。" },
        ]
      : [
          { title: "Market data", desc: "Rental ranges, yields and occupancy grounded in Sprint 03 inventory and district benchmarks." },
          { title: "Project depth", desc: "Standalone dossiers for 7 key projects with developer and pros/cons analysis." },
          { title: "Investment scoring", desc: "0–100 composite score for cross-project comparison and decision support." },
          { title: "Owner services", desc: "Intelligence linked to management, inspection and viewing services — not a lead farm." },
        ],
    ctaTitle: isZh ? "开始研究" : "Start researching",
    ctaDesc: isZh ? "浏览项目情报目录或对比热门项目组合。" : "Browse the project intelligence directory or compare popular project pairs.",
    labels: isZh
      ? {
          viewDirectory: "项目情报目录",
          topProjects: "投资评分排行",
          compare: "项目对比",
          listings: "浏览房源",
          methodology: "方法论",
          notAdvice: "以上内容仅供研究，不构成投资建议。",
        }
      : {
          viewDirectory: "Project intelligence directory",
          topProjects: "Investment score rankings",
          compare: "Compare projects",
          listings: "Browse listings",
          methodology: "Methodology",
          notAdvice: "For research purposes only — not financial advice.",
        },
  });
}

fs.mkdirSync(path.join(root, "OPERATIONS/sprint-04"), { recursive: true });
fs.writeFileSync(
  path.join(root, "OPERATIONS/sprint-04/README.md"),
  `# Operational Sprint 04 — Johor Property Intelligence Center

## Routes

| Path | Purpose |
|------|---------|
| \`/research\` | Intelligence Center hub |
| \`/project-intelligence\` | Project directory (ranked table) |
| \`/project-intelligence/[slug]\` | Individual project dossier |

## Generate

\`\`\`bash
node scripts/generate-sprint4-intelligence.mjs
\`\`\`

## Projects (7)

Forest City, R&F Princess Cove, Danga Bay, Bukit Indah, Mount Austin, Eco Botanic, Medini

Each dossier includes: developer profile, completion year, property types, rental range, yield, occupancy, target tenant, pros, cons, investment score (0–100).
`,
);

console.log("Generated Sprint 04 intelligence for", PROJECTS.length, "projects × 2 locales");
