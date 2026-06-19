# Malaysia Property Network — Phase 2 Expansion Roadmap

**Version:** V2 Planning  
**Status:** Planning only — no implementation  
**Baseline:** V1 live site (Property Management focus, Johor Bahru locations, EN/ZH, Supabase CRM: `owners`, `properties`, `tenants`, `leads`)

---

## Executive Summary

Phase 2 transforms Malaysia Property Network from a **single-service property management site** into a **multi-category lifestyle and investment platform** serving overseas buyers, renters, owners, golfers, and MM2H applicants across Johor Bahru and southern Malaysia.

**Strategic positioning (V2):**

> Malaysia Property Network — Your gateway to property, golf, and living in Malaysia for overseas investors and expatriates.

**Six business categories:**

| # | Category | Primary intent |
|---|----------|----------------|
| 1 | Property Sales | Buy investment or lifestyle property |
| 2 | Property Rental | Rent short- or long-term |
| 3 | Property Management | Outsource operations (V1 core — expand) |
| 4 | Golf Villas | Buy/rent golf-adjacent luxury property |
| 5 | Golf Holidays | Book golf + stay packages |
| 6 | MM2H Living | Relocate under Malaysia My Second Home |

---

## Implementation Phases (Suggested Order)

| Phase | Focus | Duration (est.) | Dependencies |
|-------|-------|-----------------|--------------|
| **2A** | Property Sales + Rental listings foundation | 4–6 weeks | CRM schema v2, listing CMS or Supabase tables |
| **2B** | Property Management depth (V1 → V2 upgrade) | 2–3 weeks | Owner portal spec (optional), reporting pages |
| **2C** | Golf Villas + Golf Holidays | 4–5 weeks | Partner golf courses, villa inventory |
| **2D** | MM2H Living | 3–4 weeks | MM2H agent partnership, compliance copy review |
| **2E** | SEO consolidation, analytics funnels, CRM automation | 2–3 weeks | All categories live |

**Total estimated timeline:** 15–21 weeks (sequential) or 10–14 weeks (parallel workstreams with dedicated content + dev).

---

## Cross-Cutting Requirements (All Categories)

### Site architecture changes (planned)

```
/en | /zh
├── /property-sales/          ← NEW hub + sub-pages
├── /property-rental/         ← NEW hub + sub-pages
├── /property-management/     ← EXISTING — expand
├── /golf-villas/             ← NEW hub + sub-pages
├── /golf-holidays/           ← NEW hub + sub-pages
├── /mm2h-living/             ← NEW hub + sub-pages
├── /johor-bahru/             ← EXISTING — cross-link all categories
├── /forest-city/
├── /rf-princess-cove/
├── /danga-bay/
├── /listings/                ← NEW (sales + rental index, filterable)
├── /about/
└── /contact/                 ← EXISTING — category-aware lead forms
```

### Lead form evolution (planned)

- Add `category` and `intent` fields to all forms
- Category-specific optional fields (budget, move-in date, handicap, MM2H status)
- Route leads to Supabase with `source_page` + UTM preservation
- WhatsApp deep links per category (pre-filled message templates)

### CRM baseline (V1 → V2)

| V1 table | V2 action |
|----------|-----------|
| `leads` | Add: `category`, `intent`, `budget_min`, `budget_max`, `timeline`, `assigned_to`, `pipeline_stage` |
| `owners` | Extend: `owner_type` (investor / end-user / MM2H) |
| `properties` | Extend: `listing_type` (sale / rent / managed), `sale_price`, `listing_status`, `golf_proximity` |
| `tenants` | Keep; link to rental pipeline |
| **NEW** `buyers` | Sales pipeline contacts |
| **NEW** `listings` | Published sale/rent inventory (or CMS sync) |
| **NEW** `bookings` | Golf holiday reservations |
| **NEW** `mm2h_applications` | MM2H programme tracking |

### Analytics events (planned)

