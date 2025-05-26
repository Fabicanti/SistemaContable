import { CreateUser } from "@/schemas/user.schema";
import { api } from "../api/axios";

const URL_BASE = "api/usuarios";

/**
 * Endpoint donde se obtienen todos los usuarios. Método GET.
 * @returns retorna todos los usuarios registrados.
 */
export const getUsersAll = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>(URL_BASE);
  return data;
}

/**
 * Endpoint para crear un usuario. Método POST
 * @param user es el nuevo usuario.
 */
export async function createUser(user: CreateUser): Promise<Record<string, string>>{
  const { data } = await api.post<Record<string, string>>(`${URL_BASE}/registrar`, user);
  return data;
}