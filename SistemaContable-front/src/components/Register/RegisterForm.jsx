import React, { useState } from "react";
import { TbSelector } from "react-icons/tb";
import { FaPenAlt, FaPen, FaAt, FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AlertModal } from "../../utils/AlertModal";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const initialForm = {
    nombre: "",
    apellido: "",
    email: "",
    username: "",
    password: "",
    roleId: "1",
};
// url Backend - Spring Boot
const urlBackendRegister = "http://localhost:8080/api/usuarios/registrar";


export const RegisterForm = ({ avatarRegister, form }) => {
    const navigate = useNavigate();

    const { formState, setFormState, onInputChange } = form(initialForm);

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const { username, password, nombre, apellido, email, roleId } = formState;

    const onClean = () => {
        setFormState(initialForm);
    };

    const onSumbit = async (event) => {
        event.preventDefault();
        console.log(formState);
        const response = await fetch(urlBackendRegister, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, apellido, email, username, password, roleId }),
        });

        if (response.ok) {
            navigate("/login");
        } else {
            AlertModal("Error de registro de datos", "Intente nuevamente", "error")
            onClean();
        }
    };

    return (
        <div className="componentForm">
            <form onSubmit={onSumbit}>
                <img src={avatarRegister} alt="" className="avatarLogin" />
                <h2>Registrate</h2>
                {/* Nombre */}
                <div className="form-group focus sign">
                    <div className="i">
                        <FaPen className="iconSing" />
                    </div>

                    <div>
                        <label htmlFor="nombre">Nombre: </label>
                        <input
                            type="text"
                            required={true}
                            className="form-input"
                            name="nombre"
                            value={nombre}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                {/* Apellido */}
                <div className="form-group focus sign">
                    <div className="i">
                        <FaPenAlt className="iconSing" />
                    </div>

                    <div>
                        <label htmlFor="apellido">Apellido: </label>
                        <input
                            type="text"
                            required={true}
                            className="form-input"
                            name="apellido"
                            value={apellido}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                {/* Email */}
                <div className="form-group focus sign">
                    <div className="i">
                        <FaAt className="iconSing" />
                    </div>

                    <div>
                        <label htmlFor="email">Email: </label>
                        <input
                            type="email"
                            required={true}
                            className="form-input"
                            name="email"
                            value={email}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                {/* Nombre de usuario */}
                <div className="form-group focus sign">
                    <div className="i">
                        <FaUser className="iconSing" />
                    </div>

                    <div>
                        <label htmlFor="username">Nombre de usuario: </label>
                        <input
                            type="text"
                            required={true}
                            className="form-input"
                            name="username"
                            value={username}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                {/* Contraseña */}
                <div className="form-group focus sign">
                    <div className="i">
                        <FaLock className="iconSing" />
                    </div>

                    <div>
                        <label htmlFor="password">Contraseña: </label>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            required={true}
                            className="form-input"
                            name="password"
                            value={password}
                            onChange={onInputChange}
                        />
                    </div>

                    {password && 
                    <span 
                        onClick={togglePasswordVisibility}
                        className="toggle-password sign">
                        {passwordVisible ? <IoEyeOutline className="icon-pass"/> : <IoEyeOffOutline className="icon-pass"/>}
                    </span>}

                </div>

                {/* <div className="register-selection">
                    <div>
                        <TbSelector className="iconSing" size={20} />
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
                </div> */}

                <input
                    type="submit"
                    name="send-form"
                    value={"REGISTRARSE"}
                    className="form-sumbit sign"
                />
                <div className="answer-login">
                    <div>¿Ya tienes cuenta?</div>
                    <Link className="link" to="/login"> Inicia sesión</Link>
                </div>
            </form>
        </div>
    );
};
