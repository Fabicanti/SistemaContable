
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useCreateAccount } from '@/hooks/use-accounts';
import { LoaderCircle } from 'lucide-react';
import React from 'react'

type InputId = {
  id: 'nombre' | 'cuentaPadreId';
  label: string;
  type: string;
}

const InputsAccount: InputId[] = [
  { id: 'nombre', label: "Nombre de la cuenta", type: 'text' },
  { id: 'cuentaPadreId', label: "Código de cuenta padre", type: 'number' }
];

const typesOptions = [
  { label: "Activo", value: 1 },
  { label: "Pasivo", value: 2 },
  { label: "Patrimonio Neto", value: 3 },
  { label: "Ingresos", value: 4 },
  { label: "Gastos", value: 5 },
] as const;

type Props = {
  open: boolean;
  onClose: () => void;
}

export default function AccountCreate({ open, onClose }: Props) {
  const { form, isLoadingCreateAccount, onSubmit } = useCreateAccount();

  if (!open) return null;

  return (
    <div>
      <Dialog open={!!open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear cuenta contable</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Completa los datos para crear una nueva cuenta.
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {
                InputsAccount.map((input) => (
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
                ))
              }

              <FormField
                control={form.control}
                name="recibeSaldo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 ">
                    <div className="space-y-0.5">
                      <FormLabel>¿La cuenta recibe saldo?</FormLabel>
                      <FormDescription
                        className={`
                          ${field.value ? "text-green-500 dark:text-green-700" : "text-red-500 dark:text-red-700"}
                        `}
                      >
                        {field.value
                          ? "Esta cuenta podrá acumular saldos monetarios."
                          : "Esta cuenta no registrará movimientos de saldo."}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-4">
                <Separator className="flex-1" />
                <span className="text-sm text-muted-foreground">Tipo de cuenta</span>
                <Separator className="flex-1" />
              </div>

              <FormField
                control={form.control}
                name="tipoCuentaId"
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
                        {typesOptions.map((type) => (
                          <SelectItem key={type.value} value={type.value.toString()}>
                            {type.label}
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
                  disabled={isLoadingCreateAccount}
                >
                  Cancelar
                </Button>
                <Button
                  variant={'pink'}
                  className="font-normal"
                  disabled={isLoadingCreateAccount}
                >
                  {isLoadingCreateAccount ?
                    (<div className="flex items-center justify-center">
                      <LoaderCircle className="mr-2 animate-spin" />
                      Creando...
                    </div>) :
                    (
                      "Crear"
                    )
                  }
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div >
  )
}