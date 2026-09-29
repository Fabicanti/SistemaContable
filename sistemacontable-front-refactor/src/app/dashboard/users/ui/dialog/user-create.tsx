
import React from 'react'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormInput } from "@/components/form/form-input";
import { FormPasswordInput } from "@/components/form/form-password-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCreateUser } from "@/hooks/use-users";
import { LoaderCircle, Mail, UserRound } from "lucide-react";

type InputsId = {
  id: 'nombre' | 'apellido' | 'email' | 'password' | 'username';
  label: string
  type: string
  personal: boolean
}

const inputsRegister: InputsId[] = [
  { id: 'nombre', label: 'Nombre', type: 'text', personal: true },
  { id: 'apellido', label: 'Apellido', type: 'text', personal: true },
  { id: 'email', label: 'Email', type: 'email', personal: true },
  { id: 'username', label: 'Nombre de usuario', type: 'text', personal: false },
  { id: 'password', label: 'Contraseña', type: 'password', personal: false },
]

const roleOptions = [
  { label: "Usuario", value: 1 },
  { label: "Administrador", value: 2 },
  { label: "Espectador", value: 3 },
] as const;

type Props = {
  open: boolean
  onClose: () => void
}

export default function UserCreate({ open, onClose }: Props) {
  const { form, isLoadingCreateUser, onSubmit } = useCreateUser();

  if (!open) return null;

  return (
    <div>
      <Dialog open={!!open} onOpenChange={onClose}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nuevo usuario</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Completa los datos para registrar un nuevo usuario.
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
              {
                inputsRegister.map((input) => (
                  (input.personal &&
                    <FormInput
                      key={input.id}
                      control={form.control}
                      name={input.id}
                      label={input.label}
                      type={input.type}
                      icon={input.id === 'email' ? Mail : UserRound}
                      accent="pink"
                      itemClassName={input.id === 'email' ? 'sm:col-span-2' : undefined}
                    />
                  )
                ))
              }
              </div>
              <div className="flex items-center gap-4">
                <Separator className="flex-1" />
                <span className="text-sm text-muted-foreground">Autenticación</span>
                <Separator className="flex-1" />
              </div>
              <FormInput
                control={form.control}
                name="username"
                label="Nombre de usuario"
                icon={UserRound}
                accent="pink"
                autoCapitalize="none"
                spellCheck={false}
              />
              <FormPasswordInput
                control={form.control}
                name="password"
                label="Contraseña"
                accent="pink"
                autoComplete="new-password"
              />

              <FormField
                control={form.control}
                name="roleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <Select onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()} >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona un rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roleOptions.map((role) => (
                          <SelectItem key={role.value} value={role.value.toString()}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isLoadingCreateUser}
                >
                  Cancelar
                </Button>
                <Button
                  variant={'pink'}
                  className="font-normal"
                  disabled={isLoadingCreateUser}
                >
                  {isLoadingCreateUser ?
                    (<div className="flex items-center justify-center">
                      <LoaderCircle className="mr-2 animate-spin" />
                      Creando...
                    </div>) :
                    (
                      "Crear usuario"
                    )
                  }
                </Button>
              </DialogFooter>
            </form>
          </Form>

        </DialogContent>
      </Dialog>
    </div>
  )
}