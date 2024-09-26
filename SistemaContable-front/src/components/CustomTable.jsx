import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { CiEdit, CiCircleRemove } from "react-icons/ci";
import "../styles/components/CustomTable.css";
import { useUser } from "../context/UserProvider";

const sizeIcon = 36;

export const CustomTable = ({ columns = [], data, onEdit, onDelete}) => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const {user} = useUser();

  // Función que renderiza los botones de acción
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="action-buttons">
        <button
          className="btn-edit"
          onClick={() => onEdit(rowData)} // Ejecuta la función de edición
        >
          <CiEdit size={sizeIcon} />
        </button>
        <button
          className="btn-delete"
          onClick={() => onDelete(rowData)} // Ejecuta la función de eliminación
        >
          <CiCircleRemove size={sizeIcon} />
        </button>
      </div>
    );
  };

  return (
    <div className="custom-table-wrapper">
      <div className="custom-search-box">
        <span className="">{/* ICONO*/}</span>
        <input
          className="custom-search-input"
          type="text"
          placeholder="Search..."
          onInput={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      <DataTable
        className="custom-table"
        value={data}
        responsiveLayout="scroll"
        paginator
        rows={4}
        globalFilter={globalFilter}
      >
        {columns.map((col, index) => (
          <Column key={index} field={col.field} header={col.header} sortable />
        ))}

        {/* Columna de Acciones */}
        {user?.roleId === 2 ? <Column
          header="Actions"
          body={actionBodyTemplate} // Cuerpo personalizado con botones
          style={{ width: "200px" }}
        /> : <></>}
      </DataTable>
    </div>
  );
};
