"use client";
import { motion } from "framer-motion";

export function VideoLongoSection() {
  return (
    <section
      id="video-longo"
      className="relative w-full px-4 md:px-6 py-20 md:py-24 bg-sampaio-ash overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,162,91,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <motion.header
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-10"
        >
          <p className="text-sampaio-gold/60 text-[10px] md:text-xs uppercase tracking-[0.4em] font-display mb-3">
            Antes de começarmos
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-sampaio-parchment text-balance">
            A Infantaria em palavra e imagem
          </h2>
          <p className="text-sampaio-parchment/60 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            Um olhar sobre a Arma — tradição, modernidade e o espírito do
            infante brasileiro.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video rounded-lg overflow-hidden border border-sampaio-gold/30 shadow-2xl bg-black"
        >
          <video
            controls
            preload="metadata"
            playsInline
            className="w-full h-full"
          >
            <source src="/videos/institucional-longo.mp4" type="video/mp4" />
            Seu navegador não suporta vídeo HTML5.
          </video>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-sampaio-parchment/50 text-xs italic mt-4"
        >
          Toque no play para assistir
        </motion.p>
      </div>
    </section>
  );
}
