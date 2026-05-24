import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/auth";
import { query } from "@/lib/db";

export const runtime = "nodejs";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  const id = parseInt(params.id, 10);
  if (!id) {
    return NextResponse.json({ error: "id inválido" }, { status: 400 });
  }
  await query("DELETE FROM inscricoes WHERE id = $1", [id]);
  if (global.__sampaioInscricoesNotify) global.__sampaioInscricoesNotify();
  return NextResponse.json({ ok: true });
}
