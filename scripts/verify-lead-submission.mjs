#!/usr/bin/env node
/**
 * Verify lead submission against a running Next.js server.
 * Usage:
 *   npm run dev          # terminal 1
 *   npm run verify:leads # terminal 2
 *
 * Optional env:
 *   VERIFY_BASE_URL=http://localhost:3000
 */

const BASE_URL = process.env.VERIFY_BASE_URL ?? "http://localhost:3000";

const payload = {
  full_name: "Supabase Integration Test",
  email: `test-${Date.now()}@example.com`,
  phone: "60137757058",
  property_location: "Forest City",
  message: "Automated verification script",
  locale: "en",
  source: "verify-script",
};

async function main() {
  console.log(`POST ${BASE_URL}/api/leads`);

  const res = await fetch(`${BASE_URL}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = await res.json().catch(() => ({}));

  console.log("Status:", res.status);
  console.log("Response:", JSON.stringify(body, null, 2));

  if (!res.ok) {
    console.error("\nFAIL — lead submission returned an error.");
    process.exit(1);
  }

  if (body.mode === "logged") {
    console.warn(
      "\nWARN — Supabase env vars not set. Lead was logged only, not saved to DB.",
    );
    console.warn("Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local");
    process.exit(2);
  }

  console.log("\nPASS — lead saved to Supabase.");
  console.log("Confirm in Supabase Dashboard → Table Editor → leads");
}

main().catch((err) => {
  console.error("FAIL — could not reach server:", err.message);
  console.error("Start the dev server: npm run dev");
  process.exit(1);
});
