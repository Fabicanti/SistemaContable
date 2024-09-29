import React, { useState } from "react";
import { FaAt, FaLock, FaPen, FaPenAlt, FaUser } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { TbSelector } from "react-icons/tb";

const initialForm = {
    nombre: "",
    apellido: "",
    email: "",
    username: "",
    password: "",
    roleId: "1",
};

export const UsersForm = ({ addHandle, form, closeModal, fetch, dataUsers = {} }) => {

    const conditionalEdit = dataUsers && Object.keys(dataUsers).length > 0;

    const { formState, setFormState, onInputChange } = form(
        conditionalEdit ? dataUsers : initialForm
    );

    const [passwordVisible, setPasswordVisible] = useState(false);

    const { username, password, nombre, apellido, email, roleId } = formState;

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        addHandle(formState, fetch);
        setFormState(initialForm);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className={`form-group-modal ${conditionalEdit ? "edit" : ""}`}>
                <div className="icon">
                    <FaPen className="iconModal" />
                </div>
                <div className="form-data">
                    <label htmlFor="">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        required={true}
                        name="nombre"
                        value={nombre}
                        onChange={onInputChange}
                        className="input-modal"
                    />
                </div>
            </div>

            <div className={`form-group-modal ${conditionalEdit ? "edit" : ""}`}>
                <div className="icon">
                    <FaPenAlt className="iconModal" />
                </div>
                <div className="form-data">
                    <label htmlFor="">Apellido</label>
                    <input
                        type="text"
                        id="apellido"
                        required={true}
                        className="input-modal"
                        name="apellido"
                        value={apellido}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className={`form-group-modal ${conditionalEdit ? "edit" : ""}`}>
                <div className="icon">
                    <FaAt className="iconModal" />
                </div>
                <div className="form-data">
                    <label htmlFor="">Email</label>
                    <input
                        type="email"
                        id="email"
                        required={true}
                        className="input-modal"
                        name="email"
                        value={email}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className={`form-group-modal ${conditionalEdit ? "edit" : ""}`}>
                <div className="icon">
                    <FaUser className="iconModal" />
                </div>
                <div className="form-data">
                    <label htmlFor="">Nombre de usuario</label>
                    <input
                        type="text"
                        id="username"
                        required={true}
                        className="input-modal"
                        name="username"
                        value={username}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            {conditionalEdit  
            ? <></> 
            : <div className="form-group-modal">
                <div className="icon">
                    <FaLock className="iconModal" />
                </div>
                <div className="form-data">
                    <label htmlFor="">Contraseña</label>
                    <input
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        required={true}
                        className="input-modal"
                        name="password"
                        value={password}
                        onChange={onInputChange}
                    />
                </div>

                {password && (
                    <span onClick={togglePasswordVisibility} className="toggle-password">
                        {passwordVisible ? (
                            <IoEyeOutline className="icon-pass" />
                        ) : (
                            <IoEyeOffOutline className="icon-pass" />
                        )}
                    </span>
                )}
            </div>}
            <div className={`register-selection ${conditionalEdit ? "edit" : ""}`}>
                <div>
                    <TbSelector className="icon-modal" size={20} />
                    Tipo de usuario:{" "}
                </div>
                <select
                    className="selection"
                    name="roleId"
                    value={roleId}
                    onChange={onInputChange}
                >
                    <option value={1}>Usuario</option>
                    <option value={2}>Administrador</option>
                </select>
            </div>
            <hr />
            <div className="btn-modal">
                <button onClick={() => closeModal()} type="button" style={{color: "black"}}>
                    Cerrar
                </button>
                {conditionalEdit
                ? <button className="btn-modal-edit " type="submit">Editar</button>
                : <button className="btn-modal-add" type="submit">Agregar</button>}
            </div>
        </form>
    );
};
