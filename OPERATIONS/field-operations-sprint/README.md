# Field Operations Sprint

**Objective:** Collect real-world assets — photos, videos, property data, owner contacts.  
**Duration:** 14 days · **No website development · No new CRM · No DB schema.**

## Deliverables

| Priority | Asset | Location |
|----------|-------|----------|
| P1 | Photography checklists (7 projects) | `checklists/photography/*.md` |
| P2 | Property inspection checklist | `checklists/property-inspection-checklist.md` |
| P3 | Owner meeting checklist | `checklists/owner-meeting-checklist.md` |
| P4 | Agent meeting checklist | `checklists/agent-meeting-checklist.md` |
| P5 | Video shot list | `checklists/video-shot-list.md` |
| — | Asset tracking logs | `tracking/*.csv` + `field_ops_dashboard.md` |
| — | Media storage guide | `assets/README.md` |

## Projects covered

Forest City · R&F Princess Cove · Danga Bay · Bukit Indah · Mount Austin · Eco Botanic · Medini

## Generate / refresh

```bash
node scripts/generate-field-operations-sprint.mjs
```

## Sprint targets

- **200+** photos logged
- **14+** videos (min 1 reel per project)
- **30** verified property data records
- **15** real owner contacts
- **10** field inspections completed

## Related templates

- Full inspection report: `OPERATIONS/sprint-1/templates/inspection_report_template.md`
- PM quotation: `OPERATIONS/sprint-1/templates/property_management_quotation_template.md`
- WhatsApp owner follow-up: `OPERATIONS/revenue-sprint-01/templates/whatsapp-owner-inquiry.md`

## Execution (existing tools only)

- Log leads manually: `/admin/crm`
- Co-broke / outreach: `/admin/outreach`
- Do not extend CRM schema — use CSV logs + manual CRM entry
