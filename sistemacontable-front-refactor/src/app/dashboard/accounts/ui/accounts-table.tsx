"use client";

import { DataTable } from "@/components/table/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { accountsColumns } from "../table/accounts-columns";
import { useAccountStore } from "@/stores/account-store";
import { useEffect, useState } from "react";
import { Account } from "@/interfaces/account-interface";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Copy, Trash2 } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
import { useUserStore } from "@/stores/user-store";
import AccountDelete from "./dialog/account-delete";

export default function AccountsTable() {
  const { user } = useUserStore();
  const [deleteAccount, setDeleteAccount] = useState<Account | null>(null);
  const { accounts, fetchAccounts } = useAccountStore();

  useEffect(() => {
    fetchAccounts();
  }, []);


  const actions = (account: Account) => {
    return (
      <div>
        <DropdownMenuItem onClick={() => copyToClipboard(String(account.codigoCuenta))}>
          <Copy /> Copiar Código
        </DropdownMenuItem>
        {user?.roleId === 2 &&
          <DropdownMenuItem onClick={() => setDeleteAccount(account)} variant="destructive">
            <Trash2 /> Eliminar cuenta
          </DropdownMenuItem>
        }
      </div>
    )
  }

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
            actions={actions}
          />
        </CardContent>

        {deleteAccount &&
          <AccountDelete
            account={deleteAccount}
            onClose={() => setDeleteAccount(null)}
          />
        }

      </Card>
    </div>
  )
}