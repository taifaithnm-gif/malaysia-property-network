# Operational Sprint 06 — Conversion & Lead Capture

## Routes

| Path | Content |
|------|---------|
| `/` (homepage) | Conversion layer, lead magnets, newsletter |
| `/owners` | Overseas Chinese owner landing page |

## Homepage additions

1. **Conversion layer** — List Property, Property Request, Property Management, Corporate Visit, Golf Travel
2. **Lead magnets** — Gated downloads for 3 market guides (uses `/api/leads` with `lead-magnet/{slug}` source)
3. **Newsletter** — Johor Property Intelligence Newsletter (`newsletter/johor-property-intelligence` source)

## Generate downloads

```bash
node scripts/generate-sprint6-acquisition.mjs
```

Outputs bilingual markdown guides to `public/downloads/`.

## Lead capture

All forms use existing `leads` table via `POST /api/leads` — no CRM, admin, or schema changes.

| Source | Purpose |
|--------|---------|
| `lead-magnet/johor-rental-market` | Johor Rental Market Report download |
| `lead-magnet/forest-city-owner` | Forest City Owner Guide download |
| `lead-magnet/singapore-commuter-housing` | Singapore Commuter Housing Guide download |
| `newsletter/johor-property-intelligence` | Newsletter subscription |
| `owners-landing` | Owner landing page inquiry |
