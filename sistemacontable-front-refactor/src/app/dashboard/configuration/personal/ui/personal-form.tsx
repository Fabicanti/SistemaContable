"use client";

import { FormInput } from "@/components/form/form-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useUpdateMyUser } from "@/hooks/use-users";
import { useUserStore } from "@/stores/user-store";
import { Crown, Eye, LoaderCircle, Save, UserRound } from "lucide-react";

export default function PersonalForm() {
  const { user } = useUserStore();
  const { form, onSubmit, isLoadingUpdateMyUser } = useUpdateMyUser(user);
  const isAdmin = user?.roleId === 2;
  const isViewer = user?.roleId === 3;
  const canCreateAsientos = user?.roleId === 1 || isAdmin;

  if (!user) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <header className="space-y-1 border-b pb-5">
          <h2 className="text-lg font-semibold">Información personal</h2>
          <p className="text-sm text-muted-foreground">
            Mantené actualizados los datos de tu cuenta.
          </p>
        </header>
        <fieldset
          disabled={isLoadingUpdateMyUser}
          className="min-w-0 space-y-5"
        >
          <legend className="mb-4 text-sm font-semibold">
            Datos personales
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput
              control={form.control}
              name="nombre"
              label="Nombre"
              autoComplete="given-name"
            />
            <FormInput
              control={form.control}
              name="apellido"
              label="Apellido"
              autoComplete="family-name"
            />
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Tu nombre y apellido aparecerán en los asientos contables que crees.
          </p>
          <FormInput
            control={form.control}
            name="email"
            label="Correo electrónico"
            type="email"
            autoComplete="email"
            readOnly={isViewer}
            description={
              isViewer
                ? "El correo no se puede editar con el rol de espectador."
                : undefined
            }
          />
        </fieldset>
        <fieldset
          disabled={isLoadingUpdateMyUser}
          className="min-w-0 space-y-4 border-t pt-5"
        >
          <legend className="px-1 text-sm font-semibold">
            Datos de la cuenta
          </legend>
          <FormInput
            control={form.control}
            name="username"
            label="Nombre de usuario"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
          />
          <div className="space-y-2 rounded-lg bg-muted/40 p-3">
            <p className="text-xs font-medium text-muted-foreground">
              Rol y permisos
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={isAdmin ? "admin" : isViewer ? "outline" : "default"}
              >
                {isAdmin ? (
                  <Crown className="size-3" />
                ) : isViewer ? (
                  <Eye className="size-3" />
                ) : (
                  <UserRound className="size-3" />
                )}
                {isAdmin
                  ? "Administrador"
                  : isViewer
                    ? "Espectador"
                    : "Usuario"}
              </Badge>
              <Badge
                variant="secondary"
                className={
                  canCreateAsientos
                    ? "bg-blue-500 text-white dark:bg-blue-600"
                    : "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
                }
              >
                {canCreateAsientos ? "Puede crear asientos" : "Solo consulta"}
              </Badge>
            </div>
          </div>
        </fieldset>
        <footer className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground" role="status">
            {form.formState.isDirty
              ? "Tenés cambios sin guardar."
              : "Tus datos están actualizados."}
          </p>
          <Button
            type="submit"
            disabled={isLoadingUpdateMyUser || !form.formState.isDirty}
            className="w-full sm:w-auto"
          >
            {isLoadingUpdateMyUser ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Save aria-hidden="true" />
            )}
            {isLoadingUpdateMyUser ? "Guardando…" : "Guardar cambios"}
          </Button>
        </footer>
      </form>
    </Form>
  );
}
