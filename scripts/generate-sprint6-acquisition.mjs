#!/usr/bin/env node
/** Sprint 06 — lead magnet downloads from Sprint 05 research reports. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const downloadsDir = path.join(root, "public/downloads");

const GUIDES = [
  {
    file: "johor-rental-market-report.md",
    reportKey: "johor-rental-market",
    enTitle: "Johor Rental Market Report",
    zhTitle: "新山租赁市场报告",
  },
  {
    file: "forest-city-owner-guide.md",
    reportKey: "forest-city-owner",
    enTitle: "Forest City Owner Guide",
    zhTitle: "森林城市业主指南",
  },
  {
    file: "singapore-commuter-housing-guide.md",
    reportKey: "singapore-commuter-housing",
    enTitle: "Singapore Commuter Housing Guide",
    zhTitle: "新加坡通勤住房指南",
  },
];

function loadReport(locale, key) {
  const p = path.join(root, `src/lib/i18n/research/${locale}/${key}.json`);
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function buildMarkdown(report, locale) {
  const isZh = locale === "zh";
  const lines = [
    `# ${report.title}`,
    "",
    `> ${report.subtitle}`,
    "",
    report.intro,
    "",
    `*${isZh ? "发布日期" : "Published"}: ${report.published}*`,
    "",
    `*${isZh ? "马来西亚房产网络 — 新山物业研究" : "Malaysia Property Network — Johor Property Intelligence"}*`,
    "",
    "---",
    "",
  ];

  for (const section of report.sections) {
    lines.push(`## ${section.title}`, "");
    for (const p of section.paragraphs) {
      lines.push(p, "");
    }
  }

  lines.push(
    "---",
    "",
    isZh
      ? "完整在线报告及最新数据请访问 malaysiapropertynetwork.com/research"
      : "Read the full online report at malaysiapropertynetwork.com/research",
    "",
  );

  return lines.join("\n");
}

fs.mkdirSync(downloadsDir, { recursive: true });

for (const guide of GUIDES) {
  const enReport = loadReport("en", guide.reportKey);
  const zhReport = loadReport("zh", guide.reportKey);

  const enMd = buildMarkdown(enReport, "en");
  const zhMd = buildMarkdown(zhReport, "zh");

  const combined = [
    enMd,
    "",
    "---",
    "",
    zhMd,
  ].join("\n");

  fs.writeFileSync(path.join(downloadsDir, guide.file), combined);
  console.log(`Wrote ${guide.file}`);
}

console.log("Sprint 06 acquisition assets generated.");
