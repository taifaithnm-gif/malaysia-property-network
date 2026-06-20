# Property Media & Project Optimization

**Objective:** Improve visual quality and project coverage before further business development.

## Deliverables

| Priority | Asset | Location |
|----------|-------|----------|
| P1 | Image audit report | `IMAGE_AUDIT_REPORT.md` |
| P2 | Country Garden Danga Bay hub | `/country-garden-danga-bay` + `/gallery` |
| P3 | Gallery refactor (categorized) | `src/lib/i18n/media-center/*.json` |
| P4 | Homepage integration | `PropertyMarketplace`, `Locations`, intelligence center |

## Gallery categories

Standard sections: **Exterior · Facilities · Pool · Gym · Units · Waterfront**

Forest City adds: **Golf · Marina**

## Scripts

```bash
# Regenerate categorized galleries + CG Danga Bay content
node scripts/generate-media-optimization.mjs

# Scan for duplicate / placeholder / cross-project reuse
node scripts/audit-images.mjs
```

## Country Garden Danga Bay

- Profile: rental data, investment score 72, FAQs, service links
- Intelligence dossier: `/project-intelligence/country-garden-danga-bay`
- Rental index: 8th project row
- Marketplace rankings: demand score 4/5

## Notes

- All images remain Unsplash placeholders until Field Operations photos uploaded
- Expanded 40-image pool reduces duplicate photo IDs vs Sprint 03 15-image pool
- No CRM, database, or lead system changes
