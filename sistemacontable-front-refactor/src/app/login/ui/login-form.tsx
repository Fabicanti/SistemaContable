"use client"

import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { oauthProviders, getOAuthUrl } from '@/config/oauth';
import LogoCompany from '@/components/logo-company';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldSeparator } from '@/components/ui/field';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import useAuth from '@/hooks/use-auth';

const inputsLogin: { id: "username" | "password"; label: string; type: string }[] = [
  { id: "username", label: "Nombre de usuario", type: "text" },
  { id: "password", label: "Contraseña", type: "password" },
]

export default function LoginForm() {
  const router = useRouter();
  const { form, isLoading, onSubmit } = useAuth();
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={`w-full flex lg:w-1/2 flex-col p-5 justify-start items-start max-lg:h-screen max-lg:justify-center`}>
      <div className="bg-background/20 p-2 rounded-md ">
        <LogoCompany name='SSAA II' url="/home" size={28} />
      </div>

      <div className="w-full h-full flex items-center justify-center bg-transparent">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => onSubmit(data))}
            className="px-15 py-15 max-md:px-7 max-md:py-10 rounded-3xl shadow-2xl w-md xl:w-[600px] max-md:w-[350px] bg-background dark:bg-gray-900 space-y-3"
          >
            <h1 className='text-3xl mb-4 font-semibold text-center bg-gradient-to-tr from-violet-600 via-pink-600 to-orange-500 bg-clip-text text-transparent dark:text-fuchsia-700'>
              Bienvenido de nuevo
            </h1>
            <p className='text-gray-500 text-sm mb-8'>Accedé con tus credenciales para gestionar asientos, movimientos, cuentas y liquidaciones.</p>

            {inputsLogin.map((input) => (
              <FormField
                key={input.id}
                control={form.control}
                name={input.id}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <div className="relative">
                        <FloatingLabelInput
                          {...field}
                          id={input.id}
                          label={input.label}
                          type={input.id === "password" && showPassword ? "text" : input.type}
                        />
                        {input.id === "password" && (<button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground cursor-pointer"
                          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>)}
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            ))}

            <Separator className="mt-10" />

            <div className="mt-4 flex max-xl:flex-col mb-6">
              <Button
                className="w-full xl:w-1/2 text-md font-semibold"
                type="submit"
                size={"lg"}
                variant={"pink"}
                disabled={isLoading}
              >
                {isLoading ?
                  (<div className='flex items-center justify-center'>
                    <LoaderCircle className="mr-2 animate-spin" />
                    Iniciando sesión...
                  </div>) :
                  (
                    "Iniciar sesión"
                  )
                }
              </Button>
              <div className="flex justify-end items-center w-1/2 max-xl:justify-center max-xl:w-full max-xl:mt-3">
                <p className="text-sm text-gray-400 mr-1">¿No tienes cuenta?</p>
                <Button
                  variant="link"
                  type="button"
                  onClick={() => router.push('/register')}
                >
                  Registrate
                </Button>
              </div>

            </div>

            <FieldGroup>
              <FieldSeparator className="dark:bg-gray-900 ">
                O continuar con
              </FieldSeparator>
              <Field className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {oauthProviders.map((prov) => (
                  <Link key={prov.provider} href={getOAuthUrl(prov.provider)}>
                    <Button variant="outline" type="button" className="w-full">
                      <Image
                        src={prov.icon}
                        alt={prov.name}
                        width={16}
                        height={16}
                      />
                      Acceder con {prov.name}
                    </Button>
                  </Link>
                ))}
              </Field>
            </FieldGroup>
          </form>
        </Form>
      </div>
    </div>
  )
}