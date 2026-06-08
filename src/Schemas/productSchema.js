import { z } from "zod";

export const productSchema = z.object({
    title: z
        .string()
        .min(3),
    description: z
        .string()
        .min(5),
    category: z.enum([
        "ARMA",
        "MUNICAO",
        "CURSO"
    ]),
    imageUrl: z
        .string()
        .url(),
});