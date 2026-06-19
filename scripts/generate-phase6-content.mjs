#!/usr/bin/env node
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { mkdirSync, writeFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "../src/lib/i18n");

function writeTopics() {
  const items = {
    mm2h: {
      en: {
        slug: "mm2h", relatedServiceSlug: "mm2h-landing-support", leadSource: "topics/mm2h",
        title: "MM2H & Property Landing in Johor Bahru", subtitle: "Malaysia My Second Home guide",
        intro: "Planning MM2H and buying in Forest City, R&F, or Danga Bay? Practical landing steps — not immigration legal advice.",
        seoTitle: "MM2H Johor Bahru Topic", seoDescription: "MM2H property landing guide Johor Bahru.",
        seoKeywords: "MM2H Johor, second home Malaysia", whatsappMessage: "Hi, MM2H landing support in JB.",
        labels: { sectionsTitle: "Key Topics", quickLinksTitle: "Related", servicesTitle: "Services", faqTitle: "FAQ", ctaTitle: "Discuss MM2H", ctaDesc: "Tell us your timeline." },
        sections: [{ title: "MM2H and property", paragraphs: ["Many buyers purchase in JB while planning MM2H. We assist property landing; immigration via licensed agents."] }],
        quickLinks: [{ label: "FC Resource Center", slug: "forest-city/resource-center" }, { label: "MM2H Service", slug: "services/mm2h-landing-support" }],
        faq: [{ q: "Licensed MM2H agent?", a: "No. We refer immigration to licensed professionals." }],
      },
      zh: {
        slug: "mm2h", relatedServiceSlug: "mm2h-landing-support", leadSource: "topics/mm2h",
        title: "MM2H 与新山房产落地", subtitle: "第二家园实用指南",
        intro: "计划 MM2H 并在森林城市、富力或丹加湾购产？落地实务介绍——非法律意见。",
        seoTitle: "MM2H 新山专题", seoDescription: "MM2H 房产落地指南。",
        seoKeywords: "MM2H 新山", whatsappMessage: "您好，想了解 MM2H 落地支持。",
        labels: { sectionsTitle: "核心主题", quickLinksTitle: "相关", servicesTitle: "服务", faqTitle: "FAQ", ctaTitle: "咨询 MM2H", ctaDesc: "告知时间线。" },
        sections: [{ title: "MM2H 与房产", paragraphs: ["许多买家在规划 MM2H 时于新山购产。我们协助房产落地，移民转介持牌代理。"] }],
        quickLinks: [{ label: "森林城市资料中心", slug: "forest-city/resource-center" }, { label: "MM2H 服务", slug: "services/mm2h-landing-support" }],
        faq: [{ q: "持牌 MM2H 代理？", a: "不是，移民事宜转介专业人士。" }],
      },
    },
    "corporate-visit": {
      en: {
        slug: "corporate-visit", relatedServiceSlug: "corporate-visit-services", leadSource: "topics/corporate-visit",
        title: "Corporate Property Visit & Reception", subtitle: "Investor escort in Johor Bahru",
        intro: "Bilingual escort for teams visiting Forest City, R&F, or Danga Bay.",
        seoTitle: "Corporate Visit Topic Johor", seoDescription: "Corporate property visit reception.",
        seoKeywords: "corporate visit Johor", whatsappMessage: "Hi, corporate visit support JB.",
        labels: { sectionsTitle: "Services", quickLinksTitle: "Related", servicesTitle: "Services", faqTitle: "FAQ", ctaTitle: "Plan Visit", ctaDesc: "Share dates and goals." },
        sections: [{ title: "Visit planning", paragraphs: ["We align acquisition or audit goals before scheduling towers across Iskandar."] }],
        quickLinks: [{ label: "Visit Guide", slug: "guide/johor-corporate-visit" }, { label: "Visit Service", slug: "services/corporate-visit-services" }],
        faq: [{ q: "Airport pickup?", a: "Yes, in custom itineraries." }],
      },
      zh: {
        slug: "corporate-visit", relatedServiceSlug: "corporate-visit-services", leadSource: "topics/corporate-visit",
        title: "企业考察与接待专题", subtitle: "新山投资看楼陪同",
        intro: "为考察森林城市、富力、丹加湾的团队提供中英文陪同。",
        seoTitle: "企业考察专题新山", seoDescription: "商务考察接待。",
        seoKeywords: "企业考察新山", whatsappMessage: "您好，需要商务考察陪同。",
        labels: { sectionsTitle: "服务", quickLinksTitle: "相关", servicesTitle: "服务", faqTitle: "FAQ", ctaTitle: "规划行程", ctaDesc: "告知日期与目标。" },
        sections: [{ title: "行程规划", paragraphs: ["先明确收购或审计目标，再安排跨依斯干达看楼。"] }],
        quickLinks: [{ label: "考察指南", slug: "guide/johor-corporate-visit" }, { label: "考察服务", slug: "services/corporate-visit-services" }],
        faq: [{ q: "接机？", a: "可以，纳入定制行程。" }],
      },
    },
    "golf-travel": {
      en: {
        slug: "golf-travel", relatedServiceSlug: "golf-travel-services", leadSource: "topics/golf-travel",
        title: "Golf Travel & Property", subtitle: "Forest City golf + property visits",
        intro: "Combine golf at Forest City with unit inspections on the same trip.",
        seoTitle: "Golf Travel Topic Johor", seoDescription: "Golf travel and property visits.",
        seoKeywords: "Forest City golf travel", whatsappMessage: "Hi, golf travel + property visit.",
        labels: { sectionsTitle: "Options", quickLinksTitle: "Related", servicesTitle: "Services", faqTitle: "FAQ", ctaTitle: "Plan Trip", ctaDesc: "Share dates." },
        sections: [{ title: "Golf + property", paragraphs: ["Morning golf, afternoon inspection — popular for FC owners."] }],
        quickLinks: [{ label: "Golf Resort Topic", slug: "forest-city/golf-resort" }, { label: "Golf Service", slug: "services/golf-travel-services" }],
        faq: [{ q: "Which courses?", a: "Forest City Golf Resort, Austin Hills, Pulai Springs." }],
      },
      zh: {
        slug: "golf-travel", relatedServiceSlug: "golf-travel-services", leadSource: "topics/golf-travel",
        title: "高尔夫旅游专题", subtitle: "打球与看楼",
        intro: "森林城市打球行程可结合验房。",
        seoTitle: "高尔夫旅游专题", seoDescription: "高尔夫与看楼。",
        seoKeywords: "森林城市高尔夫", whatsappMessage: "您好，高尔夫旅游并看楼。",
        labels: { sectionsTitle: "选项", quickLinksTitle: "相关", servicesTitle: "服务", faqTitle: "FAQ", ctaTitle: "规划行程", ctaDesc: "告知日期。" },
        sections: [{ title: "打球+看楼", paragraphs: ["上午打球、下午验房——森林城市业主常见组合。"] }],
        quickLinks: [{ label: "高尔夫专题", slug: "forest-city/golf-resort" }, { label: "高尔夫服务", slug: "services/golf-travel-services" }],
        faq: [{ q: "哪些球场？", a: "森林城市高尔夫度假村等，视档期。" }],
      },
    },
    "forest-city-golf-resort": {
      en: {
        slug: "forest-city-golf-resort", relatedServiceSlug: "golf-travel-services", leadSource: "forest-city/golf-resort",
        title: "Forest City Golf Resort", subtitle: "Golf, leisure & property",
        intro: "Golf resort topic for Forest City owners and visitors.",
        seoTitle: "Forest City Golf Resort Topic", seoDescription: "Golf resort and property topic.",
        seoKeywords: "Forest City Golf Resort", whatsappMessage: "Hi, Forest City Golf Resort.",
        labels: { sectionsTitle: "Resort & Property", quickLinksTitle: "Related", servicesTitle: "Services", faqTitle: "FAQ", ctaTitle: "Enquire", ctaDesc: "Golf or property services." },
        sections: [{ title: "Context", paragraphs: ["Resort within Forest City development; owners combine play with unit checks."] }],
        quickLinks: [{ label: "Resource Center", slug: "forest-city/resource-center" }, { label: "Full Guide", slug: "guide/forest-city-golf-resort" }],
        faq: [{ q: "Inspect on golf trip?", a: "Yes when schedule permits." }],
      },
      zh: {
        slug: "forest-city-golf-resort", relatedServiceSlug: "golf-travel-services", leadSource: "forest-city/golf-resort",
        title: "森林城市高尔夫度假村专题", subtitle: "打球与房产",
        intro: "森林城市高尔夫度假村专题页。",
        seoTitle: "森林城市高尔夫专题", seoDescription: "高尔夫与房产。",
        seoKeywords: "森林城市高尔夫", whatsappMessage: "您好，森林城市高尔夫度假村。",
        labels: { sectionsTitle: "度假村与房产", quickLinksTitle: "相关", servicesTitle: "服务", faqTitle: "FAQ", ctaTitle: "咨询", ctaDesc: "打球或房产服务。" },
        sections: [{ title: "背景", paragraphs: ["度假村位于森林城市内，业主常打球同时看楼。"] }],
        quickLinks: [{ label: "资料中心", slug: "forest-city/resource-center" }, { label: "完整指南", slug: "guide/forest-city-golf-resort" }],
        faq: [{ q: "打球同时验房？", a: "可以，视时间安排。" }],
      },
    },
  };

  for (const locale of ["en", "zh"]) {
    mkdirSync(join(root, "topics", locale), { recursive: true });
    for (const [name, data] of Object.entries(items)) {
      writeFileSync(join(root, "topics", locale, `${name}.json`), JSON.stringify(data[locale], null, 2) + "\n");
    }
  }
}

