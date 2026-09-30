import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Account } from "@/interfaces/account-interface";
import { formatBalance } from "@/lib/utils";
import { Entrie } from "@/schemas/entrie.schema";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";
import { FieldArrayWithId, UseFieldArrayRemove } from "react-hook-form";

type Props = {
  accounts?: Account[];
  movements?: FieldArrayWithId<Entrie>[];

  setAccountsAutocomplete: React.Dispatch<React.SetStateAction<Account[]>>;
  remove: UseFieldArrayRemove;
};

export default function EntrieMovementsTable({
  accounts,
  movements,
  setAccountsAutocomplete,
  remove,
}: Props) {
  if (!movements) return null;

  return (
    <div className="overflow-hidden rounded-xl border">
      {movements.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="font-semibold">Cuenta</TableHead>
              <TableHead className="text-right font-semibold">Debe</TableHead>
              <TableHead className="text-right font-semibold">Haber</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movements.map((movement, index) => (
              <TableRow key={movement.id}>
                <TableCell className="font-medium">{`${movement.haber !== 0 ? "\u00A0".repeat(8) : ""}${movement.nombreCuenta}`}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {movement.debe !== 0
                    ? formatBalance(movement.debe)
                    : movement.debe}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {movement.haber !== 0
                    ? formatBalance(movement.haber)
                    : movement.haber}
                </TableCell>
                <TableCell className="text-right flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Eliminar movimiento de ${movement.nombreCuenta}`}
                    className="size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => {
                      remove(index);

                      // Recuperar la cuenta (sin espacios si estaba en HABER)
                      const cleanedName = movement.nombreCuenta.trim();
                      const reverseAccount = accounts?.find(
                        (item) => item.nombre === cleanedName,
                      );

                      if (reverseAccount) {
                        setAccountsAutocomplete((prev) => {
                          const exists = prev.some(
                            (a) => a.id === reverseAccount.id,
                          );
                          if (!exists) {
                            return [...prev, reverseAccount];
                          }
                          return prev;
                        });
                      }
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex min-h-48 flex-col items-center justify-center gap-2 p-6 text-center">
          <p className="font-medium">Tu asiento empieza acá</p>
          <p className="max-w-xs text-sm text-muted-foreground">
            Agregá una cuenta con su importe para ver los movimientos y sus
            totales.
          </p>
        </div>
      )}
    </div>
  );
}
