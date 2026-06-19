# Phase 5 Supabase Execution Guide

Project: **Malaysia Property Network**  
Path: `/Users/jun-330/ASEAN_INTELLIGENCE_HUB/malaysia-property-network/`

This guide covers database landing steps 1–5 for the Phase 5 operations platform (owner submissions, tenant requests, property listings).

---

## Migration safety summary

| Check | `001_initial_schema.sql` | `002_phase5_operations.sql` |
|-------|--------------------------|-----------------------------|
| File exists | Yes | Yes |
| `CREATE TABLE IF NOT EXISTS` | Yes | Yes |
| `ALTER TABLE … ENABLE ROW LEVEL SECURITY` | Yes | Yes |
| `DROP TABLE` | No | No |
| `TRUNCATE` | No | No |
| Destructive `DELETE` | No | No |
| Idempotent re-run helpers | `DROP TRIGGER IF EXISTS`, `DROP POLICY IF EXISTS` | Same |

**Verdict:** Safe to run in order. Re-running policies/triggers is idempotent; no data-destructive statements.

### RLS behaviour (002)

| Table | anon/public INSERT | anon/public SELECT |
|-------|-------------------|-------------------|
| `owner_property_submissions` | Yes — policy `"Anyone can submit owner listings"` | **No** — SELECT only for `authenticated` |
| `tenant_requests` | Yes — policy `"Anyone can submit tenant requests"` | **No** — SELECT only for `authenticated` |
| `property_listings` | No (insert via dashboard/SQL only) | **Yes, only** `status = 'published'` |

**Note:** Schema uses `status IN ('draft', 'published', 'archived')` — there is no `'active'` value. Public visibility requires `status = 'published'` (matches RLS and app filter in `src/lib/listings.ts`).

---

## Required environment variables

| Variable | Required | Used in | Notes |
|----------|----------|---------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | `src/lib/supabase/config.ts`, API routes | Project URL from Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Server API routes, listings fetch | Public anon key; safe in browser |
| `SUPABASE_SERVICE_ROLE_KEY` | Recommended | **Not wired in current code** | See issue note below |
| `NEXT_PUBLIC_SITE_URL` | Yes | SEO, sitemap, JSON-LD | e.g. `https://malaysia-property-network.vercel.app` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Yes | WhatsApp CTAs | No `+` or spaces, e.g. `60123456789` |

**Do not use:** `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (not present in this Next.js project).

**Security:** `SUPABASE_SERVICE_ROLE_KEY` must **never** be prefixed with `NEXT_PUBLIC_` and must **never** be imported in client components.

### Known implementation note

`src/lib/supabase/service.ts` (`createServiceClient`) currently uses the **anon key**, not the service role key. Phase 5 form INSERT works because RLS allows anon INSERT on submission tables. Listings fetch works because RLS allows anon SELECT where `status = 'published'` and the app also filters `.eq('status', 'published')`.

For future admin tooling, wire `SUPABASE_SERVICE_ROLE_KEY` server-side only. Not required for initial Phase 5 landing if anon INSERT/SELECT policies are applied.

---

## SQL execution order

### Step A — Run `001_initial_schema.sql` (if not already run)

**File:** `supabase/migrations/001_initial_schema.sql`

1. Supabase Dashboard → **SQL Editor** → New query
2. Paste full contents of `001_initial_schema.sql`
3. **Run**
4. Verify tables: `owners`, `properties`, `tenants`, `leads`

Skip if these tables already exist from Phase 1 setup.

**Dependency:** Creates `update_updated_at_column()` trigger function used by 002.

---

### Step B — Run `002_phase5_operations.sql`

**File:** `supabase/migrations/002_phase5_operations.sql`

1. SQL Editor → New query
2. Paste full contents
3. **Run**
4. Verify tables: `owner_property_submissions`, `tenant_requests`, `property_listings`
5. Verify RLS enabled on all three (Table Editor → table → RLS)

---

### Step C — Seed property listings

**File:** `supabase/seed/phase5_property_listings_seed.sql`

1. SQL Editor → New query
2. Paste seed file
3. **Run**
4. Verify in **Table Editor → property_listings**:
   - 5 rows `status = 'published'`, `locale = 'en'`
   - 1 row `status = 'draft'` (must not appear on site)
   - 2 rows `locale = 'zh'` (optional mirrors for `/zh` homepage)

Seed includes:

- Forest City 2BR rent (featured)
- R&F Princess Cove 1BR rent (featured)
- R&F Princess Cove 1BR sale
- Danga Bay 3BR family rent
- Forest City golf-view short-stay rental (`price_label` for nightly rate)
- 1 draft row (hidden test)

---

### Step D — Add Vercel environment variables

Vercel → Project **malaysia-property-network** → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...        # optional for now; do not expose to client
NEXT_PUBLIC_SITE_URL=https://malaysia-property-network.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=601XXXXXXXX
```

