import React from "react";
import { useNavigate } from "react-router-dom";

export const PreviewContent = () => {
    const navigate = useNavigate()
    return (
        <div className="content-view">
            <div className="text-container">
                <div className="title-text">
                    <h1>Sistema contable</h1>
                </div>

                <div className="description-text">
                    <h4>
                        Se trata de un proyecto académico para la asignatura de{" "}
                        <b>Sistemas Administrativos II </b>sobre de desarrollo de un{" "}
                        <b>Sistema Contable</b>
                    </h4>
                </div>

                <div className="list-text">
                    <h3>Requerimientos</h3>
                    <ul>
                        <li>Login de usuarios.</li>
                        <li>Tareas y restricciones por roles de usuario.</li>
                        <li>Administración del plan de cuentas.</li>
                        <li>Registro de asientos contables.</li>
                        <li>Reporte de libro diario.</li>
                        <li>Reporte de libro mayor.</li>
                    </ul>
                </div>
            </div>
            <div className="button-text">
                <button onClick={() => navigate('/register')}> ENTRAR</button>
            </div>
        </div>
    );
};
