"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { LEAD_PIPELINE_STATUS, VIEWING_STATUS } from "@/lib/admin/crm-status";
import type { Lead, OwnerPropertySubmission, TenantRequest, ViewingAppointment } from "@/lib/supabase/types";

type CrmData = {
  leads: Lead[];
  ownerSubmissions: OwnerPropertySubmission[];
  tenantRequests: TenantRequest[];
  viewingAppointments: ViewingAppointment[];
};

type TabId = "leads" | "owners" | "tenants" | "viewings";

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("60")) return digits;
  if (digits.startsWith("0")) return `60${digits.slice(1)}`;
  return digits;
}

function whatsAppHref(phone: string, message?: string): string {
  const num = normalizePhone(phone);
  const base = `https://wa.me/${num}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

function matchesSearch(text: string, q: string): boolean {
  return text.toLowerCase().includes(q.toLowerCase());
}

function StatusSelect({
  options,
  value,
  disabled,
  onChange,
}: {
  options: readonly string[];
  value: string;
  disabled?: boolean;
  onChange: (next: string) => void;
}) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className="rounded border border-gray-300 px-2 py-1 text-xs"
    >
      {options.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}

function CrmToolbar({
  search,
  onSearch,
  statusFilter,
  onStatusFilter,
  sourceFilter,
  onSourceFilter,
  sources,
  showSourceFilter,
}: {
  search: string;
  onSearch: (v: string) => void;
  statusFilter: string;
  onStatusFilter: (v: string) => void;
  sourceFilter: string;
  onSourceFilter: (v: string) => void;
  sources: string[];
  showSourceFilter: boolean;
}) {
  return (
    <div className="mb-4 flex flex-wrap gap-3 items-end">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-medium text-gray-600 mb-1">Search</label>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Name, email, phone, project…"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilter(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">All</option>
          {LEAD_PIPELINE_STATUS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      {showSourceFilter && (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Source</label>
          <select
            value={sourceFilter}
            onChange={(e) => onSourceFilter(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">All sources</option>
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

function PipelineSummary({ data }: { data: CrmData }) {
  const counts = useMemo(() => {
    const all = [
      ...data.leads.map((r) => r.status),
      ...data.ownerSubmissions.map((r) => r.status),
      ...data.tenantRequests.map((r) => r.status),
    ];
    const byStatus: Record<string, number> = {};
    for (const s of LEAD_PIPELINE_STATUS) byStatus[s] = 0;
    for (const s of all) {
      byStatus[s] = (byStatus[s] ?? 0) + 1;
    }
    const sources = data.leads.reduce<Record<string, number>>((acc, l) => {
      acc[l.source] = (acc[l.source] ?? 0) + 1;
      return acc;
    }, {});
    return { byStatus, sources, totalLeads: data.leads.length, waConfirmed: data.leads.filter((l) => l.whatsapp_confirmed).length };
  }, [data]);

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-xs font-medium text-gray-500 uppercase">Website leads</p>
        <p className="mt-1 text-2xl font-bold text-navy-900">{counts.totalLeads}</p>
        <p className="text-xs text-gray-500 mt-1">WhatsApp confirmed: {counts.waConfirmed}</p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-xs font-medium text-gray-500 uppercase">New pipeline</p>
        <p className="mt-1 text-2xl font-bold text-teal-700">{counts.byStatus.new ?? 0}</p>
        <p className="text-xs text-gray-500 mt-1">Across leads, owners, tenants</p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-xs font-medium text-gray-500 uppercase">Scheduled / qualified</p>
        <p className="mt-1 text-2xl font-bold text-navy-900">
          {(counts.byStatus.scheduled ?? 0) + (counts.byStatus.qualified ?? 0)}
        </p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-xs font-medium text-gray-500 uppercase">Top source</p>
        <p className="mt-1 text-lg font-bold text-navy-900 truncate">
          {Object.entries(counts.sources).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—"}
        </p>
      </div>
    </div>
  );
}

export function CrmDashboard() {
  const [data, setData] = useState<CrmData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<TabId>("leads");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/crm");
    if (!res.ok) {
      setError("Failed to load CRM data");
      setLoading(false);
      return;
    }
    setData(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function patchLeadStatus(type: "leads" | "owner-submissions" | "tenant-requests", id: string, status: string) {
    await fetch(`/api/admin/crm/${type}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  async function patchLeadWhatsApp(id: string, whatsapp_confirmed: boolean) {
    await fetch(`/api/admin/crm/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ whatsapp_confirmed }),
    });
    load();
  }

  async function patchViewing(id: string, updates: { status?: string; whatsapp_confirmed?: boolean }) {
    await fetch(`/api/admin/operations/viewings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    load();
  }

  const sources = useMemo(
    () => (data ? [...new Set(data.leads.map((l) => l.source))].sort() : []),
    [data],
  );

  const filteredLeads = useMemo(() => {
    if (!data) return [];
    return data.leads.filter((lead) => {
      if (statusFilter && lead.status !== statusFilter) return false;
      if (sourceFilter && lead.source !== sourceFilter) return false;
      if (!search) return true;
      const blob = [lead.full_name, lead.email, lead.phone, lead.source, lead.property_location ?? "", lead.message ?? ""].join(" ");
      return matchesSearch(blob, search);
    });
  }, [data, search, statusFilter, sourceFilter]);

  const filteredOwners = useMemo(() => {
    if (!data) return [];
    return data.ownerSubmissions.filter((row) => {
      if (statusFilter && row.status !== statusFilter) return false;
      if (!search) return true;
      const blob = [row.owner_name, row.whatsapp, row.wechat ?? "", row.project, row.unit_type, row.intent].join(" ");
      return matchesSearch(blob, search);
    });
  }, [data, search, statusFilter]);

  const filteredTenants = useMemo(() => {
    if (!data) return [];
    return data.tenantRequests.filter((row) => {
      if (statusFilter && row.status !== statusFilter) return false;
      if (!search) return true;
      const blob = [row.full_name, row.contact, row.intent, row.preferred_project ?? ""].join(" ");
      return matchesSearch(blob, search);
    });
  }, [data, search, statusFilter]);

  const filteredViewings = useMemo(() => {
    if (!data) return [];
    return data.viewingAppointments.filter((row) => {
      if (statusFilter && row.status !== statusFilter) return false;
      if (!search) return true;
      const blob = [row.full_name, row.contact, row.email ?? "", row.project, row.notes ?? ""].join(" ");
      return matchesSearch(blob, search);
    });
  }, [data, search, statusFilter]);

  if (loading) return <p className="text-sm text-gray-500">Loading lead center…</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!data) return null;

  const tabs: { id: TabId; label: string }[] = [
    { id: "leads", label: `Leads (${data.leads.length})` },
    { id: "owners", label: `Owner submissions (${data.ownerSubmissions.length})` },
    { id: "tenants", label: `Tenant requests (${data.tenantRequests.length})` },
    { id: "viewings", label: `Viewings (${data.viewingAppointments.length})` },
  ];

  return (
    <div>
      <PipelineSummary data={data} />

      <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px whitespace-nowrap ${
              tab === t.id ? "border-teal-700 text-teal-700" : "border-transparent text-gray-600"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <CrmToolbar
        search={search}
        onSearch={setSearch}
        statusFilter={statusFilter}
        onStatusFilter={setStatusFilter}
        sourceFilter={sourceFilter}
        onSourceFilter={setSourceFilter}
        sources={sources}
        showSourceFilter={tab === "leads"}
      />

      {tab === "leads" && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-600">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Contact</th>
                <th className="py-2 pr-4">Source</th>
                <th className="py-2 pr-4">Location / Message</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">WhatsApp</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium">{lead.full_name}</td>
                  <td className="py-3 pr-4">
                    <div>{lead.email}</div>
                    <div className="text-gray-500">{lead.phone}</div>
                  </td>
                  <td className="py-3 pr-4 text-gray-600">{lead.source}</td>
                  <td className="py-3 pr-4 text-gray-600 max-w-xs">
                    {lead.property_location && <div>{lead.property_location}</div>}
                    {lead.message && <div className="text-xs truncate">{lead.message}</div>}
                  </td>
                  <td className="py-3 pr-4">
                    <StatusSelect
                      options={LEAD_PIPELINE_STATUS}
                      value={lead.status}
                      onChange={(s) => patchLeadStatus("leads", lead.id, s)}
                    />
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-col gap-1">
                      <a
                        href={whatsAppHref(lead.phone, `Hi ${lead.full_name}, following up on your inquiry.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 hover:underline text-xs"
                      >
                        Open WA
                      </a>
                      <label className="flex items-center gap-1 text-xs text-gray-600">
                        <input
                          type="checkbox"
                          checked={lead.whatsapp_confirmed ?? false}
                          onChange={(e) => patchLeadWhatsApp(lead.id, e.target.checked)}
                        />
                        Confirmed
                      </label>
                    </div>
                  </td>
                  <td className="py-3 text-gray-500">{new Date(lead.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredLeads.length === 0 && <p className="text-sm text-gray-500 py-4">No leads match filters.</p>}
        </div>
      )}

      {tab === "owners" && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-600">
                <th className="py-2 pr-4">Owner</th>
                <th className="py-2 pr-4">Project</th>
                <th className="py-2 pr-4">Intent</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">WhatsApp</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOwners.map((row) => (
                <tr key={row.id} className="border-b border-gray-100">
                  <td className="py-3 pr-4">
                    <div className="font-medium">{row.owner_name}</div>
                    <div className="text-gray-500">{row.whatsapp}</div>
                  </td>
                  <td className="py-3 pr-4">
                    {row.project} · {row.unit_type}
                  </td>
                  <td className="py-3 pr-4">{row.intent}</td>
                  <td className="py-3 pr-4">
                    <StatusSelect
                      options={LEAD_PIPELINE_STATUS}
                      value={row.status}
                      onChange={(s) => patchLeadStatus("owner-submissions", row.id, s)}
                    />
                  </td>
                  <td className="py-3 pr-4">
                    <a
                      href={whatsAppHref(row.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-700 hover:underline text-xs"
                    >
                      Open WA
                    </a>
                  </td>
                  <td className="py-3 text-gray-500">{new Date(row.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOwners.length === 0 && <p className="text-sm text-gray-500 py-4">No owner submissions match filters.</p>}
        </div>
      )}

      {tab === "tenants" && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-600">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Intent</th>
                <th className="py-2 pr-4">Project</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">WhatsApp</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((row) => (
                <tr key={row.id} className="border-b border-gray-100">
                  <td className="py-3 pr-4">
                    <div className="font-medium">{row.full_name}</div>
                    <div className="text-gray-500">{row.contact}</div>
                  </td>
                  <td className="py-3 pr-4">{row.intent}</td>
                  <td className="py-3 pr-4">{row.preferred_project ?? "—"}</td>
                  <td className="py-3 pr-4">
                    <StatusSelect
                      options={LEAD_PIPELINE_STATUS}
                      value={row.status}
                      onChange={(s) => patchLeadStatus("tenant-requests", row.id, s)}
                    />
                  </td>
                  <td className="py-3 pr-4">
                    <a
                      href={whatsAppHref(row.contact)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-700 hover:underline text-xs"
                    >
                      Open WA
                    </a>
                  </td>
                  <td className="py-3 text-gray-500">{new Date(row.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTenants.length === 0 && <p className="text-sm text-gray-500 py-4">No tenant requests match filters.</p>}
        </div>
      )}

      {tab === "viewings" && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-600">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Property</th>
                <th className="py-2 pr-4">Preferred</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">WhatsApp</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredViewings.map((row) => (
                <tr key={row.id} className="border-b border-gray-100">
                  <td className="py-3 pr-4">
                    <div className="font-medium">{row.full_name}</div>
                    <div className="text-gray-500">{row.contact}</div>
                  </td>
                  <td className="py-3 pr-4">{row.project}</td>
                  <td className="py-3 pr-4 text-gray-600">
                    {row.preferred_date ?? "TBD"}
                    {row.preferred_time ? ` · ${row.preferred_time}` : ""}
                  </td>
                  <td className="py-3 pr-4">
                    <StatusSelect
                      options={VIEWING_STATUS}
                      value={row.status}
                      onChange={(s) => patchViewing(row.id, { status: s })}
                    />
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-col gap-1">
                      <a
                        href={whatsAppHref(row.contact)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 hover:underline text-xs"
                      >
                        Open WA
                      </a>
                      <label className="flex items-center gap-1 text-xs text-gray-600">
                        <input
                          type="checkbox"
                          checked={row.whatsapp_confirmed}
                          onChange={(e) => patchViewing(row.id, { whatsapp_confirmed: e.target.checked })}
                        />
                        Confirmed
                      </label>
                    </div>
                  </td>
                  <td className="py-3 text-gray-500">{new Date(row.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredViewings.length === 0 && <p className="text-sm text-gray-500 py-4">No viewings match filters.</p>}
        </div>
      )}
    </div>
  );
}
