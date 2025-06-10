"use client"

import { useMemo, useState } from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  Row,
  getFacetedRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Payment } from "./payment.data"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react"
import { createGlobalFilter } from "./utils/columns-utils"
import { Checkbox } from "../ui/checkbox"
import { capitalize } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showToggleColumns?: boolean;
  actions?: (rowData: TData) => React.ReactNode;
  columnLabels?: Record<string, string>;
  filterableColumns?: string[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showToggleColumns = true,
  actions,
  columnLabels = {},
  filterableColumns = ["name", "category"],
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [currentStatus, setCurrentStatus] = useState('all')
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState<string>("")

  const hasRowSelection = Object.keys(rowSelection).length > 0

  const allColumns = useMemo<ColumnDef<TData, TValue>[]>(
    () => [
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
      } as ColumnDef<TData, TValue>,
      ...columns,
      ...(actions
        ?
        [
          {
            id: "actions",
            enableHiding: false,
            enableSorting: false,
            cell: ({ row }: { row: Row<TData> }) => {
              const rowData = row.original;
              return (
                <div className="flex items-center justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {actions(rowData)}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            },
          } as ColumnDef<TData, TValue>,
        ]
        : []),
    ],
    [columns, actions]
  );

  const table = useReactTable({
    data,
    columns: allColumns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    // onSortingChange: setSorting // sirve para actualizar el estado de la tabla
    // getSortedRowModel: getSortedRowModel() // es una función que devuelve el modelo de fila ordenada
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getFacetedRowModel: getFacetedRowModel(),
    onRowSelectionChange: setRowSelection,
    globalFilterFn: createGlobalFilter(filterableColumns),

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter
    },
  })

  const columnUniqueValues = useMemo(() => {
    if (!columnLabels || !columnLabels.column) return []

    const set = new Set<string>()

    data.forEach((row: any) => {
      const value = row[columnLabels.column]
      if (value) set.add(value)
    })

    return Array.from(set).map(val => capitalize(val))
  }, [data, columnLabels.column]);

  return (
    <div>
      <div className="flex items-center justify-between py-4 gap-3">
        <Input
          placeholder="Buscar..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />

        {columnLabels && Object.keys(columnLabels).length > 0 && <Select
          value={currentStatus}
          onValueChange={(value) => {

            if (value === "all") {
              setCurrentStatus(value)
              table.getColumn(columnLabels.column)?.setFilterValue(undefined)
              return;
            }

            setCurrentStatus(value)
            table.getColumn(columnLabels.column)?.setFilterValue(value)
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{columnLabels.label}</SelectLabel>
              <SelectItem value="all">Todos</SelectItem>
              {columnUniqueValues.map((value) => (
                <SelectItem key={value} value={value} className="font-semibold">
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        }

        {/* {
          hasRowSelection && (
            <Button
              variant={"destructive"}
              onClick={() => {
                const ids = table.getSelectedRowModel().rows.map((row) => {
                  return (row.original as Payment).clientName
                })
                console.log(ids)
              }}
            >
              Delete
            </Button>
          )
        } */}

        {showToggleColumns &&
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columnas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(
                  (column) => column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </div>


      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: Row<TData>) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No hay resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="space-x-2 py-4 mx-2 flex justify-between items-center">
          <div className="flex-1 hidden md:flex text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} filas(s) seleccionadas.
          </div>


          <div className="flex items-center justify-end gap-4">
            <div className="hidden md:block">
              <Select
                onValueChange={(value) => {
                  // Esto lo transforma a number
                  table.setPageSize(+value)
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filas por páginas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Filas por páginas</SelectLabel>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size={"sm"}
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                title="Ir al principio"
              >
                <ChevronsLeft />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                title="Anterior"
              >
                <ChevronLeft />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                title="Siguiente"
              >
                <ChevronRight />
              </Button>

              <Button
                variant="outline"
                size={"sm"}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                title="Ir al final"
              >
                <ChevronsRight />
              </Button>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}
