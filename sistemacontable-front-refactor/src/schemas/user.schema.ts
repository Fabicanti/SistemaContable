import { z } from "zod";

const roles = [1, 2] as const;

const userSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(20, "El nombre no puede tener más de 20 caracteres"),
  apellido: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(20, "El apellido no puede tener más de 20 caracteres"),
  email: z
    .string()
    .email("El email no es válido"),
  username:
    z.string()
      .min(2, "El nombre de usuario debe tener al menos 2 caracteres")
      .max(20, "El nombre de usuario no puede tener más de 20 caracteres"),
  roleId: z
    .number().refine((val) => roles.includes(val as any), {
      message: "Rol inválido.",
    }),
});

export const createUserSchema = userSchema.extend({
  password: z
    .string()
    .min(2, "La contraseña debe tener como mínimo 2 caracteres"),
});


export const updateUserSchema = userSchema.extend({
  password: z.string().optional().nullable()
});


export type UpdateUser = z.infer<typeof updateUserSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;

