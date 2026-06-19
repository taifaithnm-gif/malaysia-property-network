/** Unified lead pipeline status for CRM, owners, and tenants. */
export const LEAD_PIPELINE_STATUS = [
  "new",
  "contacted",
  "qualified",
  "scheduled",
  "closed",
  "archived",
] as const;

export type LeadPipelineStatus = (typeof LEAD_PIPELINE_STATUS)[number];

export const VIEWING_STATUS = [
  "new",
  "contacted",
  "scheduled",
  "completed",
  "cancelled",
  "archived",
] as const;
