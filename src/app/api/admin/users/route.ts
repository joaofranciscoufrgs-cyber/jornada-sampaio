import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdmin, hashPassword } from "@/lib/auth";
import { query } from "@/lib/db";
import { ensureSchema } from "@/lib/migrate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export type AdminUserRow = {
  id: number;
  email: string;
  nome: string | null;
  created_at: string;
};

const createSchema = z.object({
  nome: z.string().trim().min(1, "Nome obrigatório").max(80),
  email: z.string().trim().toLowerCase().email("E-mail inválido").max(120),
  password: z.string().min(8, "Senha deve ter ao menos 8 caracteres").max(120),
});

export async function GET() {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  await ensureSchema();
  const res = await query<AdminUserRow>(
    "SELECT id, email, nome, created_at FROM admin_users ORDER BY created_at ASC"
  );
  return NextResponse.json({ rows: res.rows, me: admin.sub });
}

export async function POST(req: Request) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  await ensureSchema();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }

  const { nome, email, password } = parsed.data;
  try {
    const hash = await hashPassword(password);
    const ins = await query<{ id: number }>(
      "INSERT INTO admin_users (email, password_hash, nome) VALUES ($1, $2, $3) RETURNING id",
      [email, hash, nome]
    );
    return NextResponse.json({ ok: true, id: ins.rows[0].id });
  } catch (err) {
    const code = (err as { code?: string }).code;
    if (code === "23505") {
      return NextResponse.json({ error: "Já existe um usuário com este e-mail" }, { status: 400 });
    }
    console.error("[admin users POST]", err);
    return NextResponse.json({ error: "Erro ao criar usuário" }, { status: 500 });
  }
}
