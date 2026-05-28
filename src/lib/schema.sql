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

-- Novos campos solicitados pelo Tenente (idempotente):
ALTER TABLE inscricoes ADD COLUMN IF NOT EXISTS nome_completo TEXT NOT NULL DEFAULT '';
ALTER TABLE inscricoes ADD COLUMN IF NOT EXISTS eh_aluno BOOLEAN NOT NULL DEFAULT true;

CREATE TABLE IF NOT EXISTS avaliacoes (
  id            SERIAL PRIMARY KEY,
  inscricao_id  INT NOT NULL REFERENCES inscricoes(id) ON DELETE CASCADE,
  rating        INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comentario    TEXT NOT NULL DEFAULT '',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(inscricao_id)
);

CREATE INDEX IF NOT EXISTS avaliacoes_created_at_idx ON avaliacoes(created_at DESC);

CREATE TABLE IF NOT EXISTS admin_users (
  id            SERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  nome          TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
