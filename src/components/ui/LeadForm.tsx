"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/constants";
import { Button } from "./Button";

type LeadFormProps = {
  dict: Dictionary;
  locale: Locale;
  source?: string;
};

type FormState = "idle" | "submitting" | "success" | "error";

export function LeadForm({ dict, locale, source = "website" }: LeadFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setState("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

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
    if (!payload.full_name) validationErrors.full_name = dict.leadForm.nameRequired;
    if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      validationErrors.email = dict.leadForm.emailRequired;
    }
    if (!payload.phone) validationErrors.phone = dict.leadForm.phoneRequired;

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
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-xl bg-teal-50 border border-teal-200 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
          <svg className="h-6 w-6 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-navy-900">{dict.contact.successTitle}</h3>
        <p className="mt-2 text-gray-600">{dict.contact.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {state === "error" && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
          {dict.contact.errorMessage}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="full_name"
          label={dict.contact.nameLabel}
          error={errors.full_name}
          required
        />
        <Field
          id="email"
          label={dict.contact.emailLabel}
          type="email"
          error={errors.email}
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="phone"
          label={dict.contact.phoneLabel}
          type="tel"
          error={errors.phone}
          required
        />
        <Field
          id="property_location"
          label={dict.contact.propertyLabel}
          placeholder={dict.contact.propertyPlaceholder}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          {dict.contact.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={dict.contact.messagePlaceholder}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
        />
      </div>

      <Button type="submit" disabled={state === "submitting"} className="w-full sm:w-auto">
        {state === "submitting" ? dict.contact.submitting : dict.common.submitInquiry}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  error,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600/20 ${
          error ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-teal-600"
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
