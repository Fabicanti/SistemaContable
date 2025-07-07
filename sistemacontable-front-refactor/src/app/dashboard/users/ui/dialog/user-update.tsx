'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useUpdateUser } from "@/hooks/use-users";
import { User } from "@/interfaces/user-interface";
import { LoaderCircle } from "lucide-react";

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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Cambia los datos del usuario para actualizar su información en el sistema.
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {
                inputsRegister.map((input) => (
                  (input.personal &&
                    <FormField
                      key={input.id}
                      control={form.control}
                      name={input.id}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FloatingLabelInput
                              {...field}
                              value={field.value ?? ''}
                              id={input.id}
                              label={input.label}
                              type={input.type}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  )
                ))
              }
              <Separator />
              <FormField
                key={'username'}
                control={form.control}
                name={'username'}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        {...field}
                        id={'username'}
                        value={field.value ?? ''}
                        label={'Nombre de usuario'}
                        type={'text'}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-4">
                <Separator className="flex-1" />
                <span className="text-sm text-muted-foreground">Roles del sistema</span>
                <Separator className="flex-1" />
              </div>

              <FormField
                control={form.control}
                name="roleId"
                render={({ field }) => (
                  <FormItem>
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
                      "Guardar"
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