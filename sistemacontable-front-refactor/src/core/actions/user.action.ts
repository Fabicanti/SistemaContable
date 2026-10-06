import { CreateUser, UpdateUser } from "@/schemas/user.schema";
import { api } from "../api/axios";
import { ChangePassword, User } from "@/interfaces/user-interface";

const URL_BASE = "api/usuarios";

/**
 * Endpoint para obtener un usuario por su ID. Método GET.
 * @param id es el id del usuario a buscar.
 * @returns retorna el usuario encontrado.
 */
export const getUserById = async (id: number): Promise<User> => {
  const { data } = await api.get<User>(`${URL_BASE}/${id}`);
  return data;
}

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
 * Endpoint para cambiar la contraseña de un usuario. Método PATCH.
 * @param change es el cambio de contraseña del usuario.
 */
export async function changePassword(change: ChangePassword) {
  const { data } = await api.patch(`${URL_BASE}/modificarPassword`, change);
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