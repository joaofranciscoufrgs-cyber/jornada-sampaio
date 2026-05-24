"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Falha no login");
      }
      router.push("/admin");
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 grain">
      <div className="absolute inset-0 bg-vignette pointer-events-none" />
      <div className="relative max-w-sm w-full bg-sampaio-ash border border-sampaio-gold/30 rounded-lg p-8 z-10">
        <p className="text-sampaio-gold/60 text-xs uppercase tracking-[0.4em] font-display mb-3 text-center">
          Painel de Comando
        </p>
        <h1 className="font-display text-3xl gradient-text text-center mb-6">
          Acesso restrito
        </h1>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="block text-xs uppercase tracking-widest text-sampaio-gold/80 font-display mb-2">
              E-mail
            </span>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-sampaio-ink border border-sampaio-gold/40 rounded px-4 py-3 text-sampaio-parchment focus:outline-none focus:border-sampaio-gold"
            />
          </label>

          <label className="block">
            <span className="block text-xs uppercase tracking-widest text-sampaio-gold/80 font-display mb-2">
              Senha
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-sampaio-ink border border-sampaio-gold/40 rounded px-4 py-3 text-sampaio-parchment focus:outline-none focus:border-sampaio-gold"
            />
          </label>

          {error && (
            <div className="text-sampaio-blood text-sm bg-sampaio-blood/10 border border-sampaio-blood/30 rounded p-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sampaio-gold text-sampaio-ink font-display uppercase tracking-widest py-3 rounded hover:bg-sampaio-parchment transition-colors disabled:opacity-50"
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}
