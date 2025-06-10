"use client";

import { DataTable } from "@/components/table/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { accountsColumns } from "../table/accounts-columns";
import { useAccountStore } from "@/stores/account-store";
import { useEffect } from "react";

export default function AccountsTable() {
  const { accounts, fetchAccounts } = useAccountStore();

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div>
      <Card className="mb-6">
        <CardHeader className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <CardTitle>Gestión de cuentas</CardTitle>
          <CardDescription>Tabla con información y acciones para cada cuenta.</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-2 text-sm text-muted-foreground">
          <DataTable
            columns={accountsColumns}
            data={accounts ?? []}
            showToggleColumns={false}
            columnLabels={{
              column: "tipoCuentaNombre",
              label: "Tipos de cuentas"
            }}
            filterableColumns={['codigoCuenta', 'nombre', 'tipoCuentaNombre']}
          />
        </CardContent>
      </Card>
    </div>
  )
}