import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm';

const fechaFilter = {
    desde: "2024-10-12",
    hasta: "2024-11-12"
}

export const MovementsTable = ({ dataAllAsientos, roles }) => {
    
    const { data, isLoading } = dataAllAsientos;
    const [expandedRows, setExpandedRows] = useState(null);

    const { formState, onInputChange, setFormState } = useForm(fechaFilter);
    const { desde, hasta } = formState;
    const [filteredData, setFilteredData] = useState(data); // Datos filtrados

    

    const formatFecha = (timestamp) => {
        const date = new Date(timestamp + (24 * 60 * 60 * 1000));
        return date.toLocaleDateString('es-ES')
    };

    const handleApplyFilters = () => {
        const filtered = data.filter((item) => {
            const fechaItem = new Date(item.fecha + (24 * 60 * 60 * 1000) );
            const desdeFecha = desde ? new Date(desde + (24 * 60 * 60 * 1000)) : null;
            const hastaFecha = hasta ? new Date(hasta + (24 * 60 * 60 * 1000)) : null;

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
        setFilteredData(data); // Resetea los datos
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
                        {data.detalles.map((detalle, index) => (
                            <tr key={detalle.id}>
                                <td>{detalle.cuentaId}</td>
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
                <div className='filter-date'>
                    <div className='input-date'>
                        <label htmlFor="desde" className='since'>Desde</label>
                        <input 
                            type="date" 
                            className='input-sin' 
                            disabled={data?.length === 0}
                            name='desde'
                            value={desde}
                            onChange={onInputChange}/>
                    </div>
                    <div className='input-date'>
                        <label htmlFor="Hasta" className='until'>Hasta</label>
                        <input 
                            type="date" 
                            className='input-unt' 
                            disabled={data?.length === 0}
                            name='hasta'
                            value={hasta}
                            onChange={onInputChange}/>
                    </div>
                </div>

                <div className='button-filter'>
                    <button type='button' className='btn-clear' onClick={handleClearFilters}>Limpiar</button>
                    <button 
                        type='button' 
                        className='btn-apply'
                        onClick={handleApplyFilters}>
                            Aplicar Filtros
                    </button>
                </div>
            </div>

            {isLoading
                ? <div>Cargando...</div>
                : (data.length === 0 || filteredData.length === 0
                    ? <div className="alert alert-light" role="alert">
                        Sin datos de Asientos
                    </div>
                    :
                    <DataTable value={filteredData} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                        className={`custom-table ${roles === 2 ? "" : "user"}`}
                        rowExpansionTemplate={rowExpansionTemplate} dataKey="id" paginator rows={5}>
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
