#!/usr/bin/env node
/**
 * Generates supabase/seed/sprint1_property_listings_seed.sql — 50 published EN listings.
 * Run: node scripts/generate-sprint1-listings.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const IMAGES = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&sig=s1-0",
  "https://images.unsplash.com/photo-1513584684374-8bab748f235c?w=800&q=80&sig=s1-1",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&sig=s1-2",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&sig=s1-3",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe5e?w=800&q=80&sig=s1-4",
  "https://images.unsplash.com/photo-1505142468610-359e7a316be0?w=800&q=80&sig=s1-5",
];

const FC_TOWERS = ["Cerulean Bay", "Phoenix Tower", "Starview Bay", "Marina Hotel Residences", "Golf Suite Tower"];
const RF_TOWERS = ["Phase 1 Tower A", "Phase 2 Tower B", "Sky Villa Block", "Waterfront Tower", "CIQ View Tower"];
const DB_TOWERS = ["Country Garden", "Z-Plaza Residences", "Danga Bay Suites", "Bay Point Tower", "Tebrau View"];

const PROJECTS = [
  { name: "Forest City", count: 18, towers: FC_TOWERS, rent: [1800, 4500], sale: [420000, 1100000] },
  { name: "R&F Princess Cove", count: 16, towers: RF_TOWERS, rent: [2000, 5200], sale: [580000, 1450000] },
  { name: "Danga Bay", count: 16, towers: DB_TOWERS, rent: [1400, 3800], sale: [320000, 850000] },
];

const BED_TYPES = [
  { beds: 0, label: "Studio", baths: 1, sqft: [380, 520] },
  { beds: 1, label: "1-Bedroom", baths: 1, sqft: [550, 720] },
  { beds: 2, label: "2-Bedroom", baths: 2, sqft: [780, 1050] },
  { beds: 3, label: "3-Bedroom", baths: 2, sqft: [1100, 1400] },
];

function uuid(n) {
  return `b1000001-0000-4000-8000-${n.toString(16).padStart(12, "0")}`;
}

function pick(arr, i) {
  return arr[i % arr.length];
}

function priceBetween([lo, hi], i) {
  const step = (hi - lo) / 7;
  return Math.round((lo + step * (i % 8)) / 50) * 50;
}

const rows = [];
let idx = 1;

for (const proj of PROJECTS) {
  for (let i = 0; i < proj.count; i++) {
    const bed = pick(BED_TYPES, i + idx);
    const tower = pick(proj.towers, i);
    const isRent = i % 3 !== 2; // ~2/3 rent, 1/3 sale
    const listingType = isRent ? "rent" : "sale";
    const sqft = Math.round((bed.sqft[0] + bed.sqft[1]) / 2 + (i % 5) * 20);
    const featured = i % 5 === 0;
    const priceRange = isRent ? proj.rent : proj.sale;
    const price = priceBetween(priceRange, i + idx);
    const view = pick(["Seaview", "Golf view", "Marina view", "City view", "Pool view"], i);

    const title = isRent
      ? `${proj.name} ${bed.label} ${view} — For Rent`
      : `${proj.name} ${bed.label} ${view} — For Sale`;

    const desc = isRent
      ? `${tower} · ${bed.label} with ${view.toLowerCase()}. ${featured ? "Featured listing. " : ""}Fully or partially furnished options. Viewing by appointment. Managed by Malaysia Property Network for overseas owners.`
      : `${tower} · ${bed.label} resale unit, ${view.toLowerCase()}. Vacant or tenanted viewing available. Strata fees and furnishing status confirmed on inquiry.`;

    rows.push({
      id: uuid(idx),
      title,
      project: proj.name,
      listing_type: listingType,
      property_type: `${bed.label} Apartment`,
      bedrooms: bed.beds,
      bathrooms: bed.baths,
      size_sqft: sqft,
      price: isRent ? price : price,
      price_label: null,
      image_url: pick(IMAGES, idx),
      description: desc,
      is_featured: featured,
      status: "published",
      locale: "en",
    });
    idx++;
  }
}

function sqlRow(r) {
  const price = r.price != null ? `${r.price.toFixed(2)}` : "NULL";
  const priceLabel = r.price_label ? `'${r.price_label.replace(/'/g, "''")}'` : "NULL";
  const image = r.image_url ? `'${r.image_url}'` : "NULL";
  return `  (
    '${r.id}',
    '${r.title.replace(/'/g, "''")}',
    '${r.project}',
    '${r.listing_type}',
    '${r.property_type}',
    ${r.bedrooms},
    ${r.bathrooms},
    ${r.size_sqft},
    ${price},
    ${priceLabel},
    'MYR',
    ${image},
    '${r.description.replace(/'/g, "''")}',
    ${r.is_featured},
    '${r.status}',
    '${r.locale}'
  )`;
}

const header = `-- Operational Sprint 1 — 50 property listings seed
-- Run AFTER 002_phase5_operations.sql
-- Safe to re-run: fixed UUIDs with ON CONFLICT DO NOTHING
-- Distribution: Forest City 18 · R&F Princess Cove 16 · Danga Bay 16

INSERT INTO property_listings (
  id, title, project, listing_type, property_type, bedrooms, bathrooms,
  size_sqft, price, price_label, currency, image_url, description,
  is_featured, status, locale
) VALUES
${rows.map(sqlRow).join(",\n")}
ON CONFLICT (id) DO NOTHING;
`;

const out = path.join(root, "supabase/seed/sprint1_property_listings_seed.sql");
fs.writeFileSync(out, header + "\n");
console.log(`Wrote ${rows.length} listings to ${out}`);
console.log(
  "By project:",
  Object.fromEntries(PROJECTS.map((p) => [p.name, p.count])),
);
console.log(
  "By type: rent",
  rows.filter((r) => r.listing_type === "rent").length,
  "sale",
  rows.filter((r) => r.listing_type === "sale").length,
);
