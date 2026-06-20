# WhatsApp Template — Inspection Service

**Use when:** Booking or delivering property inspection report  
**Report ref:** INSP-YYYYMMDD-###  
**CRM source:** `whatsapp-inspection-service`

---

## Message (English) — Booking confirmation

```
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
```

---

## Message (English) — Report delivery

```
Hi [Owner Name] 👋

Your inspection report is ready — INSP-[DATE]-[###]

Summary:
• Overall condition: [Good / Fair / Needs attention]
• Priority items: [list 1–3]
• Recommended actions: [list]

Full photo report attached. Happy to discuss repairs or PM onboarding.

Next: PM quote to handle identified items? Reply YES for PMQ proposal.
```

---

## Message (中文) — 报告交付

```
您好 [业主姓名] 👋

验房报告已完成 — INSP-[日期]-[###]

摘要：
• 整体状况：[良好 / 一般 / 需关注]
• 优先处理：[1–3项]
• 建议措施：[列表]

完整照片报告见附件。如需维修或托管安排请告知。

是否需要托管报价？回复 YES 获取 PMQ 方案。
```

---

## Follow-up checklist

- [ ] Use `inspection_report_template.md` for full report
- [ ] Log in weekly KPI → inspections_quoted / delivered
- [ ] Upsell to PM Package B if issues found
- [ ] Schedule re-inspection if major repairs completed
