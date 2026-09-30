"use client";

import { FormPasswordInput } from '@/components/form/form-password-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useChangePassword } from '@/hooks/use-config';
import { useUserStore } from '@/stores/user-store';
import { LoaderCircle, ShieldCheck } from 'lucide-react';

export default function SecurityPassword() {
  const { user } = useUserStore();
  const { form, onSubmit, isLoadingChangePassword } = useChangePassword(user?.id);

  if (!user) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <header className="space-y-1 border-b pb-5">
          <h2 className="text-lg font-semibold">Cambiar contraseña</h2>
          <p className="text-sm text-muted-foreground">Ingresá tu contraseña actual y elegí una nueva.</p>
        </header>
        <FormPasswordInput control={form.control} name="oldPassword" label="Contraseña actual" autoComplete="current-password" disabled={isLoadingChangePassword} />
        <div className="space-y-4 border-t pt-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <FormPasswordInput control={form.control} name="newPassword" label="Nueva contraseña" autoComplete="new-password" disabled={isLoadingChangePassword} description="Debe tener al menos 4 caracteres." />
            <FormPasswordInput control={form.control} name="confirmPassword" label="Confirmar contraseña" autoComplete="new-password" disabled={isLoadingChangePassword} />
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg bg-muted/40 p-4 text-sm text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <p>Usá una contraseña única que no utilices en otras cuentas.</p>
        </div>
        <footer className="flex justify-end border-t pt-5">
          <Button type="submit" className="w-full sm:w-auto" disabled={isLoadingChangePassword || !form.formState.isDirty}>
            {isLoadingChangePassword && <LoaderCircle className="animate-spin" />}{isLoadingChangePassword ? 'Actualizando…' : 'Cambiar contraseña'}
          </Button>
        </footer>
      </form>
    </Form>
  );
}
