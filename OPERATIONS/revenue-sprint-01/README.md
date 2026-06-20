# Revenue Sprint 01 — Leads & Conversion

**Objective:** Generate first real owner and tenant leads.  
**Duration:** 14 days · **No new website pages · No DB schema · No CRM modules.**

## Deliverables

| Priority | Asset | Location |
|----------|-------|----------|
| P1 | 30 Forest City Facebook posts | `social/facebook-forest-city.md` |
| P1 | 30 Johor rental market posts | `social/facebook-johor-rental.md` |
| P1 | 30 Property Management posts | `social/facebook-property-management.md` |
| P1 | 30 Golf & Corporate Visit posts | `social/facebook-golf-corporate.md` |
| P2 | Owner inquiry WhatsApp template | `templates/whatsapp-owner-inquiry.md` |
| P2 | Tenant inquiry template | `templates/whatsapp-tenant-inquiry.md` |
| P2 | Viewing booking template | `templates/whatsapp-viewing-booking.md` |
| P2 | PM proposal template | `templates/whatsapp-property-management-proposal.md` |
| P2 | Inspection service template | `templates/whatsapp-inspection-service.md` |
| P3 | 200 owner prospects (FC + R&F) | `outreach/owner_prospects_database.csv` |
| P4 | Lead KPI dashboard | `tracking/lead_kpi_dashboard.md` + `weekly_kpi.csv` |

## Generate / refresh

```bash
node scripts/generate-revenue-sprint-01.mjs
```

## Daily focus

| Day | Traffic | Leads | Outreach |
|-----|---------|-------|----------|
| 1–3 | FC posts FC-01–10 | Reply WhatsApp <2h | Contact 20 prospects |
| 4–7 | JR posts JR-01–10 | Book 2 viewings | Contact 30 prospects |
| 8–10 | PM posts PM-01–10 | Send 2 PM proposals | Contact 50 prospects |
| 11–14 | GC posts GC-01–10 | Close 1 conversion | Complete 200 outreach touches |

## KPI targets

- **Social:** 120 FB posts published or scheduled
- **Outreach:** 200 owner prospects contacted
- **Leads:** 20+ CRM entries
- **Viewings:** 8 booked
- **Revenue:** 1 signed PM or paid inspection (RM 500+)

## Links (use in all content)

- Site: https://www.malaysiapropertynetwork.com
- Owners: /en/owners · /zh/owners
- List property: /en/list-property
- Property request: /en/property-request
- Book viewing: /en/book-viewing
- WhatsApp: +60137757058

## Execution tools (existing — do not extend)

- CRM: `/admin/crm`
- Operations: `/admin/operations`
- Outreach: `/admin/outreach`
