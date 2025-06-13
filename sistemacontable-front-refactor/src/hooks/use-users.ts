"use client"

import { createUser, deleteUser, getUsersAll, updateUser } from "@/core/actions/user.action";
import { User } from "@/interfaces/user-interface";
import { handleApiError } from "@/lib/utils";
import { CreateUser, createUserSchema, UpdateUser, updateUserSchema } from "@/schemas/user.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

/**
 * Función para obtener todos los usuarios.
 * @returns retorna todos los usuarios y un loading.
 */
export function useUsersAll() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersAll
  })

  return { dataUsers: data ?? [], loadingUsers: isLoading }
}


/**
 * Función para crear un usuario.
 */
export function useCreateUser(login: boolean = false) {
  const queryClient = useQueryClient();
  const router = useRouter();

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

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("¡Registro exitoso!");
      if (login)
        router.push('/login')
      else
        queryClient.invalidateQueries({ queryKey: ["users"] });
      ;
    },
    onError: (error: AxiosError<ErrorMessage>) => {
      handleApiError(error, "No se pudo registrar el usuario");
    }
  });

  const onSubmit = (user: CreateUser) => {
    createUserMutation.mutate(user);
  }

  return { form, isLoadingCreateUser: createUserMutation.isPending, onSubmit }
}


/**
 * Función para editar o actualizar un usuario.
 * @param user es el usuario actual.
 */
export function useUpdateUser(user: User) {
  const queryClient = useQueryClient();
  const form = useForm<UpdateUser>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      username: user.username,
      roleId: user.roleId
    }
  });


  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Se actualizó el usuario!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: AxiosError<ErrorMessage>) => {
      handleApiError(error, "No se pudo actualizar el usuario");
    }
  });


  const onSubmit = (updateUser: UpdateUser) => {
    updateUserMutation.mutate(updateUser);
  }

  return { form, isLoadingUpdateUser: updateUserMutation.isPending, onSubmit }
}


/**
 * Función para eliminar un usuario.
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("¡Se ha eliminado con exito!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: AxiosError<ErrorMessage>) => {
      handleApiError(error, "No se pudo eliminar el usuario");
    }
  })

  const onSubmit = (user: User) => {
    deleteUserMutation.mutate(user);
  }

  return { isLoadingDeleteUser: deleteUserMutation.isPending, onSubmit }
}