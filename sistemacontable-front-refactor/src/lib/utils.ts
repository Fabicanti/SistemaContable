import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.info("Código copiado al portapapeles");
  } catch (error) {
    toast.error("Error al copiar");
  }
};

export function formatDateToSpanish(date: Date): string {
  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function handleApiError(error: AxiosError<ErrorMessage>, fallbackMessage = "Error inesperado"){
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

  // console.error("API Error:", error);
}