Apply to **Production** (and Preview if testing PRs).

Local dev: copy to `.env.local` from `.env.example`.

---

### Step E — Redeploy Vercel

1. Deployments → latest → **Redeploy** (or push after env vars are set)
2. Confirm build succeeds
3. Confirm production URL loads

Current Phase 5 commit (if already pushed): `3e8e61e711e602dbaf80b831a20b764f333b2500`

---

### Step F — Test forms and listings

See test checklist below.

---

## Test checklist

### Form submissions

- [ ] Submit **/en/list-property** with test data (Rent + Management intents)
- [ ] Submit **/zh/list-property** with test data
- [ ] Submit **/en/property-request** (Rent intent, budget, preferred project)
- [ ] Submit **/zh/property-request** (Buy intent)

### Supabase table verification (authenticated dashboard only)

- [ ] Row appears in `owner_property_submissions` after list-property submit
- [ ] Row appears in `tenant_requests` after property-request submit
- [ ] `status` defaults to `new` on new rows

### Privacy / RLS (browser)

- [ ] In browser DevTools, attempt anon read (should fail or return empty):

```javascript
const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
const sb = createClient('YOUR_SUPABASE_URL', 'YOUR_ANON_KEY');
const { data: owners } = await sb.from('owner_property_submissions').select('*');
console.log(owners); // expect [] or permission error
const { data: tenants } = await sb.from('tenant_requests').select('*');
console.log(tenants); // expect [] or permission error
```

- [ ] Public anon **can** read published listings:

```javascript
const { data: listings } = await sb.from('property_listings').select('*').eq('status', 'published');
console.log(listings?.length); // expect > 0 after seed
```

- [ ] Draft listing UUID `a1000001-0000-4000-8000-000000000006` **not** returned in published query

### Homepage listings

- [ ] **/en** shows Featured / Latest Rentals / Latest Sales sections with seeded EN listings
- [ ] **/zh** shows ZH seeded listings (after zh seed rows added)
- [ ] Draft listing does **not** display on homepage
- [ ] No Supabase errors in browser console on homepage or form pages

### API smoke (optional)

```bash
curl -X POST https://YOUR_SITE/api/owner-submissions \
  -H "Content-Type: application/json" \
  -d '{"owner_name":"Test","whatsapp":"60111111111","project":"Forest City","unit_type":"2-bed","intent":"rent","locale":"en"}'

curl -X POST https://YOUR_SITE/api/tenant-requests \
  -H "Content-Type: application/json" \
  -d '{"full_name":"Test","contact":"60111111111","intent":"rent","locale":"en"}'
```

Expect `{"success":true}` when Supabase env vars are set on Vercel.

---

## Quick reference — property_listings columns

From `002_phase5_operations.sql`:

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | Auto-generated if omitted |
| `title` | TEXT | Required |
| `project` | TEXT | Required |
| `listing_type` | TEXT | `'rent'` or `'sale'` |
| `property_type` | TEXT | Optional |
| `bedrooms` | INTEGER | Optional |
| `bathrooms` | INTEGER | Optional |
| `size_sqft` | INTEGER | Optional |
| `price` | NUMERIC(12,2) | Optional |
| `price_label` | TEXT | Optional override display |
| `currency` | TEXT | Default `'MYR'` |
| `image_url` | TEXT | Optional |
| `description` | TEXT | Optional |
| `is_featured` | BOOLEAN | Default `false` |
| `status` | TEXT | `'draft'`, `'published'`, `'archived'` |
| `locale` | TEXT | `'en'` or `'zh'` — homepage filters by locale |

Public visibility: **`status = 'published'`** only.

---

## Files reference

| File | Purpose |
|------|---------|
| `supabase/migrations/001_initial_schema.sql` | Phase 1 CRM + leads |
| `supabase/migrations/002_phase5_operations.sql` | Phase 5 submissions + listings |
| `supabase/seed/phase5_property_listings_seed.sql` | Test listings |
| `.env.example` | Local env template |

---

## Issues / follow-ups

1. **`SUPABASE_SERVICE_ROLE_KEY` not used in code** — `createServiceClient()` uses anon key. Works with current RLS; add service role for admin bypass later.
2. **Production without Supabase env** — API returns `503` in production; forms fail until Step D is complete.
3. **Run migration 002 on Supabase** — Code may be deployed but tables do not exist until SQL is executed.
