"use client"

import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import useAuth from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

const inputsLogin: { id: "username" | "password"; label: string; type: string }[] = [
  { id: "username", label: "Nombre de usuario", type: "text"},
  { id: "password", label: "Contraseña", type: "password" },
]

export default function LoginForm() {
  const router = useRouter();
  const { form, onSubmit } = useAuth();
  return (
    <div className={`w-full flex items-center justify-center lg:w-1/2 bg-pink-600 dark:bg-pink-900`}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => onSubmit(data))}
          className="px-10 py-13 max-md:px-7 max-md:py-10 rounded-3xl shadow-2xl w-lg xl:w-[600px] max-md:w-[350px]  bg-background space-y-3"
        >
          <h1 className='text-3xl mb-4 font-semibold bg-theme-gradient bg-clip-text text-transparent'>
            Sistema Contable
          </h1>
          <p className='text-gray-500 text-sm'>Accedé con tus credenciales para gestionar asientos, movimientos, cuentas y liquidaciones.</p>

          {inputsLogin.map((input) => (
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
          ))}

          {/* <div className="flex items-center justify-end">
            <Button
              variant="link"
              type="button"
              size={"sm"}
            >
              Olvidé mi contraseña
            </Button>
          </div> */}

          <div className="mt-4 flex max-xl:flex-col">
            <Button className="w-full xl:w-1/2" type="submit" size={"lg"} variant={"pink"} >Iniciar sesión</Button>
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
        </form>
      </Form>
    </div>
  )
}