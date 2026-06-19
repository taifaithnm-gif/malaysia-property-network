import { redirect } from "next/navigation";
import { OperationsDashboard } from "@/components/admin/OperationsDashboard";
import { isAdminAuthenticated } from "@/lib/admin/auth";

export const metadata = { title: "Operations | MPN Admin" };

export default async function AdminOperationsPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-navy-900 mb-2">Property Operations Dashboard</h1>
      <p className="text-sm text-gray-600 mb-6">Listings approval, owner/tenant requests, viewings, golf & corporate leads.</p>
      <OperationsDashboard />
    </>
  );
}
