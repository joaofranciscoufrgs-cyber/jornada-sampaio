"use client";
import { motion } from "framer-motion";

const especializacoes = [
  "Motorizada",
  "Mecanizada",
  "Blindada",
  "Paraquedista",
  "Aeromóvel",
  "Selva",
  "Montanha",
  "Caatinga",
  "Pantanal",
  "Polícia do Exército",
];

const feb = [
  { local: "Monte Castelo", data: "21.fev.1945", impacto: "Vitória decisiva após meses de tentativas — virada da campanha" },
  { local: "Castelnuovo", data: "abr.1945", impacto: "Avanço aliado pelo Vale do Pó" },
  { local: "Montese", data: "14-17.abr.1945", impacto: "4 dias de combate urbano que projetaram o Brasil no cenário internacional" },
];

export function RainhaHojeSection() {
  return (
    <section
      id="rainha-hoje"
      className="relative min-h-screen w-full px-6 py-24 bg-sampaio-ink overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,162,91,0.06)_0%,_transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <p className="text-sampaio-gold/60 text-xs uppercase tracking-[0.4em] font-display mb-3">
            Parte V — A Tradição Viva
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold gradient-text">
            A Rainha das Armas Hoje
          </h2>
          <p className="text-sampaio-parchment/60 mt-4 max-w-3xl mx-auto">
            O legado de Sampaio segue presente em cada infante. Forjado no combate aproximado,
            o espírito da Infantaria projetou o Brasil no século XX e modernizou-se para o
            campo de batalha contemporâneo.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-sampaio-ash border border-sampaio-gold/30 rounded-lg p-8"
          >
            <p className="text-sampaio-gold/60 text-xs uppercase tracking-[0.4em] font-display mb-2">
              Século XX
            </p>
            <h3 className="font-display text-2xl text-sampaio-parchment mb-4">
              1ª DIE na Itália
            </h3>
            <p className="text-sampaio-parchment/70 text-sm mb-6">
              A 1ª Divisão de Infantaria Expedicionária projetou o nome do Brasil no
              teatro europeu da Segunda Guerra Mundial.
            </p>
            <div className="space-y-3">
              {feb.map((b, i) => (
                <motion.div
                  key={b.local}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="border-l-2 border-sampaio-gold/50 pl-4 py-2"
                >
                  <div className="flex justify-between items-baseline">
                    <span className="font-display text-sampaio-parchment">{b.local}</span>
                    <span className="text-xs text-sampaio-gold/70 font-mono">{b.data}</span>
                  </div>
                  <p className="text-xs text-sampaio-parchment/60 mt-1">{b.impacto}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-sampaio-ash border border-sampaio-gold/30 rounded-lg p-8"
          >
            <p className="text-sampaio-gold/60 text-xs uppercase tracking-[0.4em] font-display mb-2">
              Século XXI
            </p>
            <h3 className="font-display text-2xl text-sampaio-parchment mb-4">
              Dez especializações
            </h3>
            <p className="text-sampaio-parchment/70 text-sm mb-6">
              Versatilidade para atuar em qualquer terreno e sob quaisquer condições
              meteorológicas.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {especializacoes.map((e, i) => (
                <motion.div
                  key={e}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="bg-sampaio-ink border border-sampaio-gold/20 rounded px-3 py-2 text-center"
                >
                  <span className="text-xs md:text-sm font-display text-sampaio-parchment">
                    {e}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="text-center p-6 border border-sampaio-gold/30 rounded-lg bg-gradient-to-br from-sampaio-blood/15 to-transparent">
            <p className="text-xs uppercase tracking-widest text-sampaio-gold/70 font-display">Vocação</p>
            <p className="font-display text-xl text-sampaio-parchment mt-2 leading-tight">
              Combate aproximado
            </p>
            <p className="text-xs text-sampaio-parchment/50 italic mt-2">
              Arma do fogo e do movimento
            </p>
          </div>
          <div className="text-center p-6 border-2 border-sampaio-gold rounded-lg bg-gradient-to-br from-sampaio-gold/15 to-sampaio-bronze/10">
            <p className="text-xs uppercase tracking-widest text-sampaio-gold/90 font-display">Papel duplo</p>
            <p className="font-display text-xl gradient-text mt-2 leading-tight">
              Braço Forte<br />Mão Amiga
            </p>
            <p className="text-xs text-sampaio-parchment/60 italic mt-2">
              Soldado da Pátria e do povo
            </p>
          </div>
          <div className="text-center p-6 border border-sampaio-gold/30 rounded-lg bg-gradient-to-br from-sampaio-olive/15 to-transparent">
            <p className="text-xs uppercase tracking-widest text-sampaio-gold/70 font-display">Horizonte</p>
            <p className="font-display text-xl text-sampaio-parchment mt-2 leading-tight">
              Operações Multidomínio
            </p>
            <p className="text-xs text-sampaio-parchment/50 italic mt-2">
              ONU, missões de paz, ciberdefesa
            </p>
          </div>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-3xl mx-auto text-center border-y border-sampaio-gold/30 py-8"
        >
          <p className="font-display text-xl md:text-2xl text-sampaio-parchment italic leading-snug">
            &ldquo;A Infantaria ocupa posição central no sistema operacional da Força Terrestre —
            firmando-se como a arma do fogo, do movimento e do combate aproximado, apta a atuar
            em qualquer terreno e sob quaisquer condições meteorológicas.&rdquo;
          </p>
          <footer className="text-xs uppercase tracking-widest text-sampaio-gold/60 mt-3">
            — Doutrina do Exército Brasileiro
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
