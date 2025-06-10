"use client"

import { capitalize } from "@/lib/utils"
import { accountSchema, Account as AccountZod } from "@/schemas/account.schema"
import { Account } from "@/interfaces/account-interface"
import { useTheme } from "next-themes"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { createAccount } from "@/core/actions/account.action"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { useAccountStore } from "@/stores/account-store"

export interface ChartItem {
  name: string
  value: number
  fill: string
}

export interface ChartConfigItem {
  label: string
  color: string
}

export interface ChartResult {
  chartData: ChartItem[]
  chartConfig: Record<string, ChartConfigItem>
}

const lightColors = [
  "#4ade80", // verde
  "#60a5fa", // azul
  "#f472b6", // rosa
  "#c084fc", // violeta
  "#facc15", // amarillo
]

const darkColors = [
  "#4c1d95", // violeta oscuro
  "#86198f", // rosa oscuro
  "#be185d", // fucsia oscuro
  "#ec4899", // púrpura
  "#ea580c", // dorado
]

export function useAccountsChartData(accounts: Account[]): ChartResult {
  const { resolvedTheme } = useTheme()

  const result = useMemo(() => {
    const colorPalette = resolvedTheme === "dark" ? darkColors : lightColors

    const grouped = accounts.reduce((acc, curr) => {
      const tipo = curr.tipoCuentaNombre
      if (!acc[tipo]) acc[tipo] = 0
      acc[tipo] += 1
      return acc
    }, {} as Record<string, number>)

    const chartData: ChartItem[] = []
    const chartConfig: Record<string, ChartConfigItem> = {}

    Object.entries(grouped).forEach(([tipo, count], index) => {
      const color = colorPalette[index % colorPalette.length]
      chartData.push({ name: tipo, value: Number(count), fill: color })
      chartConfig[tipo] = { label: capitalize(tipo) + ":", color }
    })

    return { chartData, chartConfig }
  }, [accounts, resolvedTheme]);

  return result;
}


export function useCreateAccount() {
  const { accounts, refetchAccounts } = useAccountStore();
  const form = useForm<AccountZod>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      nombre: '',
      saldo: 0,
      tipoCuentaId: 1,
      recibeSaldo: false,
      cuentaPadreId: ""
    }
  });

  const createAccountMutation = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      refetchAccounts();
      toast.success("Se ha creado una nueva cuenta.")
    },
    onError: (error: AxiosError) => {
      console.log(error);
      toast.error("Error al crear la cuenta contable.")
    }
  });

  const findByAccountCode = (codigoCuenta: string): number => {
    if (!accounts) return 0;

    const data = accounts.find(element => element.codigoCuenta === codigoCuenta);
    return data ? data.id : 0;
  }

  const onSubmit = (data: AccountZod) => {
    console.log("Cuenta creada:", data);
    createAccountMutation.mutate({ ...data, cuentaPadreId: findByAccountCode(data.cuentaPadreId || "") });
  };

  return { form, isLoadingCreateAccount: createAccountMutation.isPending, onSubmit, }
}