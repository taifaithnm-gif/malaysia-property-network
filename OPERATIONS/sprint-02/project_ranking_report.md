# Operational Sprint 02 — Project Ranking Report

**Objective:** Optimize inventory mix for real Johor Bahru rental demand.  
**Inventory:** `inventory_master_v2.csv` — 100 rental-focused listings.  
**Generated:** 2026-06-20

---

## Executive summary

Sprint 02 **reduces Forest City / legacy waterfront concentration** and adds **Mount Austin, Bukit Indah, Medini, Eco Botanic, Austin Heights** — districts with stronger **local family and Singapore commuter** rental liquidity.

| Metric | Sprint 01 | Sprint 02 |
|--------|-----------|-----------|
| Forest City | 34 | **20** |
| R&F Princess Cove | 33 | **20** |
| Danga Bay | 33 | **10** |
| JB core / Iskandar hubs | 0 | **50** (Medini, Bukit Indah, Mount Austin, Austin Heights, Eco Botanic) |
| Focus | Mixed rent/sale | **100% rent** |

---

## Project ranking (by avg rental demand score)

| Rank | Project | Listings | Avg demand (1–5) | Avg rent (MYR) | Primary tag | Strategic role |
|------|---------|----------|-------------------|----------------|-------------|----------------|
| 1 | Bukit Indah | 10 | 5 | 2725 | family | Mature family + AEON lifestyle — stable long-term |
| 2 | Mount Austin | 10 | 5 | 3015 | family | JB #1 rental hotspot — broad tenant pool |
| 3 | R&F Princess Cove | 20 | 4.8 | 3195 | commuter | CIQ commuter premium — highest SG footfall |
| 4 | Medini | 10 | 4.1 | 2400 | commuter | Legoland / Nusajaya worker + SG weekend |
| 5 | Austin Heights | 10 | 4.1 | 2845 | family | Upscale family — lower void vs Mount Austin |
| 6 | Eco Botanic | 10 | 4.1 | 3115 | family | Education + EcoWorld family cluster |
| 7 | Danga Bay | 10 | 3.1 | 2100 | family | Affordable waterfront — yield play |
| 8 | Forest City | 20 | 1.4 | 2440 | owner_management | Owner-management + China Owner — not local demand core |

---

## Tag distribution (portfolio)

| Tag | Count | % | Use case |
|-----|-------|---|----------|
| investment | 22 | 22% | Yield / secondary market buyers |
| owner_management | 15 | 15% | Overseas China owners — MPN core service |
| family | 35 | 35% | Long-term local tenancy — lowest void risk |
| commuter | 28 | 28% | SG Causeway / RTS corridor demand |
| airbnb | 0 | 0% | Short-stay where by-laws permit |

---

## Target tenant mix

| Tenant type | Count | Recommended marketing |
|-------------|-------|----------------------|
| Local Family | 41 | Facebook MY groups, PropertyGuru family filters |
| China Owner | 37 | WeChat, XHS, owner-management landing pages |
| Singapore Commuter | 22 | SG forums, CIQ/Medini keywords, weekend viewing |

---

## Recommendations

### Acquire more (Sprint 03 priority)
1. **Mount Austin / Bukit Indah** — highest local demand scores; expand 2-bed furnished stock.
2. **R&F Princess Cove** — maintain 20 units; focus 1-bed CIQ for commuters.
3. **Medini / Eco Botanic** — family 3-bed for school-zone tenants.

### Hold but service (owner-management)
4. **Forest City (20 max)** — tag `owner_management` + `China Owner`; PM revenue over rental velocity.

### Yield / selective
5. **Danga Bay (10 cap)** — mature stock; compete on condition and pricing, not volume.

### Deprioritize new acquisition
6. Additional Forest City beyond 20 — weak local tenant pool vs carrying cost.

---

## Demand score methodology

| Score | Meaning |
|-------|---------|
| 5 | Strong tenant pool, fast re-let, local + cross-border |
| 4 | Good family or commuter demand |
| 3 | Stable but competitive / ageing stock |
| 2 | Niche (overseas owner, lifestyle, short-stay dependent) |
| 1 | Speculative / high void — avoid new inventory |

Scores assigned per project baseline + tag adjustment in `inventory_master_v2.csv`.

---

## File

`inventory_master_v2.csv` columns: title, project, rent_or_sale, price, bedrooms, bathrooms, size_sqft, **tag**, **rental_demand_score**, **target_tenant_type**, agent_name, agent_whatsapp, source_url.
