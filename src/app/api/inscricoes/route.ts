import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ensureSchema } from "@/lib/migrate";
import { inscricaoSchema } from "@/lib/validations";
import { signInscrito, setInscritoCookie } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  await ensureSchema();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = inscricaoSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message || "Dados inválidos", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || null;
  const ua = req.headers.get("user-agent") || null;

  try {
    const inserted = await query<{ id: number; nome_guerra: string }>(
      `INSERT INTO inscricoes
         (nome_guerra, cpf, email, telefone, consentimento, ip, user_agent)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING id, nome_guerra`,
      [
        data.nome_guerra,
        data.cpf,
        data.email,
        data.telefone,
        data.consentimento,
        ip,
        ua,
      ]
    );
    const row = inserted.rows[0];
    const token = await signInscrito({ sub: row.id, nome_guerra: row.nome_guerra });
    setInscritoCookie(token);

    // notify host panel listeners via global event bus
    if (global.__sampaioInscricoesNotify) {
      global.__sampaioInscricoesNotify();
    }

    return NextResponse.json({ ok: true, id: row.id });
  } catch (err) {
    const msg = (err as { code?: string; message?: string }).code === "23505"
      ? "Este CPF já está inscrito."
      : "Erro ao salvar. Tente novamente.";
    console.error("[inscricoes POST]", err);
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
