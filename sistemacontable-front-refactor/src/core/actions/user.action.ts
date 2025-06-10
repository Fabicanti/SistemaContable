import { CreateUser, UpdateUser } from "@/schemas/user.schema";
import { api } from "../api/axios";
import { User } from "@/interfaces/user-interface";

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

/**
 * Endpoint para actualizar un usuario Método PATCH.
 * @param user es el usuario actualizado
 */
export async function updateUser(user: UpdateUser){
  const { data } = await api.patch(`${URL_BASE}/modificar`, user);
  return data;
}

/**
 * Endpoint para eliminar un usuario. Método DELETE.
 * @param user es el usuario a eliminar.
 */
export async function deleteUser(user: User){
  const { data } = await api.delete(`${URL_BASE}/eliminar`, { data: user });
  return data;
}