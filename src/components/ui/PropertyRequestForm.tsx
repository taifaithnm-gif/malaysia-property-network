"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/constants";
import { Button } from "./Button";

type PropertyRequestFormProps = {
  dict: Dictionary;
  locale: Locale;
};

type FormState = "idle" | "submitting" | "success" | "error";

export function PropertyRequestForm({ dict, locale }: PropertyRequestFormProps) {
  const f = dict.propertyRequest;
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setState("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const intent = formData.get("intent") as string;

    const payload = {
      full_name: (formData.get("full_name") as string).trim(),
      contact: (formData.get("contact") as string).trim(),
      budget: (formData.get("budget") as string).trim() || null,
      intent,
      preferred_project: (formData.get("preferred_project") as string).trim() || null,
      move_in_date: (formData.get("move_in_date") as string) || null,
      locale,
    };

    const validationErrors: Record<string, string> = {};
    if (!payload.full_name) validationErrors.full_name = f.nameRequired;
    if (!payload.contact) validationErrors.contact = f.contactRequired;
    if (!payload.intent) validationErrors.intent = f.intentRequired;

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setState("idle");
      return;
    }

    try {
      const res = await fetch("/api/tenant-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submit failed");
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-xl bg-teal-50 border border-teal-200 p-8 text-center">
        <h3 className="text-xl font-semibold text-navy-900">{f.successTitle}</h3>
        <p className="mt-2 text-gray-600">{f.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {state === "error" && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
          {f.errorMessage}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="full_name" label={f.nameLabel} error={errors.full_name} required />
        <Field id="contact" label={f.contactLabel} type="tel" error={errors.contact} required />
      </div>

      <Field id="budget" label={f.budgetLabel} placeholder={f.budgetPlaceholder} />

      <fieldset>
        <legend className="block text-sm font-medium text-gray-700 mb-2">
          {f.intentLabel}<span className="text-red-500 ml-0.5">*</span>
        </legend>
        <div className="flex gap-4">
          {(["rent", "buy"] as const).map((intent) => (
            <label key={intent} className="inline-flex items-center gap-2 text-sm">
              <input type="radio" name="intent" value={intent} required className="text-teal-700 focus:ring-teal-600" />
              {f.intentOptions[intent]}
            </label>
          ))}
        </div>
        {errors.intent && <p className="mt-1 text-sm text-red-600">{errors.intent}</p>}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="preferred_project" className="block text-sm font-medium text-gray-700 mb-1">
            {f.projectLabel}
          </label>
          <select
            id="preferred_project"
            name="preferred_project"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
          >
            <option value="">{f.projectPlaceholder}</option>
            {f.projectOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <Field id="move_in_date" label={f.moveInLabel} type="date" />
      </div>

      <Button type="submit" disabled={state === "submitting"} className="w-full sm:w-auto">
        {state === "submitting" ? f.submitting : f.submit}
      </Button>
    </form>
  );
}

function Field({
  id, label, type = "text", placeholder, error, required,
}: {
  id: string; label: string; type?: string; placeholder?: string; error?: string; required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600/20 ${
          error ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-teal-600"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
