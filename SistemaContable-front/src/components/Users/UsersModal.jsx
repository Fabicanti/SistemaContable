import { CiEdit } from "react-icons/ci";
import "../../styles/components/Modal.css";
import { IoPersonAddOutline } from "react-icons/io5";
import { useState } from "react";
import { UsersForm } from "./UsersForm";
import { useForm } from "../../hooks/useForm";

export const UsersModal = ({ sizeButton, editMode = false, onHandle, fetch, dataUser}) => {
  // Manejar el estado del modal para saber si está abierto y si es modo edición
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(editMode);

  // Función para abrir el modal en modo edición
  const openEditModal = () => {
    setIsEdit(true); 
    setIsOpen(true); 
  };

  // Función para abrir el modal en modo agregar
  const openAddModal = () => {
    setIsEdit(false);
    setIsOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isEdit ? (
        <button
          type="button"
          className="btn-modal-edit"
          onClick={openEditModal}
        >
          <CiEdit size={sizeButton} className="btn-edit" />
        </button>
      ) : (
        <button
          type="button"
          className="btn-modal-add"
          onClick={openAddModal}
        >
          <IoPersonAddOutline size={sizeButton} className="btn-edit" />
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  {isEdit ? "Editar usuario" : "Agregar Usuario"}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <UsersForm form={useForm} addHandle={onHandle} closeModal={closeModal} fetch={fetch} dataUsers={dataUser}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};