
import { getUserById } from '@/core/actions/user.action';
import { ErrorMessage } from '@/interfaces/error-interface';
import { User } from '@/interfaces/user-interface'
import { handleApiError } from '@/lib/utils';
import axios from 'axios';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  refetchUser: () => Promise<void>;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),

      /**
       * Endpoint para obtener los datos del usuario actual.
       */
      refetchUser: async () => {
        const { user } = get();
        if (!user) return;
        
        try {
          const data = await getUserById(user.id);
          set({ user: data });
        } catch (error: unknown) {
          if (axios.isAxiosError<ErrorMessage>(error)) {
            handleApiError(error, "No se pudo actualizar los datos del usuario");
          } else {
            console.error("Error desconocido", error);
          }
        }
      },

      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
)