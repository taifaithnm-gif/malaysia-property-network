# Operational Sprint 03 — Project Ranking & Rental Intelligence

**Inventory:** `inventory_master_v3.csv` — 300 rental listings across 7 projects.  
**Media:** 460 gallery images (100 FC + 60 × 6 projects).  
**Generated:** 2026-06-20

---

## Rental intelligence by project

| Project | Listings | Avg rent (MYR) | Yield | Vacancy | Demand | Target tenant |
|---------|----------|----------------|-------|---------|--------|---------------|
| Mount Austin | 43 | 3,015 | 5.2–6.0% | 2–4 wks | 5/5 | Local Family |
| Bukit Indah | 43 | 2,725 | 4.8–5.5% | 2–5 wks | 5/5 | Local Family |
| R&F Princess Cove | 43 | 3,195 | 4.5–5.8% | 2–4 wks | 5/5 | Singapore Commuter |
| Eco Botanic | 43 | 3,115 | 4.6–5.4% | 3–6 wks | 4/5 | Local Family |
| Medini | 42 | 2,400 | 4.4–5.6% | 3–7 wks | 4/5 | Singapore Commuter |
| Danga Bay | 43 | 2,100 | 5.0–6.2% | 4–8 wks | 3/5 | Local Family |
| Forest City | 43 | 2,440 | 3.2–4.1% | 8–14 wks | 2/5 | China Owner |

---

## Sprint 02 → Sprint 03 changes

| Metric | Sprint 02 | Sprint 03 |
|--------|-----------|-----------|
| Total listings | 100 | **300** |
| Projects (marketplace) | 8 (incl. Austin Heights) | **7 focused hubs** |
| Gallery images | ~172 | **460** |
| Rental intelligence | Demand score only | **Full yield + vacancy + tenant** |
| Comparisons | None | **3 comparison pages** |
| Homepage trust | Rankings only | **Stats + trust layer** |

---

## Comparison guides

1. **Forest City vs R&F** — Owner-management vs CIQ commuter premium  
2. **Bukit Indah vs Mount Austin** — Family township vs JB rental hotspot  
3. **Eco Botanic vs Medini** — Family education cluster vs Iskandar commuter corridor

---

## Recommendations

1. **Import** `import/supabase_property_listings_import.csv` to populate live marketplace.  
2. **Market** Mount Austin + Bukit Indah for local family demand; R&F for SG commuters.  
3. **Service** Forest City via owner-management — not volume rental acquisition.  
4. **Use comparisons** in outreach for investor decision support.
