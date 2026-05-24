import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { ensureSchema } from "@/lib/migrate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export type InscricaoRow = {
  id: number;
  nome_guerra: string;
  cpf: string;
  email: string;
  telefone: string;
  consentimento: boolean;
  created_at: string;
};

export async function GET() {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  await ensureSchema();
  const res = await query<InscricaoRow>(
    `SELECT id, nome_guerra, cpf, email, telefone, consentimento, created_at
     FROM inscricoes ORDER BY created_at DESC`
  );
  return NextResponse.json({ rows: res.rows });
}
