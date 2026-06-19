# Malaysia Property Network — Phase 1 Launch Checklist

**Scope:** Launch V1 as-is. No new features. No Golf pages. No UI redesign.  
**Target domain:** `https://malaysiapropertynetwork.com`  
**Last updated:** 2026-06-19

---

## Current Status Snapshot

| Item | Status |
|------|--------|
| Local git commit | Done — `fcd5da5` on `master` |
| GitHub remote / push | **Not done** — `gh` auth mismatch (`taifaithnm-gif` ≠ `junjim895201-ui`) |
| Vercel project | **Not done** |
| Custom domain | **Not done** |
| Supabase project | **Not done** |
| `.env.local` | **Not created** |
| Production build (`npm run build`) | Pass (verified pre-launch) |

---

## Priority 1 — Deploy to Production

### 1.1 Push repository to GitHub

**Target repo:** `junjim895201-ui/malaysia-property-network` (public)

- [ ] Log in to GitHub CLI as the account that owns `junjim895201-ui`:
  ```bash
  gh auth login
  gh auth status   # confirm correct account
  ```
- [ ] From project root:
  ```bash
  cd ~/ASEAN_INTELLIGENCE_HUB/malaysia-property-network
  git branch -M main
  ```
- [ ] Create repo and push (if repo does not exist yet):
  ```bash
  gh repo create junjim895201-ui/malaysia-property-network \
    --public \
    --source=. \
    --remote=origin \
    --description="Malaysia Property Management & Rental Solutions for Overseas Property Owners" \
    --push
  ```
- [ ] **If repo already exists on GitHub**, push only:
  ```bash
  git remote add origin https://github.com/junjim895201-ui/malaysia-property-network.git
  git push -u origin main
  ```
- [ ] Confirm on GitHub: all source files present, `.env.local` **not** committed (gitignored)
- [ ] Optional: add `docs/PHASE2_ROADMAP.md` to repo if planning docs should be tracked:
  ```bash
  git add docs/
  git commit -m "Add Phase 2 planning roadmap"
  git push
  ```

**Blocker from last attempt:** `taifaithnm-gif` cannot create repos under `junjim895201-ui`. Must authenticate as the correct owner or create repo manually on github.com.

---

### 1.2 Create Vercel project

