"use client";
import { useEffect, useState } from "react";
import { QUIZ_QUESTIONS } from "@/lib/data/quiz";
import { getSocket } from "@/lib/socket-client";
import type { SerializedState } from "@/types/quiz";

export default function HostPage() {
  const [state, setState] = useState<SerializedState | null>(null);

  useEffect(() => {
    const s = getSocket();
    s.on("state", setState);
    s.emit("hostState", setState);
    return () => {
      s.off("state");
    };
  }, []);

  const showQuestion = (id: string | null) => {
    getSocket().emit("hostShowQuestion", id);
  };

  const reveal = (id: string) => {
    getSocket().emit("hostReveal", id);
  };

  const reset = () => {
    if (confirm("Resetar o quiz inteiro? Isso zera pontos e respostas.")) {
      getSocket().emit("hostReset");
    }
  };

  const currentQ = QUIZ_QUESTIONS.find((q) => q.id === state?.currentQuestionId);
  const totalAnswers = state ? Object.values(state.tally).reduce((a, b) => a + b, 0) : 0;
  const ranking = state ? [...state.participants].sort((a, b) => b.score - a.score) : [];

  return (
    <main className="min-h-screen p-6 grain">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 pb-6 border-b border-sampaio-gold/30">
          <div>
            <p className="text-sampaio-gold/60 text-xs uppercase tracking-[0.4em] font-display">
              Painel do Apresentador
            </p>
            <h1 className="font-display text-4xl gradient-text">Host · Tenente Brasil</h1>
          </div>
          <button
            onClick={reset}
            className="text-sampaio-blood hover:text-sampaio-parchment text-sm uppercase tracking-widest font-display border border-sampaio-blood/50 px-4 py-2 rounded hover:bg-sampaio-blood/20"
          >
            Reiniciar quiz
          </button>
        </header>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
          <section>
            <h2 className="font-display text-xl text-sampaio-gold mb-4 uppercase tracking-wider">
              Perguntas ({QUIZ_QUESTIONS.length})
            </h2>
            <div className="space-y-3">
              {QUIZ_QUESTIONS.map((q, i) => {
                const isCurrent = state?.currentQuestionId === q.id;
                return (
                  <div
                    key={q.id}
                    className={`border rounded-lg p-4 transition-colors ${
                      isCurrent ? "border-sampaio-gold bg-sampaio-gold/10" : "border-sampaio-gold/20 bg-sampaio-ash"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sampaio-gold/70 text-xs font-mono">
                            {i + 1}/{QUIZ_QUESTIONS.length}
                          </span>
                          <span className="text-sampaio-gold/50 text-xs uppercase tracking-widest">
                            {q.section}
                          </span>
                        </div>
                        <p className="text-sampaio-parchment">{q.prompt}</p>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        {!isCurrent ? (
                          <button
                            onClick={() => showQuestion(q.id)}
                            className="text-xs uppercase tracking-widest font-display bg-sampaio-gold text-sampaio-ink px-3 py-1.5 rounded hover:bg-sampaio-parchment"
                          >
                            Exibir
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => reveal(q.id)}
                              disabled={state?.revealed}
                              className="text-xs uppercase tracking-widest font-display bg-sampaio-blood text-sampaio-parchment px-3 py-1.5 rounded hover:bg-sampaio-blood/80 disabled:opacity-50"
                            >
                              {state?.revealed ? "Revelado" : "Revelar"}
                            </button>
                            <button
                              onClick={() => showQuestion(null)}
                              className="text-xs uppercase tracking-widest text-sampaio-parchment/60 hover:text-sampaio-parchment"
                            >
                              Esconder
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {isCurrent && (
                      <div className="mt-4 space-y-2">
                        {q.options.map((opt) => {
                          const count = state?.tally[opt.id] ?? 0;
                          const pct = totalAnswers > 0 ? (count / totalAnswers) * 100 : 0;
                          return (
                            <div key={opt.id} className="relative">
                              <div className="flex justify-between text-xs mb-1">
                                <span
                                  className={`${
                                    state?.revealed && opt.correct
                                      ? "text-emerald-400 font-bold"
                                      : "text-sampaio-parchment/80"
                                  }`}
                                >
                                  {opt.id.toUpperCase()}. {opt.text}
                                  {state?.revealed && opt.correct && " ✓"}
                                </span>
                                <span className="text-sampaio-gold/80 font-mono">
                                  {count} ({pct.toFixed(0)}%)
                                </span>
                              </div>
                              <div className="h-2 bg-sampaio-ink rounded overflow-hidden">
                                <div
                                  className={`h-full transition-all duration-500 ${
                                    state?.revealed && opt.correct
                                      ? "bg-emerald-500"
                                      : "bg-sampaio-gold"
                                  }`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="bg-sampaio-ash border border-sampaio-gold/30 rounded-lg p-6">
              <h3 className="font-display text-sampaio-gold uppercase tracking-wider mb-4">
                Participantes ({state?.participants.length ?? 0})
              </h3>
              {ranking.length === 0 ? (
                <p className="text-sampaio-parchment/40 italic text-sm">
                  Nenhum cadete conectado ainda
                </p>
              ) : (
                <ol className="space-y-2">
                  {ranking.map((p, i) => (
                    <li
                      key={p.id}
                      className="flex justify-between items-center text-sm py-2 border-b border-sampaio-gold/10 last:border-0"
                    >
                      <span className="flex gap-3">
                        <span className="font-mono text-sampaio-gold/60 w-6">
                          {i + 1}.
                        </span>
                        <span className="text-sampaio-parchment">{p.name}</span>
                      </span>
                      <span className="font-mono text-sampaio-gold">{p.score}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            {currentQ && (
              <div className="bg-sampaio-ink border border-sampaio-blood/40 rounded-lg p-6">
                <p className="text-sampaio-blood text-xs uppercase tracking-widest mb-2">
                  Pergunta no ar
                </p>
                <p className="text-sampaio-parchment font-display text-lg">
                  {currentQ.prompt}
                </p>
                <p className="text-sampaio-gold/70 text-xs mt-3">
                  {totalAnswers} resposta(s) registrada(s)
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
