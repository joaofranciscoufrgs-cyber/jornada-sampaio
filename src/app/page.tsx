import { HeroSection } from "@/components/sections/HeroSection";
import { JornadaSection } from "@/components/sections/JornadaSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ParaguaiSection } from "@/components/sections/ParaguaiSection";
import { TuiutiSection } from "@/components/sections/TuiutiSection";
import { TresFerimentosSection } from "@/components/sections/TresFerimentosSection";
import { LegadoSection } from "@/components/sections/LegadoSection";
import { EncerramentoSection } from "@/components/sections/EncerramentoSection";
import { Navegacao } from "@/components/ui/Navegacao";

export default function Home() {
  return (
    <main className="relative">
      <Navegacao />
      <HeroSection />
      <JornadaSection />
      <TimelineSection />
      <ParaguaiSection />
      <TuiutiSection />
      <TresFerimentosSection />
      <LegadoSection />
      <EncerramentoSection />
    </main>
  );
}
