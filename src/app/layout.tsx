import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jornada do Bravo dos Bravos | Brig. Antônio de Sampaio",
  description:
    "Apresentação interativa sobre o Patrono da Infantaria Brasileira — Jornada dos Patronos · AOR2-RS · CPO R 2026",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-sampaio-ink text-sampaio-parchment antialiased">
        {children}
      </body>
    </html>
  );
}
