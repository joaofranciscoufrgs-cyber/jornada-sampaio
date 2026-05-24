"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type AdminUserRow = {
  id: number;
  email: string;
  nome: string | null;
  created_at: string;
};

export function UsuariosManager({ adminEmail }: { adminEmail: string }) {
  const [rows, setRows] = useState<AdminUserRow[]>([]);
  const [meId, setMeId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creating, setCreating] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);

  const load = async () => {
    const res = await fetch("/api/admin/users", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setRows(data.rows || []);
      setMeId(data.me);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setCreating(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ nome, email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Falha ao criar usuário");
      }
      setFeedback({ kind: "ok", msg: `Usuário '${email}' criado.` });
      setNome("");
      setEmail("");
      setPassword("");
      load();
    } catch (e) {
      setFeedback({ kind: "err", msg: (e as Error).message });
    } finally {
      setCreating(false);
    }
  };

  const remove = async (id: number, email: string) => {
    if (!confirm(`Remover o administrador ${email}?`)) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    if (res.ok) {
      load();
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data?.error || "Falha ao remover");
    }
  };

  return (
    <main className="min-h-screen p-6 grain">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-end gap-4 mb-8 pb-6 border-b border-sampaio-gold/30">
          <div>
            <p className="text-sampaio-gold/60 text-xs uppercase tracking-[0.4em] font-display">
              Painel · AOR/2-RS
            </p>
            <h1 className="font-display text-3xl gradient-text">Administradores</h1>
            <p className="text-sampaio-parchment/60 text-xs mt-1 font-mono">{adminEmail}</p>
          </div>
          <nav className="flex gap-4 text-sm font-display uppercase tracking-widest">
            <Link href="/admin" className="text-sampaio-parchment/70 hover:text-sampaio-gold">
              Inscrições
            </Link>
            <span className="text-sampaio-gold">Usuários</span>
            <Link href="/admin/conta" className="text-sampaio-parchment/70 hover:text-sampaio-gold">
              Conta
            </Link>
          </nav>
        </header>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
          <section>
            <h2 className="font-display text-xl text-sampaio-gold mb-4 uppercase tracking-wider">
              {loading ? "…" : `${rows.length}`} administrador(es)
            </h2>
            <div className="bg-sampaio-ash border border-sampaio-gold/20 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-sampaio-ink/60 border-b border-sampaio-gold/20">
                  <tr className="text-sampaio-gold/80 text-xs uppercase tracking-widest font-display">
                    <th className="text-left px-4 py-3">Nome</th>
                    <th className="text-left px-4 py-3">E-mail</th>
                    <th className="text-left px-4 py-3">Desde</th>
                    <th className="text-right px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan={4} className="text-center py-6 text-sampaio-parchment/50">
                        Carregando…
                      </td>
                    </tr>
                  )}
                  {!loading && rows.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-sampaio-gold/10 hover:bg-sampaio-ink/30"
                    >
                      <td className="px-4 py-3 text-sampaio-parchment font-display">
                        {r.nome || "—"}
                        {r.id === meId && (
                          <span className="ml-2 text-xs text-sampaio-gold/70 uppercase tracking-widest">(você)</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sampaio-parchment/80">{r.email}</td>
                      <td className="px-4 py-3 text-sampaio-parchment/50 text-xs font-mono">
                        {new Date(r.created_at).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {r.id !== meId && (
                          <button
                            onClick={() => remove(r.id, r.email)}
                            className="text-xs text-sampaio-blood/70 hover:text-sampaio-blood uppercase tracking-widest"
                          >
                            Remover
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-sampaio-parchment/40 italic mt-4">
              O sistema impede a remoção do último administrador para evitar bloqueio do acesso.
            </p>
          </section>

          <aside>
            <h2 className="font-display text-xl text-sampaio-gold mb-4 uppercase tracking-wider">
              Adicionar
            </h2>
            <form
              onSubmit={create}
              className="bg-sampaio-ash border border-sampaio-gold/30 rounded-lg p-6 space-y-4"
            >
              <label className="block">
                <span className="block text-xs uppercase tracking-widest text-sampaio-gold/80 font-display mb-2">
                  Nome
                </span>
                <input
                  type="text"
                  required
                  maxLength={80}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-sampaio-ink border border-sampaio-gold/40 rounded px-4 py-3 text-sampaio-parchment focus:outline-none focus:border-sampaio-gold"
                />
              </label>

              <label className="block">
                <span className="block text-xs uppercase tracking-widest text-sampaio-gold/80 font-display mb-2">
                  E-mail
                </span>
                <input
                  type="email"
                  required
                  maxLength={120}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-sampaio-ink border border-sampaio-gold/40 rounded px-4 py-3 text-sampaio-parchment focus:outline-none focus:border-sampaio-gold"
                />
              </label>

              <label className="block">
                <span className="block text-xs uppercase tracking-widest text-sampaio-gold/80 font-display mb-2">
                  Senha inicial
                </span>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-sampaio-ink border border-sampaio-gold/40 rounded px-4 py-3 text-sampaio-parchment focus:outline-none focus:border-sampaio-gold"
                />
                <p className="text-xs text-sampaio-parchment/40 mt-1">
                  Mínimo 8 caracteres. O usuário pode trocar depois em /admin/conta.
                </p>
              </label>

              {feedback && (
                <div
                  className={`text-sm rounded p-3 border ${
                    feedback.kind === "ok"
                      ? "text-emerald-300 bg-emerald-900/30 border-emerald-700/50"
                      : "text-sampaio-blood bg-sampaio-blood/10 border-sampaio-blood/30"
                  }`}
                >
                  {feedback.msg}
                </div>
              )}

              <button
                type="submit"
                disabled={creating}
                className="w-full bg-sampaio-gold text-sampaio-ink font-display uppercase tracking-widest py-3 rounded hover:bg-sampaio-parchment transition-colors disabled:opacity-50"
              >
                {creating ? "Criando…" : "Criar administrador"}
              </button>
            </form>
          </aside>
        </div>
      </div>
    </main>
  );
}
