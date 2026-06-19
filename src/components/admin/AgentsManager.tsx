"use client";

import { useCallback, useEffect, useState } from "react";
import { AGENT_STATUS, PROJECT_TAGS } from "@/lib/admin/acquisition-status";
import type { Agent } from "@/lib/supabase/types";

const EMPTY = {
  full_name: "",
  whatsapp: "",
  email: "",
  agency: "",
  commission_rate_pct: "",
  commission_notes: "",
  project_tags: [] as string[],
  status: "active" as "active" | "inactive",
  notes: "",
};

export function AgentsManager() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/agents");
    if (!res.ok) {
      setError("Failed to load agents");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setAgents(data.agents ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function toggleTag(tag: string) {
    setForm((f) => ({
      ...f,
      project_tags: f.project_tags.includes(tag)
        ? f.project_tags.filter((t) => t !== tag)
        : [...f.project_tags, tag],
    }));
  }

  function startEdit(agent: Agent) {
    setEditingId(agent.id);
    setForm({
      full_name: agent.full_name,
      whatsapp: agent.whatsapp ?? "",
      email: agent.email ?? "",
      agency: agent.agency ?? "",
      commission_rate_pct: agent.commission_rate_pct?.toString() ?? "",
      commission_notes: agent.commission_notes ?? "",
      project_tags: agent.project_tags ?? [],
      status: agent.status === "inactive" ? "inactive" : "active",
      notes: agent.notes ?? "",
    });
  }

  function resetForm() {
    setForm(EMPTY);
    setEditingId(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      commission_rate_pct: form.commission_rate_pct ? Number(form.commission_rate_pct) : null,
    };
    const url = editingId ? `/api/admin/agents/${editingId}` : "/api/admin/agents";
    const res = await fetch(url, {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) {
      setError("Save failed");
      return;
    }
    resetForm();
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this agent?")) return;
    await fetch(`/api/admin/agents/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <section>
        <h2 className="text-lg font-bold text-navy-900 mb-4">{editingId ? "Edit agent" : "New agent"}</h2>
        <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-gray-200 bg-white p-6">
          <input
            required
            placeholder="Full name"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
          <input
            placeholder="WhatsApp"
            value={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
          <input
            placeholder="Agency"
            value={form.agency}
            onChange={(e) => setForm({ ...form, agency: e.target.value })}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              placeholder="Commission %"
              value={form.commission_rate_pct}
              onChange={(e) => setForm({ ...form, commission_rate_pct: e.target.value })}
              className="rounded border border-gray-300 px-3 py-2 text-sm"
            />
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as "active" | "inactive" })}
              className="rounded border border-gray-300 px-3 py-2 text-sm"
            >
              {AGENT_STATUS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <input
            placeholder="Commission notes"
            value={form.commission_notes}
            onChange={(e) => setForm({ ...form, commission_notes: e.target.value })}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
          <div>
            <p className="text-xs font-medium text-gray-600 mb-2">Project tags</p>
            <div className="flex flex-wrap gap-2">
              {PROJECT_TAGS.map((tag) => (
                <label key={tag} className="flex items-center gap-1 text-sm">
                  <input type="checkbox" checked={form.project_tags.includes(tag)} onChange={() => toggleTag(tag)} />
                  {tag}
                </label>
              ))}
            </div>
          </div>
          <textarea
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={2}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="rounded bg-teal-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
              {saving ? "Saving…" : editingId ? "Update" : "Create"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="rounded border border-gray-300 px-4 py-2 text-sm">
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section>
        <h2 className="text-lg font-bold text-navy-900 mb-4">Agents ({agents.length})</h2>
        {loading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : (
          <div className="space-y-3">
            {agents.map((agent) => (
              <div key={agent.id} className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-semibold text-navy-900">
                      {agent.full_name}
                      <span className="ml-2 text-xs text-gray-500">{agent.status}</span>
                    </p>
                    <p className="text-sm text-gray-600">{agent.agency ?? "—"} · {agent.whatsapp ?? "—"}</p>
                    <p className="text-xs text-teal-700 mt-1">
                      Commission: {agent.commission_rate_pct != null ? `${agent.commission_rate_pct}%` : "—"}
                      {agent.project_tags?.length ? ` · ${agent.project_tags.join(", ")}` : ""}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button type="button" onClick={() => startEdit(agent)} className="text-sm text-teal-700 hover:underline">Edit</button>
                    <button type="button" onClick={() => handleDelete(agent.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                  </div>
                </div>
              </div>
            ))}
            {agents.length === 0 && <p className="text-sm text-gray-500">No agents yet.</p>}
          </div>
        )}
      </section>
    </div>
  );
}
