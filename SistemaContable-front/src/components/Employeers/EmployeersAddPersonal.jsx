import React from 'react'
import { InputMask } from 'primereact/inputmask';
import { HiOutlineIdentification } from 'react-icons/hi2'
import { 
    MdBrush, 
    MdDriveFileRenameOutline, 
    MdOutlineCake, 
    MdOutlineHomeWork, 
    MdOutlineHome, 
    MdAlternateEmail   
} from 'react-icons/md'
import { RiGenderlessLine } from "react-icons/ri";


export const EmployeersAddPersonal = ({ formState, onInputChange }) => {

    const { nombre, apellido, fechaNacimiento, cuit, lugarResidencia, sexo, domicilio, email } = formState;

    return (
        <div className="content-personal">
            <div className="emp-title">Datos Personales</div>
            
            <div className="emp-personal-det">
                <div className='emp-group-form'>
                    <div className='icon-emp'>
                        <MdDriveFileRenameOutline />
                    </div>

                    <div className='emp-form'>
                        <label htmlFor="">Nombre</label>
                        <input
                            type="text"
                            name='nombre'
                            className='input-emp'
                            value={nombre}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className='emp-group-form'>
                    <div className='icon-emp'>
                        <MdBrush />
                    </div>

                    <div className='emp-form'>
                        <label htmlFor="">Apellido</label>
                        <input
                            type="text"
                            name='apellido'
                            className='input-emp'
                            value={apellido}
                            onChange={onInputChange}
                        />
                    </div>
                </div>

                <div className='emp-group-form'>
                    <div className='icon-emp'>
                        <MdOutlineCake />
                    </div>

                    <div className='emp-form'>
                        <label htmlFor="">Fecha de nacimiento</label>
                        <input
                            type="date"
                            name='fechaNacimiento'
                            className='input-emp'
                            value={fechaNacimiento}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className='emp-group-form'>
                    <div className='icon-emp'>
                        <MdAlternateEmail />
                    </div>

                    <div className='emp-form'>
                        <label htmlFor="">Email</label>
                        <input
                            type="email"
                            name='email'
                            className='input-emp'
                            value={email}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className='emp-group-form'>
                    <div className='icon-emp'>
                        <HiOutlineIdentification />
                    </div>
                    <div className='emp-form'>
                        <label htmlFor="">CUIT</label>
                        <InputMask 
                            value={cuit}
                            name='cuit'
                            onChange={onInputChange} 
                            mask="99-99999999-9" 
                            className='input-emp'
                        />
                        
                    </div>

                </div>
                <div className='emp-group-form'>
                    <div className='icon-emp'>
                        <MdOutlineHomeWork />
                    </div>

                    <div className='emp-form'>
                        <label htmlFor="">Residencia</label>
                        <input
                            type="text"
                            name='lugarResidencia'
                            className='input-emp'
                            value={lugarResidencia}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className='emp-group-form'>
                    <div className='icon-emp'>
                        <MdOutlineHome />
                    </div>

                    <div className='emp-form'>
                        <label htmlFor="">Domicilio</label>
                        <input
                            type="text"
                            name='domicilio'
                            className='input-emp'
                            value={domicilio}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className='emp-selection-form'>
                    <div className='icon-emp'>
                        <RiGenderlessLine />
                    </div>

                    <div className='emp-form'>
                        <label htmlFor="">Sexo</label>
                        <select name="sexo" value={sexo} onChange={onInputChange} className="selection">
                            <option value={"F"}>Femenino</option>
                            <option value={"M"}>Masculino</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}
