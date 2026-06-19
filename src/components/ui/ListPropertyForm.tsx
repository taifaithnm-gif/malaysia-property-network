"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/constants";
import { Button } from "./Button";

type ListPropertyFormProps = {
  dict: Dictionary;
  locale: Locale;
};

type FormState = "idle" | "submitting" | "success" | "error";

const INTENTS = ["rent", "sale", "airbnb", "management"] as const;

export function ListPropertyForm({ dict, locale }: ListPropertyFormProps) {
  const f = dict.listProperty;
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedIntents, setSelectedIntents] = useState<string[]>([]);

  function toggleIntent(intent: string) {
    setSelectedIntents((prev) =>
      prev.includes(intent) ? prev.filter((i) => i !== intent) : [...prev, intent],
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setState("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      owner_name: (formData.get("owner_name") as string).trim(),
      whatsapp: (formData.get("whatsapp") as string).trim(),
      wechat: (formData.get("wechat") as string).trim() || null,
      project: (formData.get("project") as string).trim(),
      unit_type: (formData.get("unit_type") as string).trim(),
      intent: selectedIntents.join(", "),
      notes: (formData.get("notes") as string).trim() || null,
      locale,
    };

    const validationErrors: Record<string, string> = {};
    if (!payload.owner_name) validationErrors.owner_name = f.nameRequired;
    if (!payload.whatsapp) validationErrors.whatsapp = f.whatsappRequired;
    if (!payload.project) validationErrors.project = f.projectRequired;
    if (!payload.unit_type) validationErrors.unit_type = f.unitTypeRequired;
    if (!payload.intent) validationErrors.intent = f.intentRequired;

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setState("idle");
      return;
    }

    try {
      const res = await fetch("/api/owner-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submit failed");
      setState("success");
      form.reset();
      setSelectedIntents([]);
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

      <Field id="owner_name" label={f.nameLabel} error={errors.owner_name} required />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="whatsapp" label={f.whatsappLabel} type="tel" error={errors.whatsapp} required />
        <Field id="wechat" label={f.wechatLabel} error={errors.wechat} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
            {f.projectLabel}<span className="text-red-500 ml-0.5">*</span>
          </label>
          <select
            id="project"
            name="project"
            required
            className={`w-full rounded-lg border px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600/20 ${
              errors.project ? "border-red-400" : "border-gray-300 focus:border-teal-600"
            }`}
          >
            <option value="">{f.projectPlaceholder}</option>
            {f.projectOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.project && <p className="mt-1 text-sm text-red-600">{errors.project}</p>}
        </div>
        <Field id="unit_type" label={f.unitTypeLabel} placeholder={f.unitTypePlaceholder} error={errors.unit_type} required />
      </div>

      <fieldset>
        <legend className="block text-sm font-medium text-gray-700 mb-2">
          {f.intentLabel}<span className="text-red-500 ml-0.5">*</span>
        </legend>
        <div className="flex flex-wrap gap-3">
          {INTENTS.map((intent) => (
            <label key={intent} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm cursor-pointer has-[:checked]:border-teal-600 has-[:checked]:bg-teal-50">
              <input
                type="checkbox"
                checked={selectedIntents.includes(intent)}
                onChange={() => toggleIntent(intent)}
                className="rounded border-gray-300 text-teal-700 focus:ring-teal-600"
              />
              {f.intentOptions[intent]}
            </label>
          ))}
        </div>
        {errors.intent && <p className="mt-1 text-sm text-red-600">{errors.intent}</p>}
      </fieldset>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">{f.notesLabel}</label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder={f.notesPlaceholder}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
        />
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
