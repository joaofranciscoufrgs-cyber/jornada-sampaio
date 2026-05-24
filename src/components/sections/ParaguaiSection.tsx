"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    titulo: "As Causas",
    bullets: [
      "Disputas territoriais entre Paraguai e seus vizinhos (Brasil e Argentina)",
      "Controle estratégico da Bacia do Prata",
      "Pretensões expansionistas de Francisco Solano López",
      "Influência brasileira no Uruguai após a intervenção de 1864",
    ],
  },
  {
    titulo: "1864 — Estopim",
    bullets: [
      "Novembro: apreensão paraguaia do mercante Marquês do Olinda no Rio Paraguay",
      "Dezembro: invasão paraguaia do Mato Grosso",
      "A guerra começa no extremo oeste brasileiro, longe das forças regulares",
    ],
  },
  {
    titulo: "1865 — RS Invadido",
    bullets: [
      "Tropas paraguaias invadem Corrientes (Argentina), cruzam o rio Uruguay e entram no RS",
      "11 de junho: Batalha do Riachuelo — vitória naval brasileira",
      "16 jul a 18 set: Cerco e rendição de Uruguaiana",
      "Tríplice Aliança formada: Brasil + Argentina + Uruguai",
    ],
  },
  {
    titulo: "1866 — Em terra inimiga",
    bullets: [
      "16-23 abr: Batalha do Passo da Pátria — Forte Itapiru",
      "Coube a Osorio e Sampaio a glória de serem os primeiros a pisar em solo paraguaio",
      "02 mai: Batalha de Estero Bellaco — transposição do curso d'água",
      "20 mai: Acampamento aliado em Tuiuti — disposição em profundidade",
    ],
  },
];

export function ParaguaiSection() {
  const [idx, setIdx] = useState(0);

  return (
    <section id="paraguai" className="relative min-h-screen w-full px-6 py-24 bg-sampaio-ash">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <p className="text-sampaio-gold/60 text-xs uppercase tracking-[0.4em] font-display mb-3">
            Intervalo · Modo Tradicional
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-sampaio-parchment">
            Guerra da Tríplice Aliança
          </h2>
          <p className="text-sampaio-parchment/50 mt-3 text-sm italic">
            O maior conflito da América do Sul · 1864-1870
          </p>
        </header>

        <div className="bg-sampaio-parchment text-sampaio-ink rounded-lg shadow-2xl overflow-hidden border-2 border-sampaio-gold/40">
          <div className="bg-sampaio-ink text-sampaio-parchment px-6 py-3 flex justify-between items-center border-b-2 border-sampaio-gold/30">
            <span className="font-display tracking-wider text-sampaio-gold">
              Slide {idx + 1} de {slides.length}
            </span>
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === idx ? "bg-sampaio-gold" : "bg-sampaio-parchment/30"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="p-10 md:p-16 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-display text-3xl md:text-5xl text-sampaio-blood mb-8">
                  {slides[idx].titulo}
                </h3>
                <ul className="space-y-4">
                  {slides[idx].bullets.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.1 }}
                      className="flex gap-3 text-lg md:text-xl"
                    >
                      <span className="text-sampaio-bronze font-bold mt-1">▸</span>
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="bg-sampaio-ink px-6 py-3 flex justify-between border-t-2 border-sampaio-gold/30">
            <button
              onClick={() => setIdx((v) => Math.max(0, v - 1))}
              disabled={idx === 0}
              className="text-sampaio-parchment disabled:opacity-30 font-display tracking-wider hover:text-sampaio-gold transition-colors"
            >
              ← Anterior
            </button>
            <button
              onClick={() => setIdx((v) => Math.min(slides.length - 1, v + 1))}
              disabled={idx === slides.length - 1}
              className="text-sampaio-parchment disabled:opacity-30 font-display tracking-wider hover:text-sampaio-gold transition-colors"
            >
              Próximo →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
