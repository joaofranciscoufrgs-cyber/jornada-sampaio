import { readFileSync } from "node:fs";
import { join } from "node:path";
import bcrypt from "bcryptjs";
import { getPool, query } from "./db";

let migrated = false;

export async function ensureSchema(): Promise<void> {
  if (migrated) return;
  if (!process.env.DATABASE_URL) {
    console.warn("[migrate] DATABASE_URL ausente — pulando migrations");
    return;
  }
  const sql = readFileSync(join(process.cwd(), "src/lib/schema.sql"), "utf8");
  const pool = getPool();
  await pool.query(sql);

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    const existing = await query<{ id: number }>(
      "SELECT id FROM admin_users WHERE email = $1",
      [email]
    );
    if (existing.rowCount === 0) {
      const hash = await bcrypt.hash(password, 10);
      await query(
        "INSERT INTO admin_users (email, password_hash, nome) VALUES ($1, $2, $3)",
        [email, hash, process.env.ADMIN_NAME || "Ten Brasil"]
      );
      console.log(`[migrate] Admin inicial '${email}' criado`);
    }
  } else {
    console.warn(
      "[migrate] ADMIN_EMAIL ou ADMIN_PASSWORD ausentes — admin inicial não foi criado"
    );
  }
  migrated = true;
  console.log("[migrate] Schema OK");
}