| Event | Categories |
|-------|------------|
| `lead_submit` | All |
| `whatsapp_click` | All |
| `listing_view` | Sales, Rental, Golf Villas |
| `booking_inquiry` | Golf Holidays |
| `mm2h_guide_download` | MM2H Living |

---

## Category 1: Property Sales

### Revenue Model

| Stream | Description | Typical margin |
|--------|-------------|----------------|
| **Developer commissions** | Referral/co-broke on new launches (Forest City, R&F, etc.) | 2–4% of transacted price |
| **Secondary market fees** | Buyer/seller agency on resale condos & landed | 2–3% per side |
| **Consultation packages** | Paid property selection report for overseas buyers | RM 500–2,000 flat |
| **Cross-sell** | Sale → Management contract (recurring) | Management fee 8–12% of rent |

### Target Customers

| Segment | Profile | Primary need |
|---------|---------|--------------|
| **China / HK investors** | Cash buyers, Forest City & R&F focus | ROI + exit liquidity |
| **Singapore PRs & citizens** | Cross-border commuters | JB proximity, rental yield |
| **Expat end-users** | Relocating families | Lifestyle + schools + amenities |
| **Retirees (pre-MM2H)** | 55+, considering relocation | Low maintenance, managed communities |

### Required Pages

| Page | Route (EN example) | Purpose |
|------|-------------------|---------|
| Sales hub | `/en/property-sales` | Category landing, value prop, featured listings |
| New launches | `/en/property-sales/new-launches` | Developer projects, payment plans |
| Resale listings | `/en/property-sales/resale` | Secondary market inventory |
| Investment guide | `/en/property-sales/investment-guide` | Yield calculators, area comparison |
| Forest City sales | `/en/property-sales/forest-city` | Location-specific sales |
| R&F sales | `/en/property-sales/rf-princess-cove` | Location-specific sales |
| Buyer process | `/en/property-sales/how-to-buy` | Legal steps, foreign ownership rules |
| Listing detail | `/en/listings/[slug]` | Individual property (shared with rental) |

**ZH mirrors:** All routes under `/zh/...`

### Lead Generation Strategy

| Tactic | Implementation |
|--------|----------------|
| **High-intent forms** | "Request viewing", "Download price list", "Get investment report" |
| **WhatsApp** | Pre-filled: "I'm interested in buying property in [location]" |
| **Retargeting** | Meta Pixel + GA audiences on listing views |
| **Content** | Monthly "JB market snapshot" PDF gated by email |
| **Partnerships** | Developer co-marketing landing pages with UTM tracking |
| **Chinese channels** | WeChat landing links, Xiaohongshu content → site CTAs |

### SEO Keywords

**English (primary):**
- buy property johor bahru foreigner
- forest city property for sale
- rf princess cove for sale
- johor bahru condo investment
- malaysia property for singapore buyers
- jb new launch property 2026

**Chinese (primary):**
- 新山买房
- 森林城市楼盘
- 富力公主湾出售
- 马来西亚房产投资
- 新加坡人新山买房

### CRM Requirements

| Field / object | Details |
|--------------|---------|
| **Lead fields** | `category=sales`, budget range, preferred locations, property type, financing (cash/loan), timeline |
| **Pipeline stages** | New → Qualified → Viewing scheduled → Offer → SPA signed → Closed / Lost |
| **Link to** | `buyers` table, `listings`, optional `owners` on close |
| **Automation** | Auto-assign by location; 24h SLA reminder; viewing follow-up sequence |
| **Reporting** | Conversion by source, location, average deal size, time-to-close |

---

## Category 2: Property Rental

### Revenue Model

| Stream | Description | Typical margin |
|--------|-------------|----------------|
| **Tenant placement fee** | One month rent or fixed fee on new lease | 0.5–1 month rent |
| **Landlord management** | Ongoing management (cross-sell to Cat. 3) | 8–12% monthly rent |
| **Corporate leasing** | Bulk units for employers / factories | Negotiated annual contract |
| **Short-term premium** | Serviced / furnished premium over long-term | 15–25% markup |

