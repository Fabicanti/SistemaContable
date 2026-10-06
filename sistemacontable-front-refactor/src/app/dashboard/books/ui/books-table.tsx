"use client";

import { useState } from "react";
import {
  BookOpen,
  CalendarIcon,
  FileDown,
  LoaderCircle,
  Search,
  RotateCcw,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { DataTable } from "@/components/table/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Autocomplete } from "@/components/shared/autocomplete";
import SkeletonDataTable from "@/components/skeleton/table-skeleton";
import { useAccountsWithMovements } from "@/hooks/use-accounts";
import { useBooksAll, useBooksPdf } from "@/hooks/use-books";
import { Account } from "@/interfaces/account-interface";
import { capitalize, formatBalance } from "@/lib/utils";
import { booksColumns } from "../table/books-columns";

function periodLabel(range?: DateRange) {
  if (!range?.from) return "Seleccioná un período";
  return `${format(range.from, "dd/MM/yyyy")} — ${range.to ? format(range.to, "dd/MM/yyyy") : "…"}`;
}

export default function BooksTable() {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>();
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [query, setQuery] = useState<{
    dates: DateRange;
    account: Account;
  } | null>(null);
  const { accountsWithMovements } = useAccountsWithMovements();
  const { dataBooks, isLoadingBooks, isErrorBooks, resetBooks, onSubmit } =
    useBooksAll();
  const { onSubmit: downloadPdf, isLoadingPdfBooks } = useBooksPdf();
  const canSearch = Boolean(
    dateRange?.from && dateRange?.to && selectedAccount,
  );
  const filtersChanged =
    query &&
    (selectedAccount?.id !== query.account.id ||
      dateRange?.from?.getTime() !== query.dates.from?.getTime() ||
      dateRange?.to?.getTime() !== query.dates.to?.getTime());
  const totals = dataBooks.reduce(
    (sum, book) => ({
      debe: sum.debe + book.debe,
      haber: sum.haber + book.haber,
    }),
    { debe: 0, haber: 0 },
  );

  return (
    <Card className="min-w-0">
      <CardHeader className="border-b">
        <CardTitle className="text-lg">Libro mayor</CardTitle>
        <CardDescription>
          Elegí una cuenta y un período para consultar sus movimientos.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form
          className="grid gap-4 rounded-xl border bg-muted/30 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] lg:items-end"
          onSubmit={(event) => {
            event.preventDefault();
            if (!canSearch || !dateRange || !selectedAccount || isLoadingBooks)
              return;
            setQuery({ dates: dateRange, account: selectedAccount });
            onSubmit(dateRange, selectedAccount);
          }}
        >
          <div className="space-y-2">
            <label htmlFor="book-period" className="text-sm font-medium">
              Período
            </label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  id="book-period"
                  className="w-full justify-between bg-background font-normal"
                >
                  <span className="truncate">{periodLabel(dateRange)}</span>
                  <CalendarIcon aria-hidden="true" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto max-w-[calc(100vw-2rem)] max-h-[70vh] overflow-auto p-0"
                align="start"
              >
                <Calendar
                  locale={es}
                  mode="range"
                  numberOfMonths={2}
                  selected={dateRange}
                  captionLayout="dropdown"
                  onSelect={setDateRange}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div
            className="space-y-2"
            role="group"
            aria-labelledby="book-account-label"
          >
            <p id="book-account-label" className="text-sm font-medium">
              Cuenta contable
            </p>
            <Autocomplete<Account>
              items={accountsWithMovements}
              value={selectedAccount?.id.toString() ?? ""}
              onChange={setSelectedAccount}
              getLabel={(item) =>
                `${item.nombre} · ${capitalize(item.tipoCuentaNombre)}`
              }
              getValue={(item) => item.id.toString()}
              placeholder="Seleccioná una cuenta con movimientos"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="submit"
              className="flex-1"
              disabled={!canSearch || isLoadingBooks}
            >
              {isLoadingBooks ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <Search />
              )}{" "}
              {isLoadingBooks ? "Buscando…" : "Buscar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={
                isLoadingBooks || (!dateRange && !selectedAccount && !query)
              }
              onClick={() => {
                setDateRange(undefined);
                setSelectedAccount(null);
                setQuery(null);
                resetBooks();
              }}
            >
              <RotateCcw aria-hidden="true" />
              Limpiar
            </Button>
          </div>
          <p className="text-xs text-muted-foreground lg:col-span-3">
            Solo se incluyen cuentas con movimientos. Seleccioná la fecha
            inicial y final del período.
          </p>
        </form>

        {isLoadingBooks ? (
          <div role="status" aria-label="Cargando movimientos">
            <SkeletonDataTable rows={4} showSearch={false} />
          </div>
        ) : isErrorBooks ? (
          <div
            role="alert"
            className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center text-sm"
          >
            No pudimos cargar los movimientos. Volvé a intentar la búsqueda.
          </div>
        ) : !query ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-12 text-center">
            <div className="rounded-full bg-muted p-3">
              <BookOpen className="size-6 text-muted-foreground" />
            </div>
            <div>
              <h2 className="font-medium">Consultá el detalle de una cuenta</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Seleccioná los filtros y presioná Buscar para ver el libro
                mayor.
              </p>
            </div>
          </div>
        ) : (
          <section
            className="space-y-4"
            aria-label="Resultados del libro mayor"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold">
                  {query.account.nombre}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    {capitalize(query.account.tipoCuentaNombre)}
                  </span>
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {periodLabel(query.dates)}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                disabled={isLoadingPdfBooks || dataBooks.length === 0}
                onClick={() => downloadPdf(query.dates, query.account)}
              >
                {isLoadingPdfBooks ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <FileDown />
                )}
                {isLoadingPdfBooks ? "Descargando…" : "Descargar PDF"}
              </Button>
            </div>
            {filtersChanged && (
              <p role="status" className="text-sm text-muted-foreground">
                Cambiaste los filtros. Presioná Buscar para actualizar los
                resultados.
              </p>
            )}
            {dataBooks.length > 0 && (
              <dl className="grid gap-3 sm:grid-cols-3">
                {[
                  {
                    label: "Total debe",
                    value: totals.debe,
                    detail: "Movimientos del período",
                  },
                  {
                    label: "Total haber",
                    value: totals.haber,
                    detail: "Movimientos del período",
                  },
                  {
                    label: "Saldo al último movimiento",
                    value: dataBooks[dataBooks.length - 1].saldo,
                    detail: "Según el libro mayor",
                  },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className={`min-w-0 rounded-xl border p-4 ${index === 2 ? "bg-primary/5 border-primary/20" : "bg-muted/20"}`}
                  >
                    <dt className="text-sm text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="mt-2 wrap-break-word text-xl font-semibold tracking-tight tabular-nums">
                      {formatBalance(item.value)}
                      <span className="mt-1 block text-xs font-normal tracking-normal text-muted-foreground">
                        {item.detail}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            <DataTable
              key={`${query.account.id}-${periodLabel(query.dates)}`}
              columns={booksColumns}
              data={dataBooks}
              showToggleColumns={false}
              showSearchInput={false}
              enableRowSelection={false}
              showPageSummary
              rowLabels={{ singular: "movimiento", plural: "movimientos" }}
              messageEmpty="No hay movimientos para esta cuenta en el período seleccionado."
            />
          </section>
        )}
      </CardContent>
    </Card>
  );
}
