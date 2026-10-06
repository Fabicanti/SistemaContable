import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";

export default function Navbar() {
  return (
    <header className="relative z-20 border-b border-border/60 bg-background px-5 sm:px-8">
      <a
        href="#contenido"
        className="sr-only rounded-md bg-background p-3 focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50"
      >
        Saltar al contenido
      </a>
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-3">
        <Link
          href="/home"
          aria-label="Sistema Contable, inicio"
          className="flex shrink-0 items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-ring"
        >
          <Image src="/favicon.svg" alt="" width={30} height={30} />
          <span className="text-sm leading-tight font-semibold tracking-tight sm:text-lg">
            Sistema<span className="block sm:inline"> Contable</span>
          </span>
        </Link>
        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex"
        >
          <a
            href="#herramientas"
            className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            Herramientas
          </a>
          <a
            href="#como-funciona"
            className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            Cómo funciona
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button
            asChild
            variant="ghost"
            className="px-2 text-xs sm:px-4 sm:text-sm"
          >
            <Link href="/login">Iniciar sesión</Link>
          </Button>
          <Button
            asChild
            variant="violet"
            className="hidden rounded-lg sm:inline-flex"
          >
            <Link href="/register">Crear cuenta</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
