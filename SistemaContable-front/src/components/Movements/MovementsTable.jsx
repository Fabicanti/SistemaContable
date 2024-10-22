import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { CiCircleRemove } from 'react-icons/ci';

export const MovementsTable = ({ dataAllAsientos, roles }) => {

    const { data, isLoading } = dataAllAsientos;

    const [expandedRows, setExpandedRows] = useState(null);

    const formatFecha = (timestamp) => {
        const date = new Date(timestamp + (24 * 60 * 60 * 1000));
        return date.toLocaleDateString('es-ES')
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

            {isLoading
                ? <div>Cargando...</div>
                : (data.length === 0
                    ? <div className="alert alert-light" role="alert">
                        Sin datos de Cuentas
                    </div>
                    :
                    <DataTable value={data} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                        className={`custom-table ${roles === 2 ? "" : "user"}`}
                        rowExpansionTemplate={rowExpansionTemplate} dataKey="id">
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
