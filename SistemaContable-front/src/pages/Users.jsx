import React from 'react';
import { UsersTable } from '../components/Users/UsersTable';
import "../styles/Users.css"

export const Users = () => {
    return (
        <div className='users-container'>
            <h2>Tabla de usuarios</h2>
            <UsersTable />
        </div>
    );
};
