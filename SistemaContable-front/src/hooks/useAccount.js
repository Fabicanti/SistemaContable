import Swal from "sweetalert2";
import { AlertModal } from "../utils/AlertModal";


export const useAccount = () => {

    const handleDeleteAccount = async (row, fetchdata) => {
        const { id } = row;
        console.log(id)
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Eliminar usuario"
        }).then( async (result) => {
            if (result.isConfirmed) {
                const response = await fetch(`http://localhost:8080/api/cuentas/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    AlertModal("Usuario eliminado", "", "success");
                    fetchdata()
                    
                }else{
                    const data = await response.json();
                    console.log(data)
                    AlertModal("Hubo un error",  data.message || "", "error")
                }
                
            }
        });
    }

    return {
        handleDeleteAccount
    }
}
