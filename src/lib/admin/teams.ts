export const OPERATIONS_TEAMS = [
  { id: "unassigned", label: "Unassigned" },
  { id: "jb-field", label: "JB Field Team" },
  { id: "forest-city", label: "Forest City Team" },
  { id: "corporate", label: "Corporate Team" },
] as const;

export const OPERATIONS_STATUS = ["new", "contacted", "scheduled", "completed", "cancelled", "archived"] as const;
