
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserStore = {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
  // fetchUser: () => Promise<void>
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      // fetchUser: async () => {
      //   set({ isLoading: true });
      //   const { data } = await api.get('/users/me');
      //   set({ user: data, isLoading: false });
      // },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
)