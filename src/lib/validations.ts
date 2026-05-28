import { z } from "zod";

export function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

export function isValidCPF(input: string): boolean {
  const cpf = digitsOnly(input);
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  const calc = (slice: number) => {
    let sum = 0;
    for (let i = 0; i < slice; i++) {
      sum += parseInt(cpf[i], 10) * (slice + 1 - i);
    }
    const r = (sum * 10) % 11;
    return r === 10 ? 0 : r;
  };
  return calc(9) === parseInt(cpf[9], 10) && calc(10) === parseInt(cpf[10], 10);
}

export function formatCPF(input: string): string {
  const d = digitsOnly(input);
  return d
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

export function formatPhone(input: string): string {
  const d = digitsOnly(input);
  if (d.length <= 10) {
    return d
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
  return d
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export const inscricaoSchema = z.object({
  nome_completo: z.string().trim().min(3, "Nome muito curto").max(120),
  nome_guerra: z.string().trim().min(2, "Nome muito curto").max(80),
  cpf: z
    .string()
    .transform(digitsOnly)
    .refine((v) => v.length === 11, "CPF deve ter 11 dígitos")
    .refine(isValidCPF, "CPF inválido"),
  email: z.string().trim().toLowerCase().email("E-mail inválido").max(120),
  telefone: z
    .string()
    .transform(digitsOnly)
    .refine((v) => v.length >= 10 && v.length <= 11, "Telefone inválido"),
  eh_aluno: z.boolean(),
  consentimento: z.literal(true, { message: "Consentimento obrigatório" }),
});

export type InscricaoInput = z.infer<typeof inscricaoSchema>;

export const avaliacaoSchema = z.object({
  rating: z.number().int().min(1, "Selecione uma nota").max(5),
  comentario: z.string().trim().max(2000).optional().default(""),
});

export type AvaliacaoInput = z.infer<typeof avaliacaoSchema>;
