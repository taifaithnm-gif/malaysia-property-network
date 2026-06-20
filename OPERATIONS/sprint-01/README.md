# Operational Sprint 01 — Inventory & Agent Database

Operational data only. No platform code changes.

## Files

| File | Rows | Purpose |
|------|------|---------|
| `inventory_master.csv` | 100 | Master listing inventory |
| `agents_master.csv` | 100 | Master agent directory |
| `import/supabase_agents_import.csv` | 100 | → Supabase `agents` |
| `import/supabase_property_listings_import.csv` | 100 | → Supabase `property_listings` |
| `import/supabase_property_import_queue_import.csv` | 100 | → Supabase `property_import_queue` |

## Listing sources

Rotates across **PropertyGuru**, **iProperty**, **EdgeProp**.

## Project split (100 listings)

| Project | Count |
|---------|-------|
| Forest City | 34 |
| R&F Princess Cove | 33 |
| Danga Bay | 33 |

## Agent fields

`name`, `agency`, `phone`, `whatsapp`, `project`, `commission`, `notes` — 100 agents across all three projects.

## Supabase import order

1. **Table Editor → agents** — Import `import/supabase_agents_import.csv`  
   Columns: `full_name`, `whatsapp`, `email`, `agency`, `commission_rate_pct`, `commission_notes`, `project_tags`, `status`, `notes`

2. **property_import_queue** (optional staging) — Import `import/supabase_property_import_queue_import.csv`

3. **property_listings** — Import `import/supabase_property_listings_import.csv`  
   Agent link is embedded in `description` (WA number). Post-import SQL:

```sql
UPDATE property_listings pl
SET agent_id = a.id
FROM agents a
WHERE pl.description LIKE '%WA: ' || a.whatsapp || '%'
  AND pl.agent_id IS NULL;
```

4. Assign `agent_id` on import queue rows after agents exist:

```sql
UPDATE property_import_queue q
SET agent_id = a.id
FROM agents a
WHERE q.notes LIKE '%WA ' || a.whatsapp || '%'
  AND q.agent_id IS NULL;
```

## Notes

- Listing/agent phones use `60120001xxx` placeholder range for Sprint 01.
- `project_tags` in agents import uses Postgres array syntax: `{Forest City}`.
- Replace placeholder emails (`@mpn-import.local`) before production use.
