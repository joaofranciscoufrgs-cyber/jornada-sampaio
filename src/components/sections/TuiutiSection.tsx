"use client";
import { motion } from "framer-motion";

export function TuiutiSection() {
  return (
    <section id="tuiuti" className="relative min-h-screen w-full px-6 py-24 bg-gradient-to-b from-sampaio-ink via-sampaio-blood/20 to-sampaio-ink overflow-hidden grain">
      <div className="absolute inset-0 bg-vignette pointer-events-none" />

      <div className="relative max-w-6xl mx-auto z-10">
        <header className="text-center mb-12">
          <p className="text-sampaio-gold/60 text-xs uppercase tracking-[0.4em] font-display mb-3">
            Parte III — A Batalha
          </p>
          <h2 className="font-display text-5xl md:text-7xl font-black gradient-text">
            TUIUTI
          </h2>
          <p className="font-display text-xl md:text-2xl text-sampaio-parchment/80 mt-3 italic">
            24 de maio de 1866 — aniversário de 56 anos de Sampaio
          </p>
        </header>

        <div className="bg-sampaio-ink/80 border border-sampaio-gold/30 rounded-lg p-6 md:p-10">
          <h3 className="font-display text-2xl text-sampaio-gold mb-6 text-center">Disposição Aliada — Lagoa de Tuiuti</h3>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center mb-6"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-sampaio-gold/70 font-display">
              A Rainha das Armas em formação
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-2 md:gap-6 mb-4">
            {[
              { name: "Argentinos", side: "Direita", color: "bg-sky-900/40 border-sky-500/50" },
              { name: "Brasileiros · 3ª Div Encouraçada", side: "Centro", color: "bg-emerald-900/40 border-emerald-500/50" },
              { name: "Uruguaios", side: "Esquerda", color: "bg-sampaio-bronze/20 border-sampaio-gold/50" },
            ].map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15 }}
                className={`border-2 rounded-lg p-4 text-center ${f.color}`}
              >
                <div className="text-xs uppercase tracking-widest text-sampaio-parchment/60">{f.side}</div>
                <div className="font-display text-sm md:text-lg text-sampaio-parchment mt-2">{f.name}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-sampaio-ink/60 border border-sampaio-gold/20 rounded p-4 mb-8 text-center"
          >
            <p className="text-xs uppercase tracking-widest text-sampaio-gold/70 mb-2 font-display">
              3ª Divisão Encouraçada — os tradicionais batalhões
            </p>
            <p className="font-display text-sampaio-parchment text-sm md:text-base">
              <span className="text-sampaio-gold">Vanguardeiro</span>
              <span className="text-sampaio-gold/40 mx-3">·</span>
              <span className="text-sampaio-gold">Treme-Terra</span>
              <span className="text-sampaio-gold/40 mx-3">·</span>
              <span className="text-sampaio-gold">Arranca-Toco</span>
            </p>
            <p className="text-xs text-sampaio-parchment/50 italic mt-2">
              Reconhecidos pela combatividade e resistência
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 text-sampaio-parchment/80">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-sampaio-blood/20 border-l-2 border-sampaio-blood p-5"
            >
              <p className="text-sampaio-gold/70 text-xs uppercase tracking-widest mb-2">O ataque surpresa</p>
              <p className="text-sm md:text-base">
                Os paraguaios atacam pelo flanco argentino. Sampaio está à frente com o 26º Btl de Infantaria
                — recebe o peso inicial. Quatro de suas montarias são abatidas por lanças e espadas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="bg-sampaio-olive/30 border-l-2 border-sampaio-gold p-5"
            >
              <p className="text-sampaio-gold/70 text-xs uppercase tracking-widest mb-2">A brecha e o contra-ataque</p>
              <p className="text-sm md:text-base">
                Os argentinos cedem. Sampaio manobra, resiste. O Cel Deodoro da Fonseca avança e fecha a brecha,
                recuando o inimigo 500 metros. Mallet, dos canhões: &ldquo;<em>Eles que venham — por aqui não passam!</em>&rdquo;
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mt-8 text-center"
          >
            <p className="text-sampaio-parchment/60 text-sm">
              55.000 homens em campo · mais de 5 horas de combate · vitória aliada decisiva
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-10 grid md:grid-cols-2 gap-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/tuiuti-01.jpg"
              alt="Batalha de Tuiuti - litografia"
              className="w-full h-64 object-cover rounded-lg border border-sampaio-gold/30 sepia-[0.3]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/tuiuti-02.jpg"
              alt="Batalha de Tuiuti - representação"
              className="w-full h-64 object-cover rounded-lg border border-sampaio-gold/30 sepia-[0.3]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
