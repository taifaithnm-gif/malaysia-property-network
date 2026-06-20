#!/usr/bin/env node
/**
 * Sprint 03 — 300 rental listings across 7 projects + Supabase import CSV.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "OPERATIONS/sprint-03");
const importDir = path.join(outDir, "import");

const IMAGES = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&sig=s3-0",
  "https://images.unsplash.com/photo-1513584684374-8bab748f235c?w=800&q=80&sig=s3-1",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&sig=s3-2",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&sig=s3-3",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe5e?w=800&q=80&sig=s3-4",
  "https://images.unsplash.com/photo-1505142468610-359e7a316be0?w=800&q=80&sig=s3-5",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80&sig=s3-6",
  "https://images.unsplash.com/photo-1566073771259-d722a7420013?w=800&q=80&sig=s3-7",
];

const PROJECTS = [
  { name: "Forest City", count: 43, towers: ["Phoenix Tower", "Starview Bay", "Golf Suite", "Cerulean Bay", "Marina Hotel Residences"], rent: [1600, 3500], tag: "owner_management", demand: 2, tenant: "China Owner" },
  { name: "R&F Princess Cove", count: 43, towers: ["Phase 2 B", "Sky Villa", "CIQ View", "Phase 1 A", "Waterfront Tower"], rent: [2200, 4500], tag: "commuter", demand: 5, tenant: "Singapore Commuter" },
  { name: "Danga Bay", count: 43, towers: ["Country Garden", "Z-Plaza", "Bay Point", "Tebrau View", "Danga Suites"], rent: [1400, 2800], tag: "family", demand: 3, tenant: "Local Family" },
  { name: "Bukit Indah", count: 43, towers: ["Sky Loft", "Nusa Bestari", "Pinnacle", "Greenfield", "Central Park"], rent: [1800, 3200], tag: "family", demand: 5, tenant: "Local Family" },
  { name: "Mount Austin", count: 43, towers: ["Austin Suites", "Palas Residences", "Austin Heights", "Sky Oasis", "Austin Ville"], rent: [2000, 3800], tag: "commuter", demand: 5, tenant: "Local Family" },
  { name: "Eco Botanic", count: 43, towers: ["Eco Sanctuary", "Eco Spring", "Eco Tropics", "Eco Majestic", "Eco Ardence"], rent: [2100, 3600], tag: "family", demand: 4, tenant: "Local Family" },
  { name: "Medini", count: 42, towers: ["Medini Signature", "Legoland View", "Sunway Iskandar", "Pinnacle Medini", "Nusajaya Central"], rent: [1600, 3000], tag: "commuter", demand: 4, tenant: "Singapore Commuter" },
];

const BED_TYPES = [
  { beds: 0, label: "Studio", baths: 1, sqft: [380, 520] },
  { beds: 1, label: "1-Bedroom", baths: 1, sqft: [550, 720] },
  { beds: 2, label: "2-Bedroom", baths: 2, sqft: [780, 1050] },
  { beds: 3, label: "3-Bedroom", baths: 2, sqft: [1100, 1450] },
];

function pick(arr, i) {
  return arr[i % arr.length];
}

function priceBetween([lo, hi], i) {
  const step = (hi - lo) / 9;
  return Math.round((lo + step * (i % 10)) / 50) * 50;
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

const opsRows = [];
const importRows = [];
let idx = 1;

for (const proj of PROJECTS) {
  for (let i = 0; i < proj.count; i++) {
    const bed = pick(BED_TYPES, i + idx);
    const tower = pick(proj.towers, i);
    const sqft = Math.round((bed.sqft[0] + bed.sqft[1]) / 2 + (i % 7) * 18);
    const price = priceBetween(proj.rent, i + idx);
    const agentNum = String(idx).padStart(3, "0");
    const title = `${tower} ${bed.label} — ${proj.name}`;
    const slug = slugify(proj.name);

    opsRows.push({
      title,
      project: proj.name,
      rent_or_sale: "rent",
      price,
      bedrooms: bed.beds,
      bathrooms: bed.baths,
      size_sqft: sqft,
      tag: pick(["investment", proj.tag, "family", "commuter"], i),
      rental_demand_score: Math.min(5, Math.max(1, proj.demand + (i % 3 === 0 ? -1 : 0))),
      target_tenant_type: proj.tenant,
      agent_name: `Agent S03-${agentNum}`,
      agent_whatsapp: `60120003${agentNum}`,
      source_url: `https://propertyguru.com.my/listing/${slug}-s03-${idx}`,
    });

    const featured = i % 7 === 0;
    importRows.push({
      title,
      project: proj.name,
      listing_type: "rent",
      property_type: `${bed.label} Apartment`,
      bedrooms: bed.beds,
      bathrooms: bed.baths,
      size_sqft: sqft,
      price,
      price_label: "",
      currency: "MYR",
      image_url: pick(IMAGES, idx),
      description: `${tower} · ${bed.label} rental in ${proj.name}. ${featured ? "Featured. " : ""}Viewing by appointment.`,
      is_featured: featured ? "true" : "false",
      status: "published",
      locale: "en",
    });
    idx++;
  }
}

function csvEscape(v) {
  const s = String(v);
  return s.includes(",") || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
}

const opsHeader = "title,project,rent_or_sale,price,bedrooms,bathrooms,size_sqft,tag,rental_demand_score,target_tenant_type,agent_name,agent_whatsapp,source_url";
const opsCsv = [opsHeader, ...opsRows.map((r) => Object.values(r).map(csvEscape).join(","))].join("\n") + "\n";

const importHeader = "title,project,listing_type,property_type,bedrooms,bathrooms,size_sqft,price,price_label,currency,image_url,description,is_featured,status,locale";
const importCsv = [importHeader, ...importRows.map((r) => Object.values(r).map(csvEscape).join(","))].join("\n") + "\n";

fs.mkdirSync(importDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "inventory_master_v3.csv"), opsCsv);
fs.writeFileSync(path.join(importDir, "supabase_property_listings_import.csv"), importCsv);

console.log(`Generated ${opsRows.length} Sprint 03 listings`);
console.log(`  → OPERATIONS/sprint-03/inventory_master_v3.csv`);
console.log(`  → OPERATIONS/sprint-03/import/supabase_property_listings_import.csv`);
