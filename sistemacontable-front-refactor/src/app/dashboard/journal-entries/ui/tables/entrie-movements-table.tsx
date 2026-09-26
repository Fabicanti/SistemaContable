
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Account } from '@/interfaces/account-interface';
import { formatBalance } from '@/lib/utils';
import { Entrie } from '@/schemas/entrie.schema';
import { Trash2 } from 'lucide-react';
import React from 'react'
import { FieldArrayWithId, UseFieldArrayRemove } from 'react-hook-form';

type Props = {
  accounts?: Account[];
  movements?: FieldArrayWithId<Entrie>[];

  setAccountsAutocomplete: React.Dispatch<React.SetStateAction<Account[]>>;
  remove: UseFieldArrayRemove;
}

export default function EntrieMovementsTable({ 
  accounts, 
  movements, 
  setAccountsAutocomplete, 
  remove 
}: Props) {

  if (!movements) return null;

  return (
    <div className={`${movements.length > 0 ? 'border' : 'text-center' } rounded-lg`}>
      {movements.length > 0 ? (
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
            {movements.map((movement, index) => (
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
      ) : (`No hay registro de movimientos.`)
      }
    </div>
  )
}