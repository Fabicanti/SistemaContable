import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(20, { message: "El nombre no puede tener más de 20 caracteres" }),
  
  lastName: z
    .string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres" })
    .max(20, { message: "El apellido no puede tener más de 20 caracteres" }),
  
  email: z
    .string()
    .email({ message: "El email no es válido" }),
  
  username: z
    .string()
    .min(2, { message: "El nombre de usuario debe tener al menos 2 caracteres" })
    .max(20, { message: "El nombre de usuario no puede tener más de 20 caracteres" }),
  
  password: z
    .string()
    .min(2, { message: "La contraseña debe tener como mínimo 2 caracteres" }),
});

export type Register = z.infer<typeof registerSchema>;