import { redirect } from "next/navigation";
import { ListingsManager } from "@/components/admin/ListingsManager";
import { isAdminAuthenticated } from "@/lib/admin/auth";

export const metadata = { title: "Listings | MPN Admin" };

export default async function AdminListingsPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-navy-900 mb-6">Property Listings</h1>
      <ListingsManager />
    </>
  );
}
