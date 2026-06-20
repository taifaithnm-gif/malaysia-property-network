# Operational Sprint 04 — Johor Property Intelligence Center

## Routes

| Path | Purpose |
|------|---------|
| `/research` | Intelligence Center hub |
| `/project-intelligence` | Project directory (ranked table) |
| `/project-intelligence/[slug]` | Individual project dossier |

## Generate

```bash
node scripts/generate-sprint4-intelligence.mjs
```

## Projects (7)

Forest City, R&F Princess Cove, Danga Bay, Bukit Indah, Mount Austin, Eco Botanic, Medini

Each dossier includes: developer profile, completion year, property types, rental range, yield, occupancy, target tenant, pros, cons, investment score (0–100).
