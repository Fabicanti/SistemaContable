"use client"

import { Badge } from "@/components/ui/badge"
import { ColumnDef, FilterFn, Row } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Payment } from "@/components/table/payment.data"
import { sortableHeader } from "@/components/table/utils/columns-utils"
import Content from "../ui/content"

const myCustomFilterFn: FilterFn<Payment> = (row: Row<Payment>, columnId: string, filterValue: string, addMeta: (meta: any) => void) => {
  filterValue = filterValue.toLowerCase()
  // 1. Convierte el valor de la celda a minúsculas. 
  const filterParts = filterValue.split(" ")
  // 2. Divide el valor del filtro en partes 
  const rowValue = `${row.original.clientName} ${row.original.email} ${row.original.status}`.toLowerCase()
  // 3. Convierte el valor de la celda a minúsculas y lo concatena con un espacio entre cada parte
  // 4. Comprueba si el valor de la celda contiene todas las partes del filtro
  return filterParts.every( (part) => rowValue.includes(part));
}

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: "clientName",
    // filterFn: myCustomFilterFn,
    // filterFn: "includesString",
    header: sortableHeader("Client Name"),
  },
  {
    accessorKey: "status",
    // filterFn: myCustomFilterFn,
    // filterFn: "includesString",
    header: sortableHeader("Status"),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const color = {
        pending: "secondary",
        success: "success",
        failed: "destructive",
        processing: "info",
      }[status] ?? ('default') as any;

      return <Badge variant={color}>{status}</Badge>
    }
  },
  {
    accessorKey: "amount",
    header: sortableHeader("Amount"),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "email",
    header: sortableHeader("Email"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Content row={payment}/>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    enableSorting: false,
    enableHiding: false, // Oculta la columna de acciones. Solo en el drowpdown de columnas
  },
]