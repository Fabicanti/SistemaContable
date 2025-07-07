import React from 'react'

import Link from "next/link";
import { Card, CardContent } from '@/components/ui/card';

export const metadata = {
  title: "Página no encontrada",
  description: "Página NotFound de SSAA II",
}

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-theme-gradient px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Card className="w-full max-w-2xl backdrop-blur-md bg-background/80 shadow-xl">
        <CardContent className="px-6 py-12 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
          <p className="text-center text-sm font-semibold text-indigo-600 sm:text-base">
            404
          </p>
          <h1 className="mt-4 text-center text-3xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Página no encontrada
          </h1>
          <p className="mt-6 text-center text-base text-muted-foreground sm:text-lg lg:text-xl">
            Lo sentimos, no pudimos encontrar la página que estás buscando.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/"
              className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
            >
              Volver a inicio
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
