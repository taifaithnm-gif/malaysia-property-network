import { redirect } from "next/navigation";
import { CrmDashboard } from "@/components/admin/CrmDashboard";
import { isAdminAuthenticated } from "@/lib/admin/auth";

export const metadata = { title: "Lead CRM | MPN Admin" };

export default async function AdminCrmPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-navy-900 mb-2">Lead Center & CRM</h1>
      <p className="text-sm text-gray-600 mb-6">
        Track website leads, owner submissions, tenant requests, and viewing appointments.
      </p>
      <CrmDashboard />
    </>
  );
}
