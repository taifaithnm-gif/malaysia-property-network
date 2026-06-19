#!/usr/bin/env node
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const guidesDir = join(__dirname, "../src/lib/i18n/guides");

function countGuideWords(guide, locale) {
  const text = [
    guide.intro,
    ...guide.overview,
    ...guide.propertyManagement,
    ...guide.rental,
    ...guide.investment,
  ].join(" ");
  if (locale === "zh") {
    const cjk = (text.match(/[\u4e00-\u9fff]/g) || []).length;
    const latin = (text.replace(/[\u4e00-\u9fff]/g, " ").match(/\b\w+\b/g) || []).length;
    return cjk + latin;
  }
  return text.split(/\s+/).filter(Boolean).length;
}

function writeGuide(locale, key, content) {
  const dir = join(guidesDir, locale);
  mkdirSync(dir, { recursive: true });
  const path = join(dir, `${key}.json`);
  writeFileSync(path, JSON.stringify(content, null, 2) + "\n", "utf8");
  return path;
}

// Guide content is defined below — imported from content modules in same file
import { GUIDES } from "./phase4-guide-content.mjs";

const OUTPUTS = [];
for (const [key, locales] of Object.entries(GUIDES)) {
  for (const [locale, content] of Object.entries(locales)) {
    const path = writeGuide(locale, key, content);
    const words = countGuideWords(content, locale);
    OUTPUTS.push({ path, locale, key, words });
    console.log(`${path}: ${words} words`);
    if (words < 2000) {
      console.error(`ERROR: ${path} has only ${words} words (minimum 2000)`);
      process.exit(1);
    }
  }
}

console.log(`\nWrote ${OUTPUTS.length} guide files.`);
