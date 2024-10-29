
import { useCallback } from 'react';
import { AlertModal } from '../utils/AlertModal';
import { useFetchGET } from './useFetchGET';

const urlAllAccount = "http://localhost:8080/api/cuentas";
const urlNamesAccount = "http://localhost:8080/api/cuentas/nombres";
const urlAddAsientos = "http://localhost:8080/api/asientos/registrar";
const urlAllAsientos = "http://localhost:8080/api/asientos/listar";
const urlDownloadPDFAsientos = "http://localhost:8080/api/asientos/pdf";
const urlUsersData = "http://localhost:8080/api/usuarios";

export const useMovements = () => {

    const { state: allAsientosState, fetchGet: fetchAllAsientos } = useFetchGET(urlAllAsientos);
    const { state: allAccountState, fetchGet: fetchAllAccount } = useFetchGET(urlAllAccount);
    const { state: nameAccountsState, fetchGet: fetchNameAccounts } = useFetchGET(urlNamesAccount);
    const { state: allDataUsers, fetchGet: fetchAllDataUsers } = useFetchGET(urlUsersData);

    const dataAllUsers = useCallback(() => {
        return {
            state: allDataUsers,
            fetch: fetchAllDataUsers
        }
    }, [allDataUsers, fetchAllDataUsers])

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

    const downloadPDFAsientos = async () => {
        try {
            const response = await fetch( urlDownloadPDFAsientos, {
                method: "GET",
                headers: {
                    "Content-Type": "application/pdf",
                },
            });
    
            if (!response.ok) {
                throw new Error("Error al generar el PDF");
            }
    
            const blob = await response.blob();
    
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.download = "Asientos.pdf";
            link.click();
    
            window.URL.revokeObjectURL(url);
        } catch (error) {
            AlertModal("Error", "Hubo un error en el PDF", "error");
        }
    }


    return {
        dataAllAsientos,
        dataAllAccount,
        dataNameAccounts,
        handleAddAsientos,
        downloadPDFAsientos,
        dataAllUsers,
    }
}
