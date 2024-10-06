import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'

const initialForm = {
    nombre: "",
    codigoCuenta: "",
    tipo_cuenta_id: 1,
    cuenta_padre_id: ""
};

export const AccountCreate = () => {

    const [openToggle, setOpenToggle] = useState(false);

    const { formState, setFormState, onInputChange } = useForm(initialForm);

    const { nombre, codigoCuenta, tipo_cuenta_id, cuenta_padre_id } = formState;

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(formState);
        onClean()
    }

    const onOpenToggle = () => {
        setOpenToggle(!openToggle)
        setFormState({
            ...formState,
            cuenta_padre_id: ""
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
                        <label htmlFor="">CODIGO</label>
                        <input
                            type="number"
                            className="input-data"
                            placeholder='Ingrese código...'
                            name='codigoCuenta'
                            value={codigoCuenta}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
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
                            name="tipo_cuenta_id"
                            value={tipo_cuenta_id}
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
                {openToggle && <div className="group-data">
                    <div className="form-data">
                        <label htmlFor="">Codigo de cuenta padre</label>
                        <input
                            type="number"
                            className="input-data"
                            placeholder='Codigo de la cuenta padre'
                            name='cuenta_padre_id'
                            value={cuenta_padre_id}
                            onChange={onInputChange}
                        />
                    </div>
                </div>}

            </div>
            <hr />

            {/* Botones para Limpiar y Crear cuenta */}
            <div className="create-buttons">
                <div className="toggle-container">
                    <input type="checkbox" id="toggle" className="toggle-checkbox" onClick={onOpenToggle}/>
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
