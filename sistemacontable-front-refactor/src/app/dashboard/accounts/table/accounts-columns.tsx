import { sortableHeader } from "@/components/table/utils/columns-utils";
import { Account } from "@/interfaces/account-interface";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Layers3 } from "lucide-react";
import { capitalize } from "@/lib/utils";

export const accountsColumns: ColumnDef<Account>[] = [
  {
    accessorKey: "codigoCuenta",
    header: sortableHeader<Account>("Código", true),
    cell: ({ row }) => <span className="font-mono text-xs tabular-nums text-muted-foreground">{row.original.codigoCuenta}</span>,
    enableHiding: false,
  },
  {
    accessorKey: "nombre",
    header: sortableHeader<Account>("Nombre de cuenta", true),
    cell: ({ row }) => <span className="font-medium text-foreground">{row.original.nombre}</span>,
    enableHiding: false,
  },
  {
    accessorKey: "recibeSaldo",
    header: sortableHeader<Account>("Uso de la cuenta", true),
    cell: ({ row }) => row.original.recibeSaldo ? (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400"><Check className="size-3.5" />Recibe saldo</span>
    ) : (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"><Layers3 className="size-3.5" />Agrupadora</span>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "tipoCuentaNombre",
    header: sortableHeader<Account>("Tipo de cuenta", true),
    cell: ({ row }) => <span className="text-muted-foreground">{capitalize(row.original.tipoCuentaNombre)}</span>,
    enableHiding: false,
  },
];
