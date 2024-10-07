import React, { useState } from 'react'
import { IoMdAdd, IoIosArrowUp  } from "react-icons/io";
import {AccountCreate} from "./AccountCreate"

export const AccountMenu = ({ roles }) => {

    const [isOpen, setIsOpen] = useState(false);

    const openCreate = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="menu-account">
            <div className='options-account'>
                <div className='data-account'>
                    <div className='title-account'>Mis Cuentas</div>
                </div>
                {roles == 2 ? <button onClick={openCreate}>
                    { !isOpen ? <IoMdAdd size={24}/> : <IoIosArrowUp size={24}/>}
                </button> : <></>}
            </div>
            
            <div className={`create-account ${isOpen ? 'visible' : ''}`}>
                <AccountCreate/>
            </div>
            
        </div>
    )
}
