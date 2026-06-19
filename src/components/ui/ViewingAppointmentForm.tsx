"use client";

import { useState } from "react";
import type { Locale } from "@/lib/constants";
import { WHATSAPP_URL, WHATSAPP_NUMBER } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Button } from "@/components/ui/Button";

const PROJECTS = ["Forest City", "R&F Princess Cove", "Danga Bay", "Other"];

type ViewingAppointmentFormProps = {
  locale: Locale;
  dict: Dictionary;
};

type FormState = "idle" | "submitting" | "success" | "error";

export function ViewingAppointmentForm({ locale, dict }: ViewingAppointmentFormProps) {
  const f = dict.viewingForm;
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmationUrl, setConfirmationUrl] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setState("submitting");

    const formData = new FormData(e.currentTarget);
    const payload = {
      full_name: (formData.get("full_name") as string).trim(),
      contact: (formData.get("contact") as string).trim(),
      email: (formData.get("email") as string).trim() || null,
      project: (formData.get("project") as string).trim(),
      preferred_date: (formData.get("preferred_date") as string) || null,
      preferred_time: (formData.get("preferred_time") as string).trim() || null,
      notes: (formData.get("notes") as string).trim() || null,
      locale,
    };

    const validationErrors: Record<string, string> = {};
    if (!payload.full_name) validationErrors.full_name = f.nameRequired;
    if (!payload.contact) validationErrors.contact = f.contactRequired;
    if (!payload.project) validationErrors.project = f.projectRequired;

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setState("idle");
      return;
    }

    try {
      const res = await fetch("/api/viewing-appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      const msg = encodeURIComponent(
        locale === "zh"
          ? `您好，我已预约看楼：${payload.project}，${payload.preferred_date ?? "日期待定"} ${payload.preferred_time ?? ""}。姓名：${payload.full_name}`
          : `Hi, I booked a viewing: ${payload.project}, ${payload.preferred_date ?? "TBD"} ${payload.preferred_time ?? ""}. Name: ${payload.full_name}`,
      );
      setConfirmationUrl(`${WHATSAPP_URL}?text=${msg}`);
      setState("success");
      e.currentTarget.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-xl border border-teal-200 bg-teal-50 p-8 text-center">
        <p className="font-semibold text-navy-900">{f.successTitle}</p>
        <p className="mt-2 text-sm text-gray-600">{f.successDesc}</p>
        {confirmationUrl && (
          <div className="mt-6">
            <Button href={confirmationUrl} variant="primary" className="inline-flex">
              {f.whatsappConfirm}
            </Button>
          </div>
        )}
        <p className="mt-4 text-xs text-gray-500">
          {f.whatsappHint} +{WHATSAPP_NUMBER}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field id="full_name" label={f.nameLabel} error={errors.full_name} required />
      <Field id="contact" label={f.contactLabel} type="tel" error={errors.contact} required />
      <Field id="email" label={f.emailLabel} type="email" error={errors.email} />
      <div>
        <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
          {f.projectLabel} *
        </label>
        <select id="project" name="project" required className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm">
          <option value="">{f.projectPlaceholder}</option>
          {PROJECTS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        {errors.project && <p className="mt-1 text-sm text-red-600">{errors.project}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="preferred_date" label={f.dateLabel} type="date" error={errors.preferred_date} />
        <Field id="preferred_time" label={f.timeLabel} placeholder={f.timePlaceholder} error={errors.preferred_time} />
      </div>
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">{f.notesLabel}</label>
        <textarea id="notes" name="notes" rows={3} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
      </div>
      {state === "error" && <p className="text-sm text-red-600">{f.errorMessage}</p>}
      <Button type="submit" variant="primary" disabled={state === "submitting"}>
        {state === "submitting" ? f.submitting : f.submit}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  error,
  required,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required ? " *" : ""}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
