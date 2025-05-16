import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().nonempty("El nombre de usuario es requerido"),
  password: z.string().nonempty("La contraseña es requerida"),
});

export type Login = z.infer<typeof loginSchema>;