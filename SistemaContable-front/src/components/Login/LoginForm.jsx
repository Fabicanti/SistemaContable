import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";

const initialForm = {
    username: "",
    password: "",
};
// url backend - Spring Boot
const urlBackendLogin = "http://localhost:8080/api/usuarios/login"


export const LoginForm = ({ avatarLogin, login, form }) => {

    const { formState, setFormState,  onInputChange } = form(initialForm);

    const { username, password } = formState;

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const onSumbit = async (event) => {
        event.preventDefault();
        const response = await fetch(urlBackendLogin, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const userData = await response.json();
            login(userData);
        } else {
            Swal.fire({
                title: "Error de inicio de sesión",
                text: "Usuario o contraseña incorrecto",
                icon: "error",
            });
            setFormState(initialForm);
        }
    };

    return (
        <div className="componentForm">
            <form onSubmit={onSumbit}>
                <img src={avatarLogin} alt="" className="avatarLogin" />
                <h2>Bienvenido</h2>

                <div className="form-group focus">
                    <div className="i">
                        <FaUser className="icon" />
                    </div>

                    <div>
                        <label htmlFor="username">Nombre de usuario: </label>

                        <input
                            type="text"
                            className="form-input"
                            name="username"
                            value={username}
                            placeholder=""
                            onChange={onInputChange}
                        />
                    </div>
                </div>

                <div className="form-group focus">
                    <div className="i">
                        <FaLock className="icon" />
                    </div>

                    <div>
                        <label htmlFor="password">Contraseña: </label>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            className="form-input"
                            name="password"
                            value={password}
                            onChange={onInputChange}
                        />
                    </div>

                    {password && 
                    <span 
                        onClick={togglePasswordVisibility}
                        className="toggle-password">
                        {passwordVisible ? <IoEyeOutline className="icon-pass"/> : <IoEyeOffOutline className="icon-pass"/>}
                    </span>}

                </div>
{/* 
                <a className="a link" href="#" style={ {opacity: '0'} }>
                    ¿Olvidaste tu contraseña?
                </a> */}

                <input
                    type="submit"
                    name="send-form"
                    value={"INICIAR SESIÓN"}
                    className="form-sumbit"
                />

                <div className="answer-login">
                    <div>¿No tienes cuenta?</div>
                    <Link className="link" to="/register"> Registrate</Link>
                </div>
            </form>
        </div>
    );
};
