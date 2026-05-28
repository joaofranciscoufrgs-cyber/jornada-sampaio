import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { getAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { ensureSchema } from "@/lib/migrate";
import { formatCPF, formatPhone } from "@/lib/validations";

type InscricaoRow = {
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

export async function exportInscricoes(format: "csv" | "xlsx") {
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
     ORDER BY i.created_at ASC`
  );

  const data = res.rows.map((r, i) => ({
    "#": i + 1,
    "Nome completo": r.nome_completo || "",
    "Nome de guerra": r.nome_guerra,
    CPF: formatCPF(r.cpf),
    "E-mail": r.email,
    "Telefone / WhatsApp": formatPhone(r.telefone),
    "É aluno?": r.eh_aluno ? "Sim" : "Não",
    "Consentimento LGPD": r.consentimento ? "Sim" : "Não",
    "Inscrito em": new Date(r.created_at).toLocaleString("pt-BR"),
    "Nota": r.rating ?? "",
    "Comentário": r.comentario ?? "",
    "Avaliado em": r.avaliado_em ? new Date(r.avaliado_em).toLocaleString("pt-BR") : "",
  }));

  const filename = `inscricoes-aor2rs-${new Date().toISOString().slice(0, 10)}`;

  if (format === "csv") {
    const ws = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(ws, { FS: ";" });
    return new NextResponse("﻿" + csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}.csv"`,
      },
    });
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  ws["!cols"] = [
    { wch: 4 },  // #
    { wch: 30 }, // Nome completo
    { wch: 22 }, // Nome de guerra
    { wch: 16 }, // CPF
    { wch: 30 }, // E-mail
    { wch: 18 }, // Telefone
    { wch: 10 }, // Aluno?
    { wch: 12 }, // Consentimento
    { wch: 20 }, // Inscrito em
    { wch: 6 },  // Nota
    { wch: 50 }, // Comentário
    { wch: 20 }, // Avaliado em
  ];
  XLSX.utils.book_append_sheet(wb, ws, "Inscrições");
  const buf = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
  return new NextResponse(buf, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}.xlsx"`,
    },
  });
}
