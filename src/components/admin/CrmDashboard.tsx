"use client";

import { useCallback, useEffect, useState } from "react";
import type { Lead, OwnerPropertySubmission, TenantRequest } from "@/lib/supabase/types";

type CrmData = {
  leads: Lead[];
  ownerSubmissions: OwnerPropertySubmission[];
  tenantRequests: TenantRequest[];
};

const STATUS_OPTIONS = ["new", "contacted", "qualified", "closed", "archived"];

function StatusSelect({
  type,
  id,
  value,
  onUpdated,
}: {
  type: "leads" | "owner-submissions" | "tenant-requests";
  id: string;
  value: string;
  onUpdated: () => void;
}) {
  const [status, setStatus] = useState(value);
  const [saving, setSaving] = useState(false);

  async function handleChange(next: string) {
    setStatus(next);
    setSaving(true);
    await fetch(`/api/admin/crm/${type}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setSaving(false);
    onUpdated();
  }

  return (
    <select
      value={status}
      disabled={saving}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded border border-gray-300 px-2 py-1 text-xs"
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}

export function CrmDashboard() {
  const [data, setData] = useState<CrmData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"leads" | "owners" | "tenants">("leads");

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

  if (loading) return <p className="text-sm text-gray-500">Loading CRM…</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!data) return null;

  const tabs = [
    { id: "leads" as const, label: `Leads (${data.leads.length})` },
    { id: "owners" as const, label: `Owner submissions (${data.ownerSubmissions.length})` },
    { id: "tenants" as const, label: `Tenant requests (${data.tenantRequests.length})` },
  ];

  return (
    <div>
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
              tab === t.id ? "border-teal-700 text-teal-700" : "border-transparent text-gray-600"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "leads" && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-600">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Contact</th>
                <th className="py-2 pr-4">Source</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.leads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium">{lead.full_name}</td>
                  <td className="py-3 pr-4">
                    <div>{lead.email}</div>
                    <div className="text-gray-500">{lead.phone}</div>
                  </td>
                  <td className="py-3 pr-4 text-gray-600">{lead.source}</td>
                  <td className="py-3 pr-4">
                    <StatusSelect type="leads" id={lead.id} value={lead.status} onUpdated={load} />
                  </td>
                  <td className="py-3 text-gray-500">{new Date(lead.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.leads.length === 0 && <p className="text-sm text-gray-500 py-4">No leads yet.</p>}
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
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.ownerSubmissions.map((row) => (
                <tr key={row.id} className="border-b border-gray-100">
                  <td className="py-3 pr-4">
                    <div className="font-medium">{row.owner_name}</div>
                    <div className="text-gray-500">{row.whatsapp}</div>
                  </td>
                  <td className="py-3 pr-4">{row.project} · {row.unit_type}</td>
                  <td className="py-3 pr-4">{row.intent}</td>
                  <td className="py-3 pr-4">
                    <StatusSelect type="owner-submissions" id={row.id} value={row.status} onUpdated={load} />
                  </td>
                  <td className="py-3 text-gray-500">{new Date(row.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.ownerSubmissions.length === 0 && <p className="text-sm text-gray-500 py-4">No owner submissions yet.</p>}
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
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.tenantRequests.map((row) => (
                <tr key={row.id} className="border-b border-gray-100">
                  <td className="py-3 pr-4">
                    <div className="font-medium">{row.full_name}</div>
                    <div className="text-gray-500">{row.contact}</div>
                  </td>
                  <td className="py-3 pr-4">{row.intent}</td>
                  <td className="py-3 pr-4">{row.preferred_project ?? "—"}</td>
                  <td className="py-3 pr-4">
                    <StatusSelect type="tenant-requests" id={row.id} value={row.status} onUpdated={load} />
                  </td>
                  <td className="py-3 text-gray-500">{new Date(row.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.tenantRequests.length === 0 && <p className="text-sm text-gray-500 py-4">No tenant requests yet.</p>}
        </div>
      )}
    </div>
  );
}
