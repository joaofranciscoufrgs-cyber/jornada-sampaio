"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { id: "hero", label: "Início" },
  { id: "jornada", label: "Jornada" },
  { id: "timeline", label: "Carreira" },
  { id: "paraguai", label: "Tríplice Aliança" },
  { id: "tuiuti", label: "Tuiuti" },
  { id: "ferimentos", label: "Os 3 Ferimentos" },
  { id: "video-break", label: "Vídeo" },
  { id: "legado", label: "Legado" },
  { id: "rainha-hoje", label: "Rainha Hoje" },
  { id: "video-longo", label: "Institucional" },
  { id: "encerramento", label: "Apologia" },
];

export function Navegacao() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {links.map((l) => (
        <a
          key={l.id}
          href={`#${l.id}`}
          className="group flex items-center gap-3 justify-end"
        >
          <span
            className={cn(
              "text-xs uppercase tracking-widest transition-all",
              active === l.id ? "text-sampaio-gold opacity-100" : "text-sampaio-parchment/40 opacity-0 group-hover:opacity-100"
            )}
          >
            {l.label}
          </span>
          <span
            className={cn(
              "w-2 h-2 rounded-full transition-all border",
              active === l.id
                ? "bg-sampaio-gold border-sampaio-gold scale-150"
                : "bg-transparent border-sampaio-parchment/40 group-hover:border-sampaio-gold"
            )}
          />
        </a>
      ))}
    </nav>
  );
}
