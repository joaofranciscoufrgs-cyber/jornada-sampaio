import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  return NextResponse.redirect(new URL("/", req.url));
}
