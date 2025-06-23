import { z } from "zod";

export const movementSchema = z.object({
  id: z
    .number(),
  cuentaId: z
    .number()
    .min(1, "El ID de la cuenta es obligatorio"),
  nombreCuenta: z
    .string()
    .min(1, "El nombre es obligatorio"),
  debe: z
    .number(),
  haber: z
    .number(),
});

export const entrieSchema = z.object({
  usuarioId: z
    .number(),
  fecha: z
    .string({
      required_error: "La fecha es obligatoria",
    })
    .refine(val => !isNaN(Date.parse(val)), {
      message: "La fecha no es válida",
    }),
  descripcion: z
    .string()
    .optional(),
  detalles: z
    .array(movementSchema)
    .min(1, "Debe haber al menos un movimiento"),
});

export type Entrie = z.infer<typeof entrieSchema>;