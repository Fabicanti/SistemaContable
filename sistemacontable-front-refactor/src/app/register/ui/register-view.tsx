import { ArrowRight, BookOpen, ListTree, NotebookPen } from 'lucide-react'

const steps = [
  { icon: ListTree, title: 'Organizá tus cuentas', description: 'Una estructura clara desde el principio.' },
  { icon: NotebookPen, title: 'Registrá tus movimientos', description: 'Cada operación con su detalle.' },
  { icon: BookOpen, title: 'Consultá tus libros', description: 'La información que necesitás, a mano.' },
]

export default function RegisterView() {
  return (
    <aside aria-label="Empezá a organizar tu contabilidad" className="relative isolate hidden flex-col justify-center overflow-hidden border-r border-violet-200/60 bg-gradient-to-br from-violet-200 via-fuchsia-100 to-pink-100 px-10 py-16 lg:flex xl:px-20 dark:border-violet-400/15 dark:from-[#211c46] dark:via-[#251932] dark:to-[#30172e]">
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 -z-10 size-[480px] rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-500/20" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-32 -z-10 size-[420px] rounded-full bg-pink-400/25 blur-3xl dark:bg-pink-500/15" />
      <div className="mx-auto w-full max-w-lg">
        <p className="mb-5 text-xs font-medium tracking-[0.16em] text-violet-800/75 uppercase dark:text-violet-200/75">Todo empieza con un poco de orden</p>
        <h2 className="max-w-md text-4xl leading-[1.12] font-semibold tracking-[-0.04em] xl:text-5xl">Un lugar para<br /><span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-pink-400">hacer las cuentas claras.</span></h2>
        <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600 dark:text-violet-100/75">Empezá por lo esencial. Construí tu organización con cuentas, asientos y libros conectados.</p>
        <div className="mt-10 overflow-hidden rounded-xl border border-white/70 bg-white/75 shadow-[0_20px_60px_-24px_rgba(109,40,217,0.3)] backdrop-blur-xl dark:border-violet-300/15 dark:bg-[#21192f]/80">
          <div aria-hidden="true" className="h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500" />
          <div className="flex items-center justify-between border-b border-violet-200/50 bg-violet-500/5 px-5 py-4 dark:border-violet-300/10"><span className="text-xs font-medium">Tu próximo paso</span><ArrowRight aria-hidden="true" className="size-3.5 text-violet-500 dark:text-violet-300" /></div>
          <ol className="divide-y divide-violet-200/50 px-5 dark:divide-violet-300/10">
            {steps.map(({ icon: Icon, title, description }, index) => (
              <li key={title} className="flex items-center gap-4 py-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-violet-300/40 bg-gradient-to-br from-violet-100 to-pink-100 text-violet-600 dark:border-violet-400/20 dark:from-violet-500/20 dark:to-pink-500/15 dark:text-violet-300"><Icon aria-hidden="true" className="size-4.5" strokeWidth={1.6} /></div>
                <div><p className="text-sm font-medium">{title}</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p></div>
                <span aria-hidden="true" className="ml-auto font-mono text-[10px] text-violet-600/70 dark:text-violet-300/70">0{index + 1}</span>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-6 text-xs text-violet-800/75 dark:text-violet-200/75">Tu contabilidad, paso a paso.</p>
      </div>
    </aside>
  )
}
