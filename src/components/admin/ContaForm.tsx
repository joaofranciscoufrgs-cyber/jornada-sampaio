"use client";
import { useState } from "react";
import Link from "next/link";

export function ContaForm({ adminEmail }: { adminEmail: string }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    if (next !== confirm) {
      setFeedback({ kind: "err", msg: "A nova senha e a confirmação não conferem." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/me/password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ current, next }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Falha ao trocar senha");
      }
      setFeedback({ kind: "ok", msg: "Senha alterada com sucesso." });
      setCurrent("");
      setNext("");
      setConfirm("");
    } catch (e) {
      setFeedback({ kind: "err", msg: (e as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 grain">
      <div className="max-w-3xl mx-auto">
        <header className="flex justify-between items-end gap-4 mb-8 pb-6 border-b border-sampaio-gold/30">
          <div>
            <p className="text-sampaio-gold/60 text-xs uppercase tracking-[0.4em] font-display">
              Painel · AOR/2-RS
            </p>
            <h1 className="font-display text-3xl gradient-text">Minha conta</h1>
            <p className="text-sampaio-parchment/60 text-xs mt-1 font-mono">{adminEmail}</p>
          </div>
          <nav className="flex gap-4 text-sm font-display uppercase tracking-widest">
            <Link href="/admin" className="text-sampaio-parchment/70 hover:text-sampaio-gold">
              Inscrições
            </Link>
            <Link href="/admin/usuarios" className="text-sampaio-parchment/70 hover:text-sampaio-gold">
              Usuários
            </Link>
            <span className="text-sampaio-gold">Conta</span>
          </nav>
        </header>

        <div className="bg-sampaio-ash border border-sampaio-gold/30 rounded-lg p-8 max-w-md">
          <h2 className="font-display text-xl text-sampaio-parchment mb-6">Trocar senha</h2>

          <form onSubmit={submit} className="space-y-4">
            <Field label="Senha atual">
              <input
                type="password"
                required
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                autoComplete="current-password"
                className="w-full bg-sampaio-ink border border-sampaio-gold/40 rounded px-4 py-3 text-sampaio-parchment focus:outline-none focus:border-sampaio-gold"
              />
            </Field>

            <Field label="Nova senha">
              <input
                type="password"
                required
                minLength={8}
                value={next}
                onChange={(e) => setNext(e.target.value)}
                autoComplete="new-password"
                className="w-full bg-sampaio-ink border border-sampaio-gold/40 rounded px-4 py-3 text-sampaio-parchment focus:outline-none focus:border-sampaio-gold"
              />
              <p className="text-xs text-sampaio-parchment/40 mt-1">Mínimo 8 caracteres</p>
            </Field>

            <Field label="Confirmar nova senha">
              <input
                type="password"
                required
                minLength={8}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
                className="w-full bg-sampaio-ink border border-sampaio-gold/40 rounded px-4 py-3 text-sampaio-parchment focus:outline-none focus:border-sampaio-gold"
              />
            </Field>

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
              disabled={loading}
              className="w-full bg-sampaio-gold text-sampaio-ink font-display uppercase tracking-widest py-3 rounded hover:bg-sampaio-parchment transition-colors disabled:opacity-50"
            >
              {loading ? "Salvando…" : "Trocar senha"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-sampaio-gold/80 font-display mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}
