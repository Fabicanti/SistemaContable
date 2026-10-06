import { Entrie } from '@/interfaces/entrie-interface';
import { formatDateToSpanish } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const JournalEntriesColumns: ColumnDef<Entrie>[] = [
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
    accessorKey: 'usuarioName',
    header: 'Creado por',
    enableSorting: false
  }
]