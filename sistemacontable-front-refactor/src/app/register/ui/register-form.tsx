"use client"

import { Button } from '@/components/ui/button';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { useCreateUser } from '@/hooks/use-users';
import { LoaderCircle } from 'lucide-react';
import React from 'react'

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

export default function RegisterForm() {
  const { form, isLoadingCreateUser, onSubmit } = useCreateUser(true);

  return (
    <div className={`w-full flex items-center justify-center lg:w-1/2 bg-transparent`} >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-10 py-13 max-md:px-7 max-md:py-10 rounded-2xl shadow-2xl w-md xl:w-[600px] max-md:w-[350px] bg-background dark:bg-gray-900 space-y-3"
        >
          <div>
            <h1 className="text-3xl mb-4 font-semibold text-center text-violet-600">
              Registrate
            </h1>
            <p className="text-gray-500 text-sm">
              Creá una cuenta para comenzar a usar el sistema contable y gestionar
              tus operaciones de forma organizada y segura.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-sm font-semibold text-violet-600 dark:text-violet-800">Datos personales</span>
            <Separator className="flex-1" />
          </div>
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
                        <FloatingLabelInput {...field} id={input.id} label={input.label} type={input.type} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              )
            ))
          }
          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-sm font-semibold text-violet-600 dark:text-violet-800">Autenticación</span>
            <Separator className="flex-1" />
          </div>
          {
            inputsRegister.map((input) => (
              (!input.personal &&
                <FormField
                  key={input.id}
                  control={form.control}
                  name={input.id}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput {...field} id={input.id} label={input.label} type={input.type} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              )
            ))
          }

          <div className="mt-4 flex max-xl:flex-col">
            <div className="flex justify-end items-center w-1/2 max-xl:justify-center max-xl:w-full max-xl:mt-3">
              <p className="text-sm text-gray-400 mr-1">¿Ya tenés cuenta?</p>
              <Button
                variant="link"
                type="button"
                onClick={() => window.location.href = '/login'}
              >
                Iniciar sesión
              </Button>

            </div>
            <Button
              className="w-full xl:w-1/2 text-lg"
              type="submit"
              size={'lg'}
              variant={'violet'}
              disabled={isLoadingCreateUser}
            >
              {isLoadingCreateUser ?
                (<div className="flex items-center justify-center">
                  <LoaderCircle className="mr-2 animate-spin" />
                  Registrando...
                </div>) :
                (
                  "Registrarse"
                )
              }
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}