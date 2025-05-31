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
    try {
      set({ isLoading: true })

      const { data } = await api.post<User>('/api/usuarios/login', credentials);
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
    try {
      // await api.post('/auth/logout')
      useUserStore.getState().clearUser();
      localStorage.clear();

      toast.success('Sesión cerrada')
    } catch (err) {
      toast.error('Error al cerrar sesión')
    }
  },
}))