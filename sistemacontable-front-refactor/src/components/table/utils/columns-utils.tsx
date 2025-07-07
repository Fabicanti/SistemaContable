// src/components/data-table/column-utils.tsx
import { Button } from "@/components/ui/button"
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react"
import type { FilterFn, Row, SortDirection } from "@tanstack/react-table"

// Componente que muestra el ícono de ordenamiento
export const SortedIcon = ({ isSorted }: { isSorted: SortDirection | false }) => {
  if (isSorted === "asc") {
    return <ChevronUpIcon className="h-4 w-4 ml-1" />
  }
  if (isSorted === "desc") {
    return <ChevronDownIcon className="h-4 w-4 ml-1" />
  }
  return null
}

// Header reutilizable con ordenamiento
import type { Column } from "@tanstack/react-table"

export function sortableHeader<T>(label: string) {
  const SortableHeaderComponent = ({ column }: { column: Column<T, unknown> }) => (
    <Button
      variant="ghost"
      onClick={() =>
        column.toggleSorting(column.getIsSorted() === "asc")
      }
      className="bg-gradient-to-tr from-pink-500 to-orange-500 bg-clip-text text-transparent font-bold px-0"
    >
      {label}
      <SortedIcon isSorted={column.getIsSorted()} />
    </Button>
  );
  SortableHeaderComponent.displayName = `SortableHeader(${label})`;
  return SortableHeaderComponent;
}

// Filtro personalizado para múltiples campos
// Define a type for your row data
type ClientRow = {
  clientName: string
  email: string
  status: string
}

export const myCustomFilterFn: FilterFn<ClientRow> = (
  row: Row<ClientRow>,
  columnId: string,
  filterValue: string,
) => {
  filterValue = filterValue.toLowerCase()
  const filterParts = filterValue.split(" ")
  const rowValue = `${row.original.clientName} ${row.original.email} ${row.original.status}`.toLowerCase()
  return filterParts.every((part) => rowValue.includes(part))
}

// Filtro para el input de data-table.tsx
export function createGlobalFilter<T>(filterableColumns?: string[]): FilterFn<T> {
  return (row: Row<T>, columnId: string, filterValue: string) => {
    const normalizedParts = filterValue
      ?.toString()
      .toLowerCase()
      .split(" ")
      .filter(Boolean) // elimina strings vacíos
      .map(part => part.replace(/\s+/g, ''))

    // Función para normalizar y unir campos de la fila
    const rowText = (filterableColumns?.length ? filterableColumns : Object.keys(row.original as Record<string, unknown>)).map(col => {
      const value = row.original[col as keyof T]
      return String(value ?? "").toLowerCase().replace(/\s+/g, '')
    }).join(" ")

    // const rowText = (filterableColumns?.length ? filterableColumns : Object.keys(row.original as object)).map(col => {
    //   const value = row.getValue(col)
    //   return String(value ?? "").toLowerCase().replace(/\s+/g, '')
    // }).join(" ")

    // Devuelve true si todas las partes del filtro están presentes en el texto de la fila
    return normalizedParts.every(part => rowText.includes(part))
  }
}
