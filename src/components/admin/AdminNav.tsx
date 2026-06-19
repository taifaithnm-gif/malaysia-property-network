"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/admin/operations", label: "Operations" },
  { href: "/admin/crm", label: "Lead CRM" },
  { href: "/admin/listings", label: "Listings" },
];

export function AdminNav() {
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/admin/crm" className="text-lg font-bold text-navy-900">
            MPN Admin
          </Link>
          <nav className="flex gap-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium ${
                  pathname === item.href ? "text-teal-700" : "text-gray-600 hover:text-navy-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <button
          type="button"
          onClick={logout}
          className="text-sm font-medium text-gray-600 hover:text-navy-900"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
