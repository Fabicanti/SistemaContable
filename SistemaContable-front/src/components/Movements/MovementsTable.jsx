import React, { useEffect, useState } from 'react'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable'
import { useForm } from '../../hooks/useForm';
import { BiSolidFilePdf } from "react-icons/bi";

const fechaFilter  = () => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];

    return {
        desde: formattedDate,
        hasta: formattedDate
    }
};

export const MovementsTable = ({ dataAllAsientos, roles, dataAllAccount }) => {
    
    const { data , isLoading } = dataAllAsientos;

    const [dataTable, setDataTable] = useState([])
    // const dataTable = data?.map( item => {
    //     const [year, month, day] = item.fecha;
    //     item.fecha = new Date(year, month - 1, day).getTime();
    // });

    const [expandedRows, setExpandedRows] = useState(null);
    const { state: allAccountState, fetch: fetchAllAccount } = dataAllAccount();
    const { data: accounts } = allAccountState;

    const { formState, onInputChange, setFormState } = useForm(fechaFilter);
    const { desde, hasta } = formState;
    const [filteredData, setFilteredData] = useState(dataTable);

    const [applyFilter, setApplyFilter] = useState(false)

    useEffect(() => {
        if (data && !isLoading) {
            // Convierto las fechas de arreglos a Timestamp
            const arregloConTimestamps = data.map(item => {
                const [year, month, day] = item.fecha;
                return {
                    ...item,
                    fecha: Date.UTC(year, month - 1, day)
                };
            });
            setDataTable(arregloConTimestamps);
            setFilteredData(arregloConTimestamps);
        }
        console.log(dataTable)
    }, [data, isLoading]);

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
        console.log(filteredData)
    };

    const handleClearFilters = () => {
        setFormState(fechaFilter);
        setFilteredData(dataTable);
        setApplyFilter(false)
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div>
                <table className="table table-striped">
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
                    <button type='button' className='btn-pdf'><BiSolidFilePdf size={36}/></button>
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
                    </DataTable>
                )
            }
        </div>
    )
}