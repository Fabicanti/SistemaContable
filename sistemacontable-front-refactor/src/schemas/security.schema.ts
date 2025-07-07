import { z } from "zod";

/**
 * Esquema de validación para cambiar la contraseña.
 */
export const changePasswordSchema = z
  .object({
    userId: z
      .number(),
    oldPassword: z
      .string()
      .min(4, "La contraseña actual es obligatoria"),
    newPassword: z
      .string()
      .min(4, "La nueva contraseña debe tener al menos 4 caracteres"),
    confirmPassword: z
      .string()
      .min(4, "Debes confirmar la nueva contraseña"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;