"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JORNADA, type Local } from "@/lib/data/jornada";

export function JornadaSection() {
  const [active, setActive] = useState<Local | null>(null);

  return (
    <section
      id="jornada"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-6 py-16 md:py-20 bg-sampaio-ash"
    >
      <div className="max-w-7xl w-full mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <p className="text-sampaio-gold/60 text-[10px] md:text-xs uppercase tracking-[0.4em] font-display mb-3">
            Parte I — A Jornada
          </p>
          <h2 className="font-display text-3xl md:text-6xl font-bold gradient-text">
            36 anos de marcha
          </h2>
          <p className="mt-3 md:mt-4 text-sampaio-parchment/70 max-w-2xl mx-auto text-sm md:text-base">
            De Tamboril, no sertão do Ceará, aos pampas do Sul e às terras paraguaias.
            <span className="hidden md:inline"> Toque nos pontos para ver cada passagem.</span>
            <span className="md:hidden"> Escolha um lugar abaixo do mapa.</span>
          </p>
        </header>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 lg:gap-8 items-start min-w-0">
          <div className="relative aspect-[4/5] md:aspect-[3/4] w-full bg-gradient-to-br from-sampaio-olive/20 to-sampaio-ink rounded-lg border border-sampaio-gold/20 overflow-hidden grain">
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

            {JORNADA.map((local) => {
              const isActive = active?.id === local.id;
              // On md+ show labels; place on right by default, on left if too close to right edge
              const labelOnLeft = local.x > 65;
              return (
                <button
                  key={local.id}
                  onClick={() => setActive(local)}
                  aria-label={`${local.nome} (${local.ano})`}
                  className="absolute group -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${local.x}%`, top: `${local.y}%` }}
                >
                  <span className="relative flex h-3 w-3 md:h-4 md:w-4">
                    <span
                      className={`absolute inline-flex h-full w-full rounded-full ${
                        isActive
                          ? "bg-sampaio-gold opacity-100 scale-150"
                          : "bg-sampaio-gold/80 animate-pulse-slow"
                      }`}
                    />
                    <span className="relative inline-flex rounded-full h-3 w-3 md:h-4 md:w-4 bg-sampaio-gold border-2 border-sampaio-parchment" />
                  </span>
                  {/* Mobile: only show label when active, floating above the dot */}
                  {isActive && (
                    <span className="md:hidden absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap text-sampaio-ink bg-sampaio-gold px-2 py-0.5 rounded font-display font-bold shadow-lg">
                      {local.nome}
                    </span>
                  )}
                  {/* Desktop+ : labels always visible, smart positioning */}
                  <span
                    className={`hidden md:inline absolute top-0 text-xs whitespace-nowrap transition-colors ${
                      isActive
                        ? "text-sampaio-gold font-bold"
                        : "text-sampaio-parchment/80 group-hover:text-sampaio-gold"
                    } ${labelOnLeft ? "right-5 text-right" : "left-5"}`}
                  >
                    {local.nome}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="space-y-4 min-w-0">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="bg-sampaio-ink/80 border border-sampaio-gold/30 rounded-lg p-5 md:p-6"
                >
                  <div className="text-sampaio-gold/80 text-xs uppercase tracking-widest font-mono">
                    {active.estado} · {active.ano}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl gradient-text mt-2">{active.nome}</h3>
                  <p className="text-sampaio-parchment/80 mt-3 text-sm md:text-base">{active.evento}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sampaio-parchment/40 italic p-5 md:p-6 border border-dashed border-sampaio-gold/20 rounded-lg text-center text-sm md:text-base"
                >
                  Selecione um lugar para ver detalhes
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chip carousel — primary nav on mobile, complementar no desktop */}
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-2 overflow-x-auto pb-2 px-1 snap-x snap-mandatory">
                {JORNADA.map((local) => {
                  const isActive = active?.id === local.id;
                  return (
                    <button
                      key={`chip-${local.id}`}
                      onClick={() => setActive(local)}
                      className={`shrink-0 snap-start px-3 py-1.5 rounded-full text-xs whitespace-nowrap border transition-all font-display ${
                        isActive
                          ? "bg-sampaio-gold text-sampaio-ink border-sampaio-gold font-bold"
                          : "bg-sampaio-ink/40 text-sampaio-parchment/80 border-sampaio-gold/30 hover:border-sampaio-gold hover:text-sampaio-gold"
                      }`}
                    >
                      <span className="font-mono text-[10px] opacity-70 mr-1">{local.ano}</span>
                      {local.nome}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-xs text-sampaio-parchment/40 font-mono text-center md:text-left">
              {JORNADA.length} lugares · 14 províncias · 4 países
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
