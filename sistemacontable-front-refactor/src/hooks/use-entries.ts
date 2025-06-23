"use client";

import { AxiosError } from 'axios';
import { DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
    createJournalEntrie, getJournalEntrieByRange, getPdfJournalEntries
} from '@/core/actions/journal-entrie.action';
import { DatesRange } from '@/interfaces/entrie-interface';
import { downloadBlobPdf, handleApiError } from '@/lib/utils';
import { Entrie, entrieSchema } from '@/schemas/entrie.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Función para obtener todos los asientos contables.
 * @returns retorna todos los asientos contables registrados.
 */
export function useEntriesByDateRange() {

  const entriesRangeMutation = useMutation({
    mutationFn: getJournalEntrieByRange,
  })

  const onSubmit = (dates?: DateRange) => {
    if (!dates?.from || !dates?.to) {
      toast.warning("No hay un rango de fechas definido.");
      return;
    }

    const fechas: DatesRange = {
      desde: dates.from.toISOString().split("T")[0],
      hasta: dates.to.toISOString().split("T")[0],
    };

    entriesRangeMutation.mutate(fechas);
  }

  return { dataEntries: entriesRangeMutation.data ?? [], isLoadingEntries: entriesRangeMutation.isPending, onSubmit }
}


/**
 * Función para crear un asiento contable.
 */
export function useCreateEntrie() {
  const queryClient = useQueryClient();
  const form = useForm<Entrie>({
    resolver: zodResolver(entrieSchema),
    defaultValues: {
      usuarioId: 0,
      fecha: new Date().toISOString().split("T")[0],
      descripcion: '',
      detalles: []
    }
  });

  const createEntrieMutation = useMutation({
    mutationFn: createJournalEntrie,
    onSuccess: () => {
      toast.success("Se ha creado un asiento contable.");
      queryClient.invalidateQueries({ queryKey: ["entries"] });
      form.reset();
    },
    onError: (error: AxiosError<ErrorMessage>) => {
      handleApiError(error, "No se pudo crear el asiento contable")
    }
  })

  const onSubmit = (entrie: Entrie, userId: number) => {
    const data: Entrie = { ...entrie, usuarioId: userId }
    createEntrieMutation.mutate(data);
  }

  return {
    form,
    isLoadingCreateEntrie: createEntrieMutation.isPending,
    isSuccessCreateEntrie: createEntrieMutation.isSuccess,
    onSubmit
  }
}


/**
 * Función para generar un PDF con los asientos contables en un rango de fechas.
 * @param fechas rango de fechas para filtrar los asientos contables.
 */
export function useEntriePdf() {
  const entriePdfMutation = useMutation({
    mutationFn: getPdfJournalEntries,
    onSuccess: (pdfBlob) => {
      downloadBlobPdf(pdfBlob, "asientos-contables.pdf");
    },
    onError: (error: AxiosError<ErrorMessage>) => {
      handleApiError(error, "No se pudo generar el PDF de los asientos contables")
    }
  });

  const onSubmit = (fechas?: DateRange) => {
    if (!fechas?.from || !fechas?.to) {
      toast.warning("No hay un rango de fechas definido.");
      return;
    }

    const rangoFechas: DatesRange = {
      desde: fechas.from.toISOString().split("T")[0],
      hasta: fechas.to.toISOString().split("T")[0],
    };

    entriePdfMutation.mutate(rangoFechas);
  }

  return { onSubmit, isLoadingPdfEntries: entriePdfMutation.isPending };
}