import { ArrowDownLeft, ArrowUpRight, CalendarDays, CircleCheck, Clock3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const movements = [
  { name: "Cobro de factura", account: "Cliente · Estudio Norte", date: "28 jun", amount: "+ $ 480.000", income: true, status: "Conciliado" },
  { name: "Pago a proveedor", account: "Insumos · Papelera Sur", date: "27 jun", amount: "− $ 125.000", income: false, status: "Pendiente" },
  { name: "Servicios profesionales", account: "Cliente · Álamo SRL", date: "26 jun", amount: "+ $ 320.000", income: true, status: "Conciliado" },
  { name: "Alquiler de oficina", account: "Gastos de administración", date: "25 jun", amount: "− $ 280.000", income: false, status: "Conciliado" },
  { name: "Servicios e internet", account: "Gastos operativos", date: "24 jun", amount: "− $ 48.500", income: false, status: "Pendiente" },
]
const expenses = [
  { label: "Sueldos", percent: 50, amount: "$ 1.560.000", color: "bg-pink-500" },
  { label: "Proveedores", percent: 25, amount: "$ 780.000", color: "bg-violet-400" },
  { label: "Servicios", percent: 15, amount: "$ 468.000", color: "bg-orange-400" },
  { label: "Otros gastos", percent: 10, amount: "$ 312.000", color: "bg-slate-400" },
]
const reminders = [
  { day: "01", month: "JUL", title: "Revisar comprobantes", detail: "24 movimientos por conciliar", status: "Pendiente" },
  { day: "03", month: "JUL", title: "Preparar liquidación", detail: "Sueldos del período de junio", status: "Programado" },
  { day: "05", month: "JUL", title: "Cierre mensual", detail: "Revisión de saldos y libros", status: "Programado" },
]

export function DashboardDetails() {
  return (
    <div className="space-y-6 px-4 lg:px-6">
      <div className="grid min-w-0 gap-6 @5xl/main:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <Card className="min-w-0 shadow-xs">
          <CardHeader><CardTitle>Movimientos recientes</CardTitle><CardDescription>Una muestra de la actividad de junio.</CardDescription></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Concepto</TableHead><TableHead>Fecha</TableHead><TableHead>Estado</TableHead><TableHead className="text-right">Importe</TableHead></TableRow></TableHeader>
              <TableBody>
                {movements.map((movement) => (
                  <TableRow key={movement.name}>
                    <TableCell className="py-4"><div className="flex items-center gap-3"><span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${movement.income ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`}>{movement.income ? <ArrowDownLeft className="size-4" aria-hidden="true" /> : <ArrowUpRight className="size-4" aria-hidden="true" />}</span><div><p className="font-medium">{movement.name}</p><p className="mt-1 text-xs text-muted-foreground">{movement.account}</p></div></div></TableCell>
                    <TableCell className="text-xs text-muted-foreground">{movement.date}</TableCell>
                    <TableCell><Badge variant="outline" className={movement.status === "Conciliado" ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400" : "border-amber-500/20 bg-amber-500/5 text-amber-700 dark:text-amber-400"}>{movement.status === "Conciliado" ? <CircleCheck className="size-3" aria-hidden="true" /> : <Clock3 className="size-3" aria-hidden="true" />}{movement.status}</Badge></TableCell>
                    <TableCell className={`text-right font-medium tabular-nums ${movement.income ? "text-emerald-700 dark:text-emerald-400" : ""}`}>{movement.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="shadow-xs">
          <CardHeader><CardTitle>Distribución de gastos</CardTitle><CardDescription>En qué se utilizó el presupuesto del mes.</CardDescription></CardHeader>
          <CardContent className="space-y-6">
            <div><p className="text-3xl font-semibold tracking-tight tabular-nums">$ 3.120.000</p><p className="mt-1 text-xs text-muted-foreground">Total de gastos · Junio 2024</p></div>
            <div className="flex h-3 gap-1 overflow-hidden rounded-full" aria-hidden="true">{expenses.map((expense) => <div key={expense.label} className={expense.color} style={{ width: `${expense.percent}%` }} />)}</div>
            <ul className="space-y-5">{expenses.map((expense) => <li key={expense.label} className="flex items-center justify-between gap-3 text-sm"><div className="flex items-center gap-2"><span className={`size-2 rounded-full ${expense.color}`} aria-hidden="true" /><span>{expense.label}</span><span className="text-xs text-muted-foreground">{expense.percent}%</span></div><span className="font-medium tabular-nums">{expense.amount}</span></li>)}</ul>
          </CardContent>
        </Card>
      </div>
      <Card className="shadow-xs">
        <CardHeader><CardTitle className="flex items-center gap-2"><CalendarDays className="size-4 text-pink-500" aria-hidden="true" />Agenda de trabajo</CardTitle><CardDescription>Recordatorios de ejemplo para el próximo cierre.</CardDescription></CardHeader>
        <CardContent className="grid gap-4 @3xl/main:grid-cols-3">
          {reminders.map((reminder) => <div key={reminder.title} className="flex items-start gap-3 rounded-xl border border-border/70 bg-muted/30 p-4"><div className="flex w-11 shrink-0 flex-col items-center rounded-lg bg-background py-2"><span className="text-[10px] font-medium text-pink-600 dark:text-pink-300">{reminder.month}</span><span className="text-xl font-semibold">{reminder.day}</span></div><div className="min-w-0"><p className="text-sm font-medium">{reminder.title}</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{reminder.detail}</p><Badge variant="secondary" className="mt-3 text-[10px]">{reminder.status}</Badge></div></div>)}
        </CardContent>
      </Card>
    </div>
  )
}
