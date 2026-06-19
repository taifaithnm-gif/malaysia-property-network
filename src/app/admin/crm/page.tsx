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
      <h1 className="text-2xl font-bold text-navy-900 mb-6">Lead CRM Dashboard</h1>
      <CrmDashboard />
    </>
  );
}
