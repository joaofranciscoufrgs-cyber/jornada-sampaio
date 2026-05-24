"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSocket } from "@/lib/socket-client";
import { formatCPF, formatPhone } from "@/lib/validations";

type Inscricao = {
  id: number;
  nome_guerra: string;
  cpf: string;
  email: string;
  telefone: string;
  consentimento: boolean;
  created_at: string;
};

export function AdminDashboard({ adminEmail }: { adminEmail: string }) {
  const router = useRouter();
  const [rows, setRows] = useState<Inscricao[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await fetch("/api/admin/inscricoes", { cache: "no-store" });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setRows(data.rows || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const s = getSocket();
    s.emit("admin:join");
    const handler = () => load();
    s.on("inscricoes:updated", handler);
    return () => {
      s.emit("admin:leave");
      s.off("inscricoes:updated", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    if (!busca.trim()) return rows;
    const q = busca.toLowerCase();
    return rows.filter(
      (r) =>
        r.nome_guerra.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.cpf.includes(q) ||
        r.telefone.includes(q)
    );
  }, [rows, busca]);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const remove = async (id: number) => {
    if (!confirm("Remover esta inscrição? Esta ação é irreversível (LGPD).")) return;
    const res = await fetch(`/api/admin/inscricoes/${id}`, { method: "DELETE" });
    if (res.ok) load();
  };

  return (
    <main className="min-h-screen p-6 grain">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-6 pb-6 border-b border-sampaio-gold/30">
          <div>
            <p className="text-sampaio-gold/60 text-[10px] md:text-xs uppercase tracking-[0.4em] font-display">
              Painel de Comando · AOR/2-RS
            </p>
            <h1 className="font-display text-2xl md:text-4xl gradient-text">
              Inscrições da Jornada
            </h1>
            <p className="text-sampaio-parchment/60 text-xs mt-1 font-mono break-all">{adminEmail}</p>
          </div>
          <div className="flex flex-col md:items-end gap-3 w-full md:w-auto">
            <nav className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm font-display uppercase tracking-widest">
              <span className="text-sampaio-gold">Inscrições</span>
              <Link href="/admin/usuarios" className="text-sampaio-parchment/70 hover:text-sampaio-gold">
                Usuários
              </Link>
              <Link href="/admin/conta" className="text-sampaio-parchment/70 hover:text-sampaio-gold">
                Conta
              </Link>
              <button
                onClick={logout}
                className="text-sampaio-parchment/60 hover:text-sampaio-blood transition-colors"
              >
                Sair
              </button>
            </nav>
            <div className="flex gap-2 w-full md:w-auto">
              <a
                href="/api/admin/inscricoes.csv"
                className="flex-1 md:flex-none text-center text-xs md:text-sm font-display uppercase tracking-widest border border-sampaio-gold/60 text-sampaio-gold px-3 md:px-4 py-2 rounded hover:bg-sampaio-gold hover:text-sampaio-ink transition-colors"
              >
                Baixar CSV
              </a>
              <a
                href="/api/admin/inscricoes.xlsx"
                className="flex-1 md:flex-none text-center text-xs md:text-sm font-display uppercase tracking-widest border border-sampaio-gold/60 text-sampaio-gold px-3 md:px-4 py-2 rounded hover:bg-sampaio-gold hover:text-sampaio-ink transition-colors"
              >
                Baixar XLSX
              </a>
            </div>
          </div>
        </header>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <Stat label="Inscritos" value={rows.length} highlight />
          <Stat
            label="Última inscrição"
            value={
              rows[0]
                ? new Date(rows[0].created_at).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "—"
            }
          />
          <Stat
            label="Consentimentos"
            value={`${rows.filter((r) => r.consentimento).length} / ${rows.length}`}
          />
        </div>

        <div className="mb-4">
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome, e-mail, CPF, telefone…"
            className="w-full sm:w-96 bg-sampaio-ash border border-sampaio-gold/30 rounded px-4 py-2 text-sampaio-parchment focus:outline-none focus:border-sampaio-gold"
          />
        </div>

        <div className="bg-sampaio-ash border border-sampaio-gold/20 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-sampaio-ink/60 border-b border-sampaio-gold/20">
                <tr className="text-sampaio-gold/80 text-xs uppercase tracking-widest font-display">
                  <th className="text-left px-4 py-3">#</th>
                  <th className="text-left px-4 py-3">Nome de guerra</th>
                  <th className="text-left px-4 py-3">CPF</th>
                  <th className="text-left px-4 py-3">E-mail</th>
                  <th className="text-left px-4 py-3">Telefone</th>
                  <th className="text-left px-4 py-3">Inscrito em</th>
                  <th className="text-right px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-sampaio-parchment/50">
                      Carregando…
                    </td>
                  </tr>
                )}
                {!loading && filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-sampaio-parchment/50 italic">
                      {busca ? "Nenhum resultado." : "Nenhuma inscrição ainda. Aguardando os cadetes…"}
                    </td>
                  </tr>
                )}
                {filtered.map((r, i) => (
                  <tr
                    key={r.id}
                    className="border-b border-sampaio-gold/10 hover:bg-sampaio-ink/30"
                  >
                    <td className="px-4 py-3 text-sampaio-gold/70 font-mono">{i + 1}</td>
                    <td className="px-4 py-3 text-sampaio-parchment font-display">{r.nome_guerra}</td>
                    <td className="px-4 py-3 text-sampaio-parchment/80 font-mono">{formatCPF(r.cpf)}</td>
                    <td className="px-4 py-3 text-sampaio-parchment/80">
                      <a href={`mailto:${r.email}`} className="hover:text-sampaio-gold">
                        {r.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sampaio-parchment/80 font-mono">{formatPhone(r.telefone)}</td>
                    <td className="px-4 py-3 text-sampaio-parchment/60 text-xs font-mono">
                      {new Date(r.created_at).toLocaleString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => remove(r.id)}
                        className="text-xs text-sampaio-blood/70 hover:text-sampaio-blood uppercase tracking-widest"
                        title="Remover (LGPD)"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-sampaio-parchment/40 mt-6 italic">
          Lista atualizada em tempo real via WebSocket. Os dados pessoais coletados são
          tratados conforme LGPD e devem ser usados apenas para o cadastro associativo.
        </p>
      </div>
    </main>
  );
}

function Stat({ label, value, highlight = false }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className={`p-5 rounded-lg border ${highlight ? "bg-gradient-to-br from-sampaio-gold/15 to-sampaio-blood/15 border-sampaio-gold/50" : "bg-sampaio-ash border-sampaio-gold/20"}`}>
      <div className="text-xs uppercase tracking-widest text-sampaio-gold/70 font-display">{label}</div>
      <div className={`mt-2 font-display ${highlight ? "text-4xl gradient-text" : "text-2xl text-sampaio-parchment"}`}>
        {value}
      </div>
    </div>
  );
}
