"use client";

import { useState } from "react";
import type { Locale } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import type { TravelPackage } from "@/lib/i18n/get-travel-centers";

type CenterInquiryFormProps = {
  locale: Locale;
  apiPath: "/api/golf-travel-inquiries" | "/api/corporate-visit-inquiries";
  labels: Record<string, string>;
  options: TravelPackage[];
  optionLabelKey: "packageType" | "visitType";
  typeField: "package_type" | "visit_type";
  successMessage: string;
};

export function CenterInquiryForm({
  locale,
  apiPath,
  labels,
  options,
  optionLabelKey,
  typeField,
  successMessage,
}: CenterInquiryFormProps) {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    const fd = new FormData(e.currentTarget);
    const payload = {
      full_name: (fd.get("full_name") as string).trim(),
      contact: (fd.get("contact") as string).trim(),
      [typeField]: (fd.get(typeField) as string).trim(),
      ...(typeField === "visit_type" && fd.get("company")
        ? { company: (fd.get("company") as string).trim() || null }
        : {}),
      ...(typeField === "package_type"
        ? { travel_dates: (fd.get("travel_dates") as string).trim() || null }
        : { visit_dates: (fd.get("visit_dates") as string).trim() || null }),
      group_size: fd.get("group_size") ? Number(fd.get("group_size")) : null,
      notes: (fd.get("notes") as string).trim() || null,
      locale,
    };

    try {
      const res = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      setState("success");
      e.currentTarget.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-xl border border-teal-200 bg-teal-50 p-6 text-center">
        <p className="text-sm text-navy-900">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="full_name" required placeholder={labels.name} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
      <input name="contact" required placeholder={labels.contact} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
      {typeField === "visit_type" && (
        <input name="company" placeholder={labels.company} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
      )}
      <select name={typeField} required className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm">
        <option value="">{labels[optionLabelKey]}</option>
        {options.map((o) => (
          <option key={o.id} value={o.type}>{o.title}</option>
        ))}
      </select>
      <input
        name={typeField === "package_type" ? "travel_dates" : "visit_dates"}
        placeholder={labels.dates}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
      />
      <input name="group_size" type="number" min={1} placeholder={labels.groupSize} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
      <textarea name="notes" rows={3} placeholder={labels.notes} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
      {state === "error" && <p className="text-sm text-red-600">Submission failed. Please try WhatsApp.</p>}
      <Button type="submit" variant="primary" disabled={state === "submitting"}>
        {labels.submit}
      </Button>
    </form>
  );
}
