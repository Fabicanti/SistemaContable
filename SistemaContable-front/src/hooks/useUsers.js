import Swal from "sweetalert2";
import { AlertModal } from "../utils/AlertModal";

const urlBackendRegister = "http://localhost:8080/api/usuarios/registrar";
const urlBackendDelete = "http://localhost:8080/api/usuarios/eliminar";
const urlBackendUpdate = "http://localhost:8080/api/usuarios/modificar";

export const useUsers = () => {

    const handleAddUser = async (user, fetchtdata) => {
        const { nombre, apellido, email, username, password, roleId } = user;
        const response = await fetch(urlBackendRegister, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, apellido, email, username, password, roleId }),
        });
        if (response.ok) {
            AlertModal("Se registro exitosamente", "", "success");
            fetchtdata()
        } else {
            AlertModal("Error de registro de datos", "Intente nuevamente", "error");
        }
        return
    }

    const handleEditUser = async (user, fetchtdata) => {
        const { id, nombre, apellido, email, username, password, roleId } = user;
        const response = await fetch(urlBackendUpdate, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id, nombre, apellido, email, username, password: "null", roleId }),
        });
        if (response.ok) {
            AlertModal("Se modificó exitosamente", "", "success");
            fetchtdata()
        }else{
            AlertModal("Hubo un error en la modificación", "", "error");
        }
        return
    }

    const handleDeleteUser = async (user, fetchtdata) => {
        const { nombre, apellido, email, username, password, roleId } = user;
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
                const response = await fetch(urlBackendDelete, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre, apellido, email, username, password, roleId }),
                });
                if (response.ok) {
                    AlertModal("Usuario eliminado", "", "success");
                    fetchtdata()
                    
                }else{
                    AlertModal("Hubo un error", "", "error")
                }
                
            }
        });
        return
    }

    return {
        handleAddUser,
        handleEditUser,
        handleDeleteUser,
    }
}