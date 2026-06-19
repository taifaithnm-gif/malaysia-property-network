# Phase 6 — Content Hubs & Admin Operations

## New public pages (EN + ZH)

| Item | Route |
|------|-------|
| Forest City 项目资料中心 | `/forest-city/resource-center` |
| Forest City Golf Resort 专题 | `/forest-city/golf-resort` |
| R&F Princess Cove 完整项目档案 | `/rf-princess-cove/archive` |
| Danga Bay 项目档案 | `/danga-bay/archive` |
| MM2H 专题页 | `/topics/mm2h` |
| 企业考察接待专题页 | `/topics/corporate-visit` |
| 高尔夫旅游专题页 | `/topics/golf-travel` |

## Admin (no locale prefix)

| Item | Route |
|------|-------|
| Sign in | `/admin/login` |
| Lead CRM Dashboard | `/admin/crm` |
| 房源发布后台 + 图片上传 | `/admin/listings` |

## Environment (Vercel + local)

```env
ADMIN_PASSWORD=your-secure-password
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SUPABASE_URL=https://kvljugbxempboljyzqke.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Supabase SQL (run after 001 + 002)

1. Open Supabase SQL Editor
2. Paste and run `supabase/migrations/003_phase6_storage.sql`

This creates the `listing-images` public bucket and service-role policies for admin CRM/listings.

## Content regeneration

```bash
node scripts/generate-phase6-content.mjs
```

Edits JSON under `src/lib/i18n/topics/` and `src/lib/i18n/project-archives/`.

## API routes (admin, cookie auth)

- `POST /api/admin/login` — set session cookie
- `POST /api/admin/logout`
- `GET/POST /api/admin/listings`
- `PATCH/DELETE /api/admin/listings/[id]`
- `POST /api/admin/upload` — image to Supabase Storage
- `GET /api/admin/crm` — leads + owner submissions + tenant requests
- `PATCH /api/admin/crm/[type]/[id]` — update status

## Deploy checklist

1. Run migrations 001 → 002 → seed → **003**
2. Set all env vars on Vercel (including `ADMIN_PASSWORD`, `SUPABASE_SERVICE_ROLE_KEY`, anon key)
3. Redeploy
4. Sign in at `/admin/login`, publish listings with images, verify homepage listings
