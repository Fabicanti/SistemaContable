'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormInput } from "@/components/form/form-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useUpdateUser } from "@/hooks/use-users";
import { User } from "@/interfaces/user-interface";
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
]

const roleOptions = [
  { label: "Usuario", value: 1 },
  { label: "Administrador", value: 2 },
  { label: "Espectador", value: 3 },
] as const;

type Props = {
  user: User;
  onClose: () => void;
}

export default function UserUpdate({ user, onClose }: Props) {
  const { form, isLoadingUpdateUser, onSubmit } = useUpdateUser(user);

  if (!user) return null;

  return (
    <div>
      <Dialog open={!!user} onOpenChange={onClose}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar usuario</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Cambia los datos del usuario para actualizar su información en el sistema.
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
              <Separator />
              <FormInput
                control={form.control}
                name="username"
                label="Nombre de usuario"
                icon={UserRound}
                accent="pink"
                autoCapitalize="none"
                spellCheck={false}
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
                  disabled={isLoadingUpdateUser}
                >
                  Cancelar
                </Button>
                <Button
                  variant={'pink'}
                  className="font-normal"
                  disabled={isLoadingUpdateUser}
                >
                  {isLoadingUpdateUser ?
                    (<div className="flex items-center justify-center">
                      <LoaderCircle className="mr-2 animate-spin" />
                      Guardando...
                    </div>) :
                    (
                      "Guardar cambios"
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