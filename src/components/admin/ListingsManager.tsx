"use client";

import { useCallback, useEffect, useState } from "react";
import type { PropertyListing } from "@/lib/supabase/types";

const EMPTY_FORM = {
  title: "",
  project: "Forest City",
  listing_type: "rent" as "rent" | "sale",
  property_type: "",
  bedrooms: "",
  bathrooms: "",
  size_sqft: "",
  price: "",
  price_label: "",
  currency: "MYR",
  image_url: "",
  description: "",
  is_featured: false,
  status: "draft" as "draft" | "published" | "archived",
  locale: "en" as "en" | "zh",
};

export function ListingsManager() {
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/listings");
    if (!res.ok) {
      setError("Failed to load listings");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setListings(data.listings ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
  }

  function startEdit(listing: PropertyListing) {
    setEditingId(listing.id);
    setForm({
      title: listing.title,
      project: listing.project,
      listing_type: listing.listing_type as "rent" | "sale",
      property_type: listing.property_type ?? "",
      bedrooms: listing.bedrooms?.toString() ?? "",
      bathrooms: listing.bathrooms?.toString() ?? "",
      size_sqft: listing.size_sqft?.toString() ?? "",
      price: listing.price?.toString() ?? "",
      price_label: listing.price_label ?? "",
      currency: listing.currency,
      image_url: listing.image_url ?? "",
      description: listing.description ?? "",
      is_featured: listing.is_featured,
      status: listing.status as "draft" | "published" | "archived",
      locale: listing.locale as "en" | "zh",
    });
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    setUploading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Upload failed");
      return;
    }

    const data = await res.json();
    setForm((f) => ({ ...f, image_url: data.url }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
      size_sqft: form.size_sqft ? Number(form.size_sqft) : null,
      price: form.price ? Number(form.price) : null,
      property_type: form.property_type || null,
      price_label: form.price_label || null,
      image_url: form.image_url || null,
      description: form.description || null,
    };

    const url = editingId ? `/api/admin/listings/${editingId}` : "/api/admin/listings";
    const method = editingId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Save failed");
      return;
    }

    resetForm();
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this listing?")) return;
    const res = await fetch(`/api/admin/listings/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Delete failed");
      return;
    }
    if (editingId === id) resetForm();
    load();
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <section>
        <h2 className="text-lg font-bold text-navy-900 mb-4">
          {editingId ? "Edit listing" : "New listing"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-gray-200 bg-white p-6">
          <input
            required
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
          <select
            value={form.project}
            onChange={(e) => setForm({ ...form, project: e.target.value })}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          >
            <option>Forest City</option>
            <option>R&F Princess Cove</option>
            <option>Danga Bay</option>
            <option>Other</option>
          </select>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={form.listing_type}
              onChange={(e) => setForm({ ...form, listing_type: e.target.value as "rent" | "sale" })}
              className="rounded border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </select>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as typeof form.status })}
              className="rounded border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <input placeholder="Beds" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} className="rounded border border-gray-300 px-3 py-2 text-sm" />
            <input placeholder="Baths" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} className="rounded border border-gray-300 px-3 py-2 text-sm" />
            <input placeholder="Sqft" value={form.size_sqft} onChange={(e) => setForm({ ...form, size_sqft: e.target.value })} className="rounded border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <input placeholder="Price (MYR)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full rounded border border-gray-300 px-3 py-2 text-sm" />
          <input placeholder="Price label (optional)" value={form.price_label} onChange={(e) => setForm({ ...form, price_label: e.target.value })} className="w-full rounded border border-gray-300 px-3 py-2 text-sm" />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded border border-gray-300 px-3 py-2 text-sm" />
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Image upload</label>
            <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="text-sm" />
            {uploading && <p className="text-xs text-gray-500 mt-1">Uploading…</p>}
            {form.image_url && (
              <div className="mt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.image_url} alt="Preview" className="h-24 rounded object-cover" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <select value={form.locale} onChange={(e) => setForm({ ...form, locale: e.target.value as "en" | "zh" })} className="rounded border border-gray-300 px-3 py-2 text-sm">
              <option value="en">EN</option>
              <option value="zh">ZH</option>
            </select>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} />
              Featured
            </label>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="rounded bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-50">
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
        <h2 className="text-lg font-bold text-navy-900 mb-4">All listings ({listings.length})</h2>
        {loading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : (
          <div className="space-y-3">
            {listings.map((listing) => (
              <div key={listing.id} className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-navy-900">{listing.title}</p>
                    <p className="text-sm text-gray-600">
                      {listing.project} · {listing.listing_type} · {listing.status} · {listing.locale}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button type="button" onClick={() => startEdit(listing)} className="text-sm text-teal-700 hover:underline">
                      Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(listing.id)} className="text-sm text-red-600 hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {listings.length === 0 && <p className="text-sm text-gray-500">No listings yet.</p>}
          </div>
        )}
      </section>
    </div>
  );
}
