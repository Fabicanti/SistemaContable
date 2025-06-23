import { Entrie } from '@/interfaces/entrie-interface';
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
          {fecha.toLocaleDateString("es-AR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
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