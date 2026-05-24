"use client";
import { motion } from "framer-motion";
import { TIMELINE } from "@/lib/data/timeline";
import { cn } from "@/lib/utils";

export function TimelineSection() {
  return (
    <section id="timeline" className="relative min-h-screen w-full px-6 py-24 bg-sampaio-ink">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <p className="text-sampaio-gold/60 text-xs uppercase tracking-[0.4em] font-display mb-3">
            Parte II — A Carreira
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold gradient-text">
            Forjado em quarenta combates
          </h2>
        </header>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-sampaio-gold/40 to-transparent" />

          <div className="space-y-12">
            {TIMELINE.map((evento, i) => (
              <motion.div
                key={`${evento.ano}-${evento.titulo}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={cn(
                  "relative flex items-start gap-6",
                  "md:grid md:grid-cols-2 md:gap-12",
                  i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                )}
              >
                <div className={cn(
                  "flex-1 pl-12 md:pl-0",
                  i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"
                )}>
                  <div
                    className={cn(
                      "inline-block font-mono text-sm tracking-wider",
                      evento.destaque ? "text-sampaio-gold" : "text-sampaio-gold/60"
                    )}
                  >
                    {evento.ano}
                  </div>
                  <h3
                    className={cn(
                      "font-display text-2xl md:text-3xl mt-2",
                      evento.destaque ? "text-sampaio-parchment" : "text-sampaio-parchment/80"
                    )}
                  >
                    {evento.titulo}
                  </h3>
                  <p className="text-sampaio-parchment/60 mt-2 text-sm md:text-base">
                    {evento.descricao}
                  </p>
                </div>

                <div className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 z-10">
                  <span
                    className={cn(
                      "block rounded-full border-2",
                      evento.destaque
                        ? "w-5 h-5 bg-sampaio-gold border-sampaio-parchment shadow-[0_0_20px_rgba(201,162,91,0.5)]"
                        : "w-3 h-3 bg-sampaio-ink border-sampaio-gold/60"
                    )}
                  />
                </div>

                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
