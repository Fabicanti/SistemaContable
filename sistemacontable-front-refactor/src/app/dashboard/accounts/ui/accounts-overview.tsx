"use client";

import { useEffect, useState } from "react";
import { Plus, Wallet, Layers3, ArrowDownUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAccountStore } from "@/stores/account-store";
import { useUserStore } from "@/stores/user-store";
import { capitalize } from "@/lib/utils";
import AccountCreate from "./dialog/account-create";

const typeColors = ["bg-blue-500", "bg-violet-500", "bg-amber-500", "bg-emerald-500", "bg-rose-500"];

export default function AccountsOverview() {
  const { user } = useUserStore();
  const { accounts, fetchAccounts, isLoadingAccounts } = useAccountStore();
  const [createAccount, setCreateAccount] = useState(false);

  useEffect(() => { fetchAccounts(); }, [fetchAccounts]);

  const total = accounts?.length ?? 0;
  const posting = accounts?.filter((account) => account.recibeSaldo).length ?? 0;
  const groups = Object.values((accounts ?? []).reduce((result, account) => {
    const group = result[account.tipoCuentaId] ?? { id: account.tipoCuentaId, name: account.tipoCuentaNombre, count: 0 };
    group.count += 1;
    result[account.tipoCuentaId] = group;
    return result;
  }, {} as Record<number, { id: number; name: string; count: number }>)).sort((a, b) => a.id - b.id);

  return (
    <section className="mb-6 space-y-5" aria-label="Resumen de cuentas">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight"><Wallet className="size-6 text-muted-foreground" />Cuentas</h1>
          <p className="mt-1 text-sm text-muted-foreground">Organizá tu plan de cuentas y consultá su estructura.</p>
        </div>
        {user?.roleId === 2 && <Button variant="pink" onClick={() => setCreateAccount(true)}><Plus className="size-4" />Nueva cuenta</Button>}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="gap-4 shadow-none">
          <CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Plan de cuentas</CardTitle></CardHeader>
          <CardContent>
            {isLoadingAccounts ? <Skeleton className="h-28 w-full" /> : <>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Total de cuentas", value: total, icon: Wallet },
                  { label: "Reciben saldo", value: posting, icon: ArrowDownUp },
                  { label: "Agrupadoras", value: total - posting, icon: Layers3 },
                ].map(({ label, value, icon: Icon }) => <div key={label}>
                  <Icon className="mb-3 size-4 text-muted-foreground" aria-hidden="true" />
                  <p className="text-3xl font-semibold tabular-nums tracking-tight">{value}</p>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</p>
                </div>)}
              </div>
              <p className="mt-5 border-t pt-3 text-xs text-muted-foreground">Las cuentas agrupadoras organizan el plan y no reciben saldo.</p>
            </>}
          </CardContent>
        </Card>
        <Card className="gap-4 shadow-none">
          <CardHeader><CardTitle className="text-sm font-medium">Distribución por tipo</CardTitle><CardDescription>Cantidad de cuentas en cada categoría.</CardDescription></CardHeader>
          <CardContent>
            {isLoadingAccounts ? <Skeleton className="h-28 w-full" /> : total === 0 ? <p className="py-6 text-sm text-muted-foreground">La distribución aparecerá cuando agregues cuentas.</p> : <>
              <div className="mb-4 flex h-2 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                {groups.map((group) => <div key={group.id} className={typeColors[group.id - 1] ?? "bg-slate-500"} style={{ width: `${group.count / total * 100}%` }} />)}
              </div>
              <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {groups.map((group) => <li key={group.id} className="flex items-center gap-2 text-sm">
                  <span className={`size-2 shrink-0 rounded-full ${typeColors[group.id - 1] ?? "bg-slate-500"}`} aria-hidden="true" />
                  <span className="text-muted-foreground">{capitalize(group.name)}</span>
                  <span className="ml-auto font-medium tabular-nums">{group.count}</span>
                  <span className="w-9 text-right text-xs tabular-nums text-muted-foreground">{Math.round(group.count / total * 100)}%</span>
                </li>)}
              </ul>
            </>}
          </CardContent>
        </Card>
      </div>
      {createAccount && <AccountCreate open={createAccount} onClose={() => setCreateAccount(false)} />}
    </section>
  );
}
