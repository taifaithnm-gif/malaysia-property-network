"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { LISTING_TAGS, LISTING_TENANT_KEYS, getTenantLabel } from "@/lib/i18n/get-listing-enrichment";
import { getTagLabel } from "@/lib/project-marketplace";

type ListingFiltersProps = {
  locale: Locale;
  dict: Dictionary;
  projects: string[];
};

export function ListingFilters({ locale, dict, projects }: ListingFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const labels = dict.listingBrowse;

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const selectClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-navy-900";

  return (
    <form
      className="mb-10 grid gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy-900">{labels.filterProject}</span>
        <select
          className={selectClass}
          value={searchParams.get("project") ?? ""}
          onChange={(e) => update("project", e.target.value)}
        >
          <option value="">{labels.allProjects}</option>
          {projects.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy-900">{labels.filterType}</span>
        <select
          className={selectClass}
          value={searchParams.get("type") ?? ""}
          onChange={(e) => update("type", e.target.value)}
        >
          <option value="">{labels.allTypes}</option>
          <option value="rent">{labels.rent}</option>
          <option value="sale">{labels.sale}</option>
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy-900">{labels.filterBudgetMin}</span>
        <input
          type="number"
          className={selectClass}
          placeholder="0"
          value={searchParams.get("min") ?? ""}
          onChange={(e) => update("min", e.target.value)}
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy-900">{labels.filterBudgetMax}</span>
        <input
          type="number"
          className={selectClass}
          placeholder="10000"
          value={searchParams.get("max") ?? ""}
          onChange={(e) => update("max", e.target.value)}
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy-900">{labels.filterTag}</span>
        <select
          className={selectClass}
          value={searchParams.get("tag") ?? ""}
          onChange={(e) => update("tag", e.target.value)}
        >
          <option value="">{labels.allTags}</option>
          {LISTING_TAGS.map((tag) => (
            <option key={tag} value={tag}>
              {getTagLabel(tag, locale)}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy-900">{labels.filterTenant}</span>
        <select
          className={selectClass}
          value={searchParams.get("tenant") ?? ""}
          onChange={(e) => update("tenant", e.target.value)}
        >
          <option value="">{labels.allTenants}</option>
          {LISTING_TENANT_KEYS.map((t) => (
            <option key={t} value={t}>
              {getTenantLabel(t, locale)}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
}
