"use client"

import SeparatorTitle from '@/components/shared/separator-title';
import { Button } from '@/components/ui/button';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator';
import { useChangePassword } from '@/hooks/use-config';
import { useUserStore } from '@/stores/user-store'
import { LoaderCircle } from 'lucide-react';
import React from 'react'


export default function SecurityPassword() {
  const { user } = useUserStore();
  const { form, onSubmit, isLoadingChangePassword } = useChangePassword(user?.id);

  if (!user) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-xl font-semibold">Cambiar contraseña</h2>
        <p className="text-sm text-muted-foreground">
          Modificá tu contraseña actual para mantener tu cuenta segura.
        </p>
        <Separator />

        <FormField
          key={'oldPassword'}
          control={form.control}
          name={'oldPassword'}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  {...field}
                  id={'oldPassword'}
                  label={'Contraseña Actual'}
                  type={'text'}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <SeparatorTitle title='Contraseña nueva' />

        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
          <FormField
            key={'newPassword'}
            control={form.control}
            name={'newPassword'}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput
                    {...field}
                    id={'newPassword'}
                    label={'Contraseña Nueva'}
                    type={'password'}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            key={'confirmPassword'}
            control={form.control}
            name={'confirmPassword'}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput
                    {...field}
                    id={'confirmPassword'}
                    label={'Confirmar Contraseña'}
                    type={'password'}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <div className='flex justify-end'>
          <Button
            disabled={isLoadingChangePassword}
          >
            {isLoadingChangePassword ? (
              <div className="flex items-center justify-center">
                <LoaderCircle className="mr-2 animate-spin" />
                Actualizando...
              </div>) :
              (
                "Cambiar contraseña"
              )
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}