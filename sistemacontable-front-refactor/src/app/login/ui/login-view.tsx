import { BookOpen, Check, ListTree, NotebookPen } from "lucide-react";

export default function LoginView() {
  return (
    <aside
      aria-label="Tu contabilidad en un solo lugar"
      className="relative isolate hidden flex-col justify-center overflow-hidden border-l border-violet-200/60 bg-linear-to-r from-pink-200 via-fuchsia-200 to-violet-300 px-10 py-16 lg:flex xl:px-20 dark:border-violet-400/15 dark:from-[#30172e] dark:via-[#251932] dark:to-[#211c46]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 -z-10 size-120 rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-500/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 -z-10 size-105 rounded-full bg-pink-400/25 blur-3xl dark:bg-pink-500/15"
      />
      <div className="mx-auto w-full max-w-lg">
        <p className="mb-5 text-xs font-medium tracking-[0.16em] text-violet-800/75 uppercase dark:text-violet-200/75">
          Menos vueltas. Más orden.
        </p>
        <h2 className="max-w-md text-4xl leading-[1.12] font-semibold tracking-[-0.04em] xl:text-5xl">
          Todo en su lugar.
          <br />
          <span className="bg-linear-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent dark:from-pink-400 dark:to-violet-400">
            También tus números.
          </span>
        </h2>
        <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600 dark:text-violet-100/75">
          Un espacio para organizar tus cuentas, registrar movimientos y
          consultar tus libros.
        </p>
        <div className="mt-10 overflow-hidden rounded-xl border border-white/70 bg-white/75 shadow-[0_20px_60px_-24px_rgba(109,40,217,0.3)] backdrop-blur-xl dark:border-violet-300/15 dark:bg-[#21192f]/80 dark:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.4)]">
          <div
            aria-hidden="true"
            className="h-1 bg-linear-to-r from-pink-500 via-fuchsia-500 to-violet-500"
          />
          <div className="flex items-center justify-between gap-3 border-b border-violet-200/50 bg-violet-500/5 px-5 py-4 dark:border-violet-300/10">
            <span className="text-xs font-medium">
              Tu contabilidad, conectada
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-pink-500"
              />{" "}
              Un solo lugar
            </span>
          </div>
          <div className="divide-y divide-violet-200/50 px-5 dark:divide-violet-300/10">
            {[
              {
                icon: ListTree,
                title: "Cuentas",
                description: "La base de tu organización",
              },
              {
                icon: NotebookPen,
                title: "Asientos",
                description: "El detalle de cada movimiento",
              },
              {
                icon: BookOpen,
                title: "Libros",
                description: "Tus registros, a mano",
              },
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-center gap-4 py-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-violet-300/40 bg-linear-to-br from-pink-100 to-violet-100 text-violet-600 dark:border-violet-400/20 dark:from-pink-500/15 dark:to-violet-500/20 dark:text-violet-300">
                  <Icon
                    aria-hidden="true"
                    className="size-4.5"
                    strokeWidth={1.6}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {description}
                  </p>
                </div>
                <Check
                  aria-hidden="true"
                  className="ml-auto size-3.5 text-violet-500 dark:text-violet-400"
                />
              </div>
            ))}
          </div>
        </div>
        <p className="mt-6 text-xs text-violet-800/75 dark:text-violet-200/75">
          Lo esencial para seguir con tu día.
        </p>
      </div>
    </aside>
  );
}
