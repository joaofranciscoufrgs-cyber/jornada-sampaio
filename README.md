# Jornada do Bravo dos Bravos

Apresentação interativa para a **Jornada dos Patronos — Dia da Infantaria**, focada no Brigadeiro Antônio de Sampaio (1810-1866), Patrono da Infantaria do Exército Brasileiro.

> Evento: 29 de maio de 2026 · CPO R · Porto Alegre — RS
> Cliente: Ten Brasil · AOR/2-RS

## Stack

- **Next.js 14** (App Router, standalone output)
- **TypeScript** + **Tailwind CSS** + **Framer Motion**
- **Socket.IO** para o quiz ao vivo (servidor custom em `server.ts`)
- **Railway** para deploy via Dockerfile (auto-deploy do `main` no GitHub)

## Estrutura

```
/                  → Apresentação principal (8 seções scrollytelling)
/quiz              → Interface mobile dos cadetes (acessada por QR code)
/host              → Painel de controle do apresentador (Tenente)
```

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000

Para testar o quiz: abra `/host` em uma aba e `/quiz` em outra (ou em outro dispositivo na mesma rede).

## Deploy no Railway

1. Crie um novo projeto no Railway → "Deploy from GitHub repo"
2. Conecte este repositório
3. Railway detecta o Dockerfile automaticamente
4. Defina a variável `PORT` (Railway preenche automaticamente)
5. Conecte um domínio público (Settings → Networking → Public Networking)

O quiz ao vivo funciona via WebSocket — Railway suporta nativamente.

## Conteúdo

As 8 seções da apresentação:

1. **Hero** — Abertura com frase "Nós Somos os Senhores AMANHÃ!" e QR code
2. **Jornada** — Mapa interativo da trajetória nacional (13 lugares)
3. **Carreira** — Timeline com 17 marcos da vida militar
4. **Tríplice Aliança** — Modo "slide tradicional" (intervalo pedido pelo Tenente)
5. **Tuiuti** — Mapa tático da batalha de 24/05/1866
6. **Três Ferimentos** — Centerpiece dramático com as frases icônicas
7. **Legado** — Galeria de homenagens (Patrono, Medalha de Sangue, Panteon)
8. **Apologia do Infante** — Encerramento poético

## Quiz ao vivo

7 perguntas distribuídas pela apresentação. O Tenente controla via `/host`:
- "Exibir" → libera a pergunta para os cadetes
- "Revelar" → mostra a resposta correta e atualiza o ranking

Os cadetes acessam `/quiz` via QR code (mostrado na seção Hero) ou pela URL exibida.

## Datas-chave usadas na narrativa

- **24/05/1810** — Nascimento (Tamboril-CE)
- **24/05/1866** — Tuiuti, três ferimentos no dia do aniversário de 56 anos
- **06/07/1866** — Falecimento a bordo do navio Eponina
- **13/03/1962** — Homologação como Patrono da Infantaria
- **24/05/1996** — Translado para o Panteon (QG da 10ª RM, Fortaleza)
- **29/05/2026** — Apresentação no CPO R (160 anos de Tuiuti)
