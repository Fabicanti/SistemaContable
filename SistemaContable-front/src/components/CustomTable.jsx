import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import "../styles/components/CustomTable.css";
import { useUser } from "../context/UserProvider";
import { CiCircleRemove } from "react-icons/ci";
import { UsersModal } from "./Users/UsersModal";

const sizeIcon = 36;

export const CustomTable = ({
  title,
  columns = [],
  data = [],
  onEdit,
  onDelete,
  fetch,
}) => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const { user } = useUser();

  // Función que renderiza los botones de acción
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="action-buttons">
        <UsersModal sizeButton={36} editMode={true} fetch={fetch} onHandle={onEdit} dataUser={rowData}/>
        <button
          className="btn-delete"
          onClick={() => onDelete(rowData, fetch)}
        >
          <CiCircleRemove size={sizeIcon} />
        </button>
      </div>
    );
  };

  return (
    <div className="custom-table-wrapper">
      <div className="custom-table-header">
        <div className="table-title">{title}</div>

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

      {data.length === 0 ? (
        <div className="alert alert-light" role="alert">
          Sin datos de usuarios
        </div>
      ) : (
        <DataTable
          className={`custom-table ${user?.roleId === 2 ? "" : "user"}`}
          value={data}
          responsiveLayout="scroll"
          paginator
          rows={5}
          globalFilter={globalFilter}
        >
          {columns.map((col, index) => (
            <Column
              key={index}
              field={col.field}
              header={col.header}
              sortable
            />
          ))}

          {/* Columna de Acciones */}
          {user?.roleId === 2 ? (
            <Column
              header="ACCIONES"
              body={actionBodyTemplate} // Cuerpo personalizado con botones
              style={{ minWidth: "200px" }}
            />
          ) : (
            <></>
          )}
        </DataTable>
      )}
    </div>
  );
};
