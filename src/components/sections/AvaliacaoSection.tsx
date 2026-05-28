"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NOTAS = [
  { value: 1, label: "Insatisfeito", emoji: "😞" },
  { value: 2, label: "Pouco satisfeito", emoji: "😐" },
  { value: 3, label: "Neutro", emoji: "🙂" },
  { value: 4, label: "Satisfeito", emoji: "😊" },
  { value: 5, label: "Muito satisfeito", emoji: "🤩" },
];

export function AvaliacaoSection() {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [comentario, setComentario] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Pre-carrega avaliação existente (em caso de re-acesso)
    fetch("/api/avaliacoes", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.avaliacao) {
          setRating(d.avaliacao.rating);
          setComentario(d.avaliacao.comentario || "");
          setSubmitted(true);
        }
      })
      .catch(() => {});
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      setError("Selecione uma nota antes de enviar.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/avaliacoes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ rating, comentario: comentario.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Erro ao enviar avaliação.");
      }
      setSubmitted(true);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const editar = () => setSubmitted(false);

  return (
    <section
      id="avaliacao"
      className="relative w-full px-4 md:px-6 py-20 md:py-24 bg-sampaio-ash overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,162,91,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto">
        <motion.header
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-10"
        >
          <p className="text-sampaio-gold/60 text-[10px] md:text-xs uppercase tracking-[0.4em] font-display mb-3">
            Sua opinião
          </p>
          <h2 className="font-display text-3xl md:text-5xl gradient-text">
            Avalie esta apresentação
          </h2>
          <p className="text-sampaio-parchment/60 mt-3 text-sm md:text-base">
            O retorno é importante para a Reserva e para o Tenente Brasil aprimorar
            as próximas instruções.
          </p>
        </motion.header>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={submit}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-sampaio-ink/80 border border-sampaio-gold/30 rounded-lg p-6 md:p-8 space-y-6"
            >
              <div>
                <p className="block text-xs uppercase tracking-widest text-sampaio-gold/80 font-display mb-4 text-center">
                  Qual sua nota?
                </p>
                <div className="grid grid-cols-5 gap-2 md:gap-3">
                  {NOTAS.map((n) => {
                    const isSelected = rating === n.value;
                    const isHover = hover === n.value;
                    return (
                      <button
                        key={n.value}
                        type="button"
                        onClick={() => setRating(n.value)}
                        onMouseEnter={() => setHover(n.value)}
                        onMouseLeave={() => setHover(null)}
                        aria-label={`${n.value} - ${n.label}`}
                        className={`flex flex-col items-center justify-center gap-1 px-1 py-3 rounded border-2 transition-all ${
                          isSelected
                            ? "bg-sampaio-gold/20 border-sampaio-gold scale-105"
                            : isHover
                            ? "border-sampaio-gold/60 bg-sampaio-gold/5"
                            : "border-sampaio-gold/30 hover:border-sampaio-gold/60"
                        }`}
                      >
                        <span className="text-2xl md:text-3xl">{n.emoji}</span>
                        <span className="font-mono text-sm md:text-base font-bold text-sampaio-gold">
                          {n.value}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p
                  className={`text-center mt-3 text-xs md:text-sm font-display tracking-widest uppercase min-h-[1.25rem] ${
                    rating || hover ? "text-sampaio-gold" : "text-sampaio-parchment/40"
                  }`}
                >
                  {NOTAS.find((n) => n.value === (hover ?? rating))?.label || "Toque na sua nota"}
                </p>
              </div>

              <label className="block">
                <span className="block text-xs uppercase tracking-widest text-sampaio-gold/80 font-display mb-2">
                  Comentário <span className="opacity-50 normal-case">(opcional)</span>
                </span>
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  rows={4}
                  maxLength={2000}
                  placeholder="Conte o que mais te impactou, sugestões para próximas instruções, ou o que poderia melhorar…"
                  className="w-full bg-sampaio-ash border border-sampaio-gold/40 rounded px-4 py-3 text-sampaio-parchment placeholder-sampaio-parchment/30 focus:outline-none focus:border-sampaio-gold resize-y"
                />
                <p className="text-right text-xs text-sampaio-parchment/40 mt-1">
                  {comentario.length}/2000
                </p>
              </label>

              {error && (
                <div className="text-sampaio-blood text-sm bg-sampaio-blood/10 border border-sampaio-blood/30 rounded p-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !rating}
                className="w-full bg-sampaio-gold text-sampaio-ink font-display uppercase tracking-widest py-3 rounded hover:bg-sampaio-parchment transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Enviando…" : "Enviar avaliação"}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-sampaio-ink/80 border-2 border-sampaio-gold/60 rounded-lg p-8 md:p-10 text-center space-y-4"
            >
              <div className="text-5xl md:text-6xl">
                {NOTAS.find((n) => n.value === rating)?.emoji}
              </div>
              <h3 className="font-display text-2xl md:text-3xl gradient-text">
                Avaliação registrada!
              </h3>
              <p className="text-sampaio-parchment/80">
                Sua nota:{" "}
                <strong className="text-sampaio-gold">
                  {rating} — {NOTAS.find((n) => n.value === rating)?.label}
                </strong>
              </p>
              {comentario && (
                <blockquote className="text-sampaio-parchment/60 italic text-sm border-l-2 border-sampaio-gold/40 pl-4 max-w-lg mx-auto text-left">
                  &ldquo;{comentario}&rdquo;
                </blockquote>
              )}
              <p className="text-sampaio-parchment/50 text-sm italic pt-2">
                Obrigado pela contribuição. O Tenente Brasil agradece.
              </p>
              <button
                onClick={editar}
                className="text-xs uppercase tracking-widest font-display text-sampaio-gold/70 hover:text-sampaio-gold underline-offset-4 hover:underline"
              >
                Editar minha avaliação
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
