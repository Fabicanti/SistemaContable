import { sortableHeader } from "@/components/table/utils/columns-utils";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export const usersColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nombre",
    header: sortableHeader("Nombre"),
  },
  {
    accessorKey: "apellido",
    header: sortableHeader("Apellido"),
  },
  {
    accessorKey: "email",
    header: sortableHeader("Email"),
  },
  {
    accessorKey: "username",
    header: sortableHeader("Nombre de usuario"),
  }
]