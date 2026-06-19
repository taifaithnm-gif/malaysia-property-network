import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../src/lib/i18n/project-profiles");

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
    altEn: "High-rise residential towers",
    altZh: "高层住宅塔楼",
  },
  {
    src: "https://images.unsplash.com/photo-1513584684374-8bab748f235c?w=800&q=80",
    altEn: "Waterfront condominium view",
    altZh: "海滨公寓景观",
  },
  {
    src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    altEn: "Modern apartment interior",
    altZh: "现代公寓室内",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    altEn: "Residential pool and facilities",
    altZh: "住宅泳池与设施",
  },
  {
    src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe5e?w=800&q=80",
    altEn: "Coastal development landscape",
    altZh: "滨海开发项目",
  },
];

const PROJECTS = {
  "forest-city": {
    en: {
      title: "Forest City",
      subtitle: "Integrated resort city · Iskandar Malaysia",
      intro:
        "Forest City is a large-scale coastal development in Gelang Patah, Johor Bahru. This profile summarises public project information for overseas owners evaluating management, rental, or resale options.",
      seoTitle: "Forest City Project Profile | Johor Bahru Property",
      seoDescription:
        "Forest City project profile: location, property types, facilities, and owner services for overseas investors in Johor Bahru.",
      seoKeywords:
        "Forest City profile, Forest City Johor, 森林城市, Iskandar Malaysia property, Forest City condo",
      whatsappMessage: "Hi, I am researching Forest City and would like to discuss owner services.",
      guideSlug: "forest-city",
      map: { lat: 1.3392, lng: 103.5931, labelEn: "Forest City, Gelang Patah, Johor Bahru", labelZh: "森林城市，振林山，新山" },
      factsEn: [
        ["Location", "Gelang Patah, Iskandar Malaysia, Johor"],
        ["Region", "Southern Johor coast facing Singapore Strait"],
        ["Development Type", "Integrated resort city (residential, commercial, leisure)"],
        ["Typical Units", "Studio to 3+ bedroom strata apartments"],
        ["Tenure", "Freehold / leasehold varies by phase — verify SPA"],
        ["Management", "Phase-specific JMB / MC and on-site management office"],
        ["Distance to Singapore", "Approx. 1–2 hours by road depending on traffic"],
        ["Owner Profile", "Overseas Chinese investors, regional buyers, holiday owners"],
      ],
      factsZh: [
        ["位置", "柔佛依斯干达经济特区，振林山"],
        ["区域", "新山南部海岸，面向新加坡海峡"],
        ["项目类型", "综合度假城市（住宅、商业、休闲）"],
        ["常见户型", "Studio 至三房及以上分层公寓"],
        ["产权", "各期别为永久或租赁产权——以买卖合约为准"],
        ["管理", "分期共管机构及现场管理处"],
        ["距新加坡", "车程约 1–2 小时（视交通而定）"],
        ["业主构成", "海外华人投资者、区域买家、度假型业主"],
      ],
      propertyTypesEn: [
        { name: "Studio / 1-Bedroom", desc: "Compact units suited to singles or holiday stays. Popular for short-term rental where permitted by by-laws." },
        { name: "2-Bedroom", desc: "Most common investor layout. Balances rental demand with manageable furnishing costs for overseas owners." },
        { name: "3-Bedroom & Larger", desc: "Family-oriented layouts with sea or golf views. Often used for long-stay tenants or owner holidays." },
      ],
      propertyTypesZh: [
        { name: "Studio / 一房", desc: "紧凑户型，适合单身或度假短住。在社区规例允许时可作短租。" },
        { name: "两房", desc: "最常见投资户型，租赁需求与装修成本较为平衡。" },
        { name: "三房及以上", desc: "家庭型大单位，多海景或高尔夫景观，适合长租或业主自用。" },
      ],
      facilitiesEn: [
        "Swimming pools and club facilities",
        "Landscaped gardens and coastal walkways",
        "Retail and F&B within development",
        "Golf resort access (nearby)",
        "24-hour security and gated access",
        "Parking and visitor management",
        "Shuttle and transport links (subject to phase)",
      ],
      facilitiesZh: [
        "泳池及会所设施",
        "园林及滨海步道",
        "项目内零售与餐饮",
        "邻近高尔夫度假村",
        "24 小时安保及门禁",
        "停车及访客管理",
        "穿梭交通（视期别而定）",
      ],
    },
    zh: {
      title: "森林城市 Forest City",
      subtitle: "综合度假城市 · 依斯干达马来西亚",
      intro:
        "森林城市位于新山振林山的大型滨海项目。本简介汇总公开项目信息，供海外业主评估托管、出租或出售方案。",
      seoTitle: "森林城市项目简介 | 新山房产",
      seoDescription: "森林城市项目简介：位置、户型、配套及海外业主服务信息。",
      seoKeywords: "森林城市, 森林城市新山, Forest City, 依斯干达房产",
      whatsappMessage: "您好，我在了解森林城市，想咨询业主服务。",
    },
  },
  "rf-princess-cove": {
    en: {
      title: "R&F Princess Cove",
      subtitle: "Waterfront living · Near Johor-Singapore Causeway",
      intro:
        "R&F Princess Cove is a flagship waterfront development in Tanjung Puteri, Johor Bahru, minutes from the Causeway. This profile covers public facts for owners and buyers researching CIQ-area property.",
      seoTitle: "R&F Princess Cove Project Profile | Johor Bahru",
      seoDescription:
        "R&F Princess Cove project profile: location near CIQ, property types, facilities, and owner services for overseas and Singapore buyers.",
      seoKeywords:
        "R&F Princess Cove, RF Princess Cove profile, 富力公主湾, CIQ property Johor, waterfront condo JB",
      whatsappMessage: "Hi, I am researching R&F Princess Cove and would like to discuss owner services.",
      guideSlug: "rf-princess-cove",
      map: { lat: 1.4565, lng: 103.7644, labelEn: "R&F Princess Cove, Tanjung Puteri, Johor Bahru", labelZh: "富力公主湾，丹戎布蒂里，新山" },
      factsEn: [
        ["Location", "Tanjung Puteri, Johor Bahru (near CIQ)"],
        ["Developer", "R&F Group (publicly marketed phases)"],
        ["Development Type", "Waterfront mixed residential & commercial"],
        ["Typical Units", "1 to 4+ bedroom condominiums"],
        ["Tenure", "Freehold strata — verify per unit SPA"],
        ["Management", "Phase management office and JMB / MC"],
        ["Distance to CIQ", "Approx. 5–15 minutes by car off-peak"],
        ["Owner Profile", "Singapore buyers, China/HK investors, cross-border renters"],
      ],
      factsZh: [
        ["位置", "新山丹戎布蒂里（近通关）"],
        ["开发商", "富力集团（公开销售期别）"],
        ["项目类型", "滨水混合住宅与商业"],
        ["常见户型", "一至四房及以上公寓"],
        ["产权", "永久分层产权——以单位合约为准"],
        ["管理", "分期管理处及共管机构"],
        ["距通关", "非高峰车程约 5–15 分钟"],
        ["业主构成", "新加坡买家、中港投资者、跨境租客"],
      ],
      propertyTypesEn: [
        { name: "1-Bedroom", desc: "Strong weekend and short-stay demand from Singapore visitors. Requires efficient furnishing and key management." },
        { name: "2-Bedroom", desc: "Popular with small families and commuters. Competitive rental market near CIQ." },
        { name: "3-Bedroom+ / Penthouse", desc: "Premium segment with strait views. Higher furnishing investment, suited to expat and executive tenants." },
      ],
      propertyTypesZh: [
        { name: "一房", desc: "新加坡访客周末及短住需求旺盛，需高效配置家具与钥匙管理。" },
        { name: "两房", desc: "小家庭及通勤租客常见，通关区租赁竞争活跃。" },
        { name: "三房+/Penthouse", desc: "海峡景观高端单位，装修投入较高，适合外派及高管租客。" },
      ],
      facilitiesEn: [
        "Infinity pools and sky facilities",
        "Gym, sauna, and function rooms",
        "Waterfront promenade",
        "Retail mall and dining (on-site / nearby)",
        "Multi-tier security",
        "Basement parking",
        "Direct access routes toward CIQ",
      ],
      facilitiesZh: [
        "无边泳池及空中设施",
        "健身房、桑拿及功能室",
        "滨海步道",
        "商场及餐饮（项目内/周边）",
        "多级安保",
        "地下停车",
        "通往通关方向便捷路线",
      ],
    },
    zh: {
      title: "富力公主湾 R&F Princess Cove",
      subtitle: "滨水生活 · 近新马通关",
      intro:
        "富力公主湾是新山丹戎布蒂里旗舰滨水项目，距通关数分钟。本简介为研究通关区房产的业主与买家提供公开信息。",
      seoTitle: "富力公主湾项目简介 | 新山房产",
      seoDescription: "富力公主湾项目简介：通关区位置、户型、配套及业主服务。",
      seoKeywords: "富力公主湾, R&F Princess Cove, 通关房产, 新山滨水公寓",
      whatsappMessage: "您好，我在了解富力公主湾，想咨询业主服务。",
    },
  },
  "danga-bay": {
    en: {
      title: "Danga Bay",
      subtitle: "Established waterfront district · Johor Bahru",
      intro:
        "Danga Bay is a mature mixed-use waterfront zone along the Tebrau Strait. This profile outlines public information on property types, facilities, and owner considerations for overseas landlords.",
      seoTitle: "Danga Bay Project Profile | Johor Bahru Property",
      seoDescription:
        "Danga Bay project profile: location, condo types, facilities, and owner services for overseas investors in Johor Bahru.",
      seoKeywords:
        "Danga Bay profile, Danga Bay Johor, 丹加湾, JB waterfront condo, Danga Bay rental",
      whatsappMessage: "Hi, I am researching Danga Bay and would like to discuss owner services.",
      guideSlug: "danga-bay",
      map: { lat: 1.4728, lng: 103.7218, labelEn: "Danga Bay, Johor Bahru", labelZh: "丹加湾，新山" },
      factsEn: [
        ["Location", "Danga Bay, Johor Bahru (Tebrau Strait waterfront)"],
        ["Development Type", "Mixed hotel-condo, retail, and leisure district"],
        ["Typical Units", "Studio to 3-bedroom service apartments and condos"],
        ["Tenure", "Freehold / leasehold varies by building"],
        ["Management", "Building-specific management companies"],
        ["Market Maturity", "Established rental history since 2000s"],
        ["Distance to CIQ", "Approx. 15–25 minutes by car"],
        ["Owner Profile", "Long-term investors, Airbnb hosts, local landlords"],
      ],
      factsZh: [
        ["位置", "新山丹加湾（地不佬海峡滨水区）"],
        ["项目类型", "混合酒店公寓、零售及休闲区"],
        ["常见户型", "Studio 至三房服务式公寓及 condo"],
        ["产权", "各楼盘永久/租赁产权不同"],
        ["管理", "各楼宇独立管理公司"],
        ["市场成熟度", "2000 年代起即有租赁历史"],
        ["距通关", "车程约 15–25 分钟"],
        ["业主构成", "长期投资者、短租房东、本地业主"],
      ],
      propertyTypesEn: [
        { name: "Studio / SOHO", desc: "Entry-level units with steady tourism and short-stay demand near attractions." },
        { name: "2-Bedroom Condo", desc: "Core rental stock for local and expat tenants. Watch ageing fixtures in older towers." },
        { name: "3-Bedroom / Dual-Key", desc: "Family units and dual-key layouts for flexible rental strategies." },
      ],
      propertyTypesZh: [
        { name: "Studio / SOHO", desc: "入门级单位，近景点，旅游及短住需求稳定。" },
        { name: "两房 Condo", desc: "本地及外派租客主力户型，老旧塔楼需注意设备老化。" },
        { name: "三房 / Dual-Key", desc: "家庭单位及双钥匙户型，租赁策略更灵活。" },
      ],
      facilitiesEn: [
        "Danga Bay waterfront park",
        "Hotels and serviced residences",
        "Shopping and entertainment zones",
        "Marina and leisure attractions",
        "F&B and event spaces",
        "Public transport links to JB city",
        "Mixed hotel-condo facilities per building",
      ],
      facilitiesZh: [
        "丹加湾滨海公园",
        "酒店及服务式住宅",
        "购物及娱乐区",
        "游艇及休闲景点",
        "餐饮及活动空间",
        "衔接新山市公共交通",
        "各楼宇酒店-公寓配套",
      ],
    },
    zh: {
      title: "丹加湾 Danga Bay",
      subtitle: "成熟滨水区 · 新山",
      intro:
        "丹加湾是沿地不佬海峡的成熟混合用途滨水区。本简介概述户型、配套及海外房东需了解的公开信息。",
      seoTitle: "丹加湾项目简介 | 新山房产",
      seoDescription: "丹加湾项目简介：位置、公寓类型、配套及海外业主服务。",
      seoKeywords: "丹加湾, Danga Bay, 新山滨水, 丹加湾租赁",
      whatsappMessage: "您好，我在了解丹加湾，想咨询业主服务。",
    },
  },
};

