
import { User } from '@/interfaces/user-interface'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserStore = {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
)