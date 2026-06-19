import { redirect } from "next/navigation";
import { OutreachCrm } from "@/components/admin/OutreachCrm";
import { isAdminAuthenticated } from "@/lib/admin/auth";

export const metadata = { title: "Owner Outreach | MPN Admin" };

export default async function AdminOutreachPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-navy-900 mb-2">Owner Outreach & Co-broke</h1>
      <p className="text-sm text-gray-600 mb-6">
        Owner status, agent contact tracking, follow-up logs, and co-broke commission deals.
      </p>
      <OutreachCrm />
    </>
  );
}
