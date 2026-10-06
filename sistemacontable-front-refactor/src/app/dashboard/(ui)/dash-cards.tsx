import { ArrowDownLeft, ArrowUpRight, Landmark, ReceiptText, Wallet } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const metrics = [
  { label: "Ingresos del mes", value: "$ 4.850.000", change: "+12,8%", detail: "respecto de mayo", icon: ArrowDownLeft, accent: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" },
  { label: "Gastos del mes", value: "$ 3.120.000", change: "−4,2%", detail: "respecto de mayo", icon: ArrowUpRight, accent: "bg-orange-500/10 text-orange-700 dark:text-orange-400" },
  { label: "Balance del mes", value: "$ 1.730.000", change: "35,7%", detail: "de los ingresos disponibles", icon: Wallet, accent: "bg-pink-500/10 text-pink-700 dark:text-pink-300" },
  { label: "Comprobantes registrados", value: "128", change: "24", detail: "pendientes de conciliación", icon: ReceiptText, accent: "bg-violet-500/10 text-violet-700 dark:text-violet-300" },
]

export function DashboardCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 lg:px-6">
      {metrics.map((metric) => (
        <Card key={metric.label} className="gap-4 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <span className="text-sm text-muted-foreground">{metric.label}</span>
            <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${metric.accent}`}><metric.icon className="size-4" aria-hidden="true" /></span>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-2xl font-semibold tracking-tight tabular-nums">{metric.value}</p>
            <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">{metric.change}</span> {metric.detail}</p>
          </CardContent>
        </Card>
      ))}
      <p className="col-span-full flex items-center gap-1.5 text-xs text-muted-foreground"><Landmark className="size-3.5" aria-hidden="true" />Importes expresados en pesos argentinos (ARS).</p>
    </div>
  )
}
