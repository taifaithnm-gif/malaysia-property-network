# Local Development & Testing

## 1. Environment setup

`.env.local` is created from `.env.example` and is **gitignored** (never commit it).

Required variables:

| Variable | Local example |
|----------|----------------|
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3457` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `60137757058` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://kvljugbxempboljyzqke.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Paste publishable anon key from Supabase Dashboard |

Get the anon key: **Supabase Dashboard → Project Settings → API → anon / publishable key**.

Optional (admin only, server-side):

- `SUPABASE_SERVICE_ROLE_KEY` — for `/admin/operations`, listings upload
- `ADMIN_PASSWORD` — for `/admin/login`

## 2. Start dev server

```bash
cd ~/ASEAN_INTELLIGENCE_HUB/malaysia-property-network
npm run dev -- -p 3457
```

Open: http://localhost:3457/en

## 3. Verify lead API (writes to Supabase)

In a **second terminal** (dev server must be running):

```bash
cd ~/ASEAN_INTELLIGENCE_HUB/malaysia-property-network
VERIFY_BASE_URL=http://localhost:3457 npm run verify:leads
```

Expected:

- **PASS** — `{ "success": true }` and row in Supabase → `leads` table
- **WARN (exit 2)** — `{ "mode": "logged" }` if anon key is still `your-anon-key`; update `.env.local` and restart dev
- **FAIL (exit 1)** — server not running or API error

## 4. Other local API checks

```bash
# Owner submission
curl -sS http://localhost:3457/api/owner-submissions -X POST \
  -H 'Content-Type: application/json' \
  -d '{"owner_name":"Local Test","whatsapp":"60137757058","project":"Forest City","unit_type":"2-bed","intent":"rent","locale":"en"}'

# Viewing appointment
curl -sS http://localhost:3457/api/viewing-appointments -X POST \
  -H 'Content-Type: application/json' \
  -d '{"full_name":"Local Test","contact":"60137757058","project":"Forest City","locale":"en"}'
```

Requires migration `004_phase6_operations.sql` applied on remote Supabase for viewing/golf/corporate tables.

## 5. Production vs local

- Production env is configured on **Vercel**; do not copy service-role keys into client code.
- Local `.env.local` only affects `npm run dev` on your machine.

## 6. Troubleshooting

### `Unexpected end of JSON input` (dev server crash)

Observed once after long-running dev session + `next.config.ts` hot restart. All JSON under `src/` validates clean. **Not reproducible** on a fresh start — likely a transient Turbopack/HMR issue while files were saving.

If it happens again:

1. Stop dev server (`Ctrl+C`)
2. `rm -rf .next && npm run dev -- -p 3457`
3. Ensure no JSON file is empty mid-save

### Multiple lockfile warning

Next.js may warn about lockfiles in parent directories. Safe to ignore for local dev, or set `turbopack.root` in `next.config.ts` if needed later.
