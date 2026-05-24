import { redirect } from "next/navigation";
import { getInscrito } from "@/lib/auth";
import { InscricaoForm } from "@/components/InscricaoForm";

export const dynamic = "force-dynamic";

export default async function InscricaoPage() {
  const inscrito = await getInscrito();
  if (inscrito) {
    redirect("/");
  }
  return <InscricaoForm />;
}
