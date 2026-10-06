"use client"

import { useState } from 'react'
import { BookOpen, Check, ChevronRight, CircleCheck, Layers2, ListTree, NotebookPen } from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

const sections = [
  { value: 'entries', label: 'Asientos', icon: NotebookPen },
  { value: 'accounts', label: 'Cuentas', icon: ListTree },
  { value: 'books', label: 'Libros', icon: BookOpen },
]

const content = {
  entries: {
    title: 'Cada movimiento tiene su lugar.',
    subtitle: 'Asiento N.º 001 · Aporte inicial de capital',
    heading: 'Un registro claro, desde el principio.',
    description: 'El detalle de tus operaciones, con sus cuentas e importes en una misma vista.',
    points: ['Fecha y descripción', 'Detalle del debe y haber', 'Movimientos organizados'],
  },
  accounts: {
    title: 'Una base para organizarte.',
    subtitle: 'Plan de cuentas · Ejemplo de estructura',
    heading: 'Cada cuenta, en su contexto.',
    description: 'Una estructura ordenada para identificar dónde va cada movimiento.',
    points: ['Código de cuenta', 'Nombre y clasificación', 'Una estructura compartida'],
  },
  books: {
    title: 'Seguí el recorrido de tus números.',
    subtitle: 'Libro mayor · Cuenta Caja',
    heading: 'Del movimiento al panorama completo.',
    description: 'Consultá los registros de una cuenta y entendé cómo se compone su saldo.',
    points: ['Movimientos por cuenta', 'Importes registrados', 'Consulta de saldos'],
  },
}

type Section = keyof typeof content

