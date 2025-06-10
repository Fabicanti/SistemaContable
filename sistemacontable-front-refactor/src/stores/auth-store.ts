import { api } from "@/core/api/axios";
import { Login } from "@/schemas/login.schema";
import { create } from "zustand";
import { useUserStore } from "./user-store";
import { toast } from "sonner";

type AuthStore = {
  isLoading: boolean
  login: (credentials: Login) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoading: false,

  /**
   * Función para iniciar sesión.
   * @param credentials son los datos para autenticarte.
   */
  login: async (credentials) => {
    set({ isLoading: true })

    try {
      const { data } = await api.post<User>('/api/auth/login', credentials);
      useUserStore.getState().setUser(data);

      toast.success('¡Sesión iniciada!')
    } catch (err) {
      toast.error('Credenciales invalidas')
    } finally {
      set({ isLoading: false })
    }
  },

  /**
   * Función para cerrar sesión.
   */
  logout: async () => {
    set({ isLoading: true })

    try {
      await api.post('/api/auth/logout')
      useUserStore.getState().clearUser();

      // Se persiste la configuración "Theme".
      const preservedValue = localStorage.getItem("theme");
      localStorage.clear();

      if (preservedValue !== null) {
        localStorage.setItem("theme", preservedValue);
      }

      toast.success('Sesión cerrada')
    } catch (err) {
      toast.error('Error al cerrar sesión')
    } finally {
      set({ isLoading: false })
    }
  },
}))