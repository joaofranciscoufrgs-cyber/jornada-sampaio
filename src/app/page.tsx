import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getInscrito } from "@/lib/auth";
import { HeroSection } from "@/components/sections/HeroSection";
import { JornadaSection } from "@/components/sections/JornadaSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ParaguaiSection } from "@/components/sections/ParaguaiSection";
import { TuiutiSection } from "@/components/sections/TuiutiSection";
import { TresFerimentosSection } from "@/components/sections/TresFerimentosSection";
import { LegadoSection } from "@/components/sections/LegadoSection";
import { EncerramentoSection } from "@/components/sections/EncerramentoSection";
import { Navegacao } from "@/components/ui/Navegacao";

export const dynamic = "force-dynamic";

export default async function Home() {
  const inscrito = await getInscrito();
  const isPresenter = cookies().get("sampaio_apresentador")?.value === "1";

  if (!inscrito && !isPresenter) {
    redirect("/inscricao");
  }

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
