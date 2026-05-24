import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth";
import { ContaForm } from "@/components/admin/ContaForm";

export const dynamic = "force-dynamic";

export default async function ContaPage() {
  const admin = await getAdmin();
  if (!admin) {
    redirect("/admin/login");
  }
  return <ContaForm adminEmail={admin.email} />;
}
