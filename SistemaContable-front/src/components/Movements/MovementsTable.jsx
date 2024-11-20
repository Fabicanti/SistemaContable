import React, { useEffect, useState } from 'react'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable'
import { useForm } from '../../hooks/useForm';
import { BiSolidFilePdf } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";


const fechaFilter  = () => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];

    return {
        desde: formattedDate,
        hasta: formattedDate
    }
};

export const MovementsTable = ({ dataAllAsientos, roles, dataAllAccount, downloadPDFAsientos, dataAllUsers }) => {
    
    const { data , isLoading } = dataAllAsientos;

    const [dataTable, setDataTable] = useState([])

    const [expandedRows, setExpandedRows] = useState(null);
    const { state: allAccountState, fetch: fetchAllAccount } = dataAllAccount();
    const { data: accounts } = allAccountState;

    const { formState, onInputChange, setFormState } = useForm(fechaFilter);
    const { desde, hasta } = formState;
    const [filteredData, setFilteredData] = useState(dataTable);

    const { state: allDataUsers, fetch: fetchAllDataUsers } = dataAllUsers();
    const { data: users } = allDataUsers;

    const [applyFilter, setApplyFilter] = useState(false)

    useEffect(() => {
        if (data && !isLoading && users) {
            // Convierto las fechas de arreglos a Timestamp
            const arregloConTimestamps = data.map(item => {
                const [year, month, day] = item.fecha;
                const usuario = users.find(user => user.id === item.usuarioId);
                return {
                    ...item,
                    fecha: Date.UTC(year, month - 1, day),
                    usuarioName: usuario ? `${usuario.nombre} ${usuario.apellido}` : "Usuario desconocido"
                };
            });
            setDataTable(arregloConTimestamps);
            setFilteredData(arregloConTimestamps);
        }
        
    }, [data, isLoading, users]);

    const formatFecha = (timestamp) => {
        const date = new Date(timestamp + (24 * 60 * 60 * 1000));
        return date.toLocaleDateString('es-ES');
    };

    const findByAccountId = (cuentaId) => {
        let data = accounts.find((element) => element.id === cuentaId);
        return data ? data.nombre : "Cuenta desconocida";
    };

    const handleApplyFilters = () => {
        setApplyFilter(true)
        const filtered = dataTable.filter((item) => {
            const fechaItem = new Date(item.fecha);
            const desdeFecha = desde ? new Date(desde) : null;
            const hastaFecha = hasta ? new Date(hasta) : null;

            if (desdeFecha && hastaFecha) {
                return fechaItem >= desdeFecha && fechaItem <= hastaFecha;
            } else if (desdeFecha) {
                return fechaItem >= desdeFecha;
            } else if (hastaFecha) {
                return fechaItem <= hastaFecha;
            }
            return true;
        });
        setFilteredData(filtered);
        
    };

    const handleClearFilters = () => {
        setFormState(fechaFilter);
        setFilteredData(dataTable);
        setApplyFilter(false)
    };

    const downloadPDF = () => {
        downloadPDFAsientos()
    }

    const rowExpansionTemplate = (data) => {
        return (
            <div>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Cuenta ID</th>
                            <th scope="col">Debe</th>
                            <th scope="col">Haber</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.detalles.map((detalle) => (
                            <tr key={detalle.id}>
                                <td>{findByAccountId(detalle.cuentaId)}</td>
                                <td>{detalle.debe}</td>
                                <td>{detalle.haber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const toggleAllRows = () => {
        setExpandedRows(null)
    };

    return (
        <div className="custom-table-wrapper">
            <div className='options-mov-table'>
                <div className="mov-data-one">
                    <div className='filter-date'>
                        <div className='input-date'>
                            <label htmlFor="desde" className='since'>Desde</label>
                            <input 
                                type="date" 
                                className='input-sin' 
                                disabled={dataTable?.length === 0}
                                name='desde'
                                value={desde}
                                onChange={onInputChange}/>
                        </div>
                        <div className='input-date'>
                            <label htmlFor="hasta" className='until'>Hasta</label>
                            <input 
                                type="date" 
                                className='input-unt' 
                                disabled={dataTable?.length === 0}
                                name='hasta'
                                value={hasta}
                                onChange={onInputChange}/>
                        </div>
                    </div>

                    <div className='button-filter'>
                        <button type='button' className='btn-clear' onClick={handleClearFilters}>Limpiar</button>
                        <button 
                            type='button' 
                            className={`btn-apply ${applyFilter ? 'app' : ''}`}
                            onClick={handleApplyFilters}>
                                {applyFilter ? "Aplicado" : "Aplicar Filtros"}
                        </button>
                    </div>
                </div>

                <div className="mov-data-two">
                    {expandedRows && <button onClick={toggleAllRows}><IoIosArrowDown size={24}/></button>}
                    <button type='button' className='btn-pdf' onClick={downloadPDF}><BiSolidFilePdf size={36}/></button>
                </div>
            </div>

            {isLoading
                ? <div>Cargando...</div>
                : (dataTable?.length === 0 || filteredData?.length === 0
                    ? <div className="alert alert-light" role="alert">
                        Sin datos de Asientos
                    </div>
                    :
                    <DataTable value={filteredData} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                        className={`custom-table ${roles === 2 ? "" : "user"}`}
                        rowExpansionTemplate={rowExpansionTemplate} dataKey="id" paginator rows={4}>
                        <Column expander style={{ width: '3em' }} />
                        <Column field="id" header="Nro. Asiento" />
                        <Column field="fecha" header="Fecha" body={(rowData) => formatFecha(rowData.fecha)} />
                        <Column field="descripcion" header="Descripción" />
                        <Column field="usuarioName" header="Usuario" />
                    </DataTable>
                )
            }
        </div>
    )
}