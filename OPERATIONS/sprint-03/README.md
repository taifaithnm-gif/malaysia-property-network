# Operational Sprint 03 — Marketplace Quality

**Objective:** Transform marketplace content from demo-level to market-level.

## Deliverables

| Priority | Deliverable | Location |
|----------|-------------|----------|
| P1 Media | 50–100 images × 7 projects (460 total) | `src/lib/i18n/media-center/` |
| P2 Inventory | 300 rental listings | `inventory_master_v3.csv` |
| P3 Rental intelligence | Avg rent, yield, vacancy, tenant profile | `src/lib/i18n/rental-intelligence/` |
| P4 Comparisons | 3 project comparison pages (EN/ZH) | `/compare/*` |
| P5 Trust layer | Homepage stats + trust bullets | `MarketplaceTrustLayer.tsx` |

## Generate assets

```bash
node scripts/generate-sprint3-media.mjs
node scripts/generate-sprint3-inventory.mjs
node scripts/generate-sprint3-content.mjs
```

## Import listings to Supabase

Use `import/supabase_property_listings_import.csv` with your existing import workflow (Sprint 01 pattern). No schema changes required.

## Project mix (300 listings)

| Project | Listings | Gallery images |
|---------|----------|----------------|
| Forest City | 43 | 100 |
| R&F Princess Cove | 43 | 60 |
| Danga Bay | 43 | 60 |
| Bukit Indah | 43 | 60 |
| Mount Austin | 43 | 60 |
| Eco Botanic | 43 | 60 |
| Medini | 42 | 60 |

## Comparison pages

- `/compare/forest-city-vs-rf-princess-cove`
- `/compare/bukit-indah-vs-mount-austin`
- `/compare/eco-botanic-vs-medini`

See `project_ranking_report.md` for rental intelligence summary.
