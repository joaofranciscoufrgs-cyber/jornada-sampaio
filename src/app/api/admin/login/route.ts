import { NextResponse } from "next/server";
import { z } from "zod";
import { query } from "@/lib/db";
import { ensureSchema } from "@/lib/migrate";
import { checkPassword, signAdmin, setAdminCookie } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  await ensureSchema();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const { email, password } = parsed.data;
  const res = await query<{ id: number; password_hash: string }>(
    "SELECT id, password_hash FROM admin_users WHERE email = $1",
    [email]
  );
  if (res.rowCount === 0) {
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }
  const user = res.rows[0];
  const ok = await checkPassword(password, user.password_hash);
  if (!ok) {
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  const token = await signAdmin({ sub: user.id, email });
  setAdminCookie(token);
  return NextResponse.json({ ok: true });
}
