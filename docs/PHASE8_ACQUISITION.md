# Phase 8 — Property Acquisition System

## Migration

```bash
cd ~/ASEAN_INTELLIGENCE_HUB/malaysia-property-network
npx supabase db push   # applies 006_phase8_acquisition.sql
```

## Tables

| Table | Purpose |
|-------|---------|
| `agents` | Co-broke agents, commission %, project tags |
| `property_import_queue` | URL/platform imports before publish |
| `outreach_follow_up_logs` | Owner follow-up notes |
| `co_broke_deals` | Source/viewing agent, commission, deal status |
| `owner_property_submissions` | + `assigned_agent_id`, `owner_outreach_status`, `agent_contact_status` |
| `property_listings` | + `agent_id`, `source_import_id` |

## Admin pages

| Route | Feature |
|-------|---------|
| `/admin/agents` | Agent CRM |
| `/admin/import` | Property import queue |
| `/admin/outreach` | Owner outreach + co-broke deals |

## Seed data

1. `supabase/seed/phase8_agents_seed.sql` — 3 sample agents  
2. Generate + run listings:

```bash
node scripts/generate-phase8-listings.mjs
# Then run supabase/seed/phase8_property_listings_seed.sql in SQL Editor
```

**Inventory:** 20 Forest City · 20 R&F Princess Cove · 10 Danga Bay (50 total)

## Workflow

1. Add agent in **Agents** with project tags + commission  
2. Paste external listing URL in **Import** → status `pending` → `review` → `imported`  
3. Create published listing in **Listings** (link `agent_id` manually if needed)  
4. Owner submission → **Outreach** → assign agent, log follow-ups  
5. Co-broke viewing → create deal with source + viewing agent + commission