function buildProfile(key, locale) {
  const p = PROJECTS[key];
  const isEn = locale === "en";
  const base = isEn ? p.en : { ...p.en, ...p.zh };
  const facts = isEn ? p.en.factsEn : p.en.factsZh;
  const propertyTypes = isEn ? p.en.propertyTypesEn : p.en.propertyTypesZh;
  const facilities = isEn ? p.en.facilitiesEn : p.en.facilitiesZh;

  return {
    key,
    title: base.title,
    subtitle: base.subtitle,
    intro: base.intro,
    seoTitle: isEn ? p.en.seoTitle : (base.seoTitle ?? p.en.seoTitle),
    seoDescription: isEn ? p.en.seoDescription : (base.seoDescription ?? p.en.seoDescription),
    seoKeywords: isEn ? p.en.seoKeywords : (base.seoKeywords ?? p.en.seoKeywords),
    whatsappMessage: isEn ? p.en.whatsappMessage : (base.whatsappMessage ?? p.en.whatsappMessage),
    guideSlug: p.en.guideSlug,
    labels: isEn
      ? {
          gallery: "Project Gallery",
          facts: "Project Facts",
          map: "Location Map",
          propertyTypes: "Property Types",
          facilities: "Facilities & Amenities",
          relatedServices: "Related Owner Services",
          listProperty: "List Your Property",
          propertyRequest: "Submit Property Request",
          readGuide: "Read full area guide",
        }
      : {
          gallery: "项目图集",
          facts: "项目概况",
          map: "位置地图",
          propertyTypes: "物业类型",
          facilities: "设施配套",
          relatedServices: "相关业主服务",
          listProperty: "提交房源",
          propertyRequest: "提交找房需求",
          readGuide: "阅读完整区域指南",
        },
    gallery: GALLERY.map((g, i) => ({
      src: g.src,
      alt: isEn ? `${base.title} — ${g.altEn}` : `${base.title} — ${g.altZh}`,
    })),
    facts: facts.map(([label, value]) => ({ label, value })),
    map: {
      lat: p.en.map.lat,
      lng: p.en.map.lng,
      label: isEn ? p.en.map.labelEn : p.en.map.labelZh,
    },
    propertyTypes,
    facilities,
  };
}

mkdirSync(join(outDir, "en"), { recursive: true });
mkdirSync(join(outDir, "zh"), { recursive: true });

for (const key of Object.keys(PROJECTS)) {
  writeFileSync(join(outDir, "en", `${key}.json`), JSON.stringify(buildProfile(key, "en"), null, 2) + "\n");
  writeFileSync(join(outDir, "zh", `${key}.json`), JSON.stringify(buildProfile(key, "zh"), null, 2) + "\n");
}

console.log("Generated 6 project profile JSON files");
