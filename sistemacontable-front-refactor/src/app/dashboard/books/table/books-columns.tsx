import { Book } from '@/interfaces/book-interface';
import { formatBalance, formatDateToSpanish } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const booksColumns: ColumnDef<Book>[] = [
  {
    accessorKey: 'fecha', header: 'Fecha', enableSorting: false,
    cell: ({ row }) => <span className="whitespace-nowrap tabular-nums">{formatDateToSpanish(new Date(row.original.fecha))}</span>,
  },
  {
    accessorKey: 'descripcion', header: 'Descripción', enableSorting: false,
    cell: ({ row }) => row.original.descripcion?.trim() || <span className="text-muted-foreground">Sin descripción</span>,
  },
  ...(['debe', 'haber', 'saldo'] as const).map((key): ColumnDef<Book> => ({
    accessorKey: key,
    header: () => <div className="text-right">{key === 'debe' ? 'Debe' : key === 'haber' ? 'Haber' : 'Saldo'}</div>,
    enableSorting: false,
    cell: ({ row }) => (
      <div className={`whitespace-nowrap text-right tabular-nums ${key === 'saldo' ? 'font-semibold' : row.original[key] === 0 ? 'text-muted-foreground' : ''}`}>
        {formatBalance(row.original[key])}
      </div>
    ),
  })),
];
