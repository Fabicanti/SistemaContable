import { getAccountsAll } from "@/core/actions/account.action";
import { Account } from "@/interfaces/account-interface"
import { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
       * @returns retorna todas las cuentas registradas.
       */
      fetchAccounts: async () => {
        const { accounts } = get();
        if (accounts !== null) return;

        set({ isLoadingAccounts: true });
        try {

          const data = await getAccountsAll();
          set({ accounts: data, isLoadingAccounts: false });

        } catch (error: AxiosError | any) {
          console.error("Error fetching accounts:", error);
        } finally {
          set({ isLoadingAccounts: false });
        }
      },

      refetchAccounts: async () => {
        set({ isLoadingAccounts: true });
        try {
          const data = await getAccountsAll();
          set({ accounts: data, isLoadingAccounts: false });
        } catch (error: AxiosError | any) {
          console.error("Error refetching accounts:", error);
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