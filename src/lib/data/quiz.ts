import type { QuizQuestion } from "@/types/quiz";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1-nascimento",
    section: "Vida",
    prompt: "Em que data nasceu o Brigadeiro Sampaio?",
    context: "Coincidência histórica: a mesma data marcaria seu destino.",
    options: [
      { id: "a", text: "24 de maio de 1810", correct: true },
      { id: "b", text: "7 de setembro de 1822" },
      { id: "c", text: "11 de junho de 1865" },
      { id: "d", text: "2 de dezembro de 1825" },
    ],
  },
  {
    id: "q2-origem",
    section: "Vida",
    prompt: "Onde nasceu Sampaio?",
    options: [
      { id: "a", text: "Fortaleza-CE" },
      { id: "b", text: "Tamboril-CE", correct: true },
      { id: "c", text: "Jaguarão-RS" },
      { id: "d", text: "São Luís-MA" },
    ],
  },
  {
    id: "q3-combates",
    section: "Carreira",
    prompt: "De quantos combates Sampaio participou ao longo da carreira?",
    options: [
      { id: "a", text: "12 combates" },
      { id: "b", text: "25 combates" },
      { id: "c", text: "40 combates, comandando pessoalmente 36", correct: true },
      { id: "d", text: "Mais de 100 combates" },
    ],
  },
  {
    id: "q4-3divisao",
    section: "Tuiuti",
    prompt: "Pelo que ficou conhecida a 3ª Divisão de Sampaio?",
    options: [
      { id: "a", text: "Divisão Encouraçada", correct: true },
      { id: "b", text: "Divisão de Ferro" },
      { id: "c", text: "Divisão Imperial" },
      { id: "d", text: "Divisão dos Bravos" },
    ],
  },
  {
    id: "q5-1ferimento",
    section: "Ferimentos",
    prompt: "Após o 1º ferimento, o que você faria no lugar de Sampaio?",
    context: "Não há resposta certa — vamos ver o que a tropa decide.",
    options: [
      { id: "a", text: "Continuaria comandando" },
      { id: "b", text: "Recuaria para tratamento" },
      { id: "c", text: "Passaria o comando a um subordinado" },
    ],
  },
  {
    id: "q6-frase",
    section: "Ferimentos",
    prompt: "Qual foi a frase de Sampaio após o 3º ferimento?",
    options: [
      { id: "a", text: "'Pela Pátria, até o fim!'" },
      { id: "b", text: "'Diga ao marechal que este é o terceiro!'", correct: true },
      { id: "c", text: "'Eles que venham — por aqui não passam!'" },
      { id: "d", text: "'Antes da família está a Pátria!'" },
    ],
  },
  {
    id: "q7-patrono",
    section: "Legado",
    prompt: "Em que ano Sampaio foi homologado Patrono da Infantaria?",
    options: [
      { id: "a", text: "1928 — Escola do Realengo" },
      { id: "b", text: "1937 — Regimento Sampaio" },
      { id: "c", text: "1962 — Decreto 51.429", correct: true },
      { id: "d", text: "2010 — Bicentenário" },
    ],
  },
];

export function getQuestion(id: string | null): QuizQuestion | null {
  if (!id) return null;
  return QUIZ_QUESTIONS.find((q) => q.id === id) ?? null;
}
