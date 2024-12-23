import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAccountBalance, MdOutlineSupervisorAccount } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { IoSettingsOutline, IoHomeOutline, IoBookOutline } from "react-icons/io5";
import { useUser } from "../../context/UserProvider";
import { BadgeUser } from "../BadgeUser";
import logo from "../../assets/icono-sistema.png";
import "../../styles/Aside.css";

const sizeIcon = 24;
const colorIcon = "white";

export const Aside = () => {

  const { user } = useUser();

  return (
    <aside className={`side-bar`}>
      <Link
        className="logo-aside"
        style={{ textDecoration: "none" }}
      >
        <div>
          <img src={logo} alt="" />
          <div className="text-logo">SSAAII</div>
        </div>
      </Link>
      <BadgeUser rol={user?.roleId}/>
      <ul className="links-aside">
        <h4>Menu principal</h4>
        <li>
          <Link to="/" className="elem-link">
            <IoHomeOutline size={sizeIcon} color={colorIcon} />
            <div>Inicio</div>
          </Link>
        </li>
        <li>
          <Link to="/account" className="elem-link">
          <MdOutlineAccountBalance size={sizeIcon} color={colorIcon}/>
           <div>Cuentas</div>
           </Link>
        </li>
        <li>
          <Link to="/users" className="elem-link">
            <MdOutlineSupervisorAccount size={sizeIcon} color={colorIcon} />
            <div>Usuarios</div>
          </Link>
        </li>
        <hr />

        <h4>Avanzado</h4>
        <li>
          <Link to="/books" className="elem-link">
            <IoBookOutline size={sizeIcon} color={colorIcon} />
            <div>Libros</div>
          </Link>
        </li>
        <li>
          <Link to="/movements" className="elem-link">
            <TbReportAnalytics size={sizeIcon} color={colorIcon} />
            <div>Asientos</div>
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
      </ul>
    </aside>
  );
};
