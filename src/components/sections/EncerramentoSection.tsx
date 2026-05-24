"use client";
import { motion } from "framer-motion";

const apologia = [
  "Mas mamãe...",
  "Se novamente a pobre humanidade",
  "Mais uma vez em busca da verdade",
  "Rufar seus tambores sobre a Terra",
  "Anunciando o sangue de outra guerra,",
  "Se outro filho a Pátria te exigir,",
  "Sem lágrimas, deixa-o ir...",
  "Embora te destrua o coração,",
  "Ainda que te alquebre a agonia",
  "Pede a este irmão,",
  "Para ser também de INFANTARIA!",
];

export function EncerramentoSection() {
  return (
    <section id="encerramento" className="relative min-h-screen w-full px-6 py-24 flex flex-col justify-center items-center grain">
      <div className="absolute inset-0 bg-gradient-radial from-sampaio-gold/5 via-transparent to-transparent" />

      <div className="relative max-w-3xl mx-auto text-center z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sampaio-gold/60 text-xs uppercase tracking-[0.4em] font-display mb-8"
        >
          Apologia do Infante
        </motion.p>

        <div className="space-y-2">
          {apologia.map((verso, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`font-display text-xl md:text-2xl ${
                i === apologia.length - 1
                  ? "gradient-text text-3xl md:text-4xl font-bold mt-6"
                  : "text-sampaio-parchment/85 italic"
              }`}
            >
              {verso}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2 }}
          className="mt-20 pt-10 border-t border-sampaio-gold/30"
        >
          <p className="font-display text-2xl text-sampaio-parchment">
            Os melhores são apenas Bons para a INFANTARIA!
          </p>
          <p className="text-sampaio-gold/70 mt-2 text-sm tracking-widest uppercase">
            Você não escolhe · você é escolhido pela Infantaria
          </p>
        </motion.div>
      </div>
    </section>
  );
}
