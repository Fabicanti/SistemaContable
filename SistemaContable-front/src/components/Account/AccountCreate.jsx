import React, { useState } from "react";
import {
    MdOutlineDriveFileRenameOutline,
    MdOutlineAttachMoney,
} from "react-icons/md";
import { IoIosOptions } from "react-icons/io";
import { Bs0Circle } from "react-icons/bs";
import { Dropdown } from "primereact/dropdown";
import { AutoComplete } from "primereact/autocomplete";
import { AccountTypes } from "./AccountTypes";  // Aquí tienes tus cuentas existentes
import { AlertModal } from "../../utils/AlertModal";

const tiposCuenta = [
    { label: "Activo", value: "A" },
    { label: "Pasivo", value: "P" },
    { label: "Patrimonio Neto", value: "PN" },
    { label: "Ingresos", value: "RP" },
    { label: "Gastos", value: "RN" },
];

const sizeIcon = 36;

export const AccountCreate = () => {
    const [filteredCuentas, setFilteredCuentas] = useState([]);
    const [selectedCuenta, setSelectedCuenta] = useState(null);
    const [codigo, setCodigo] = useState("");
    const [tipo, setTipo] = useState("");
    const [saldo, setSaldo] = useState(0);
    const [nombre, setNombre] = useState("");

    // Filtra las cuentas según el input del AutoComplete
    const searchCuenta = (event) => {
        const query = event.query.toLowerCase();
        setFilteredCuentas(
            AccountTypes.filter((cuenta) =>
                cuenta.nombre.toLowerCase().includes(query)
            )
        );
    };

    // Maneja el cambio en la selección de cuenta del AutoComplete
    const onCuentaChange = (e) => {
        const cuentaSeleccionada = e.value;
        setSelectedCuenta(cuentaSeleccionada || null);

        // Autocompleta los campos de código, tipo y saldo si existe una cuenta
        if (cuentaSeleccionada && typeof cuentaSeleccionada === "object") {
            setSelectedCuenta(cuentaSeleccionada);
            setNombre(cuentaSeleccionada.nombre);
            setCodigo(cuentaSeleccionada.codigo);
            setTipo(cuentaSeleccionada.tipo_cuenta);
            setSaldo(cuentaSeleccionada.saldo || 0); 
        } else {
            setSelectedCuenta(null);
            setNombre(e.value);
            setCodigo("");
            setTipo("");
            setSaldo(0);
        }
    };

    // Crear nueva cuenta cuando todos los campos están completos
    const onSumbit = () => {
        if (nombre && codigo && tipo && saldo !== null) {
            const nuevaCuenta = {
                nombre,
                codigo,
                tipo_cuenta: tipo,
                saldo,
            };
            console.log("Nueva cuenta creada:", nuevaCuenta);
            // Aquí puedes manejar la lógica de guardado en backend o estado
        } else {
            AlertModal("¡Complete los campos!", "", "error");
        }
    };

    const onClear = () => {
        setCodigo("");
        setSaldo(0);
        setTipo("");
        setSelectedCuenta(null);
        setNombre("");
    };

    return (
        <>
            <div className="data-create">
                {/* AutoComplete para buscar o ingresar el nombre */}
                <div className="group-data">
                    <div className="icon">
                        <MdOutlineDriveFileRenameOutline size={sizeIcon} />
                    </div>
                    <AutoComplete
                        value={nombre}  // El valor es el nombre como string
                        suggestions={filteredCuentas}
                        completeMethod={searchCuenta}
                        field="nombre"
                        onChange={(e) => onCuentaChange(e)}
                        placeholder="Buscar o ingresar cuenta"
                        className="auto-name"
                    />
                </div>

                {/* Input de Código */}
                <div className="group-data">
                    <div className="icon">
                        <Bs0Circle size={sizeIcon} />
                    </div>
                    <input
                        type="text"
                        className="input-data"
                        placeholder="Codigo"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                    />
                </div>

                {/* Dropdown de Tipo de Cuenta */}
                <div className="group-data">
                    <div className="icon">
                        <IoIosOptions size={sizeIcon} />
                    </div>
                    <Dropdown
                        value={tipo}
                        options={tiposCuenta}
                        placeholder="Tipo de cuenta"
                        onChange={(e) => setTipo(e.value)}
                        className="drop-type"
                    />
                </div>

                {/* Input de Saldo */}
                <div className="group-data">
                    <div className="icon">
                        <MdOutlineAttachMoney size={sizeIcon} />
                    </div>
                    <input
                        type="number"
                        className="input-data"
                        placeholder="Saldo inicial"
                        value={saldo}
                        onChange={(e) => setSaldo((e.target.value))}
                    />
                </div>
            </div>

            {/* Botones para Limpiar y Crear cuenta */}
            <div className="create-buttons">
                <button className="btn-clean" onClick={onClear}>Limpiar</button>
                <button className="btn-create" onClick={onSumbit}>Crear cuenta</button>
            </div>
        </>
    );
};
