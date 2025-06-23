import { getAccountsAll } from "@/core/actions/account.action";
import { Account } from "@/interfaces/account-interface"
import { handleApiError } from "@/lib/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from 'axios';

type AccountStore = {
  accounts: Account[] | null;
  setAccounts: (accounts: Account[]) => void;
  isLoadingAccounts: boolean;

  fetchAccounts: () => Promise<void>;
  refetchAccounts: () => Promise<void>;
}

export const useAccountStore = create<AccountStore>()(
  persist(
    (set, get) => ({
      accounts: null,
      setAccounts: (accounts) => set({ accounts }),
      isLoadingAccounts: false,

      /**
       * Endpoint para obtener todas las cuentas.
       */
      fetchAccounts: async () => {
        const { accounts } = get();
        if (accounts !== null) return;

        set({ isLoadingAccounts: true });
        try {

          const data = await getAccountsAll();
          set({ accounts: data, isLoadingAccounts: false });

        } catch (error: unknown) {
          if (axios.isAxiosError<ErrorMessage>(error)) {
            handleApiError(error, "No se pudo cargar los datos de las cuentas");
          } else {
            console.error("Error desconocido", error);
          }
        } finally {
          set({ isLoadingAccounts: false });
        }
      },

      /**
       * Endpoint para actualizar o recargar las cuentas obtenidas.
       */
      refetchAccounts: async () => {
        set({ isLoadingAccounts: true });
        try {
          const data = await getAccountsAll();
          set({ accounts: data, isLoadingAccounts: false });
        } catch (error: unknown) {
          if (axios.isAxiosError<ErrorMessage>(error)) {
            handleApiError(error, "No se pudo recargar los datos de las cuentas");
          } else {
            console.error("Error desconocido", error);
          }
        } finally {
          set({ isLoadingAccounts: false });
        }
      },
    }),
    {
      name: 'account-storage',
      partialize: (state) => ({ accounts: state.accounts })
    }
  )
);