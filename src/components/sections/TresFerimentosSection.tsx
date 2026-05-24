"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ferimentos = [
  {
    n: "I",
    titulo: "Primeiro Ferimento",
    contexto:
      "Desmontado, em combate corpo a corpo, Sampaio é ferido no rosto. Recusa-se a deixar o campo. Continua coordenando a resistência.",
    frase: null,
  },
  {
    n: "II",
    titulo: "Segundo Ferimento",
    contexto:
      "Oscila no estribo de seu cavalo, com um fio de sangue a escoar-lhe pela boca. Osorio envia seu Ajudante de Ordens com a ordem de resistir a todo custo.",
    frase:
      "Capitão, diga ao Marechal Osório que estou cumprindo meu dever, mas como já perdi muito sangue, seria conveniente que me mandasse substituir.",
  },
  {
    n: "III",
    titulo: "Terceiro Ferimento",
    contexto:
      "Quando o Capitão pedia autorização para se retirar, Sampaio recebe o terceiro ferimento. De joelhos, antes de desfalecer, pronuncia:",
    frase: "Diga ao marechal que este é o terceiro!",
  },
];

export function TresFerimentosSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} id="ferimentos" className="relative position-relative" style={{ position: "relative" }}>
      <motion.div
        style={{ opacity: bgOpacity }}
        className="fixed inset-0 bg-sampaio-blood/30 pointer-events-none z-0"
      />

      <section className="relative min-h-screen w-full px-6 py-24 z-10">
        <div className="max-w-4xl mx-auto">
          <motion.header
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-sampaio-blood text-xs uppercase tracking-[0.4em] font-display mb-3">
              Coração da Batalha
            </p>
            <h2 className="font-display text-5xl md:text-7xl font-black text-sampaio-parchment">
              Os Três Ferimentos
            </h2>
          </motion.header>

          <div className="space-y-32">
            {ferimentos.map((f, i) => (
              <motion.div
                key={f.n}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-200px" }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="flex items-baseline gap-6 mb-8">
                  <span className="font-display text-8xl md:text-9xl text-sampaio-blood/60 leading-none">
                    {f.n}
                  </span>
                  <h3 className="font-display text-2xl md:text-4xl text-sampaio-parchment">{f.titulo}</h3>
                </div>
                <p className="text-sampaio-parchment/70 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl">
                  {f.contexto}
                </p>
                {f.frase && (
                  <motion.blockquote
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="border-l-4 border-sampaio-gold pl-6 py-4 max-w-3xl"
                  >
                    <p className="font-display text-2xl md:text-4xl text-sampaio-parchment italic leading-tight">
                      &ldquo;{f.frase}&rdquo;
                    </p>
                    <footer className="text-sm text-sampaio-gold/70 mt-3 uppercase tracking-widest">
                      — Brigadeiro Sampaio
                    </footer>
                  </motion.blockquote>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="mt-32 text-center"
          >
            <p className="text-sampaio-parchment/60 text-lg italic max-w-2xl mx-auto">
              Evacuado para o navio-hospital Eponina, faleceu próximo a Buenos Aires
              em 6 de julho de 1866. Tinha 56 anos — três meses depois de Tuiuti.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
