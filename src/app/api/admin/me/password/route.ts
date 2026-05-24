import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdmin, checkPassword, hashPassword } from "@/lib/auth";
import { query } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  current: z.string().min(1, "Senha atual obrigatória"),
  next: z.string().min(8, "Nova senha deve ter ao menos 8 caracteres").max(120),
});

export async function POST(req: Request) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }

  const res = await query<{ password_hash: string }>(
    "SELECT password_hash FROM admin_users WHERE id = $1",
    [admin.sub]
  );
  if (res.rowCount === 0) {
    return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
  }
  const ok = await checkPassword(parsed.data.current, res.rows[0].password_hash);
  if (!ok) {
    return NextResponse.json({ error: "Senha atual incorreta" }, { status: 401 });
  }
  const newHash = await hashPassword(parsed.data.next);
  await query("UPDATE admin_users SET password_hash = $1 WHERE id = $2", [
    newHash,
    admin.sub,
  ]);
  return NextResponse.json({ ok: true });
}
