"use client";

import Link from "next/link";
import { ArrowRight, LoaderCircle, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormPasswordInput } from "@/components/form/form-password-input";
import { Form } from "@/components/ui/form";
import { useCreateUser } from "@/hooks/use-users";

const personalFields = [
  {
    name: "nombre",
    label: "Nombre",
    placeholder: "Tu nombre",
    autoComplete: "given-name",
    type: "text",
  },
  {
    name: "apellido",
    label: "Apellido",
    placeholder: "Tu apellido",
    autoComplete: "family-name",
    type: "text",
  },
  {
    name: "email",
    label: "Correo electrónico",
    placeholder: "nombre@ejemplo.com",
    autoComplete: "email",
    type: "email",
  },
] as const;

export default function RegisterForm() {
  const { form, isLoadingCreateUser, onSubmit } = useCreateUser(true);

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-7">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Creá tu cuenta.
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Completá tus datos y empezá a organizar tu contabilidad.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          aria-busy={isLoadingCreateUser}
          className="space-y-6"
        >
          <fieldset disabled={isLoadingCreateUser}>
            <legend className="mb-4 text-xs font-medium text-muted-foreground">
              01 <span className="ml-2 text-foreground">Tus datos personales</span>
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              {personalFields.map((input) => (
                <FormInput
                  key={input.name}
                  control={form.control}
                  {...input}
                  icon={input.name === "email" ? Mail : undefined}
                  itemClassName={
                    input.name === "email" ? "sm:col-span-2" : undefined
                  }
                  autoCapitalize={input.name === "email" ? "none" : "words"}
                  spellCheck={false}
                />
              ))}
            </div>
          </fieldset>
          <fieldset disabled={isLoadingCreateUser} className="border-t pt-5">
            <legend className="pr-3 text-xs font-medium text-muted-foreground">
              02 <span className="ml-2 text-foreground">Tu acceso</span>
            </legend>
            <div className="space-y-4">
              <FormInput
                control={form.control}
                name="username"
                icon={UserRound}
                label="Nombre de usuario"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="Elegí tu usuario"
                description="Entre 2 y 20 caracteres: letras, números o guion bajo."
              />
              <FormPasswordInput
                control={form.control}
                name="password"
                label="Contraseña"
                autoComplete="new-password"
                placeholder="Creá una contraseña"
              />
            </div>
          </fieldset>
          <Button
            type="submit"
            variant="violet"
            disabled={isLoadingCreateUser}
            className="h-12 w-full rounded-lg"
          >
            {isLoadingCreateUser ? (
              <>
                <LoaderCircle
                  aria-hidden="true"
                  className="size-4 animate-spin"
                />{" "}
                Creando cuenta...
              </>
            ) : (
              <>
                Crear cuenta{" "}
                <ArrowRight aria-hidden="true" className="size-4" />
              </>
            )}
          </Button>
        </form>
      </Form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        ¿Ya tenés cuenta?{" "}
        <Link
          href="/login"
          className="rounded-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-violet-500 focus-visible:outline-2 focus-visible:outline-ring"
        >
          Iniciá sesión
        </Link>
      </p>
    </div>
  );
}