### Target Customers

| Segment | Profile | Primary need |
|---------|---------|--------------|
| **Singapore commuters** | Daily or weekly cross-border workers | Furnished, near CIQ, flexible lease |
| **Corporate tenants** | HR relocating staff to JB | Multi-unit, invoicing, compliance |
| **Students & families** | Medium-term 6–12 month | Budget, proximity to schools |
| **Overseas landlords** | Owners abroad needing tenant (→ Management) | Tenant quality, rent collection |

### Required Pages

| Page | Route (EN example) | Purpose |
|------|-------------------|---------|
| Rental hub | `/en/property-rental` | Category landing, search entry |
| Long-term rental | `/en/property-rental/long-term` | 12+ month leases |
| Corporate housing | `/en/property-rental/corporate` | B2B offering |
| Furnished rentals | `/en/property-rental/furnished` | Expat-ready units |
| Rental by location | `/en/property-rental/johor-bahru` (+ Forest City, R&F, Danga Bay) | Geo landing pages |
| Tenant guide | `/en/property-rental/tenant-guide` | Lease process, deposits, rules |
| Landlord list-your-property | `/en/property-rental/list-your-property` | Owner acquisition |
| Listing detail | `/en/listings/[slug]` | Shared with sales (filter: rent) |

### Lead Generation Strategy

| Tactic | Implementation |
|--------|----------------|
| **Dual-sided forms** | Separate "I want to rent" vs "I want to list" flows |
| **Instant WhatsApp** | Tenant: "Looking for 2BR near CIQ, budget RM X" |
| **Listing alerts** | Email/WhatsApp when new matching unit posted |
| **SEO local pages** | "Rent condo near Singapore checkpoint" |
| **PropertyGuru / iProperty** | Syndication with UTM → site contact for premium service |
| **Employer outreach** | Corporate landing page + PDF capability statement |

### SEO Keywords

**English:**
- rent condo johor bahru near singapore
- forest city rental
- rf princess cove rent
- furnished apartment jb ciq
- long term rental johor bahru expat
- danga bay condo for rent

**Chinese:**
- 新山租房
- 森林城市出租
- 富力公主湾租房
- 新山长租公寓
- 新加坡人新山租房

### CRM Requirements

| Field / object | Details |
|--------------|---------|
| **Lead fields** | `category=rental`, tenant vs landlord intent, budget, move-in date, lease duration, furnishing |
| **Pipeline (tenant)** | New → Requirements captured → Shortlist sent → Viewing → Application → Lease signed |
| **Pipeline (landlord)** | New → Property details → Valuation → Listed → Tenant placed |
| **Link to** | `tenants`, `properties` (status: listed/occupied), `owners` |
| **Automation** | Match leads to vacant `properties`; stale listing alerts |
| **Reporting** | Vacancy days, rent achieved vs asking, placement fee revenue |

---

## Category 3: Property Management

### Revenue Model

| Stream | Description | Typical margin |
|--------|-------------|----------------|
| **Management fee** | % of monthly rent collected | 8–12% of gross rent |
| **Leasing fee** | New tenant placement (see Rental) | 0.5–1 month |
| **Maintenance markup** | Coordinated repairs, bill pay | 10–15% or flat coordination fee |
| **Annual inspection report** | Condition report for overseas owners | RM 200–500/year |
| **Vacancy marketing** | Photography, listing syndication | RM 300–800 one-time |

*V1 already positions this category — Phase 2 deepens content, packages, and CRM workflow.*

### Target Customers

| Segment | Profile | Primary need |
|---------|---------|--------------|
| **Overseas owners (China/HK/SG)** | Absentee landlords | Trust, transparency, rent remittance |
| **Post-sale buyers** | Just purchased via Cat. 1 | Immediate management setup |
| **Inherited / gifted owners** | Family property, live abroad | Compliance, maintenance |
| **Small portfolio investors** | 2–10 units | Consolidated reporting |

