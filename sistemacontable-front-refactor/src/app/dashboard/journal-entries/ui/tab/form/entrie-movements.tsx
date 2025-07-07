"use client";

import { Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import AccountCreate from '@/app/dashboard/accounts/ui/dialog/account-create';
import { Autocomplete } from '@/components/shared/autocomplete';
import SeparatorTitle from '@/components/shared/separator-title';
import { Button } from '@/components/ui/button';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Account } from '@/interfaces/account-interface';
import { Movement } from '@/interfaces/entrie-interface';
import { capitalize, formatBalance } from '@/lib/utils';
import { Entrie } from '@/schemas/entrie.schema';
import { useAccountStore } from '@/stores/account-store';
import { useUserStore } from '@/stores/user-store';

import EntrieAccountTable from '../../dialog/entrie-account-table';

type Props = {
  form: UseFormReturn<Entrie>;
  isSuccess: boolean;
}

export default function EntrieMovements({ form, isSuccess }: Props) {
  const { user } = useUserStore();
  const { accounts, fetchAccounts } = useAccountStore();
  const { control } = form;
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'detalles'
  });

  // Detalles del movimiento.
  const [accountsAutocomplete, setAccountsAutocomplete] = useState<Account[]>([])
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [balance, setBalance] = useState<string>("")
  const [tipo, setTipo] = useState<"debe" | "haber">("debe");

  const [viewAccounts, setViewAccounts] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);

  // Obtiene los datos si no los tengo.
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  // Almaceno en un estado las cuentas obtenidas.
  useEffect(() => {
    if (accounts) {
      setAccountsAutocomplete(accounts);
    }
  }, [accounts]);

  // Si la respuesta del back es exitosa, reinicio los valores.
  useEffect(() => {
    if (isSuccess && accounts) {
      setAccountsAutocomplete(accounts);
      setSelectedAccount(null);
      setTipo("debe");
    }
  }, [isSuccess, accounts]);


  const onSubmit = () => {
    if (!selectedAccount) {
      toast.warning("Cuenta no seleccionada", {
        description: "Debe seleccionar una cuenta."
      });
      return;
    }

    if (!balance) {
      toast.warning("Saldo no declarado", {
        description: "Debe ingresar el saldo de la cuenta."
      });
      return;
    }

    const balanceAccount = Number(balance);

    const movement: Movement = {
      id: selectedAccount.id,
      cuentaId: selectedAccount.id,
      nombreCuenta: selectedAccount.nombre,
      debe: tipo === "debe" ? balanceAccount : 0,
      haber: tipo === "haber" ? balanceAccount : 0,
    };

    append(movement);
    setAccountsAutocomplete(
      accountsAutocomplete.filter((account) => account.id !== selectedAccount.id)
    );
  }

  return (
    <>

      <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>
        {/* Detalles de cada movimiento */}
        <div className='space-y-6'>
          <Autocomplete<Account>
            items={accountsAutocomplete?.filter((item) => item.recibeSaldo) || []}
            value={(selectedAccount?.id)?.toString() ?? ""}
            onChange={(item) => setSelectedAccount(item)}
            getLabel={(item) => `${item.codigoCuenta}: ${item.nombre} - ${capitalize(item.tipoCuentaNombre)}`}
            getValue={(item) => item.id.toString()}
            placeholder="Selecciona una cuenta"
          />

          <FloatingLabelInput
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            type='number'
            label={'Saldo de la cuenta'}
          />

          <SeparatorTitle title='Tipo de asiento' />

          <div className={`grid grid-cols-1 gap-4`}>
            <Tabs value={tipo} onValueChange={(value) => setTipo(value as "debe" | "haber")}>
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="debe">Debe</TabsTrigger>
                <TabsTrigger value="haber">Haber</TabsTrigger>
              </TabsList>
            </Tabs>

            <SeparatorTitle title='Acciones' />

            <div className={`grid ${user?.roleId === 2 ? 'md:grid-cols-3 grid-cols-2' : 'md:grid-cols-2'} gap-4`}>
              <Button type='button' variant={'outline'} onClick={() => setViewAccounts(true)}>Ver cuentas</Button>
              {user?.roleId === 2 && (
                <>
                  <Button type='button' variant={'outline'} onClick={() => setCreateAccount(true)}>
                    <Plus className="w-4 h-4 " />
                    Cuenta
                  </Button>
                </>
              )}
              <Button type='button' onClick={onSubmit}>
                <Plus />
                Movimiento
              </Button>
            </div>
          </div>

        </div>

        {/* Vista de movimientos. */}
        <div>
          {fields.length > 0 ?
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Cuenta</TableHead>
                    <TableHead className="font-semibold">DEBE</TableHead>
                    <TableHead className="font-semibold">HABER</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((movement, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{`${movement.haber !== 0 ? '\u00A0'.repeat(8) : ''}${movement.nombreCuenta}`}</TableCell>
                      <TableCell className='text-right'>{movement.debe !== 0 ? formatBalance(movement.debe) : movement.debe}</TableCell>
                      <TableCell className='text-right'>{movement.haber !== 0 ? formatBalance(movement.haber) : movement.haber}</TableCell>
                      <TableCell className="text-right flex justify-end">
                        <div
                          className="bg-destructive p-1 flex items-center rounded-lg font-semibold text-primary-foreground cursor-pointer"
                          onClick={() => {
                            remove(index);

                            // Recuperar la cuenta (sin espacios si estaba en HABER)
                            const cleanedName = movement.nombreCuenta.trim();
                            const reverseAccount = accounts?.find(
                              (item) => item.nombre === cleanedName
                            );

                            if (reverseAccount) {
                              setAccountsAutocomplete((prev) => {
                                const exists = prev.some((a) => a.id === reverseAccount.id);
                                if (!exists) {
                                  return [...prev, reverseAccount];
                                }
                                return prev;
                              });
                            }
                          }}
                        >
                          <Trash2 className="size-4" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            : (
              <div className='text-center'>
                No hay registro de movimientos.
              </div>
            )}

          {form.formState.errors.detalles && (
            <p className="text-sm text-center text-destructive mt-2">
              {form.formState.errors.detalles.message?.toString()}
            </p>
          )}
          <div>

          </div>
        </div>

      </div>
      {viewAccounts && (
        <EntrieAccountTable
          open={viewAccounts}
          onClose={() => setViewAccounts(false)}
        />
      )}
      {createAccount && (
        <AccountCreate
          open={createAccount}
          onClose={() => setCreateAccount(false)}
        />
      )}
    </>
  )
}