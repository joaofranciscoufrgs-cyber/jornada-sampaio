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
  if (id === admin.sub) {
    return NextResponse.json(
      { error: "Você não pode remover a si mesmo" },
      { status: 400 }
    );
  }
  const count = await query<{ n: string }>("SELECT COUNT(*)::text AS n FROM admin_users");
  if (parseInt(count.rows[0].n, 10) <= 1) {
    return NextResponse.json(
      { error: "Não é possível remover o último administrador" },
      { status: 400 }
    );
  }
  await query("DELETE FROM admin_users WHERE id = $1", [id]);
  return NextResponse.json({ ok: true });
}
