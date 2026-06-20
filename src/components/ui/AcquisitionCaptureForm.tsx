"use client";

import { useState } from "react";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Button } from "@/components/ui/Button";

type AcquisitionCaptureFormProps = {
  dict: Dictionary;
  locale: Locale;
  source: string;
  labels: {
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    submitLabel: string;
    submittingLabel: string;
    successTitle: string;
    successMessage: string;
    downloadLabel?: string;
    downloadHref?: string;
    reportLabel?: string;
    reportHref?: string;
  };
  compact?: boolean;
};

type FormState = "idle" | "submitting" | "success" | "error";

export function AcquisitionCaptureForm({
  dict,
  locale,
  source,
  labels,
  compact = false,
}: AcquisitionCaptureFormProps) {
  const v = dict.leadForm;
  const c = dict.contact;
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setState("submitting");

    const formData = new FormData(e.currentTarget);
    const payload = {
      full_name: (formData.get("full_name") as string).trim(),
      email: (formData.get("email") as string).trim(),
      phone: (formData.get("phone") as string).trim(),
      property_location: null,
      message: null,
      locale,
      source,
    };

    const validationErrors: Record<string, string> = {};
    if (!payload.full_name) validationErrors.full_name = v.nameRequired;
    if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      validationErrors.email = v.emailRequired;
    }
    if (!payload.phone) validationErrors.phone = v.phoneRequired;

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setState("idle");
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submit failed");
      setState("success");
      e.currentTarget.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-xl border border-teal-200 bg-teal-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-navy-900">{labels.successTitle}</h3>
        <p className="mt-2 text-sm text-gray-600">{labels.successMessage}</p>
        <div className="mt-4 flex flex-col gap-2">
          {labels.downloadHref && labels.downloadLabel && (
            <a
              href={labels.downloadHref}
              download
              className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
            >
              {labels.downloadLabel}
            </a>
          )}
          {labels.reportHref && labels.reportLabel && (
            <a
              href={labels.reportHref}
              className="text-sm font-medium text-teal-700 hover:underline"
            >
              {labels.reportLabel} →
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      <Field id="full_name" label={labels.nameLabel} error={errors.full_name} required compact={compact} />
      <Field id="email" label={labels.emailLabel} type="email" error={errors.email} required compact={compact} />
      <Field id="phone" label={labels.phoneLabel} type="tel" error={errors.phone} required compact={compact} />
      {state === "error" && <p className="text-sm text-red-600">{c.errorMessage}</p>}
      <Button type="submit" variant="primary" disabled={state === "submitting"} className="w-full">
        {state === "submitting" ? labels.submittingLabel : labels.submitLabel}
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
  compact,
}: {
  id: string;
  label: string;
  type?: string;
  error?: string;
  required?: boolean;
  compact?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className={`w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 ${compact ? "py-1.5" : "py-2"}`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
