import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { InputNumber } from 'primereact/inputnumber';

const initialForm = {
    nombre: "",
    saldo: 0,
    tipoCuentaId: 1,
    cuentaPadreId: ""
};

export const AccountCreate = ({ addAccount, fetchtable }) => {

    const [openToggle, setOpenToggle] = useState(false);

    const { formState, setFormState, onInputChange } = useForm(initialForm);
    const { nombre, saldo, tipoCuentaId, cuentaPadreId } = formState;

    const onSubmit = (event) => {
        event.preventDefault();
        addAccount(formState, fetchtable)
        console.log(formState);
        onClean()
    }

    const onOpenToggle = () => {
        setOpenToggle(!openToggle)
        setFormState({
            ...formState,
            cuentaPadreId: "",
            saldo: -1
        })
    }

    const onClean = () => {
        setFormState(initialForm);
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="data-create">
                <div className="group-data">
                    <div className="form-data">
                        <label htmlFor="">NOMBRE DE LA CUENTA</label>
                        <input
                            type="text"
                            className="input-data"
                            placeholder='Ingrese nombre...'
                            name='nombre'
                            value={nombre}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="group-data-select">
                    <div className="form-data">
                        <label htmlFor="">TIPO DE CUENTA</label>
                        <select
                            id="select"
                            className='selection-data'
                            name="tipoCuentaId"
                            value={tipoCuentaId}
                            onChange={onInputChange}
                        >
                            <option value={1}>ACTIVO</option>
                            <option value={2}>PASIVO</option>
                            <option value={3}>PATRIMONIO NETO</option>
                            <option value={4}>INGRESOS</option>
                            <option value={5}>GASTOS</option>
                        </select>
                    </div>
                </div>
                {openToggle && 
                <div className="group-data">
                    <div className="form-data">
                        <label htmlFor="">Codigo de cuenta padre</label>
                        <input
                            type="number"
                            className="input-data"
                            placeholder='Codigo de la cuenta padre'
                            name='cuentaPadreId'
                            value={cuentaPadreId}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                }

                {/* {openToggle &&
                <div className="group-data">
                    <div className="form-data">
                        <label htmlFor="" className='label-input'>Saldo Inicial</label>
                        <InputNumber
                            placeholder='Ingrese saldo...'
                            name="saldo"
                            value={saldo}
                            onValueChange={onInputChange}
                            minFractionDigits={2}
                            maxFractionDigits={2}
                            mode="currency"
                            currency="ARS"
                            locale="es-AR"
                        />
                    </div>
                </div>
                } */}

            </div>
            <hr />

            {/* Botones para Limpiar y Crear cuenta */}
            <div className="create-buttons">
                <div className="toggle-container">
                    <input type="checkbox" id="toggle" className="toggle-checkbox" onClick={onOpenToggle} />
                    <label htmlFor="toggle" className="toggle-label">
                        <span className="toggle-button"></span>
                    </label>
                    <span className='title-toggle'>¿Recibe saldo?</span>
                </div>

                <div>
                    <button className="btn-clean" type='button' onClick={onClean}>Limpiar</button>
                    <button className="btn-create" type='submit'>Crear cuenta</button>
                </div>
            </div>
        </form>
    )
}
