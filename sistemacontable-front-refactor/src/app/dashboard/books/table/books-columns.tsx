import { Book } from '@/interfaces/book-interface';
import { formatBalance, formatDateToSpanish } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const booksColumns: ColumnDef<Book>[] = [
  {
    accessorKey: 'fecha',
    header: 'Fecha',
    enableSorting: false,
    cell: ({ row }) => {
      const fecha = new Date(row.original.fecha);
      return (
        <div className="flex items-center justify-start">
          {formatDateToSpanish(fecha)}
        </div>
      );
    }
  },
  {
    accessorKey: 'descripcion',
    header: 'Descripción',
    enableSorting: false,
  },
  {
    accessorKey: 'debe',
    header: 'DEBE',
    enableSorting: false,
    cell: ({ row }) => {
      const debe: number = row.original.debe;
      return (
        <div className="text-right">
          {debe !== 0 ? formatBalance(debe) : debe}
        </div>
      )
    }
  },
  {
    accessorKey: 'haber',
    header: 'HABER',
    enableSorting: false,
    cell: ({ row }) => {
      const haber: number = row.original.haber;
      return (
        <div className="text-right">
          {haber !== 0 ? formatBalance(haber) : haber}
        </div>
      )
    }
  },
  {
    accessorKey: 'saldo',
    header: 'Saldo',
    enableSorting: false,
    cell: ({ row, table }) => {
      const currentSaldo: number = row.original.saldo;
      const previousRow = table.getRowModel().rows[row.index - 1];
      const previousSaldo = previousRow?.original?.saldo ?? null;

      let colorClass = '';
      let IconComponent = null;

      if (previousSaldo !== null) {
        if (currentSaldo > previousSaldo) {
          colorClass = 'text-green-600';
          IconComponent = ChevronUp;
        } else if (currentSaldo < previousSaldo) {
          colorClass = 'text-destructive';
          IconComponent = ChevronDown;
        }
      }

      return (
        <div className={`text-right flex items-center justify-end gap-1 ${colorClass}`}>
          {IconComponent && <IconComponent size={16} />}
          <span>{formatBalance(currentSaldo)}</span>
        </div>
      );
    }
  }
];