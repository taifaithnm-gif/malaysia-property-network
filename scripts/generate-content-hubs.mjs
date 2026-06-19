#!/usr/bin/env node
/**
 * Generates Phase 6 content hub JSON files (EN + ZH).
 * Run: node scripts/generate-content-hubs.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const media = JSON.parse(
  fs.readFileSync(path.join(root, "src/lib/i18n/media-center/forest-city-media.json"), "utf8"),
);

const rfGallery = [
  {
    src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
    altEn: "R&F Princess Cove — High-rise residential towers",
    altZh: "富力公主湾 — 高层住宅塔楼",
  },
  {
    src: "https://images.unsplash.com/photo-1513584684374-8bab748f235c?w=800&q=80",
    altEn: "R&F Princess Cove — Waterfront condominium view",
    altZh: "富力公主湾 — 滨水公寓景观",
  },
  {
    src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    altEn: "R&F Princess Cove — Modern apartment interior",
    altZh: "富力公主湾 — 现代公寓室内",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    altEn: "R&F Princess Cove — Residential pool and facilities",
    altZh: "富力公主湾 — 泳池与设施",
  },
];

const dangaGallery = [
  {
    src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe5e?w=1200&q=80",
    altEn: "Danga Bay — Coastal development landscape",
    altZh: "丹加湾 — 滨海开发景观",
  },
  {
    src: "https://images.unsplash.com/photo-1513584684374-8bab748f235c?w=800&q=80",
    altEn: "Danga Bay — Waterfront condominium view",
    altZh: "丹加湾 — 滨水公寓景观",
  },
  {
    src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    altEn: "Danga Bay — Modern apartment interior",
    altZh: "丹加湾 — 现代公寓室内",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    altEn: "Danga Bay — Residential pool and facilities",
    altZh: "丹加湾 — 泳池与设施",
  },
];

function labels(locale) {
  if (locale === "zh") {
    return {
      sectionsTitle: "详细内容",
      quickLinksTitle: "相关链接",
      servicesTitle: "服务项目",
      faqTitle: "常见问题",
      ctaTitle: "联系我们",
      ctaDesc: "填写表单或通过 WhatsApp 咨询，我们将在 24 小时内回复。",
      galleryTitle: "项目图库",
      factsTitle: "项目要点",
    };
  }
  return {
    sectionsTitle: "Overview",
    quickLinksTitle: "Related Links",
    servicesTitle: "Services",
    faqTitle: "FAQ",
    ctaTitle: "Get in Touch",
    ctaDesc: "Submit the form or message us on WhatsApp — we respond within 24 hours.",
    galleryTitle: "Gallery",
    factsTitle: "Project Facts",
  };
}

function galleryFromMedia(sectionId, locale) {
  const section = media.sections.find((s) => s.id === sectionId);
  return section.images.slice(0, 6).map((img) => ({
    src: img.src,
    alt: locale === "zh" ? img.altZh : img.altEn,
  }));
}

function galleryFromPreset(preset, locale) {
  return preset.map((img) => ({
    src: img.src,
    alt: locale === "zh" ? img.altZh : img.altEn,
  }));
}

const pages = {
  "forest-city-golf": {
    en: {
      slug: "forest-city-golf",
      mediaSectionId: "golf-resort",
      relatedServiceSlug: "golf-travel-services",
      leadSource: "forest-city-golf",
      title: "Forest City Golf Resort",
      subtitle: "Championship golf & resort living",
      intro:
        "Forest City Golf Resort combines world-class courses with integrated resort amenities within the Forest City development. Explore golf, property ownership, and stay-and-play packages for overseas visitors.",
      seoTitle: "Forest City Golf Resort | Golf & Property Johor",
      seoDescription:
        "Forest City Golf Resort guide: courses, resort facilities, property links, and golf travel packages in Johor Bahru.",
      seoKeywords: "Forest City Golf, golf resort Johor, Forest City golf property, 森林城市高尔夫",
      whatsappMessage: "Hi, I am interested in Forest City Golf Resort and property options.",
      sections: [
        {
          title: "Golf & resort experience",
          paragraphs: [
            "Forest City Golf Resort features professionally designed courses integrated with resort clubhouses, dining, and leisure facilities. Visitors combine tee times with marina walks, hotel stays, and optional property viewings within the same development.",
            "Overseas owners use golf trips to inspect units, meet local managers, and evaluate rental or personal-use potential. We coordinate tee times, transport, and inspection slots when schedules align.",
          ],
        },
        {
          title: "Property connection",
          paragraphs: [
            "Residential inventory near the golf precinct appeals to golf enthusiasts and lifestyle buyers. Secondary-market units vary by tower, view, and furnishing — unit-specific diligence matters more than district generalisations.",
          ],
        },
      ],
      facts: [
        { label: "Location", value: "Forest City, Iskandar Malaysia" },
        { label: "Focus", value: "Golf resort & integrated residential" },
        { label: "Visitor services", value: "Stay & play, property viewing add-ons" },
        { label: "Languages", value: "English & Chinese support" },
      ],
      quickLinks: [
        { label: "Forest City Media Center", slug: "forest-city/media-center" },
        { label: "Forest City Marina", slug: "forest-city-marina" },
        { label: "Forest City Hotels", slug: "forest-city-hotels" },
        { label: "Golf Travel Center", slug: "golf" },
        { label: "Resource Center", slug: "forest-city/resource-center" },
        { label: "Full Guide", slug: "guide/forest-city-golf-resort" },
      ],
      faq: [
        {
          q: "Can I combine golf with a property inspection?",
          a: "Yes. We schedule tee times and viewing slots on the same visit when access permits.",
        },
        {
          q: "Do you book tee times directly?",
          a: "We coordinate with resort operations and confirm availability before your travel dates.",
        },
      ],
    },
    zh: {
      slug: "forest-city-golf",
      mediaSectionId: "golf-resort",
      relatedServiceSlug: "golf-travel-services",
      leadSource: "forest-city-golf",
      title: "森林城市高尔夫度假村",
      subtitle: "冠军级球场与度假生活",
      intro:
        "森林城市高尔夫度假村将世界级球场与综合度假设施融为一体。了解球场、物业持有及海外访客高尔夫度假套餐。",
      seoTitle: "森林城市高尔夫度假村 | 柔佛高尔夫与物业",
      seoDescription: "森林城市高尔夫度假村指南：球场、度假设施、物业链接及柔佛高尔夫旅行套餐。",
      seoKeywords: "森林城市高尔夫, 柔佛高尔夫, Forest City golf, 高尔夫物业",
      whatsappMessage: "您好，我想了解森林城市高尔夫度假村及相关物业。",
      sections: [
        {
          title: "高尔夫与度假体验",
          paragraphs: [
            "森林城市高尔夫度假村拥有专业设计的球场，配套会所、餐饮及休闲设施。访客可在同一开发区内打球、漫步 marina、入住酒店，并安排可选的看房行程。",
            "海外业主常借高尔夫行程验房、会见本地管家并评估出租或自用潜力。我们可协调开球时间、交通及验房时段。",
          ],
        },
        {
          title: "与物业的关联",
          paragraphs: [
            "球场周边住宅吸引高尔夫爱好者及生活方式买家。二手房因楼栋、景观及装修差异较大，需针对具体单元做尽职调查。",
          ],
        },
      ],
      facts: [
        { label: "位置", value: "依斯干达 · 森林城市" },
        { label: "特色", value: "高尔夫度假村与综合住宅" },
        { label: "访客服务", value: "打球住宿套餐、可加看房" },
        { label: "语言", value: "中英文支持" },
      ],
      quickLinks: [
        { label: "森林城市媒体中心", slug: "forest-city/media-center" },
        { label: "森林城市 Marina", slug: "forest-city-marina" },
        { label: "森林城市酒店", slug: "forest-city-hotels" },
        { label: "高尔夫旅行中心", slug: "golf" },
        { label: "资源中心", slug: "forest-city/resource-center" },
        { label: "完整指南", slug: "guide/forest-city-golf-resort" },
      ],
      faq: [
        { q: "能否打球同时验房？", a: "可以。在条件允许时，我们可在同一行程中安排开球与看房。" },
        { q: "是否代订开球时间？", a: "我们与度假村运营方协调，并在您出行前确认档期。" },
      ],
    },
  },
  "forest-city-marina": {
    en: {
      slug: "forest-city-marina",
      mediaSectionId: "marina",
      relatedServiceSlug: "property-management-services",
      leadSource: "forest-city-marina",
      title: "Forest City Marina",
      subtitle: "Waterfront marina & leisure precinct",
      intro:
        "Forest City Marina anchors the waterfront lifestyle within the development — berths, promenades, dining, and leisure access for residents and visitors.",
      seoTitle: "Forest City Marina | Waterfront Living Johor",
      seoDescription:
        "Forest City Marina overview: waterfront amenities, property links, and owner services in Iskandar Malaysia.",
      seoKeywords: "Forest City Marina, waterfront Johor, marina property, 森林城市 marina",
      whatsappMessage: "Hi, I am interested in Forest City Marina and nearby property.",
      sections: [
        {
          title: "Marina lifestyle",
          paragraphs: [
            "The marina precinct connects residential towers with waterfront walks, F&B, and leisure boating culture. Owners marketing units highlight bay views and walkable amenities.",
            "Overseas landlords should understand seasonal visitor flows and maintenance exposure for waterfront-facing units — inspection reports help monitor balcony hardware and glazing.",
          ],
        },
      ],
      facts: [
        { label: "Location", value: "Forest City waterfront, Iskandar" },
        { label: "Highlights", value: "Marina berths, promenade, leisure dining" },
        { label: "Property types", value: "High-rise condos & serviced units nearby" },
        { label: "Owner support", value: "Management, inspection, rental coordination" },
      ],
      quickLinks: [
        { label: "Forest City Golf", slug: "forest-city-golf" },
        { label: "Forest City Hotels", slug: "forest-city-hotels" },
        { label: "Media Center", slug: "forest-city/media-center" },
        { label: "Forest City Profile", slug: "forest-city" },
        { label: "Book Viewing", slug: "book-viewing" },
      ],
      faq: [
        {
          q: "Are marina-facing units premium?",
          a: "Bay and marina views typically command higher rents; confirm by building and floor.",
        },
      ],
    },
    zh: {
      slug: "forest-city-marina",
      mediaSectionId: "marina",
      relatedServiceSlug: "property-management-services",
      leadSource: "forest-city-marina",
      title: "森林城市 Marina",
      subtitle: "滨水码头与休闲区",
      intro: "森林城市 Marina 是开发区的滨水生活方式核心——泊位、步道、餐饮及休闲设施服务居民与访客。",
      seoTitle: "森林城市 Marina | 柔佛滨水生活",
      seoDescription: "森林城市 Marina 概览：滨水配套、物业链接及依斯干达业主服务。",
      seoKeywords: "森林城市 marina, 滨水物业, 依斯干达",
      whatsappMessage: "您好，我想了解森林城市 Marina 及周边物业。",
      sections: [
        {
          title: "Marina 生活方式",
          paragraphs: [
            "Marina 区连接住宅塔楼与滨水步道、餐饮及休闲 boating 文化。出租营销常突出海湾景观与步行配套。",
            "海外业主应了解季节性人流及临海单元的维护情况——验房报告有助于监控阳台五金与玻璃状况。",
          ],
        },
      ],
      facts: [
        { label: "位置", value: "依斯干达 · 森林城市滨水区" },
        { label: "亮点", value: "码头泊位、步道、休闲餐饮" },
        { label: "物业类型", value: "周边高层公寓及服务式单元" },
        { label: "业主支持", value: "管理、验房、出租协调" },
      ],
      quickLinks: [
        { label: "森林城市高尔夫", slug: "forest-city-golf" },
        { label: "森林城市酒店", slug: "forest-city-hotels" },
        { label: "媒体中心", slug: "forest-city/media-center" },
        { label: "森林城市主页", slug: "forest-city" },
        { label: "预约看房", slug: "book-viewing" },
      ],
      faq: [{ q: "临海单元是否溢价？", a: "海湾与 marina 景观通常租金更高，需按楼栋与楼层具体比较。" }],
    },
  },
  "forest-city-hotels": {
    en: {
      slug: "forest-city-hotels",
      mediaSectionId: "hotel",
      relatedServiceSlug: "golf-travel-services",
      leadSource: "forest-city-hotels",
      title: "Forest City Hotels",
      subtitle: "Resort hotels & visitor stays",
      intro:
        "Forest City hotel inventory supports golf trips, corporate visits, and property due diligence stays. Coordinate hotel packages with viewing and travel programs.",
      seoTitle: "Forest City Hotels | Resort Stays & Property Visits",
      seoDescription:
        "Forest City hotel guide: resort stays, golf packages, corporate visits, and property viewing coordination.",
      seoKeywords: "Forest City hotel, resort stay Johor, golf hotel package",
      whatsappMessage: "Hi, I need a Forest City hotel package with property viewing.",
      sections: [
        {
          title: "Stay programs",
          paragraphs: [
            "Hotels within Forest City cater to golf visitors, corporate groups, and owner-buyers conducting multi-day due diligence. Packages may include daily transport to golf, marina leisure, and scheduled unit inspections.",
          ],
        },
      ],
      facts: [
        { label: "Location", value: "Forest City resort zone" },
        { label: "Use cases", value: "Golf travel, corporate visits, owner inspections" },
        { label: "Package types", value: "Golf + hotel, multi-day viewing stays" },
        { label: "Booking", value: "Coordinated via our travel desk" },
      ],
      quickLinks: [
        { label: "Golf Travel Center", slug: "golf" },
        { label: "Forest City Golf", slug: "forest-city-golf" },
        { label: "Corporate Visits", slug: "corporate-visits" },
        { label: "Book Viewing", slug: "book-viewing" },
        { label: "Media Center", slug: "forest-city/media-center" },
      ],
      faq: [
        {
          q: "Can hotel stays include property tours?",
          a: "Yes — we add viewing slots to golf or corporate itineraries when units are accessible.",
        },
      ],
    },
    zh: {
      slug: "forest-city-hotels",
      mediaSectionId: "hotel",
      relatedServiceSlug: "golf-travel-services",
      leadSource: "forest-city-hotels",
      title: "森林城市酒店",
      subtitle: "度假酒店与访客住宿",
      intro: "森林城市酒店支持高尔夫行程、企业访问及物业尽调住宿，可将酒店套餐与看房及旅行项目一并安排。",
      seoTitle: "森林城市酒店 | 度假住宿与看房",
      seoDescription: "森林城市酒店指南：度假住宿、高尔夫套餐、企业访问及看房协调。",
      seoKeywords: "森林城市酒店, 柔佛度假, 高尔夫酒店套餐",
      whatsappMessage: "您好，我需要森林城市酒店套餐并安排看房。",
      sections: [
        {
          title: "住宿项目",
          paragraphs: [
            "森林城市内酒店服务高尔夫访客、企业团体及进行多日尽调的买家。套餐可含每日高尔夫交通、marina 休闲及预约验房。",
          ],
        },
      ],
      facts: [
        { label: "位置", value: "森林城市度假区域" },
        { label: "适用场景", value: "高尔夫旅行、企业访问、业主验房" },
        { label: "套餐类型", value: "高尔夫+酒店、多日看房住宿" },
        { label: "预订", value: "通过本旅行服务台协调" },
      ],
      quickLinks: [
        { label: "高尔夫旅行中心", slug: "golf" },
        { label: "森林城市高尔夫", slug: "forest-city-golf" },
        { label: "企业访问", slug: "corporate-visits" },
        { label: "预约看房", slug: "book-viewing" },
        { label: "媒体中心", slug: "forest-city/media-center" },
      ],
      faq: [{ q: "酒店住宿能否含看房？", a: "可以——单元可进入时，我们可在高尔夫或企业行程中加入看房时段。" }],
    },
  },
  "princess-cove-ciq": {
    en: {
      slug: "princess-cove-ciq",
      relatedServiceSlug: "property-management-services",
      leadSource: "princess-cove-ciq",
      title: "R&F Princess Cove & CIQ",
      subtitle: "Causeway-adjacent waterfront address",
      intro:
        "R&F Princess Cove sits in Tanjung Puteri minutes from the Johor-Singapore Causeway (CIQ). This hub covers location advantages, cross-border commuting context, and owner services for CIQ-area units.",
      seoTitle: "R&F Princess Cove CIQ | Causeway Property Johor",
      seoDescription:
        "R&F Princess Cove near CIQ: location facts, cross-border living, property management and inspection for Singapore-linked buyers.",
      seoKeywords: "R&F Princess Cove CIQ, Causeway property, 富力公主湾 CIQ, Tanjung Puteri",
      whatsappMessage: "Hi, I am researching R&F Princess Cove near CIQ.",
      sections: [
        {
          title: "CIQ proximity",
          paragraphs: [
            "Princess Cove's Tanjung Puteri address appeals to buyers prioritising Causeway access for Singapore commuting, weekend stays, or rental to cross-border professionals.",
            "Traffic patterns at CIQ affect tenant preferences and short-stay demand. Owners should align marketing with realistic commute expectations rather than peak-hour best cases.",
          ],
        },
      ],
      facts: [
        { label: "Location", value: "Tanjung Puteri, ~minutes to CIQ" },
        { label: "Developer", value: "R&F Group (marketed phases)" },
        { label: "Typical buyers", value: "Singapore-linked & overseas Chinese" },
        { label: "Unit types", value: "1–4+ bedroom condominiums" },
      ],
      quickLinks: [
        { label: "Investment Hub", slug: "princess-cove-investment" },
        { label: "R&F Profile", slug: "rf-princess-cove" },
        { label: "Project Archive", slug: "rf-princess-cove/archive" },
        { label: "Full Guide", slug: "guide/rf-princess-cove" },
        { label: "Property Management", slug: "rf-princess-cove-property-management" },
      ],
      faq: [
        {
          q: "Is Princess Cove walkable to CIQ?",
          a: "Distance is short by JB standards but walkability depends on route and heat; many residents use ride-hail or shuttle.",
        },
      ],
    },
    zh: {
      slug: "princess-cove-ciq",
      relatedServiceSlug: "property-management-services",
      leadSource: "princess-cove-ciq",
      title: "富力公主湾与 CIQ",
      subtitle: "关隘旁滨水地址",
      intro:
        "富力公主湾位于 Tanjung Puteri，距新柔长堤（CIQ）数分钟车程。本页介绍区位、跨境通勤背景及 CIQ 片区业主服务。",
      seoTitle: "富力公主湾 CIQ | 关隘旁柔佛物业",
      seoDescription: "富力公主湾近 CIQ：区位要点、跨境生活、管理及验房服务。",
      seoKeywords: "富力公主湾 CIQ, 关隘物业, Tanjung Puteri",
      whatsappMessage: "您好，我想了解近 CIQ 的富力公主湾。",
      sections: [
        {
          title: "CIQ  proximity",
          paragraphs: [
            "Tanjung Puteri 地址吸引重视关隘通达的新加坡通勤者、周末自住客及面向跨境专业人士的出租业主。",
            "CIQ 交通状况影响租客偏好与短租需求。营销应基于 realistic 通勤预期，而非理想高峰时段。",
          ],
        },
      ],
      facts: [
        { label: "位置", value: "Tanjung Puteri，距 CIQ 数分钟" },
        { label: "开发商", value: "富力集团（公开销售期数）" },
        { label: "典型买家", value: "新加坡关联及海外华人" },
        { label: "户型", value: "1–4+ 房公寓" },
      ],
      quickLinks: [
        { label: "投资中心", slug: "princess-cove-investment" },
        { label: "公主湾主页", slug: "rf-princess-cove" },
        { label: "项目档案", slug: "rf-princess-cove/archive" },
        { label: "完整指南", slug: "guide/rf-princess-cove" },
        { label: "物业管理", slug: "rf-princess-cove-property-management" },
      ],
      faq: [{ q: "能否步行至 CIQ？", a: "按新山标准距离不远，但步行体验因路线与天气而异，多数居民使用网约车或 shuttle。" }],
    },
  },
  "princess-cove-investment": {
    en: {
      slug: "princess-cove-investment",
      relatedServiceSlug: "property-management-services",
      leadSource: "princess-cove-investment",
      title: "R&F Princess Cove Investment",
      subtitle: "Rental yield & hold strategy",
      intro:
        "Investment-focused overview for R&F Princess Cove: rental positioning, cross-border tenant demand, management costs, and secondary-market considerations for overseas holders.",
      seoTitle: "R&F Princess Cove Investment | Rental & Yield Guide",
      seoDescription:
        "R&F Princess Cove investment guide: rental market, yield factors, management, and inspection for overseas investors.",
      seoKeywords: "R&F investment, Princess Cove rental yield, CIQ condo investment",
      whatsappMessage: "Hi, I want investment analysis for R&F Princess Cove.",
      sections: [
        {
          title: "Investment thesis",
          paragraphs: [
            "CIQ-adjacent premium addresses attract tenants who pay for location convenience. Net yield depends on purchase price, furnishing, management fees, and vacancy handling.",
            "Secondary-market buyers should review strata minutes, sinking fund status, and recent transacted rents in the same tower before pricing offers.",
          ],
        },
        {
          title: "Owner operations",
          paragraphs: [
            "Remote ownership requires responsive tenant management and periodic inspection. We provide rent collection, maintenance coordination, and photo reports for overseas landlords.",
          ],
        },
      ],
      facts: [
        { label: "Market type", value: "Premium CIQ-area residential" },
        { label: "Tenant profile", value: "Cross-border professionals, families" },
        { label: "Key costs", value: "Maintenance, furnishing, management, vacancy" },
        { label: "Due diligence", value: "Unit inspection + strata review recommended" },
      ],
      quickLinks: [
        { label: "CIQ Location Hub", slug: "princess-cove-ciq" },
        { label: "R&F Profile", slug: "rf-princess-cove" },
        { label: "List Property", slug: "list-property" },
        { label: "Property Request", slug: "property-request" },
        { label: "Book Viewing", slug: "book-viewing" },
      ],
      faq: [
        {
          q: "Typical holding period?",
          a: "Many overseas investors hold 5–10+ years for rental income; resale timing depends on market cycle and unit condition.",
        },
      ],
    },
    zh: {
      slug: "princess-cove-investment",
      relatedServiceSlug: "property-management-services",
      leadSource: "princess-cove-investment",
      title: "富力公主湾投资",
      subtitle: "租金回报与持有策略",
      intro: "面向富力公主湾的投资概览：出租定位、跨境租客需求、管理成本及海外持有人二级市场注意事项。",
      seoTitle: "富力公主湾投资 | 租金与回报指南",
      seoDescription: "富力公主湾投资指南：租赁市场、回报因素、管理及海外投资者验房。",
      seoKeywords: "富力投资, 公主湾租金, CIQ 公寓投资",
      whatsappMessage: "您好，我想了解富力公主湾投资分析。",
      sections: [
        {
          title: "投资逻辑",
          paragraphs: [
            "CIQ 旁 premium 地址吸引愿为区位便利付溢价的租客。净回报取决于买入价、装修、管理费及空置处理。",
            "二级市场买家应查阅 strata 会议记录、维修基金状况及同塔近期成交租金后再出价。",
          ],
        },
        {
          title: "业主运营",
          paragraphs: ["远程持有需 responsive 租客管理与定期验房。我们提供收租、维修协调及 photo 报告。"],
        },
      ],
      facts: [
        { label: "市场类型", value: "CIQ 片区 premium 住宅" },
        { label: "租客画像", value: "跨境白领、家庭" },
        { label: "主要成本", value: "管理费、装修、管家、空置" },
        { label: "尽调建议", value: "验房 + 查阅 strata 文件" },
      ],
      quickLinks: [
        { label: "CIQ 区位中心", slug: "princess-cove-ciq" },
        { label: "公主湾主页", slug: "rf-princess-cove" },
        { label: "发布房源", slug: "list-property" },
        { label: "求购登记", slug: "property-request" },
        { label: "预约看房", slug: "book-viewing" },
      ],
      faq: [{ q: "典型持有期？", a: "许多海外投资者持有 5–10 年以上收租；转售时机取决于周期与单元状况。" }],
    },
  },
  "danga-bay-lifestyle": {
    en: {
      slug: "danga-bay-lifestyle",
      relatedServiceSlug: "property-management-services",
      leadSource: "danga-bay/lifestyle",
      title: "Danga Bay Lifestyle",
      subtitle: "Waterfront dining, leisure & daily living",
      intro:
        "Danga Bay offers a mature waterfront lifestyle along the Tebrau Strait — dining precincts, theme-park leisure, coastal walks, and mixed hotel-condo living for residents and visitors.",
      seoTitle: "Danga Bay Lifestyle Guide | Waterfront Living Johor",
      seoDescription:
        "Danga Bay lifestyle overview: waterfront leisure, dining, tenant appeal, and owner considerations in Johor Bahru.",
      seoKeywords: "Danga Bay lifestyle, waterfront JB, 丹加湾生活",
      whatsappMessage: "Hi, I want to understand Danga Bay lifestyle for my unit.",
      sections: [
        {
          title: "Daily life",
          paragraphs: [
            "Weekend foot traffic from F&B and attractions benefits hospitality-linked rentals where permitted, while long-term tenants value coastal access and established amenities.",
            "Noise and traffic patterns vary by micro-location within the district — site visits clarify trade-offs between bay views and road exposure.",
          ],
        },
      ],
      facts: [
        { label: "District", value: "Danga Bay, Johor Bahru" },
        { label: "Character", value: "Mature waterfront mixed-use" },
        { label: "Appeal", value: "Affordable waterfront vs newer JB premium zones" },
        { label: "Owner tip", value: "Match marketing to tower-specific conditions" },
      ],
      quickLinks: [
        { label: "Rental Market", slug: "danga-bay/rental-market" },
        { label: "Family Living", slug: "danga-bay/family-living" },
        { label: "Danga Bay Profile", slug: "danga-bay" },
        { label: "Project Archive", slug: "danga-bay/archive" },
        { label: "Full Guide", slug: "guide/danga-bay" },
      ],
      faq: [
        {
          q: "Is Danga Bay only for tourists?",
          a: "No — many local families and professionals live here long-term; tourism activity complements but does not define the whole district.",
        },
      ],
    },
    zh: {
      slug: "danga-bay-lifestyle",
      relatedServiceSlug: "property-management-services",
      leadSource: "danga-bay/lifestyle",
      title: "丹加湾生活方式",
      subtitle: "滨水餐饮、休闲与日常居住",
      intro: "丹加湾沿 Tebrau 海峡提供成熟滨水生活——餐饮区、主题乐园、滨海步道及酒店公寓混合社区。",
      seoTitle: "丹加湾生活方式 | 柔佛滨水居住",
      seoDescription: "丹加湾生活方式：滨水休闲、餐饮、租客吸引力及业主注意事项。",
      seoKeywords: "丹加湾生活, 滨水新山",
      whatsappMessage: "您好，我想了解丹加湾生活方式以评估我的单元。",
      sections: [
        {
          title: "日常生活",
          paragraphs: [
            "周末餐饮与景点人流有利于合规短租，长期租客则重视滨海通达与成熟配套。",
            "噪音与交通因片区内 micro-location 而异——实地看房可 clarify 景观与临路之间的取舍。",
          ],
        },
      ],
      facts: [
        { label: "区域", value: "新山丹加湾" },
        { label: "定位", value: "成熟滨水混合用途" },
        { label: "优势", value: "较新 premium 区更亲民的滨水选择" },
        { label: "建议", value: "营销需贴合具体楼栋条件" },
      ],
      quickLinks: [
        { label: "租赁市场", slug: "danga-bay/rental-market" },
        { label: "家庭居住", slug: "danga-bay/family-living" },
        { label: "丹加湾主页", slug: "danga-bay" },
        { label: "项目档案", slug: "danga-bay/archive" },
        { label: "完整指南", slug: "guide/danga-bay" },
      ],
      faq: [{ q: "丹加湾只适合游客吗？", a: "否——许多本地家庭与专业人士长期居住；旅游活动是补充而非全部。" }],
    },
  },
  "danga-bay-rental-market": {
    en: {
      slug: "danga-bay-rental-market",
      relatedServiceSlug: "property-management-services",
      leadSource: "danga-bay/rental-market",
      title: "Danga Bay Rental Market",
      subtitle: "Tenant demand, pricing & vacancy",
      intro:
        "Danga Bay's mature rental market spans local professionals, students, and tourism-linked stays. Tower-specific pricing and furnishing strategy determine net returns for overseas landlords.",
      seoTitle: "Danga Bay Rental Market | Johor Bahru Landlord Guide",
      seoDescription:
        "Danga Bay rental market guide: tenant types, pricing benchmarks, vacancy management, and property management for overseas owners.",
      seoKeywords: "Danga Bay rental, JB condo rent, 丹加湾租金",
      whatsappMessage: "Hi, I need Danga Bay rental market advice for my unit.",
      sections: [
        {
          title: "Demand drivers",
          paragraphs: [
            "Long-term tenancy dominates; short-stay exists in selected buildings subject to by-laws. Student calendars and tourism peaks create seasonal leasing opportunities.",
            "Listing titles should name the exact tower — tenant searches on Malaysian portals are often building-specific in this district.",
          ],
        },
        {
          title: "Pricing & voids",
          paragraphs: [
            "Two towers on the same road can command different rents based on management quality, lift reliability, and pool condition. Comparative analysis within the same building is essential.",
          ],
        },
      ],
      facts: [
        { label: "Primary model", value: "Long-term residential lease" },
        { label: "Tenant mix", value: "Local workers, students, families" },
        { label: "Pricing key", value: "Same-building recent transactions" },
        { label: "Management", value: "Responsive listing & maintenance" },
      ],
      quickLinks: [
        { label: "Lifestyle Guide", slug: "danga-bay/lifestyle" },
        { label: "Family Living", slug: "danga-bay/family-living" },
        { label: "Management Service", slug: "danga-bay-property-management" },
        { label: "List Property", slug: "list-property" },
      ],
      faq: [
        {
          q: "Expected vacancy between tenants?",
          a: "Well-maintained furnished units in popular towers often re-let within 2–6 weeks; ageing units may take longer.",
        },
      ],
    },
    zh: {
      slug: "danga-bay-rental-market",
      relatedServiceSlug: "property-management-services",
      leadSource: "danga-bay/rental-market",
      title: "丹加湾租赁市场",
      subtitle: "租客需求、定价与空置",
      intro: "丹加湾成熟租赁市场涵盖本地白领、学生及旅游相关短住。按塔楼定价与装修策略决定海外业主净回报。",
      seoTitle: "丹加湾租赁市场 | 新山业主指南",
      seoDescription: "丹加湾租赁市场：租客类型、定价基准、空置管理及海外业主物业服务。",
      seoKeywords: "丹加湾租金, 新山公寓出租",
      whatsappMessage: "您好，我需要丹加湾租赁市场建议。",
      sections: [
        {
          title: "需求驱动",
          paragraphs: [
            "长期租约为主；部分楼栋在 by-law 允许下有短租。学期与旅游高峰带来 seasonal 机会。",
            " listing 标题应写明具体塔楼——本地平台搜索常按楼栋进行。",
          ],
        },
        {
          title: "定价与空置",
          paragraphs: [
            "同路两塔因管理、电梯与泳池状况租金可差很大。须以同塔近期成交为基准定价。",
          ],
        },
      ],
      facts: [
        { label: "主要模式", value: "长期住宅租约" },
        { label: "租客构成", value: "本地打工族、学生、家庭" },
        { label: "定价关键", value: "同塔近期成交" },
        { label: "管理要点", value: "快速响应 listing 与维修" },
      ],
      quickLinks: [
        { label: "生活方式", slug: "danga-bay/lifestyle" },
        { label: "家庭居住", slug: "danga-bay/family-living" },
        { label: "物业管理", slug: "danga-bay-property-management" },
        { label: "发布房源", slug: "list-property" },
      ],
      faq: [{ q: "换租空置期多长？", a: "维护良好的热门塔楼 furnished 单元常 2–6 周内再租出；老旧单元可能更久。" }],
    },
  },
  "danga-bay-family-living": {
    en: {
      slug: "danga-bay-family-living",
      subtitle: "Schools, safety & long-term tenants",
      intro:
        "Family-oriented living guide for Danga Bay owners: tenant safety expectations, furnishing for families, school access, and building amenities that support multi-year leases.",
      seoTitle: "Danga Bay Family Living Guide | Johor Bahru",
      seoDescription:
        "Danga Bay family living guide: schools, safety, furnishing, and tenant management for family long-term rentals.",
      seoKeywords: "Danga Bay family, JB family condo, 丹加湾家庭",
      whatsappMessage: "Hi, I want to target family tenants in Danga Bay.",
      relatedServiceSlug: "property-management-services",
      leadSource: "danga-bay/family-living",
      title: "Danga Bay Family Living",
      sections: [
        {
          title: "Family tenant profile",
          paragraphs: [
            "Families prioritise secure windows, reliable lifts, pool safety, and parking. Furnishing should include durable finishes and child-safe balcony considerations where applicable.",
            "Leases of 12–24 months are common for family tenants when schools and commute routes align with JB employment hubs.",
          ],
        },
      ],
      facts: [
        { label: "Lease length", value: "Often 12–24 months for families" },
        { label: "Furnishing", value: "Full family sets vs room rental" },
        { label: "Safety", value: "Window grilles, balcony checks" },
        { label: "Support", value: "Inspection + maintenance coordination" },
      ],
      quickLinks: [
        { label: "Lifestyle", slug: "danga-bay/lifestyle" },
        { label: "Rental Market", slug: "danga-bay/rental-market" },
        { label: "丹加湾指南", slug: "guide/danga-bay" },
        { label: "Book Inspection", slug: "property-inspection-service" },
      ],
      faq: [
        {
          q: "Room rental vs whole unit for families?",
          a: "Whole-unit family leases typically yield more stable tenancy; room rental suits student markets in other towers.",
        },
      ],
    },
    zh: {
      slug: "danga-bay-family-living",
      title: "丹加湾家庭居住",
      subtitle: "学校、安全与长期租客",
      intro: "面向丹加湾业主的家庭居住指南：安全预期、家庭装修、学校通达及支持多年租约的配套。",
      seoTitle: "丹加湾家庭居住指南 | 新山",
      seoDescription: "丹加湾家庭居住：学校、安全、装修及家庭长租管理。",
      seoKeywords: "丹加湾家庭, 新山家庭公寓",
      whatsappMessage: "您好，我想在丹加湾面向家庭租客出租。",
      relatedServiceSlug: "property-management-services",
      leadSource: "danga-bay/family-living",
      sections: [
        {
          title: "家庭租客画像",
          paragraphs: [
            "家庭重视窗户安全、电梯可靠、泳池安全及车位。装修应采用耐用材料并考虑儿童阳台安全。",
            "若学校与通勤与新山就业区匹配，家庭租约常见 12–24 个月。",
          ],
        },
      ],
      facts: [
        { label: "租期", value: "家庭客常见 12–24 个月" },
        { label: "装修", value: "全套家庭配置 vs 分租" },
        { label: "安全", value: "窗栅、阳台检查" },
        { label: "支持", value: "验房与维修协调" },
      ],
      quickLinks: [
        { label: "生活方式", slug: "danga-bay/lifestyle" },
        { label: "租赁市场", slug: "danga-bay/rental-market" },
        { label: "丹加湾指南", slug: "guide/danga-bay" },
        { label: "预约验房", slug: "property-inspection-service" },
      ],
      faq: [{ q: "家庭整租还是分租？", a: "整租家庭客通常更稳定；分租更适合其他塔楼的学生市场。" }],
    },
  },
  golf: {
    en: {
      slug: "golf",
      relatedServiceSlug: "golf-travel-services",
      leadSource: "golf",
      title: "Golf Travel Center",
      subtitle: "Golf Stay & Play · Corporate Tours · Property Tours",
      intro:
        "Plan golf travel in Johor Bahru with Forest City Golf Resort. We offer Golf Stay & Play packages, Corporate Golf Tours, and Golf Property Tours combining tee times with unit viewings.",
      seoTitle: "Golf Travel Center Johor | Stay, Play & Property Tours",
      seoDescription:
        "Golf Stay & Play, Corporate Golf Tours, and Golf Property Tours at Forest City with hotel and viewing coordination.",
      seoKeywords: "golf travel Johor, Forest City golf package, corporate golf tour",
      whatsappMessage: "Hi, I need a golf travel package in Johor Bahru.",
      sections: [
        {
          title: "Golf Stay & Play",
          paragraphs: [
            "Multi-day packages with hotel stays, daily tee times at Forest City Golf Resort, and leisure time at the marina or resort hotels.",
          ],
        },
        {
          title: "Corporate Golf Tours",
          paragraphs: [
            "Team outings with group tee sheets, meeting or lunch options, and optional briefings on Iskandar property markets.",
          ],
        },
        {
          title: "Golf Property Tours",
          paragraphs: [
            "Owner-buyers combine two rounds with guided unit inspections and management introductions — ideal for overseas due diligence trips.",
          ],
        },
      ],
      facts: [
        { label: "Base course", value: "Forest City Golf Resort" },
        { label: "Services", value: "Stay & Play, Corporate, Property Tours" },
        { label: "Add-ons", value: "Hotel, transport, viewing slots" },
        { label: "Response", value: "Package quote within 24 hours" },
      ],
      quickLinks: [
        { label: "Forest City Golf", slug: "forest-city-golf" },
        { label: "Forest City Hotels", slug: "forest-city-hotels" },
        { label: "Golf Travel Desk", slug: "golf-travel-center" },
        { label: "Book Viewing", slug: "book-viewing" },
        { label: "Corporate Visits", slug: "corporate-visits" },
      ],
      faq: [
        {
          q: "Minimum group size?",
          a: "Packages available from solo travellers to corporate groups of 20+; pricing scales with group size and season.",
        },
      ],
    },
    zh: {
      slug: "golf",
      relatedServiceSlug: "golf-travel-services",
      leadSource: "golf",
      title: "高尔夫旅行中心",
      subtitle: "打球住宿 · 企业高尔夫 · 物业考察团",
      intro:
        "在柔佛规划森林城市高尔夫旅行：打球住宿套餐、企业高尔夫团及结合开球与看房的物业考察团。",
      seoTitle: "柔佛高尔夫旅行中心 | 住宿打球与看房",
      seoDescription: "森林城市 Golf Stay & Play、企业高尔夫团及物业考察团，含酒店与看房协调。",
      seoKeywords: "柔佛高尔夫, 森林城市高尔夫套餐, 企业高尔夫",
      whatsappMessage: "您好，我需要柔佛高尔夫旅行套餐。",
      sections: [
        { title: "打球住宿套餐", paragraphs: ["含酒店、每日 Forest City 开球及 marina/度假酒店休闲时间。"] },
        { title: "企业高尔夫团", paragraphs: ["团体开球、会议或午餐选项，可加依斯干达物业市场简介。"] },
        { title: "物业考察团", paragraphs: ["买家可两场球+ guided 验房及管理方介绍，适合海外尽调行程。"] },
      ],
      facts: [
        { label: "球场", value: "森林城市高尔夫度假村" },
        { label: "服务", value: "住宿打球、企业团、考察团" },
        { label: "附加", value: "酒店、交通、看房时段" },
        { label: "回复", value: "24 小时内报价" },
      ],
      quickLinks: [
        { label: "森林城市高尔夫", slug: "forest-city-golf" },
        { label: "森林城市酒店", slug: "forest-city-hotels" },
        { label: "高尔夫服务台", slug: "golf-travel-center" },
        { label: "预约看房", slug: "book-viewing" },
        { label: "企业访问", slug: "corporate-visits" },
      ],
      faq: [{ q: "最少几人？", a: "单人至 20+ 企业团均可；价格随人数与季节调整。" }],
    },
  },
  "corporate-visits": {
    en: {
      slug: "corporate-visits",
      relatedServiceSlug: "corporate-visit-services",
      leadSource: "corporate-visits",
      title: "Corporate Visit Center",
      subtitle: "Factory visits, investment tours & property inspections",
      intro:
        "Structured corporate programs for teams visiting Johor Bahru — manufacturing site visits, investment briefings, and guided property inspections across Iskandar.",
      seoTitle: "Corporate Visit Center Johor Bahru | Factory & Property Tours",
      seoDescription:
        "Corporate visit programs: factory tours, investment briefings, and property inspection tours in Johor Bahru and Iskandar.",
      seoKeywords: "corporate visit Johor, factory tour JB, investment tour Malaysia",
      whatsappMessage: "Hi, we need corporate visit support in Johor Bahru.",
      sections: [
        {
          title: "Factory & industrial visits",
          paragraphs: [
            "Site visits to Johor industrial zones with logistics briefing for investors evaluating supply-chain footprint.",
          ],
        },
        {
          title: "Investment tours",
          paragraphs: [
            "Iskandar macro briefing plus routed visits to Forest City, R&F Princess Cove, and Danga Bay with bilingual escort.",
          ],
        },
        {
          title: "Property inspection tours",
          paragraphs: [
            "Acquisition teams view units, meet management offices, and optionally receive photo or video diligence reports.",
          ],
        },
      ],
      facts: [
        { label: "Coverage", value: "Johor Bahru & Iskandar" },
        { label: "Programs", value: "Factory, investment, inspection" },
        { label: "Languages", value: "English & Chinese escort" },
        { label: "Lead time", value: "Itinerary confirmation within 24h" },
      ],
      quickLinks: [
        { label: "Corporate Visit Desk", slug: "corporate-visit-center" },
        { label: "Johor Corporate Guide", slug: "guide/johor-corporate-visit" },
        { label: "Forest City Hotels", slug: "forest-city-hotels" },
        { label: "Book Viewing", slug: "book-viewing" },
        { label: "Golf Travel", slug: "golf" },
      ],
      faq: [
        {
          q: "Can visits combine factory and property?",
          a: "Yes — multi-day itineraries commonly mix industrial sites with afternoon property briefings.",
        },
      ],
    },
    zh: {
      slug: "corporate-visits",
      relatedServiceSlug: "corporate-visit-services",
      leadSource: "corporate-visits",
      title: "企业访问中心",
      subtitle: "工厂参观、投资考察与物业验房",
      intro: "为新山企业考察团提供结构化行程——工厂参观、投资简介及依斯干达 guided 物业验房。",
      seoTitle: "新山企业访问中心 | 工厂与物业考察",
      seoDescription: "企业访问项目：工厂参观、投资考察及新山/依斯干达物业验房团。",
      seoKeywords: "新山企业访问, 工厂参观, 投资考察",
      whatsappMessage: "您好，我们需要新山企业访问支持。",
      sections: [
        { title: "工厂与工业参观", paragraphs: ["依斯干达工业区实地考察及供应链布局简介。"] },
        { title: "投资考察", paragraphs: ["宏观简介并 routing 森林城市、富力公主湾、丹加湾，中英文陪同。"] },
        { title: "物业验房团", paragraphs: ["收购团队验房、会见管理处，可选 photo/video 尽调报告。"] },
      ],
      facts: [
        { label: "覆盖", value: "新山及依斯干达" },
        { label: "项目", value: "工厂、投资、验房" },
        { label: "语言", value: "中英文陪同" },
        { label: "响应", value: "24 小时内确认行程" },
      ],
      quickLinks: [
        { label: "企业服务台", slug: "corporate-visit-center" },
        { label: "企业访问指南", slug: "guide/johor-corporate-visit" },
        { label: "森林城市酒店", slug: "forest-city-hotels" },
        { label: "预约看房", slug: "book-viewing" },
        { label: "高尔夫旅行", slug: "golf" },
      ],
      faq: [{ q: "能否工厂+物业同日？", a: "可以——多日行程常上午工业下午物业。" }],
    },
  },
  mm2h: {
    en: {
      slug: "mm2h",
      relatedServiceSlug: "mm2h-landing-support",
      leadSource: "mm2h",
      title: "MM2H Center",
      subtitle: "Malaysia My Second Home & property landing",
      intro:
        "Planning MM2H while buying in Forest City, R&F Princess Cove, or Danga Bay? Practical property landing steps — we assist housing; immigration via licensed agents.",
      seoTitle: "MM2H Center Johor Bahru | Second Home & Property",
      seoDescription:
        "MM2H property landing center: Johor Bahru buying guide, Forest City, R&F, Danga Bay links, and landing support.",
      seoKeywords: "MM2H Johor, second home Malaysia, MM2H property",
      whatsappMessage: "Hi, MM2H landing support in JB.",
      sections: [
        {
          title: "MM2H and property",
          paragraphs: [
            "Many buyers purchase in JB while planning MM2H. We assist property landing, tenancy setup, and local coordination; immigration paperwork via licensed professionals.",
          ],
        },
        {
          title: "Johor project links",
          paragraphs: [
            "Forest City suits lifestyle and golf-oriented holders; R&F targets CIQ proximity; Danga Bay offers mature rental markets at lower entry points.",
          ],
        },
      ],
      facts: [
        { label: "Scope", value: "Property landing — not immigration legal advice" },
        { label: "Projects", value: "Forest City, R&F, Danga Bay" },
        { label: "Support", value: "Viewing, management, MM2H coordination" },
        { label: "Referrals", value: "Licensed MM2H agents on request" },
      ],
      quickLinks: [
        { label: "MM2H Topic (legacy)", slug: "topics/mm2h" },
        { label: "MM2H Service", slug: "services/mm2h-landing-support" },
        { label: "Forest City", slug: "forest-city" },
        { label: "R&F Princess Cove", slug: "rf-princess-cove" },
        { label: "Danga Bay", slug: "danga-bay" },
      ],
      faq: [
        {
          q: "Are you a licensed MM2H agent?",
          a: "No. We refer immigration matters to licensed professionals and focus on property landing.",
        },
      ],
    },
    zh: {
      slug: "mm2h",
      relatedServiceSlug: "mm2h-landing-support",
      leadSource: "mm2h",
      title: "MM2H 中心",
      subtitle: "马来西亚第二家园与物业落地",
      intro: "规划 MM2H 同时购买森林城市、富力或丹加湾？我们协助物业落地；移民手续通过 licensed 代理。",
      seoTitle: "MM2H 中心新山 | 第二家园与物业",
      seoDescription: "MM2H 物业落地中心：新山购房、森林城市/富力/丹加湾链接及落地支持。",
      seoKeywords: "MM2H 新山, 第二家园, MM2H 物业",
      whatsappMessage: "您好，我需要新山 MM2H 落地支持。",
      sections: [
        {
          title: "MM2H 与物业",
          paragraphs: ["许多买家在规划 MM2H 时购入新山物业。我们协助落地、租务及本地协调；移民文件由 licensed 专业人士办理。"],
        },
        {
          title: "柔佛项目链接",
          paragraphs: ["森林城市偏 lifestyle/高尔夫；富力近 CIQ；丹加湾租赁市场成熟、门槛较低。"],
        },
      ],
      facts: [
        { label: "范围", value: "物业落地，非移民法律意见" },
        { label: "项目", value: "森林城市、富力、丹加湾" },
        { label: "支持", value: "看房、管理、MM2H 协调" },
        { label: "转介", value: "可按需介绍 licensed MM2H 代理" },
      ],
      quickLinks: [
        { label: "MM2H 专题页", slug: "topics/mm2h" },
        { label: "MM2H 服务", slug: "services/mm2h-landing-support" },
        { label: "森林城市", slug: "forest-city" },
        { label: "富力公主湾", slug: "rf-princess-cove" },
        { label: "丹加湾", slug: "danga-bay" },
      ],
      faq: [{ q: "是否为 licensed MM2H 代理？", a: "否。移民事项转介 licensed 专业人士，我们专注物业落地。" }],
    },
  },
};

function buildJson(pageKey, locale, data) {
  const out = { ...data, labels: labels(locale) };
  if (data.mediaSectionId) {
    // keep mediaSectionId for runtime resolution
  } else if (pageKey.startsWith("princess-cove")) {
    out.gallery = galleryFromPreset(rfGallery, locale);
  } else if (pageKey.startsWith("danga-bay")) {
    out.gallery = galleryFromPreset(dangaGallery, locale);
  } else if (pageKey === "golf") {
    out.gallery = galleryFromMedia("golf-resort", locale);
  }
  return out;
}

for (const [pageKey, locales] of Object.entries(pages)) {
  for (const locale of ["en", "zh"]) {
    const dir = path.join(root, "src/lib/i18n/content-hubs", locale);
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${pageKey}.json`);
    fs.writeFileSync(file, JSON.stringify(buildJson(pageKey, locale, locales[locale]), null, 2) + "\n");
    console.log("wrote", file);
  }
}

console.log("Done:", Object.keys(pages).length * 2, "files");
