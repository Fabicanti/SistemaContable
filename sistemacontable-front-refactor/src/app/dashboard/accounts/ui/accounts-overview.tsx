"use client";

import { useEffect, useState } from "react";
import { Plus, TrendingUpIcon, Wallet } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useAccountStore } from "@/stores/account-store";
import { useAccountsChartData } from "@/hooks/use-accounts";
import { DonutChart } from "@/components/charts/donut-chart";
import { Badge } from "@/components/ui/badge";
import AccountCreate from "./dialog/account-create";
import { useUserStore } from "@/stores/user-store";


export default function AccountsOverview() {
  const { user } = useUserStore();
  const { accounts, fetchAccounts } = useAccountStore();
  const [createAccount, setCreateAccount] = useState<boolean>(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const { chartData, chartConfig } = useAccountsChartData(accounts || []);

  return (
    <section className="space-y-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-2">

              <h2 className="md:text-lg font-bold flex items-center gap-2">
                <Wallet />
                Cuentas
              </h2>

              {user?.roleId === 2 &&
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={() => setCreateAccount(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Nueva cuenta
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left" sideOffset={5} className="hidden md:block">
                    <p>Agregar una nueva cuenta contable</p>
                  </TooltipContent>
                </Tooltip>
              }

            </CardTitle>
            <CardDescription>Visión general del estado actual de las cuentas contables.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Card className="p-4">
              <h3 className="text-sm font-semibold text-muted-foreground">Tipo más frecuente</h3>
              <p className="text-md font-bold bg-gradient-to-tr from-pink-500 to-orange-500 bg-clip-text text-transparent">
                {
                  accounts && (Object.entries(
                    accounts.reduce((acc, curr) => {
                      acc[curr.tipoCuentaNombre] = (acc[curr.tipoCuentaNombre] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).sort((a, b) => b[1] - a[1])[0][0])
                }
              </p>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-semibold text-muted-foreground">Cuentas que reciben saldo</h3>
              <p className="text-xl font-bold flex justify-between bg-gradient-to-tr from-pink-500 to-orange-500 bg-clip-text text-transparent">
                {
                  accounts && `${accounts.filter((a) => a.recibeSaldo).length} / ${accounts.length}`
                }
                <Badge
                  variant={"admin"}
                  className={`flex gap-1 rounded-lg text-xs`}>
                  <TrendingUpIcon className="size-1 text-white" />
                </Badge>
              </p>
            </Card>
          </CardContent>
        </Card>

        <DonutChart
          title="Distribución de cuentas"
          description="Por tipo de cuenta"
          data={chartData}
          config={chartConfig}
          label="Cuentas"
          size="md"
        />
      </div>
        {createAccount && (
          <AccountCreate
            open={createAccount}
            onClose={() => setCreateAccount(false)}
          />
        )}
    </section>
  );
}
