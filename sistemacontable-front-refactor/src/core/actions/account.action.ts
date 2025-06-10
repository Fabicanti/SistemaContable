import { Account } from "@/interfaces/account-interface";
import { api } from "../api/axios";

const URL_BASE = "/api/cuentas";

type AccountCreate = {
  nombre: string;
  saldo: number;
  tipoCuentaId: number;
  recibeSaldo: boolean;
  cuentaPadreId: number;
}

/**
 * Endpoint donde se obtienen todas las cuentas. Método GET.
 * @returns retorna todas las cuentas registradas.
 */
export const getAccountsAll = async (): Promise<Account[]> => {
  const { data } = await api.get<Account[]>(URL_BASE);
  return data;
}

/**
 * Endpoint para crear una nueva cuenta contable. Método POST.
 * @param account son los datos de la nueva cuenta.
 */
export const createAccount = async (account: AccountCreate) => {
  const { data } = await api.post(`${URL_BASE}/crear`, account);
  return data;
}