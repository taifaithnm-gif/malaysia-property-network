export const PROJECT_TAGS = ["Forest City", "R&F Princess Cove", "Danga Bay"] as const;

export const AGENT_STATUS = ["active", "inactive"] as const;

export const IMPORT_QUEUE_STATUS = ["pending", "review", "imported", "rejected"] as const;

export const IMPORT_PLATFORMS = [
  "PropertyGuru",
  "iProperty",
  "Facebook",
  "WhatsApp",
  "WeChat",
  "Agent referral",
  "Other",
] as const;

export const OWNER_OUTREACH_STATUS = [
  "new",
  "contacted",
  "qualified",
  "listed",
  "declined",
  "archived",
] as const;

export const AGENT_CONTACT_STATUS = [
  "not_contacted",
  "messaged",
  "call_scheduled",
  "co_broke_agreed",
  "inactive",
] as const;

export const CO_BROKE_DEAL_STATUS = [
  "prospect",
  "viewing",
  "negotiating",
  "closed",
  "lost",
] as const;
