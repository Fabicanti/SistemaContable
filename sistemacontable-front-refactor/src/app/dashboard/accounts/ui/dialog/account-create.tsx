"use client";

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useCreateAccount } from '@/hooks/use-accounts';
import { LoaderCircle } from 'lucide-react';

const typesOptions = [
  { label: 'Activo', value: 1 },
  { label: 'Pasivo', value: 2 },
  { label: 'Patrimonio neto', value: 3 },
  { label: 'Resultado positivo', value: 4 },
  { label: 'Resultado negativo', value: 5 },
];

type Props = { open: boolean; onClose: () => void };

export default function AccountCreate({ open, onClose }: Props) {
  const { form, isLoadingCreateAccount, onSubmit } = useCreateAccount(onClose);

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => { if (!nextOpen && !isLoadingCreateAccount) onClose(); }}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nueva cuenta contable</DialogTitle>
          <DialogDescription>Definí su nombre, clasificación y lugar en el plan de cuentas.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" aria-busy={isLoadingCreateAccount}>
            <fieldset disabled={isLoadingCreateAccount} className="space-y-5">
              <FormField control={form.control} name="nombre" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la cuenta</FormLabel>
                  <FormControl><Input {...field} placeholder="Ej.: Caja en pesos" autoComplete="off" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="tipoCuentaId" render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de cuenta</FormLabel>
                  <Select disabled={isLoadingCreateAccount} onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                    <FormControl><SelectTrigger className="w-full"><SelectValue placeholder="Seleccioná un tipo de cuenta" /></SelectTrigger></FormControl>
                    <SelectContent>{typesOptions.map((type) => <SelectItem key={type.value} value={type.value.toString()}>{type.label}</SelectItem>)}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="cuentaPadreId" render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de cuenta padre <span className="font-normal text-muted-foreground">(opcional)</span></FormLabel>
                  <FormControl><Input {...field} value={field.value ?? ''} placeholder="Ej.: 10000" inputMode="numeric" autoComplete="off" /></FormControl>
                  <FormDescription>Ingresá el código de la cuenta que la agrupa. Dejalo vacío para crear una cuenta principal.</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="recibeSaldo" render={({ field }) => (
                <FormItem className="flex items-center justify-between gap-4 rounded-lg border bg-muted/30 p-4">
                  <div className="space-y-1">
                    <FormLabel>Recibe saldo</FormLabel>
                    <FormDescription>{field.value ? 'Permite registrar movimientos y acumular saldo.' : 'Agrupa otras cuentas, sin registrar movimientos propios.'}</FormDescription>
                  </div>
                  <FormControl><Switch disabled={isLoadingCreateAccount} checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                </FormItem>
              )} />
            </fieldset>
            <DialogFooter className="border-t pt-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoadingCreateAccount}>Cancelar</Button>
              <Button type="submit" variant="pink" disabled={isLoadingCreateAccount}>
                {isLoadingCreateAccount && <LoaderCircle className="size-4 animate-spin" />}
                {isLoadingCreateAccount ? 'Creando cuenta...' : 'Crear cuenta'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
