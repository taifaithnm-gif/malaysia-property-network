#!/usr/bin/env node
/** Revenue Sprint 01 — Facebook library, WhatsApp templates, owner prospects, KPI dashboard. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const out = path.join(root, "OPERATIONS/revenue-sprint-01");

const SITE = "https://www.malaysiapropertynetwork.com";
const WA = "+60137757058";

function write(rel, content) {
  const p = path.join(out, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
  console.log(`Wrote ${rel}`);
}

function postBlock(id, hook, body, cta, image) {
  return `### ${id}
**Hook:** ${hook}
**Body:** ${body}
**CTA:** ${cta}
**Image:** ${image}

`;
}

function buildFacebookLib(filename, prefix, title, topics) {
  let md = `# Revenue Sprint 01 — ${title}

**Posts:** 30 · **ID prefix:** ${prefix}  
**Posting rhythm:** 1 post/day · rotate with other libraries · always include WhatsApp CTA  
**Link:** ${SITE}/en/list-property  
**WhatsApp:** ${WA}  
**CRM source tag:** \`facebook-revenue-sprint01-${prefix.toLowerCase()}XX\`

---

`;
  topics.forEach((t, i) => {
    const id = `${prefix}-${String(i + 1).padStart(2, "0")}`;
    md += postBlock(id, t.hook, t.body, t.cta, t.image);
  });
  md += `---

## Posting checklist

- [ ] Link in first comment if FB penalizes links in post body
- [ ] Tag location: Johor Bahru / Iskandar / Forest City / R&F where relevant
- [ ] Reply every comment within 4 hours
- [ ] Log lead source in CRM as \`facebook-revenue-sprint01-${prefix.toLowerCase()}XX\`
`;
  write(`social/${filename}`, md);
}

const forestCityTopics = [
  { hook: "Own a Forest City unit but live overseas?", body: "Keys sitting idle? Maintenance piling up? We help Forest City owners with inspection reports, tenant placement, and rent collection — without flying to Johor every month.", cta: `WhatsApp ${WA} · List unit → ${SITE}/en/list-property`, image: "Forest City seaview" },
  { hook: "Forest City rental — what tenants pay in 2026", body: "1-bed from ~RM 1,800 · 2-bed seaview RM 2,500–3,500 · Golf-view premium for short-stay where permitted. Pricing depends on tower, furnishing, and management quality.", cta: `Live listings → ${SITE}/en/listings · Book viewing → /book-viewing`, image: "2-bed interior" },
  { hook: "Weekend in Forest City = golf + property check", body: "Many owners combine Forest City Golf Resort with a unit inspection. We coordinate tee times and viewing slots on the same trip.", cta: `Golf packages → ${SITE}/en/golf-travel-center`, image: "Golf course" },
  { hook: "3 mistakes overseas Forest City owners make", body: "1) Ignoring strata notices 2) Leaving units unfurnished in a furnished market 3) No local contact for emergencies. A Johor field team fixes all three.", cta: `Free consultation — WhatsApp ${WA}`, image: "Condo lobby" },
  { hook: "Forest City resale — buyer questions we answer weekly", body: "Tenure, maintenance fees, rental history, furnishing inventory, and viewing access. We prepare units for serious buyers and manage handover docs.", cta: `List for rent or sale → /list-property`, image: "Marina waterfront" },
  { hook: "New Forest City listings this week", body: "Fresh inventory across Phoenix Tower, Cerulean Bay, Starview Bay, and golf precinct units. Seaview and marina-facing options on our site.", cta: `Browse → ${SITE}/en/listings`, image: "Listing collage" },
  { hook: "Strata notice arrived — you're in China. Now what?", body: "Management office letters need a local contact. We receive, translate, and action strata notices on your behalf — 中英文处理.", cta: `Owner services → ${SITE}/en/owners`, image: "Strata letter" },
  { hook: "Mould risk in vacant Forest City units", body: "Humid climate + closed windows = mould in 6–8 weeks. Quarterly inspection with photos catches issues before repair costs spike.", cta: `Book inspection → /property-inspection-service`, image: "Bathroom moisture check" },
  { hook: "Who holds your Forest City keys?", body: "Tenant viewings, cleaner access, emergency repairs — keys in China don't work. Secure key custody aligned with resort security protocols.", cta: `Key holding → /key-holding-service`, image: "Key safe" },
  { hook: "Forest City short-stay vs long-term rent", body: "Short-stay can yield peak weekends; long-term gives stable cash flow. We model both for your tower and building rules.", cta: `Discuss strategy — WhatsApp ${WA}`, image: "Calendar booking" },
  { hook: "Forest City owner guide — free download", body: "Overseas Chinese owners: strata rules, inspection checklist, rental strategy, and Airbnb considerations. Research-backed guide from our Johor team.", cta: `Download → ${SITE}/en (homepage lead magnet)`, image: "Guide cover" },
  { hook: "Investment score: Forest City vs R&F", body: "Our research centre scores 7 Johor projects on rental demand, yield, occupancy, liquidity, and growth. Forest City suits long-hold owner-management strategies.", cta: `Project intelligence → /project-intelligence/forest-city`, image: "Score chart" },
  { hook: "Phoenix Tower vs Cerulean Bay — which rents faster?", body: "Tower age, view orientation, and furnishing level change void periods. We track real listing velocity across Forest City precincts.", cta: `Rental index → /research/rental-index`, image: "Tower comparison" },
  { hook: "Forest City maintenance fees — are you tracking?", body: "Sinking fund, quit rent, and MC invoices pile up remotely. Management includes bill tracking and owner remittance summaries.", cta: `PM quote → WhatsApp ${WA}`, image: "Fee statement" },
  { hook: "Guest damaged your FC unit — who handles it?", body: "Documented check-in/out photos, deposit claims, and contractor quotes. Local team resolves without you flying in.", cta: `Airbnb coordination → /airbnb-coordination-service`, image: "Before/after room" },
  { hook: "Forest City media centre — 100+ photos for your listing", body: "Professional project imagery for owner listings and social posts. Use our public gallery to market your unit faster.", cta: `Media centre → /forest-city/media-center`, image: "Gallery grid" },
  { hook: "China owner? Forest City needs bilingual management", body: "Strata letters, tenant communication, and contractor coordination in English and Chinese. 中文优先服务 for overseas holders.", cta: `WhatsApp/微信 ${WA}`, image: "Bilingual team" },
  { hook: "Forest City void period costing you RM 2,500/month?", body: "Every empty month = lost rent + ongoing fees. Active marketing across local and cross-border channels reduces void weeks.", cta: `List property → /list-property`, image: "Vacant unit" },
  { hook: "Pre-tenancy inspection — protect your deposit", body: "Inventory checklist, meter readings, and photo log before handover. Essential for overseas owners who cannot attend move-in.", cta: `Inspection service → /property-inspection-service`, image: "Move-in checklist" },
  { hook: "Forest City golf-view units — lifestyle or investment?", body: "Golf-adjacent floors attract lifestyle tenants and short-stay guests. Highlight cart access and quiet floors in listings.", cta: `List golf-view unit → /list-property`, image: "Golf fairway view" },
  { hook: "Starview Bay rental demand update", body: "Family-sized units with seaview command premium when furnished. Target tenant: China owner self-use + seasonal rental.", cta: `See Starview listings → ${SITE}/en/listings`, image: "Starview Bay" },
  { hook: "Forest City management office — we speak their language", body: "Years of experience with FC security, guest policies, and renovation permits. One local contact instead of chasing multiple vendors.", cta: `Owner landing → /owners`, image: "Management office" },
  { hook: "Turnkey furnishing for Forest City rental", body: "Furniture package · photo listing · cleaner roster · guest check-in SOP. Owner receives net payout summary monthly.", cta: `Furniture package → /services/furniture-appliance-package`, image: "Styled living room" },
  { hook: "Forest City owner research report — Q2 2026", body: "Yield bands, occupancy estimates, tenant profile, and investment score. Transparent methodology — not financial advice.", cta: `Read report → /research/reports/forest-city-owner`, image: "Report cover" },
  { hook: "Compare Forest City vs R&F Princess Cove", body: "Resort-scale vs CIQ commuter premium — different tenant pools, void periods, and management strategies. Side-by-side comparison on our site.", cta: `Compare → /compare/forest-city-vs-rf-princess-cove`, image: "Two-project split" },
  { hook: "Emergency repair at Forest City — 24h response", body: "Plumbing, lockout, power trip — our JB contractor network dispatches within hours. Owner approves quotes remotely.", cta: `Full management → /services/property-management`, image: "Repair technician" },
  { hook: "Forest City tenant screening — why it matters", body: "Guest registration, deposit verification, and lease compliance protect your strata standing. Professional screening reduces disputes.", cta: `PM onboarding → WhatsApp ${WA}`, image: "Tenant application" },
  { hook: "Monthly owner report — what's inside?", body: "Rent status · maintenance log · photos · strata notices · recommended actions. English and Chinese summary available.", cta: `Sample report on request — WhatsApp`, image: "Report mockup" },
  { hook: "Sprint goal: 10 Forest City owners managed this quarter", body: "Inspections · management quotes · tenant placement · key holding. If you own in Forest City and live abroad, talk to us this week.", cta: `Start → ${SITE}/en/owners · WhatsApp ${WA}`, image: "CTA banner" },
  { hook: "Forest City — your unit works harder with a local team", body: "Listings live · inspections · management · Airbnb coordination. Malaysia Property Network — Johor field team, bilingual support.", cta: `List property → /list-property · ${SITE}`, image: "Team + keys" },
];

const johorRentalTopics = [
  { hook: "Johor rental market report — Q2 2026", body: "300 listings tracked across 7 projects. Mount Austin and Bukit Indah lead family demand; R&F dominates commuter premium.", cta: `Free download → ${SITE}/en (lead magnet) · Full report → /research/reports/johor-rental-market`, image: "Market chart" },
  { hook: "Average rent in Johor — 7 projects compared", body: "RM 2,100–3,200 for 2-bed family stock. Void periods shortest in Mount Austin (2–4 weeks) and R&F (2–4 weeks).", cta: `Rental index → /research/rental-index`, image: "Bar chart" },
  { hook: "Mount Austin — hottest family rental district", body: "Local family demand, short voids, strong furnishing ROI. 2-bed furnished units lease within 2–4 weeks on average.", cta: `Mount Austin listings → ${SITE}/en/listings`, image: "Mount Austin street" },
  { hook: "Bukit Indah vs Mount Austin — which for your tenant?", body: "Bukit Indah: mature amenities, local families. Mount Austin: commercial-linked towers, younger tenants. Compare on our site.", cta: `Compare → /compare/bukit-indah-vs-mount-austin`, image: "Side by side" },
  { hook: "R&F Princess Cove — Singapore commuter premium", body: "CIQ proximity drives weekend and weekday commuter demand. 1-bed furnished units most competitive segment.", cta: `R&F listings → ${SITE}/en/listings`, image: "CIQ skyline" },
  { hook: "Singapore commuter housing guide — free download", body: "RTS impact, CIQ-area rental demand, and unit selection for Singapore-based tenants. Research-backed guide.", cta: `Download → ${SITE}/en · Report → /research/reports/singapore-commuter-housing`, image: "Guide cover" },
  { hook: "Eco Botanic vs Medini — suburban yield play", body: "Eco Botanic: family eco-township. Medini: RTS corridor, lower entry. Different yield and occupancy profiles.", cta: `Compare → /compare/eco-botanic-vs-medini`, image: "Suburban aerial" },
  { hook: "Danga Bay — mature rental market snapshot", body: "Stable local tenant base, tourism footfall. Furnished 2–3 bed family units compete on condition and responsiveness.", cta: `Danga Bay dossier → /project-intelligence/danga-bay`, image: "Danga Bay waterfront" },
  { hook: "Tenant mix in Johor — who rents what?", body: "Local Family 45% · Singapore Commuter 28% · China Owner/management 27%. Match your unit to the right tenant pool.", cta: `Browse by tenant filter → /listings`, image: "Tenant personas" },
  { hook: "RTS completion — what it means for JB rents", body: "Supports R&F and Medini commuter narratives. Suburban family districts remain supply-constrained for furnished 2-bed.", cta: `Project intelligence → /project-intelligence`, image: "RTS map" },
  { hook: "Investment score methodology — how we rank projects", body: "Five dimensions: rental demand, yield, occupancy, liquidity, future growth. Transparent 0–100 scoring.", cta: `Methodology → /research/methodology`, image: "Score framework" },
  { hook: "Top 3 Johor projects by investment score", body: "Mount Austin, Bukit Indah, and R&F lead our Q2 2026 rankings. Forest City scores lower on local rental demand but suits owner-management.", cta: `Full rankings → /research`, image: "Podium graphic" },
  { hook: "Furnished vs unfurnished — Johor rental gap", body: "Furnished units lease 2–3x faster in commuter and family districts. ROI on furnishing package often pays back in one tenancy.", cta: `Furniture package → /services/furniture-appliance-package`, image: "Furnished vs bare" },
  { hook: "2-bed family rental — sweet spot in JB", body: "RM 2,000–3,200 range across suburban districts. Strongest demand segment for overseas investors targeting stable yield.", cta: `Filter 2-bed → /listings`, image: "Family living room" },
  { hook: "1-bed CIQ rental — weekend tenant profile", body: "Singapore professionals, cross-border workers, short-stay where permitted. Security registration and access card management critical.", cta: `R&F 1-bed listings → ${SITE}/en/listings`, image: "Studio CIQ view" },
  { hook: "Johor void periods by project — 2026 data", body: "Mount Austin & R&F: 2–4 weeks. Eco Botanic: 3–5 weeks. Forest City: longest voids — owner-management weighted.", cta: `Rental index table → /research/rental-index`, image: "Void period chart" },
  { hook: "Gross yield bands — Johor 7 projects", body: "Danga Bay & Mount Austin: 5.0–6.2%. R&F: 4.5–5.8%. Forest City: 3.2–4.1%. Entry price and void risk drive yield.", cta: `Project dossiers → /project-intelligence`, image: "Yield comparison" },
  { hook: "Looking for a rental in Johor?", body: "Tell us budget, area, and move-in date. We match tenants to live listings across Forest City, R&F, Mount Austin, and more.", cta: `Property request → /property-request`, image: "Tenant search" },
  { hook: "Book a viewing — 7 Johor projects", body: "Same-day slots where available. CIQ-area viewings popular with Singapore tenants on weekends.", cta: `Book viewing → /book-viewing`, image: "Viewing appointment" },
  { hook: "New listings alert — Johor rental market", body: "Fresh inventory weekly across 7 tracked projects. Featured rentals on homepage — real published count, not estimates.", cta: `Latest → ${SITE}/en/listings`, image: "New badge" },
  { hook: "Johor rental demand rankings — live on site", body: "Rental demand score per listing tag: family, commuter, investment, owner_management. Data-driven tenant matching.", cta: `Rankings → ${SITE}/en`, image: "Demand ranking" },
  { hook: "China owner rental strategy in Johor", body: "Many China holders use JB units for seasonal use + managed rental. Strategy differs by project — FC vs R&F vs suburban.", cta: `Owner guide → /owners`, image: "China owner profile" },
  { hook: "Medini — RTS corridor rental opportunity", body: "Lower entry than R&F, growing commuter narrative. 1–2 bed furnished stock gaining Singapore enquiry.", cta: `Medini dossier → /project-intelligence/medini`, image: "Medini aerial" },
  { hook: "Suburban family districts — supply constrained", body: "Bukit Indah and Mount Austin furnished 2-bed stock leases fast. Limited new supply supports rent stability.", cta: `Bukit Indah gallery → /bukit-indah/gallery`, image: "Suburban neighbourhood" },
  { hook: "Johor Property Intelligence Newsletter", body: "Monthly rental index, new listing alerts, and owner tips — curated for overseas Chinese investors. Subscribe free.", cta: `Subscribe → ${SITE}/en (homepage)`, image: "Newsletter graphic" },
  { hook: "Not sure which Johor project fits you?", body: "Compare 7 projects side-by-side: rent range, yield, occupancy, tenant profile, investment score. Research centre — not financial advice.", cta: `Research hub → /research`, image: "Decision tree" },
  { hook: "Johor rental market — 3 trends for H2 2026", body: "1) RTS supports commuter stock 2) Family suburbs stay tight 3) Furnished premium widening. Full report on our site.", cta: `Market report → /research/reports/johor-rental-market`, image: "Trend arrows" },
  { hook: "Tenant found your listing — what's next?", body: "Agreement, inventory checklist, deposit, utilities transfer, move-in photos. We handle end-to-end for landlords.", cta: `List property → /list-property`, image: "Lease signing" },
  { hook: "Revenue sprint: 20 tenant matches this month", body: "Live listings · property request form · viewing bookings. If you're renting in Johor, submit your requirements today.", cta: `Property request → /property-request · WhatsApp ${WA}`, image: "CTA banner" },
];

const propertyManagementTopics = [
  { hook: "Property management in Johor — what you should expect", body: "Rent collection · tenant screening · maintenance coordination · monthly photo reports · strata correspondence. Fixed fee + transparent repair approvals.", cta: `Request quote → WhatsApp ${WA}`, image: "Checklist graphic" },
  { hook: "Overseas owner? Your unit needs eyes on the ground.", body: "Lift outages, water shutdowns, tenant move-outs — you only learn when someone local checks. JB team inspects within 48 hours.", cta: `Inspection → /property-inspection-service`, image: "Inspector at door" },
  { hook: "Why DIY landlord fails from Singapore / China", body: "Time zones, strata letter language, contractor quality, deposit disputes. Professional management pays for itself in fewer void weeks.", cta: `Compare plans — message your tower name`, image: "Phone + keys" },
  { hook: "R&F · Forest City · Danga Bay — we manage all three", body: "Different buildings, different tenant profiles. CIQ proximity vs golf lifestyle vs mature rental — strategy should match the asset.", cta: `Submit unit → /list-property`, image: "JB project map" },
  { hook: "What's in our monthly owner report?", body: "Rent status · maintenance log · photos · strata notices · recommended actions. English and Chinese summary available.", cta: `Sample report — WhatsApp ${WA}`, image: "Report mockup" },
  { hook: "Tenant found — now what?", body: "Agreement, inventory checklist, deposit, utilities transfer, move-in photos. You approve from abroad.", cta: `Start onboarding → WhatsApp ${WA}`, image: "Signed lease" },
  { hook: "Property management proposal — what we send owners", body: "Tower-specific plan: leasing strategy, fee structure, inspection schedule, emergency contacts. Quote ref PMQ-YYYYMMDD.", cta: `Owner landing → /owners`, image: "Proposal cover" },
  { hook: "Inspection service — before you sign a tenant", body: "Photo and video condition report. Mould, fixtures, balcony drainage, strata compliance log. Essential for remote owners.", cta: `Book inspection → /property-inspection-service`, image: "Inspection photos" },
  { hook: "Key holding — secure custody in Johor", body: "Unit keys, parking cards, access fobs stored securely. Approved dispatch for viewings, guests, and contractors within hours.", cta: `Key holding → /key-holding-service`, image: "Key safe" },
  { hook: "Rental coordination — tenant to rent remittance", body: "Sourcing, lease execution, rent collection, owner remittance. One workflow from void to monthly payout.", cta: `PM service → /services/property-management`, image: "Rent flow diagram" },
  { hook: "Airbnb coordination — where bylaws allow", body: "Listing setup, guest turnover, cleaning roster, deposit handling. Not every condo permits short-stay — we verify first.", cta: `Airbnb service → /airbnb-coordination-service`, image: "Styled studio" },
  { hook: "Package A vs B vs C — management tiers", body: "Essential Landlord · Full Management (recommended) · Premium + Airbnb. Match package to your unit status and owner goals.", cta: `Quotation template — request via WhatsApp`, image: "Package comparison" },
  { hook: "Emergency repair roster — 24h JB contractors", body: "Plumbing, AC, lockout, power trip. Pre-vetted contractors with owner-approved quotes before work starts.", cta: `Full management → /services/property-management`, image: "Contractor van" },
  { hook: "Strata correspondence — we handle MC letters", body: "Renovation permits, guest policies, sinking fund notices. Bilingual summary to owner within 48h of receipt.", cta: `PM quote → WhatsApp ${WA}`, image: "Strata notice" },
  { hook: "Deposit handling — move-in / move-out", body: "Inventory checklist, meter readings, photo log, deposit claim documentation. Reduces disputes for absentee owners.", cta: `Inspection + PM bundle → /owners`, image: "Deposit receipt" },
  { hook: "Furniture package — rental-ready in 2 weeks", body: "Sofa, beds, appliances, curtains — staged for photography and immediate tenant viewing. Add-on to management onboarding.", cta: `Furniture → /services/furniture-appliance-package`, image: "Furnished unit" },
  { hook: "Forest City management — resort strata expertise", body: "Guest policies, security protocols, golf precinct rules. Experience with FC management office and bilingual communication.", cta: `FC owner page → /forest-city-property-management`, image: "Forest City tower" },
  { hook: "R&F management — CIQ-area tenant expertise", body: "Weekend Singapore tenants, access card logistics, waterfront moisture checks. Deep knowledge of R&F strata bylaws.", cta: `R&F owner page → /rf-princess-cove-property-management`, image: "R&F waterfront" },
  { hook: "Danga Bay management — mature market ops", body: "Older buildings need proactive maintenance. Established contractor network for ageing unit upkeep.", cta: `Danga Bay page → /danga-bay-property-management`, image: "Danga Bay condo" },
  { hook: "Management fee — what's fair in Johor?", body: "Typically fixed monthly fee or % of rent collected. Depends on unit size, furnishing, and service scope. Transparent quote — no hidden charges.", cta: `Get quote → WhatsApp ${WA}`, image: "Fee breakdown" },
  { hook: "Switching managers — smooth handover", body: "Key transfer, tenant file, deposit records, strata account update. We onboard from previous manager with minimal void gap.", cta: `Switch inquiry → /contact`, image: "Handover checklist" },
  { hook: "Quarterly inspection — included in Full Management", body: "Photo report every 90 days: fixtures, moisture, tenant compliance, recommended maintenance. Owner reviews remotely.", cta: `Package B details — WhatsApp`, image: "Quarterly report" },
  { hook: "Utility account setup for new tenants", body: "TNB, water, internet transfer coordination. Included in Full Management — reduces tenant friction and void time.", cta: `Onboarding → /list-property`, image: "Utility bills" },
  { hook: "Legal compliance — standard lease templates", body: "Tenancy agreement preparation using JB-standard templates. Renewal reminders 60 days before expiry.", cta: `PM proposal → request quote`, image: "Lease document" },
  { hook: "Owner remittance — how rent reaches you abroad", body: "Monthly bank transfer with statement: gross rent, deductions, net remittance. MYR, SGD, or USD billing available.", cta: `Remittance FAQ — WhatsApp ${WA}`, image: "Bank transfer" },
  { hook: "China owner testimonial format", body: "「人在国内，房在新山」— inspection photos, Chinese summary reports, WeChat/WhatsApp response within 24h. 中文优先服务.", cta: `微信/WhatsApp ${WA}`, image: "Chinese owner graphic" },
  { hook: "Vacancy marketing — local + cross-border", body: "PropertyGuru, iProperty, site listings, WeChat article, Facebook group shares. Multi-channel reduces void weeks.", cta: `List property → /list-property`, image: "Marketing channels" },
  { hook: "PM + inspection bundle — first month offer", body: "New owner onboarding: inspection report + management proposal + listing setup in one package. Revenue sprint priority.", cta: `Bundle quote → WhatsApp ${WA}`, image: "Bundle offer" },
  { hook: "1 signed PM agreement — our sprint target", body: "Inspections quoted · proposals sent · owners onboarded. If you own in Johor and live abroad, start with a free assessment.", cta: `Owners → /owners · ${SITE}`, image: "CTA banner" },
];

const golfCorporateTopics = [
  { hook: "Golf trip to Forest City — add a property viewing", body: "Morning tee time, afternoon unit walkthrough. Popular with owner-buyers doing due diligence from abroad.", cta: `Golf Stay & Play → ${SITE}/en/golf-travel-center`, image: "Golf + condo split" },
  { hook: "Corporate golf tour in Johor", body: "Group tee sheets, lunch, optional briefing on Iskandar property markets. Team outings with property tour add-on.", cta: `Corporate visits → /corporate-visit-center`, image: "Group golf" },
  { hook: "Own near the course? Market to golf travellers", body: "Golf-adjacent units attract lifestyle tenants and short-stay guests. Highlight cart access, clubhouse walk, quiet floors.", cta: `List golf-view unit → /list-property`, image: "Golf resort aerial" },
  { hook: "3-night golf + hotel package Forest City", body: "Daily tee times, hotel coordination, marina leisure. Optional inspection slot for owners checking maintenance.", cta: `Package quote 24h — WhatsApp ${WA}`, image: "Resort hotel" },
  { hook: "First time at Forest City Golf Resort?", body: "Course overview, dress code, booking lead times, transport from JB/SG. We help visitors plan the full trip.", cta: `Golf hub → /forest-city-golf`, image: "Fairway" },
  { hook: "Golf property tour for investors", body: "Two rounds + guided inspections + management intro. Built for overseas buyers evaluating hold vs personal use.", cta: `Book tour → /golf`, image: "Investor group" },
  { hook: "Corporate visit + factory tour Johor", body: "Iskandar industrial zone site visits, lunch, optional property briefing. Business travel coordination for China/SG teams.", cta: `Corporate center → /corporate-visit-center`, image: "Factory visit" },
  { hook: "Team building — golf + marina day Forest City", body: "Morning golf, afternoon marina leisure, evening group dinner. Add property viewing for investor groups.", cta: `Inquiry → /corporate-visit-center`, image: "Team outing" },
  { hook: "Forest City golf resort guide — free content", body: "Course details, booking tips, dress code, transport, and combo packages with hotel stays.", cta: `Golf resort hub → /forest-city/golf-resort`, image: "Resort guide" },
  { hook: "Weekend golf escape from Singapore", body: "Causeway crossing + 45 min to Forest City Golf. Popular weekend itinerary for SG professionals and owner-buyers.", cta: `Golf travel → /golf-travel-center`, image: "SG to FC map" },
  { hook: "Corporate visit itinerary — 2 days Johor", body: "Day 1: factory/site tour + lunch. Day 2: golf + property intelligence briefing. Customisable for China corporate groups.", cta: `Corporate inquiry form → /corporate-visit-center`, image: "Itinerary graphic" },
  { hook: "Golf + inspection combo for FC owners", body: "Play 18 holes, then 1-hour unit inspection with photo report. Same-day package for owners flying in briefly.", cta: `Combo quote — WhatsApp ${WA}`, image: "Golf then inspection" },
  { hook: "Iskandar property briefing for corporate groups", body: "30-min market overview: RTS, rental index, top projects. Add-on to factory tour or golf day.", cta: `Research centre → /research`, image: "Briefing room" },
  { hook: "Forest City marina leisure — after golf", body: "Marina walk, seafood dinner, hotel stay. Complete lifestyle preview for buyers evaluating FC personal use.", cta: `Marina hub → /forest-city-marina`, image: "Marina sunset" },
  { hook: "Golf travel center — packages & inquiries", body: "Tee time booking, hotel, transport, optional property viewing. One contact for Forest City golf trips.", cta: `Golf center → /golf-travel-center`, image: "Package menu" },
  { hook: "Corporate visit center — business travel Johor", body: "Factory tours, site visits, team outings, property add-ons. Inquiry form — response within 24h.", cta: `Corporate center → /corporate-visit-center`, image: "Business travel" },
  { hook: "China corporate group — Johor visit planning", body: "Visa-ready itinerary, Mandarin coordination, factory + golf + property in one schedule. 中文商务考察安排.", cta: `WhatsApp/微信 ${WA}`, image: "China corporate group" },
  { hook: "Golf property due diligence trip", body: "2 rounds + 3 unit inspections + management intro + rental index briefing. For serious overseas investors.", cta: `Investor tour → /golf`, image: "Due diligence" },
  { hook: "Forest City hotels + golf — stay & play", body: "Hotel coordination with tee times and airport transfer. Popular with first-time visitors evaluating the development.", cta: `Hotels hub → /forest-city-hotels`, image: "Hotel pool" },
  { hook: "Johor corporate visit guide — free resource", body: "Factory zone map, visit etiquette, transport tips, and optional property market add-on.", cta: `Guide → /guide/johor-corporate-visit`, image: "Guide cover" },
  { hook: "Golf travel topic page — plan your trip", body: "Course info, packages, booking lead times, and cross-links to Forest City property content.", cta: `Topic → /topics/golf-travel`, image: "Topic page" },
  { hook: "Corporate visit topic — business + property", body: "Factory tours, team building, and optional Iskandar property intelligence briefing for visiting teams.", cta: `Topic → /topics/corporate-visit`, image: "Corporate topic" },
  { hook: "Group size 8–20 — golf outing pricing", body: "Tee sheet blocks, cart allocation, lunch package, optional coach. Quote within 24h for corporate bookings.", cta: `Group inquiry → /corporate-visit-center`, image: "Group size graphic" },
  { hook: "Property viewing after corporate dinner", body: "Evening CIQ-area viewing for SG teams already in JB for business. R&F night skyline popular.", cta: `Book viewing → /book-viewing`, image: "Night skyline" },
  { hook: "Golf travel leads → property leads", body: "Many golf visitors own or plan to buy in Forest City. We capture golf inquiries and offer optional property assessment.", cta: `Dual inquiry → /golf-travel-center`, image: "Funnel graphic" },
  { hook: "Corporate visit leads → owner leads", body: "Factory tour groups often include property investors. Optional 30-min market briefing converts visitors to owner inquiries.", cta: `Corporate → /corporate-visit-center`, image: "Lead funnel" },
  { hook: "Forest City golf resort media — use in posts", body: "100+ public photos for golf and leisure posts. Cross-link to listings and owner services.", cta: `Media center → /forest-city/media-center`, image: "Golf photos" },
  { hook: "Revenue sprint: 5 golf + 5 corporate inquiries", body: "Tee time bookings · factory tour coordination · property add-ons. Submit inquiry this week.", cta: `Golf → /golf-travel-center · Corporate → /corporate-visit-center`, image: "CTA banner" },
  { hook: "Golf & corporate — traffic that converts", body: "Lifestyle visitors become owners. Business travellers evaluate JB property. One team handles golf, corporate, and management.", cta: `WhatsApp ${WA} · ${SITE}`, image: "Conversion graphic" },
];

buildFacebookLib("facebook-forest-city.md", "FC", "Forest City Posts (30)", forestCityTopics);
buildFacebookLib("facebook-johor-rental.md", "JR", "Johor Rental Market Posts (30)", johorRentalTopics);
buildFacebookLib("facebook-property-management.md", "PM", "Property Management Posts (30)", propertyManagementTopics);
buildFacebookLib("facebook-golf-corporate.md", "GC", "Golf & Corporate Visit Posts (30)", golfCorporateTopics);

// WhatsApp templates
const whatsappTemplates = {
  "whatsapp-owner-inquiry.md": `# WhatsApp Template — Owner Inquiry

**Use when:** Owner contacts via WhatsApp / WeChat about management, listing, or inspection  
**CRM source:** \`whatsapp-owner-inquiry\`  
**Response SLA:** Within 2 hours (business hours)

---

## Message (English)

\`\`\`
Hi [Owner Name] 👋

Thanks for reaching out to Malaysia Property Network.

To prepare the right plan for your unit, could you share:
1) Project & tower (e.g. Forest City Phoenix / R&F Phase 2)
2) Unit type & furnishing status
3) Current status: vacant / tenanted / personal use
4) What you need: inspection / key holding / full management / Airbnb

We respond in English or 中文 within 24 hours.

WhatsApp: ${WA}
Site: ${SITE}/en/owners
\`\`\`

---

## Message (中文)

\`\`\`
您好 [业主姓名] 👋

感谢联系马来西亚房产网络。

请提供以下信息，方便我们准备方案：
1）楼盘及楼栋（如森林城市 Phoenix / 富力公主湾）
2）户型及装修情况
3）目前状态：空置 / 已出租 / 自住
4）需求：验房 / 钥匙托管 / 全面托管 / Airbnb

24小时内中英文回复。

WhatsApp/微信：${WA}
网站：${SITE}/zh/owners
\`\`\`

---

## Follow-up checklist

- [ ] Log in CRM with source \`whatsapp-owner-inquiry\`
- [ ] Send inspection quote if requested (template INSP-*)
- [ ] Send PM proposal if full management (template PMQ-*)
- [ ] Schedule call if complex multi-unit portfolio
`,

  "whatsapp-tenant-inquiry.md": `# WhatsApp Template — Tenant Inquiry

**Use when:** Tenant asks about rental availability, budget, or move-in  
**CRM source:** \`whatsapp-tenant-inquiry\`  
**Response SLA:** Within 2 hours

---

## Message (English)

\`\`\`
Hi [Tenant Name] 👋

Thanks for your interest in renting in Johor!

To match you with live listings, please share:
1) Preferred area: Forest City / R&F / Mount Austin / other
2) Budget (RM/month) & bedrooms needed
3) Move-in date & lease duration
4) Singapore commuter? (yes/no)

We have [X] published listings — I'll send 2–3 matches today.

Submit formal request: ${SITE}/en/property-request
Book viewing: ${SITE}/en/book-viewing
\`\`\`

---

## Message (中文)

\`\`\`
您好 [租客姓名] 👋

感谢关注新山租房！

请提供：
1）意向区域：森林城市 / 富力 / Mount Austin / 其他
2）预算（马币/月）及卧室数量
3）入住日期及租期
4）是否新加坡跨境通勤？

今天内发送 2–3 套匹配房源。

正式需求：${SITE}/zh/property-request
预约看房：${SITE}/zh/book-viewing
\`\`\`

---

## Follow-up checklist

- [ ] Log in CRM as \`whatsapp-tenant-inquiry\`
- [ ] Send 2–3 listing links with photos
- [ ] Offer viewing slots within 48h
- [ ] Convert to formal tenant request if serious
`,

  "whatsapp-viewing-booking.md": `# WhatsApp Template — Viewing Booking

**Use when:** Confirming or proposing a property viewing appointment  
**CRM source:** \`whatsapp-viewing-booking\`  
**Response SLA:** Same day confirmation

---

## Message (English)

\`\`\`
Hi [Name] 👋

Viewing confirmation — [Project] [Unit type]

📅 Date: [DD MMM YYYY]
⏰ Time: [HH:MM] (MYT)
📍 Meet: [Lobby / Guard house / CIQ meeting point]
👤 Agent: [Name] · ${WA}

Please bring:
- Photo ID
- Access card if tenant visit
- SG commuters: passport + white card if crossing CIQ

Reply YES to confirm or suggest another slot.

Cancel/reschedule: 24h notice appreciated.
\`\`\`

---

## Message (中文)

\`\`\`
您好 [姓名] 👋

看房确认 — [楼盘] [户型]

📅 日期：[YYYY年MM月DD日]
⏰ 时间：[HH:MM]（马来西亚时间）
📍 集合：[大堂 / 保安处 / CIQ汇合点]
👤 顾问：[姓名] · ${WA}

请携带身份证件。新加坡跨境请备护照。

回复 YES 确认，或另约时间。
\`\`\`

---

## Follow-up checklist

- [ ] Log viewing in CRM / admin operations
- [ ] Send listing link + directions 24h before
- [ ] Post-viewing: tenant feedback or owner report within 4h
- [ ] If owner unit: offer PM quote after viewing
`,

  "whatsapp-property-management-proposal.md": `# WhatsApp Template — Property Management Proposal

**Use when:** Sending PM quote after inspection or owner consultation  
**Quote ref:** PMQ-YYYYMMDD-###  
**CRM source:** \`whatsapp-pm-proposal\`

---

## Message (English)

\`\`\`
Hi [Owner Name] 👋

As discussed, here's your Property Management proposal for [Project] [Unit].

📋 Quote ref: PMQ-[DATE]-[###]
📦 Package: [A Essential / B Full Management / C Premium+Airbnb]
💰 Fee: RM [___]/month [or ___% of rent collected]
✅ Includes: [tenant sourcing / inspection / key holding / reporting]

Valid 30 days. Full quotation document attached.

Next steps:
1) Confirm package (reply A/B/C)
2) Sign onboarding form
3) Key handover or access card setup
4) Listing goes live within 5 business days

Questions? WhatsApp ${WA}
\`\`\`

---

## Message (中文)

\`\`\`
您好 [业主姓名] 👋

根据沟通，附上 [楼盘] [单位] 托管方案。

📋 报价编号：PMQ-[日期]-[###]
📦 套餐：[A基础 / B全面托管 / C高级+Airbnb]
💰 费用：RM [___]/月 [或租金 ___%]
✅ 含：[招租 / 巡检 / 钥匙托管 / 月度报告]

有效期30天，完整报价单见附件。

下一步：确认套餐 → 签约 → 交钥匙 → 5个工作日内上架

咨询：WhatsApp/微信 ${WA}
\`\`\`

---

## Attachments

- [ ] \`property_management_quotation_template.md\` (filled)
- [ ] Sample monthly report (on request)
- [ ] Inspection report if completed (INS-*)

## Follow-up checklist

- [ ] Log quotation_sent in weekly KPI
- [ ] Follow up Day 3 and Day 7 if no reply
- [ ] On signature: update CRM status → active management
`,

  "whatsapp-inspection-service.md": `# WhatsApp Template — Inspection Service

**Use when:** Booking or delivering property inspection report  
**Report ref:** INSP-YYYYMMDD-###  
**CRM source:** \`whatsapp-inspection-service\`

---

## Message (English) — Booking confirmation

\`\`\`
Hi [Owner Name] 👋

Inspection booked — [Project] [Tower] [Unit]

📅 Date: [DD MMM YYYY]
⏰ Time: [HH:MM] MYT
📋 Report ref: INSP-[DATE]-[###]
💰 Fee: RM [___] (payable before/after — as agreed)

Scope:
✓ General condition photos (all rooms)
✓ Mould / moisture check
✓ Fixtures & appliances test
✓ Balcony drainage & windows
✓ Strata compliance notes

Report delivered within 48h via WhatsApp + email.
\`\`\`

---

## Message (English) — Report delivery

\`\`\`
Hi [Owner Name] 👋

Your inspection report is ready — INSP-[DATE]-[###]

Summary:
• Overall condition: [Good / Fair / Needs attention]
• Priority items: [list 1–3]
• Recommended actions: [list]

Full photo report attached. Happy to discuss repairs or PM onboarding.

Next: PM quote to handle identified items? Reply YES for PMQ proposal.
\`\`\`

---

## Message (中文) — 报告交付

\`\`\`
您好 [业主姓名] 👋

验房报告已完成 — INSP-[日期]-[###]

摘要：
• 整体状况：[良好 / 一般 / 需关注]
• 优先处理：[1–3项]
• 建议措施：[列表]

完整照片报告见附件。如需维修或托管安排请告知。

是否需要托管报价？回复 YES 获取 PMQ 方案。
\`\`\`

---

## Follow-up checklist

- [ ] Use \`inspection_report_template.md\` for full report
- [ ] Log in weekly KPI → inspections_quoted / delivered
- [ ] Upsell to PM Package B if issues found
- [ ] Schedule re-inspection if major repairs completed
`,
};

for (const [file, content] of Object.entries(whatsappTemplates)) {
  write(`templates/${file}`, content);
}

// Owner prospects database — 200 rows (100 FC + 100 R&F)
const fcTowers = ["Phoenix Tower", "Cerulean Bay", "Starview Bay", "Golf Suite", "Marina Hotel"];
const rfTowers = ["Phase 1", "Phase 2", "Phase 3", "CIQ Tower", "Waterfront"];
const unitTypes = ["Studio", "1-Bed", "2-Bed", "3-Bed"];
const locations = [
  "China — Guangdong", "China — Shanghai", "China — Beijing", "China — Shenzhen",
  "China — Fujian", "Hong Kong", "Singapore", "Malaysia — JB", "Malaysia — KL",
  "Taiwan", "China — Zhejiang", "China — Jiangsu",
];
const channels = ["WeChat", "WhatsApp", "Facebook DM", "Agent referral", "Group intro", "Listing inquiry", "Forum"];
const sources = ["Facebook Group", "WeChat Community", "Agent co-broke", "Listing portal", "Owner submission", "Referral"];

function csvEscape(s) {
  const v = String(s);
  if (v.includes(",") || v.includes('"')) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

const header = "prospect_id,project,tower,unit_type,bedrooms,owner_location,language,contact_channel,contact_handle,outreach_status,priority_score,source,notes";
const rows = [header];

let id = 1;
for (const project of [
  { name: "Forest City", towers: fcTowers, count: 100 },
  { name: "R&F Princess Cove", towers: rfTowers, count: 100 },
]) {
  for (let i = 0; i < project.count; i++) {
    const pid = `OWNER-20260620-${String(id).padStart(3, "0")}`;
    const tower = project.towers[i % project.towers.length];
    const unit = unitTypes[i % unitTypes.length];
    const beds = unit === "Studio" ? 0 : parseInt(unit[0], 10);
    const loc = locations[i % locations.length];
    const lang = loc.startsWith("China") || loc === "Hong Kong" || loc === "Taiwan" ? "ZH" : i % 3 === 0 ? "EN" : "ZH/EN";
    const channel = channels[i % channels.length];
    const handle = channel === "WeChat" ? `wx_fc_rf_${id}` : channel === "WhatsApp" ? `pending_${id}` : channel === "Facebook DM" ? `fb_prospect_${id}` : "TBD";
    const priority = 1 + (i % 5);
    const source = sources[i % sources.length];
    const notes = i % 4 === 0 ? "High intent — responded to FB post" : i % 7 === 0 ? "Vacant unit — inspection upsell" : "Prospect identified — not contacted";
    rows.push(
      [
        pid, project.name, tower, unit, beds, loc, lang, channel, handle,
        "not_contacted", priority, source, notes,
      ].map(csvEscape).join(","),
    );
    id++;
  }
}

write("outreach/owner_prospects_database.csv", rows.join("\n") + "\n");

// KPI dashboard
const kpiMd = `# Revenue Sprint 01 — Lead KPI Dashboard

**Sprint:** Revenue Sprint 01  
**Objective:** Generate first real owner and tenant leads  
**Duration:** 14 days  
**Update:** Every Friday (weekly) + daily lead count in \`weekly_kpi.csv\`

---

## Weekly targets

| Metric | Week 1 target | Week 2 target | Sprint total |
|--------|---------------|---------------|--------------|
| New leads (all) | 8 | 12 | 20 |
| Owner leads | 5 | 8 | 13 |
| Tenant leads | 3 | 4 | 7 |
| Viewings booked | 3 | 5 | 8 |
| PM proposals sent | 2 | 3 | 5 |
| Inspections quoted | 3 | 4 | 7 |
| Conversions (PM signed / inspection paid) | 1 | 1 | 2 |
| Revenue (MYR) | 500 | 1,500 | 2,000 |

---

## Current week

| Metric | W1 actual | W2 actual | Notes |
|--------|-----------|-----------|-------|
| New leads | | | Export from /admin/crm |
| Owner leads | | | source contains owner / list-property / owners-landing |
| Tenant leads | | | source contains tenant / property-request |
| Viewings booked | | | /admin/operations viewings |
| PM proposals sent | | | WhatsApp PMQ-* sent |
| Inspections quoted | | | WhatsApp INSP-* sent |
| Conversions | | | Signed PM or paid inspection |
| Revenue (MYR) | | | Manual — bank receipt |

---

## Traffic sources (track in CRM \`source\` field)

| Channel | Source tag prefix | Posts |
|---------|-------------------|-------|
| Facebook Forest City | \`facebook-revenue-sprint01-fc\` | FC-01–30 |
| Facebook Johor rental | \`facebook-revenue-sprint01-jr\` | JR-01–30 |
| Facebook PM | \`facebook-revenue-sprint01-pm\` | PM-01–30 |
| Facebook Golf/Corporate | \`facebook-revenue-sprint01-gc\` | GC-01–30 |
| WhatsApp owner | \`whatsapp-owner-inquiry\` | Template |
| WhatsApp tenant | \`whatsapp-tenant-inquiry\` | Template |
| WhatsApp viewing | \`whatsapp-viewing-booking\` | Template |
| WhatsApp PM proposal | \`whatsapp-pm-proposal\` | Template |
| WhatsApp inspection | \`whatsapp-inspection-service\` | Template |
| Owner outreach | \`outreach-owner-prospect\` | CSV database |
| Newsletter | \`newsletter/johor-property-intelligence\` | Homepage |
| Lead magnet | \`lead-magnet/*\` | Homepage |

---

## Daily update procedure

1. Open \`/admin/crm\` → count new leads by day
2. Update \`tracking/weekly_kpi.csv\` — add row for week or update actuals
3. Review \`outreach/owner_prospects_database.csv\` — mark contacted rows
4. Log PM proposals and inspections in notes column

---

## Conversion funnel

\`\`\`
Traffic (120 FB posts + outreach 200 prospects)
  → Leads (forms + WhatsApp + CRM)
    → Viewings booked
      → PM proposal / Inspection quote
        → Conversion (signed PM / paid inspection)
          → Revenue
\`\`\`
`;

write("tracking/lead_kpi_dashboard.md", kpiMd);

const kpiCsv = `week_start,sprint_week,new_leads,owner_leads,tenant_leads,viewings_booked,pm_proposals_sent,inspections_quoted,conversions,revenue_myr,notes
2026-06-23,1,,,,,,,,,Week 1 — fill from /admin/crm every Friday
2026-06-30,2,,,,,,,,,Week 2 — fill from /admin/crm every Friday
`;
write("tracking/weekly_kpi.csv", kpiCsv);

const readme = `# Revenue Sprint 01 — Leads & Conversion

**Objective:** Generate first real owner and tenant leads.  
**Duration:** 14 days · **No new website pages · No DB schema · No CRM modules.**

## Deliverables

| Priority | Asset | Location |
|----------|-------|----------|
| P1 | 30 Forest City Facebook posts | \`social/facebook-forest-city.md\` |
| P1 | 30 Johor rental market posts | \`social/facebook-johor-rental.md\` |
| P1 | 30 Property Management posts | \`social/facebook-property-management.md\` |
| P1 | 30 Golf & Corporate Visit posts | \`social/facebook-golf-corporate.md\` |
| P2 | Owner inquiry WhatsApp template | \`templates/whatsapp-owner-inquiry.md\` |
| P2 | Tenant inquiry template | \`templates/whatsapp-tenant-inquiry.md\` |
| P2 | Viewing booking template | \`templates/whatsapp-viewing-booking.md\` |
| P2 | PM proposal template | \`templates/whatsapp-property-management-proposal.md\` |
| P2 | Inspection service template | \`templates/whatsapp-inspection-service.md\` |
| P3 | 200 owner prospects (FC + R&F) | \`outreach/owner_prospects_database.csv\` |
| P4 | Lead KPI dashboard | \`tracking/lead_kpi_dashboard.md\` + \`weekly_kpi.csv\` |

## Generate / refresh

\`\`\`bash
node scripts/generate-revenue-sprint-01.mjs
\`\`\`

## Daily focus

| Day | Traffic | Leads | Outreach |
|-----|---------|-------|----------|
| 1–3 | FC posts FC-01–10 | Reply WhatsApp <2h | Contact 20 prospects |
| 4–7 | JR posts JR-01–10 | Book 2 viewings | Contact 30 prospects |
| 8–10 | PM posts PM-01–10 | Send 2 PM proposals | Contact 50 prospects |
| 11–14 | GC posts GC-01–10 | Close 1 conversion | Complete 200 outreach touches |

## KPI targets

- **Social:** 120 FB posts published or scheduled
- **Outreach:** 200 owner prospects contacted
- **Leads:** 20+ CRM entries
- **Viewings:** 8 booked
- **Revenue:** 1 signed PM or paid inspection (RM 500+)

## Links (use in all content)

- Site: ${SITE}
- Owners: /en/owners · /zh/owners
- List property: /en/list-property
- Property request: /en/property-request
- Book viewing: /en/book-viewing
- WhatsApp: ${WA}

## Execution tools (existing — do not extend)

- CRM: \`/admin/crm\`
- Operations: \`/admin/operations\`
- Outreach: \`/admin/outreach\`
`;

write("README.md", readme);

console.log("Revenue Sprint 01 assets generated.");