- [ ] Go to [vercel.com/new](https://vercel.com/new)
- [ ] Import `junjim895201-ui/malaysia-property-network`
- [ ] **Root Directory:** `.` (repo root — project is standalone, not monorepo subfolder)
- [ ] **Framework Preset:** Next.js (auto-detected)
- [ ] **Build Command:** `npm run build` (matches `vercel.json`)
- [ ] **Region:** Singapore (`sin1`) — already set in `vercel.json`
- [ ] Do **not** deploy yet until env vars are added (step 1.4)

---

### 1.3 Connect `malaysiapropertynetwork.com`

- [ ] In Vercel project → **Settings → Domains**
- [ ] Add domain: `malaysiapropertynetwork.com`
- [ ] Add domain: `www.malaysiapropertynetwork.com`
- [ ] Set primary domain to `malaysiapropertynetwork.com`
- [ ] Enable redirect: `www` → apex (or apex → `www` — pick one, stay consistent)
- [ ] Note DNS records Vercel displays (needed for step 1.4)

---

### 1.4 Configure DNS

At your domain registrar (where `malaysiapropertynetwork.com` is registered):

| Type | Name | Value | Notes |
|------|------|-------|-------|
| **A** | `@` | `76.76.21.21` | Vercel apex record |
| **CNAME** | `www` | `cname.vercel-dns.com` | Vercel www record |

- [ ] Add A record for apex (`@`)
- [ ] Add CNAME for `www`
- [ ] Remove conflicting old A/CNAME records if migrating from another host
- [ ] Wait for propagation (usually 5–60 min; up to 48h)
- [ ] Confirm in Vercel: domain shows **Valid Configuration**
- [ ] Confirm SSL certificate issued (automatic via Vercel)

**Optional — email:** If you need `info@malaysiapropertynetwork.com`, configure MX separately at registrar (not required for site launch).

---

### 1.5 Deploy production build

**Environment variables (Vercel → Settings → Environment Variables → Production):**

| Variable | Value | Required at launch |
|----------|-------|-------------------|
| `NEXT_PUBLIC_SITE_URL` | `https://malaysiapropertynetwork.com` | Yes |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Real number, e.g. `60123456789` | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | From Supabase dashboard | Yes (for lead capture) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | From Supabase dashboard | Yes |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | Optional |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID | Optional |

- [ ] Add all env vars before first production deploy
- [ ] Trigger deploy: **Deployments → Redeploy** (or push to `main`)
- [ ] Build succeeds with no errors
- [ ] Post-deploy smoke test:

| URL | Expected |
|-----|----------|
| `https://malaysiapropertynetwork.com` | Redirect → `/en` |
| `https://malaysiapropertynetwork.com/en` | Home loads |
| `https://malaysiapropertynetwork.com/zh` | Chinese home loads |
| `https://malaysiapropertynetwork.com/en/contact` | Contact + lead form |
| `https://malaysiapropertynetwork.com/sitemap.xml` | URLs use production domain |
| `https://malaysiapropertynetwork.com/robots.txt` | Sitemap points to production domain |

---

## Priority 2 — Backend & Integrations

### 2.1 Create Supabase project

- [ ] Go to [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**
- [ ] Name: `malaysia-property-network` (or similar)
- [ ] Region: **Southeast Asia (Singapore)** — closest to JB users
- [ ] Save database password securely
- [ ] Copy from **Settings → API**:
  - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
  - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Add both to Vercel env vars → **Redeploy**

---

### 2.2 Run migration

- [ ] Open **Supabase → SQL Editor**
- [ ] Paste and run full contents of:
  ```
  supabase/migrations/001_initial_schema.sql
  ```
- [ ] Confirm tables exist: **Table Editor**
  - [ ] `owners`
  - [ ] `properties`
  - [ ] `tenants`
  - [ ] `leads`
- [ ] Confirm RLS enabled on all four tables
- [ ] Confirm policy **"Anyone can submit leads"** exists on `leads` (INSERT for `anon`)

---

### 2.3 Test lead submission

- [ ] Go to `https://malaysiapropertynetwork.com/en/contact`
- [ ] Submit test lead:
  - Name: `Launch Test`
  - Email: your test email
  - Phone: valid number
  - Property: `Forest City`
  - Message: `Phase 1 launch test`
- [ ] Success message appears on form
- [ ] Row appears in Supabase **Table Editor → leads** with:
  - [ ] `status` = `new`
  - [ ] `source` = `contact-page`
  - [ ] `locale` = `en`
- [ ] Repeat on `/zh/contact` — confirm `locale` = `zh`
- [ ] Test home page CTA form (`/` → scroll to form section) — confirm `source` = `cta-section`
- [ ] Check Vercel **Functions / Logs** if submission fails

**Failure modes:**

| Symptom | Likely cause |
|---------|--------------|
| Form shows success but no DB row | Supabase env vars missing/wrong; check Vercel logs for `mode: logged` |
| 500 error | RLS policy missing or migration not run |
| CORS / network error | Wrong Supabase URL |

---

### 2.4 Verify WhatsApp integration

- [ ] Confirm `NEXT_PUBLIC_WHATSAPP_NUMBER` in Vercel is the **real** business number (no `+`, no spaces)
- [ ] Click floating WhatsApp button (bottom-right on all pages)
- [ ] Opens `https://wa.me/<number>?text=...` with pre-filled message
- [ ] Click inline WhatsApp CTAs on Home hero and Contact page
- [ ] Footer phone link `tel:+<number>` dials correctly on mobile
- [ ] Update pre-filled message if needed (currently: *"Hi, I'm an overseas property owner interested in your management services."* — change via env/code only if business approves; **no UI redesign**)

---

## Priority 3 — Social Presence (No Code Changes)

Create profiles only. Link to `https://malaysiapropertynetwork.com` in bio/website field.

### 3.1 Facebook Page

- [ ] Create Page: **Malaysia Property Network**
- [ ] Category: Real Estate / Property Management
- [ ] Profile photo: MP logo (match site teal/navy branding)
- [ ] Cover photo: JB skyline or Forest City
- [ ] About → Website: `https://malaysiapropertynetwork.com`
- [ ] About → WhatsApp button (if available)
- [ ] Copy `NEXT_PUBLIC_META_PIXEL_ID` from Facebook Events Manager → add to Vercel → redeploy

### 3.2 Instagram

- [ ] Handle: `@malaysiapropertynetwork` (or closest available)
- [ ] Bio: *Malaysia Property Management & Rental for Overseas Owners*
- [ ] Link in bio: `https://malaysiapropertynetwork.com`
- [ ] Connect to Facebook Page (Meta Business Suite)

### 3.3 LinkedIn Company Page

- [ ] Page name: **Malaysia Property Network**
- [ ] Industry: Real Estate
- [ ] Company size / HQ: Johor Bahru, Malaysia
- [ ] Website: `https://malaysiapropertynetwork.com`
- [ ] Logo + banner uploaded

### 3.4 TikTok

- [ ] Account: `@malaysiapropertynetwork` (or closest available)
- [ ] Bio + link: site URL
- [ ] Content plan (post-launch, no dev work): property tips, JB area guides, bilingual captions

**After social accounts exist:**

- [ ] Add social links to site footer — **defer to post-launch** unless already planned (would be a small content change, not Phase 1 blocker)
- [ ] Submit sitemap in [Google Search Console](https://search.google.com/search-console)
- [ ] Verify domain in Search Console via DNS TXT record

---

## Launch Day Sequence (Recommended Order)

```
Day 1 — Priority 1
  1. Fix GitHub auth → push repo
  2. Create Vercel project → import repo
  3. Add env vars (SITE_URL + WhatsApp minimum)
  4. Deploy → verify .vercel.app URL

Day 2 — Priority 1 continued
  5. Add custom domain in Vercel
  6. Configure DNS at registrar
  7. Wait for SSL → smoke test all EN/ZH routes

Day 3 — Priority 2
  8. Create Supabase → run migration
  9. Add Supabase env vars → redeploy
  10. Test lead submission EN + ZH
  11. Verify WhatsApp on production

Day 4+ — Priority 3
  12. Create social accounts
  13. Meta Pixel → Vercel → redeploy
  14. Google Search Console + Analytics
```

---

## Go / No-Go Criteria

**Go live when all are true:**

- [ ] `https://malaysiapropertynetwork.com/en` loads over HTTPS
- [ ] All 16 EN/ZH page routes return 200
- [ ] Lead form saves to Supabase `leads` table
- [ ] WhatsApp opens correct number
- [ ] `sitemap.xml` and `robots.txt` use production domain
- [ ] No placeholder WhatsApp number (`60123456789`) in production env

**Do not go live if:**

- Supabase migration not run (leads will not persist)
- DNS not propagated / SSL error
- Placeholder env vars still in Vercel Production

---

## Explicitly Out of Scope (Phase 1)

- Golf Villas / Golf Holidays pages
- MM2H pages
- Property Sales / Rental listing pages
- UI redesign or rebrand
- Owner portal / admin dashboard
- WeChat mini-program
- New navigation items beyond V1

See `docs/PHASE2_ROADMAP.md` for post-launch expansion planning.

---

## Quick Reference Commands

```bash
# Local verify before deploy
cd ~/ASEAN_INTELLIGENCE_HUB/malaysia-property-network
npm run build
npm run start

# GitHub push (after correct auth)
git branch -M main
git push -u origin main

# Vercel CLI alternative (optional)
npm i -g vercel
vercel login
vercel --prod
```

---

## Owner Sign-Off

| Priority | Owner | Target date | Signed off |
|----------|-------|-------------|------------|
| P1 — Deploy | | | [ ] |
| P2 — Supabase + WhatsApp | | | [ ] |
| P3 — Social | | | [ ] |

---

*Malaysia Property Network — Phase 1 Launch Checklist*  
*V1 pages only: Home, Property Management, Johor Bahru, Forest City, R&F Princess Cove, Danga Bay, About, Contact*
