
import { AlertModal } from '../utils/AlertModal';
import { useFetchGET } from './useFetchGET';

const urlAllAccount = "http://localhost:8080/api/cuentas";
const urlNamesAccount = "http://localhost:8080/api/cuentas/nombres";
const urlAddAsientos = "http://localhost:8080/api/asientos/registrar";
const urlAllAsientos = "http://localhost:8080/api/asientos/listar";

export const useMovements = () => {

    const dataAllAsientos = () => {
        const { state, fetchGet } = useFetchGET(urlAllAsientos);
        return { state, fetchGet}
    }

    const dataAllAccount = () => {
        const { state, fetchGet } = useFetchGET(urlAllAccount);
        return {
            state,
            fetchGet
        }
    }

    const dataNameAccounts = () => {
        const { state, fetchGet } = useFetchGET(urlNamesAccount);
        return {
            state,
            fetchGet
        }
    }

    const handleAddAsientos = async ( asientos, fetchget ) => {
        const response = await fetch(urlAddAsientos, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(asientos)
        })
        
        if (response.ok) {
            AlertModal("Se registro exitosamente", "", "success");
            fetchget()
            console.log(asientos);
        }else{
            AlertModal("Error en el registro de asientos", "", "error");
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