export default function HomePreview() {
  const [section, setSection] = useState<Section>('entries')
  const selected = content[section]

  return (
    <Tabs value={section} onValueChange={(value) => setSection(value as Section)} className="gap-6">
      <TabsList aria-label="Explorar una vista de ejemplo del sistema" className="mx-auto h-11 rounded-full border bg-muted/60 p-1">
        {sections.map(({ value, label }) => (
          <TabsTrigger key={value} value={value} className="rounded-full px-5 text-xs sm:px-6 sm:text-sm">{label}</TabsTrigger>
        ))}
      </TabsList>

      <div className="overflow-hidden rounded-2xl border bg-card shadow-[0_20px_70px_-35px_rgba(76,29,149,0.25)] dark:shadow-none">
        <div className="flex items-center justify-between gap-3 border-b bg-muted/30 px-4 py-3.5 sm:px-6">
          <span className="inline-flex items-center gap-2 text-xs font-medium"><Layers2 aria-hidden="true" className="size-4 text-muted-foreground" /> Tu espacio contable</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-2.5 py-1 text-[10px] font-medium text-muted-foreground"><span aria-hidden="true" className="size-1 rounded-full bg-pink-500" /> Vista de ejemplo</span>
        </div>

        <div className="grid lg:grid-cols-[170px_minmax(0,1fr)_250px]">
          <div className="hidden flex-col border-r bg-muted/20 p-4 lg:flex">
            <p className="px-3 pt-3 pb-5 text-[10px] font-medium tracking-widest text-muted-foreground uppercase">Mi contabilidad</p>
            <div className="space-y-1">
              {sections.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSection(value as Section)}
                  aria-pressed={section === value}
                  className={cn('flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs transition-colors focus-visible:outline-2 focus-visible:outline-ring', section === value ? 'bg-pink-500/10 font-medium text-pink-700 dark:text-pink-300' : 'text-muted-foreground hover:bg-muted hover:text-foreground')}
                >
                  <Icon aria-hidden="true" className="size-4" /> {label}
                </button>
              ))}
            </div>
            <div className="mt-auto flex items-center gap-2 border-t pt-4 text-[11px] text-muted-foreground">
              <div aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-muted text-[10px] font-medium">SC</div>
              Mi espacio de trabajo
            </div>
          </div>

          <div className="min-w-0 px-4 py-6 sm:px-7 sm:py-7">
            <div className="mb-5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              Contabilidad <ChevronRight aria-hidden="true" className="size-3" />
              <span className="text-foreground">{sections.find((item) => item.value === section)?.label}</span>
            </div>
            <h2 className="text-xl leading-snug font-semibold tracking-tight sm:text-2xl">{selected.title}</h2>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{selected.subtitle}</p>

            <TabsContent value="entries" className="mt-7">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
                <span>01 sep. 2026</span>
                <span className="inline-flex items-center gap-1.5"><CircleCheck aria-hidden="true" className="size-3.5 text-pink-600 dark:text-pink-400" /> Asiento equilibrado</span>
              </div>
              <Table aria-label="Ejemplo de asiento contable" className="text-xs">
                <TableHeader><TableRow className="hover:bg-transparent"><TableHead className="pl-0 text-muted-foreground">Cuenta</TableHead><TableHead className="text-right text-muted-foreground">Debe</TableHead><TableHead className="pr-0 text-right text-muted-foreground">Haber</TableHead></TableRow></TableHeader>
                <TableBody>
                  <TableRow><TableCell className="py-5 pl-0"><span className="font-medium">Caja</span><span className="mt-1 block text-[10px] text-muted-foreground">1.1.01</span></TableCell><TableCell className="text-right tabular-nums">$ 125.000</TableCell><TableCell className="pr-0 text-right text-muted-foreground">—</TableCell></TableRow>
                  <TableRow><TableCell className="py-5 pl-0"><span className="font-medium">Capital</span><span className="mt-1 block text-[10px] text-muted-foreground">3.1.01</span></TableCell><TableCell className="text-right text-muted-foreground">—</TableCell><TableCell className="pr-0 text-right tabular-nums">$ 125.000</TableCell></TableRow>
                </TableBody>
              </Table>
              <div className="mt-4 flex items-center justify-between gap-4 rounded-lg bg-muted/60 px-3 py-3 text-xs"><span className="text-muted-foreground">Diferencia entre debe y haber</span><span className="font-medium tabular-nums">$ 0,00</span></div>
            </TabsContent>

            <TabsContent value="accounts" className="mt-7">
              <Table aria-label="Ejemplo de plan de cuentas" className="text-xs">
                <TableHeader><TableRow className="hover:bg-transparent"><TableHead className="pl-0 text-muted-foreground">Código</TableHead><TableHead className="text-muted-foreground">Cuenta</TableHead><TableHead className="pr-0 text-right text-muted-foreground">Tipo</TableHead></TableRow></TableHeader>
                <TableBody>
                  {[['1.1.01', 'Caja', 'Activo'], ['1.1.02', 'Banco', 'Activo'], ['3.1.01', 'Capital', 'Patrimonio']].map(([code, name, type]) => (
                    <TableRow key={code}><TableCell className="py-5 pl-0 font-mono text-muted-foreground">{code}</TableCell><TableCell className="font-medium">{name}</TableCell><TableCell className="pr-0 text-right text-muted-foreground">{type}</TableCell></TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="mt-4 text-[11px] text-muted-foreground">3 cuentas de ejemplo para una estructura inicial.</p>
            </TabsContent>

            <TabsContent value="books" className="mt-7">
              <Table aria-label="Ejemplo de libro mayor" className="text-xs">
                <TableHeader><TableRow className="hover:bg-transparent"><TableHead className="pl-0 text-muted-foreground">Movimiento</TableHead><TableHead className="text-right text-muted-foreground">Debe</TableHead><TableHead className="pr-0 text-right text-muted-foreground">Haber</TableHead></TableRow></TableHeader>
                <TableBody>
                  <TableRow><TableCell className="py-5 pl-0"><span className="font-medium">Aporte de capital</span><span className="mt-1 block text-[10px] text-muted-foreground">01 sep. · Asiento 001</span></TableCell><TableCell className="text-right tabular-nums">$ 125.000</TableCell><TableCell className="pr-0 text-right text-muted-foreground">—</TableCell></TableRow>
                  <TableRow><TableCell className="py-5 pl-0"><span className="font-medium">Compra de insumos</span><span className="mt-1 block text-[10px] text-muted-foreground">02 sep. · Asiento 002</span></TableCell><TableCell className="text-right text-muted-foreground">—</TableCell><TableCell className="pr-0 text-right tabular-nums">$ 15.000</TableCell></TableRow>
                </TableBody>
              </Table>
              <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/60 px-3 py-3 text-xs"><span className="text-muted-foreground">Saldo de Caja</span><span className="font-medium tabular-nums">$ 110.000</span></div>
            </TabsContent>
          </div>

          <aside className="flex flex-col justify-center border-t bg-violet-500/[0.04] p-6 sm:p-7 lg:border-t-0 lg:border-l">
            <div aria-hidden="true" className="mb-6 flex size-11 items-center justify-center rounded-xl border border-violet-500/15 bg-background text-violet-600 dark:text-violet-400"><NotebookPen className="size-5" strokeWidth={1.6} /></div>
            <h3 className="max-w-xs text-lg leading-snug font-medium tracking-tight">{selected.heading}</h3>
            <p className="mt-3 max-w-sm text-xs leading-6 text-muted-foreground">{selected.description}</p>
            <ul className="mt-6 space-y-3">
              {selected.points.map((point) => <li key={point} className="flex items-center gap-2 text-[11px] text-muted-foreground"><Check aria-hidden="true" className="size-3.5 shrink-0 text-violet-600 dark:text-violet-400" />{point}</li>)}
            </ul>
          </aside>
        </div>
      </div>
    </Tabs>
  )
}
