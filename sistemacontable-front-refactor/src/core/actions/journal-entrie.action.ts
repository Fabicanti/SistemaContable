import { Entrie } from "@/schemas/entrie.schema";
import { DatesRange, Entrie as EntrieInterface } from "@/interfaces/entrie-interface";
import { api } from "../api/axios";

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
 * Endpoint para obtener todos los asientos contables entre 2 fechas. Método POST.
 * @returns retorna todos los asientos contables registrados.
 */
export const getJournalEntrieByRange = async (fechas: DatesRange): Promise<EntrieInterface[]> => {
  const { data } = await api.post<EntrieInterface[]>(`${URL_BASE}/listar`, fechas);
  return data;
}

/**
 * Endpoint para generar un PDF con los asientos contables en un rango de fechas. Método POST.
 * @param fechas  rango de fechas para filtrar los asientos contables.
 * @returns un Blob que representa el archivo PDF generado.
 */
export const getPdfJournalEntries = async (fechas: DatesRange): Promise<Blob> => {
  const response = await api.post(`${URL_BASE}/pdf`, fechas, {
    responseType: 'blob',
  });
  return response.data;
};