### Required Pages

| Page | Route | Status |
|------|-------|--------|
| Management hub | `/en/property-management` | **EXISTING — expand** |
| Service packages | `/en/property-management/packages` | NEW — Basic / Standard / Premium tiers |
| Owner reporting sample | `/en/property-management/reporting` | NEW — Sample monthly report PDF |
| Maintenance & repairs | `/en/property-management/maintenance` | NEW |
| Location pages | Forest City, R&F, Danga Bay, JB management sub-pages | NEW (or expand geo pages) |
| FAQ | `/en/property-management/faq` | NEW — Strata, taxes, tenant law |
| Case studies | `/en/property-management/case-studies` | NEW — Anonymised success stories |

### Lead Generation Strategy

| Tactic | Implementation |
|--------|----------------|
| **Free property audit** | "Upload photos + strata statement → free rental assessment" |
| **Post-sale handoff** | Automatic offer to sales closers (Cat. 1 integration) |
| **Chinese trust content** | Video testimonials, bilingual owner portal preview |
| **Referral programme** | Existing owners refer new owners (track in CRM) |
| **Email nurture** | 5-part "Overseas Owner Guide" drip |
| **WhatsApp** | V1 message template — add package selection buttons |

### SEO Keywords

**English:**
- johor bahru property management overseas owner
- forest city property management
- rf princess cove management company
- malaysia rental collection service
- absentee landlord johor bahru
- condo management jb for foreigners

**Chinese:**
- 马来西亚房产管理
- 海外业主托管
- 新山房产管理
- 森林城市物业管理
- 富力公主湾托管

### CRM Requirements

| Field / object | Details |
|--------------|---------|
| **V1 tables** | `owners`, `properties`, `tenants`, `leads` — extend, do not replace |
| **New fields on `properties`** | `management_tier`, `contract_start`, `contract_end`, `fee_percentage` |
| **New fields on `owners`** | `remittance_method`, `reporting_frequency`, `portfolio_size` |
| **Pipeline** | Inquiry → Audit → Proposal sent → Contract signed → Active management |
| **Automation** | Monthly report reminders; lease expiry 90/60/30 day alerts |
| **Reporting** | MRR from management fees, churn rate, units under management |
| **Future (Phase 3)** | Owner portal login — out of scope for initial V2 |

---

## Category 4: Golf Villas

### Revenue Model

| Stream | Description | Typical margin |
|--------|-------------|----------------|
| **Villa sales commission** | Golf-course-adjacent luxury property | 2–4% |
| **Villa rental** | Short/long let on golf estates | 15–25% of booking or mgmt fee |
| **Management** | Same as Cat. 3 for villa owners | 8–12% |
| **Developer partnerships** | Exclusive launches at golf resorts | Negotiated |
| **Concierge upsell** | Club membership intro, caddie booking | Referral fee |

### Target Customers

| Segment | Profile | Primary need |
|---------|---------|--------------|
| **Golf enthusiasts (Asia)** | HK, SG, CN, Japan, Korea | Play + stay property |
| **Retirees / semi-retired** | High net worth, leisure focus | Low-density, club access |
| **Investment buyers** | Rental yield from golf tourism | Peak-season occupancy |
| **Corporate retreat buyers** | Company leisure assets | Privacy, facilities |

### Required Pages

| Page | Route (EN example) | Purpose |
|------|-------------------|---------|
| Golf Villas hub | `/en/golf-villas` | Category landing, lifestyle positioning |
| Villas for sale | `/en/golf-villas/for-sale` | Sales listings near courses |
| Villas for rent | `/en/golf-villas/for-rent` | Holiday / long-stay rental |
| Featured courses & areas | `/en/golf-villas/locations` | Southern Malaysia golf map |
| Leisure Country Club area | `/en/golf-villas/leisure-country-club` | Example geo page (expand per course) |
| Villa management | `/en/golf-villas/management` | Cross-sell Cat. 3 for villa owners |
| Lifestyle guide | `/en/golf-villas/lifestyle` | Living on a golf estate |

