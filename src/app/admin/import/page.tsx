import { redirect } from "next/navigation";
import { ImportQueueManager } from "@/components/admin/ImportQueueManager";
import { isAdminAuthenticated } from "@/lib/admin/auth";

export const metadata = { title: "Import Queue | MPN Admin" };

export default async function AdminImportPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-navy-900 mb-2">Property Import Queue</h1>
      <p className="text-sm text-gray-600 mb-6">
        Track listings from PropertyGuru, Facebook, WhatsApp, and agent referrals before publishing.
      </p>
      <ImportQueueManager />
    </>
  );
}
