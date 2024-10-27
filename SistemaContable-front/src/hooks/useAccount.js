import Swal from "sweetalert2";
import { AlertModal } from "../utils/AlertModal";

const urlAddAccount = "http://localhost:8080/api/cuentas/crear"

export const useAccount = () => {

    const handleAddAccount = async (row, fetchdata) => {
        const response = await fetch(urlAddAccount, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(row)
        });
        if (response.ok){
            AlertModal("¡Cuenta Agregada!", "", "success");
            fetchdata()
        }else{
            const data = await response.json();
            console.log(data);
        }
    }

    const handleDeleteAccount = async (row, fetchdata) => {
        const { id } = row;
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Eliminar cuenta"
        }).then( async (result) => {
            if (result.isConfirmed) {
                const response = await fetch(`http://localhost:8080/api/cuentas/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    AlertModal("Cuenta eliminada", "", "success");
                    fetchdata()
                    
                }else{
                    const data = await response.json();
                    AlertModal("Hubo un error",  data.message || "", "error")
                }
                
            }
        });
    }

    const handlePDFData = () => {
        
    }

    return {
        handleDeleteAccount,
        handleAddAccount
    }
}