### Lead Generation Strategy

| Tactic | Implementation |
|--------|----------------|
| **Lifestyle imagery** | Hero video, drone footage, course views |
| **Golf profile form** | Handicap, preferred courses, visit dates |
| **Inspection trip packages** | "Golf + property viewing weekend" lead magnet |
| **Partnerships** | Golf clubs, pro shops, tournament sponsors |
| **Cross-sell** | Golf Holidays (Cat. 5) → Villa purchase/rental |
| **Chinese golf tourism** | Target CN/HK golf travel groups |

### SEO Keywords

**English:**
- golf villa malaysia for sale
- johor golf property
- malaysia golf course villa
- buy villa near golf club jb
- golf property investment malaysia
- luxury villa johor golf

**Chinese:**
- 马来西亚高尔夫别墅
- 新山高尔夫房产
- 买高尔夫别墅
- 马来西亚高尔夫地产投资

### CRM Requirements

| Field / object | Details |
|--------------|---------|
| **Lead fields** | `category=golf_villas`, intent (buy/rent/manage), preferred courses, handicap, visit dates |
| **Property fields** | `golf_proximity`, `course_name`, `club_membership_available`, `villa_type` |
| **Pipeline** | Same as Sales/Rental with golf-specific qualification |
| **Link to** | `listings`, `buyers`, `bookings` (if also holiday interest) |
| **Partners** | New `partners` table optional: golf courses, clubs |
| **Reporting** | Leads by course area, conversion from Golf Holidays |

---

## Category 5: Golf Holidays

### Revenue Model

| Stream | Description | Typical margin |
|--------|-------------|----------------|
| **Package markup** | Golf + hotel/villa + transport bundles | 15–25% on package cost |
| **Commission from courses** | Tee time referral fees | RM 20–80/round or % |
| **Accommodation commission** | Hotel/villa partner referral | 10–15% |
| **Custom itinerary fee** | Bespoke multi-day trips | RM 500–2,000 planning fee |
| **Group tour margin** | 8–20 pax golf tours from SG/HK/CN | Volume negotiated |

### Target Customers

| Segment | Profile | Primary need |
|---------|---------|--------------|
| **Singapore golfers** | Weekend trip, 2–3 days | Easy booking, proximity |
| **Hong Kong / China groups** | 4–7 day golf tours | Itinerary, Mandarin support |
| **Corporate MICE** | Team building, client entertainment | Turnkey packages |
| **International tourists** | Malaysia as golf destination | Multi-course experience |

### Required Pages

| Page | Route (EN example) | Purpose |
|------|-------------------|---------|
| Golf Holidays hub | `/en/golf-holidays` | Package overview, destinations |
| Package listings | `/en/golf-holidays/packages` | Standard packages with pricing bands |
| Custom itinerary | `/en/golf-holidays/custom-trip` | Bespoke enquiry form |
| Courses we partner with | `/en/golf-holidays/courses` | Course profiles, difficulty, fees |
| JB weekend golf | `/en/golf-holidays/johor-bahru-weekend` | Flagship short-trip page |
| Group tours | `/en/golf-holidays/group-tours` | B2B / travel agent page |
| Booking FAQ | `/en/golf-holidays/faq` | Visas, weather, dress code, cancellation |

### Lead Generation Strategy

| Tactic | Implementation |
|--------|----------------|
| **Package enquiry form** | Dates, group size, handicap range, budget |
| **Instant quote request** | WhatsApp with structured template |
| **Seasonal campaigns** | "Monsoon-free months", tournament calendars |
| **Travel agent portal** | Agent registration + commission tracking (Phase 2E) |
| **Retargeting** | Abandoned enquiry follow-up |
| **Cross-sell** | Holiday takers → Golf Villa ownership (Cat. 4) |
| **Content** | "Top 5 JB courses for handicaps 10–20" blog series |

