import Link from 'next/link'
import { ArrowDown, ArrowRight, BookOpen, Check, ListTree, NotebookPen } from 'lucide-react'

import Navbar from '@/components/semantic/navbar'
import { Button } from '@/components/ui/button'
import HomePreview from './ui/home-preview'

export const metadata = {
  title: 'Sistema Contable · Tus cuentas, en orden',
  description: 'Organizá tus cuentas, registrá asientos y consultá tus libros contables en un solo lugar.',
}

const features = [
  {
    number: '01',
    title: 'Una estructura clara',
    description: 'Organizá tu plan de cuentas y encontrá cada cuenta cuando la necesitás.',
    icon: ListTree,
  },
  {
    number: '02',
    title: 'Cada movimiento, registrado',
    description: 'Cargá tus asientos con su detalle y consultá los movimientos de cada operación.',
    icon: NotebookPen,
  },
  {
    number: '03',
    title: 'La información, a mano',
    description: 'Consultá tus libros contables para seguir el recorrido de tus registros.',
    icon: BookOpen,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main id="contenido">
        <section aria-labelledby="home-title" className="relative isolate overflow-hidden px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-32 -z-10 mx-auto h-[650px] max-w-6xl bg-[radial-gradient(ellipse_at_center,var(--color-pink-500)_0%,transparent_65%)] opacity-[0.07] dark:opacity-[0.09]" />
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-6 inline-flex items-center gap-2 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-pink-500" />
                Lo esencial, bien organizado
              </p>
              <h1 id="home-title" className="text-[2.6rem] leading-[1.08] font-semibold tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">
                Tus cuentas, en orden.
                <br />
                <span className="bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent dark:from-pink-400 dark:to-violet-400">Tu día, más simple.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
                Cuentas, asientos y libros en un solo lugar.
                Una forma clara de llevar tu contabilidad, paso a paso.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild variant="pink" size="lg" className="h-11 rounded-lg px-6">
                  <Link href="/register">Empezar ahora <ArrowRight aria-hidden="true" className="size-4" /></Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="h-11 rounded-lg px-5">
                  <a href="#vista-previa">Conocer el sistema <ArrowDown aria-hidden="true" className="size-4" /></a>
                </Button>
              </div>
            </div>

            <div id="vista-previa" className="relative mt-12 scroll-mt-24 sm:mt-16">
              <HomePreview />
            </div>
            <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
              Una vista de lo que podés organizar. Los datos mostrados son de ejemplo.
            </p>
          </div>
        </section>

        <section id="herramientas" aria-labelledby="tools-title" className="scroll-mt-24 border-t bg-muted/25 px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">Una base para tu día a día</p>
                <h2 id="tools-title" className="max-w-md text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">Lo que necesitás.<br />En un mismo lugar.</h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">De la primera cuenta al último asiento: herramientas simples para trabajar con más orden.</p>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
              {features.map(({ number, title, description, icon: Icon }) => (
                <article key={number} className="border-t border-border pt-6">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-xl border border-pink-500/10 bg-pink-500/5 text-pink-600 dark:text-pink-400">
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.7} />
                    </div>
                    <span aria-hidden="true" className="font-mono text-xs text-muted-foreground">{number}</span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="como-funciona" aria-labelledby="start-title" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 rounded-2xl border bg-card p-7 sm:p-10 md:grid-cols-[1fr_1fr] md:gap-20 lg:p-12">
            <div>
              <p className="mb-3 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">Un paso a la vez</p>
              <h2 id="start-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">Empezar también<br />puede ser simple.</h2>
              <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">Dale un lugar a tus números y construí tu organización desde lo esencial.</p>
              <Button asChild variant="violet" className="mt-6 rounded-lg">
                <Link href="/register">Crear mi cuenta <ArrowRight aria-hidden="true" className="size-4" /></Link>
              </Button>
            </div>
            <ol className="flex flex-col justify-center divide-y">
              {[
                ['Creá tu cuenta', 'Registrate para acceder al sistema.'],
                ['Organizá tus cuentas', 'Prepará la estructura de tu contabilidad.'],
                ['Registrá y consultá', 'Cargá asientos y revisá tus libros contables.'],
              ].map(([title, description], index) => (
                <li key={title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">{index + 1}</span>
                  <div>
                    <h3 className="text-sm font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <footer className="border-t px-5 py-7 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
          <span className="font-medium text-foreground">Sistema Contable</span>
          <span className="inline-flex items-center gap-1.5"><Check aria-hidden="true" className="size-3.5" /> Menos vueltas. Más orden.</span>
          <Link href="/login" className="rounded-sm underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-ring">Iniciar sesión <span aria-hidden="true">↗</span></Link>
        </div>
      </footer>
    </div>
  )
}
