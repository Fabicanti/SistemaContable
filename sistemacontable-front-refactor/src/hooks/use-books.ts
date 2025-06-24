import { getBooks, getPdfBooks } from "@/core/actions/book.action";
import { Account } from "@/interfaces/account-interface";
import { BookRequest } from "@/interfaces/book-interface";
import { downloadBlobPdf } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

/**
 * Hook para obtener todos los libros de una cuenta contable.
 */
export function useBooksAll() {
  const booksAllMutation = useMutation({
    mutationFn: getBooks
  });

  const onSubmit = (dates?: DateRange, account?: Account | null) => {
    if (!dates?.from || !dates?.to) {
      toast.warning("No hay un rango de fechas definido.");
      return;
    }

    if (!account) {
      toast.warning("No hay una cuenta seleccionada.");
      return;
    }

    const request: BookRequest = {
      cuentaId: account.id,
      fechaInicio: dates.from.toISOString().split("T")[0],
      fechaFin: dates.to.toISOString().split("T")[0],
    }

    booksAllMutation.mutate(request);
  }

  return { dataBooks: booksAllMutation.data ?? [], isLoadingBooks: booksAllMutation.isPending, onSubmit }
}


/**
 *  Hook para obtener el PDF de los libros de una cuenta contable.
 */
export function useBooksPdf() {
  const booksPdfMutation = useMutation({
    mutationFn: getPdfBooks,
    onSuccess: (response) => {
      const blob = response.data;
      if (!(blob instanceof Blob)) {
        toast.error("Error al descargar el PDF.");
        return;
      }

      const disposition = response.headers['content-disposition'];
      let nombreArchivo = "libro-mayor.pdf";

      if (disposition) {
        const match = disposition.match(/filename="?([^"]+)"?/);
        if (match?.[1]) {
          nombreArchivo = decodeURIComponent(match[1]);
        }
      }

      downloadBlobPdf(blob, nombreArchivo);
    }
  });


  const onSubmit = (dates?: DateRange, account?: Account | null) => {
    if (!dates?.from || !dates?.to) {
      toast.warning("No hay un rango de fechas definido.");
      return;
    }

    if (!account) {
      toast.warning("No hay una cuenta seleccionada.");
      return;
    }

    const request: BookRequest = {
      cuentaId: account.id,
      fechaInicio: dates.from.toISOString().split("T")[0],
      fechaFin: dates.to.toISOString().split("T")[0],
    }

    booksPdfMutation.mutate(request);
  }

  return { onSubmit, isLoadingPdfBooks: booksPdfMutation.isPending}
}