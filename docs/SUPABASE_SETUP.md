# Supabase Setup — Malaysia Property Network

## 1. Create Supabase project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**
2. Name: `malaysia-property-network`
3. Region: **Southeast Asia (Singapore)**
4. Save the database password

## 2. Run migration (CRM tables)

**Option A — SQL Editor (recommended for first setup)**

1. Open **SQL Editor** in Supabase dashboard
2. Paste contents of `supabase/migrations/001_initial_schema.sql`
3. Click **Run**

**Option B — Supabase CLI**

```bash
npm install -g supabase
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

### Tables created

| Table | Purpose |
|-------|---------|
| `owners` | Overseas property owners |
| `properties` | Managed units |
| `tenants` | Active tenants |
| `leads` | Website contact form submissions |

RLS: anonymous users can **INSERT** into `leads` only. Admin reads require authenticated Supabase user.

## 3. Configure environment variables

Copy keys from **Settings → API**:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Vercel (Production):** Settings → Environment Variables → add same keys → Redeploy.

## 4. Verify lead submission

```bash
npm run dev
npm run verify:leads
```

Expected: `PASS — lead saved to Supabase`

Check **Table Editor → leads** for the test row.

## 5. Contact form flow (no UI changes)

```
LeadForm → POST /api/leads → Supabase leads table
```

Sources tracked: `contact-page`, `cta-section`, `verify-script`
