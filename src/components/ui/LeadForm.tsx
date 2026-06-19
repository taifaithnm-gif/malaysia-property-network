"use client";

import { useState } from "react";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { Button } from "@/components/ui/Button";

type LeadFormProps = {
  dict: Dictionary;
  locale: Locale;
  source: string;
};

type FormState = "idle" | "submitting" | "success" | "error";

export function LeadForm({ dict, locale, source }: LeadFormProps) {
  const c = dict.contact;
  const v = dict.leadForm;
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
      property_location: (formData.get("property_location") as string).trim() || null,
      message: (formData.get("message") as string).trim() || null,
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
      <div className="rounded-xl border border-teal-200 bg-teal-50 p-8 text-center">
        <h3 className="text-xl font-semibold text-navy-900">{c.successTitle}</h3>
        <p className="mt-2 text-gray-600">{c.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field id="full_name" label={c.nameLabel} error={errors.full_name} required />
      <Field id="email" label={c.emailLabel} type="email" error={errors.email} required />
      <Field id="phone" label={c.phoneLabel} type="tel" error={errors.phone} required />
      <Field
        id="property_location"
        label={c.propertyLabel}
        placeholder={c.propertyPlaceholder}
        error={errors.property_location}
      />
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
          {c.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={c.messagePlaceholder}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>
      {state === "error" && <p className="text-sm text-red-600">{c.errorMessage}</p>}
      <Button type="submit" variant="primary" disabled={state === "submitting"}>
        {state === "submitting" ? c.submitting : dict.common.submitInquiry}
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
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
        {required ? " *" : ""}
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
