"use client"

import SeparatorTitle from '@/components/shared/separator-title';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { useUpdateMyUser } from '@/hooks/use-users';
import { useUserStore } from '@/stores/user-store'
import { BadgeCheckIcon, Crown, Eye, LoaderCircle, UserRound } from 'lucide-react';
import React from 'react'

type InputsId = {
  id: 'nombre' | 'apellido';
  label: string;
  type: string;
  personal: boolean;
}

const inputsUpdate: InputsId[] = [
  { id: 'nombre', label: 'Nombre', type: 'text', personal: true },
  { id: 'apellido', label: 'Apellido', type: 'text', personal: true },
];


export default function PersonalForm() {
  const { user } = useUserStore();

  const canCreateAsientos = user?.roleId === 1 || user?.roleId === 2
  const isAdmin = user?.roleId === 2
  const isViewer = user?.roleId === 3

  const { form, onSubmit, isLoadingUpdateMyUser } = useUpdateMyUser(user);

  if (!user) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-xl font-semibold">Información personal</h2>
        <p className="text-sm text-muted-foreground">
          Actualizá tus datos para mantener tu cuenta al día.
        </p>

        <Separator />
        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
          {inputsUpdate.map((input) => (
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
          ))}
        </div>

        <p className='text-sm text-muted-foreground text-center mb-6'>El nombre y apellido se verá en la creación de asientos contables.</p>

        <FormField
          key={'email'}
          control={form.control}
          disabled={isViewer}
          name={'email'}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  {...field}
                  id={'email'}
                  value={field.value ?? ''}
                  label={'Email'}
                  type={'email'}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <SeparatorTitle title='Usuario' />

        <div className='grid grid-cols-1 gap-2'>
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
        </div>
        <div className="flex items-center gap-2">
          {/* Badge de permisos sobre asientos */}
          <Badge
            variant="secondary"
            className={
              canCreateAsientos
                ? "bg-blue-500 text-white dark:bg-blue-600"
                : "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
            }
            title={
              canCreateAsientos
                ? "Este usuario puede crear asientos contables."
                : "Este usuario solo puede visualizar la información (modo espectador)."
            }
          >
            {canCreateAsientos ? (
              <>
                <BadgeCheckIcon className="mr-1 h-3 w-3" />
                Verificado
              </>
            ) : (
              <>
                <Eye className="mr-1 h-3 w-3" />
                No Verificado
              </>
            )}
          </Badge>

          {/* Badge de rol general */}
          <Badge
            variant={
              isAdmin
                ? "admin" // tu variant custom
                : isViewer
                  ? "outline" // o el que uses para algo "menos importante"
                  : "default"
            }
            title={
              isAdmin
                ? "Este usuario tiene privilegios de administración."
                : isViewer
                  ? "Este usuario solo es espectador."
                  : "Este usuario tiene privilegios básicos."
            }
          >
            {isAdmin ? (
              <>
                <Crown className="mr-1 h-3 w-3" />
                Administrador
              </>
            ) : isViewer ? (
              <>
                <Eye className="mr-1 h-3 w-3" />
                Espectador
              </>
            ) : (
              <>
                <UserRound className="mr-1 h-3 w-3" />
                Usuario
              </>
            )}
          </Badge>
        </div>

        <Separator />

        <div className='flex justify-end'>
          <Button
            disabled={isLoadingUpdateMyUser}
          >
            {isLoadingUpdateMyUser ? (
              <div className='flex items-center justify-center'>
                <LoaderCircle className="mr-2 animate-spin" />
                Aplicando...
              </div>
            ) : (
              "Aplicar cambios"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}