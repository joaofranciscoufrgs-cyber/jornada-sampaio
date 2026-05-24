import { exportInscricoes } from "@/lib/exports";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return exportInscricoes("xlsx");
}
