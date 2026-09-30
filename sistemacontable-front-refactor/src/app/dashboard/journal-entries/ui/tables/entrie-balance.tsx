import { CheckCircle2, CircleDashed } from "lucide-react";
import { formatBalance } from "@/lib/utils";

type Props = { movements: { debe: number; haber: number }[] };

export default function EntrieBalance({ movements }: Props) {
  const debe = movements.reduce(
    (total, movement) => total + Math.round(movement.debe * 100),
    0,
  );
  const haber = movements.reduce(
    (total, movement) => total + Math.round(movement.haber * 100),
    0,
  );
  const balanced = movements.length >= 2 && debe === haber;
  return (
    <div className="space-y-3" aria-live="polite" aria-atomic="true">
      <dl className="grid grid-cols-1 gap-3 rounded-xl border bg-muted/30 p-4 sm:grid-cols-3">
        {[
          ["Total Debe", debe],
          ["Total Haber", haber],
          ["Diferencia", Math.abs(debe - haber)],
        ].map(([label, value]) => (
          <div key={label} className="min-w-0 space-y-1">
            <dt className="text-xs font-medium text-muted-foreground">
              {label}
            </dt>
            <dd className="text-lg font-semibold tabular-nums tracking-tight">
              {formatBalance(Number(value) / 100)}
            </dd>
          </div>
        ))}
      </dl>
      <p
        className={
          balanced
            ? "flex flex-wrap items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400"
            : "flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
        }
      >
        {balanced ? (
          <CheckCircle2 className="size-4 shrink-0" />
        ) : (
          <CircleDashed className="size-4 shrink-0" />
        )}
        {balanced
          ? "Balanceado"
          : movements.length < 2
            ? "Agregá al menos dos movimientos"
            : "Pendiente de cuadrar"}
        <span className="ml-auto text-xs text-muted-foreground">
          {movements.length} movimientos
        </span>
      </p>
    </div>
  );
}
