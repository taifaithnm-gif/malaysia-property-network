# Revenue Sprint 01 — Lead KPI Dashboard

**Sprint:** Revenue Sprint 01  
**Objective:** Generate first real owner and tenant leads  
**Duration:** 14 days  
**Update:** Every Friday (weekly) + daily lead count in `weekly_kpi.csv`

---

## Weekly targets

| Metric | Week 1 target | Week 2 target | Sprint total |
|--------|---------------|---------------|--------------|
| New leads (all) | 8 | 12 | 20 |
| Owner leads | 5 | 8 | 13 |
| Tenant leads | 3 | 4 | 7 |
| Viewings booked | 3 | 5 | 8 |
| PM proposals sent | 2 | 3 | 5 |
| Inspections quoted | 3 | 4 | 7 |
| Conversions (PM signed / inspection paid) | 1 | 1 | 2 |
| Revenue (MYR) | 500 | 1,500 | 2,000 |

---

## Current week

| Metric | W1 actual | W2 actual | Notes |
|--------|-----------|-----------|-------|
| New leads | | | Export from /admin/crm |
| Owner leads | | | source contains owner / list-property / owners-landing |
| Tenant leads | | | source contains tenant / property-request |
| Viewings booked | | | /admin/operations viewings |
| PM proposals sent | | | WhatsApp PMQ-* sent |
| Inspections quoted | | | WhatsApp INSP-* sent |
| Conversions | | | Signed PM or paid inspection |
| Revenue (MYR) | | | Manual — bank receipt |

---

## Traffic sources (track in CRM `source` field)

| Channel | Source tag prefix | Posts |
|---------|-------------------|-------|
| Facebook Forest City | `facebook-revenue-sprint01-fc` | FC-01–30 |
| Facebook Johor rental | `facebook-revenue-sprint01-jr` | JR-01–30 |
| Facebook PM | `facebook-revenue-sprint01-pm` | PM-01–30 |
| Facebook Golf/Corporate | `facebook-revenue-sprint01-gc` | GC-01–30 |
| WhatsApp owner | `whatsapp-owner-inquiry` | Template |
| WhatsApp tenant | `whatsapp-tenant-inquiry` | Template |
| WhatsApp viewing | `whatsapp-viewing-booking` | Template |
| WhatsApp PM proposal | `whatsapp-pm-proposal` | Template |
| WhatsApp inspection | `whatsapp-inspection-service` | Template |
| Owner outreach | `outreach-owner-prospect` | CSV database |
| Newsletter | `newsletter/johor-property-intelligence` | Homepage |
| Lead magnet | `lead-magnet/*` | Homepage |

---

## Daily update procedure

1. Open `/admin/crm` → count new leads by day
2. Update `tracking/weekly_kpi.csv` — add row for week or update actuals
3. Review `outreach/owner_prospects_database.csv` — mark contacted rows
4. Log PM proposals and inspections in notes column

---

## Conversion funnel

```
Traffic (120 FB posts + outreach 200 prospects)
  → Leads (forms + WhatsApp + CRM)
    → Viewings booked
      → PM proposal / Inspection quote
        → Conversion (signed PM / paid inspection)
          → Revenue
```
