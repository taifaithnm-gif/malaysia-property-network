"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  CorporateVisitInquiry,
  GolfTravelInquiry,
  OwnerPropertySubmission,
  PropertyListing,
  TenantRequest,
  ViewingAppointment,
} from "@/lib/supabase/types";
import { OPERATIONS_STATUS, OPERATIONS_TEAMS } from "@/lib/admin/teams";

type OpsData = {
  listings: PropertyListing[];
  ownerSubmissions: OwnerPropertySubmission[];
  tenantRequests: TenantRequest[];
  viewingAppointments: ViewingAppointment[];
  golfTravelInquiries: GolfTravelInquiry[];
  corporateVisitInquiries: CorporateVisitInquiry[];
};

type Tab = "listings" | "owners" | "tenants" | "viewings" | "golf" | "corporate";

async function patchOps(type: string, id: string, body: Record<string, unknown>) {
  await fetch(`/api/admin/operations/${type}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function OperationsDashboard() {
  const [data, setData] = useState<OpsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("listings");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/operations");
    if (!res.ok) {
      setError("Failed to load operations data");
      setLoading(false);
      return;
    }
    setData(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <p className="text-sm text-gray-500">Loading operations…</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!data) return null;

  const pendingListings = data.listings.filter((l) => l.status === "draft");

  const tabs: { id: Tab; label: string }[] = [
    { id: "listings", label: `Listings (${pendingListings.length} pending)` },
    { id: "owners", label: `Owners (${data.ownerSubmissions.length})` },
    { id: "tenants", label: `Tenants (${data.tenantRequests.length})` },
    { id: "viewings", label: `Viewings (${data.viewingAppointments.length})` },
    { id: "golf", label: `Golf (${data.golfTravelInquiries.length})` },
    { id: "corporate", label: `Corporate (${data.corporateVisitInquiries.length})` },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
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

      {tab === "listings" && (
        <div className="space-y-4">
          <h3 className="font-semibold text-navy-900">Listing approval queue</h3>
          {pendingListings.length === 0 && <p className="text-sm text-gray-500">No draft listings pending approval.</p>}
          {pendingListings.map((listing) => (
            <div key={listing.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div>
                <p className="font-medium text-navy-900">{listing.title}</p>
                <p className="text-sm text-gray-600">{listing.project} · {listing.listing_type} · {listing.locale}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={async () => { await patchOps("listings", listing.id, { status: "published" }); load(); }}
                  className="rounded bg-teal-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-teal-800"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={async () => { await patchOps("listings", listing.id, { status: "archived" }); load(); }}
                  className="rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
          <h3 className="font-semibold text-navy-900 pt-4">All listings ({data.listings.length})</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-600">
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2">Project</th>
                </tr>
              </thead>
              <tbody>
                {data.listings.map((l) => (
                  <tr key={l.id} className="border-b border-gray-100">
                    <td className="py-2 pr-4">{l.title}</td>
                    <td className="py-2 pr-4">
                      <select
                        value={l.status}
                        onChange={async (e) => { await patchOps("listings", l.id, { status: e.target.value }); load(); }}
                        className="rounded border border-gray-300 px-2 py-1 text-xs"
                      >
                        <option value="draft">draft</option>
                        <option value="published">published</option>
                        <option value="archived">archived</option>
                      </select>
                    </td>
                    <td className="py-2">{l.project}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "owners" && (
        <OpsTable
          rows={data.ownerSubmissions}
          type="owners"
          onUpdated={load}
          columns={[
            { key: "owner_name", label: "Owner" },
            { key: "project", label: "Project", render: (r) => `${r.project} · ${r.unit_type}` },
            { key: "intent", label: "Intent" },
          ]}
        />
      )}

      {tab === "tenants" && (
        <OpsTable
          rows={data.tenantRequests}
          type="tenants"
          onUpdated={load}
          columns={[
            { key: "full_name", label: "Name" },
            { key: "intent", label: "Intent" },
            { key: "preferred_project", label: "Project" },
          ]}
        />
      )}

      {tab === "viewings" && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-600">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Project / Date</th>
                <th className="py-2 pr-4">Team</th>
                <th className="py-2 pr-4">WA Confirmed</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.viewingAppointments.map((v) => (
                <tr key={v.id} className="border-b border-gray-100">
                  <td className="py-3 pr-4">
                    <div className="font-medium">{v.full_name}</div>
                    <div className="text-gray-500">{v.contact}</div>
                  </td>
                  <td className="py-3 pr-4">{v.project}<br /><span className="text-gray-500">{v.preferred_date ?? "—"} {v.preferred_time ?? ""}</span></td>
                  <td className="py-3 pr-4">
                    <select
                      value={v.assigned_team}
                      onChange={async (e) => { await patchOps("viewings", v.id, { assigned_team: e.target.value }); load(); }}
                      className="rounded border border-gray-300 px-2 py-1 text-xs"
                    >
                      {OPERATIONS_TEAMS.map((t) => (
                        <option key={t.id} value={t.id}>{t.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 pr-4">
                    <input
                      type="checkbox"
                      checked={v.whatsapp_confirmed}
                      onChange={async (e) => { await patchOps("viewings", v.id, { whatsapp_confirmed: e.target.checked }); load(); }}
                    />
                  </td>
                  <td className="py-3 pr-4">
                    <StatusSelect type="viewings" id={v.id} value={v.status} onUpdated={load} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.viewingAppointments.length === 0 && <p className="text-sm text-gray-500 py-4">No viewing appointments yet.</p>}
        </div>
      )}

      {tab === "golf" && (
        <InquiryTable rows={data.golfTravelInquiries} type="golf" onUpdated={load} typeLabel="package_type" />
      )}

      {tab === "corporate" && (
        <InquiryTable rows={data.corporateVisitInquiries} type="corporate" onUpdated={load} typeLabel="visit_type" />
      )}
    </div>
  );
}

function StatusSelect({ type, id, value, onUpdated }: { type: string; id: string; value: string; onUpdated: () => void }) {
  const [status, setStatus] = useState(value);
  return (
    <select
      value={status}
      onChange={async (e) => {
        setStatus(e.target.value);
        await patchOps(type, id, { status: e.target.value });
        onUpdated();
      }}
      className="rounded border border-gray-300 px-2 py-1 text-xs"
    >
      {OPERATIONS_STATUS.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}

function OpsTable({
  rows,
  type,
  onUpdated,
  columns,
}: {
  rows: Record<string, unknown>[];
  type: string;
  onUpdated: () => void;
  columns: { key: string; label: string; render?: (r: Record<string, unknown>) => string }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b text-left text-gray-600">
            {columns.map((c) => <th key={c.key} className="py-2 pr-4">{c.label}</th>)}
            <th className="py-2 pr-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={String(row.id)} className="border-b border-gray-100">
              {columns.map((c) => (
                <td key={c.key} className="py-3 pr-4">{c.render ? c.render(row) : String(row[c.key] ?? "—")}</td>
              ))}
              <td className="py-3 pr-4">
                <StatusSelect type={type} id={String(row.id)} value={String(row.status)} onUpdated={onUpdated} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p className="text-sm text-gray-500 py-4">No records yet.</p>}
    </div>
  );
}

function InquiryTable({
  rows,
  type,
  onUpdated,
  typeLabel,
}: {
  rows: { id: string; full_name: string; contact: string; status: string; [key: string]: unknown }[];
  type: string;
  onUpdated: () => void;
  typeLabel: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b text-left text-gray-600">
            <th className="py-2 pr-4">Name</th>
            <th className="py-2 pr-4">Type</th>
            <th className="py-2 pr-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-gray-100">
              <td className="py-3 pr-4">
                <div className="font-medium">{row.full_name}</div>
                <div className="text-gray-500">{row.contact}</div>
              </td>
              <td className="py-3 pr-4">{String(row[typeLabel] ?? "—")}</td>
              <td className="py-3 pr-4">
                <StatusSelect type={type} id={row.id} value={row.status} onUpdated={onUpdated} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p className="text-sm text-gray-500 py-4">No inquiries yet.</p>}
    </div>
  );
}
