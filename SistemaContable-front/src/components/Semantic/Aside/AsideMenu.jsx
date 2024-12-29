import React from 'react'
import { 
    IoBookOutline, 
    IoHomeOutline,
    IoSettingsOutline, 
    IoPeopleOutline, 
    IoDocumentsOutline,
    IoTimeOutline
} from 'react-icons/io5'
import { MdOutlineAccountBalance, MdOutlineSupervisorAccount } from 'react-icons/md'
import { TbReportAnalytics } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const sizeIcon = 24;
const colorIcon = "white";

export const AsideMenu = () => {
    return (
        <>
            <h4>Menu principal</h4>
            <li>
                <Link to="/" className="elem-link">
                    <IoHomeOutline size={sizeIcon} color={colorIcon} />
                    <div>Inicio</div>
                </Link>
            </li>
            <li>
                <Link to="/account" className="elem-link">
                    <MdOutlineAccountBalance size={sizeIcon} color={colorIcon} />
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
            
            <h4>Sueldos</h4>
            <li>
                <Link to="/employeers" className='elem-link'>
                    <IoPeopleOutline  size={sizeIcon} color={colorIcon}/>
                    <div>Empleados</div>
                </Link>
            </li>
            <li>
                <Link className='elem-link'>
                    <IoDocumentsOutline size={sizeIcon} color={colorIcon}/>
                    <div>Recibos</div>
                </Link>
            </li>
            <li>
                <Link className='elem-link'>
                    <IoTimeOutline size={sizeIcon} color={colorIcon}/>
                    <div>Asistencia</div>
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
        </>
    )
}
