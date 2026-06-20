# Operational Sprint 05 — Trust & Authority

## Routes

| Path | Content |
|------|---------|
| `/research/methodology` | Investment score methodology (5 dimensions) |
| `/research/rental-index` | Johor Rental Index — 7 projects |
| `/research/reports/johor-rental-market` | Johor Rental Market Report |
| `/research/reports/singapore-commuter-housing` | Singapore Commuter Housing Report |
| `/research/reports/forest-city-owner` | Forest City Owner Report |

## Generate

```bash
node scripts/generate-sprint5-research.mjs
```

## Trust layer

Homepage trust stats use **real** listing count (Supabase), project count (7), and service catalog count — no estimated viewing or gallery counters.
