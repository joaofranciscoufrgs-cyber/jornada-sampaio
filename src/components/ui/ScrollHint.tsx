export function ScrollHint() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sampaio-gold/60">
      <span className="text-xs tracking-widest uppercase">role</span>
      <div className="w-px h-12 bg-gradient-to-b from-sampaio-gold/60 to-transparent animate-scroll-hint" />
    </div>
  );
}
