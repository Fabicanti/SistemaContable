import React from 'react'
import { UsersModal } from './UsersModal'
import { useUser } from '../../context/UserProvider'
import avatar from "../../assets/avatars/admin-4.png"

export const UsersMenu = ({onAdd, fetch}) => {
    const {user} = useUser();

    return (
        <div className='menu-user'>
            <div className='data-user'>
                <h2>Datos personales</h2>
                <ul>
                    <li><b>Nombre: </b>{user.nombre}</li>
                    <li><b>Apellido: </b>{user.apellido}</li>
                    <li><b>Email: </b>{user.email}</li>
                    <li><b>Nombre de usuario: </b>{user.username}</li>
                </ul>
            </div>
            <div className='option-user'>
                {/* Imagen de */}
                <img src={avatar} alt={user?.nombre + " " + user?.apellido} style={ {height: '100px', width: '100px'} }/>
                <UsersModal sizeButton={36} onHandle={onAdd} fetch={fetch}/>
            </div>

        </div>
    )
}
