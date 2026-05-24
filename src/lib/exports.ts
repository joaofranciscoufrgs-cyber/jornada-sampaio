import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { getAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { ensureSchema } from "@/lib/migrate";
import { formatCPF, formatPhone } from "@/lib/validations";

type InscricaoRow = {
  id: number;
  nome_guerra: string;
  cpf: string;
  email: string;
  telefone: string;
  consentimento: boolean;
  created_at: string;
};

export async function exportInscricoes(format: "csv" | "xlsx") {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  await ensureSchema();
  const res = await query<InscricaoRow>(
    `SELECT id, nome_guerra, cpf, email, telefone, consentimento, created_at
     FROM inscricoes ORDER BY created_at ASC`
  );

  const data = res.rows.map((r, i) => ({
    "#": i + 1,
    "Nome de guerra": r.nome_guerra,
    CPF: formatCPF(r.cpf),
    "E-mail": r.email,
    "Telefone / WhatsApp": formatPhone(r.telefone),
    "Consentimento LGPD": r.consentimento ? "Sim" : "Não",
    "Inscrito em": new Date(r.created_at).toLocaleString("pt-BR"),
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
    { wch: 4 }, { wch: 24 }, { wch: 16 }, { wch: 30 }, { wch: 18 }, { wch: 18 }, { wch: 20 },
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
