"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatCPF, formatPhone } from "@/lib/validations";

export function InscricaoForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome_guerra: "",
    cpf: "",
    email: "",
    telefone: "",
    consentimento: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => {
    setForm((s) => ({ ...s, [k]: v }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/inscricoes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Erro no cadastro");
      }
      router.push("/");
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 grain">
      <div className="absolute inset-0 bg-vignette pointer-events-none" />
      <div className="relative max-w-md w-full bg-sampaio-ash border border-sampaio-gold/30 rounded-lg p-8 z-10">
        <p className="text-sampaio-gold/60 text-xs uppercase tracking-[0.4em] font-display mb-3 text-center">
          AOR/2-RS · Jornada dos Patronos
        </p>
        <h1 className="font-display text-3xl gradient-text text-center mb-2">
          Apresentar-se à Tropa
        </h1>
        <p className="text-sampaio-parchment/60 text-center text-sm mb-6">
          Identifique-se para acompanhar a apresentação
        </p>

        <form onSubmit={submit} className="space-y-4">
          <Field label="Nome de guerra">
            <input
              type="text"
              required
              maxLength={80}
              value={form.nome_guerra}
              onChange={(e) => update("nome_guerra", e.target.value)}
              autoFocus
              className="w-full bg-sampaio-ink border border-sampaio-gold/40 rounded px-4 py-3 text-sampaio-parchment focus:outline-none focus:border-sampaio-gold"
            />
          </Field>

          <Field label="CPF">
            <input
              inputMode="numeric"
              required
              value={form.cpf}
              onChange={(e) => update("cpf", formatCPF(e.target.value))}
              placeholder="000.000.000-00"
              maxLength={14}
              className="w-full bg-sampaio-ink border border-sampaio-gold/40 rounded px-4 py-3 text-sampaio-parchment focus:outline-none focus:border-sampaio-gold font-mono"
            />
          </Field>

          <Field label="E-mail">
            <input
              type="email"
              required
              maxLength={120}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full bg-sampaio-ink border border-sampaio-gold/40 rounded px-4 py-3 text-sampaio-parchment focus:outline-none focus:border-sampaio-gold"
            />
          </Field>

          <Field label="Telefone / WhatsApp">
            <input
              inputMode="tel"
              required
              value={form.telefone}
              onChange={(e) => update("telefone", formatPhone(e.target.value))}
              placeholder="(51) 99999-9999"
              maxLength={16}
              className="w-full bg-sampaio-ink border border-sampaio-gold/40 rounded px-4 py-3 text-sampaio-parchment focus:outline-none focus:border-sampaio-gold font-mono"
            />
          </Field>

          <label className="flex gap-3 items-start text-xs text-sampaio-parchment/70 leading-relaxed cursor-pointer mt-4">
            <input
              type="checkbox"
              required
              checked={form.consentimento}
              onChange={(e) => update("consentimento", e.target.checked)}
              className="mt-1 accent-sampaio-gold"
            />
            <span>
              Autorizo a AOR/2-RS a utilizar meus dados para contato e cadastro
              associativo. Concordo com o tratamento dos dados nos termos da LGPD.
            </span>
          </label>

          {error && (
            <div className="text-sampaio-blood text-sm bg-sampaio-blood/10 border border-sampaio-blood/30 rounded p-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !form.consentimento}
            className="w-full bg-sampaio-gold text-sampaio-ink font-display uppercase tracking-widest py-3 rounded hover:bg-sampaio-parchment transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Enviando..." : "Apresentar-se"}
          </button>
        </form>

        <p className="text-center text-xs text-sampaio-parchment/40 mt-6">
          Brigadeiro Antônio de Sampaio · Patrono da Infantaria
        </p>
      </div>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-sampaio-gold/80 font-display mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}
