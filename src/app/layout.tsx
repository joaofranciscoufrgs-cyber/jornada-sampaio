import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jornada do Bravo dos Bravos | Brig. Antônio de Sampaio",
  description:
    "Apresentação interativa sobre o Patrono da Infantaria Brasileira — Jornada dos Patronos · AOR/2-RS · CPOR/PA 2026",
  applicationName: "Jornada Sampaio",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Jornada Sampaio",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0b0d10",
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
