"use client";

import { Copy } from 'lucide-react';
import React, { useEffect } from 'react';

import { accountsColumns } from '@/app/dashboard/accounts/table/accounts-columns';
import { DataTable } from '@/components/table/data-table';
import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Account } from '@/interfaces/account-interface';
import { copyToClipboard } from '@/lib/utils';
import { useAccountStore } from '@/stores/account-store';

type Props = {
  open: boolean;
  onClose: () => void;
}

export default function EntrieAccountTable({ open, onClose }: Props) {
  const { accounts, fetchAccounts } = useAccountStore();

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  if (!open) return null;

  const actions = (account: Account) => {
    return (
      <>
        <DropdownMenuItem onClick={() => copyToClipboard(String(account.codigoCuenta))}>
          <Copy /> Copiar Código
        </DropdownMenuItem>
      </>
    )
  }

  return (
    <div>
      <Dialog open={!!open} onOpenChange={onClose}>
        <DialogContent className="w-full max-w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-3xl xl:max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cuentas con saldo</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Aqui se verán las cuentas que reciben saldo.
          </DialogDescription>

          <div className="overflow-x-auto">
            <DataTable
              columns={accountsColumns}
              data={accounts?.filter((item) => item.recibeSaldo) ?? []}
              actions={actions}
              filterableColumns={['codigoCuenta', 'nombre', 'tipoCuentaNombre']}
              showToggleColumns={false}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}