# Malaysia Property Network

**Malaysia Property Management & Rental Solutions for Overseas Property Owners**

Production-ready marketing website with lead capture CRM, bilingual support (English / Chinese), and deploy configuration for Vercel + Supabase.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| Hosting | Vercel |

## Pages

| Route | Description |
|-------|-------------|
| `/en`, `/zh` | Home |
| `/[locale]/property-management` | Property Management Services |
| `/[locale]/johor-bahru` | Johor Bahru |
| `/[locale]/forest-city` | Forest City |
| `/[locale]/rf-princess-cove` | R&F Princess Cove |
| `/[locale]/danga-bay` | Danga Bay |
| `/[locale]/about` | About |
| `/[locale]/contact` | Contact + Lead Form |

## Features

- **Lead Form** — Submits to Supabase `leads` table via `/api/leads`
- **WhatsApp Button** — Floating + inline CTAs
- **SEO** — Per-page metadata, Open Graph, JSON-LD, sitemap, robots.txt
- **Google Analytics** — Set `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- **Meta Pixel** — Set `NEXT_PUBLIC_META_PIXEL_ID`
- **i18n** — English (`/en`) and Chinese (`/zh`)

## Folder Structure

```
malaysia-property-network/
├── src/
│   ├── app/
│   │   ├── [locale]/              # Localized pages
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx           # Home
│   │   │   ├── property-management/
│   │   │   ├── johor-bahru/
│   │   │   ├── forest-city/
│   │   │   ├── rf-princess-cove/
│   │   │   ├── danga-bay/
│   │   │   ├── about/
│   │   │   └── contact/
│   │   ├── api/leads/route.ts     # Lead submission API
│   │   ├── layout.tsx             # Root layout + analytics
│   │   ├── page.tsx               # Redirect → /en
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── globals.css
│   ├── components/
│   │   ├── analytics/             # GA + Meta Pixel
│   │   ├── layout/                # Header, Footer, LanguageSwitcher
│   │   ├── sections/              # Hero, Services, Locations, CTA
│   │   └── ui/                    # Button, LeadForm, WhatsAppButton
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── seo.ts
│   │   ├── i18n/
│   │   │   ├── config.ts
│   │   │   ├── get-dictionary.ts
│   │   │   └── dictionaries/
│   │   │       ├── en.json
│   │   │       └── zh.json
│   │   └── supabase/
│   │       ├── client.ts
│   │       ├── server.ts
│   │       └── types.ts
│   └── middleware.ts              # Locale routing
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql # owners, properties, tenants, leads
├── public/
├── .env.example
├── vercel.json
├── next.config.ts
└── package.json
```

## CRM Tables (Supabase)

| Table | Purpose |
|-------|---------|
| `owners` | Overseas property owners |
| `properties` | Managed units linked to owners |
| `tenants` | Active tenants linked to properties |
| `leads` | Website inquiry submissions |

## Quick Start

```bash
cd malaysia-property-network
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → redirects to `/en`.

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/migrations/001_initial_schema.sql` in the SQL Editor
3. Copy Project URL and anon key to `.env.local`

## Deploy to Vercel

1. Push to GitHub
2. Import project in [vercel.com](https://vercel.com)
3. Add environment variables from `.env.example`
4. Deploy — region defaults to Singapore (`sin1`)

```bash
npm run build   # verify locally first
```

## Environment Variables

See `.env.example` for all required and optional variables.

## License

Private — Malaysia Property Network
