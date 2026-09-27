import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";
import RegisterView from "./ui/register-view";
import RegisterForm from "./ui/register-form";

export const metadata: Metadata = { title: "Crear cuenta · Sistema Contable" };

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <header className="flex h-20 shrink-0 items-center justify-between gap-4 border-b border-border/60 px-6 sm:px-10 lg:px-12">
        <Link
          href="/home"
          className="flex items-center gap-2.5 rounded-sm text-sm font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-ring sm:text-lg"
        >
          <Image src="/favicon.svg" alt="" width={30} height={30} /> 
          Sistema Contable
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href="/home"
            className="hidden items-center gap-2 rounded-sm text-xs text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring sm:flex"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" /> 
            Volver al inicio
          </Link>
          <ModeToggle />
        </div>
      </header>
      <main className="grid flex-1 lg:grid-cols-2">
        <RegisterView />
        <div className="flex flex-col px-6 py-10 sm:px-10 lg:px-16">
          <div className="my-auto w-full py-2">
            <RegisterForm />
          </div>
        </div>
      </main>
    </div>
  );
}
