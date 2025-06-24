import React from 'react'

import Link from "next/link";
import { Card, CardContent } from '@/components/ui/card';

export default function NotFound() {
  return (
    <main className="grid h-screen place-items-center bg-theme-gradient px-6 py-24 sm:py-32 lg:px-8">
      <Card className="backdrop-blur-md bg-background/80 shadow-xl">
        <CardContent className="p-20">
          <p className="text-center font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-7xl">Página no encontrada</h1>
          <p className="mt-6 text-lg font-medium text-pretty text-center text-muted-foreground sm:text-xl/8">Lo sentimos, no pudimos encontrar la página que estás buscando.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/" className="rounded-md bg-violet-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">Volver a inicio</Link>
          </div>

        </CardContent>
      </Card>
    </main>
  );
}