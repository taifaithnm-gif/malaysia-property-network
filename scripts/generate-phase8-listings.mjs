#!/usr/bin/env node
/** Phase 8 inventory expansion — 50 listings (20 FC, 20 RF, 10 DB). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const IMAGES = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&sig=p8-0",
  "https://images.unsplash.com/photo-1513584684374-8bab748f235c?w=800&q=80&sig=p8-1",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&sig=p8-2",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&sig=p8-3",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe5e?w=800&q=80&sig=p8-4",
];

const PROJECTS = [
  { name: "Forest City", count: 20, rent: [1900, 4800], sale: [450000, 1150000] },
  { name: "R&F Princess Cove", count: 20, rent: [2100, 5500], sale: [620000, 1500000] },
  { name: "Danga Bay", count: 10, rent: [1500, 4000], sale: [340000, 880000] },
];

const BED_TYPES = [
  { beds: 0, label: "Studio", baths: 1, sqft: [400, 540] },
  { beds: 1, label: "1-Bedroom", baths: 1, sqft: [580, 750] },
  { beds: 2, label: "2-Bedroom", baths: 2, sqft: [800, 1100] },
  { beds: 3, label: "3-Bedroom", baths: 2, sqft: [1150, 1450] },
];

function uuid(n) {
  return `c1000001-0000-4000-8000-${n.toString(16).padStart(12, "0")}`;
}

function pick(arr, i) {
  return arr[i % arr.length];
}

const rows = [];
let idx = 1;

for (const proj of PROJECTS) {
  for (let i = 0; i < proj.count; i++) {
    const bed = pick(BED_TYPES, i + idx);
    const isRent = i % 3 !== 2;
    const priceLo = isRent ? proj.rent[0] : proj.sale[0];
    const priceHi = isRent ? proj.rent[1] : proj.sale[1];
    const price = Math.round((priceLo + ((priceHi - priceLo) * (i % 7)) / 7) / 50) * 50;
    const sqft = Math.round((bed.sqft[0] + bed.sqft[1]) / 2 + (i % 4) * 15);
    const featured = i % 4 === 0;
    const title = isRent
      ? `${proj.name} ${bed.label} — Inventory #${idx}`
      : `${proj.name} ${bed.label} Resale — Inventory #${idx}`;

    rows.push({
      id: uuid(idx),
      title,
      project: proj.name,
      listing_type: isRent ? "rent" : "sale",
      property_type: `${bed.label} Apartment`,
      bedrooms: bed.beds,
      bathrooms: bed.baths,
      size_sqft: sqft,
      price,
      image_url: pick(IMAGES, idx),
      description: `Phase 8 acquisition inventory. ${proj.name} ${bed.label}, ${sqft} sqft. Co-broke and viewing by appointment.`,
      is_featured: featured,
      status: "published",
      locale: "en",
    });
    idx++;
  }
}

function sqlRow(r) {
  return `  (
    '${r.id}',
    '${r.title.replace(/'/g, "''")}',
    '${r.project}',
    '${r.listing_type}',
    '${r.property_type}',
    ${r.bedrooms},
    ${r.bathrooms},
    ${r.size_sqft},
    ${r.price.toFixed(2)},
    NULL,
    'MYR',
    '${r.image_url}',
    '${r.description.replace(/'/g, "''")}',
    ${r.is_featured},
    '${r.status}',
    '${r.locale}'
  )`;
}

const sql = `-- Phase 8 Property Acquisition — 50 inventory listings
-- Forest City 20 · R&F Princess Cove 20 · Danga Bay 10
-- Run after 006_phase8_acquisition.sql (optional agent_id linkage)

INSERT INTO property_listings (
  id, title, project, listing_type, property_type, bedrooms, bathrooms,
  size_sqft, price, price_label, currency, image_url, description,
  is_featured, status, locale
) VALUES
${rows.map(sqlRow).join(",\n")}
ON CONFLICT (id) DO NOTHING;
`;

fs.writeFileSync(path.join(root, "supabase/seed/phase8_property_listings_seed.sql"), sql + "\n");
console.log("Wrote", rows.length, "listings");
