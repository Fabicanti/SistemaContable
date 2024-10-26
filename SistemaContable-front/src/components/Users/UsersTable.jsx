
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
        {field: 'role', header: 'ROL'}
    ];

    const filteredData = Array.isArray(datas.data) ? datas.data.filter(element => element.id !== user?.id) : [];
    const updatedUsers = filteredData.map(user => ({
        ...user,
        role: user.roleId === 2 ? "ADMINISTRADOR" : "USUARIO"
    }))

    return (
        <CustomTable
        title={"Tabla de usuarios"}
        columns={columnNames}
        data={updatedUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        fetch={fetch}
        />
    );
};
