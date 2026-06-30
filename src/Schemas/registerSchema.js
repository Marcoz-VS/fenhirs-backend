import { z } from "zod";

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
        .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
        .regex(/[0-9]/, "Senha deve conter pelo menos um número")
        .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "Senha deve conter pelo menos um caractere especial"),
    
    rg: z
        .string()
        .min(7, "RG deve ter no mínimo 7 caracteres")
        .max(12, "RG deve ter no máximo 12 caracteres")
        .regex(/^[0-9]{1,2}\.?[0-9]{3}\.?[0-9]{3}-?[0-9xX]{1}$/, "RG inválido. Formato: XX.XXX.XXX-X ou similar"),
    
    cac: z
        .string()
        .regex(/^\d{5,9}$/, "CAC deve conter entre 5 e 9 dígitos numéricos"),
});
