
import { useCallback } from 'react';
import { AlertModal } from '../utils/AlertModal';
import { useFetchGET } from './useFetchGET';

const urlAllAccount = "http://localhost:8080/api/cuentas";
const urlNamesAccount = "http://localhost:8080/api/cuentas/nombres";
const urlAddAsientos = "http://localhost:8080/api/asientos/registrar";
const urlAllAsientos = "http://localhost:8080/api/asientos/listar";

export const useMovements = () => {

    const { state: allAsientosState, fetchGet: fetchAllAsientos } = useFetchGET(urlAllAsientos);
    const { state: allAccountState, fetchGet: fetchAllAccount } = useFetchGET(urlAllAccount);
    const { state: nameAccountsState, fetchGet: fetchNameAccounts } = useFetchGET(urlNamesAccount);

    const dataAllAsientos = useCallback(() => {
        return {
            state: allAsientosState,
            fetch: fetchAllAsientos
        };
    }, [allAsientosState, fetchAllAsientos]);

    const dataAllAccount = useCallback(() => {
        return {
            state: allAccountState,
            fetch: fetchAllAccount
        };
    }, [allAccountState, fetchAllAccount]);

    const dataNameAccounts = useCallback(() => {
        return {
            state: nameAccountsState,
            fetch: fetchNameAccounts
        };
    }, [nameAccountsState, fetchNameAccounts]);

    const handleAddAsientos = async ( asientos, fetchget, clean ) => {
        const response = await fetch(urlAddAsientos, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(asientos)
        })
        
        if (response.ok) {
            AlertModal("Se registro exitosamente", "", "success");
            fetchget()
            clean()
            console.log(asientos);
        }else{
            const data = await response.json();
            console.log(data);
            AlertModal("Error en el registro de asientos", data.message || "", "error");
        }
        return
    }


    return {
        dataAllAsientos,
        dataAllAccount,
        dataNameAccounts,
        handleAddAsientos,
    }
}
