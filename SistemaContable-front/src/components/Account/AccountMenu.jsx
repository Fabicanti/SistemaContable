import React, { useState } from 'react'
import { AccountCreate } from './AccountCreate';
import { IoMdAdd, IoIosArrowUp  } from "react-icons/io";


export const AccountMenu = () => {

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
                <button onClick={openCreate}>
                    { !isOpen ? <IoMdAdd size={24}/> : <IoIosArrowUp size={24}/>}
                </button>
            </div>
            
            <div className={`create-account ${isOpen ? 'visible' : ''}`}>
                <AccountCreate/>
            </div>
            
        </div>
    )
}
