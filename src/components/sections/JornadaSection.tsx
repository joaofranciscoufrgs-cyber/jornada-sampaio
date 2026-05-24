"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JORNADA, type Local } from "@/lib/data/jornada";

export function JornadaSection() {
  const [active, setActive] = useState<Local | null>(null);

  return (
    <section
      id="jornada"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 bg-sampaio-ash"
    >
      <div className="max-w-7xl w-full mx-auto">
        <header className="text-center mb-12">
          <p className="text-sampaio-gold/60 text-xs uppercase tracking-[0.4em] font-display mb-3">
            Parte I — A Jornada
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold gradient-text">
            36 anos de marcha
          </h2>
          <p className="mt-4 text-sampaio-parchment/70 max-w-2xl mx-auto">
            De Tamboril, no sertão do Ceará, aos pampas do Sul e às terras paraguaias.
            Toque nos pontos para ver cada passagem.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 items-start">
          <div className="relative aspect-[3/4] lg:aspect-[3/4] w-full bg-gradient-to-br from-sampaio-olive/20 to-sampaio-ink rounded-lg border border-sampaio-gold/20 overflow-hidden grain">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full opacity-30"
            >
              <path
                d="M70,22 L77,24 L66,30 L55,25 L84,38 L50,88 L47,84 L46,83 L47,86 L42,85 L45,88 L41,76 L43,92"
                fill="none"
                stroke="#c9a25b"
                strokeWidth="0.3"
                strokeDasharray="1,1"
              />
            </svg>

            {JORNADA.map((local, i) => (
              <button
                key={local.id}
                onClick={() => setActive(local)}
                className="absolute group -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${local.x}%`, top: `${local.y}%` }}
              >
                <span className="relative flex h-4 w-4">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full ${
                      active?.id === local.id
                        ? "bg-sampaio-gold opacity-100"
                        : "bg-sampaio-gold/80 animate-pulse-slow"
                    }`}
                  />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-sampaio-gold border-2 border-sampaio-parchment" />
                </span>
                <span className="absolute left-5 top-0 text-[10px] md:text-xs whitespace-nowrap text-sampaio-parchment/80 group-hover:text-sampaio-gold transition-colors">
                  {local.nome}
                </span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-sampaio-ink/80 border border-sampaio-gold/30 rounded-lg p-6"
                >
                  <div className="text-sampaio-gold/80 text-xs uppercase tracking-widest font-mono">
                    {active.estado} · {active.ano}
                  </div>
                  <h3 className="font-display text-3xl gradient-text mt-2">{active.nome}</h3>
                  <p className="text-sampaio-parchment/80 mt-3">{active.evento}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sampaio-parchment/40 italic p-6 border border-dashed border-sampaio-gold/20 rounded-lg text-center"
                >
                  Toque em um ponto do mapa
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-xs text-sampaio-parchment/40 font-mono">
              {JORNADA.length} lugares · 14 províncias · 4 países
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
