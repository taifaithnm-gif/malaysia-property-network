import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin/auth";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin/operations");
  }

  return (
    <div className="mx-auto max-w-md pt-16">
      <h1 className="text-2xl font-bold text-navy-900 mb-2">Admin sign in</h1>
      <p className="text-sm text-gray-600 mb-8">Malaysia Property Network operations dashboard</p>
      {!isAdminConfigured() ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Set <code className="font-mono">ADMIN_PASSWORD</code> in your environment to enable admin access.
        </p>
      ) : (
        <AdminLoginForm />
      )}
    </div>
  );
}
