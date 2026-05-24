import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth";
import { UsuariosManager } from "@/components/admin/UsuariosManager";

export const dynamic = "force-dynamic";

export default async function UsuariosPage() {
  const admin = await getAdmin();
  if (!admin) {
    redirect("/admin/login");
  }
  return <UsuariosManager adminEmail={admin.email} />;
}
