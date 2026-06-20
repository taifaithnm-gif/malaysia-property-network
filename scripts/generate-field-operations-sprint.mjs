#!/usr/bin/env node
/** Field Operations Sprint — photography, inspection, meeting checklists, video shot list, tracking logs. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const out = path.join(root, "OPERATIONS/field-operations-sprint");

function write(rel, content) {
  const p = path.join(out, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
  console.log(`Wrote ${rel}`);
}

const PROJECTS = [
  {
    slug: "forest-city",
    name: "Forest City",
    focus: "Resort-scale · golf · marina · seaview · China owner units",
    towers: ["Phoenix Tower", "Cerulean Bay", "Starview Bay", "Golf Suite", "Marina Hotel"],
    exterior: [
      "Tower facade — full elevation (day + golden hour)",
      "Marina / waterfront boardwalk",
      "Golf course fairway from unit balcony",
      "Resort hotel lobby and drop-off",
      "Pool deck and gym (if accessible)",
      "Management office entrance",
      "Security gate and visitor parking",
    ],
    interior: [
      "Living room — wide angle + corner detail (natural light)",
      "Kitchen — counters, hob, hood, fridge",
      "Master bedroom — bed, wardrobe, AC vent",
      "Bathroom — shower, grout, exhaust fan",
      "Balcony — railing, drainage, view orientation",
      "Meter box / DB panel (with owner permission)",
    ],
    hero: "Seaview or golf-view from balcony at sunset",
    notes: "Check strata guest policy before balcony drone shots. Humidity — shoot interiors with AC on 15 min prior.",
  },
  {
    slug: "rf-princess-cove",
    name: "R&F Princess Cove",
    focus: "CIQ proximity · waterfront · Singapore commuter · Chinese investors",
    towers: ["Phase 1", "Phase 2", "Phase 3", "CIQ Tower", "Waterfront"],
    exterior: [
      "Waterfront facade with Singapore skyline context",
      "CIQ / causeway direction marker shot",
      "Lobby and concierge desk",
      "Sky bridge or podium garden",
      "Pool and facility deck",
      "Car park access and visitor bay",
      "Night skyline from podium (tripod)",
    ],
    interior: [
      "Living-dining open plan — CIQ view through window",
      "Smart lock / digital door panel close-up",
      "Kitchen — moisture-prone areas near waterfront",
      "Bedroom — soundproofing curtains if present",
      "Bathroom — ventilation and fixture age",
      "Balcony — wind exposure and railing",
      "Access card / parking card storage spot",
    ],
    hero: "Living room window framing Singapore skyline",
    notes: "Weekend traffic near CIQ — schedule exterior shots weekday AM. Premium units need fixture close-ups.",
  },
  {
    slug: "danga-bay",
    name: "Danga Bay",
    focus: "Mature rental market · mixed hotel-condo · local family tenants",
    towers: ["Bay Point", "Danga View", "Country Garden Danga", "Hotel-condo blocks"],
    exterior: [
      "Waterfront promenade and Danga Bay sign",
      "Tower age context — facade maintenance state",
      "Lobby condition (older buildings vary)",
      "Pool / facility activation level",
      "Nearby F&B and mall foot traffic",
      "Parking and access road",
    ],
    interior: [
      "Living room — ageing fixture audit shots",
      "Kitchen — plumbing and cabinet hinges",
      "HVAC / AC age and drip tray",
      "Bedroom — wardrobe and window seals",
      "Bathroom — grout and water pressure test",
      "Balcony — rust and drainage",
      "Utility bills folder location (owner data)",
    ],
    hero: "Waterfront unit with Danga Bay promenade view",
    notes: "Older stock — document maintenance needs honestly. Tourism-driven area — shoot local lifestyle context.",
  },
  {
    slug: "bukit-indah",
    name: "Bukit Indah",
    focus: "Suburban family · mall proximity · stable local rental demand",
    towers: ["Bukit Indah Residences", "Pinnacle", "Garden Residence", "Commercial-linked blocks"],
    exterior: [
      "Neighbourhood street and Bukit Indah mall proximity",
      "Tower facade — family-oriented precinct",
      "Playground / family facilities",
      "Lobby and lift lobby",
      "Pool and BBQ area",
      "School / amenity context shot",
    ],
    interior: [
      "Family living room — 3-bed layout if available",
      "Kitchen — family cooking setup",
      "Kids room or second bedroom",
      "Master suite",
      "Bathroom — family bath wear",
      "Balcony — drying rack / utility",
      "Storage and shoe cabinet area",
    ],
    hero: "Family living room with suburban green view",
    notes: "Target tenant: local family. Shoot furnished examples. Parking bay photo if included.",
  },
  {
    slug: "mount-austin",
    name: "Mount Austin",
    focus: "Commercial-linked · young families · shortest void periods",
    towers: ["Austin Regency", "Pinnacle Tower", "Commercial podium blocks"],
    exterior: [
      "Mount Austin commercial street context",
      "Tower linked to retail podium",
      "Lobby and lift waiting area",
      "Facility deck usage level",
      "Peak-hour traffic context (optional)",
      "Nearby F&B strip",
    ],
    interior: [
      "Compact 2-bed living — rental sweet spot",
      "Kitchen — tenant wear patterns",
      "Bedrooms — size reference (include tape measure in one shot)",
      "Bathroom — ventilation",
      "Balcony — city/suburban view",
      "Furnishing inventory for furnished units",
    ],
    hero: "2-bed furnished living with commercial strip view",
    notes: "Highest rental velocity district — prioritize furnished 2-bed walkthrough set.",
  },
  {
    slug: "eco-botanic",
    name: "Eco Botanic",
    focus: "Eco township · family · newer suburban stock",
    towers: ["Eco Botanic Phase 1", "Phase 2", "Garden precinct"],
    exterior: [
      "Eco Botanic township entrance and greenery",
      "Tower facade — newer build quality",
      "Landscape and jogging path",
      "Lobby — modern finish",
      "Pool and clubhouse",
      "School / eco park context",
    ],
    interior: [
      "Living room — newer fixture quality",
      "Kitchen — hob and hood brand",
      "Bedrooms — natural light",
      "Bathroom — new grout baseline",
      "Balcony — garden view",
      "Smart home panel if present",
    ],
    hero: "Living room opening to landscaped balcony",
    notes: "Newer stock — good for before/after tenancy baseline photos.",
  },
  {
    slug: "medini",
    name: "Medini",
    focus: "RTS corridor · Singapore commuter · lower entry commuter stock",
    towers: ["Medini Residence", "RTS-adjacent blocks", "Nusajaya precinct"],
    exterior: [
      "Medini township signage",
      "RTS station direction context shot",
      "Tower facade — commuter precinct",
      "Lobby and security",
      "Pool / facility",
      "Legoland / edu-city context (wide)",
      "Bus stop and transport links",
    ],
    interior: [
      "1-bed commuter layout — priority",
      "Living area — compact furnished",
      "Kitchen — essentials only",
      "Bedroom — weekend tenant appeal",
      "Bathroom — quick turnaround condition",
      "Balcony — RTS or township view",
      "Access card and parking",
    ],
    hero: "1-bed furnished unit with RTS corridor context map insert",
    notes: "Growing commuter narrative — shoot transport links. Weekend tenant profile for marketing.",
  },
];

// P1 — Photography checklists per project
for (const p of PROJECTS) {
  const md = `# Photography Checklist — ${p.name}

**Field Operations Sprint** · Project: \`${p.slug}\`  
**Focus:** ${p.focus}  
**Minimum deliverable:** 24 photos per unit visit · 12 project exterior set per sprint

---

## Pre-shoot setup

| Item | Done |
|------|:----:|
| Camera/phone charged + spare battery | ☐ |
| Lens wiped (humidity / fingerprint) | ☐ |
| Shoot in landscape for listings | ☐ |
| Turn on all lights + AC 15 min before interior | ☐ |
| Declutter surfaces (owner/agent coordination) | ☐ |
| File naming convention confirmed | ☐ |

**Filename format:** \`${p.slug}_{tower}_{unit}_{room}_{NN}.jpg\`  
**Example:** \`forest-city_phoenix-tower_12-03_living_01.jpg\`

---

## Towers to cover this sprint

${p.towers.map((t) => `- [ ] ${t}`).join("\n")}

---

## Exterior / common area shots

| # | Shot | Done | Filename | Notes |
|---|------|:----:|----------|-------|
${p.exterior.map((s, i) => `| E${i + 1} | ${s} | ☐ | | |`).join("\n")}

---

## Interior unit shots (per unit)

| # | Shot | Done | Filename | Notes |
|---|------|:----:|----------|-------|
${p.interior.map((s, i) => `| I${i + 1} | ${s} | ☐ | | |`).join("\n")}

---

## Hero shot (listing cover)

**Target:** ${p.hero}

| Done | Filename | Selected for listing |
|:----:|----------|---------------------|
| ☐ | | ☐ |

---

## Project-specific notes

${p.notes}

---

## Post-shoot

| Task | Done |
|------|:----:|
| Photos logged in \`tracking/photos_log.csv\` | ☐ |
| Hero shot flagged in CSV | ☐ |
| Backup to cloud folder \`assets/photos/${p.slug}/\` | ☐ |
| Owner/agent consent for marketing use confirmed | ☐ |
| Chinese caption draft if targeting ZH audience | ☐ |

---

**Log row:** \`photos_log.csv\` · source \`field-ops-photography\`
`;
  write(`checklists/photography/${p.slug}.md`, md);
}

// P2 — Property inspection checklist (field on-site, complements INS report template)
write(
  "checklists/property-inspection-checklist.md",
  `# Property Inspection Checklist — Field Operations

**Use on-site before completing \`inspection_report_template.md\`**  
**Report ID format:** INS-YYYYMMDD-###  
**CRM source:** \`field-ops-inspection\`

---

## Before leaving office

| Item | Done |
|------|:----:|
| Inspection confirmed with owner/agent | ☐ |
| Access method confirmed (key / management / agent) | ☐ |
| Tower, unit, owner contact in CRM | ☐ |
| Inspection scope agreed (move-in / routine / pre-purchase) | ☐ |
| Camera + torch + tape measure packed | ☐ |
| Printed or offline copy of room checklist | ☐ |
| Management office hours checked (FC / R&F strata) | ☐ |

---

## On arrival

| Item | Done |
|------|:----:|
| Photo: building exterior + unit door | ☐ |
| Verify unit number matches booking | ☐ |
| Check door lock, intercom, smart lock | ☐ |
| Record meter readings (photo) | ☐ |
| Note occupancy: vacant / tenanted / owner use | ☐ |
| Tenant present? Permission for photos obtained | ☐ |

---

## Room walkthrough (tick OK or flag ISSUE)

### Entry / foyer
| Item | OK | Issue |
|------|:--:|:-----:|
| Door lock & handle | ☐ | ☐ |
| Intercom / doorbell | ☐ | ☐ |
| Floor / tiles | ☐ | ☐ |
| Walls / paint | ☐ | ☐ |

### Living / dining
| Item | OK | Issue |
|------|:--:|:-----:|
| Floor & walls | ☐ | ☐ |
| Windows / seals | ☐ | ☐ |
| AC cooling + drip | ☐ | ☐ |
| Lighting | ☐ | ☐ |
| Furniture inventory (if furnished) | ☐ | ☐ |

### Kitchen
| Item | OK | Issue |
|------|:--:|:-----:|
| Cabinets / hinges | ☐ | ☐ |
| Sink / tap / leak | ☐ | ☐ |
| Hood / hob | ☐ | ☐ |
| Fridge | ☐ | ☐ |
| Pest signs | ☐ | ☐ |

### Bedroom(s)
| Item | OK | Issue |
|------|:--:|:-----:|
| Bed / mattress | ☐ | ☐ |
| Wardrobe | ☐ | ☐ |
| AC | ☐ | ☐ |
| Windows / grilles | ☐ | ☐ |

### Bathroom(s)
| Item | OK | Issue |
|------|:--:|:-----:|
| Toilet / flush | ☐ | ☐ |
| Shower / pressure | ☐ | ☐ |
| Grout / mould | ☐ | ☐ |
| Exhaust fan | ☐ | ☐ |
| Water heater | ☐ | ☐ |

### Balcony
| Item | OK | Issue |
|------|:--:|:-----:|
| Railing safety | ☐ | ☐ |
| Rust / corrosion | ☐ | ☐ |
| Drainage | ☐ | ☐ |

### Utilities
| Item | OK | Issue |
|------|:--:|:-----:|
| DB box | ☐ | ☐ |
| Water meter | ☐ | ☐ |
| Electric meter | ☐ | ☐ |

---

## Building / common area (if accessible)

| Item | OK | Issue |
|------|:--:|:-----:|
| Lift operation | ☐ | ☐ |
| Lobby condition | ☐ | ☐ |
| Pool / gym | ☐ | ☐ |
| Parking bay | ☐ | ☐ |
| Security access | ☐ | ☐ |

**Strata notices photographed:** ☐ Yes ☐ N/A

---

## Photo minimums

| Scope | Min photos | Actual count |
|-------|------------|--------------|
| Standard inspection | 12 | |
| Pre-purchase / move-in-out | 24 | |
| Urgent damage | 6+ detail close-ups | |

---

## Mould & humidity (Johor priority)

| Check | Done |
|-------|:----:|
| Bathroom grout discoloration | ☐ |
| Ceiling stains | ☐ |
| Wardrobe back panel | ☐ |
| Balcony standing water | ☐ |
| AC drip tray | ☐ |
| Closed-unit smell test | ☐ |

---

## Before leaving unit

| Task | Done |
|------|:----:|
| Lock unit · return keys to agreed custody | ☐ |
| Photos uploaded / logged in \`photos_log.csv\` | ☐ |
| Property data row added to \`property_data_log.csv\` | ☐ |
| Urgent issues WhatsApp'd to owner (if any) | ☐ |
| Complete full report within 48h | ☐ |

---

## Post-inspection

| Task | Done |
|------|:----:|
| \`inspection_report_template.md\` completed | ☐ |
| Report sent owner (WhatsApp + email) | ☐ |
| PM upsell offered if repairs needed | ☐ |
| CRM updated · source \`field-ops-inspection\` | ☐ |

**Full report template:** \`OPERATIONS/sprint-1/templates/inspection_report_template.md\`
`,
);

// P3 — Owner meeting checklist
write(
  "checklists/owner-meeting-checklist.md",
  `# Owner Meeting Checklist — Field Operations

**Purpose:** Capture real owner contacts and property data in person or video call  
**CRM source:** \`field-ops-owner-meeting\`  
**Log:** \`tracking/owner_contacts_log.csv\` + \`property_data_log.csv\`

---

## Before meeting

| Item | Done |
|------|:----:|
| Meeting confirmed (time zone for overseas owners) | ☐ |
| Language confirmed: EN / 中文 / both | ☐ |
| Agenda sent: inspection · PM · listing · keys | ☐ |
| PM quotation template ready (PMQ-*) | ☐ |
| Inspection template ready if on-site follow-up | ☐ |
| Previous CRM notes reviewed | ☐ |
| WhatsApp / WeChat test message sent | ☐ |

---

## Bring to meeting

| Item | Packed |
|------|:------:|
| Business cards | ☐ |
| Sample monthly owner report | ☐ |
| PM package comparison (A/B/C) | ☐ |
| Key holding SOP one-pager | ☐ |
| List property QR / link | ☐ |
| Tablet for showing listings / research | ☐ |

---

## Owner profile — capture these fields

| Field | Recorded | Value |
|-------|:--------:|-------|
| Full name | ☐ | |
| Nationality / based in | ☐ | |
| WhatsApp | ☐ | |
| WeChat ID | ☐ | |
| Email | ☐ | |
| Preferred language | ☐ | |
| How they found us | ☐ | |

---

## Property profile — capture these fields

| Field | Recorded | Value |
|-------|:--------:|-------|
| Project | ☐ | |
| Tower / phase | ☐ | |
| Unit number | ☐ | |
| Unit type (studio / 1-bed / etc.) | ☐ | |
| Built-up sqft | ☐ | |
| Furnishing status | ☐ | |
| Current status (vacant / tenanted / self-use) | ☐ |
| Purchase year (approx) | ☐ | |
| Current rent (if tenanted) | ☐ | |
| Management fee (monthly) | ☐ | |
| Key location | ☐ | |
| Pain points (top 3) | ☐ | |

---

## Discussion guide

| Topic | Covered | Notes |
|-------|:-------:|-------|
| Why they bought / hold strategy | ☐ | |
| Biggest remote-owner frustration | ☐ | |
| Current manager (if any) — satisfaction | ☐ | |
| Target: long-term rent / Airbnb / sale / self-use | ☐ | |
| Inspection interest & timeline | ☐ | |
| PM package interest (A/B/C) | ☐ | |
| Key holding need | ☐ | |
| Budget expectation for management fee | ☐ | |
| Decision timeline | ☐ | |
| Other units in portfolio | ☐ | |

---

## Chinese owner specifics (if applicable)

| Topic | Covered |
|-------|:-------:|
| 中文报告需求 | ☐ |
| 微信 vs WhatsApp preference | ☐ |
| 国内汇款 / MYR remittance preference | ☐ |
| 验房 / 托管 / 钥匙托管优先级 | ☐ |
| 森林城市 or 富力 strata concerns raised | ☐ |

---

## Close meeting — next actions

| Action | Owner | Due | Done |
|--------|-------|-----|:----:|
| Send PM quotation (PMQ-*) | Us | 24h | ☐ |
| Schedule inspection | Us | | ☐ |
| Owner sends keys / access | Owner | | ☐ |
| List property form completed | Owner | | ☐ |
| Follow-up WhatsApp summary sent | Us | Same day | ☐ |

---

## Post-meeting (within 4 hours)

| Task | Done |
|------|:----:|
| Row added to \`owner_contacts_log.csv\` | ☐ |
| Row added to \`property_data_log.csv\` | ☐ |
| CRM updated manually via \`/admin/crm\` | ☐ |
| Meeting notes filed in deal folder if hot lead | ☐ |
| Follow-up calendar reminder set | ☐ |

**WhatsApp follow-up template:** \`OPERATIONS/revenue-sprint-01/templates/whatsapp-owner-inquiry.md\`
`,
);

// P4 — Agent meeting checklist
write(
  "checklists/agent-meeting-checklist.md",
  `# Agent Meeting Checklist — Field Operations

**Purpose:** Build co-broke pipeline and source real listing / owner referrals  
**CRM source:** \`field-ops-agent-meeting\`  
**Reference agents:** \`OPERATIONS/sprint-01/agents_master.csv\`

---

## Before meeting

| Item | Done |
|------|:----:|
| Agent name, agency, project focus researched | ☐ |
| Their active listings checked (PG / iP / EdgeProp) | ☐ |
| Co-broke terms draft ready | ☐ |
| Our live listings list printed / on tablet | ☐ |
| Commission structure clear internally | ☐ |
| Meeting location confirmed (cafe / office / site) | ☐ |

---

## Agent profile — capture these fields

| Field | Recorded | Value |
|-------|:--------:|-------|
| Agent name | ☐ | |
| Agency | ☐ | |
| Phone / WhatsApp | ☐ | |
| Primary project focus | ☐ | |
| Languages (EN / 中文 / BM) | ☐ |
| Active listing count (est.) | ☐ |
| Co-broke preference | ☐ | |
| Commission expectation | ☐ | |

---

## Discussion guide

| Topic | Covered | Notes |
|-------|:-------:|-------|
| Their current inventory (rent / sale) | ☐ | |
| Tenant profile they see most | ☐ | |
| Void period experience by project | ☐ | |
| Owner clients needing management | ☐ | |
| Co-broke split proposal | ☐ | |
| Referral fee for PM sign-ups | ☐ | |
| Inspection referral arrangement | ☐ | |
| Listing syndication to our site | ☐ | |
| Response time / communication style | ☐ | |

---

## Co-broke terms to agree

| Term | Agreed | Details |
|------|:------:|---------|
| Commission split (rent / sale) | ☐ | |
| Who handles tenant enquiry | ☐ | |
| Who handles viewing | ☐ | |
| Listing marketing channels | ☐ | |
| Owner PM referral fee (if any) | ☐ | |
| Exclusivity period | ☐ | |
| Payment timeline | ☐ | |

**Default reference:** 50/50 co-broke where noted in \`agents_master.csv\`

---

## Referral ask

| Ask | Response |
|-----|----------|
| Owners needing inspection this month | |
| Owners needing PM / key holding | |
| Furnished units for our tenant pool | |
| Introduction to Chinese owner clients | |

---

## Close meeting — next actions

| Action | Owner | Due | Done |
|--------|-------|-----|:----:|
| Share 2–3 co-broke listings | Us | 48h | ☐ |
| Agent shares owner referral contact | Agent | | ☐ |
| Joint viewing scheduled | Both | | ☐ |
| WhatsApp group created for deal | Both | | ☐ |

---

## Post-meeting

| Task | Done |
|------|:----:|
| Agent notes logged (extend \`agents_master.csv\` or CRM notes) | ☐ |
| Referral owner → \`owner_contacts_log.csv\` | ☐ |
| Listing data → \`property_data_log.csv\` | ☐ |
| Co-broke deal tracked in \`/admin/outreach\` if live | ☐ |

**Priority projects this sprint:** Forest City · R&F Princess Cove · Danga Bay · Bukit Indah · Mount Austin · Eco Botanic · Medini
`,
);

// P5 — Video shot list
write(
  "checklists/video-shot-list.md",
  `# Video Shot List — Field Operations Sprint

**Minimum deliverable:** 1 project reel per project (7) · 1 unit walkthrough per priority listing  
**Log:** \`tracking/videos_log.csv\` · **Storage:** \`assets/videos/\`

---

## Equipment checklist

| Item | Packed |
|------|:------:|
| Phone / camera (4K if available) | ☐ |
| Gimbal / stabilizer | ☐ |
| Lapel mic (owner/agent interviews) | ☐ |
| Spare battery + storage | ☐ |
| Tripod (hero static shots) | ☐ |
| Drone (only where legal + strata approved) | ☐ |

---

## Universal shot types

| ID | Shot | Duration | Use |
|----|------|----------|-----|
| V01 | Establishing wide — project entrance | 5–8s | Reel opener |
| V02 | Lobby walk-through | 10–15s | Trust / quality |
| V03 | Lift ride to unit floor | 5s | Transition |
| V04 | Unit door open reveal | 3s | Walkthrough opener |
| V05 | Living room pan left-to-right | 8–12s | Listing video |
| V06 | Kitchen detail push-in | 5s | Listing video |
| V07 | Bedroom walk-in | 6s | Listing video |
| V08 | Bathroom quick pan | 4s | Listing video |
| V09 | Balcony view hold | 8s | Hero / view sell |
| V10 | Owner/agent 30s testimonial | 30s | Social proof |
| V11 | Drone orbit (if approved) | 10s | Project reel |
| V12 | Sunset golden hour exterior | 8s | Reel closer |

---

## Per-project priority shots

### Forest City
| Shot | Done | Filename |
|------|:----:|----------|
| Marina boardwalk walk | ☐ | |
| Golf fairway from unit | ☐ | |
| Resort hotel facade | ☐ | |
| Seaview balcony hold | ☐ | |
| Management office approach | ☐ | |

### R&F Princess Cove
| Shot | Done | Filename |
|------|:----:|----------|
| Waterfront promenade | ☐ | |
| Singapore skyline from unit | ☐ | |
| CIQ direction context | ☐ | |
| Night skyline timelapse (tripod) | ☐ | |
| Smart lock close-up | ☐ | |

### Danga Bay
| Shot | Done | Filename |
|------|:----:|----------|
| Promenade + waterfront sign | ☐ | |
| Mature tower facade | ☐ | |
| Pool activation | ☐ | |
| Family unit living pan | ☐ | |

### Bukit Indah
| Shot | Done | Filename |
|------|:----:|----------|
| Mall / suburb context | ☐ | |
| Family facility (playground) | ☐ | |
| 3-bed living walkthrough | ☐ | |

### Mount Austin
| Shot | Done | Filename |
|------|:----:|----------|
| Commercial strip context | ☐ | |
| 2-bed furnished walkthrough | ☐ | |
| Peak rental unit hero | ☐ | |

### Eco Botanic
| Shot | Done | Filename |
|------|:----:|----------|
| Township greenery entrance | ☐ | |
| New-build lobby | ☐ | |
| Garden view balcony | ☐ | |

### Medini
| Shot | Done | Filename |
|------|:----:|----------|
| RTS direction context | ☐ | |
| 1-bed commuter walkthrough | ☐ | |
| Transport link wide | ☐ | |

---

## Interview questions (owner / agent on camera)

1. Why did you choose this project?
2. What is the biggest challenge managing from abroad?
3. What rental result are you targeting?
4. Would you recommend professional management?

**Get written consent for marketing use.**

---

## Post-production

| Task | Done |
|------|:----:|
| Raw files backed up to \`assets/videos/{project}/\` | ☐ |
| Row logged in \`videos_log.csv\` | ☐ |
| 30s social cut exported | ☐ |
| 60s listing walkthrough exported | ☐ |
| Captions EN + ZH drafted | ☐ |
| Thumbnail frame selected | ☐ |

---

## Filename convention

\`{project}_{type}_{date}_{NN}.mp4\`

Examples:
- \`forest-city_reel_20260623_01.mp4\`
- \`rf-princess-cove_walkthrough_12-08_01.mp4\`
- \`mount-austin_owner_interview_20260624_01.mp4\`
`,
);

// Tracking CSVs
write(
  "tracking/photos_log.csv",
  `photo_id,date,project,tower,unit,room_type,filename,filepath,hero_shot,photographer,source,consent_marketing,notes
`,
);

write(
  "tracking/videos_log.csv",
  `video_id,date,project,type,filename,filepath,duration_sec,photographer,source,consent_marketing,notes
`,
);

write(
  "tracking/property_data_log.csv",
  `property_id,date,project,tower,unit,unit_type,bedrooms,bathrooms,sqft,furnishing,status,rent_myr,mgmt_fee_myr,owner_location,data_source,verified,notes
`,
);

write(
  "tracking/owner_contacts_log.csv",
  `contact_id,date,owner_name,nationality,based_in,whatsapp,wechat,email,language,project,tower,unit,meeting_type,source,pain_points,next_action,crm_logged,notes
`,
);

write(
  "tracking/field_ops_dashboard.md",
  `# Field Operations Sprint — Asset Dashboard

**Objective:** Collect real-world assets — photos, videos, property data, owner contacts  
**Duration:** 14 days · **No website · No CRM modules · No DB schema**

---

## Sprint targets

| Asset | Target | Actual | Log file |
|-------|--------|--------|----------|
| Photos captured | 200+ | | \`photos_log.csv\` |
| Hero shots selected | 20 | | \`photos_log.csv\` |
| Videos captured | 14+ (1/project min) | | \`videos_log.csv\` |
| Unit walkthroughs | 7 | | \`videos_log.csv\` |
| Real property records | 30 | | \`property_data_log.csv\` |
| Owner contacts captured | 15 | | \`owner_contacts_log.csv\` |
| Inspections completed | 10 | | inspection checklist |
| Owner meetings | 8 | | owner meeting checklist |
| Agent meetings | 5 | | agent meeting checklist |

---

## Project coverage (photography)

| Project | Exterior set | Unit shoot | Video reel | Done |
|---------|:------------:|:----------:|:----------:|:----:|
| Forest City | ☐ | ☐ | ☐ | ☐ |
| R&F Princess Cove | ☐ | ☐ | ☐ | ☐ |
| Danga Bay | ☐ | ☐ | ☐ | ☐ |
| Bukit Indah | ☐ | ☐ | ☐ | ☐ |
| Mount Austin | ☐ | ☐ | ☐ | ☐ |
| Eco Botanic | ☐ | ☐ | ☐ | ☐ |
| Medini | ☐ | ☐ | ☐ | ☐ |

---

## Weekly field schedule

| Week | Focus | Projects |
|------|-------|----------|
| 1 | Photography + inspections | Forest City, R&F, Danga Bay |
| 2 | Photography + owner/agent meetings | Bukit Indah, Mount Austin, Eco Botanic, Medini |

---

## Asset storage

| Type | Local path | Backup |
|------|------------|--------|
| Photos | \`assets/photos/{project}/\` | Cloud drive |
| Videos | \`assets/videos/{project}/\` | Cloud drive |
| Property data | \`tracking/property_data_log.csv\` | CRM manual entry |
| Owner contacts | \`tracking/owner_contacts_log.csv\` | CRM manual entry |

---

## Daily field routine

1. Review today's checklists (photo / inspection / meeting)
2. Field visit — tick checklist on-site
3. Upload assets within 24h
4. Log rows in tracking CSVs
5. Update dashboard actuals
6. CRM entry via existing \`/admin/crm\` (no new modules)

---

## Quality bar

- **Photos:** Sharp, horizontal, no personal items visible, natural light
- **Videos:** Stable (gimbal), <60s for social, view shot mandatory
- **Property data:** Unit number verified on-site, not portal estimates only
- **Owner contacts:** Direct WhatsApp or WeChat — not agent-only relay
`,
);

write(
  "assets/README.md",
  `# Field Assets Storage

Store captured real-world files here. **Do not commit large media to git** — use \`.gitignore\` for raw photos/videos.

## Folder structure

\`\`\`
assets/
├── photos/
│   ├── forest-city/
│   ├── rf-princess-cove/
│   ├── danga-bay/
│   ├── bukit-indah/
│   ├── mount-austin/
│   ├── eco-botanic/
│   └── medini/
└── videos/
    ├── forest-city/
    ├── rf-princess-cove/
    └── ...
\`\`\`

Log every file in \`tracking/photos_log.csv\` or \`tracking/videos_log.csv\`.
`,
);

write(
  "README.md",
  `# Field Operations Sprint

**Objective:** Collect real-world assets — photos, videos, property data, owner contacts.  
**Duration:** 14 days · **No website development · No new CRM · No DB schema.**

## Deliverables

| Priority | Asset | Location |
|----------|-------|----------|
| P1 | Photography checklists (7 projects) | \`checklists/photography/*.md\` |
| P2 | Property inspection checklist | \`checklists/property-inspection-checklist.md\` |
| P3 | Owner meeting checklist | \`checklists/owner-meeting-checklist.md\` |
| P4 | Agent meeting checklist | \`checklists/agent-meeting-checklist.md\` |
| P5 | Video shot list | \`checklists/video-shot-list.md\` |
| — | Asset tracking logs | \`tracking/*.csv\` + \`field_ops_dashboard.md\` |
| — | Media storage guide | \`assets/README.md\` |

## Projects covered

Forest City · R&F Princess Cove · Danga Bay · Bukit Indah · Mount Austin · Eco Botanic · Medini

## Generate / refresh

\`\`\`bash
node scripts/generate-field-operations-sprint.mjs
\`\`\`

## Sprint targets

- **200+** photos logged
- **14+** videos (min 1 reel per project)
- **30** verified property data records
- **15** real owner contacts
- **10** field inspections completed

## Related templates

- Full inspection report: \`OPERATIONS/sprint-1/templates/inspection_report_template.md\`
- PM quotation: \`OPERATIONS/sprint-1/templates/property_management_quotation_template.md\`
- WhatsApp owner follow-up: \`OPERATIONS/revenue-sprint-01/templates/whatsapp-owner-inquiry.md\`

## Execution (existing tools only)

- Log leads manually: \`/admin/crm\`
- Co-broke / outreach: \`/admin/outreach\`
- Do not extend CRM schema — use CSV logs + manual CRM entry
`,
);

console.log("Field Operations Sprint assets generated.");
