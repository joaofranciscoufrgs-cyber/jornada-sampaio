export type Local = {
  id: string;
  nome: string;
  estado: string;
  ano: string;
  evento: string;
  // Coords aproximadas em % do mapa de fundo (0-100)
  x: number;
  y: number;
};

export const JORNADA: Local[] = [
  {
    id: "tamboril",
    nome: "Tamboril",
    estado: "CE",
    ano: "1810",
    evento: "Nascimento (24/05) na Fazenda Vitor",
    x: 70,
    y: 22,
  },
  {
    id: "fortaleza",
    nome: "Fortaleza",
    estado: "CE",
    ano: "1830",
    evento: "Alistamento no 22º Batalhão de Caçadores",
    x: 77,
    y: 24,
  },
  {
    id: "para",
    nome: "Belém / Turiaçu",
    estado: "PA/MA",
    ano: "1835-37",
    evento: "Cabanagem — tomada de Turiaçú",
    x: 55,
    y: 25,
  },
  {
    id: "maranhao",
    nome: "Passagem Franca",
    estado: "MA",
    ano: "1838-41",
    evento: "Balaiada — 40 combates, 36 sob seu comando",
    x: 66,
    y: 30,
  },
  {
    id: "pernambuco",
    nome: "Recife",
    estado: "PE",
    ano: "1849",
    evento: "Praieira — repressão à revolta liberal",
    x: 84,
    y: 38,
  },
  {
    id: "jaguarao",
    nome: "Jaguarão",
    estado: "RS",
    ano: "1845-49",
    evento: "Casamento com Julia Miranda (30/04/1849)",
    x: 50,
    y: 88,
  },
  {
    id: "cacapava",
    nome: "Caçapava do Sul",
    estado: "RS",
    ano: "1852",
    evento: "Comando do 4º Btl de Fuzileiros",
    x: 47,
    y: 84,
  },
  {
    id: "sao-gabriel",
    nome: "São Gabriel",
    estado: "RS",
    ano: "1855",
    evento: "Promoção a Ten Cel — comando do 6º Btl Inf",
    x: 46,
    y: 83,
  },
  {
    id: "bage",
    nome: "Bagé",
    estado: "RS",
    ano: "1860-61",
    evento: "Guarnição de Fronteira — promoção a Coronel",
    x: 47,
    y: 86,
  },
  {
    id: "caseros",
    nome: "Monte Caseros",
    estado: "ARG",
    ano: "1852",
    evento: "Decisivo no combate à baioneta contra Rosas",
    x: 42,
    y: 85,
  },
  {
    id: "paysandu",
    nome: "Paysandú",
    estado: "URU",
    ano: "1864",
    evento: "Casa a casa — promovido a Brigadeiro",
    x: 45,
    y: 88,
  },
  {
    id: "tuiuti",
    nome: "Tuiuti",
    estado: "PAR",
    ano: "1866",
    evento: "Batalha decisiva — 3 ferimentos em 24/05",
    x: 41,
    y: 76,
  },
  {
    id: "buenos-aires",
    nome: "Buenos Aires",
    estado: "ARG",
    ano: "1866",
    evento: "Falece a bordo do navio Eponina (06/07)",
    x: 43,
    y: 92,
  },
];
