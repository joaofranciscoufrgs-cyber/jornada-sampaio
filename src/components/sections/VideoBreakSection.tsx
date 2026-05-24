"use client";
import { motion } from "framer-motion";

export function VideoBreakSection() {
  return (
    <section
      id="video-break"
      className="relative w-full px-6 py-24 bg-sampaio-ink overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(122,31,31,0.08)_0%,_transparent_70%)]" />

      <div className="relative max-w-5xl mx-auto">
        <motion.header
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-sampaio-gold/60 text-xs uppercase tracking-[0.4em] font-display mb-3">
            Um momento de silêncio
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-sampaio-parchment">
            O legado em movimento
          </h2>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video rounded-lg overflow-hidden border border-sampaio-gold/30 shadow-2xl bg-black"
        >
          <video
            controls
            preload="metadata"
            playsInline
            className="w-full h-full object-contain"
          >
            <source src="/videos/instituicao-1min.mp4" type="video/mp4" />
            Seu navegador não suporta vídeo HTML5.
          </video>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-sampaio-parchment/60 text-sm italic mt-6 max-w-2xl mx-auto"
        >
          Mais de 150 anos depois, o espírito do Brigadeiro segue presente em cada infante.
        </motion.p>
      </div>
    </section>
  );
}
