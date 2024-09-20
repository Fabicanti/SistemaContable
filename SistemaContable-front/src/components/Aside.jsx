import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAccountBalance, MdOutlineSupervisorAccount } from "react-icons/md";
import { PiSneakerMove } from "react-icons/pi";
import { IoSettingsOutline, IoHomeOutline, IoBookOutline } from "react-icons/io5";
import logo from "../assets/icono-sistema.png";
import "../styles/Aside.css";

const sizeIcon = 36;
const colorIcon = "white";

export const Aside = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <aside className={`side-bar ${menuOpen ? "open" : ""}`}>
      <Link
        className="logo-aside"
        style={{ textDecoration: "none" }}
        onClick={toggleMenu}
      >
        <img src={logo} alt="" />
        <h2 className="text-logo">Sistema Contable</h2>
      </Link>

      <ul className="links-aside">
        <h4>Menu principal</h4>
        <li>
          <Link to="/home" className="elem-link">
            <IoHomeOutline size={sizeIcon} color={colorIcon} />
            <div>Inicio</div>
          </Link>
        </li>
        <li>
          <Link to="/home/account" className="elem-link">
          <MdOutlineAccountBalance size={sizeIcon} color={colorIcon}/>
           <div>Cuentas</div>
           </Link>
        </li>
        <hr />

        <h4>Avanzado</h4>
        <li>
          <Link className="elem-link">
            <IoBookOutline size={sizeIcon} color={colorIcon} />
            <div>Libros</div>
          </Link>
        </li>
        <li>
          <Link className="elem-link">
            <PiSneakerMove size={sizeIcon} color={colorIcon} />
            <div>Movimientos</div>
          </Link>
        </li>

        <hr />

        <h4>Preferencias</h4>
        <li>
          <Link className="elem-link">
            <IoSettingsOutline size={sizeIcon} color={colorIcon} />
            <div>Configuración</div>
          </Link>
        </li>
        <li>
          <Link className="elem-link">
            <MdOutlineSupervisorAccount size={sizeIcon} color={colorIcon} />
            <div>Usuario</div>
          </Link>
        </li>
      </ul>
    </aside>
  );
};
