import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().nonempty("El nombre es requerido"),
  lastName: z.string().nonempty("El apellido es requerido"),
  email: z.string().email("El email no es válido"),
  username: z.string().nonempty("El nombre de usuario es requerido"),
  password: z.string().min(2, {
    message: "La contraseña debe tener como mínimo 2 caracter/es"
  })
})

export type Register = z.infer<typeof registerSchema>;