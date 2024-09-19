import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useUser } from "../context/UserProvider";
import logo from "../assets/icono-sistema.png";
import "../styles/Header.css";

export const Head = ({ login = false, logout }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <>
      <header className="cabecera" style={ {background: ` ${login ? "rgba(255, 255, 255, 0.2)" : "rgb(0, 0, 0, 0.6)"}`} }>
        {login ? (
          user?.roles === "SUPERUSER" ? (
            <div className="roles a">Administrador</div>
          ) : (
            <div className="roles b">Usuario</div>
          )
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
        <div className="div-nav">
          {login ? (
            <button onClick={() => logout()} className="log-button out">
              <IoIosLogOut size={36} />
            </button>
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