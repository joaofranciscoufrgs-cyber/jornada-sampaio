import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { ensureSchema } from "@/lib/migrate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export type InscricaoRow = {
  id: number;
  nome_completo: string;
  nome_guerra: string;
  cpf: string;
  email: string;
  telefone: string;
  eh_aluno: boolean;
  consentimento: boolean;
  created_at: string;
  rating: number | null;
  comentario: string | null;
  avaliado_em: string | null;
};

export async function GET() {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  await ensureSchema();
  const res = await query<InscricaoRow>(
    `SELECT
       i.id, i.nome_completo, i.nome_guerra, i.cpf, i.email, i.telefone,
       i.eh_aluno, i.consentimento, i.created_at,
       a.rating, a.comentario, a.updated_at AS avaliado_em
     FROM inscricoes i
     LEFT JOIN avaliacoes a ON a.inscricao_id = i.id
     ORDER BY i.created_at DESC`
  );
  return NextResponse.json({ rows: res.rows });
}
