import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const COOKIE_NAME_ADMIN = "sampaio_admin";
const COOKIE_NAME_INSC = "sampaio_inscrito";
const MAX_AGE = 60 * 60 * 12;

function getSecret(): Uint8Array {
  const s = process.env.JWT_SECRET;
  if (!s || s.length < 16) {
    throw new Error("JWT_SECRET ausente ou curto demais (mínimo 16 chars)");
  }
  return new TextEncoder().encode(s);
}

export type AdminClaims = { sub: number; email: string };
export type InscritoClaims = { sub: number; nome_guerra: string };

export async function signAdmin(payload: AdminClaims): Promise<string> {
  return new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(payload.sub))
    .setExpirationTime("12h")
    .setIssuedAt()
    .sign(getSecret());
}

export async function signInscrito(payload: InscritoClaims): Promise<string> {
  return new SignJWT({ nome_guerra: payload.nome_guerra })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(payload.sub))
    .setExpirationTime("12h")
    .setIssuedAt()
    .sign(getSecret());
}

async function verify<T extends { sub: number }>(
  token: string | undefined
): Promise<T | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.sub !== "string") return null;
    return {
      ...payload,
      sub: parseInt(payload.sub, 10),
    } as unknown as T;
  } catch {
    return null;
  }
}

export async function getAdmin(): Promise<AdminClaims | null> {
  return verify<AdminClaims>(cookies().get(COOKIE_NAME_ADMIN)?.value);
}

export async function getInscrito(): Promise<InscritoClaims | null> {
  return verify<InscritoClaims>(cookies().get(COOKIE_NAME_INSC)?.value);
}

export function setAdminCookie(token: string) {
  cookies().set(COOKIE_NAME_ADMIN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export function setInscritoCookie(token: string) {
  cookies().set(COOKIE_NAME_INSC, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export function clearAdminCookie() {
  cookies().delete(COOKIE_NAME_ADMIN);
}

export function clearInscritoCookie() {
  cookies().delete(COOKIE_NAME_INSC);
}

export const hashPassword = (p: string) => bcrypt.hash(p, 10);
export const checkPassword = (p: string, h: string) => bcrypt.compare(p, h);

export const COOKIES = {
  ADMIN: COOKIE_NAME_ADMIN,
  INSC: COOKIE_NAME_INSC,
};
