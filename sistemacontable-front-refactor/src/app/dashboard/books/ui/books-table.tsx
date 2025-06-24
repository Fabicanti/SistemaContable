"use client";

import { DataTable } from '@/components/table/data-table'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useAccountsWithMovements } from '@/hooks/use-accounts'
import React, { useState } from 'react'
import { booksColumns } from '../table/books-columns'
import { Button } from '@/components/ui/button';
import { DateRange } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, FileDown, LoaderCircle } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { Autocomplete } from '@/components/shared/autocomplete';
import { Account } from '@/interfaces/account-interface';
import { capitalize } from '@/lib/utils';
import { useBooksAll, useBooksPdf } from '@/hooks/use-books';

export default function BooksTable() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const { accountsWithMovements } = useAccountsWithMovements();
  const { dataBooks, isLoadingBooks, onSubmit: onSubmitBooks } = useBooksAll();
  const { onSubmit: onSubmitBookPdf, isLoadingPdfBooks } = useBooksPdf();

  const getLabel = (): string => {
    if (dateRange?.from && dateRange?.to) {
      return `${format(dateRange.from, "dd/MM/yyyy")} - ${format(dateRange.to, "dd/MM/yyyy")}`;
    }
    if (dateRange?.from) {
      return `${format(dateRange.from, "dd/MM/yyyy")} - ...`;
    }
    return "Seleccione las fechas";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Libro Mayor
        </CardTitle>
        <CardDescription>
          Solo se mostrarán las cuentas con movimientos asociados.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4 mb-4 md:flex-row md:items-end md:justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:items-center">
            <div>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-full md:w-52 justify-between font-normal"
                  >
                    {getLabel()}
                    <CalendarIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    locale={es}
                    mode="range"
                    selected={dateRange}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDateRange(date);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Autocomplete<Account>
              items={accountsWithMovements}
              value={(selectedAccount?.id)?.toString() ?? ""}
              onChange={(item) => setSelectedAccount(item)}
              getLabel={(item) =>
                `${item.nombre} - ${capitalize(item.tipoCuentaNombre)}`
              }
              getValue={(item) => item.id.toString()}
              placeholder="Selecciona una cuenta"
            />

            <div className="grid grid-cols-2 gap-3">
              <Button
                disabled={!dateRange || isLoadingBooks || !selectedAccount}
                onClick={() => onSubmitBooks(dateRange, selectedAccount)}
              >
                {isLoadingBooks ? (
                  <div className="flex items-center justify-center">
                    <LoaderCircle className="mr-2 animate-spin" />
                    Buscando...
                  </div>
                ) : (
                  "Buscar"
                )}
              </Button>
              <Button
                variant="outline"
                disabled={!dateRange || !selectedAccount}
                onClick={() => {
                  setDateRange(undefined);
                  setSelectedAccount(null);
                }}
              >
                Limpiar
              </Button>
            </div>
          </div>
        </div>

        <DataTable
          columns={booksColumns}
          data={dataBooks}
          showToggleColumns={false}
          showSearchInput={false}
          messageEmpty="No hay movimientos."
        />
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button
          variant="destructive"
          disabled={!dateRange || !selectedAccount || isLoadingPdfBooks}
          onClick={() => onSubmitBookPdf(dateRange, selectedAccount)}
        >
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center">
              {isLoadingPdfBooks ? (
                <>
                  <LoaderCircle className="mr-2 animate-spin" />
                  Descargando...
                </>
              ) : (
                <>
                  <FileDown className="mr-2" />
                  Descargar PDF
                </>
              )}
            </div>
          </div>
        </Button>
      </CardFooter>
    </Card>
  );
}