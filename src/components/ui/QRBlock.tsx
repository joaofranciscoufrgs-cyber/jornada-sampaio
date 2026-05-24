"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

export function QRBlock({ path = "/quiz", label = "Participe do quiz" }: { path?: string; label?: string }) {
  const [dataUrl, setDataUrl] = useState<string>("");
  const [fullUrl, setFullUrl] = useState<string>("");

  useEffect(() => {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${base}${path}`;
    setFullUrl(url);
    QRCode.toDataURL(url, {
      margin: 1,
      width: 320,
      color: { dark: "#0b0d10", light: "#e9e1cf" },
    }).then(setDataUrl);
  }, [path]);

  return (
    <div className="flex flex-col items-center gap-3 bg-sampaio-parchment text-sampaio-ink p-5 rounded-lg shadow-2xl border-2 border-sampaio-gold/80">
      {dataUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={dataUrl} alt="QR code" className="w-48 h-48" />
      )}
      <div className="text-center">
        <p className="font-display text-sm uppercase tracking-wider">{label}</p>
        <p className="text-xs text-sampaio-ink/60 mt-1 font-mono break-all max-w-[16rem]">{fullUrl}</p>
      </div>
    </div>
  );
}
