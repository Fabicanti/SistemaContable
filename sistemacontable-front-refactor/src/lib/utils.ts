import { ErrorMessage } from '@/interfaces/error-interface';
import { AxiosError } from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Función para copiar texto al portapapeles.
 * @param text es el texto que se desea copiar al portapapeles.
 */
export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.info("Código copiado al portapapeles");
  } catch {
    toast.error("Error al copiar");
  }
};

/**
 * Función para formatear una fecha al formato español (DD/MM/YYYY).
 * @param date es un objeto Date que se desea formatear.
 * @returns la fecha formateada como cadena.
 */
export function formatDateToSpanish(date: Date): string {
  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}


/**
 * Función para capitalizar la primera letra de una cadena de texto.
 * @param str es una cadena de texto que se desea capitalizar.
 * @returns la cadena de texto capitalizada.
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}


/**
 * Función para manejar errores de la API.
 * @param error  es el error de la petición HTTP.
 * @param fallbackMessage  es el mensaje de error por defecto.
 */
export function handleApiError(error: AxiosError<ErrorMessage>, fallbackMessage = "Error inesperado") {
  const data = error.response?.data;

  if (data?.message && data?.status) {
    switch (data.status) {
      case 403:
        toast.error("Acceso denegado", {
          description: data.message,
        });
        break;
      case 409:
        toast.warning("Conflicto", {
          description: data.message,
        });
        break;
      case 422:
        toast.warning("Información incorrecta", {
          description: data.message,
        });
        break;
      case 500:
        toast.error("Error del servidor", {
          description: data.message,
        });
        break;
      default:
        toast.error("Error", {
          description: data.message,
        });
    }
  } else {
    toast.error(fallbackMessage);
  }
}


/**
 * Función para generar un número aleatorio de n dígitos.
 * @param n es la cantidad de dígitos del número generado.
 * @returns 
 */
export function randomNumber(n: number): number {
  if (n <= 0) throw new Error("La cantidad de dígitos debe ser mayor a cero");

  const min = Math.pow(10, n - 1);
  const max = Math.pow(10, n) - 1;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatBalance(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(n)

}


/**
 * Función para descargar un archivo PDF.
 * @param blob  es el Blob que contiene el PDF a descargar.
 * @param nombreArchivo  es el nombre del archivo que se descargará.
 */
export function downloadBlobPdf(blob: Blob, nombreArchivo: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = nombreArchivo;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 100)
}