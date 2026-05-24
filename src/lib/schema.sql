CREATE TABLE IF NOT EXISTS inscricoes (
  id          SERIAL PRIMARY KEY,
  nome_guerra TEXT NOT NULL,
  cpf         TEXT NOT NULL UNIQUE,
  email       TEXT NOT NULL,
  telefone    TEXT NOT NULL,
  consentimento BOOLEAN NOT NULL DEFAULT false,
  ip          TEXT,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS inscricoes_created_at_idx ON inscricoes(created_at DESC);

CREATE TABLE IF NOT EXISTS admin_users (
  id            SERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  nome          TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
