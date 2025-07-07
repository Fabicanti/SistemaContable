"use client";

import { changePassword } from "@/core/actions/user.action";
import { ErrorMessage } from "@/interfaces/error-interface";
import { ChangePassword } from "@/interfaces/user-interface";
import { handleApiError } from "@/lib/utils";
import { ChangePasswordForm, changePasswordSchema } from "@/schemas/security.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner";

/**
 * Hook para manejar el formulario de cambio de contraseña.
 * @param userId - ID del usuario para el cual se cambiará la contraseña.
 */
export const useChangePassword = (userId: number | undefined) => {
  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      userId: 0,
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  useEffect(() => {
    if (userId) {
      form.reset({
        userId: userId,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [userId, form]);

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      form.reset();
      toast.success("Cambio exitoso", {
        description: "La contraseña se actualizó correctamente.",
      });
    },
    onError: (error: AxiosError<ErrorMessage>) => {
      handleApiError(error, "No se pudo actualizar la contraseña.");
    }
  })

  const onSubmit = (data: ChangePasswordForm) => {
    const { userId, oldPassword, newPassword } = data;
    const validData: ChangePassword = { userId, oldPassword, newPassword };
    changePasswordMutation.mutate(validData);
  }

  return { form, onSubmit, isLoadingChangePassword: changePasswordMutation.isPending };
}