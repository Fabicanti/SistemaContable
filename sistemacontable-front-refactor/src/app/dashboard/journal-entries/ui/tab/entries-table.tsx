"use client";

import { CalendarIcon, Copy, Eye, FileDown, LoaderCircle } from 'lucide-react';
import React, { useState } from 'react';

import { DataTable } from '@/components/table/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useEntriePdf, useEntriesByDateRange } from '@/hooks/use-entries';
import { Entrie } from '@/interfaces/entrie-interface';
import { copyToClipboard } from '@/lib/utils';

import { JournalEntriesColumns } from '../../table/journal-entries-columns';
import EntrieView from '../dialog/entrie-view';
import { es } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

export default function EntriesTable() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [entrieView, setEntrieView] = useState<Entrie | null>(null);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);

  const { dataEntries, onSubmit: onSubmitEntries, isLoadingEntries } = useEntriesByDateRange();
  const { isLoadingPdfEntries, onSubmit: onSubmitPdfEntries } = useEntriePdf();

  const getLabel = (): string => {
    if (dateRange?.from && dateRange?.to) {
      return `${format(dateRange.from, "dd/MM/yyyy")} - ${format(dateRange.to, "dd/MM/yyyy")}`;
    }
    if (dateRange?.from) {
      return `${format(dateRange.from, "dd/MM/yyyy")} - ...`;
    }
    return "Seleccione las fechas";
  };

  const actions = (entrie: Entrie) => {
    return (
      <div>
        <DropdownMenuItem onClick={() => copyToClipboard(String(entrie.id))}>
          <Copy /> Copiar ID
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setEntrieView(entrie)}>
          <Eye /> Ver asiento
        </DropdownMenuItem>
      </div>
    )
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asientos contables</CardTitle>
        <CardDescription>
          Consultá los asientos contables registrados. Podés filtrar por rango de fechas.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid overflow-auto gap-4">
        <div className='flex items-center justify-between'>
          <div className='flex gap-4'>
            <div className="flex flex-col gap-3">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-64 justify-between font-normal"
                  >
                    {getLabel()}
                    <CalendarIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0 " align="start">
                  <Calendar
                    locale={es}
                    mode="range"
                    selected={dateRange}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDateRange(date)
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button
              disabled={!dateRange || isLoadingEntries}
              onClick={() => onSubmitEntries(dateRange)}
            >{isLoadingEntries ? (
              <div className="flex items-center justify-center">
                <LoaderCircle className="mr-2 animate-spin" />
                Buscando...
              </div>) : (
              "Buscar"
            )}
            </Button>
            <Button variant={'outline'} disabled={!dateRange} onClick={() => setDateRange(undefined)}>Limpiar</Button>
          </div>

          <div>
            <Button variant={'destructive'} onClick={() => onSubmitPdfEntries(dateRange)} disabled={isLoadingPdfEntries || !dateRange}>
              <div className='flex items-center justify-center'>
                {isLoadingPdfEntries ? (
                  <>
                    <LoaderCircle className="mr-2 animate-spin" />
                    Descargando...
                  </>
                ) : (
                  <>
                    <FileDown  className="mr-2" />
                    Descargar PDF
                  </>
                )

                }
              </div>
            </Button>
          </div>

        </div>
        <DataTable
          columns={JournalEntriesColumns}
          data={dataEntries}
          showToggleColumns={false}
          showSearchInput={false}
          actions={actions}
          messageEmpty="Sin resultados. Filtra asientos mediante fechas o crea un asiento."
        />
      </CardContent>
      {entrieView && (
        <EntrieView
          entrie={entrieView}
          onClose={() => setEntrieView(null)}
        />
      )}
    </Card>
  )
}