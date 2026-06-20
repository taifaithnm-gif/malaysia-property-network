# Field Operations Sprint — Asset Dashboard

**Objective:** Collect real-world assets — photos, videos, property data, owner contacts  
**Duration:** 14 days · **No website · No CRM modules · No DB schema**

---

## Sprint targets

| Asset | Target | Actual | Log file |
|-------|--------|--------|----------|
| Photos captured | 200+ | | `photos_log.csv` |
| Hero shots selected | 20 | | `photos_log.csv` |
| Videos captured | 14+ (1/project min) | | `videos_log.csv` |
| Unit walkthroughs | 7 | | `videos_log.csv` |
| Real property records | 30 | | `property_data_log.csv` |
| Owner contacts captured | 15 | | `owner_contacts_log.csv` |
| Inspections completed | 10 | | inspection checklist |
| Owner meetings | 8 | | owner meeting checklist |
| Agent meetings | 5 | | agent meeting checklist |

---

## Project coverage (photography)

| Project | Exterior set | Unit shoot | Video reel | Done |
|---------|:------------:|:----------:|:----------:|:----:|
| Forest City | ☐ | ☐ | ☐ | ☐ |
| R&F Princess Cove | ☐ | ☐ | ☐ | ☐ |
| Danga Bay | ☐ | ☐ | ☐ | ☐ |
| Bukit Indah | ☐ | ☐ | ☐ | ☐ |
| Mount Austin | ☐ | ☐ | ☐ | ☐ |
| Eco Botanic | ☐ | ☐ | ☐ | ☐ |
| Medini | ☐ | ☐ | ☐ | ☐ |

---

## Weekly field schedule

| Week | Focus | Projects |
|------|-------|----------|
| 1 | Photography + inspections | Forest City, R&F, Danga Bay |
| 2 | Photography + owner/agent meetings | Bukit Indah, Mount Austin, Eco Botanic, Medini |

---

## Asset storage

| Type | Local path | Backup |
|------|------------|--------|
| Photos | `assets/photos/{project}/` | Cloud drive |
| Videos | `assets/videos/{project}/` | Cloud drive |
| Property data | `tracking/property_data_log.csv` | CRM manual entry |
| Owner contacts | `tracking/owner_contacts_log.csv` | CRM manual entry |

---

## Daily field routine

1. Review today's checklists (photo / inspection / meeting)
2. Field visit — tick checklist on-site
3. Upload assets within 24h
4. Log rows in tracking CSVs
5. Update dashboard actuals
6. CRM entry via existing `/admin/crm` (no new modules)

---

## Quality bar

- **Photos:** Sharp, horizontal, no personal items visible, natural light
- **Videos:** Stable (gimbal), <60s for social, view shot mandatory
- **Property data:** Unit number verified on-site, not portal estimates only
- **Owner contacts:** Direct WhatsApp or WeChat — not agent-only relay
