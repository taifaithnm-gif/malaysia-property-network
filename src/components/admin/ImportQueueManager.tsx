"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { IMPORT_PLATFORMS, IMPORT_QUEUE_STATUS, PROJECT_TAGS } from "@/lib/admin/acquisition-status";
import type { Agent, PropertyImportQueue } from "@/lib/supabase/types";

type AgentOption = Pick<Agent, "id" | "full_name" | "project_tags">;

const EMPTY = {
  source_url: "",
  source_platform: "PropertyGuru",
  project: "Forest City",
  agent_id: "",
  title: "",
  notes: "",
};

export function ImportQueueManager() {
  const [imports, setImports] = useState<PropertyImportQueue[]>([]);
  const [agents, setAgents] = useState<AgentOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/import");
    if (!res.ok) {
      setError("Failed to load import queue");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setImports(data.imports ?? []);
    setAgents(data.agents ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(
    () => imports.filter((row) => !statusFilter || row.status === statusFilter),
    [imports, statusFilter],
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        agent_id: form.agent_id || null,
      }),
    });
    setSaving(false);
    if (!res.ok) {
      setError("Save failed");
      return;
    }
    setForm(EMPTY);
    load();
  }

  async function patchImport(id: string, updates: Record<string, unknown>) {
    await fetch(`/api/admin/import/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    load();
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <section>
        <h2 className="text-lg font-bold text-navy-900 mb-4">Add to import queue</h2>
        <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-gray-200 bg-white p-6">
          <input
            required
            placeholder="Source URL"
            value={form.source_url}
            onChange={(e) => setForm({ ...form, source_url: e.target.value })}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
          <select
            value={form.source_platform}
            onChange={(e) => setForm({ ...form, source_platform: e.target.value })}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          >
            {IMPORT_PLATFORMS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select
            value={form.project}
            onChange={(e) => setForm({ ...form, project: e.target.value })}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          >
            {PROJECT_TAGS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select
            value={form.agent_id}
            onChange={(e) => setForm({ ...form, agent_id: e.target.value })}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">No agent</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>{a.full_name}</option>
            ))}
          </select>
          <input
            placeholder="Title (optional)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
          <textarea
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={2}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={saving} className="rounded bg-teal-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
            {saving ? "Adding…" : "Add to queue"}
          </button>
        </form>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-navy-900">Queue ({filtered.length})</h2>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          >
            <option value="">All statuses</option>
            {IMPORT_QUEUE_STATUS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : (
          <div className="space-y-3">
            {filtered.map((row) => (
              <div key={row.id} className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="font-semibold text-navy-900 text-sm">{row.title ?? row.project}</p>
                <p className="text-xs text-gray-600 mt-1 truncate">{row.source_url}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {row.source_platform} · {row.project} · {row.status}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {IMPORT_QUEUE_STATUS.filter((s) => s !== row.status).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => patchImport(row.id, { status: s })}
                      className="text-xs text-teal-700 hover:underline"
                    >
                      → {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {filtered.length === 0 && <p className="text-sm text-gray-500">Queue empty.</p>}
          </div>
        )}
      </section>
    </div>
  );
}
