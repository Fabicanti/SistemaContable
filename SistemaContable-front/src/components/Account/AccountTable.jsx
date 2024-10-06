import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

const columnNames = [
    { field: 'id', header: 'ID' },
    { field: 'nombre', header: 'NOMBRE' },
    { field: 'codigoCuenta', header: 'CODIGO CUENTA' },
    { field: 'tipoCuentaNombre', header: 'TIPO CUENTA' }
];


export const AccountTable = ({ datas, fetchGet }) => {

    const [globalFilter, setGlobalFilter] = useState(null);

    const { data, isLoading, errors } = datas;

    useEffect(() => {
        console.log(data);
        document.title = "Cuentas";
    }, [data]);

    return (
        <div className="custom-table-wrapper">
            <div className="custom-table-header">
                <div className="table-title">Cuentas</div>

                <div className="custom-search-box">
                    <span className="">
                        <IoIosSearch size={36} color="#263ba1" />
                    </span>
                    <input
                        className="custom-search-input"
                        type="text"
                        placeholder="Buscar..."
                        onInput={(e) => setGlobalFilter(e.target.value)}
                    />
                </div>
            </div>

            {isLoading
                ? <div>Cargando..</div>
                : (data.length === 0
                    ? <div className="alert alert-light" role="alert">
                        Sin datos de Cuentas
                    </div>
                    : <DataTable
                        className="custom-table"
                        value={data}
                        paginator
                        rows={8}
                        globalFilter={globalFilter}>

                        {columnNames.map((col, i) => (
                            <Column
                                key={col.field}
                                field={col.field}
                                header={col.header}
                                sortable
                            />
                        ))}
                    </DataTable>)}
        </div>
    )
}
