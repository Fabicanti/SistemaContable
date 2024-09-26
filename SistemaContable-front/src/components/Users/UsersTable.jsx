import { useFetchGET } from '../../hooks/useFetchGET';
import { CustomTable } from '../CustomTable';

const urlUsersData = "http://localhost:8080/api/usuarios"; 

export const UsersTable = () => {
    const { state } = useFetchGET(urlUsersData);

    const columnNames = [
        {field: 'id', header: 'ID'},
        {field: 'nombre', header: 'NOMBRE'},
        {field: 'apellido', header: 'APELLIDO'},
        {field: 'email', header: 'EMAIL'},
        {field: 'username', header: 'USERNAME'},
        {field: 'password', header: 'PASS(NO)'},
        {field: 'roleId', header: 'ROLEID'}
    ];

    const handleEdit = (row) => {
        console.log(state)
        console.log('Editando:', row); // Aquí se imprime la fila en la consola
        // Lógica para editar el registro
    };

    const handleDelete = (row) => {
        console.log('Eliminando:', row);
        // Lógica para eliminar el registro
    };

    return (
        <CustomTable
        columns={columnNames}
        data={state.data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        />
    );
};
