import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function buildPublicBase(req: NextRequest): string {
  const headers = req.headers;
  const proto =
    headers.get("x-forwarded-proto") ||
    (req.nextUrl.protocol.replace(":", "")) ||
    "https";
  const host =
    headers.get("x-forwarded-host") ||
    headers.get("host") ||
    req.nextUrl.host;
  return `${proto}://${host}`;
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const expected = process.env.PRESENTER_TOKEN;
  if (!expected || !token || token !== expected) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
  cookies().set("sampaio_apresentador", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  // Use public-facing host from proxy headers so redirect resolves to railway.app
  // and not to the internal 0.0.0.0:8080 container address.
  const base = buildPublicBase(req);
  return NextResponse.redirect(`${base}/`, 307);
}
