import { Pool, type PoolConfig } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
}

function makePool(): Pool {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  const config: PoolConfig = {
    connectionString: url,
    max: 10,
  };
  if (process.env.PGSSL !== "false" && !url.includes("localhost")) {
    config.ssl = { rejectUnauthorized: false };
  }
  return new Pool(config);
}

export function getPool(): Pool {
  if (!global.__pgPool) {
    global.__pgPool = makePool();
  }
  return global.__pgPool;
}

export async function query<T = unknown>(
  text: string,
  params?: unknown[]
): Promise<{ rows: T[]; rowCount: number }> {
  const pool = getPool();
  const res = await pool.query(text, params as never);
  return { rows: res.rows as T[], rowCount: res.rowCount ?? 0 };
}
