# Real Asset Replacement Sprint

**Objective:** Replace placeholder content with real-world assets.

## Deliverables

| Priority | Asset | Location |
|----------|-------|----------|
| P1 | Verified listing framework | `verified_listings_registry.csv` + `src/lib/verified-listings.ts` |
| P2 | Real photo program | `real-photo-program/manifest.json` + `/assets/verified/` |
| P3 | Building-level intelligence (7) | `src/lib/i18n/building-profiles/` + routes |
| P4 | 30 verified listings | `verified-listings/collection.json` |

## Verified fields

| Field | Type | Description |
|-------|------|-------------|
| `verified_listing` | boolean | Listing passed verification framework |
| `onsite_checked` | boolean | Field team physically inspected unit |
| `verified_date` | ISO date | Date of on-site verification |

## Generate

```bash
node scripts/generate-real-asset-sprint.mjs
```

## Photo upload

Place field photos at paths defined in registry `real_photos` arrays:

```
public/assets/verified/forest-city/phoenix/ver-fc-phoenix-01-1.jpg
```

## Building routes

- `/forest-city/phoenix` · `/cerulean-bay` · `/starview-bay` · `/golf-suites`
- `/rf-princess-cove/phase-1` · `phase-2` · `phase-3`
- Verified collection: `/listings/verified`

No CRM, database schema, or lead system changes.
