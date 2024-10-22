import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";

const columnNames = [
    // { field: 'id', header: 'ID' },
    { field: 'nombre', header: 'NOMBRE' },
    { field: 'codigoCuenta', header: 'CODIGO CUENTA' },
    { field: 'tipoCuentaNombre', header: 'TIPO CUENTA' }
];

const sizeIcon = 36;
export const AccountTable = ({ datas, fetchGet, onDelete, roles, rows = 4}) => {

    const [globalFilter, setGlobalFilter] = useState(null);

    const { data, isLoading, errors } = datas;

    useEffect(() => {
        document.title = "Cuentas";
    }, []);

    const actionTemplateAccount = (rowData) => {
        return (
            <div className="action-buttons">
                <button
                    className="btn-delete"
                    onClick={() => onDelete(rowData, fetchGet)}
                >
                    <CiCircleRemove size={sizeIcon} />
                </button>
            </div>
        )
    }

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
                        className={`custom-table ${roles === 2  ? "" : "user"}`}
                        value={data}
                        paginator
                        rows={rows}
                        globalFilter={globalFilter}>

                        {columnNames.map((col, i) => (
                            <Column
                                key={col.field}
                                field={col.field}
                                header={col.header}
                                sortable
                            />
                        ))}

                        {roles === 2 && onDelete ? (
                            <Column
                                header="ACCIONES"
                                body={actionTemplateAccount} // Cuerpo personalizado con botones
                                style={{ minWidth: "50px" }}
                            />
                        ) : (
                            <></>
                        )}
                    </DataTable>)}
        </div>
    )
}