function writeArchives() {
  const mk = (slug, leadSource, en, zh) => ({ slug, leadSource, en: { ...en, slug, leadSource }, zh: { ...zh, slug, leadSource } });
  const items = [
    mk("forest-city-resource-center", "forest-city/resource-center",
      { title: "Forest City Resource Center", subtitle: "Project hub", intro: "Hub for FC profiles, guides, golf, services.", seoTitle: "FC Resource Center", seoDescription: "Forest City hub", seoKeywords: "Forest City hub", whatsappMessage: "Hi, FC resources.", labels: { hubTitle: "FC owner hub", sectionsTitle: "About", resourcesTitle: "Library", servicesTitle: "Services", ctaTitle: "Contact", ctaDesc: "24h response." }, sections: [{ title: "For overseas owners", paragraphs: ["Curated public info and service links in EN/ZH."] }], resources: [{ label: "Profile", slug: "forest-city", desc: "Gallery & facts" }, { label: "Guide", slug: "guide/forest-city", desc: "Full guide" }, { label: "Golf Topic", slug: "forest-city/golf-resort", desc: "Golf special" }, { label: "List Property", slug: "list-property", desc: "Submit unit" }], faq: [] },
      { title: "森林城市项目资料中心", subtitle: "项目枢纽", intro: "森林城市简介、指南、高尔夫、服务一站式入口。", seoTitle: "森林城市资料中心", seoDescription: "森林城市枢纽", seoKeywords: "森林城市资料", whatsappMessage: "您好，森林城市资源。", labels: { hubTitle: "业主枢纽", sectionsTitle: "关于", resourcesTitle: "资料库", servicesTitle: "服务", ctaTitle: "联系", ctaDesc: "24小时回复。" }, sections: [{ title: "面向海外业主", paragraphs: ["中/英文公开信息与服务链接。"] }], resources: [{ label: "项目简介", slug: "forest-city", desc: "图集概况" }, { label: "指南", slug: "guide/forest-city", desc: "完整指南" }, { label: "高尔夫专题", slug: "forest-city/golf-resort", desc: "高尔夫" }, { label: "提交房源", slug: "list-property", desc: "登记单位" }], faq: [] }),
    mk("rf-princess-cove-archive", "rf-princess-cove/archive",
      { title: "R&F Princess Cove Archive", subtitle: "Complete project file", intro: "Complete R&F archive for overseas owners.", seoTitle: "R&F Archive", seoDescription: "R&F project archive", seoKeywords: "R&F archive", whatsappMessage: "Hi, R&F resources.", labels: { hubTitle: "R&F hub", sectionsTitle: "Overview", resourcesTitle: "Files", servicesTitle: "Services", ctaTitle: "Contact", ctaDesc: "R&F services." }, sections: [{ title: "CIQ waterfront", paragraphs: ["Premium Causeway-adjacent address."] }], resources: [{ label: "Profile", slug: "rf-princess-cove", desc: "Gallery" }, { label: "Guide", slug: "guide/rf-princess-cove", desc: "Guide" }, { label: "Management", slug: "rf-princess-cove-property-management", desc: "Landing" }], faq: [] },
      { title: "富力公主湾完整项目档案", subtitle: "完整档案", intro: "富力公主湾完整项目档案。", seoTitle: "富力档案", seoDescription: "富力公主湾档案", seoKeywords: "富力档案", whatsappMessage: "您好，富力资源。", labels: { hubTitle: "富力枢纽", sectionsTitle: "概览", resourcesTitle: "文件", servicesTitle: "服务", ctaTitle: "联系", ctaDesc: "富力服务。" }, sections: [{ title: "通关滨水", paragraphs: ["近通关高端地址。"] }], resources: [{ label: "简介", slug: "rf-princess-cove", desc: "图集" }, { label: "指南", slug: "guide/rf-princess-cove", desc: "指南" }, { label: "托管", slug: "rf-princess-cove-property-management", desc: "专题" }], faq: [] }),
    mk("danga-bay-archive", "danga-bay/archive",
      { title: "Danga Bay Archive", subtitle: "Project file", intro: "Danga Bay complete archive.", seoTitle: "Danga Bay Archive", seoDescription: "Danga Bay archive", seoKeywords: "Danga Bay archive", whatsappMessage: "Hi, Danga Bay.", labels: { hubTitle: "Danga Bay hub", sectionsTitle: "Overview", resourcesTitle: "Files", servicesTitle: "Services", ctaTitle: "Contact", ctaDesc: "DB services." }, sections: [{ title: "Mature market", paragraphs: ["Established waterfront district."] }], resources: [{ label: "Profile", slug: "danga-bay", desc: "Gallery" }, { label: "Guide", slug: "guide/danga-bay", desc: "Guide" }, { label: "Management", slug: "danga-bay-property-management", desc: "Landing" }], faq: [] },
      { title: "丹加湾项目档案", subtitle: "项目档案", intro: "丹加湾完整档案。", seoTitle: "丹加湾档案", seoDescription: "丹加湾档案", seoKeywords: "丹加湾档案", whatsappMessage: "您好，丹加湾。", labels: { hubTitle: "丹加湾枢纽", sectionsTitle: "概览", resourcesTitle: "文件", servicesTitle: "服务", ctaTitle: "联系", ctaDesc: "丹加湾服务。" }, sections: [{ title: "成熟市场", paragraphs: ["成熟滨水区。"] }], resources: [{ label: "简介", slug: "danga-bay", desc: "图集" }, { label: "指南", slug: "guide/danga-bay", desc: "指南" }, { label: "托管", slug: "danga-bay-property-management", desc: "专题" }], faq: [] }),
  ];

  const files = ["forest-city-resource-center", "rf-princess-cove-archive", "danga-bay-archive"];
  for (const locale of ["en", "zh"]) {
    mkdirSync(join(root, "project-archives", locale), { recursive: true });
    items.forEach((item, i) => {
      writeFileSync(join(root, "project-archives", locale, `${files[i]}.json`), JSON.stringify(item[locale], null, 2) + "\n");
    });
  }
}

writeTopics();
writeArchives();
console.log("Phase 6 content generated");
