
import { CustomTable } from '../CustomTable';
import { useUser } from '../../context/UserProvider';

export const UsersTable = ({datas, handleDelete, handleEdit, fetch}) => {

    const { user } = useUser()

    const columnNames = [
        // {field: 'id', header: 'ID'},
        {field: 'nombre', header: 'NOMBRE'},
        {field: 'apellido', header: 'APELLIDO'},
        {field: 'email', header: 'EMAIL'},
        {field: 'username', header: 'USERNAME'},
        {field: 'roleId', header: 'ROLEID'}
    ];

    const filteredData = Array.isArray(datas.data) ? datas.data.filter(element => element.id !== user?.id) : [];

    return (
        <CustomTable
        title={"Tabla de usuarios"}
        columns={columnNames}
        data={filteredData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        fetch={fetch}
        />
    );
};
