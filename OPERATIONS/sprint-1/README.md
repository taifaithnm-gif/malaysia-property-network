# Operational Sprint 1

**Objective:** Acquire first real owners and tenants.  
**Duration:** 14 days · **No new platform features.**

## Deliverables

| Priority | Asset | Location |
|----------|-------|----------|
| P1 | 50 property listings seed | `supabase/seed/sprint1_property_listings_seed.sql` |
| P2 | 30 Facebook posts | `OPERATIONS/sprint-1/social/facebook-posts.md` |
| P3 | 30 Xiaohongshu posts | `OPERATIONS/sprint-1/social/xiaohongshu-posts.md` |
| P4 | Owner outreach database | `OPERATIONS/sprint-1/outreach/owner_outreach_database.csv` |
| P5 | Inspection report template | `OPERATIONS/sprint-1/templates/inspection_report_template.md` |
| P6 | PM quotation template | `OPERATIONS/sprint-1/templates/property_management_quotation_template.md` |

## Apply listings (Supabase)

1. Open **Supabase → SQL Editor**
2. Paste and run `supabase/seed/sprint1_property_listings_seed.sql`
3. Verify: `SELECT project, listing_type, count(*) FROM property_listings WHERE status = 'published' GROUP BY 1, 2;`
4. Homepage `/en` should show Featured / Rentals / Sales sections populated

Or CLI:

```bash
cd ~/ASEAN_INTELLIGENCE_HUB/malaysia-property-network
# Copy seed SQL into editor, or psql against project if configured
```

## Daily focus (no engineering)

| Day | Owners | Tenants | Traffic | Leads |
|-----|--------|---------|---------|-------|
| 1–3 | Post FB #1–10, join 5 outreach groups | Publish 10 listings CTAs | FB + site | Reply CRM within 2h |
| 4–7 | XHS #1–15, WeChat intro msgs | Tenant request follow-up | XHS + book-viewing | WhatsApp confirm all viewings |
| 8–10 | FB #11–20, inspection quotes | Match tenants to listings | Cross-post FC + R&F | Track source in CRM |
| 11–14 | FB #21–30, XHS #16–30 | Close 1 viewing → proposal | Golf + MM2H posts | 1 signed PM quote target |

## KPI targets (Sprint 1)

- **Listings live:** 50 published (seed) + 5 owner-submitted real units
- **Outreach:** 20 group/community touches
- **Social:** 30 FB + 30 XHS posts scheduled or published
- **Leads:** 10+ CRM entries (any source)
- **Revenue:** 1 paid inspection or 1 signed PM agreement (stretch)

## Links to use in all posts

- Site: https://www.malaysiapropertynetwork.com
- List property: `/en/list-property` · `/zh/list-property`
- Book viewing: `/en/book-viewing`
- WhatsApp: +60137757058
