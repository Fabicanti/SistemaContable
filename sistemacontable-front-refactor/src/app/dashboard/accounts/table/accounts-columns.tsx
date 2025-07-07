import { sortableHeader } from "@/components/table/utils/columns-utils";
import { Account } from "@/interfaces/account-interface";
import { ColumnDef } from "@tanstack/react-table";
import { Check, X } from "lucide-react";

export const accountsColumns: ColumnDef<Account>[] = [
  {
    accessorKey: "codigoCuenta",
    header: sortableHeader<Account>("Código de cuenta"),
    enableHiding: false,
    enableSorting: true,
  },
  {
    accessorKey: "nombre",
    header: sortableHeader<Account>("Nombre de cuenta"),
    enableHiding: false,
    enableSorting: true,
  },
  {
    accessorKey: "recibeSaldo",
    header: sortableHeader<Account>("Recibe saldo"),
    cell: ({ row }) => {
      const recibeSaldo = row.original.recibeSaldo;
      return <span>{!recibeSaldo ? <X className="text-red-500 dark:text-red-800" /> : <Check className="text-green-500 dark:text-green-700" />}</span>;
    },
    enableHiding: false,
    enableSorting: true,
  },
  {
    accessorKey: "tipoCuentaNombre",
    header: sortableHeader<Account>("Tipo de cuenta"),
    enableHiding: false,
    enableSorting: true,
  },
]