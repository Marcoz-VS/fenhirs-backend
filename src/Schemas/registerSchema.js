import { z } from "zod";

// Removido o ": string" do parâmetro cpf
const validateCPF = (cpf) => {
  const cleanCPF = cpf.replace(/[^\d]/g, "");
  
  if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) return false;
  
  let sum = 0;
  let remainder;
  
  for (let i = 1; i <= 9; i++) sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;
  
  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;
  
  return true;
};

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]+$/, "Nome deve conter apenas letras"),
  
  email: z
    .string()
    .email("Email inválido")
    .min(5, "Email deve ter no mínimo 5 caracteres")
    .max(100, "Email deve ter no máximo 100 caracteres"),
  
  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .max(50, "Senha deve ter no máximo 50 caracteres")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "Senha deve conter pelo menos um número"),
  
  cin: z
    .string()
    .min(11, "A CIN deve ter pelo menos 11 caracteres")
    .max(14, "A CIN deve ter no máximo 14 caracteres")
    .transform((val) => val.replace(/[^\d]/g, "")) 
    .refine((val) => validateCPF(val), {
      message: "Número de CIN (CPF) inválido",
    }),
  
  cac: z
    .string()
    .regex(/^\d{5,9}$/, "CAC deve conter entre 5 e 9 dígitos numéricos")
    .optional() 
    .or(z.literal("")), 
});
