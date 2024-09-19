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
          <IoHomeOutline size={sizeIcon} color={colorIcon} />
          <Link to="/home" className="elem-link">Inicio</Link>
        </li>
        <li>
          <MdOutlineAccountBalance size={sizeIcon} color={colorIcon} />
          <Link to="/home/account" className="elem-link">Cuentas</Link>
        </li>
        <hr />

        <h4>Avanzado</h4>
        <li>
          <IoBookOutline size={sizeIcon} color={colorIcon} />
          <Link className="elem-link">Libros</Link>
        </li>
        <li>
          <PiSneakerMove size={sizeIcon} color={colorIcon} />
          <Link className="elem-link">Movimientos</Link>
        </li>

        <hr />

        <h4>Preferencias</h4>
        <li>
          <IoSettingsOutline size={sizeIcon} color={colorIcon} />
          <Link className="elem-link">Configuración</Link>
        </li>
        <li>
          <MdOutlineSupervisorAccount size={sizeIcon} color={colorIcon} />
          <Link className="elem-link">Usuario</Link>
        </li>
      </ul>
    </aside>
  );
};
