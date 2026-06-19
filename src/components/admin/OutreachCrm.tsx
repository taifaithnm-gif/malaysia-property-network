"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AGENT_CONTACT_STATUS,
  CO_BROKE_DEAL_STATUS,
  OWNER_OUTREACH_STATUS,
  PROJECT_TAGS,
} from "@/lib/admin/acquisition-status";
import type { Agent, CoBrokeDeal, OutreachFollowUpLog, OwnerPropertySubmission } from "@/lib/supabase/types";

type OutreachData = {
  owners: OwnerPropertySubmission[];
  agents: Agent[];
  deals: CoBrokeDeal[];
  logs: OutreachFollowUpLog[];
};

export function OutreachCrm() {
  const [data, setData] = useState<OutreachData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"owners" | "cobroke">("owners");
  const [selectedOwner, setSelectedOwner] = useState<string | null>(null);
  const [logNote, setLogNote] = useState("");
  const [logDate, setLogDate] = useState("");
  const [dealForm, setDealForm] = useState({
    project: "Forest City",
    source_agent_id: "",
    viewing_agent_id: "",
    commission_pct: "",
    commission_amount: "",
    deal_status: "prospect",
    notes: "",
  });

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/outreach");
    if (res.ok) setData(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const logsByOwner = useMemo(() => {
    const map: Record<string, OutreachFollowUpLog[]> = {};
    for (const log of data?.logs ?? []) {
      (map[log.owner_submission_id] ??= []).push(log);
    }
    return map;
  }, [data?.logs]);

  const agentName = (id: string | null) =>
    data?.agents.find((a) => a.id === id)?.full_name ?? "—";

  async function patchOwner(id: string, updates: Record<string, unknown>) {
    await fetch(`/api/admin/outreach/owners/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    load();
  }

  async function addLog(ownerId: string) {
    if (!logNote.trim()) return;
    await fetch(`/api/admin/outreach/owners/${ownerId}/logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note: logNote, follow_up_date: logDate || null }),
    });
    setLogNote("");
    setLogDate("");
    load();
  }

  async function createDeal(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/co-broke", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...dealForm,
        source_agent_id: dealForm.source_agent_id || null,
        viewing_agent_id: dealForm.viewing_agent_id || null,
        commission_pct: dealForm.commission_pct ? Number(dealForm.commission_pct) : null,
        commission_amount: dealForm.commission_amount ? Number(dealForm.commission_amount) : null,
      }),
    });
    setDealForm({
      project: "Forest City",
      source_agent_id: "",
      viewing_agent_id: "",
      commission_pct: "",
      commission_amount: "",
      deal_status: "prospect",
      notes: "",
    });
    load();
  }

  async function patchDeal(id: string, deal_status: string) {
    await fetch(`/api/admin/co-broke/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deal_status }),
    });
    load();
  }

  if (loading) return <p className="text-sm text-gray-500">Loading outreach…</p>;
  if (!data) return <p className="text-sm text-red-600">Failed to load.</p>;

  return (
    <div>
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {(["owners", "cobroke"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
              tab === t ? "border-teal-700 text-teal-700" : "border-transparent text-gray-600"
            }`}
          >
            {t === "owners" ? `Owner outreach (${data.owners.length})` : `Co-broke (${data.deals.length})`}
          </button>
        ))}
      </div>

      {tab === "owners" && (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-600">
                  <th className="py-2 pr-2">Owner</th>
                  <th className="py-2 pr-2">Project</th>
                  <th className="py-2 pr-2">Owner status</th>
                  <th className="py-2 pr-2">Agent status</th>
                  <th className="py-2">Agent</th>
                </tr>
              </thead>
              <tbody>
                {data.owners.map((owner) => (
                  <tr
                    key={owner.id}
                    className={`border-b border-gray-100 cursor-pointer ${selectedOwner === owner.id ? "bg-teal-50" : ""}`}
                    onClick={() => setSelectedOwner(owner.id)}
                  >
                    <td className="py-2 pr-2">
                      <div className="font-medium">{owner.owner_name}</div>
                      <div className="text-xs text-gray-500">{owner.whatsapp}</div>
                    </td>
                    <td className="py-2 pr-2">{owner.project}</td>
                    <td className="py-2 pr-2">
                      <select
                        value={owner.owner_outreach_status ?? "new"}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => patchOwner(owner.id, { owner_outreach_status: e.target.value })}
                        className="rounded border border-gray-300 px-1 py-0.5 text-xs"
                      >
                        {OWNER_OUTREACH_STATUS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 pr-2">
                      <select
                        value={owner.agent_contact_status ?? "not_contacted"}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => patchOwner(owner.id, { agent_contact_status: e.target.value })}
                        className="rounded border border-gray-300 px-1 py-0.5 text-xs"
                      >
                        {AGENT_CONTACT_STATUS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2">
                      <select
                        value={owner.assigned_agent_id ?? ""}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => patchOwner(owner.id, { assigned_agent_id: e.target.value || null })}
                        className="rounded border border-gray-300 px-1 py-0.5 text-xs max-w-[120px]"
                      >
                        <option value="">—</option>
                        {data.agents.map((a) => (
                          <option key={a.id} value={a.id}>{a.full_name}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <h3 className="font-semibold text-navy-900 mb-3">Follow-up log</h3>
            {!selectedOwner ? (
              <p className="text-sm text-gray-500">Select an owner row to view logs.</p>
            ) : (
              <>
                <ul className="space-y-2 mb-4 max-h-48 overflow-y-auto text-sm">
                  {(logsByOwner[selectedOwner] ?? []).map((log) => (
                    <li key={log.id} className="border-b border-gray-100 pb-2">
                      <p className="text-gray-800">{log.note}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(log.created_at).toLocaleDateString()}
                        {log.follow_up_date ? ` · Follow-up: ${log.follow_up_date}` : ""}
                        {log.agent_id ? ` · ${agentName(log.agent_id)}` : ""}
                      </p>
                    </li>
                  ))}
                  {(logsByOwner[selectedOwner] ?? []).length === 0 && (
                    <p className="text-sm text-gray-500">No logs yet.</p>
                  )}
                </ul>
                <textarea
                  value={logNote}
                  onChange={(e) => setLogNote(e.target.value)}
                  placeholder="Follow-up note…"
                  rows={2}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm mb-2"
                />
                <input
                  type="date"
                  value={logDate}
                  onChange={(e) => setLogDate(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm mb-2"
                />
                <button
                  type="button"
                  onClick={() => addLog(selectedOwner)}
                  className="rounded bg-teal-700 px-3 py-1.5 text-sm text-white"
                >
                  Add log
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {tab === "cobroke" && (
        <div className="grid gap-8 lg:grid-cols-2">
          <form onSubmit={createDeal} className="space-y-3 rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="font-semibold text-navy-900">New co-broke deal</h3>
            <select
              value={dealForm.project}
              onChange={(e) => setDealForm({ ...dealForm, project: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            >
              {PROJECT_TAGS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <select
              value={dealForm.source_agent_id}
              onChange={(e) => setDealForm({ ...dealForm, source_agent_id: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">Source agent</option>
              {data.agents.map((a) => (
                <option key={a.id} value={a.id}>{a.full_name}</option>
              ))}
            </select>
            <select
              value={dealForm.viewing_agent_id}
              onChange={(e) => setDealForm({ ...dealForm, viewing_agent_id: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">Viewing agent</option>
              {data.agents.map((a) => (
                <option key={a.id} value={a.id}>{a.full_name}</option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <input
                placeholder="Commission %"
                value={dealForm.commission_pct}
                onChange={(e) => setDealForm({ ...dealForm, commission_pct: e.target.value })}
                className="rounded border border-gray-300 px-3 py-2 text-sm"
              />
              <input
                placeholder="Commission MYR"
                value={dealForm.commission_amount}
                onChange={(e) => setDealForm({ ...dealForm, commission_amount: e.target.value })}
                className="rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <textarea
              placeholder="Notes"
              value={dealForm.notes}
              onChange={(e) => setDealForm({ ...dealForm, notes: e.target.value })}
              rows={2}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
            <button type="submit" className="rounded bg-teal-700 px-4 py-2 text-sm font-semibold text-white">
              Create deal
            </button>
          </form>

          <div className="space-y-3">
            {data.deals.map((deal) => (
              <div key={deal.id} className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="font-semibold text-navy-900">{deal.project}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Source: {agentName(deal.source_agent_id)} · Viewing: {agentName(deal.viewing_agent_id)}
                </p>
                <p className="text-sm text-gray-600">
                  Commission: {deal.commission_pct != null ? `${deal.commission_pct}%` : "—"}
                  {deal.commission_amount != null ? ` · RM ${deal.commission_amount}` : ""}
                </p>
                <select
                  value={deal.deal_status}
                  onChange={(e) => patchDeal(deal.id, e.target.value)}
                  className="mt-2 rounded border border-gray-300 px-2 py-1 text-sm"
                >
                  {CO_BROKE_DEAL_STATUS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            ))}
            {data.deals.length === 0 && <p className="text-sm text-gray-500">No co-broke deals yet.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
