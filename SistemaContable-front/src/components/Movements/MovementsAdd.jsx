import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { InputNumber } from "primereact/inputnumber";
import { AutoComplete } from "primereact/autocomplete";
import { MovementsModalTable } from "./MovementsModalTable";
import { MovementsEntry } from "./MovementsEntry";
import { useUser } from "../../context/UserProvider";

const initialForm = () => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];

    return {
        fecha: formattedDate,
        nroasiento: "",
        descripcion: "",
        saldo: "",
        cuenta: "",
        tipo: "debe",
    };
};

const obtenerIdCuenta = (nombreCuenta, tableAccount) => {
    const cuenta = tableAccount.find(c => c.nombre === nombreCuenta);
    return cuenta ? cuenta.id : null; // Devuelve el ID o null si no encuentra la cuenta
};

let counter = 0;

export const MovementsAdd = ({ roles, fetchget, dataNamesAccount, handleAddAsientos, dataAllAccount}) => {
    const { formState, onInputChange, setFormState } = useForm(initialForm);
    const { fecha, nroasiento, descripcion, saldo, cuenta, tipo } = formState;

    const [cuentas, setCuentas] = useState([]);
    const { user } = useUser()

    // Nombres para el autocompletado.
    const { state, fetchGet } = dataNamesAccount();
    const { state: allAccount, fetchGet: fetchAccountsGet} = dataAllAccount();
    const { data, isLoading } = state;
    const [nombresCuentas, setNombresCuentas] = useState([]);
    useEffect(() => {
        if (data && !isLoading) {
            setNombresCuentas(data);
        }
    }, [data, isLoading]);

    const buscarNombre = (event) => {
        const query = event.query.toLowerCase();
        const filtrarNombre = nombresCuentas.filter((nombre) => {
            return nombre.toLowerCase().includes(query);
        });
        setCuentas(filtrarNombre);
    };

    // Los movimientos
    const [dataMovements, setDataMovements] = useState([]);

    const addDataMovements = () => {
        const nuevoMovimiento = {
            id: ++counter,
            cuenta: tipo === "haber" ? `${'\u00A0'.repeat(8)}${cuenta}` : cuenta,
            debe: tipo === "debe" ? saldo : null,
            haber: tipo === "haber" ? saldo : null
        };
    
        setDataMovements((prevData) => [...prevData, nuevoMovimiento]);
        setNombresCuentas(nombresCuentas.filter(nombre => nombre !== cuenta));

        setFormState({
            ...formState,
            cuenta: "",
        })
    }

    const removeDataMovements = (rowData) => {
        const movimientosActualizados = dataMovements.filter(mov => mov.id !== rowData.id);
        setDataMovements([...movimientosActualizados]);
        setNombresCuentas((prev) => [...prev, rowData.cuenta.trim()]);
    };

    const onClean = () => {
        setFormState(initialForm)
        fetchGet()
        setDataMovements([])
        counter = 0
    }

    const onSumbit = (event) => {
        event.preventDefault();

        const { data } = allAccount;

        const movimientosPreparados = dataMovements.map(mov => {
            // Saco el nombre de la cuenta y el id (Para el Backend)
            const { cuenta, id, ...resto } = mov;
            return {
                ...resto,
                cuentaId: obtenerIdCuenta(cuenta.trim(), data), // Agrego cuentaId en lugar de cuenta
            };
        });

        const asiento = {
            fecha: fecha,
            descripcion: descripcion,
            usuarioId: user?.id,
            detalles: movimientosPreparados
        }
        handleAddAsientos(asiento, fetchget);
        onClean()
    };

    return (
        <form onSubmit={onSumbit} className="mov-form-container">
            <div className="mov-group-form">
                <div className="mov-form">
                    <label htmlFor="">Fecha:</label>
                    <input
                        type="date"
                        name="fecha"
                        value={fecha}
                        onChange={onInputChange}
                    />
                </div>
                <div className="mov-form">
                    <label htmlFor="">Nro. Asiento:</label>
                    <input
                        type="number"
                        name="nroasiento"
                        value={nroasiento}
                        onChange={onInputChange}
                    />
                </div>
                <div className="mov-form">
                    <textarea
                        type=""
                        placeholder="Descripcion del asiento"
                        name="descripcion"
                        value={descripcion}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <hr />

            <div className="title-mov">
                Crear movimientos
            </div>

            <div className="mov-seat-group">
                <div className="mov-seat">
                    <label htmlFor="">Cuenta:</label>
                    <AutoComplete
                        className="input-auto"
                        name="cuenta"
                        value={cuenta}
                        suggestions={cuentas}
                        completeMethod={buscarNombre}
                        onChange={onInputChange}
                        panelClassName="autocomplete-panel"
                    />
                </div>

                <div className="mov-seat">
                    <label htmlFor="">Saldo:</label>
                    <InputNumber
                        className="input-number"
                        name="saldo"
                        value={saldo}
                        onChange={onInputChange}
                        minFractionDigits={2}
                        maxFractionDigits={2}
                        mode="currency"
                        currency="ARS"
                        locale="es-AR"
                    />
                </div>

                <div className="mov-seat radio">
                    <input
                        className="radio-mov"
                        type="radio"
                        id="debe"
                        name="tipo"
                        value="debe"
                        onChange={onInputChange}
                        checked={tipo === 'debe'}
                        label="Debe"
                    />
                    <input
                        className="radio-mov"
                        type="radio"
                        id="haber"
                        name="tipo"
                        value="haber"
                        onChange={onInputChange}
                        checked={tipo === 'haber'}
                        label="Haber"
                    />
                </div>

                <div className="mov-seat">
                    <button type="button" className="btn-mov-seat add" onClick={addDataMovements}>Agregar Movimiento</button>
                    <button type="button" className="btn-mov-seat">Agregar Cuenta</button>
                    <MovementsModalTable roles={roles} datas={allAccount} fetchGet={fetchAccountsGet}/>
                </div>
            </div>
            
            <hr />
            <MovementsEntry datas={dataMovements} onDelete={removeDataMovements}/>
            <hr />
            <div className="mov-buttons">
                <button className="btn-clear-mov">Limpiar</button>
                <button type="submit" className="btn-add-seat">Agregar Asiento</button>
            </div>
        </form>
    );
};
