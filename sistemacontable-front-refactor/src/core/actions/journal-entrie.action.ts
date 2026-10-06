import { Entrie } from "@/schemas/entrie.schema";
import { DatesRange, Entrie as EntrieInterface } from "@/interfaces/entrie-interface";
import { api } from "../api/axios";
import { AxiosResponse } from "axios";

const URL_BASE = "/api/asientos";

/**
 * Endpoint para registrar asientos contables. Método POST.
 * @param entrie es el asiento contable a registrar. 
 */
export const createJournalEntrie = async (entrie: Entrie): Promise<void> => {
  const { data } = await api.post(`${URL_BASE}/registrar`, entrie);
  return data
}

/**
 * Endpoint para obtener todos los asientos contables entre 2 fechas. Método GET.
 * @returns retorna todos los asientos contables registrados.
 */
export const getJournalEntrieByRange = async (fechas: DatesRange): Promise<EntrieInterface[]> => {
  const { desde, hasta } = fechas;
  const { data } = await api.get<EntrieInterface[]>(`${URL_BASE}/listar`, {
    params: { desde, hasta }
  });

  return data;
}

/**
 * Endpoint para generar un PDF con los asientos contables en un rango de fechas. Método GET.
 * @param fechas  rango de fechas para filtrar los asientos contables.
 * @returns un Blob que representa el archivo PDF generado.
 */
export const getPdfJournalEntries = async (fechas: DatesRange): Promise<Blob> => {
  const { desde, hasta } = fechas;
  const response: AxiosResponse<Blob> = await api.get(`${URL_BASE}/pdf`, {
    params: { desde, hasta },
    responseType: 'blob',
  });

  return response.data;
};