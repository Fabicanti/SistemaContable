import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import logo from "../assets/icono-sistema.png";
import avatarUsuario from "../assets/avatars/admin-4.png"
import "../styles/Head.css";

export const Head = ({ login = false, logout }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <>
      <header className="cabecera" style={ {background: ` ${login ? "rgba(255, 255, 255, 0.2)" : "rgb(0, 0, 0, 0.6)"}`} }>
        {login ? (
          <div className="text-wel">{`¡Bienvenido ${user?.nombre} ${user?.apellido}!`}</div>
        ) : (
          <Link
            className="logo-system"
            style={{ textDecoration: "none" }}
            to={"/"}
          >
            <img src={logo} alt="" />
            <span>Sistema contable</span>
          </Link>
        )}
        {/* Otro componente? */}
        <div className="div-nav">
          {login ? (
            <div className="dropdown">
              <img 
                src={avatarUsuario} 
                alt=""
                className="dropdown-toggle" 
                id="dropdownMenuButton" 
                data-bs-toggle="dropdown"
                aria-expanded="false" 
                style={ {width: "50px", height: "50px", cursor: "pointer"} } />
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" onClick={() => logout()}>Cerrar Sesión</a></li>
              </ul>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="log-button in"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </header>
    </>
  );
}