"use client";
import { motion } from "framer-motion";
import { QRBlock } from "@/components/ui/QRBlock";
import { ScrollHint } from "@/components/ui/ScrollHint";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 grain"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,162,91,0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-vignette pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center w-full">
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-sm md:text-base uppercase tracking-[0.4em] text-sampaio-gold/80 mb-6"
          >
            Jornada dos Patronos · Dia da Infantaria
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black gradient-text text-balance leading-[1.02]"
          >
            A Jornada do<br />Bravo dos Bravos
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="font-display text-xl md:text-2xl text-sampaio-parchment mt-6 italic"
          >
            Brigadeiro Antônio de Sampaio
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.9 }}
            className="text-xs md:text-sm text-sampaio-gold/80 mt-2 font-body tracking-[0.2em] uppercase"
          >
            Patrono da Arma de Infantaria · 1810 — 1866
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="font-display text-base md:text-lg text-sampaio-gold/80 mt-8 tracking-[0.3em] uppercase"
          >
            &ldquo;Ides Comandar, Aprendei a Obedecer&rdquo;
          </motion.p>

          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="mt-6 max-w-xl mx-auto lg:mx-0 border-l-2 border-sampaio-gold/60 pl-6"
          >
            <p className="font-display text-lg md:text-xl text-sampaio-parchment leading-snug">
              &ldquo;Nós somos os Senhores AMANHÃ!&rdquo;
            </p>
            <footer className="text-xs uppercase tracking-widest text-sampaio-gold/60 mt-3">
              — Para os cadetes do CPO R · Porto Alegre · 29.MAI.26
            </footer>
          </motion.blockquote>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex justify-center"
        >
          <QRBlock path="/inscricao" label="Apresentar-se à tropa" />
        </motion.div>
      </div>

      <ScrollHint />
    </section>
  );
}
