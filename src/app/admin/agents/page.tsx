import { redirect } from "next/navigation";
import { AgentsManager } from "@/components/admin/AgentsManager";
import { isAdminAuthenticated } from "@/lib/admin/auth";

export const metadata = { title: "Agents | MPN Admin" };

export default async function AdminAgentsPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-navy-900 mb-2">Agent CRM</h1>
      <p className="text-sm text-gray-600 mb-6">Manage co-broke agents, commission rates, and project tags.</p>
      <AgentsManager />
    </>
  );
}
