"use client";

import { ArrowRight, LoaderCircle, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { oauthProviders, getOAuthUrl } from "@/config/oauth";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormPasswordInput } from "@/components/form/form-password-input";
import { Form } from "@/components/ui/form";
import useAuth from "@/hooks/use-auth";

export default function LoginForm() {
  const { form, isLoading, onSubmit } = useAuth();

  return (
    <div className="mx-auto w-full max-w-sm ">
      <div className="mb-8">
        {/* <p className="mb-4 flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase"><span aria-hidden="true" className="size-1.5 rounded-full bg-pink-500" /> Tu espacio de trabajo</p> */}
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Bienvenido de nuevo.
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Ingresá a tu cuenta para continuar con tu contabilidad.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          aria-busy={isLoading}
          className="space-y-5"
        >
          <FormInput
            accent="pink"
            control={form.control}
            name="username"
            icon={UserRound}
            label="Nombre de usuario"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="Tu nombre de usuario"
            disabled={isLoading}
            className="border-2 focus-visible:border-ring"
          />
          <FormPasswordInput
            accent="pink"
            control={form.control}
            name="password"
            label="Contraseña"
            autoComplete="current-password"
            placeholder="*********"
            disabled={isLoading}
            className="border-2 focus-visible:border-ring"
          />
          <Button
            type="submit"
            variant="pink"
            disabled={isLoading}
            className="mt-2 h-12 w-full rounded-lg"
          >
            {isLoading ? (
              <>
                <LoaderCircle
                  aria-hidden="true"
                  className="size-4 animate-spin"
                />{" "}
                Iniciando sesión...
              </>
            ) : (
              <>
                Iniciar sesión{" "}
                <ArrowRight aria-hidden="true" className="size-4" />
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="my-7 flex items-center gap-4 text-xs text-muted-foreground">
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
        O continuá con <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {oauthProviders.map((provider) => (
          <Button
            key={provider.provider}
            asChild
            variant="outline"
            className="h-11 rounded-lg shadow-none"
          >
            <a
              href={getOAuthUrl(provider.provider)}
              aria-label={`Continuar con ${provider.name}`}
            >
              <Image
                src={provider.icon}
                alt=""
                width={17}
                height={17}
                className={
                  provider.provider === "github" ? "dark:invert" : undefined
                }
              />
              {provider.name}
            </a>
          </Button>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        ¿Todavía no tenés cuenta?{" "}
        <Link
          href="/register"
          className="rounded-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-pink-500 focus-visible:outline-2 focus-visible:outline-ring"
        >
          Registrate
        </Link>
      </p>
    </div>
  );
}