### SEO Keywords

**English:**
- johor bahru golf package
- malaysia golf holiday singapore
- jb golf trip weekend
- golf tour malaysia booking
- cheap golf packages johor
- malaysia golf vacation

**Chinese:**
- 马来西亚高尔夫旅游
- 新山高尔夫套餐
- 新加坡高尔夫旅行
- 柔佛高尔夫订场

### CRM Requirements

| Field / object | Details |
|--------------|---------|
| **New table: `bookings`** | `lead_id`, dates, group_size, courses, accommodation, status, total_value |
| **Lead fields** | `category=golf_holidays`, travel dates, pax, handicap range, budget, accommodation preference |
| **Pipeline** | Enquiry → Itinerary sent → Deposit → Confirmed → Completed → Review |
| **Partners** | Courses, hotels, transport providers with commission rates |
| **Automation** | Pre-trip checklist email; post-trip review + upsell to Cat. 4 |
| **Reporting** | Package revenue, average group size, repeat booking rate |

---

## Category 6: MM2H Living

### Revenue Model

| Stream | Description | Typical margin |
|--------|-------------|----------------|
| **MM2H agent referral** | Official programme application support | RM 3,000–8,000 per approved case |
| **Property purchase commission** | Buyer needs home after approval (Cat. 1) | 2–4% |
| **Rental placement** | Interim housing while searching (Cat. 2) | Placement fee |
| **Management** | Long-term managed home (Cat. 3) | Recurring |
| **Relocation concierge** | School search, bank account, utilities setup | RM 2,000–5,000 package |
| **MM2H + Golf lifestyle** | Bundled retirement + golf (Cat. 4/5) | Combined margin |

### Target Customers

| Segment | Profile | Primary need |
|---------|---------|--------------|
| **Retirees (50+)** | HK, CN, TW, SG, EU | Visa, home, healthcare access |
| **Remote workers** | Post-pandemic relocation | Long-stay, good connectivity |
| **Family relocation** | Children in international schools | Area selection, community |
| **Pre-retirees planning ahead** | 45–55, researching options | Programme rules, property budget |

### Required Pages

| Page | Route (EN example) | Purpose |
|------|-------------------|---------|
| MM2H hub | `/en/mm2h-living` | Programme overview, why Malaysia |
| Programme requirements | `/en/mm2h-living/requirements` | Eligibility, financial criteria (keep updated) |
| Application process | `/en/mm2h-living/how-to-apply` | Step-by-step with timeline |
| Best areas to live | `/en/mm2h-living/where-to-live` | JB, Penang, KL comparison (JB focus) |
| MM2H + property | `/en/mm2h-living/property-guide` | Buying/renting as MM2H holder |
| Relocation services | `/en/mm2h-living/relocation-concierge` | Package offerings |
| FAQ | `/en/mm2h-living/faq` | Compliance-safe Q&A |
| Disclaimer page | `/en/mm2h-living/disclaimer` | Not legal advice; licensed agent partnership |

### Lead Generation Strategy

| Tactic | Implementation |
|--------|----------------|
| **MM2H eligibility checker** | Simple form → "You may qualify" → consultation booking |
| **Free guide download** | "MM2H + Johor Bahru Living Guide 2026" (gated PDF) |
| **Webinar / WeChat Live** | Monthly info session registration |
| **Consultation booking** | Paid or free 30-min discovery call |
| **Cross-sell funnel** | MM2H lead → Property search (Cat. 1) → Management (Cat. 3) |
| **Chinese-first content** | Primary audience for MM2H; WeChat integration (Phase 3) |
| **Compliance** | Partner with licensed MM2H agent; clear disclaimers |

### SEO Keywords

**English:**
- malaysia mm2h programme 2026
- mm2h johor bahru
- malaysia my second home requirements
- retire in malaysia mm2h
- mm2h property purchase
- mm2h agent malaysia

