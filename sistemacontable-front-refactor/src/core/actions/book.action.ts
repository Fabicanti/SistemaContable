import { Book, BookRequest } from "@/interfaces/book-interface";
import { api } from "../api/axios"
import { AxiosResponse } from "axios";

const URL_BASE = "/api/libros";

/**
 * Endpoint para obtener los libros del sistema. Método POST.
 * @param request son los parámetros de búsqueda de los libros.
 * @returns los movimientos de la cuenta.
 */
export const getBooks = async (request: BookRequest): Promise<Book[]> => {
  const { data } = await api.post<Book[]>(`${URL_BASE}/mayor`, request);
  return data;
}


/**
 * Endpoint para obtener el PDF de los libros del sistema. Método POST.
 * @param request  son los parámetros de búsqueda de los libros.
 * @returns un Blob con el contenido del PDF.
 */
export const getPdfBooks = async (request: BookRequest): Promise<AxiosResponse<Blob>> => {
  return api.post<Blob>(`${URL_BASE}/pdf`, request, {
    responseType: 'blob',
  });
}