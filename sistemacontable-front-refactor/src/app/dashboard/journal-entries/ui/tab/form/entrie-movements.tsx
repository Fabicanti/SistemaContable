"use client";

import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import AccountCreate from "@/app/dashboard/accounts/ui/dialog/account-create";
import { Autocomplete } from "@/components/shared/autocomplete";
import { Button } from "@/components/ui/button";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Account } from "@/interfaces/account-interface";
import { Movement } from "@/interfaces/entrie-interface";
import { capitalize } from "@/lib/utils";
import { Entrie } from "@/schemas/entrie.schema";
import { useAccountStore } from "@/stores/account-store";
import { useUserStore } from "@/stores/user-store";

import EntrieAccountTable from "../../dialog/entrie-account-table";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import EntrieBalance from "../../tables/entrie-balance";
import EntrieMovementsTable from "../../tables/entrie-movements-table";

type Props = {
  form: UseFormReturn<Entrie>;
  isSuccess: boolean;
};

export default function EntrieMovements({ form, isSuccess }: Props) {
  const { user } = useUserStore();
  const { accounts, fetchAccounts } = useAccountStore();
  const { control } = form;
  const { append, remove, fields } = useFieldArray({
    control,
    name: "detalles",
  });

  // Detalles del movimiento.
  const [accountsAutocomplete, setAccountsAutocomplete] = useState<Account[]>(
    [],
  );
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [balance, setBalance] = useState<string>("");
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
      setAccountsAutocomplete(
        accounts.filter(
          (account) =>
            !fields.some((movement) => movement.cuentaId === account.id),
        ),
      );
    }
  }, [accounts, fields]);

  // Si la respuesta del back es exitosa, reinicio los valores.
  useEffect(() => {
    if (isSuccess) {
      setSelectedAccount(null);
      setTipo("debe");
      setBalance("");
    }
  }, [isSuccess]);

  const onSubmit = () => {
    if (!selectedAccount) {
      toast.warning("Cuenta no seleccionada", {
        description: "Debe seleccionar una cuenta.",
      });
      return;
    }

    if (!balance || !Number.isFinite(Number(balance)) || Number(balance) <= 0) {
      toast.warning("Saldo no declarado", {
        description: "Ingresá un importe mayor a cero.",
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
    setSelectedAccount(null);
    setBalance("");
    setAccountsAutocomplete(
      accountsAutocomplete.filter(
        (account) => account.id !== selectedAccount.id,
      ),
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(260px,340px)_minmax(0,1fr)]">
        {/* Detalles de cada movimiento */}
        <div className="space-y-4 rounded-xl border bg-muted/20 p-5">
          <div>
            <h2 className="font-semibold">Agregar movimiento</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Seleccioná la cuenta y su importe.
            </p>
          </div>
          <Autocomplete<Account>
            items={
              accountsAutocomplete?.filter((item) => item.recibeSaldo) || []
            }
            value={selectedAccount?.id?.toString() ?? ""}
            onChange={(item) => setSelectedAccount(item)}
            getLabel={(item) =>
              `${item.codigoCuenta}: ${item.nombre} - ${capitalize(item.tipoCuentaNombre)}`
            }
            getValue={(item) => item.id.toString()}
            placeholder="Selecciona una cuenta"
          />

          <label htmlFor="movement-amount" className="text-sm font-medium">
            Importe
          </label>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>$</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id="movement-amount"
              min="0.01"
              step="0.01"
              onChange={(e) => setBalance(e.target.value)}
              value={balance}
              placeholder="0.00"
              type="number"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupText>ARS</InputGroupText>
            </InputGroupAddon>
          </InputGroup>

          <p className="text-sm font-medium">Tipo de movimiento</p>

          <div className={`grid grid-cols-1 gap-4`}>
            <Tabs
              value={tipo}
              onValueChange={(value) => setTipo(value as "debe" | "haber")}
            >
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="debe">Debe</TabsTrigger>
                <TabsTrigger value="haber">Haber</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-wrap gap-2">
              <div className="grid w-full auto-cols-fr grid-flow-col items-center gap-2">
                <Button
                  type="button"
                  variant={"ghost"}
                  size="sm"
                  onClick={() => setViewAccounts(true)}
                >
                  Ver cuentas
                </Button>
                {user?.roleId === 2 && (
                  <Button
                    type="button"
                    variant={"ghost"}
                    size="sm"
                    onClick={() => setCreateAccount(true)}
                  >
                    <Plus className="w-4 h-4 " />
                    Cuenta
                  </Button>
                )}
              </div>
              <Button type="button" className="w-full" onClick={onSubmit}>
                <Plus />
                Agregar movimiento
              </Button>
            </div>
          </div>
        </div>

        {/* Vista de movimientos. */}
        <div className="min-w-0 space-y-4">
          <div>
            <h2 className="font-semibold">Movimientos del asiento</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Revisá las cuentas antes de guardar.
            </p>
          </div>
          <EntrieMovementsTable
            accounts={accounts ?? []}
            movements={fields}
            setAccountsAutocomplete={setAccountsAutocomplete}
            remove={remove}
          />

          <EntrieBalance movements={fields} />

          {form.formState.isSubmitted && form.formState.errors.detalles && (
            <p className="text-sm text-center text-destructive mt-2">
              {form.formState.errors.detalles.message?.toString()}
            </p>
          )}
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
  );
}
