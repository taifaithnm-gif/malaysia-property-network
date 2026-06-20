#!/usr/bin/env node
/** Scan galleries, profiles, listings for duplicate / placeholder / cross-project image reuse. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function walk(dir, ext, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, ext, files);
    else if (e.name.endsWith(ext)) files.push(p);
  }
  return files;
}

function extractImages(obj, source, images = []) {
  if (!obj || typeof obj !== "object") return images;
  if (typeof obj.src === "string" && obj.src.includes("unsplash")) {
    images.push({ src: obj.src, source });
  }
  if (typeof obj.image_url === "string" && obj.image_url.includes("unsplash")) {
    images.push({ src: obj.image_url, source });
  }
  for (const v of Object.values(obj)) {
    if (Array.isArray(v)) v.forEach((item) => extractImages(item, source, images));
    else if (v && typeof v === "object") extractImages(v, source, images);
  }
  return images;
}

function photoId(src) {
  const m = src.match(/photo-([a-f0-9-]+)/i);
  return m ? m[1] : src.split("?")[0];
}

function normalize(src) {
  return photoId(src);
}

const sources = [];

// media-center galleries
for (const f of walk(path.join(root, "src/lib/i18n/media-center"), ".json")) {
  const data = JSON.parse(fs.readFileSync(f, "utf8"));
  extractImages(data, `media-center/${path.basename(f)}`, sources);
}

// project profiles
for (const f of walk(path.join(root, "src/lib/i18n/project-profiles"), ".json")) {
  const data = JSON.parse(fs.readFileSync(f, "utf8"));
  extractImages(data, `project-profiles/${path.relative(path.join(root, "src/lib/i18n/project-profiles"), f)}`, sources);
}

// content hubs
const hubDir = path.join(root, "src/lib/i18n/content-hubs");
if (fs.existsSync(hubDir)) {
  for (const f of walk(hubDir, ".json")) {
    const data = JSON.parse(fs.readFileSync(f, "utf8"));
    extractImages(data, `content-hubs/${path.relative(hubDir, f)}`, sources);
  }
}

// listing inventory CSVs
for (const csvPath of [
  "OPERATIONS/sprint-03/inventory_master_v3.csv",
  "OPERATIONS/sprint-01/inventory_master.csv",
]) {
  const full = path.join(root, csvPath);
  if (!fs.existsSync(full)) continue;
  const lines = fs.readFileSync(full, "utf8").split("\n").slice(1);
  for (const line of lines) {
    if (!line.trim()) continue;
    const cols = line.split(",");
    const url = cols.find((c) => c.includes("unsplash"));
    if (url) sources.push({ src: url.replace(/"/g, ""), source: csvPath });
  }
}

const byId = new Map();
const bySrc = new Map();
const bySource = new Map();

for (const img of sources) {
  const id = normalize(img.src);
  if (!byId.has(id)) byId.set(id, []);
  byId.get(id).push(img);
  if (!bySrc.has(img.src)) bySrc.set(img.src, []);
  bySrc.get(img.src).push(img);
  const srcFile = img.source.split("/")[0];
  bySource.set(srcFile, (bySource.get(srcFile) ?? 0) + 1);
}

const duplicateIds = [...byId.entries()].filter(([, v]) => v.length > 1).sort((a, b) => b[1].length - a[1].length);
const crossProject = duplicateIds.filter(([, imgs]) => {
  const projects = new Set(imgs.map((i) => i.source.split("/")[0] + i.source));
  return new Set(imgs.map((i) => i.source)).size > 1;
});

const placeholderPatterns = sources.filter(
  (i) => i.src.includes("sig=s3-") || i.src.includes("photo-1545324418"),
);

const total = sources.length;
const uniqueIds = byId.size;
const dupRate = total ? (((total - uniqueIds) / total) * 100).toFixed(1) : "0";

let md = `# Image Audit Report

**Generated:** ${new Date().toISOString().slice(0, 10)}  
**Scope:** Project galleries, profile heroes, content hubs, listing inventory CSVs

---

## Summary

| Metric | Count |
|--------|-------|
| Total image references | ${total} |
| Unique Unsplash photo IDs | ${uniqueIds} |
| Duplicate photo ID groups | ${duplicateIds.length} |
| Estimated duplicate rate | ${dupRate}% |
| Placeholder / pooled assets (sig=s3-) | ${placeholderPatterns.length} |
| Cross-source duplicate groups | ${crossProject.length} |

---

## Findings

### 1. Duplicate images (same Unsplash photo ID)

${duplicateIds.length === 0 ? "_No duplicates found._" : ""}
${duplicateIds
  .slice(0, 25)
  .map(
    ([id, imgs]) =>
      `#### \`${id}\` — ${imgs.length} uses\n${imgs.map((i) => `- ${i.source}`).join("\n")}`,
  )
  .join("\n\n")}
${duplicateIds.length > 25 ? `\n_…and ${duplicateIds.length - 25} more duplicate groups._` : ""}

### 2. Placeholder / stock pool images

All Sprint 03 galleries were generated from a **15-image Unsplash pool** with \`sig=s3-{project}-{section}-{i}\` cache-bust params. These are placeholders until field photography replaces them.

| Pattern | Count |
|---------|-------|
| \`sig=s3-\` generated placeholders | ${sources.filter((i) => i.src.includes("sig=s3-")).length} |
| Shared hero ID \`1545324418\` | ${sources.filter((i) => i.src.includes("1545324418")).length} |

### 3. Cross-project image reuse

Photo IDs appearing in **multiple catalog files**:

${crossProject
  .slice(0, 15)
  .map(
    ([id, imgs]) =>
      `- **${id}** → ${[...new Set(imgs.map((i) => i.source))].join(", ")}`,
  )
  .join("\n") || "_None detected._"}

### 4. Images by source type

| Source | References |
|--------|------------|
${[...bySource.entries()].map(([k, v]) => `| ${k} | ${v} |`).join("\n")}

---

## Recommendations

1. **Replace placeholders** — Field Operations Sprint photos in \`OPERATIONS/field-operations-sprint/assets/photos/\`
2. **Gallery refactor** — Run \`node scripts/generate-media-optimization.mjs\` for categorized galleries with expanded unique photo pool
3. **Per-project heroes** — Profile pages should not share the same 5 Unsplash IDs across all 7 projects
4. **Country Garden Danga Bay** — Dedicated gallery with waterfront-specific assets
5. **Re-audit after field upload** — \`node scripts/audit-images.mjs\`

---

## Regenerate

\`\`\`bash
node scripts/audit-images.mjs
\`\`\`
`;

const outDir = path.join(root, "OPERATIONS/media-optimization");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "IMAGE_AUDIT_REPORT.md"), md);
console.log(`Audit complete: ${total} refs, ${duplicateIds.length} duplicate groups`);
console.log(`Wrote OPERATIONS/media-optimization/IMAGE_AUDIT_REPORT.md`);