**Chinese:**
- 马来西亚第二家园
- MM2H申请条件
- 马来西亚退休签证
- 第二家园买房
- 新山第二家园

### CRM Requirements

| Field / object | Details |
|--------------|---------|
| **New table: `mm2h_applications`** | `lead_id`, nationality, age, financial_tier, stage, agent_ref, approval_date |
| **Lead fields** | `category=mm2h`, age, nationality, liquid assets band, preferred state, property interest (Y/N) |
| **Pipeline** | Enquiry → Eligibility check → Docs collection → Submitted → Approved / Rejected |
| **Compliance** | Store consent timestamps; licensed agent assignment field |
| **Link to** | `buyers`, `owners` on property purchase post-approval |
| **Automation** | Document checklist emails; programme rule change alerts |
| **Reporting** | Applications by nationality, approval rate, revenue per case, property cross-sell rate |

---

## Master Page Inventory (V2 Target)

| Category | New pages (est.) | Reused / expanded |
|----------|------------------|-------------------|
| Property Sales | 8 | Listings detail (shared) |
| Property Rental | 8 | Listings detail (shared) |
| Property Management | 5 | 1 existing hub |
| Golf Villas | 7 | Geo cross-links |
| Golf Holidays | 7 | — |
| MM2H Living | 8 | — |
| **Shared** | Listings index, search/filter, legal disclaimers | Contact, About, 4 location pages |
| **Total new routes (EN+ZH)** | ~90–100 localized URLs | — |

---

## Priority Matrix

| Priority | Category | Rationale |
|----------|----------|-----------|
| **P1** | Property Management | V1 live; lowest lift to revenue |
| **P1** | Property Sales | Highest ticket; natural MM2H/golf upsell |
| **P2** | Property Rental | Pairs with management; fills occupancy pipeline |
| **P2** | MM2H Living | Strong CN demand; long sales cycle — start content early |
| **P3** | Golf Villas | Niche but high margin; requires inventory/partners |
| **NO **P3** | Golf Holidays | Transactional; depends on golf partnerships |

---

## Content & Compliance Checklist (Before Launch per Category)

- [ ] Licensed agency disclosures (sales, MM2H)
- [ ] MM2H programme facts reviewed by licensed agent (rules change frequently)
- [ ] Foreign ownership / strata content reviewed
- [ ] Golf course imagery rights and partner approvals
- [ ] Pricing disclaimers ("from RM X", subject to availability)
- [ ] EN + ZH legal review for MM2H and sales pages
- [ ] PDPA / privacy policy update for new data fields

---

## Success Metrics (Phase 2 KPIs)

| Metric | V1 baseline | V2 target (6 mo post-launch) |
|--------|-------------|------------------------------|
| Monthly qualified leads | TBD | +150% |
| Lead → consultation rate | TBD | ≥ 25% |
| Categories with active pipeline | 1 | 6 |
| Organic traffic (EN + ZH) | TBD | +200% |
| Cross-sell (sales → management) | — | ≥ 30% of closings |
| Golf holiday bookings / month | — | 10+ enquiries |
| MM2H applications assisted | — | 5+ / month |

---

## Out of Scope (Phase 2 — Do Not Build Yet)

- Owner/tenant login portals
- Live listing MLS sync
- Online payment / booking checkout
- Mobile app
- WeChat mini-program
- AI chatbot
- Admin dashboard (use Supabase UI until Phase 3)

---

## Next Steps When Approved to Implement

1. **Stakeholder sign-off** on category priority (P1 → P3)
2. **Content brief** per category (copywriter + bilingual)
3. **CRM migration script** — `002_phase2_schema.sql`
4. **IA / wireframes** — navigation restructure (6 category hubs)
5. **Sprint 1 kickoff** — Property Sales hub + listing schema + extended lead form

---

*Document owner: Malaysia Property Network*  
*Last updated: 2026-06-19*  
*Status: Planning — awaiting approval to implement*
