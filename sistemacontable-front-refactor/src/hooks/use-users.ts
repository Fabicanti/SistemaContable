"use client"

import { getUsersAll } from "@/core/actions/user.action";
import { CreateUser, createUserSchema, UpdateUser, updateUserSchema } from "@/schemas/user.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const STALE_TIME = 1000 * 60 * 60;

/**
 * Función para obtener todos los usuarios.
 * @returns retorna todos los usuarios y un loading.
 */
export function useUsersAll(){
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersAll
  })

  return { dataUsers: data ?? [], loadingUsers: isLoading }
}


/**
 * Función para crear un usuario.
 */
export function useCreateUser() {
  const form = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      username: '',
      roleId: 1
    }
  });

  const onSubmit = (user: CreateUser) => {
    console.log(user)
  }

  return { form, onSubmit }
}


/**
 * Función para editar o actualizar un usuario.
 * @param user es el usuario actual.
 */
export function useEditUser(user: User){
  const form = useForm<UpdateUser>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      username: user.username,
      roleId: user.roleId
    }
  });

  const onSubmit = (updateUser: UpdateUser) => {
    console.log(updateUser);
  }

  return { form, onSubmit }
}