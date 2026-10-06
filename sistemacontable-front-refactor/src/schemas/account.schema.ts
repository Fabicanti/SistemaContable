import { z } from "zod";

const accountTypes = [1, 2, 3, 4, 5] as const;

export const accountSchema = z.object({
  nombre: z
    .string()
    .nonempty("El nombre de la cuenta es requerido"),
  saldo: z
    .number()
    .min(0, "El saldo debe ser un número positivo"),
  tipoCuentaId: z
    .number()
    .refine((val) => accountTypes.includes(val as 1 | 2 | 3 | 4 | 5), {
      message: "Tipo de cuenta inválida."
    }),
  recibeSaldo: z
    .boolean(),
  cuentaPadreId: z
    .string()
    .optional()
});

export type Account = z.infer<typeof accountSchema>;