import React from 'react'

import { InputNumber } from 'primereact/inputnumber';
import { FaChild } from 'react-icons/fa6'
import { HiOutlineBanknotes } from 'react-icons/hi2'
import { MdCalendarMonth, MdLabelImportantOutline, MdPhone  } from 'react-icons/md'

export const EmployeersAddLabor = ({ formState, onInputChange }) => {

    const { fechaIngreso, hijos, salario, puesto, telefono } = formState;
    return (
        <div className="content-personal">
            <div className="emp-title lab">Datos laborales</div>

            <div className="emp-labor-det">
                
                <div className='emp-group-form'>
                    <div className='icon-emp'>
                        <MdCalendarMonth />
                    </div>

                    <div className='emp-form'>
                        <label htmlFor="">Fecha de ingreso</label>
                        <input
                            type="date"
                            name='fechaIngreso'
                            className='input-emp'
                            value={fechaIngreso}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className='emp-group-form'>
                    <div className='icon-emp'>
                        <HiOutlineBanknotes />
                    </div>

                    <div className='emp-form'>
                        <label htmlFor="">Salario</label>
                        <InputNumber 
                            className='input-emp'
                            inputId="currency-us"
                            value={salario}
                            name='salario'
                            onValueChange={onInputChange}
                            minFractionDigits={2}
                            maxFractionDigits={2}
                            mode="currency" 
                            currency="USD" 
                            locale="en-US" 
                        />

                    </div>
                </div>
                <div className='emp-group-form'>
                    <div className='icon-emp'>
                        <MdLabelImportantOutline />
                    </div>

                    <div className='emp-form'>
                        <label htmlFor="">Puesto</label>
                        <input
                            type="text"
                            name='puesto'
                            className='input-emp'
                            value={puesto}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className='emp-group-form'>
                    <div className='icon-emp'>
                        <MdPhone  />
                    </div>

                    <div className='emp-form'>
                        <label htmlFor="">Telefono</label>
                        <input
                            type="text"
                            name='telefono'
                            className='input-emp'
                            value={telefono}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className='emp-group-form'>
                    <div className='icon-emp'>
                        <FaChild />
                    </div>

                    <div className='emp-form'>
                        <label htmlFor="">Hijos</label>
                        <input
                            type="text"
                            name='hijos'
                            className='input-emp'
                            value={hijos}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
