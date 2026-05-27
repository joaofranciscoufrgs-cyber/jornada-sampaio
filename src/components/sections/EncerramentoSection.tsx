"use client";
import { motion } from "framer-motion";

export function EncerramentoSection() {
  return (
    <section id="encerramento" className="relative min-h-screen w-full px-4 md:px-6 py-20 md:py-24 flex flex-col justify-center items-center grain">
      <div className="absolute inset-0 bg-gradient-radial from-sampaio-gold/5 via-transparent to-transparent" />

      <div className="relative max-w-4xl w-full mx-auto text-center z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sampaio-gold/70 text-[10px] md:text-xs uppercase tracking-[0.4em] font-display mb-3"
        >
          Antes do final
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl text-sampaio-parchment mb-8"
        >
          Oração do Infante
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video w-full rounded-lg overflow-hidden border border-sampaio-gold/30 bg-black shadow-2xl"
        >
          <video
            controls
            preload="metadata"
            playsInline
            className="w-full h-full"
          >
            <source src="/videos/oracao-do-infante.mp4" type="video/mp4" />
            Seu navegador não suporta vídeo HTML5.
          </video>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-sampaio-parchment/60 italic text-xs md:text-sm mt-4"
        >
          &ldquo;Senhor, Tu que disseste ao Infante: dominai sobre todas as coisas…&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 md:mt-20 pt-10 border-t border-sampaio-gold/30"
        >
          <p className="font-display text-xl md:text-2xl text-sampaio-parchment">
            Os melhores são apenas Bons para a INFANTARIA!
          </p>
          <p className="text-sampaio-gold/70 mt-2 text-xs md:text-sm tracking-widest uppercase">
            Você não escolhe · você é escolhido pela Infantaria
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-12 md:mt-16 space-y-2 md:space-y-3"
        >
          <p className="font-display text-2xl md:text-5xl gradient-text font-black leading-tight">
            SALVE O BRIGADEIRO SAMPAIO!
          </p>
          <p className="font-display text-xl md:text-4xl gradient-text font-black leading-tight">
            SALVE A INFANTARIA DO EXÉRCITO BRASILEIRO!
          </p>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3, duration: 1 }}
          className="mt-16 md:mt-20 pt-10 border-t border-sampaio-gold/20"
        >
          <p className="text-sampaio-gold/70 text-[10px] md:text-xs uppercase tracking-[0.4em] font-display mb-3">
            AOR/2-RS
          </p>
          <p className="text-sampaio-parchment/70 italic text-sm md:text-base">
            Preservando a história, fortalecendo valores e honrando a Reserva
          </p>
          <p className="text-sampaio-parchment/50 mt-6 text-[10px] md:text-xs uppercase tracking-widest font-display">
            Palestrantes
          </p>
          <p className="text-sampaio-parchment text-sm md:text-base mt-2">
            Cel R/1 Inf <strong className="text-sampaio-gold">Caminha</strong>
            <span className="text-sampaio-gold/40 mx-3">·</span>
            1º Ten R/2 Inf <strong className="text-sampaio-gold">Brasil</strong>
          </p>
          <p className="text-sampaio-parchment/40 text-xs mt-6">
            29 de maio de 2026 · CPOR/PA · Porto Alegre — RS
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
