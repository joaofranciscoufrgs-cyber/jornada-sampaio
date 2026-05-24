"use client";
import { motion } from "framer-motion";

const homenagens = [
  {
    ano: "1928",
    titulo: "Realengo",
    desc: "Patrono do Batalhão de Infantaria da Escola Militar (proposto pelo Ten Castelo Branco).",
  },
  {
    ano: "1937",
    titulo: "Regimento Sampaio",
    desc: "Decreto presidencial nomeia o 1º Reg de Infantaria da Vila Militar.",
  },
  {
    ano: "1945",
    titulo: "Medalha de Sangue do Brasil",
    desc: "Três estrelas vermelhas — uma para cada ferimento de Sampaio em Tuiuti.",
  },
  {
    ano: "1962",
    titulo: "PATRONO DA INFANTARIA",
    desc: "Decreto 51.429 de 13 de março homologa oficialmente Antônio de Sampaio como Patrono.",
    destaque: true,
  },
  {
    ano: "1966",
    titulo: "Centenário",
    desc: "Selo comemorativo do Correio Brasileiro no centenário da Batalha de Tuiuti.",
  },
  {
    ano: "1996",
    titulo: "Panteon",
    desc: "Restos transladados definitivamente para o Panteon no QG da 10ª RM, Fortaleza-CE.",
  },
  {
    ano: "2009",
    titulo: "Livro de Aço",
    desc: "Lei 11.932 inscreve Sampaio no Livro de Aço dos Heróis da Pátria (Brasília).",
  },
];

export function LegadoSection() {
  return (
    <section id="legado" className="relative min-h-screen w-full px-6 py-24 bg-sampaio-ash">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <p className="text-sampaio-gold/60 text-xs uppercase tracking-[0.4em] font-display mb-3">
            Parte IV — O Legado
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold gradient-text">
            A semente do Infante
          </h2>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homenagens.map((h, i) => (
            <motion.div
              key={h.ano}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`relative p-6 rounded-lg border ${
                h.destaque
                  ? "bg-gradient-to-br from-sampaio-gold/20 to-sampaio-blood/20 border-sampaio-gold"
                  : "bg-sampaio-ink/60 border-sampaio-gold/20"
              }`}
            >
              <div className="font-mono text-sm text-sampaio-gold/80">{h.ano}</div>
              <h3 className={`font-display mt-2 ${h.destaque ? "text-2xl text-sampaio-parchment" : "text-xl text-sampaio-parchment/90"}`}>
                {h.titulo}
              </h3>
              <p className="text-sampaio-parchment/60 text-sm mt-3">{h.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 text-center max-w-3xl mx-auto"
        >
          <blockquote className="border-y border-sampaio-gold/30 py-8">
            <p className="font-display text-2xl md:text-3xl text-sampaio-parchment italic leading-snug">
              &ldquo;Floresce ou perece uma nação segundo o valor do seu Exército; vive ou morre um
              Exército segundo o valor da sua INFANTARIA.&rdquo;
            </p>
            <footer className="text-sm text-sampaio-gold/70 mt-4 uppercase tracking-widest">
              — Napoleão Bonaparte
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
