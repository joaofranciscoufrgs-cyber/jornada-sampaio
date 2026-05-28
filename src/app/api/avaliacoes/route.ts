import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ensureSchema } from "@/lib/migrate";
import { avaliacaoSchema } from "@/lib/validations";
import { getInscrito } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const inscrito = await getInscrito();
  if (!inscrito) {
    return NextResponse.json({ avaliacao: null });
  }
  await ensureSchema();
  const res = await query<{ rating: number; comentario: string }>(
    "SELECT rating, comentario FROM avaliacoes WHERE inscricao_id = $1",
    [inscrito.sub]
  );
  return NextResponse.json({ avaliacao: res.rows[0] ?? null });
}

export async function POST(req: Request) {
  const inscrito = await getInscrito();
  if (!inscrito) {
    return NextResponse.json(
      { error: "Você precisa estar inscrito para avaliar." },
      { status: 401 }
    );
  }
  await ensureSchema();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const parsed = avaliacaoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Dados inválidos" },
      { status: 400 }
    );
  }
  const { rating, comentario } = parsed.data;

  try {
    await query(
      `INSERT INTO avaliacoes (inscricao_id, rating, comentario)
       VALUES ($1, $2, $3)
       ON CONFLICT (inscricao_id) DO UPDATE
         SET rating = EXCLUDED.rating,
             comentario = EXCLUDED.comentario,
             updated_at = now()`,
      [inscrito.sub, rating, comentario]
    );
    if (global.__sampaioInscricoesNotify) global.__sampaioInscricoesNotify();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[avaliacoes POST]", err);
    return NextResponse.json({ error: "Erro ao salvar avaliação." }, { status: 500 });
  }
}
