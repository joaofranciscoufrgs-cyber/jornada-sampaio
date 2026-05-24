"use client";
import { useEffect, useState } from "react";
import type { Participant, QuizQuestion, SerializedState } from "@/types/quiz";
import { getSocket } from "@/lib/socket-client";

export default function QuizPage() {
  const [me, setMe] = useState<Participant | null>(null);
  const [name, setName] = useState("");
  const [state, setState] = useState<SerializedState | null>(null);
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<{ correct?: string; tally: Record<string, number> } | null>(null);

  useEffect(() => {
    const s = getSocket();
    s.on("state", (st) => {
      setState(st);
      if (!st.revealed) {
        setRevealed(null);
        setPicked(null);
      }
    });
    s.on("question", (q) => {
      setQuestion(q);
      setPicked(null);
      setRevealed(null);
    });
    s.on("revealed", (r) => setRevealed(r));
    return () => {
      s.off("state");
      s.off("question");
      s.off("revealed");
    };
  }, []);

  const join = () => {
    const s = getSocket();
    s.emit("join", name || "Cadete", (p) => setMe(p));
  };

  const answer = (optionId: string) => {
    if (!question || picked) return;
    setPicked(optionId);
    getSocket().emit("answer", { questionId: question.id, optionId });
  };

  if (!me) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 grain">
        <div className="max-w-md w-full bg-sampaio-ash border border-sampaio-gold/30 rounded-lg p-8">
          <p className="text-sampaio-gold/60 text-xs uppercase tracking-[0.4em] font-display mb-4 text-center">
            Quiz · CPO R
          </p>
          <h1 className="font-display text-3xl text-sampaio-parchment text-center mb-2">
            Entre na batalha
          </h1>
          <p className="text-sampaio-parchment/60 text-center text-sm mb-6">
            Como você quer ser identificado?
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome ou nome de guerra"
            maxLength={40}
            className="w-full bg-sampaio-ink border border-sampaio-gold/40 rounded px-4 py-3 text-sampaio-parchment focus:outline-none focus:border-sampaio-gold"
          />
          <button
            onClick={join}
            className="w-full mt-4 bg-sampaio-gold text-sampaio-ink font-display uppercase tracking-widest py-3 rounded hover:bg-sampaio-parchment transition-colors"
          >
            Apresentar-se
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 grain">
      <div className="max-w-md w-full">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <p className="text-sampaio-gold/60 text-xs uppercase tracking-widest font-display">
              Cadete
            </p>
            <p className="text-sampaio-parchment font-display text-xl">{me.name}</p>
          </div>
          <div className="text-right">
            <p className="text-sampaio-gold/60 text-xs uppercase tracking-widest font-display">
              Pontos
            </p>
            <p className="text-sampaio-gold font-display text-2xl">
              {state?.participants.find((p) => p.id === me.id)?.score ?? me.score}
            </p>
          </div>
        </header>

        {!question && (
          <div className="bg-sampaio-ash border border-sampaio-gold/30 rounded-lg p-8 text-center">
            <p className="text-sampaio-parchment/70 italic">
              Aguardando o Tenente liberar a próxima pergunta...
            </p>
            <p className="text-sampaio-gold/60 text-xs mt-4">
              {state?.participants.length ?? 1} cadete(s) em formação
            </p>
          </div>
        )}

        {question && (
          <div className="bg-sampaio-ash border border-sampaio-gold/30 rounded-lg p-6">
            <p className="text-sampaio-gold/70 text-xs uppercase tracking-widest font-display mb-2">
              {question.section}
            </p>
            <h2 className="font-display text-xl text-sampaio-parchment mb-6">
              {question.prompt}
            </h2>
            <div className="space-y-3">
              {question.options.map((opt) => {
                const isPicked = picked === opt.id;
                const isCorrect = revealed?.correct === opt.id;
                const isWrong = revealed && isPicked && !isCorrect && opt.correct !== true;
                return (
                  <button
                    key={opt.id}
                    onClick={() => answer(opt.id)}
                    disabled={!!picked || !!revealed}
                    className={`w-full text-left px-5 py-4 rounded border-2 transition-all ${
                      isCorrect
                        ? "border-emerald-500 bg-emerald-900/30 text-sampaio-parchment"
                        : isWrong
                        ? "border-sampaio-blood bg-sampaio-blood/20 text-sampaio-parchment"
                        : isPicked
                        ? "border-sampaio-gold bg-sampaio-gold/20 text-sampaio-parchment"
                        : "border-sampaio-gold/30 text-sampaio-parchment/80 hover:border-sampaio-gold hover:bg-sampaio-gold/10"
                    } disabled:cursor-not-allowed`}
                  >
                    <span className="font-mono text-sampaio-gold/60 mr-2">
                      {opt.id.toUpperCase()}.
                    </span>
                    {opt.text}
                  </button>
                );
              })}
            </div>

            {picked && !revealed && (
              <p className="text-sampaio-gold/70 text-center mt-4 italic text-sm">
                Resposta registrada. Aguarde a revelação.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
